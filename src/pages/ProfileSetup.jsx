// src/pages/ProfileSetup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TopNav from "../components/TopNav";
import { SiteFooter } from "../App.jsx";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const colors = { navy: "#1B2A41", gold: "#F0A92D" };

export default function ProfileSetup() {
  const [form, setForm] = useState({
    fullName: "",
    businessName: "",
    userType: "buyer",
    country: "",
    phone: "",
    products: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No authenticated user");

      await updateDoc(doc(db, "users", user.uid), {
        ...form,
        profileComplete: true,
        updatedAt: new Date()
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Profile setup failed:", err.message);
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0F1826] to-[#15233A] text-white">
      <TopNav inverted />

      <section className="flex flex-grow items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg text-slate-900"
        >
          <h1 className="text-2xl font-extrabold text-center text-slate-900">
            Complete Your Profile
          </h1>
          <p className="mt-2 text-center text-sm text-slate-600">
            Tell us about your business so we can customize your experience.
          </p>

          <form onSubmit={handleSave} className="mt-6 space-y-4">
            {/* Full name */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </div>

            {/* Business name */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Business / Brand Name
              </label>
              <input
                type="text"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                placeholder="My Trading Co."
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </div>

            {/* User type */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                I am a...
              </label>
              <select
                name="userType"
                value={form.userType}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              >
                <option value="buyer">Buyer</option>
                <option value="supplier">Supplier</option>
              </select>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Vietnam"
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+84 123 456 789"
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </div>

            {/* Products */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Products you buy / sell
              </label>
              <input
                type="text"
                name="products"
                value={form.products}
                onChange={handleChange}
                placeholder="e.g. Rice, Shoes"
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg px-4 py-2.5 font-medium text-white hover:opacity-90"
              style={{ backgroundColor: colors.navy }}
            >
              Save & Continue
            </button>
          </form>
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
}
