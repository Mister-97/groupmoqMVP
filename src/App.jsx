import React, { useState } from 'react';
// Place these files under: src/assets/
import refinedSugar from "./assets/refinedsugar.png";
import sugarHeader from "./assets/sugarheader.png";
import coffeeHeader from "./assets/coffeebeansheader.png";
import fabricsHeader from "./assets/fabricheader.png";
import metalsHeader from "./assets/metalheader.png";
import hairHeader from "./assets/humanhairheader.png";
import howWorksBg from "./assets/factoryhowitworkssection.png";
import { motion } from "framer-motion";
import TopNav from "./components/TopNav";
import { Link } from "react-router-dom";
import {
  Users,
  ShieldCheck,
  Truck,
  CheckCircle2,
  DollarSign,
  Clock,
  Percent,
  ArrowRight,
  Check,
  X,
  Factory,
  Lightbulb,
  Send,
  Mail,
  Phone,
  ArrowUpRight,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Search,
  ChevronDown,
} from "lucide-react";

// Neutral, classic theme
const colors = {
  navy: "#1B2A41",
  gold: "#F0A92D",
  bgLight: "#F7F5F2",
};

/* ============================================================
   ROOT (kept named "Hero" so you don't have to change imports)
   ============================================================ */
export default function Hero() {
  // --- Global modals state (Join + Details) ---
  const [joinOpen, setJoinOpen] = React.useState(false);
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [activePool, setActivePool] = React.useState(null);

  const openJoin = (pool) => {
    setActivePool(pool);
    setJoinOpen(true);
  };
  const openDetails = (pool) => {
    setActivePool(pool);
    setDetailsOpen(true);
  };
  const closeJoin = () => setJoinOpen(false);
  const closeDetails = () => setDetailsOpen(false);

  // Featured pool object used by the hero card's buttons
  const featuredPool = {
    id: "sugar-icumsa-45",
    title: "ICUMSA-45 Refined Sugar",
    subtitle: "MOQ 10 MT • Saigon/Laem Chabang lanes",
    category: "Sugar",
    image: refinedSugar,
    price: "$XXX/MT",
    oldPrice: "$YYY/MT",
    progress: 63,
    target: 100,
    // numbers used by Join modal
    unitLabel: "unit", // display-only label for screenshot parity
    minUnits: 12,
    unitPrice: 27, // $27 per unit matches your screenshot math
    currency: "USD",
  };

  return (
    <div className="min-h-screen flex flex-col pt-16">
      <section className="relative isolate">
        {/* Background: light, easy on eyes */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#F7F5F2] to-[#ECEBE7]" />

        {/* Announcement bar */}
        <div className="w-full border-b border-slate-200 bg-white/70 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center gap-3 text-slate-800 text-sm">
            <span
              className="rounded-full px-2 py-0.5 text-xs"
              style={{ backgroundColor: colors.gold, color: colors.navy }}
            >
              Limited Pilot
            </span>
            <span className="font-medium" style={{ color: colors.navy }}>
              Factory pricing, without factory MOQs.
            </span>
          </div>
        </div>

        {/* Nav (minimal) */}
        <TopNav />

        {/* Categories */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-2 pt-4">
          <div className="flex items-center justify-center gap-14 overflow-x-auto">
            {[
              { label: "Sugar", link: "#sugar", image: sugarHeader },
              { label: "Coffee Beans", link: "#coffee", image: coffeeHeader },
              { label: "Fabrics", link: "#fabrics", image: fabricsHeader },
              { label: "Metals", link: "#metals", image: metalsHeader },
              { label: "Human Hair", link: "#hair", image: hairHeader },
            ].map((c) => (
              <a key={c.label} href={c.link} className="flex flex-col items-center gap-3 group">
                <div
                  className="h-24 w-24 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm ring-0 group-hover:ring-2 transition"
                  style={{ "--tw-ring-color": colors.gold }}
                >
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

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => openJoin(featuredPool)}
                className="inline-flex items-center justify-center rounded-lg px-5 py-3 font-medium text-white hover:opacity-90"
                style={{ backgroundColor: colors.navy }}
              >
                Join an open pool
              </button>
              <a
                href="#create"
                className="inline-flex items-center justify-center rounded-lg border px-5 py-3 text-slate-900 hover:bg-slate-50"
                style={{ borderColor: colors.navy }}
              >
                Start a new pool
              </a>
            </div>

            {/* trust stats unchanged */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { Icon: Users, label: "Buyers pooled", value: "2,340+" },
                { Icon: Percent, label: "Avg. savings", value: "22%" },
                { Icon: ShieldCheck, label: "Escrow backed", value: "Stripe Connect" },
                { Icon: Truck, label: "Ship lanes", value: "US ↔ VN/TH/CN" },
              ].map(({ Icon, label, value }) => (
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
                <span
                  className="rounded-md px-2 py-1 text-xs text-slate-900"
                  style={{ backgroundColor: colors.bgLight }}
                >
                  Ends in 3d 12h
                </span>
              </div>
              <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100">
                <img
                  src={refinedSugar}
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
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Group progress</span>
                  <span>63/100 joined</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full" style={{ width: "63%", backgroundColor: colors.gold }} />
                </div>
                <p className="mt-2 text-xs text-slate-600">
                  More buyers, lower prices. If MOQ isn't met, everyone gets a full refund.
                </p>
              </div>

              <div className="mt-5 grid sm:grid-cols-2 gap-3">
                <button
                  onClick={() => openJoin(featuredPool)}
                  className="rounded-lg px-4 py-2.5 font-medium text-white hover:opacity-90"
                  style={{ backgroundColor: colors.navy }}
                >
                  Join this pool
                </button>
                <button
                  onClick={() => openDetails(featuredPool)}
                  className="rounded-lg border px-4 py-2.5 text-slate-900 hover:bg-slate-50"
                  style={{ borderColor: colors.navy }}
                >
                  View details
                </button>
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

      <HowItWorks />
      <PoolsSection onJoin={openJoin} onDetails={openDetails} />
      <MadeInUSASection onJoin={openJoin} onDetails={openDetails} />
      <SupplierBand />
      <AfterSupplierInfo />
      <SiteFooter />

      {/* Global modals */}
      <JoinModal open={joinOpen} pool={activePool} onClose={closeJoin} />
      <PoolDetailsModal open={detailsOpen} pool={activePool} onClose={closeDetails} />
    </div>
  );
}

/* ===========================
   How It Works Section (unchanged visuals)
   =========================== */
export function HowItWorks() {
  return (
    <section id="how" className="relative scroll-mt-28 md:scroll-mt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Banner with background + steps inside */}
        <div className="relative rounded-3xl">
          <div className="absolute inset-0 -z-10">
            <img
              src={metalsHeader}
              alt="How it works background"
              className="h-full w-full object-cover brightness-[0.6] rounded-3xl"
              aria-hidden
            />
            <div className="absolute inset-0 bg-[rgba(27,42,65,0.72)]" />
          </div>
          <div className="relative mx-auto max-w-5xl px-4 py-10 sm:py-14 text-center">
            <span className="inline-block rounded-full px-3 py-1 text-xs font-medium border border-white/20 bg-white/10 text-white">
              How it works
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">
              Pooling power, made simple
            </h2>
            <p className="mt-3 text-white/90">
              Buyers team up to hit a factory's minimum order (MOQ). Funds sit in escrow. When the
              pool closes and MOQ is met, production starts and freight is pooled to cut landed
              cost.
            </p>

            {/* value chips */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-white/90">
                <Check className="h-4 w-4" /> Verified suppliers
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-white/90">
                <ShieldCheck className="h-4 w-4" /> Escrow protected
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-white/90">
                <Truck className="h-4 w-4" /> Pooled freight
              </span>
            </div>

            {/* Steps inside banner */}
            <div className="mt-8">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    n: 1,
                    Icon: Users,
                    title: "Join or start a pool",
                    text:
                      "Pick a category and join an open pool, or create your own with a target quantity and deadline.",
                  },
                  {
                    n: 2,
                    Icon: DollarSign,
                    title: "Commit with escrow",
                    text:
                      "Your funds are held via Stripe Connect until the pool closes. Cancel anytime before close.",
                  },
                  {
                    n: 3,
                    Icon: Factory,
                    title: "Produce • Inspect • Ship",
                    text:
                      "MOQ met → supplier starts production. Optional third-party inspection. Freight is pooled for better rates.",
                  },
                ].map(({ n, Icon, title, text }, idx, arr) => (
                  <div key={n} className="relative group">
                    <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 text-left text-white shadow-[0_6px_30px_rgba(0,0,0,0.25)]">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full border border-white/30 bg-white/10 grid place-items-center">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold">{title}</h3>
                      </div>
                      <p className="mt-3 text-white/90 text-sm leading-relaxed">{text}</p>
                    </div>

                    {/* Number badge */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white/15 backdrop-blur border border-white/30 grid place-items-center text-sm font-semibold text-white">
                      {n}
                    </div>

                    {/* Arrow connector (desktop) */}
                    {idx < arr.length - 1 && (
                      <>
                        <div className="hidden md:block absolute top-1/2 -right-8 w-12 h-[2px] bg-white/40" />
                        <div className="hidden md:block absolute top-1/2 -right-8 translate-x-full -translate-y-1/2 w-0 h-0 border-y-[10px] border-y-transparent border-l-[10px] border-l-white/60" />
                      </>
                    )}

                    {/* Arrow connector (mobile, vertical) */}
                    {idx < arr.length - 1 && (
                      <div className="md:hidden absolute -bottom-7 left-1/2 -translate-x-1/2">
                        <div className="mx-auto w-[2px] h-5 bg-white/40" />
                        <div className="mx-auto w-0 h-0 border-x-[8px] border-x-transparent border-t-[8px] border-t-white/60" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===========================
   Pools Section (wired to Join/Details)
   =========================== */
export function PoolsSection({ onJoin, onDetails }) {
  const [q, setQ] = React.useState("");

  const pools = [
    {
      id: 1,
      title: "ICUMSA-45 Refined Sugar",
      subtitle: "MOQ 10 MT • Saigon/Laem Chabang lanes",
      category: "Sugar",
      image: refinedSugar,
      price: "$XXX/MT",
      oldPrice: "$YYY/MT",
      progress: 63,
      target: 100,
      unitLabel: "unit",
      minUnits: 12,
      unitPrice: 27,
      currency: "USD",
    },
    {
      id: 2,
      title: "Specialty Coffee Beans (AA)",
      subtitle: "MOQ 2 MT • HCMC/Hai Phong lanes",
      category: "Coffee",
      image: coffeeHeader,
      price: "$—/MT",
      oldPrice: "$—/MT",
      progress: 41,
      target: 80,
      unitLabel: "bag",
      minUnits: 10,
      unitPrice: 19,
      currency: "USD",
    },
    {
      id: 3,
      title: "Woven Upholstery Fabrics",
      subtitle: "MOQ 5,000 m • TH/CN lanes",
      category: "Fabrics",
      image: fabricsHeader,
      price: "$—/m",
      oldPrice: "$—/m",
      progress: 28,
      target: 60,
      unitLabel: "m",
      minUnits: 100,
      unitPrice: 3.2,
      currency: "USD",
    },
  ];

  const filtered = pools.filter((p) => {
    const s = q.trim().toLowerCase();
    if (!s) return true;
    return p.title.toLowerCase().includes(s) || p.category.toLowerCase().includes(s) || p.subtitle.toLowerCase().includes(s);
  });

  return (
    <section id="pools" className="relative scroll-mt-28 md:scroll-mt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 lg:pt-14 pb-6">
        {/* Header + search */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Popular pools</h2>
            <p className="text-slate-700">Browse active pools or search by commodity, spec, or lane.</p>
          </div>
          <div className="w-full md:w-[420px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search pools (e.g., sugar, coffee, fabrics)"
              className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>
        </div>

        {/* Pool grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PoolCard key={p.id} pool={p} onJoin={() => onJoin(p)} onDetails={() => onDetails(p)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PoolCard({ pool, onJoin, onDetails }) {
  const pct = Math.round((pool.progress / pool.target) * 100);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="aspect-[16/10] w-full overflow-hidden rounded-lg bg-slate-100 relative">
        <img src={pool.image} alt={pool.title} className="h-full w-full object-cover" />
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h4 className="font-semibold text-slate-900">{pool.title}</h4>
          <p className="text-slate-600 text-sm">{pool.subtitle}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-extrabold text-slate-900">{pool.price}</p>
          <p className="text-slate-500 text-xs line-through">{pool.oldPrice}</p>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex justify-between text-xs text-slate-600 mb-1">
          <span>Group progress</span>
          <span>
            {pool.progress}/{pool.target} joined
          </span>
        </div>
        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full" style={{ width: `${pct}%`, backgroundColor: colors.gold }} />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button onClick={onJoin} className="rounded-lg px-3 py-2 font-medium text-white hover:opacity-90" style={{ backgroundColor: colors.navy }}>
          Join
        </button>
        <button onClick={onDetails} className="rounded-lg border px-3 py-2 text-slate-900 hover:bg-slate-50" style={{ borderColor: colors.navy }}>
          Details
        </button>
      </div>
    </div>
  );
}

/* ===========================
   Made in USA (passes handlers through)
   =========================== */
export function MadeInUSASection({ onJoin, onDetails }) {
  const usaPools = [
    {
      id: "us1",
      title: "Organic Cane Sugar (USA)",
      subtitle: "MOQ 5 MT • Gulf Coast lanes",
      category: "Sugar",
      image: refinedSugar,
      price: "$—/MT",
      oldPrice: "$—/MT",
      progress: 12,
      target: 40,
      unitLabel: "unit",
      minUnits: 8,
      unitPrice: 31,
      currency: "USD",
    },
    {
      id: "us2",
      title: "Premium Cotton Fabric (USA)",
      subtitle: "MOQ 3,000 m • Southeast lanes",
      category: "Fabrics",
      image: fabricsHeader,
      price: "$—/m",
      oldPrice: "$—/m",
      progress: 26,
      target: 60,
      unitLabel: "m",
      minUnits: 200,
      unitPrice: 4.1,
      currency: "USD",
    },
    {
      id: "us3",
      title: "Corrugated Steel Panels (USA)",
      subtitle: "MOQ 20,000 ft² • Midwest lanes",
      category: "Metals",
      image: metalsHeader,
      price: "$—/ft²",
      oldPrice: "$—/ft²",
      progress: 18,
      target: 50,
      unitLabel: "ft²",
      minUnits: 500,
      unitPrice: 1.8,
      currency: "USD",
    },
  ];

  return (
    <section id="made-in-usa" className="relative scroll-mt-28 md:scroll-mt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-10">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs text-red-800">
            🇺🇸 Made in USA
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900">Support American manufacturers</h2>
          <p className="mt-3 text-slate-700 max-w-2xl mx-auto">
            Pool orders for US-made goods. Shorter lanes, faster delivery, and support domestic production.
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {usaPools.map((pool) => (
            <PoolCard key={pool.id} pool={pool} onJoin={() => onJoin(pool)} onDetails={() => onDetails(pool)} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="#more-usa"
            className="inline-flex items-center justify-center rounded-lg px-5 py-3 font-medium text-white hover:opacity-90"
            style={{ backgroundColor: colors.navy }}
          >
            View all USA pools <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ===========================
   Supplier + After + Footer (unchanged visuals)
   =========================== */
export function SupplierBand() {
  const [commodity, setCommodity] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [note, setNote] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ commodity, email, note });
    alert("Thanks! We'll review your suggestion and reach out.");
    setCommodity("");
    setEmail("");
    setNote("");
  };

  return (
    <section id="suppliers" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={howWorksBg} alt="Factory background" className="h-full w-full object-cover" aria-hidden />
        <div className="absolute inset-0 bg-[rgba(27,42,65,0.72)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-lg p-8 text-white shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
            <p className="text-white/80">Partner with us</p>
            <h3 className="mt-2 text-3xl font-extrabold tracking-tight">Are you a supplier?</h3>
            <p className="mt-3 text-white/90 text-sm sm:text-base">
              List a product, set your MOQ, and tap into pooled demand. We'll verify documents before you go live.
            </p>
            <ul className="mt-4 space-y-2 text-white/90 text-sm">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-white" /> Verified by GroupMOQ</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-white" /> Escrow-protected payouts</li>
              <li className="flex items-center gap-2"><Truck className="h-5 w-5 text-white" /> Access pooled freight</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#apply" className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium text-navy-900" style={{ backgroundColor: colors.gold }}>
                Apply to list <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a href="#faq" className="inline-flex items-center justify-center rounded-xl border border-white/30 px-5 py-3 text-white/90 hover:bg-white/10">
                Learn more
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-lg p-8 text-white shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
            <p className="text-white/80">Tell us what you need</p>
            <h3 className="mt-2 text-3xl font-extrabold tracking-tight flex items-center gap-2">
              <Lightbulb className="h-8 w-8" /> Interested in a certain commodity?
            </h3>
            <p className="mt-3 text-white/90 text-sm sm:text-base">
              Send us your suggestions and we will work to source verified suppliers before going live.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label htmlFor="commodity" className="sr-only">Commodity</label>
              <input
                id="commodity"
                required
                value={commodity}
                onChange={(e) => setCommodity(e.target.value)}
                placeholder="Commodity (e.g., ICUMSA-45 sugar)"
                className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/40"
              />

              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/40"
              />

              <label htmlFor="note" className="sr-only">Notes</label>
              <input
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Volume, lanes, timing (optional)"
                className="sm:col-span-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/40"
              />

              <div className="sm:col-span-2 flex flex-wrap gap-3 mt-1">
                <button type="submit" className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium text-navy-900" style={{ backgroundColor: colors.gold }}>
                  Send suggestion <Send className="ml-2 h-4 w-4" />
                </button>
                <a href="#pools" className="inline-flex items-center justify-center rounded-xl border border-white/30 px-5 py-3 text-white/90 hover:bg-white/10">
                  See open pools
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AfterSupplierInfo() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Why Buyers &amp; Suppliers Choose GroupMOQ</h2>
          <p className="mt-2 text-slate-700 max-w-2xl mx-auto">Unlock factory pricing, reduce risk with escrow, and cut landed costs through pooled freight.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Why GroupMOQ</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2"><Check className="h-5 w-5 mt-0.5" style={{ color: colors.navy }} />Factory pricing unlocked at MOQ</li>
              <li className="flex items-start gap-2"><Check className="h-5 w-5 mt-0.5" style={{ color: colors.navy }} />Escrow + refund guarantee if MOQ isn't met</li>
              <li className="flex items-start gap-2"><Check className="h-5 w-5 mt-0.5" style={{ color: colors.navy }} />Pooled freight lowers landed cost</li>
              <li className="flex items-start gap-2"><Check className="h-5 w-5 mt-0.5" style={{ color: colors.navy }} />Verified suppliers & optional inspection</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Buying Solo</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2"><X className="h-5 w-5 mt-0.5 text-slate-400" /> Small-lot or retail pricing</li>
              <li className="flex items-start gap-2"><X className="h-5 w-5 mt-0.5 text-slate-400" /> You carry more risk up front</li>
              <li className="flex items-start gap-2"><X className="h-5 w-5 mt-0.5 text-slate-400" /> Higher freight per unit</li>
              <li className="flex items-start gap-2"><X className="h-5 w-5 mt-0.5 text-slate-400" /> Limited supplier leverage</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2"><Clock className="h-5 w-5" style={{ color: colors.navy }} /> What happens to your money</h3>
            <ol className="mt-3 list-decimal pl-6 text-sm text-slate-700 space-y-1">
              <li>Commit → funds held in escrow (Stripe Connect).</li>
              <li>Pool closes → MOQ met: capture &amp; pay supplier; MOQ not met: instant refund.</li>
              <li>Shipment arranged → pooled freight → delivery.</li>
            </ol>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2"><Percent className="h-5 w-5" style={{ color: colors.navy }} /> Typical savings</h3>
            <p className="mt-3 text-sm text-slate-700">Members report double-digit savings versus buying solo, depending on category and ship lane.</p>
            <div className="mt-4 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full" style={{ width: "22%", backgroundColor: colors.gold }} />
            </div>
            <p className="mt-2 text-xs text-slate-600">Illustrative savings based on recent pools.</p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-6 w-6 flex-shrink-0" style={{ color: colors.navy }} />
            <p className="text-slate-800"><span className="font-semibold">Full refund if MOQ isn't met.</span> Your commitment is held in escrow with Stripe Connect until the pool closes.</p>
          </div>
          <div className="flex gap-3">
            <a href="#pools" className="inline-flex items-center justify-center rounded-lg px-5 py-3 font-medium text-white hover:opacity-90" style={{ backgroundColor: colors.navy }}>
              Start now <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a href="#create" className="inline-flex items-center justify-center rounded-lg border px-5 py-3 text-slate-900 hover:bg-slate-50" style={{ borderColor: colors.navy }}>
              Start a new pool
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  const [email, setEmail] = React.useState("");
  const onSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    console.log({ email });
    alert("Thanks! We'll keep you in the loop.");
    setEmail("");
  };

  return (
    <footer className="relative mt-10">
      <div className="h-1 w-full" style={{ backgroundColor: colors.gold }} />
      <div className="relative bg-[#0F1826] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1"><ShieldCheck className="h-4 w-4" /> Escrow protected</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1"><CheckCircle2 className="h-4 w-4" /> Verified suppliers</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1"><Truck className="h-4 w-4" /> Pooled freight</span>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg grid place-items-center font-black" style={{ backgroundColor: colors.gold, color: colors.navy }}>G</div>
                <span className="text-lg font-semibold">GroupMOQ</span>
              </div>
              <p className="mt-3 text-white/80 text-sm max-w-md">Group buying for real-world goods. Team up to hit factory MOQs and unlock wholesale pricing—safely.</p>
              <form onSubmit={onSubscribe} className="mt-5 flex items-center gap-2 max-w-md">
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30" />
                <button type="submit" className="rounded-lg px-4 py-3 font-medium text-navy-900 hover:opacity-90" style={{ backgroundColor: colors.gold }}>
                  Subscribe
                </button>
              </form>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/80">
                <a href="mailto:hello@groupmoq.com" className="inline-flex items-center gap-2 hover:text-white"><Mail className="h-4 w-4" /> hello@groupmoq.com</a>
                <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" /> +1 (555) 010-1234</span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <a href="#" aria-label="Twitter" className="h-9 w-9 grid place-items-center rounded-full border border-white/15 bg-white/5 hover:bg-white/10"><Twitter className="h-4 w-4" /></a>
                <a href="#" aria-label="LinkedIn" className="h-9 w-9 grid place-items-center rounded-full border border-white/15 bg-white/5 hover:bg-white/10"><Linkedin className="h-4 w-4" /></a>
                <a href="#" aria-label="Instagram" className="h-9 w-9 grid place-items-center rounded-full border border-white/15 bg-white/5 hover:bg-white/10"><Instagram className="h-4 w-4" /></a>
                <a href="#" aria-label="Facebook" className="h-9 w-9 grid place-items-center rounded-full border border-white/15 bg-white/5 hover:bg-white/10"><Facebook className="h-4 w-4" /></a>
              </div>
            </div>

            <div className="grid gap-10 sm:grid-cols-3 lg:col-span-3">
              <div>
                <h4 className="text-sm font-semibold text-white/90">Product</h4>
                <ul className="mt-3 space-y-2 text-white/80 text-sm">
                  <li><a href="/how-it-works" className="hover:text-white inline-flex items-center gap-1">How it works <ArrowUpRight className="h-3 w-3" /></a></li>
                  <li><a href="#pools" className="hover:text-white">Open pools</a></li>
                  <li><a href="#create" className="hover:text-white">Start a new pool</a></li>
                  <li><a href="#sugar" className="hover:text-white">Categories</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white/90">Company</h4>
                <ul className="mt-3 space-y-2 text-white/80 text-sm">
                  <li><a href="#suppliers" className="hover:text-white">For suppliers</a></li>
                  <li><a href="#faq" className="hover:text-white">FAQ</a></li>
                  <li><a href="#contact" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white/90">Legal</h4>
                <ul className="mt-3 space-y-2 text-white/80 text-sm">
                  <li><a href="#terms" className="hover:text-white">Terms</a></li>
                  <li><a href="#privacy" className="hover:text-white">Privacy</a></li>
                  <li><a href="#compliance" className="hover:text-white">Compliance</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 text-xs text-white/70 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>© {new Date().getFullYear()} GroupMOQ. All rights reserved.</p>
            <p className="text-white/60">Built for buyers. Backed by escrow.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ===========================
   JOIN MODAL (scrollable + upgrades)
   =========================== */
function JoinModal({ open, pool, onClose }) {
  const [units, setUnits] = React.useState(12);
  const [company, setCompany] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [site, setSite] = React.useState("");
  const [country, setCountry] = React.useState("United States");
  const [notes, setNotes] = React.useState("");
  const [showUpgrades, setShowUpgrades] = React.useState(true);

  // Upgrade toggles
  const [rush, setRush] = React.useState(false);            // +$2 / unit
  const [packaging, setPackaging] = React.useState(false);  // +$1.50 / unit
  const [qc, setQc] = React.useState(false);                // +$300 flat
  const [privateLabel, setPrivateLabel] = React.useState(false); // +$200 flat

  React.useEffect(() => {
    if (pool?.minUnits) setUnits(pool.minUnits);
  }, [pool]);

  if (!open || !pool) return null;

  const perUnitUpcharge = (rush ? 2 : 0) + (packaging ? 1.5 : 0);
  const flatUpcharge = (qc ? 300 : 0) + (privateLabel ? 200 : 0);
  const subtotal = units * (pool.unitPrice + perUnitUpcharge) + flatUpcharge;
  const totalWithFee = subtotal * 1.03; // platform fee 3% included
  const fmt = (n) =>
    n.toLocaleString("en-US", { style: "currency", currency: pool.currency || "USD", maximumFractionDigits: 0 });

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      poolId: pool.id,
      units,
      company,
      contact,
      site,
      country,
      notes,
      upgrades: { rush, packaging, qc, privateLabel },
      estimatedCharge: Number(totalWithFee.toFixed(2)),
    };
    console.log("JOIN PAYLOAD →", payload);
    alert("Thanks! Your pledge has been recorded (demo).");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 md:p-8 overflow-y-auto" onClick={onClose}>
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b bg-white rounded-t-2xl">
          <h3 className="text-xl font-semibold text-slate-900">Join: {pool.title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* content (scrollable) */}
        <form onSubmit={submit} className="px-6 py-5 max-h-[80vh] overflow-y-auto">
          {/* Units */}
          <label className="block text-sm font-medium text-slate-900">
            Units to pledge (min {pool.minUnits || 1})
          </label>
          <input
            type="number"
            min={pool.minUnits || 1}
            value={units}
            onChange={(e) => setUnits(Math.max(pool.minUnits || 1, Number(e.target.value || 0)))}
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300"
          />
          <p className="mt-2 text-xs text-slate-600">You can edit or cancel before the pool locks.</p>

          {/* Estimated cost */}
          <div className="mt-5">
            <p className="text-sm font-medium text-slate-900">Estimated Cost (authorization at pledge)</p>
            <div className="mt-1 text-3xl font-extrabold text-slate-900">{fmt(totalWithFee)}</div>
            <p className="text-sm text-slate-600 mt-1">
              {fmt(pool.unitPrice)} per {pool.unitLabel || "unit"} • Platform fee 3% included
            </p>
            <p className="text-xs text-slate-600">
              Funds <span className="font-semibold">authorized now</span>, <span className="font-semibold">moved to escrow on lock</span>
            </p>
          </div>

          {/* Company / Contact / Site / Country */}
          <div className="mt-6 grid gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-900">Company / Brand</label>
              <input
                placeholder="e.g., MP Global Exports"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900">Contact Name</label>
              <input
                placeholder="Your full name"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900">Website / Social</label>
              <input
                placeholder="https://… or @handle"
                value={site}
                onChange={(e) => setSite(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900">Country (USA-only for MVP)</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 bg-white"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
                <option>United Kingdom</option>
                <option>Vietnam</option>
                <option>Thailand</option>
              </select>
            </div>
          </div>

          {/* Upgrades / Customizations */}
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setShowUpgrades((s) => !s)}
              className="w-full flex items-center justify-between rounded-lg border border-slate-300 px-3 py-2 text-left"
            >
              <span className="text-sm font-medium text-slate-900">Upgrades & Customizations (optional)</span>
              <ChevronDown className={`h-4 w-4 transition ${showUpgrades ? "rotate-180" : ""}`} />
            </button>

            {showUpgrades && (
              <div className="mt-3 space-y-3">
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={rush} onChange={(e) => setRush(e.target.checked)} />
                  <span className="text-sm text-slate-800">Rush processing <span className="text-slate-500">(+$2 / {pool.unitLabel || "unit"})</span></span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={packaging} onChange={(e) => setPackaging(e.target.checked)} />
                  <span className="text-sm text-slate-800">Custom packaging <span className="text-slate-500">(+$1.50 / {pool.unitLabel || "unit"})</span></span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={qc} onChange={(e) => setQc(e.target.checked)} />
                  <span className="text-sm text-slate-800">Third-party QC inspection <span className="text-slate-500">(+$300 flat)</span></span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={privateLabel} onChange={(e) => setPrivateLabel(e.target.checked)} />
                  <span className="text-sm text-slate-800">Private-label setup <span className="text-slate-500">(+$200 flat)</span></span>
                </label>
              </div>
            )}
          </div>

          {/* Buyer note */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-slate-900">Notes for supplier (optional)</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Specs, delivery window, compliance requirements…"
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-6 w-full rounded-lg px-4 py-3 font-medium text-white hover:opacity-90"
            style={{ backgroundColor: colors.navy }}
          >
            Authorize & pledge
          </button>

          <p className="mt-3 text-xs text-slate-600 text-center">
            You can cancel your commitment any time before the pool locks.
          </p>
        </form>
      </div>
    </div>
  );
}

/* ===========================
   POOL DETAILS MODAL (simple)
   =========================== */
function PoolDetailsModal({ open, pool, onClose }) {
  if (!open || !pool) return null;

  return (
    <div className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 md:p-8 overflow-y-auto" onClick={onClose}>
      <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b bg-white rounded-t-2xl">
          <h3 className="text-xl font-semibold text-slate-900">{pool.title} — Details</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="px-6 py-5 max-h-[80vh] overflow-y-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <img src={pool.image} alt={pool.title} className="w-full h-56 object-cover rounded-xl" />
              <div className="mt-4">
                <h4 className="font-semibold text-slate-900">Overview</h4>
                <p className="text-sm text-slate-700 mt-1">
                  {pool.subtitle}. Verified supplier. Escrow–backed payments via Stripe Connect. Optional third-party inspection available.
                </p>

                <h4 className="font-semibold text-slate-900 mt-4">Specs</h4>
                <ul className="text-sm text-slate-700 list-disc pl-5 mt-1 space-y-1">
                  <li>Unit price: ${pool.unitPrice} per {pool.unitLabel || "unit"} (ex-works)</li>
                  <li>Minimum pledge: {pool.minUnits} {pool.unitLabel || "units"}</li>
                  <li>Compliance: COA, MSDS on file (sample)</li>
                  <li>Freight: pooled lanes available</li>
                </ul>

                <h4 className="font-semibold text-slate-900 mt-4">Timeline</h4>
                <ol className="text-sm text-slate-700 list-decimal pl-5 mt-1 space-y-1">
                  <li>Pool open — buyers join & pledge</li>
                  <li>Pool locks — funds move to escrow; production starts</li>
                  <li>Inspection (optional) — release balance</li>
                  <li>Consolidated freight — delivery</li>
                </ol>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-xs text-slate-600">Group progress</p>
                <div className="mt-1 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full" style={{ width: `${Math.round((pool.progress / pool.target) * 100)}%`, backgroundColor: colors.gold }} />
                </div>
                <p className="mt-2 text-sm text-slate-700">{pool.progress}/{pool.target} buyers joined</p>

                <button
                  onClick={() => {
                    onClose();
                    // open Join after closing details (little UX helper)
                    const evt = new CustomEvent("open-join-from-details", { detail: pool });
                    window.dispatchEvent(evt);
                  }}
                  className="mt-4 w-full rounded-lg px-4 py-2.5 font-medium text-white"
                  style={{ backgroundColor: colors.navy }}
                >
                  Join this pool
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* bridge event so Details can open Join afterwards */}
      <BridgeOpenJoin />
    </div>
  );
}

// Listens for the custom event fired in Details to open Join
function BridgeOpenJoin() {
  React.useEffect(() => {
    const handler = (e) => {
      // Give the page a tick so Details can close before opening Join
      setTimeout(() => {
        const evt = new CustomEvent("bridge-open-join", { detail: e.detail });
        window.dispatchEvent(evt);
      }, 50);
    };
    window.addEventListener("open-join-from-details", handler);
    return () => window.removeEventListener("open-join-from-details", handler);
  }, []);
  return null;
}
