import React, { useState } from "react";
import { useTheme } from "./ThemeProvider";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyKIuM2bEd3mCUsbaLkPgnRLnPrkZIZKpGz7t5W-DX2S-ZfuAA-85lelUnsiaJjaEmI/exec";

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
    bio: `Asagade has over 2 years of experience in last-mile delivery and logistics. He is known for his reliability, attention to detail, and friendly customer service. Asagade ensures every package is delivered safely and on time.`,
    stats: {
      deliveries: 150,
      years: 2,
      rating: 4.9,
    },
  };

  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userSuccess, setUserSuccess] = useState(false);
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
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const params = new URLSearchParams(form).toString();

    try {
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
          });
          setUserSuccess(false);
          setSubmitted(true);
          setLoading(false);
        }, 2500);
      } else {
        setLoading(false);
        alert("Failed to submit application. Try again.");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Failed to submit application. Try again.");
    }
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center py-8 px-2 sm:px-4 transition-colors duration-300`}
    >
      {/* Header */}
      <header className="w-full dark:bg-gray-900 py-6 mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center tracking-wide">
          Our Couriers
        </h1>
      </header>

      {!showForm ? (
        <>
          <div className="flex flex-col lg:flex-row items-stretch gap-6 w-full max-w-5xl">
            {/* Profile Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 flex-1 flex flex-col items-center transition-colors duration-300">
              <img
                src={employee.photo}
                alt={employee.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-blue-500 mb-4"
              />
              <h2 className="text-xl sm:text-2xl font-bold text-blue-700 dark:text-blue-400">
                {employee.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">{employee.position}</p>

              {/* Contact */}
              <div className="mt-4 sm:mt-6 w-full">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  Contact
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                  <span className="font-medium">Phone:</span> {employee.contact.phone}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                  <span className="font-medium">Email:</span> {employee.contact.email}
                </p>
              </div>

              {/* About */}
              <div className="mt-4 sm:mt-6 w-full">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  About
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{employee.bio}</p>
              </div>

              {/* Stats */}
              <div className="mt-4 sm:mt-6 flex justify-between text-center w-full max-w-xs">
                {["deliveries", "years", "rating"].map((key, idx) => (
                  <div key={idx}>
                    <div className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
                      {employee.stats[key]}{key === "rating" ? "★" : ""}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm capitalize">
                      {key}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Section */}
            <div className="flex-1 flex justify-center items-center rounded-lg shadow-lg overflow-hidden">
              <img
                src="./assets/employee.png"
                alt="Courier at work"
                className="w-full sm:w-64 md:w-80 lg:w-full h-auto object-cover rounded-lg transition-colors duration-300"
              />
            </div>
          </div>

          {/* Apply Button */}
          <div className="w-full max-w-5xl flex justify-center mt-8 px-2">
            <button
              className="w-full sm:w-1/2 md:w-1/3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition"
              onClick={() => setShowForm(true)}
            >
              Apply to be a Courier
            </button>
          </div>
        </>
      ) : submitted ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full text-center transition-colors duration-300">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Application Submitted!</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Thank you for applying to be a courier with OneFun Logistics. We will review your application and contact you soon.
          </p>
          <button
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold transition"
            onClick={() => {
              setShowForm(false);
              setSubmitted(false);
            }}
          >
            Back to Profile
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full transition-colors duration-300">
          <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4 text-center">
            Courier Application Form
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {Object.entries(form).map(([key, value]) => (
              <div key={key}>
                <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1 capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                {key === "why" ? (
                  <textarea
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                    rows={3}
                    required
                  />
                ) : key === "gender" || key === "experience" || key === "license" || key === "vehicle" ? (
                  <select
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                    required
                  >
                    <option value="">Select</option>
                    {key === "gender" && (
                      <>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </>
                    )}
                    {key === "experience" && (
                      <>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </>
                    )}
                    {key === "license" && (
                      <>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </>
                    )}
                    {key === "vehicle" && (
                      <>
                        <option value="car">Car</option>
                        <option value="bike">Bike</option>
                        <option value="van">Van</option>
                        <option value="none">None</option>
                      </>
                    )}
                  </select>
                ) : (
                  <input
                    type={key === "email" ? "email" : key === "phone" ? "tel" : key === "dob" ? "date" : "text"}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                    required={["name", "email", "phone", "experience", "license", "vehicle", "why"].includes(key)}
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center"
              disabled={loading}
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

            {userSuccess && (
              <p className="mt-2 text-green-600 font-medium">Application submitted successfully!</p>
            )}
          </form>
          <button
            type="button"
            className="w-full mt-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 py-2 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
