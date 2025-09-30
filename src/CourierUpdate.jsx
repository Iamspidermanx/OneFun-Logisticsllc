import React, { useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function CourierUpdate() {
  const [trackingId, setTrackingId] = useState("");
  const [status, setStatus] = useState("In Transit");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { theme } = useTheme();

  const updateLocation = async () => {
    if (!trackingId.trim()) {
      setMessage("❌ Please enter a tracking ID");
      return;
    }

    if (!navigator.geolocation) {
      setMessage("❌ Geolocation not supported");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const accuracy = pos.coords.accuracy; // ✅ precision in meters

        try {
          const url = new URL(
            "https://script.google.com/macros/s/AKfycbwtw2916vPE3bkndjVxWJHrXsF8D46MQZQQEANLVXGKJ-qxKuhCbg8rXkjsNR9trXy0/exec"
          );
          url.searchParams.append("action", "updateOrder");
          url.searchParams.append("trackingId", trackingId);
          url.searchParams.append("status", status);
          url.searchParams.append("lat", lat);
          url.searchParams.append("lng", lng);

          const res = await fetch(url.toString());
          if (!res.ok) {
            setMessage(`❌ Error: ${res.status} ${res.statusText}`);
            setLoading(false);
            return;
          }

          const data = await res.json();

          if (data.status === "updated") {
            setMessage(
              `✅ Location & status updated successfully! (±${Math.round(
                accuracy
              )}m)`
            );
          } else if (data.status === "not_found") {
            setMessage("⚠️ Tracking ID not found");
          } else {
            setMessage("❌ Update failed");
          }
        } catch (err) {
          console.error(err);
          setMessage("❌ Error updating location");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setMessage("❌ Failed to get location");
        setLoading(false);
      },
      {
        enableHighAccuracy: true, // ✅ ask device for GPS
        timeout: 10000,           // wait max 10s
        maximumAge: 0             // don’t reuse cached location
      }
    );
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900"
          : "bg-gradient-to-br from-indigo-50 to-blue-100"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-2xl shadow-lg p-8 transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <h1 className="text-3xl font-bold text-center mb-6">🚚 Courier Update</h1>

        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className={`p-3 border rounded-xl mb-4 w-full focus:ring-2 transition-colors duration-300 ${
            theme === "dark"
              ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500"
              : "bg-white border-gray-300 text-black focus:ring-indigo-300"
          }`}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={`p-3 border rounded-xl mb-6 w-full focus:ring-2 transition-colors duration-300 ${
            theme === "dark"
              ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500"
              : "bg-white border-gray-300 text-black focus:ring-indigo-300"
          }`}
        >
          <option value="Pending">Pending</option>
          <option value="Picked Up">Picked Up</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
        </select>

        <button
          onClick={updateLocation}
          disabled={loading}
          className="w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Location"}
        </button>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.startsWith("✅")
                ? "text-green-600"
                : message.startsWith("⚠️")
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
