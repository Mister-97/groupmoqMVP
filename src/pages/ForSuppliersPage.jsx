// src/pages/ForSuppliersPage.jsx
import React from "react";
import { motion } from "framer-motion";
import TopNav from "../components/TopNav.jsx";
import { SiteFooter } from "../App.jsx";
import { Link } from "react-router-dom";
import {
  Factory,
  CheckCircle2,
  ShieldCheck,
  DollarSign,
  Truck,
  FileText,
  ArrowRight,
  Users,
} from "lucide-react";

const colors = { navy: "#1B2A41", gold: "#F0A92D", bg: "#F7F5F2" };

export default function ForSuppliersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F2]">
      {/* Hero */}
      <section className="relative isolate bg-gradient-to-br from-[#0F1826] via-[#15233A] to-[#0F1826] text-white overflow-hidden">
        {/* Nav absolutely at top, clickable */}
        <div className="absolute top-0 left-0 w-full z-50">
          <TopNav inverted />
        </div>

        {/* Background effect pushed behind */}
        <div className="absolute inset-0 -z-10 opacity-20 bg-[radial-gradient(circle_at_top_left,white,transparent_60%)] animate-pulse" />

        {/* Hero content */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl font-extrabold leading-tight"
          >
            More Buyers. <span className="text-[#F0A92D]">Bigger Orders.</span>{" "}
            Less Risk.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-5 max-w-2xl mx-auto text-white/80 text-lg"
          >
            Join the platform where factories meet verified buyers,
            escrow-backed payments, and pooled freight. The fastest way to scale
            your exports.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <Link
  to="/supplier-setup"
  className="px-8 py-3 rounded-xl font-medium text-navy-900 shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
  style={{ backgroundColor: colors.gold }}
>
  Apply as a Supplier <ArrowRight className="inline-block ml-2 h-5 w-5" />
</Link>
            <Link
  to="/signin"
  className="px-8 py-3 rounded-xl font-medium text-white hover:opacity-90 shadow-md hover:shadow-xl transition"
  style={{ backgroundColor: colors.navy }}
>
  Login 
</Link>
          </motion.div>
        </div>
      </section>

      {/* Why Join */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-extrabold text-center text-slate-900">
          Why Partner With GroupMOQ?
        </h2>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              Icon: CheckCircle2,
              title: "Pre-verified buyers",
              text: "We bring serious, purchase-ready buyers. No wasted time chasing small orders.",
            },
            {
              Icon: ShieldCheck,
              title: "Escrow protection",
              text: "Funds are secured before production. You get paid once MOQ is met.",
            },
            {
              Icon: Factory,
              title: "Bigger volumes",
              text: "Instead of 20 small POs, you get one consolidated order at MOQ or higher.",
            },
            {
              Icon: Truck,
              title: "Lower overhead",
              text: "We handle marketing, buyer aggregation, and pooled freight coordination.",
            },
          ].map(({ Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition"
            >
              <Icon className="h-10 w-10 mb-4 text-[#1B2A41]" />
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-slate-700 text-sm">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white border-t border-slate-200 py-20">
        <h2 className="text-3xl font-extrabold text-center text-slate-900">
          How It Works for Suppliers
        </h2>

        <div className="mt-12 relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 top-0 h-full w-1 bg-[#F0A92D]/30 transform -translate-x-1/2" />
          {[
            {
              Icon: FileText,
              step: "Apply & Verify",
              text: "Submit docs (COA, MSDS, certifications). Reviewed within 48h.",
            },
            {
              Icon: Factory,
              step: "List Products",
              text: "Add SKUs with MOQ, pricing, lead time, and shipping lanes.",
            },
            {
              Icon: Users,
              step: "Pool Opens",
              text: "Buyers pledge until MOQ is reached. You track progress in your portal.",
            },
            {
              Icon: DollarSign,
              step: "Funds Locked",
              text: "Escrow secures funds when pool closes. No production risk.",
            },
            {
              Icon: Truck,
              step: "Ship & Get Paid",
              text: "Produce, ship, and get paid once goods are verified.",
            },
          ].map(({ Icon, step, text }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={`relative mb-10 flex items-start gap-4 ${
                i % 2 === 0 ? "flex-row-reverse text-right" : ""
              }`}
            >
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#F0A92D] grid place-items-center text-navy-900 shadow-md">
                <Icon className="h-5 w-5" />
              </div>
              <div className="bg-[#F7F5F2] rounded-lg p-5 shadow-sm max-w-sm">
                <h3 className="font-semibold text-slate-900">{step}</h3>
                <p className="text-sm text-slate-700 mt-1">{text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dashboard Sneak Peek */}
      <section className="bg-gradient-to-r from-[#1B2A41] to-[#15233A] py-20 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-extrabold">Your Supplier Portal</h2>
          <p className="mt-3 text-white/80 max-w-2xl mx-auto">
            Track live pools, escrow-secured payments, and order progress in one
            clean dashboard.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-10 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-xl"
          >
            <img
              src="https://dummyimage.com/900x500/1B2A41/ffffff&text=Supplier+Portal+Preview"
              alt="Supplier Dashboard Preview"
              className="rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        id="apply"
        className="py-20 text-center bg-white border-t border-slate-200"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-extrabold text-slate-900"
        >
          Ready to Become a Supplier?
        </motion.h2>
        <p className="mt-3 text-slate-700 max-w-xl mx-auto">
          We’re onboarding a limited batch of suppliers this quarter.
          <b> Secure your spot today.</b>
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link
  to="/supplier-setup"
  className="px-8 py-3 rounded-xl font-medium text-white hover:opacity-90 shadow-md hover:shadow-xl transition"
  style={{ backgroundColor: colors.navy }}
>
  Apply Now
</Link>
          <Link
  to="/signin"
  className="px-8 py-3 rounded-xl font-medium text-white hover:opacity-90 shadow-md hover:shadow-xl transition"
  style={{ backgroundColor: colors.navy }}
>
  Supplier Login 
</Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
