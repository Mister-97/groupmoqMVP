import React from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import App from "./App";
import HowItWorksPage from "./pages/HowItWorksPage";
import OpenPoolsPage from "./pages/OpenPoolsPage";
import SignInPage from "./pages/SignInPage";
import ForSuppliersPage from "./pages/ForSuppliersPage";

// Component to handle smooth scrolling when using #hash links
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
    <HashRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/pools" element={<OpenPoolsPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/suppliers" element={<ForSuppliersPage />} />
      </Routes>
    </HashRouter>
  );
}
