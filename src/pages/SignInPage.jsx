// src/pages/SignInPage.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import TopNav from "../components/TopNav";
import { SiteFooter } from "../App.jsx";

const colors = { navy: "#1B2A41", gold: "#F0A92D" };

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0F1826] to-[#15233A] text-white">
      {/* Top navigation */}
      <TopNav inverted />

      {/* Main content */}
      <section className="flex flex-grow items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg text-slate-900"
        >
          <h1 className="text-2xl font-extrabold text-center text-slate-900">
            Sign in to GroupMOQ
          </h1>

          <p className="mt-2 text-center text-sm text-slate-600">
            Escrow-protected platform. Your info stays safe.
          </p>

          <form className="mt-6 space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B2A41]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B2A41]"
                />
              </div>
            </div>

            {/* Sign in button */}
            <button
              type="submit"
              className="w-full rounded-lg px-4 py-2.5 font-medium text-white hover:opacity-90"
              style={{ backgroundColor: colors.navy }}
            >
              Sign In
            </button>
          </form>

          <div className="mt-4 text-sm text-center text-slate-600">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="font-medium hover:underline"
              style={{ color: colors.navy }}
            >
              Create one
            </Link>
          </div>
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
}
