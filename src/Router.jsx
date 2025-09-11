import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import App from "./App"; 
import HowItWorksPage from "./pages/HowItWorksPage";
import OpenPoolsPage from "./pages/OpenPoolsPage";
import SignInPage from "./pages/SignInPage";
import ForSuppliersPage from "./pages/ForSuppliersPage";

// Smooth scroll to hash
function ScrollToHash() {
  const location = useLocation();
  React.useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [location.pathname, location.hash]);
  return null;
}

export default function AppRouter() {
  return (
    <BrowserRouter basename="/groupmoqMVP">
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/pools" element={<OpenPoolsPage />} />
        <Route path="/suppliers" element={<ForSuppliersPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
}
