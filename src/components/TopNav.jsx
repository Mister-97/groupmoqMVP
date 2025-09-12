// src/components/TopNav.jsx
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { X, Menu } from "lucide-react";

export default function TopNav({ inverted = false }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            <Link to="/signin" className={`rounded-md border px-4 py-2 transition ${buttonClass}`}>
              Sign in
            </Link>
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

        {/* Mobile dropdown (kept dark for readability) */}
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
            <Link
              to="/signin"
              onClick={() => setMobileOpen(false)}
              className="block w-full rounded-md border px-4 py-2 text-center transition border-white text-white hover:bg-white hover:text-[#1B2A41]"
            >
              Sign in
            </Link>
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className="h-16"></div>
    </>
  );
}
