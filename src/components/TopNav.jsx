// src/components/TopNav.jsx
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function TopNav({ inverted = false }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkBase = "text-sm transition hover:opacity-90";
  const linkLight = "text-white/90 hover:text-white";
  const linkDark = "text-slate-700 hover:text-slate-900";
  const linkClass = `${linkBase} ${inverted ? linkLight : linkDark}`;

  const buttonClass = inverted
    ? "border-white text-white hover:bg-white hover:text-[#1B2A41]"
    : "border-slate-300 text-slate-800 hover:bg-slate-50";

  return (
    <header className="w-full bg-transparent pb-4 relative z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="h-9 w-9 rounded-lg grid place-items-center font-black"
            style={{
              backgroundColor: inverted ? "#F0A92D" : "#1B2A41",
              color: inverted ? "#1B2A41" : "white",
            }}
          >
            G
          </div>
          <Link
            to="/"
            className={`font-semibold ${
              inverted ? "text-white" : "text-slate-900"
            }`}
          >
            GroupMOQ
          </Link>
        </div>

        {/* Desktop Nav */}
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
          <Link
            to="/signin"
            className={`rounded-md border px-4 py-2 transition ${buttonClass}`}
          >
            Sign in
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className={`h-6 w-6 ${inverted ? "text-white" : "text-slate-800"}`} />
          ) : (
            <Menu
              className={`h-6 w-6 ${inverted ? "text-white" : "text-slate-800"}`}
            />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className={`md:hidden px-4 pt-2 pb-4 space-y-2 ${
            inverted ? "bg-[#0F1826]" : "bg-white"
          }`}
        >
          <NavLink to="/" className={linkClass} onClick={() => setMobileOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/how-it-works" className={linkClass} onClick={() => setMobileOpen(false)}>
            How it works
          </NavLink>
          <NavLink to="/pools" className={linkClass} onClick={() => setMobileOpen(false)}>
            Open pools
          </NavLink>
          <NavLink to="/suppliers" className={linkClass} onClick={() => setMobileOpen(false)}>
            For suppliers
          </NavLink>
          <NavLink to="/how-it-works#faq" className={linkClass} onClick={() => setMobileOpen(false)}>
            FAQ
          </NavLink>
          <Link
            to="/signin"
            className={`block rounded-md border px-4 py-2 transition ${buttonClass}`}
            onClick={() => setMobileOpen(false)}
          >
            Sign in
          </Link>
        </div>
      )}
    </header>
  );
}
