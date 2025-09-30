import React, { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwtw2916vPE3bkndjVxWJHrXsF8D46MQZQQEANLVXGKJ-qxKuhCbg8rXkjsNR9trXy0/exec";

export default function Delivery() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [userSuccess, setUserSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [showSummary, setShowSummary] = useState(false);

  const { theme } = useTheme();

  // Load draft from localStorage
  useEffect(() => {
    const draft = JSON.parse(localStorage.getItem("deliveryDraft"));
    if (draft) {
      setFullName(draft.fullName || "");
      setEmail(draft.email || "");
      setAddress(draft.address || "");
      setDropoff(draft.dropoff || "");
      setPhone(draft.phone || "");
      setDescription(draft.description || "");
    }
  }, []);

  // Save draft
  useEffect(() => {
    localStorage.setItem(
      "deliveryDraft",
      JSON.stringify({
        fullName,
        email,
        address,
        dropoff,
        phone,
        description,
      })
    );
  }, [fullName, email, address, dropoff, phone, description,]);

  // User form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSummary(true); // Show modal before final submission
  };

  const confirmSubmit = async () => {
    const params = new URLSearchParams({
      action: "createOrder",
      fullName,
      email,
      address,
      dropoff,
      phone,
      description,
    });

    setLoading(true);

    try {
      const response = await fetch(`${APPS_SCRIPT_URL}?${params.toString()}`);
      const result = await response.json();

      if (result.status === "success") {
        setTrackingId(result.trackingId || "");
        setUserSuccess(true);

        // Reset form
        setTimeout(() => {
          setFullName("");
          setEmail("");
          setAddress("");
          setDropoff("");
          setPhone("");
          setDescription("");
          localStorage.removeItem("deliveryDraft");
          setLoading(false);
        }, 3000);
      } else {
        setLoading(false);
        alert("Something went wrong: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      setLoading(false);
      console.error("Error submitting order:", error);
      alert("Failed to submit order. Try again.");
    }
    setShowSummary(false);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-start py-16 px-4 sm:px-6 transition-colors duration-300
        ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900"
        }
      `}
    >
      {/* User Order Form */}
      <div
        className={`w-full max-w-2xl rounded-2xl shadow-lg p-6 sm:p-10 border transition-colors duration-300
          ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-100 text-gray-900"
          }
        `}
      >
        <h1 className="text-center text-3xl sm:text-4xl font-extrabold mb-8">
          Place a Delivery
        </h1>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          {/* Inputs with same styling */}
          <input
            type="text"
            placeholder="Full Name"
            className={`w-full p-3 border rounded-full focus:ring-2 transition-colors duration-300
              ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500"
                  : "bg-white border-gray-300 text-black focus:ring-blue-300"
              }
            `}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className={`w-full p-3 border rounded-full focus:ring-2 transition-colors duration-300
              ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500"
                  : "bg-white border-gray-300 text-black focus:ring-blue-300"
              }
            `}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Delivery Address"
            className={`w-full p-3 border rounded-full md:col-span-2 focus:ring-2 transition-colors duration-300
              ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500"
                  : "bg-white border-gray-300 text-black focus:ring-blue-300"
              }
            `}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Drop off Address"
            className={`w-full p-3 border rounded-full md:col-span-2 focus:ring-2 transition-colors duration-300
              ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500"
                  : "bg-white border-gray-300 text-black focus:ring-blue-300"
              }
            `}
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className={`w-full p-3 border rounded-full md:col-span-2 focus:ring-2 transition-colors duration-300
              ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500"
                  : "bg-white border-gray-300 text-black focus:ring-blue-300"
              }
            `}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <textarea
            rows={6}
            placeholder="Package Description"
            className={`w-full p-4 border rounded-xl md:col-span-2 focus:ring-2 transition-colors duration-300
              ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-500"
                  : "bg-white border-gray-300 text-black focus:ring-blue-300"
              }
            `}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="w-full md:col-span-2 flex flex-col items-center">
            <button
              type="submit"
              className={`mt-2 px-6 py-3 rounded-full font-semibold flex items-center justify-center shadow-md transition
                ${
                  loading
                    ? "opacity-75 cursor-not-allowed"
                    : "hover:scale-105"
                }
                bg-gradient-to-r from-blue-600 to-purple-600 text-white
              `}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>

            {userSuccess && (
              <div className="mt-4 text-center">
                <p className="text-green-600 font-medium text-lg">
                  🎉 Order submitted successfully!
                </p>
                {trackingId && (
                  <p className="mt-2 font-semibold">
                    Your Tracking ID:{" "}
                    <span
                      className={`px-2 py-1 rounded-md ${
                        theme === "dark"
                          ? "bg-gray-700 text-indigo-300"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {trackingId}
                    </span>
                  </p>
                )}
                {trackingId && (
                  <a
                    href={`/track/${trackingId}`}
                    className="mt-3 inline-block text-sm text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full shadow-md"
                  >
                    Track Package
                  </a>
                )}
              </div>
            )}
          </div>
        </form>

        {/* Call Us Section */}
        <div className="mt-10 text-center">
          <p className="font-semibold">📞 Call us for inquiries:</p>
          <a
            href="tel:+1234567890"
            className="block mt-2 text-blue-600 hover:underline"
          >
            +1 234 567 890
          </a>
          <a
            href="mailto:onefunlogistics@myfunllc.com"
            className="block mt-1 text-blue-600 hover:underline"
          >
            onefunlogistics@myfunllc.com
          </a>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/1234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 left-5 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition"
      >
        <i className="pi pi-whatsapp p-1"></i>
      </a>

      {/* Order Summary Modal */}
      {showSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`max-w-lg w-full p-6 rounded-2xl shadow-lg ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-900"
            }`}
          >
            <h2 className="text-xl font-bold mb-4">Confirm Your Order</h2>
            <ul className="mb-4 space-y-2 text-sm">
              <li><strong>Name:</strong> {fullName}</li>
              <li><strong>Email:</strong> {email}</li>
              <li><strong>Pickup:</strong> {address}</li>
              <li><strong>Dropoff:</strong> {dropoff}</li>
              <li><strong>Phone:</strong> {phone}</li>
              <li><strong>Description:</strong> {description}</li>
            </ul>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowSummary(false)}
                className="px-4 py-2 rounded-full bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubmit}
                className="px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
