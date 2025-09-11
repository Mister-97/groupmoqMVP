import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./App";
import HowItWorksPage from "./pages/HowItWorksPage.jsx";
import OpenPoolsPage from "./pages/OpenPoolsPage.jsx"; // Add this import

export default function Router() {
  return (
    <BrowserRouter basename="/groupmoqMVP">
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/pools" element={<OpenPoolsPage />} /> {/* Add this route */}
      </Routes>
    </BrowserRouter>
  );
}
