// App.js
import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

function App() {
  const [isInView, setIsInView] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [showUpArrow, setShowUpArrow] = useState(false);
  const sectionRef = useRef(null);

  const { theme, toggleTheme } = useTheme();

  // Show up arrow when scrolled down
  useEffect(() => {
    const handleScroll = () => setShowUpArrow(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsInView(true),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const handleScrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const firstHalf = (
    <>
      Welcome to OneFun Logistics , my name is Asagade Onesimus Oyewale, and I
      am proud to be the driving force behind this business. What began as a
      small idea to help people and businesses move their goods more easily has
      grown into a personal mission to provide reliable, transparent, and
      customer-focused logistics services.
      <br />
      <br />
      Unlike big companies where packages often get lost in the system, with me,
      your delivery always has my full attention. As a one-man operation, every
      pickup, every mile driven, and every drop-off is carried out by me
      personally. This means you’re not just another number in a queue , you’re
      a valued client whose satisfaction matters to me.
      <br />
      <br />
      One of the key features I’ve built into my service is real-time tracking.
      I know how stressful it can be waiting for a delivery without updates, so
      I’ve made sure that you’ll always know where your package is and when it
      will arrive. From the moment I pick up your item until it reaches its
      destination, you’ll have complete visibility.
    </>
  );

  const secondHalf = (
    <>
      <br />
      At OneFun Logistics, my approach is simple:
      <br />
      <br />
      - Personal Service – You’ll always deal directly with me. No middlemen, no
      customer service runarounds.
      <br />
      <br />
      - Reliability – I treat every package as if it were my own, making sure it
      arrives safely and on time.
      <br />
      <br />
      - Transparency – With real-time tracking, you’re never left in the dark.
      <br />
      <br />
      - Affordability – I believe quality logistics shouldn’t come with
      unnecessary costs.
      <br />
      <br />
      Whether you’re a small business that needs regular deliveries or an
      individual sending something special to a loved one, I am here to make the
      process stress-free. Every delivery, big or small, is a chance for me to
      build trust and long-term relationships.
      <br />
      <br />
      As OneFun Logistics continues to grow, my vision is to scale up while
      keeping the same personal touch that sets me apart today. But no matter
      how big this business becomes, my focus will always remain the same:
      delivering your goods safely, on time, and with honesty.
      <br />
      <br />
      Thank you for trusting me with your deliveries — I look forward to being
      your go-to logistics partner.
    </>
  );

  return (
    <div
      ref={sectionRef}
      className={`flex flex-col-reverse md:flex-row justify-between items-center min-h-screen px-4 py-8 md:py-0 md:px-16 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Left Content */}
      <div
        className= {`${
          isInView ? "animate__animated animate__fadeInLeft" : "opacity-0"
        } flex-1 ${
          showFull
            ? "w-full max-w-4xl px-2 md:px-12 mt-8 md:mt-0"
            : "w-full md:w-auto md:px-8 mt-8 md:mt-0"
        }`}
      >
        <h1 className="text-3xl mt-20 sm:text-4xl md:text-5xl font-bold mb-4">
          Welcome to OneFun Logistics
        </h1>
        <p
          className={`mt-5 text-base sm:text-md ${
            theme === "dark" ? "text-gray-300" : "text-gray-800"
          } ${showFull ? "w-full max-w-3xl" : "w-full md:w-[550px]"}`}
        >
          {firstHalf}
          {showFull && secondHalf}
        </p>
        <div className="flex gap-4 mt-6 mb-10">
          {!showFull ? (
            <button
              className="text-white bg-blue-500 p-3 px-5 rounded-full"
              onClick={() => setShowFull(true)}
            >
              Learn more
            </button>
          ) : (
            <button
              className="text-blue-500 bg-white border border-blue-500 p-3 px-5 rounded-full"
              onClick={() => setShowFull(false)}
            >
              Show less
            </button>
          )}
        </div>
      </div>

      {/* Right Image */}
      {!showFull && (
        <div
          className={`flex-1 flex justify-center items-center mb-8 md:mb-0 ${
            isInView ? "animate__animated animate__fadeInRight" : "opacity-0"
          }`}
        >
          <img src="/assets/door.png" alt="Delivery" className="max-w-full h-auto" />
        </div>
      )}

      {/* Floating Buttons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3 items-end">
        {/* Scroll to Top */}
        {showUpArrow && (
          <button
            onClick={handleScrollTop}
            className="bg-blue-600 hover:bg-blue-800 text-white rounded-full p-3 shadow-lg transition"
            aria-label="Scroll to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
        )}

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full p-3 shadow-lg transition"
          aria-label="Toggle dark mode"
        >
          {theme === "dark" ? (
            // Sun icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m8.66-9H21m-18 0H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            // Moon icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default App;
