import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

import Hero from "./Hero.jsx";
import About from "./About.jsx";
import Courier from "./Courier.jsx";
import Delivery from "./Delivery.jsx";
import Footer from "./Footer.jsx";
import Vission from "./Vission.jsx";
import CourierUpdate from "./CourierUpdate.jsx";
import Tracking from "./Tracking.jsx";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "./ThemeProvider"; // 👈 import ThemeProvider

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function LandingPage() {
  return (
    <>
      <Hero />
      <About />
      <Vission />
      <Courier />
      <Delivery />
      <Tracking />
      <Footer />
    </>
  );
}

function PageLayout({ children }) {
  return (
    <>
      <Hero />
      {children}
      <Footer />
    </>
  );
}

function AppFontWrapper({ children }) {
  return <div style={{ fontFamily: "Poppins, sans-serif" }}>{children}</div>;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <ThemeProvider> {/* 👈 wrap everything in ThemeProvider */}
        <AppFontWrapper>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<PageLayout><About /></PageLayout>} />
              <Route path="/vission" element={<PageLayout><Vission /></PageLayout>} />
              <Route path="/courier" element={<PageLayout><Courier /></PageLayout>} />
              <Route path="/order" element={<PageLayout><Delivery /></PageLayout>} />
              <Route path="/courier-update" element={<PageLayout><CourierUpdate /></PageLayout>} />
              <Route path="/track" element={<PageLayout><Tracking /></PageLayout>} />
              <Route path="/track/:trackingId" element={<PageLayout><Tracking /></PageLayout>} />
            </Routes>
          </Router>
        </AppFontWrapper>
      </ThemeProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
