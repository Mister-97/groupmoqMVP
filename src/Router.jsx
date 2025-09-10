import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";                 // your current home page (unchanged)
import HowItWorksPage from "./pages/HowItWorksPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
      </Routes>
    </BrowserRouter>
  );
}
