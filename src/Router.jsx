<<<<<<< HEAD
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import App from "./App"; 
import HowItWorksPage from "./pages/HowItWorksPage";
import OpenPoolsPage from "./pages/OpenPoolsPage";
import SignInPage from "./pages/SignInPage";
import ForSuppliersPage from "./pages/ForSuppliersPage";
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./App";
import HowItWorksPage from "./pages/HowItWorksPage.jsx";
import OpenPoolsPage from "./pages/OpenPoolsPage.jsx"; // Add this import
>>>>>>> bf5af4272e1bd4b54a8d9c064bc911eae95ed782

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
<<<<<<< HEAD
      <ScrollToHash />
=======
>>>>>>> bf5af4272e1bd4b54a8d9c064bc911eae95ed782
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
<<<<<<< HEAD
        <Route path="/pools" element={<OpenPoolsPage />} />
        <Route path="/suppliers" element={<ForSuppliersPage />} />
        <Route path="/signin" element={<SignInPage />} />
=======
        <Route path="/pools" element={<OpenPoolsPage />} /> {/* Add this route */}
>>>>>>> bf5af4272e1bd4b54a8d9c064bc911eae95ed782
      </Routes>
    </BrowserRouter>
  );
}
