import React from "react";
import { motion } from "framer-motion";
import { Users, ShieldCheck, Truck, DollarSign, CheckCircle2 } from "lucide-react";

// Neutral, classic theme: warm beige + deep navy with subtle gold accents
// Easier on the eyes for 35–60 y/o demographic

const Stat = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="h-10 w-10 rounded-full border border-navy-200 bg-navy-50 flex items-center justify-center">
      <Icon className="h-5 w-5 text-navy-800" />
    </div>
    <div>
      <p className="text-navy-600 text-xs uppercase tracking-wider">{label}</p>
      <p className="text-navy-900 font-semibold">{value}</p>
    </div>
  </div>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-navy-200 bg-navy-50 px-3 py-1 text-xs text-navy-800">
    <CheckCircle2 className="h-4 w-4" /> {children}
  </span>
);

const ProgressBar = ({ current = 63, target = 100 }) => {
  const pct = Math.min(100, Math.round((current / target) * 100));
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-navy-600 mb-1">
        <span>Group progress</span>
        <span>{current}/{target} joined</span>
      </div>
      <div className="h-2 w-full bg-navy-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gold-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-navy-700">More buyers, lower prices. If MOQ isn’t met, everyone gets a full refund.</p>
    </div>
  );
};

const Category = ({ image, label, link }) => (
  <a href={link} className="flex flex-col items-center gap-3 group">
    <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-navy-200 shadow-md group-hover:shadow-lg transition">
      <img src={image} alt={label} className="h-full w-full object-cover" />
    </div>
    <span className="text-navy-900 text-sm font-medium">{label}</span>
  </a>
);

export default function Hero() {
  const colors = {
    navy: "#1B2A41",
    gold: "#F0A92D",
    bgLight: "#F7F5F2",
  };

  return (
    <section className="relative isolate">
      {/* Background: light, easy on eyes */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#F7F5F2] to-[#ECEBE7]" />

      {/* Announcement bar */}
      <div className="w-full border-b border-slate-200 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center gap-3 text-slate-800 text-sm">
          <span className="rounded-full px-2 py-0.5 text-xs" style={{ backgroundColor: colors.gold, color: colors.navy }}>Limited Pilot</span>
          <span className="font-medium" style={{ color: colors.navy }}>Factory pricing, without factory MOQs.</span>
        </div>
      </div>

      {/* Nav (minimal) */}
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg" style={{ backgroundColor: colors.navy }}>
            <div className="h-full w-full grid place-items-center text-white font-black">G</div>
          </div>
          <span className="font-semibold text-slate-900">GroupMOQ</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-slate-700 text-sm">
          <a href="#how" className="hover:text-slate-900">How it works</a>
          <a href="#pools" className="hover:text-slate-900">Open pools</a>
          <a href="#suppliers" className="hover:text-slate-900">For suppliers</a>
          <a href="#faq" className="hover:text-slate-900">FAQ</a>
          <a href="#signin" className="rounded-md border border-slate-300 px-3 py-1.5 hover:bg-slate-50">Sign in</a>
        </nav>
      </header>

      {/* Categories section placed over hero under header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-2 pt-4">
        <div className="flex items-center justify-center gap-14 overflow-x-auto">
          {[
            { label: "Sugar", link: "#sugar", image: "https://images.unsplash.com/photo-1505575972945-2798f54b3682?q=80&w=600&auto=format&fit=crop" },
            { label: "Coffee Beans", link: "#coffee", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop" },
            { label: "Fabrics", link: "#fabrics", image: "https://images.unsplash.com/photo-1520975922284-5cbf956ae2fd?q=80&w=600&auto=format&fit=crop" },
            { label: "Metals", link: "#metals", image: "https://images.unsplash.com/photo-1542300059-48cf52b7c0c7?q=80&w=600&auto=format&fit=crop" },
            { label: "Human Hair", link: "#hair", image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop" },
          ].map((c) => (
            <a key={c.label} href={c.link} className="flex flex-col items-center gap-3 group">
              <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm ring-0 group-hover:ring-2 transition" style={{ ['--tw-ring-color']: colors.gold }}>
                <img src={c.image} alt={c.label} className="h-full w-full object-cover" />
              </div>
              <span className="text-slate-800 text-sm font-medium">{c.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Hero content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16 grid lg:grid-cols-12 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6"
        >
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs text-slate-800">
              <CheckCircle2 className="h-4 w-4" style={{ color: colors.navy }} /> Verified suppliers
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs text-slate-800">
              <CheckCircle2 className="h-4 w-4" style={{ color: colors.navy }} /> Escrow protected
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1 text-xs text-slate-800">
              <CheckCircle2 className="h-4 w-4" style={{ color: colors.navy }} /> Freight pooling
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl/tight font-extrabold text-slate-900">
            Buy together. <span className="text-slate-700">Save more.</span>
          </h1>
          <p className="mt-4 text-lg text-slate-700 max-w-xl">
            Pool orders with other buyers to unlock wholesale pricing from manufacturers. Power in numbers, savings in bulk.
          </p>

          {/* CTAs */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="#pools"
              className="inline-flex items-center justify-center rounded-lg px-5 py-3 font-medium text-white hover:opacity-90"
              style={{ backgroundColor: colors.navy }}
            >
              Join an open pool
            </a>
            <a
              href="#create"
              className="inline-flex items-center justify-center rounded-lg border px-5 py-3 text-slate-900 hover:bg-slate-50"
              style={{ borderColor: colors.navy }}
            >
              Start a new pool
            </a>
          </div>

          {/* Trust stats */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[{ Icon: Users, label: "Buyers pooled", value: "2,340+" }, { Icon: DollarSign, label: "Avg. savings", value: "22%" }, { Icon: ShieldCheck, label: "Escrow backed", value: "Stripe Connect" }, { Icon: Truck, label: "Ship lanes", value: "US ↔ VN/TH/CN" }].map(({ Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full border border-slate-200 bg-white flex items-center justify-center">
                  <Icon className="h-5 w-5" style={{ color: colors.navy }} />
                </div>
                <div>
                  <p className="text-slate-500 text-xs uppercase tracking-wider">{label}</p>
                  <p className="text-slate-900 font-semibold">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right column: deal card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-6"
        >
          <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-700 text-sm">Featured pool</span>
              <span className="rounded-md px-2 py-1 text-xs text-slate-900" style={{ backgroundColor: colors.bgLight }}>Ends in 3d 12h</span>
            </div>
            <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100">
              <img
                src="/images/refinedsugar.png"
                alt="Refined sugar crystals"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-slate-900 font-semibold">ICUMSA-45 Refined Sugar</h3>
                <p className="text-slate-600 text-sm">MOQ 10 MT • Saigon/Laem Chabang lanes</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-slate-900">$XXX/MT</p>
                <p className="text-slate-500 text-xs line-through">$YYY/MT</p>
              </div>
            </div>

            <div className="mt-5">
              {/* Progress bar with gold accent */}
              <div className="flex justify-between text-xs text-slate-600 mb-1">
                <span>Group progress</span>
                <span>63/100 joined</span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full" style={{ width: "63%", backgroundColor: colors.gold }} />
              </div>
              <p className="mt-2 text-xs text-slate-600">More buyers, lower prices. If MOQ isn’t met, everyone gets a full refund.</p>
            </div>

            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              <button className="rounded-lg px-4 py-2.5 font-medium text-white hover:opacity-90" style={{ backgroundColor: colors.navy }}>Join this pool</button>
              <button className="rounded-lg border px-4 py-2.5 text-slate-900 hover:bg-slate-50" style={{ borderColor: colors.navy }}>View details</button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
              <span>✅ Full refund if MOQ not met</span>
              <span>•</span>
              <span>✅ Compliance docs uploaded</span>
              <span>•</span>
              <span>✅ Third-party inspection available</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
