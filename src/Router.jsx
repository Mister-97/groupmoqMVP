import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"; // Add this import
import LandingPage from "./App";  // 
import HowItWorksPage from "./pages/HowItWorksPage";
import OpenPoolsPage from "./pages/OpenPoolsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import Dashboard from "./pages/Dashboard";
import ProfileSetup from "./pages/ProfileSetup";
import ForSuppliersPage from "./pages/ForSuppliersPage";
import SupplierSetup from "./pages/SupplierSetup";
import SupplierDashboard from "./pages/SupplierDashboard";
// Import all your new pool pages
import PoolCreation from './pages/PoolCreation';
import PoolDetail from './pages/PoolDetail';
import PoolBrowse from './pages/PoolBrowse';
import MyPools from './pages/MyPools';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import NotFound from './pages/NotFound';

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
    <AuthProvider>
      <BrowserRouter basename="/groupmoqMVP">
        <ScrollToHash />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/pools" element={<OpenPoolsPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/suppliers" element={<ForSuppliersPage />} />
          <Route path="/supplier-setup" element={<SupplierSetup />} />
          <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
          
          {/* Add the new pool routes */}
          <Route path="/pool/create" element={<PoolCreation />} />
          <Route path="/pool/:poolId" element={<PoolDetail />} />
          <Route path="/pool/:poolId/checkout" element={<Checkout />} />
          <Route path="/my-pools" element={<MyPools />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}