import React, { useState } from "react";
import { useTheme } from "./ThemeProvider";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyKIuM2bEd3mCUsbaLkPgnRLnPrkZIZKpGz7t5W-DX2S-ZfuAA-85lelUnsiaJjaEmI/exec";

// Helper for light/dark mode
const t = (theme, light, dark) => (theme === "dark" ? dark : light);

export default function Courier() {
  const { theme } = useTheme();

  const employee = {
    name: "Asagade Oyewale",
    position: "Senior Courier",
    photo: "./assets/ceo.jpg",
    contact: {
      phone: "+1 234 567 8901",
      email: "asagade@onefunlogistics.com",
    },
    bio: `Asagade has over 2 years of experience in last-mile delivery and logistics. He is known for his reliability, attention to detail, and friendly customer service.`,
    stats: { deliveries: 150, years: 2, rating: 4.9 },
  };

  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userSuccess, setUserSuccess] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    gender: "",
    experience: "",
    license: "",
    vehicle: "",
    why: "",
    idPhoto: null, // file upload field
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // For now only send text fields — file upload will be separate
      const { idPhoto, ...textData } = form;
      const params = new URLSearchParams(textData).toString();

      const response = await fetch(`${APPS_SCRIPT_URL}?${params}`);
      const result = await response.json();

      if (result.status === "success") {
        setUserSuccess(true);
        setTimeout(() => {
          setForm({
            name: "",
            email: "",
            phone: "",
            address: "",
            dob: "",
            gender: "",
            experience: "",
            license: "",
            vehicle: "",
            why: "",
            idPhoto: null,
          });
          setUserSuccess(false);
          setSubmitted(true);
          setLoading(false);
        }, 2000);
      } else {
        setError("Failed to submit application. Try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center py-8 px-2 sm:px-4 transition-colors duration-300 ${t(
        theme,
        "bg-gray-50 text-gray-900",
        "bg-gray-900 text-white"
      )}`}
    >
      {/* Header */}
      <header
        className={`w-full py-6 mb-8 text-center font-bold text-2xl sm:text-4xl ${t(
          theme,
          "bg-gray-50 text-gray-900",
          "bg-gray-800 text-gray-100"
        )}`}
      >
        Our Couriers
      </header>

      {/* Profile or Form */}
      {!showForm ? (
        <>
          {/* Profile + Image */}
          <div className="flex flex-col lg:flex-row items-stretch gap-6 w-full max-w-5xl">
            <div
              className={`rounded-lg shadow-lg p-6 sm:p-8 flex-1 flex flex-col items-center border ${t(
                theme,
                "bg-white border-gray-200",
                "bg-gray-800 border-gray-700"
              )}`}
            >
              <img
                src={employee.photo}
                alt={employee.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-blue-500 mb-4"
              />
              <h2 className={`text-xl sm:text-2xl font-bold ${t(theme, "text-blue-700", "text-blue-400")}`}>
                {employee.name}
              </h2>
              <p className={t(theme, "text-gray-600", "text-gray-300")}>{employee.position}</p>

              {/* Contact */}
              <div className="mt-6 w-full">
                <h3 className={`font-semibold mb-2 ${t(theme, "text-gray-800", "text-gray-200")}`}>
                  Contact
                </h3>
                <p className={t(theme, "text-gray-700", "text-gray-300")}>
                  <span className="font-medium">Phone:</span> {employee.contact.phone}
                </p>
                <p className={t(theme, "text-gray-700", "text-gray-300")}>
                  <span className="font-medium">Email:</span> {employee.contact.email}
                </p>
              </div>

              {/* About */}
              <div className="mt-6 w-full">
                <h3 className={`font-semibold mb-2 ${t(theme, "text-gray-800", "text-gray-200")}`}>
                  About
                </h3>
                <p className={t(theme, "text-gray-700", "text-gray-300")}>{employee.bio}</p>
              </div>

              {/* Stats */}
              <div className="mt-6 flex justify-between text-center w-full max-w-xs">
                {Object.entries(employee.stats).map(([key, value]) => (
                  <div key={key}>
                    <div className={`text-lg font-bold ${t(theme, "text-blue-600", "text-blue-400")}`}>
                      {value}
                      {key === "rating" ? "★" : ""}
                    </div>
                    <div className={t(theme, "text-gray-500", "text-gray-400")}>{key}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 flex justify-center items-center rounded-lg shadow-lg overflow-hidden">
              <img
                src="./assets/employee.png"
                alt="Courier at work"
                className="w-full sm:w-64 md:w-80 lg:w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Apply Button */}
          <div className="w-full max-w-5xl flex justify-center mt-8 px-2">
            <button
              className="w-full sm:w-1/2 md:w-1/3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
              onClick={() => setShowForm(true)}
            >
              Apply to be a Courier
            </button>
          </div>
        </>
      ) : submitted ? (
        // Success screen
        <div
          className={`rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full text-center border ${t(
            theme,
            "bg-white border-gray-200",
            "bg-gray-800 border-gray-700"
          )}`}
        >
          <h2 className="text-2xl font-bold text-green-600 mb-4">Application Submitted!</h2>
          <p className={t(theme, "text-gray-700", "text-gray-300")}>
            Thank you for applying. We will review your application and contact you soon.
          </p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-semibold transition mt-4"
            onClick={() => {
              setShowForm(false);
              setSubmitted(false);
            }}
          >
            Back to Profile
          </button>
        </div>
      ) : (
        // Application Form
        <div
          className={`rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full border ${t(
            theme,
            "bg-white border-gray-200",
            "bg-gray-800 border-gray-700"
          )}`}
        >
          <h2 className={`text-2xl font-bold mb-4 text-center ${t(theme, "text-blue-700", "text-blue-400")}`}>
            Courier Application Form
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit} autoComplete="on">
            {/* Personal Info */}
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                required
                className={`w-full rounded px-3 py-2 border ${t(
                  theme,
                  "bg-white border-gray-300 text-gray-900",
                  "bg-gray-700 border-gray-600 text-gray-200"
                )}`}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
                className={`w-full rounded px-3 py-2 border ${t(
                  theme,
                  "bg-white border-gray-300 text-gray-900",
                  "bg-gray-700 border-gray-600 text-gray-200"
                )}`}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                autoComplete="tel"
                required
                className={`w-full rounded px-3 py-2 border ${t(
                  theme,
                  "bg-white border-gray-300 text-gray-900",
                  "bg-gray-700 border-gray-600 text-gray-200"
                )}`}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                autoComplete="street-address"
                className={`w-full rounded px-3 py-2 border ${t(
                  theme,
                  "bg-white border-gray-300 text-gray-900",
                  "bg-gray-700 border-gray-600 text-gray-200"
                )}`}
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                autoComplete="bday"
                className={`w-full rounded px-3 py-2 border ${t(
                  theme,
                  "bg-white border-gray-300 text-gray-900",
                  "bg-gray-700 border-gray-600 text-gray-200"
                )}`}
              />
            </div>

            {/* Selects */}
            <div>
              <label className="block font-medium mb-1">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
                className={`w-full rounded px-3 py-2 border ${t(
                  theme,
                  "bg-white border-gray-300 text-gray-900",
                  "bg-gray-700 border-gray-600 text-gray-200"
                )}`}
              >
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">Experience</label>
              <select
                name="experience"
                value={form.experience}
                onChange={handleChange}
                required
                className={`w-full rounded px-3 py-2 border ${t(
                  theme,
                  "bg-white border-gray-300 text-gray-900",
                  "bg-gray-700 border-gray-600 text-gray-200"
                )}`}
              >
                <option value="">Do you have courier experience?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">Driver’s License</label>
              <select
                name="license"
                value={form.license}
                onChange={handleChange}
                required
                className={`w-full rounded px-3 py-2 border ${t(
                  theme,
                  "bg-white border-gray-300 text-gray-900",
                  "bg-gray-700 border-gray-600 text-gray-200"
                )}`}
              >
                <option value="">Do you have a license?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-1">Vehicle</label>
              <select
                name="vehicle"
                value={form.vehicle}
                onChange={handleChange}
                required
                className={`w-full rounded px-3 py-2 border ${t(
                  theme,
                  "bg-white border-gray-300 text-gray-900",
                  "bg-gray-700 border-gray-600 text-gray-200"
                )}`}
              >
                <option value="">Select vehicle</option>
                <option>Car</option>
                <option>Bike</option>
                <option>Van</option>
                <option>None</option>
              </select>
            </div>

            {/* File Upload */}
            <div>
              <label className="block font-medium mb-1">Upload ID / License</label>
              <input
                type="file"
                name="idPhoto"
                accept="image/*"
                onChange={handleChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {/* Why */}
            <div>
              <label className="block font-medium mb-1">Why do you want to join?</label>
              <textarea
                name="why"
                value={form.why}
                onChange={handleChange}
                rows={3}
                required
                className={`w-full rounded px-3 py-2 border ${t(
                  theme,
                  "bg-white border-gray-300 text-gray-900",
                  "bg-gray-700 border-gray-600 text-gray-200"
                )}`}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Application"
              )}
            </button>

            {userSuccess && <p className="mt-2 text-green-600 font-medium">Application submitted!</p>}
            {error && <p className="mt-2 text-red-600 font-medium">{error}</p>}
          </form>

          <button
            type="button"
            className={`w-full mt-2 py-2 rounded-lg font-semibold transition ${t(
              theme,
              "bg-gray-200 text-gray-700 hover:bg-gray-300",
              "bg-gray-700 text-gray-200 hover:bg-gray-600"
            )}`}
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
