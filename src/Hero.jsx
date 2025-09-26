import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const menu = ["Home", "About Us", "Vision", "Couriers", "Delivery"];
  const links = {
    Home: "/",
    "About Us": "/about",
    Vision: "/vission",
    Couriers: "/courier",
    Delivery: "/order",
  };
  const list = [
    { icon: "pi-car", text: "Last Mile Deliveries" },
    { icon: "pi-map", text: "Route Optimization" },
    { icon: "pi-map-marker", text: "GPS Tracking" },
  ];
  const iconstyles = ["bg-green-400", "bg-yellow-400", "bg-pink-400"];

  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [trackingId, setTrackingId] = useState("");

  const navigate = useNavigate();

  // Sticky effect
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > window.innerHeight - 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobileOpen]);

  const handleMenuClick = (link) => {
    setMobileOpen(false);
    navigate(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTrackingSubmit = () => {
    if (trackingId.trim() !== "") {
      navigate(`/track/${trackingId.trim()}`);
      setTrackingId("");
    }
  };

  return (
    <div className="hero h-[150vh] sm:h-[110vh] md:h-[100vh] relative flex flex-col">
      {/* Background overlays */}
      <div className="hero-bg bg1"></div>
      <div className="hero-bg bg2"></div>
      <div className="hero-bg bg3"></div>
      <div className="hero-bg bg4"></div>
      <div className="hero-overlay absolute inset-0 bg-black/40 z-10"></div>

      {/* Top contact bar */}
      <div className="headbg text-white w-full z-50 relative">
        <div className="flex flex-col md:flex-row border-b justify-between px-3 md:px-32">
          <div className="flex flex-wrap items-center gap-2 my-2 text-gray-200">
            <i className="pi pi-phone p-1"></i>
            <p className="text-[12px] md:text-[14px]">+1 (503) 894-2813</p>
            <span className="hidden md:inline px-2">|</span>
            <i className="pi pi-envelope p-1"></i>
            <p className="text-[12px] md:text-[15px]">
              onefunlogistics@myfunllc.com
            </p>
          </div>
          <div className="flex gap-3 my-2 text-xs md:text-sm">
            {["facebook", "twitter", "linkedin", "whatsapp", "discord", "instagram"].map((icon) => (
              <a key={icon} href="#" aria-label={icon}>
                <i className={`pi pi-${icon} hover:text-blue-400`} />
              </a>
            ))}
          </div>
        </div>

        {/* Navbar */}
        <div
          className={`transition-all duration-300 z-50 w-full ${
            isSticky
              ? "fixed top-0 left-0 right-0 bg-white shadow-lg text-black"
              : "relative bg-transparent text-white"
          }`}
        >
          <div
            ref={navRef}
            className="mx-4 md:mx-24 w-full max-w-6xl px-2 sm:px-4 md:px-8 py-2 md:py-3 flex items-center justify-between gap-4"
          >
            {/* Logo */}
            <h1
              className={`text-lg md:text-2xl font-semibold cursor-pointer ${
                isSticky ? "text-blue-900" : "text-white"
              }`}
              onClick={() => navigate("/")}
            >
              <span className="text-blue-300">OneFun</span>-Logistics
            </h1>

            {/* Tracking input */}
            <div className="flex items-center flex-1 max-w-xs">
              <i
                className={`pi pi-search p-2 text-xs rounded border ${
                  isSticky ? "text-blue-600 border-black" : "text-white border-white"
                }`}
              />
              <input
                className={`ml-2 focus:outline-none w-full text-sm rounded-sm px-2 py-1 ${
                  isSticky ? "bg-gray-100 border border-black text-black" : "bg-white border border-black text-black"
                }`}
                type="text"
                placeholder="Tracking ID..."
                aria-label="Enter Tracking ID"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTrackingSubmit()}
              />
              <button
                onClick={handleTrackingSubmit}
                aria-label="Search Tracking ID"
                className="ml-1 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Go
              </button>
            </div>

            {/* Desktop links */}
            <nav className="hidden md:flex items-center gap-6">
              {menu.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleMenuClick(links[item])}
                  className={`font-medium bg-transparent border-none outline-none cursor-pointer ${
                    isSticky ? "text-black hover:text-blue-600" : "text-white hover:text-blue-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen((s) => !s)}
              aria-label="Toggle mobile menu"
              className={`md:hidden p-2 ${isSticky ? "text-black" : "text-white"}`}
            >
              <i className={`pi ${mobileOpen ? "pi-times" : "pi-bars"} text-xl`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`md:hidden w-full fixed left-0 right-0 z-40 bg-white transition-all duration-300 ${
            mobileOpen ? "opacity-100 max-h-[55vh]" : "opacity-0 max-h-0 pointer-events-none"
          }`}
          style={{
            top: navRef.current
              ? `${Math.round(navRef.current.getBoundingClientRect().bottom)}px`
              : "0px",
          }}
        >
          <div className="px-3 py-3 flex flex-col gap-2">
            {menu.map((item, index) => (
              <button
                key={index}
                onClick={() => handleMenuClick(links[item])}
                className="py-2 px-3 rounded font-medium text-black text-sm text-left transition-colors duration-200 hover:bg-blue-200"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero content */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-1/3 w-[90vw] max-w-5xl px-4 text-left text-white z-20">
        <h1 className="uppercase text-sm sm:text-lg md:text-2xl tracking-[5px] mb-2">
          Let's make your life easier
        </h1>
        <h1 className="text-2xl sm:text-5xl md:text-6xl font-semibold mb-6">
          Fast and Dependable Delivery
        </h1>
        <button className="bg-blue-600 rounded-sm py-2 px-6 text-sm sm:text-lg hover:bg-blue-700">
          How can we help you
        </button>
      </div>

      {/* Features */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[70%] w-[95vw] max-w-5xl flex flex-col sm:flex-row gap-4 sm:gap-10 items-center justify-center z-20">
        {list.map((item, index) => (
          <div
            key={index}
            className="w-full sm:w-72 bg-white px-4 py-3 rounded-sm shadow-md flex items-center"
          >
            <i
              className={`pi ${item.icon} ${iconstyles[index]} p-3 rounded-full text-white text-2xl mr-3`}
            />
            <h1 className="text-lg sm:text-xl text-gray-900">{item.text}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
