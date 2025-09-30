import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useTheme } from "./ThemeProvider"; // ✅ Import theme hook

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwtw2916vPE3bkndjVxWJHrXsF8D46MQZQQEANLVXGKJ-qxKuhCbg8rXkjsNR9trXy0/exec";

const defaultCenter = { lat: 37.0902, lng: -95.7129 };
const LIBRARIES = ["marker", "places"];

export default function TrackingPage() {
  const { theme } = useTheme(); // ✅ Get current theme
  const { trackingId: paramId } = useParams();
  const [trackingId, setTrackingId] = useState(paramId || "");
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const mapRef = useRef(null);
  const markersRef = useRef({});
  const directionsRendererRef = useRef(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  const fetchTrackingData = async (id) => {
    try {
      const res = await fetch(`${APPS_SCRIPT_URL}?trackingId=${id}`);
      const data = await res.json();

      if (data.status === "not_found" || !data["Tracking Number"]) {
        setErrorMsg("Tracking ID not found.");
        setOrderData(null);

        if (mapRef.current) {
          mapRef.current.setCenter(defaultCenter);
          mapRef.current.setZoom(5);
        }
      } else {
        setOrderData(data);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Error fetching tracking data.");
      setOrderData(null);
    }
  };

  const handleTrack = async () => {
    if (!trackingId.trim()) return;
    setLoading(true);
    setErrorMsg("");
    await fetchTrackingData(trackingId);
    setLoading(false);
  };

  useEffect(() => {
    if (orderData && trackingId) {
      const interval = setInterval(() => {
        fetchTrackingData(trackingId);
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [orderData, trackingId]);

  useEffect(() => {
    if (!isLoaded || !mapRef.current || !orderData) return;

    const { latitude, longitude, Address, Dropoff } = orderData;
    const { AdvancedMarkerElement } = window.google.maps.marker;

    Object.values(markersRef.current).forEach((m) => (m.map = null));
    markersRef.current = {};

    if (directionsRendererRef.current) {
      directionsRendererRef.current.setMap(null);
      directionsRendererRef.current = null;
    }

    const geocoder = new window.google.maps.Geocoder();
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: theme === "dark" ? "#6366f1" : "#2563eb", // ✅ Line color adapts to theme
        strokeWeight: 5,
      },
    });
    directionsRenderer.setMap(mapRef.current);
    directionsRendererRef.current = directionsRenderer;

    let pickupLoc = null;
    let dropoffLoc = null;
    let courierLoc = null;

    if (latitude && longitude) {
      courierLoc = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
      markersRef.current.courier = new AdvancedMarkerElement({
        position: courierLoc,
        map: mapRef.current,
        title: "Courier",
        content: createIcon("🚚"),
      });
    }

    if (Address) {
      geocoder.geocode({ address: Address }, (results, status) => {
        if (status === "OK" && results[0]) {
          pickupLoc = results[0].geometry.location;
          markersRef.current.pickup = new AdvancedMarkerElement({
            position: pickupLoc,
            map: mapRef.current,
            title: "Pickup",
            content: createIcon("📍"),
          });
          maybeDrawRoute();
        }
      });
    }

    if (Dropoff) {
      geocoder.geocode({ address: Dropoff }, (results, status) => {
        if (status === "OK" && results[0]) {
          dropoffLoc = results[0].geometry.location;
          markersRef.current.dropoff = new AdvancedMarkerElement({
            position: dropoffLoc,
            map: mapRef.current,
            title: "Dropoff",
            content: createIcon("🏠"),
          });
          maybeDrawRoute();
        }
      });
    }

    const maybeDrawRoute = () => {
      if (!pickupLoc || !dropoffLoc) return;
      const waypoints = courierLoc ? [{ location: courierLoc, stopover: true }] : [];

      directionsService.route(
        {
          origin: pickupLoc,
          destination: dropoffLoc,
          waypoints,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK" && result) {
            directionsRenderer.setDirections(result);
          }
        }
      );
    };
  }, [isLoaded, orderData, theme]);

  const createIcon = (emoji) => {
    const div = document.createElement("div");
    div.style.fontSize = "24px";
    div.style.lineHeight = "24px";
    div.textContent = emoji;
    return div;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return theme === "dark"
          ? "bg-yellow-900 text-yellow-300"
          : "bg-yellow-100 text-yellow-800";
      case "In Transit":
        return theme === "dark"
          ? "bg-blue-900 text-blue-300"
          : "bg-blue-100 text-blue-800";
      case "Delivered":
        return theme === "dark"
          ? "bg-green-900 text-green-300"
          : "bg-green-100 text-green-800";
      default:
        return theme === "dark"
          ? "bg-gray-800 text-gray-300"
          : "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-start py-8 px-2 sm:px-4 transition-colors ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100"
          : "bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-xl rounded-2xl shadow-lg p-4 sm:p-8 transition-colors ${
          theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white"
        }`}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">
          📦 Track Your Package
        </h1>

        {/* Tracking Input */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4 sm:mb-6">
          <input
            type="text"
            placeholder="Enter Tracking ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            className={`flex-1 p-3 rounded-xl focus:ring-2 text-sm sm:text-base transition-colors ${
              theme === "dark"
                ? "bg-gray-700 border border-gray-600 focus:ring-indigo-500 placeholder-gray-400 text-gray-100"
                : "bg-white border border-gray-300 focus:ring-indigo-300 text-gray-900"
            }`}
          />
          <button
            onClick={handleTrack}
            disabled={loading}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 text-sm sm:text-base"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Searching...
              </div>
            ) : (
              "Track"
            )}
          </button>
        </div>

        {errorMsg && <p className="text-red-500 text-center mb-4">{errorMsg}</p>}

        {/* Skeleton */}
        {loading && (
          <div className="space-y-3 animate-pulse">
            <div
              className={`h-4 rounded w-1/2 ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`h-4 rounded w-3/4 ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`h-4 rounded w-1/3 ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`h-48 rounded-xl ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-200"
              }`}
            ></div>
          </div>
        )}

        {/* Order Data */}
        {orderData && !loading && (
          <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
            {Object.entries({
  "Tracking ID": orderData["Tracking Number"],
  Name: orderData["Full Name"],
  Email: orderData.Email,
  Phone: orderData.Phone,
  "Pickup Address": orderData.Address,
  "Dropoff Address": orderData.Dropoff,
  "Package Description": orderData["Package Description"],
  Status: orderData.Orderstatus || "Pending",
  "Delivery Date": orderData["Delivery Date"] || "—",
  "Delivery Time": orderData["Delivery Time"] || "—",
  "Last Updated": orderData.Timestamp,
}).map(([key, value]) => (

              <div
                key={key}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center"
              >
                <p className="text-gray-500 dark:text-gray-400">{key}</p>
                {key === "Status" ? (
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium mt-1 sm:mt-0 ${getStatusColor(
                      value
                    )}`}
                  >
                    {value}
                  </span>
                ) : (
                  <p className="font-semibold mt-1 sm:mt-0">{value}</p>
                )}
              </div>
            ))}

            {/* Google Map */}
            <div className="mt-4 sm:mt-6 w-full h-72 sm:h-96 rounded-xl overflow-hidden">
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "0.75rem",
                  }}
                  zoom={5}
                  center={defaultCenter}
                  onLoad={(map) => (mapRef.current = map)}
                  options={{
                    mapId: import.meta.env.VITE_GOOGLE_MAPS_MAP_ID,
                    zoomControl: true,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: true,
                  }}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  Loading map...
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
