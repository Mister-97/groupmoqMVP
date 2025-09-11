import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./App";
import HowItWorksPage from "./pages/HowItWorksPage.jsx";

export default function Router() {
  return (
    <BrowserRouter basename="/groupmoqMVP">
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
      </Routes>
    </BrowserRouter>
  );
}
