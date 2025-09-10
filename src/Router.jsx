cat > src/Router.jsx << 'EOF'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./App";  // importing the Hero component as default export
import HowItWorksPage from "./pages/HowItWorksPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
      </Routes>
    </BrowserRouter>
  );
}
EOF