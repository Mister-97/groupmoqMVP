import { BrowserRouter, Routes, Route } from "react-router-dom";

// Home page (your existing default export from App.jsx)
import Home from "./App";

// How it works page (the file you just created)
import HowItWorksPage from "./pages/HowItWorksPage.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
      </Routes>
    </BrowserRouter>
  );
}
