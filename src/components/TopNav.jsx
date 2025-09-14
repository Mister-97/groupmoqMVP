// src/components/TopNav.jsx
import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { X, Menu, User, ChevronDown, Settings, LogOut, Package, Plus, Search, Bell } from "lucide-react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

export default function TopNav({ inverted = false }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/pools?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  // Get navigation items based on user type
  const getNavigationItems = () => {
    const baseItems = [
      { name: 'Home', path: '/' },
      { name: 'How it works', path: '/how-it-works' },
      { name: 'Browse Pools', path: '/pools' }
    ];

    if (!user || !userProfile) {
      return [
        ...baseItems,
        { name: 'For suppliers', path: '/suppliers' },
        { name: 'FAQ', path: '/how-it-works#faq' }
      ];
    }

    if (userProfile.userType === 'supplier') {
      return [
        ...baseItems,
        { name: 'Create Pool', path: '/pool/create', icon: Plus },
        { name: 'My Pools', path: '/my-pools', icon: Package }
      ];
    }

    // Buyer navigation
    return [
      ...baseItems,
      { name: 'My Pools', path: '/my-pools', icon: Package }
    ];
  };

  const navigationItems = getNavigationItems();

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

          {/* Search Bar (Desktop - only when logged in) */}
          {user && userProfile && (
            <div className="hidden lg:flex flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                    scrolled ? "text-slate-400" : inverted ? "text-white/70" : "text-slate-400"
                  }`} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search pools, products, suppliers..."
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                      scrolled 
                        ? "border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        : inverted 
                        ? "border-white/30 bg-white/10 text-white placeholder-white/70 focus:bg-white focus:text-slate-900 focus:placeholder-slate-500" 
                        : "border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    }`}
                  />
                </div>
              </form>
            </div>
          )}

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-6">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink 
                  key={item.path}
                  to={item.path} 
                  className={`${linkClass} flex items-center gap-2`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {item.name}
                </NavLink>
              );
            })}

            {/* Auth Section - Desktop */}
            {user && userProfile ? (
              <div className="flex items-center gap-4">
                {/* Quick Action Buttons */}
                {userProfile.userType === 'supplier' && (
                  <Link
                    to="/pool/create"
                    className={`hidden xl:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      scrolled 
                        ? "bg-blue-600 text-white hover:bg-blue-700" 
                        : inverted 
                        ? "bg-white text-[#1B2A41] hover:bg-white/90" 
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                    Create Pool
                  </Link>
                )}

                {userProfile.userType === 'buyer' && (
                  <Link
                    to="/pools"
                    className={`hidden xl:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      scrolled 
                        ? "bg-green-600 text-white hover:bg-green-700" 
                        : inverted 
                        ? "bg-white text-[#1B2A41] hover:bg-white/90" 
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    <Search className="h-4 w-4" />
                    Browse Pools
                  </Link>
                )}

                {/* Notifications */}
                <button className={`relative p-2 rounded-lg transition-colors ${
                  scrolled 
                    ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100" 
                    : inverted 
                    ? "text-white hover:bg-white/10" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}>
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Profile Dropdown */}
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
                    <span className="text-sm font-medium hidden lg:block">
                      {userProfile.businessName || 'User'}
                    </span>
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
                          setDropdownOpen(false);
                          navigate("/my-pools");
                        }}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 w-full text-left"
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          cursor: 'pointer',
                          pointerEvents: 'auto'
                        }}
                      >
                        <Package className="h-4 w-4" />
                        My Pools
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
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

        {/* Mobile Search (when logged in) */}
        {user && userProfile && (
          <div className="lg:hidden px-4 pb-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search pools..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </form>
          </div>
        )}

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden bg-[#0F1826] text-white px-6 py-6 space-y-5 shadow-lg">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink 
                  key={item.path}
                  to={item.path} 
                  className="flex items-center gap-3 text-lg" 
                  onClick={() => setMobileOpen(false)}
                >
                  {Icon && <Icon className="h-5 w-5" />}
                  {item.name}
                </NavLink>
              );
            })}

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
                  className="flex items-center gap-3 text-lg"
                >
                  <User className="h-5 w-5" />
                  Dashboard
                </Link>
                
                <Link
                  to="/my-pools"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 text-lg"
                >
                  <Package className="h-5 w-5" />
                  My Pools
                </Link>
                
                <Link
                  to="/profile-setup"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 text-lg"
                >
                  <Settings className="h-5 w-5" />
                  Profile Settings
                </Link>
                
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleSignOut();
                  }}
                  className="flex items-center gap-3 w-full text-left text-lg text-red-400"
                >
                  <LogOut className="h-5 w-5" />
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

      {/* Click outside to close dropdown */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setDropdownOpen(false)}
        />
      )}

      {/* Spacer */}
      <div className="h-16"></div>
    </>
  );
}
