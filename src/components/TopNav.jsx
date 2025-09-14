// src/components/TopNav.jsx
import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { X, Menu, User, ChevronDown, Settings, LogOut } from "lucide-react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

export default function TopNav({ inverted = false }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setUserProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setDropdownOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  // Link style: top = inverted logic, scrolled = dark
  const linkBase = "text-sm transition hover:opacity-90";
  const linkLight = "text-white hover:text-white";
  const linkDark = "text-slate-700 hover:text-slate-900";
  const linkClass = `${linkBase} ${scrolled ? linkDark : inverted ? linkLight : linkDark}`;

  const buttonClass = scrolled
    ? "border-slate-300 text-slate-800 hover:bg-slate-50"
    : inverted
    ? "border-white text-white hover:bg-white hover:text-[#1B2A41]"
    : "border-slate-300 text-slate-800 hover:bg-slate-50";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-100 transition-colors duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="h-9 w-9 rounded-lg grid place-items-center font-black"
              style={{
                backgroundColor: scrolled ? "#1B2A41" : inverted ? "#F0A92D" : "#1B2A41",
                color: scrolled ? "white" : inverted ? "#1B2A41" : "white",
              }}
            >
              G
            </div>
            <Link
              to="/"
              className={`font-semibold ${
                scrolled ? "text-slate-900" : inverted ? "text-white" : "text-slate-900"
              }`}
            >
              GroupMOQ
            </Link>
          </div>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/how-it-works" className={linkClass}>
              How it works
            </NavLink>
            <NavLink to="/pools" className={linkClass}>
              Open pools
            </NavLink>
            <NavLink to="/suppliers" className={linkClass}>
              For suppliers
            </NavLink>
            <NavLink to="/how-it-works#faq" className={linkClass}>
              FAQ
            </NavLink>

            {/* Auth Section - Desktop */}
            {user && userProfile ? (
              // Signed In - Profile Dropdown
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    scrolled 
                      ? "hover:bg-slate-100 text-slate-700" 
                      : inverted 
                      ? "hover:bg-white/10 text-white" 
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{userProfile.businessName || 'User'}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
{dropdownOpen && (
  <div 
    className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-2"
    style={{ 
      zIndex: 99999, 
      position: 'absolute',
      pointerEvents: 'auto'
    }}
    onClick={(e) => e.stopPropagation()}
  >
    <div className="px-4 py-2 border-b border-slate-100">
      <p className="text-sm font-medium text-slate-900">{userProfile.businessName}</p>
      <p className="text-xs text-slate-500">{user.email}</p>
      <p className="text-xs text-slate-500 capitalize">{userProfile.userType}</p>
    </div>
    
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Dashboard clicked!"); // Debug log
        setDropdownOpen(false);
        navigate("/dashboard");
      }}
      className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 w-full text-left"
      style={{ 
        background: 'none', 
        border: 'none', 
        cursor: 'pointer',
        pointerEvents: 'auto'
      }}
    >
      <User className="h-4 w-4" />
      Dashboard
    </button>
    
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Profile Settings clicked!"); // Debug log
        setDropdownOpen(false);
        navigate("/profile-setup");
      }}
      className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 w-full text-left"
      style={{ 
        background: 'none', 
        border: 'none', 
        cursor: 'pointer',
        pointerEvents: 'auto'
      }}
    >
      <Settings className="h-4 w-4" />
      Profile Settings
    </button>
    
    <div className="border-t border-slate-100 mt-2 pt-2">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log("Sign out clicked!"); // Debug log
          handleSignOut();
        }}
        className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
        style={{ 
          background: 'none', 
          border: 'none', 
          cursor: 'pointer',
          pointerEvents: 'auto'
        }}
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </button>
    </div>
  </div>
)}
              </div>
            ) : (
              // Not Signed In - Show Sign In button
              <Link to="/signin" className={`rounded-md border px-4 py-2 transition ${buttonClass}`}>
                Sign in
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className={`md:hidden ${
              scrolled ? "text-slate-900" : inverted ? "text-white" : "text-slate-900"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden bg-[#0F1826] text-white px-6 py-6 space-y-5 shadow-lg">
            <NavLink to="/" className="block text-lg" onClick={() => setMobileOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/how-it-works" className="block text-lg" onClick={() => setMobileOpen(false)}>
              How it works
            </NavLink>
            <NavLink to="/pools" className="block text-lg" onClick={() => setMobileOpen(false)}>
              Open pools
            </NavLink>
            <NavLink to="/suppliers" className="block text-lg" onClick={() => setMobileOpen(false)}>
              For suppliers
            </NavLink>
            <NavLink to="/how-it-works#faq" className="block text-lg" onClick={() => setMobileOpen(false)}>
              FAQ
            </NavLink>

            {/* Mobile Auth Section */}
            {user && userProfile ? (
              <>
                <div className="border-t border-slate-700 pt-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{userProfile.businessName}</p>
                      <p className="text-sm text-slate-400 capitalize">{userProfile.userType}</p>
                    </div>
                  </div>
                </div>
                
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="block text-lg"
                >
                  Dashboard
                </Link>
                
                <Link
                  to="/profile-setup"
                  onClick={() => setMobileOpen(false)}
                  className="block text-lg"
                >
                  Profile Settings
                </Link>
                
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleSignOut();
                  }}
                  className="block w-full text-left text-lg text-red-400"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                onClick={() => setMobileOpen(false)}
                className="block w-full rounded-md border px-4 py-2 text-center transition border-white text-white hover:bg-white hover:text-[#1B2A41]"
              >
                Sign in
              </Link>
            )}
          </div>
        )}
      </header>

      

      {/* Spacer */}
      <div className="h-16"></div>
    </>
  );
}