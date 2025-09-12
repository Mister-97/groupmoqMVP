// src/pages/OpenPoolsPage.jsx
import React from "react";
import { motion } from "framer-motion";
import TopNav from "../components/TopNav";
import {
  Search, Percent, Users, Truck, ShieldCheck, Filter, ArrowRight, Check, X, Clock
} from "lucide-react";
import { SiteFooter } from "../App.jsx";

// Product images (swap with your own if you like)
import sugarImg from "../assets/refinedsugar.png";
import coffeeImg from "../assets/coffeebeansheader.png";
import fabricsImg from "../assets/fabricheader.png";
import metalsImg from "../assets/metalheader.png";

const colors = { navy: "#1B2A41", gold: "#F0A92D", bg: "#F7F5F2" };


/* ------------------------- Demo data with real-ish $ ------------------------ */
const POOLS = [
  {
    id: "sugar-icumsa-45",
    title: "ICUMSA-45 Refined Sugar",
    subtitle: "MOQ 10 MT • Saigon / Laem Chabang lanes",
    category: "Sugar",
    priceDisplay: "$540/MT",
    oldPrice: "$620/MT",
    unitPrice: 540,          // pooled price used in Join math
    soloUnitPrice: 620,      // for “save up to” badge
    unitLabel: "MT",
    minUnits: 10,
    currency: "USD",
    progress: 63,
    target: 100,
    deadline: "2025-10-15",
    madeInUSA: false,
    image: sugarImg,
  },
  {
    id: "coffee-aa",
    title: "Specialty Coffee Beans (AA)",
    subtitle: "MOQ 2 MT • HCMC / Hai Phong lanes",
    category: "Coffee",
    priceDisplay: "$3,200/MT",
    oldPrice: "$3,650/MT",
    unitPrice: 3200,
    soloUnitPrice: 3650,
    unitLabel: "MT",
    minUnits: 2,
    currency: "USD",
    progress: 41,
    target: 80,
    deadline: "2025-09-29",
    madeInUSA: false,
    image: coffeeImg,
  },
  {
    id: "fabrics-woven",
    title: "Woven Upholstery Fabrics",
    subtitle: "MOQ 5,000 m • TH/CN lanes",
    category: "Fabrics",
    priceDisplay: "$3.20/m",
    oldPrice: "$3.80/m",
    unitPrice: 3.2,
    soloUnitPrice: 3.8,
    unitLabel: "m",
    minUnits: 5000,
    currency: "USD",
    progress: 28,
    target: 60,
    deadline: "2025-10-08",
    madeInUSA: false,
    image: fabricsImg,
  },
  {
    id: "usa-cotton",
    title: "Premium Cotton Fabric (USA)",
    subtitle: "MOQ 3,000 m • Southeast lanes",
    category: "Fabrics",
    priceDisplay: "$4.10/m",
    oldPrice: "$4.70/m",
    unitPrice: 4.1,
    soloUnitPrice: 4.7,
    unitLabel: "m",
    minUnits: 3000,
    currency: "USD",
    progress: 26,
    target: 60,
    deadline: "2025-10-01",
    madeInUSA: true,
    image: fabricsImg,
  },
  {
    id: "usa-steel",
    title: "Corrugated Steel Panels (USA)",
    subtitle: "MOQ 20,000 ft² • Midwest lanes",
    category: "Metals",
    priceDisplay: "$1.80/ft²",
    oldPrice: "$2.15/ft²",
    unitPrice: 1.8,
    soloUnitPrice: 2.15,
    unitLabel: "ft²",
    minUnits: 20000,
    currency: "USD",
    progress: 18,
    target: 50,
    deadline: "2025-10-20",
    madeInUSA: true,
    image: metalsImg,
  },
];

/* ------------------------------ Small helpers ------------------------------ */
const SectionTitle = ({ children }) => (
  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{children}</h2>
);

const Chip = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${
      active
        ? "bg-[--navy] text-white border-transparent"
        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
    }`}
    style={{ "--navy": colors.navy }}
  >
    {children}
  </button>
);

function timeLeft(deadline) {
  const ms = +new Date(deadline) - Date.now();
  if (ms <= 0) return "Locked";
  const d = Math.floor(ms / (1000 * 60 * 60 * 24));
  const h = Math.floor((ms / (1000 * 60 * 60)) % 24);
  return d > 0 ? `${d}d ${h}h left` : `${h}h left`;
}

/* ------------------------------- Join Modal -------------------------------- */
function JoinModal({ open, pool, onClose }) {
  const [units, setUnits] = React.useState(pool?.minUnits || 1);
  React.useEffect(() => setUnits(pool?.minUnits || 1), [pool]);

  if (!open || !pool) return null;

  const subtotal = units * pool.unitPrice;
  const total = subtotal * 1.03; // +3% platform fee
  const fmt = (n) =>
    n.toLocaleString("en-US", { style: "currency", currency: pool.currency || "USD", maximumFractionDigits: 0 });

  const submit = (e) => {
    e.preventDefault();
    console.log("JOIN →", { poolId: pool.id, units, estimate: total });
    alert("Thanks! Your pledge has been recorded (demo).");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm p-4 flex items-start justify-center overflow-y-auto" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-slate-900">Join: {pool.title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={submit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium">
              {pool.unitLabel} to pledge (min {pool.minUnits.toLocaleString()})
            </label>
            <input
              type="number"
              min={pool.minUnits}
              value={units}
              onChange={(e) => setUnits(Math.max(pool.minUnits, Number(e.target.value || 0)))}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>

          <div className="rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-700">
              {pool.unitLabel} price: <b>{fmt(pool.unitPrice)}</b> • Platform fee: <b>3%</b>
            </p>
            <p className="mt-1 text-2xl font-extrabold">{fmt(total)}</p>
            <p className="text-xs text-slate-600">Authorization now. Funds move to escrow when pool locks.</p>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg px-4 py-3 font-medium text-white hover:opacity-90"
            style={{ backgroundColor: colors.navy }}
          >
            Authorize & pledge
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------------------------- Details (light) ------------------------------- */
function DetailsModal({ open, pool, onClose, onJoinAfter }) {
  const [remaining, setRemaining] = React.useState(() => timeLeft(pool?.deadline || 0));

  React.useEffect(() => {
    if (!open || !pool) return;
    setRemaining(timeLeft(pool.deadline));
    const id = setInterval(() => setRemaining(timeLeft(pool.deadline)), 1000 * 60); // update every minute
    return () => clearInterval(id);
  }, [open, pool]);

  if (!open || !pool) return null;
  const pct = Math.round((pool.progress / pool.target) * 100);

  return (
    <div className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm p-4 flex items-start justify-center overflow-y-auto" onClick={onClose}>
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-slate-900">{pool.title} — Details</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="px-6 py-5 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <img src={pool.image} alt={pool.title} className="w-full h-40 object-cover rounded-xl" />
            <p className="text-slate-700">{pool.subtitle}</p>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 rounded-full border px-2 py-1 bg-slate-50 border-slate-200 text-slate-700">
                <ShieldCheck className="h-3.5 w-3.5" /> Escrow protected
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border px-2 py-1 bg-slate-50 border-slate-200 text-slate-700">
                <Truck className="h-3.5 w-3.5" /> Pooled freight
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border px-2 py-1 bg-slate-50 border-slate-200 text-slate-700">
                <Percent className="h-3.5 w-3.5" /> Group savings
              </span>
            </div>

            <h4 className="font-semibold text-slate-900">Specs (sample)</h4>
            <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1">
              <li>Unit price (pooled): {pool.priceDisplay} (ex-works)</li>
              <li>Minimum pledge: {pool.minUnits.toLocaleString()} {pool.unitLabel}</li>
              <li>Compliance support available (COA/MSDS)</li>
              <li>Optional third-party QC</li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-600">Group progress</p>
              <div className="mt-1 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full" style={{ width: `${pct}%`, backgroundColor: colors.gold }} />
              </div>
              <p className="mt-2 text-sm text-slate-700">
                {pool.progress}/{pool.target} buyers joined
              </p>

              <div className="mt-3 flex items-center gap-2 text-sm text-slate-700">
                <Clock className="h-4 w-4" />
                <span>Locks in: <b>{remaining}</b></span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onJoinAfter?.(pool);
                }}
                className="mt-4 w-full rounded-lg px-4 py-2.5 font-medium text-white hover:opacity-90"
                style={{ backgroundColor: colors.navy }}
              >
                Join this pool
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- Page ----------------------------------- */
export default function OpenPoolsPage() {
  const [query, setQuery] = React.useState("");
  const [cat, setCat] = React.useState("All");
  const [sort, setSort] = React.useState("ending");
  const [usaOnly, setUsaOnly] = React.useState(false);

  const [joinOpen, setJoinOpen] = React.useState(false);
  const [detailsOpen, setDetailsOpen] = React.useState(false);
  const [activePool, setActivePool] = React.useState(null);

  const categories = ["All", "Sugar", "Coffee", "Fabrics", "Metals", "Human Hair"];

  const openJoin = (p) => { setActivePool(p); setJoinOpen(true); };
  const openDetails = (p) => { setActivePool(p); setDetailsOpen(true); };
  const closeJoin = () => setJoinOpen(false);
  const closeDetails = () => setDetailsOpen(false);

  const filtered = POOLS.filter((p) => {
    const q = query.trim().toLowerCase();
    const matchesQ = !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q);
    const matchesCat = cat === "All" || p.category === cat;
    const matchesUSA = !usaOnly || p.madeInUSA;
    return matchesQ && matchesCat && matchesUSA;
  }).sort((a, b) => {
    if (sort === "ending") return +new Date(a.deadline) - +new Date(b.deadline);
    if (sort === "savings") {
      const sA = (a.soloUnitPrice - a.unitPrice) / a.soloUnitPrice;
      const sB = (b.soloUnitPrice - b.unitPrice) / b.soloUnitPrice;
      return sB - sA;
    }
    if (sort === "popular") return b.progress / b.target - a.progress / a.target;
    return 0;
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bg }}>
      {/* Hero */}
      <div className="relative isolate bg-gradient-to-b from-[#0F1826] to-[#15233A] text-white">
  <TopNav inverted />   {/* <-- use the shared nav here */}

  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10 pt-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs">
                <ShieldCheck className="h-4 w-4" /> Escrow-backed pools
              </span>
              <h1 className="mt-3 text-4xl sm:text-5xl/tight font-extrabold">
                Join an open pool. <span className="text-white/80">Buy like a factory.</span>
              </h1>
              <p className="mt-3 text-white/90 max-w-2xl">
                Hit MOQ together, unlock factory pricing, and split the freight. If a pool doesn’t hit MOQ, everyone is refunded — instantly.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-4 max-w-md">
                {[
                  { Icon: Users, label: "Buyers pooled", value: "2,340+" },
                  { Icon: Percent, label: "Avg. savings", value: "22%" },
                  { Icon: Truck, label: "Ship lanes", value: "US ↔ VN/TH/CN" },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-white/10 border border-white/20 grid place-items-center">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-white/70 text-xs uppercase tracking-wider">{label}</p>
                      <p className="text-white font-semibold">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur p-6">
                <p className="text-white/80 text-sm">How it works</p>
                <div className="mt-2 space-y-2 text-sm text-white/90">
                  <p className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5" /> Join a live pool with a clear MOQ and deadline</p>
                  <p className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5" /> Authorize via escrow — cancel anytime before lock</p>
                  <p className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5" /> Production + optional QC, then pooled freight</p>
                </div>
                <a
                  href="/how-it-works"
                  className="mt-4 inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium text-navy-900"
                  style={{ backgroundColor: colors.gold }}
                >
                  See the process <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Filters */}
<section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
  <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
    <div className="flex flex-col gap-3">
      {/* Row 1: Search + controls (wraps on small screens) */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-[1_1_420px] min-w-[260px] max-w-[700px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pools (e.g., sugar, coffee, fabrics)"
            className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>

        {/* Right-side controls */}
        <div className="ml-auto flex items-center gap-3 flex-wrap">
          <label className="text-sm text-slate-700 hidden sm:inline-flex items-center gap-2">
            <Filter className="h-4 w-4" /> Sort
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            <option value="ending">Ending soon</option>
            <option value="popular">Most popular</option>
            <option value="savings">Best savings</option>
          </select>

          <label className="flex items-center gap-2 text-sm text-slate-800">
            <input
              type="checkbox"
              checked={usaOnly}
              onChange={(e) => setUsaOnly(e.target.checked)}
            />
            Made in USA only
          </label>
        </div>
      </div>

      {/* Row 2: Category chips (small, one line on desktop, wraps on mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto sm:overflow-visible py-1">
        {categories.map((c) => (
          <Chip key={c} active={cat === c} onClick={() => setCat(c)}>
            {c}
          </Chip>
        ))}
      </div>
    </div>
  </div>
</section>


      {/* Pools grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <SectionTitle>Open pools</SectionTitle>
        <p className="text-slate-700">Join a group already forming, or filter by category to find your lane.</p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => {
            const pct = Math.round((p.progress / p.target) * 100);
            const savingsPct = Math.max(0, Math.round(((p.soloUnitPrice - p.unitPrice) / p.soloUnitPrice) * 100));
            const remaining = timeLeft(p.deadline);
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                {/* image */}
                <div className="aspect-[16/10] w-full overflow-hidden rounded-lg bg-slate-100 relative">
                  <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                  {/* savings badge */}
                  <div className="absolute top-2 right-2 rounded-full bg-white/90 border border-slate-200 px-2 py-0.5 text-xs font-medium text-slate-900">
                    Save ~{savingsPct}%
                  </div>
                </div>

                {/* title + USA pill */}
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">{p.title}</h3>
                    <p className="text-slate-600 text-sm">{p.subtitle}</p>
                  </div>
                  {p.madeInUSA && (
                    <span className="text-xs rounded-full border px-2 py-0.5 bg-red-50 border-red-200 text-red-800">🇺🇸 USA</span>
                  )}
                </div>

                {/* price row */}
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="font-extrabold text-slate-900">{p.priceDisplay}</span>
                  <span className="text-slate-400 line-through text-xs">{p.oldPrice}</span>
                </div>

                {/* progress + countdown */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>Group progress</span>
                    <span>{p.progress}/{p.target}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full" style={{ width: `${pct}%`, backgroundColor: colors.gold }} />
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Locks in {remaining}</span>
                  </div>
                </div>

                {/* trust chips */}
                <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                  <span className="inline-flex items-center gap-1 rounded-full border px-2 py-1 bg-slate-50 border-slate-200 text-slate-700">
                    <ShieldCheck className="h-3.5 w-3.5" /> Escrow
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border px-2 py-1 bg-slate-50 border-slate-200 text-slate-700">
                    <Truck className="h-3.5 w-3.5" /> Pooled freight
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border px-2 py-1 bg-slate-50 border-slate-200 text-slate-700">
                    <Percent className="h-3.5 w-3.5" /> Group rate
                  </span>
                </div>

                {/* actions */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => openJoin(p)}
                    className="rounded-lg px-3 py-2 font-medium text-white hover:opacity-90"
                    style={{ backgroundColor: colors.navy }}
                  >
                    Join
                  </button>
                  <button
                    onClick={() => openDetails(p)}
                    className="rounded-lg border px-3 py-2 text-slate-900 hover:bg-slate-50"
                    style={{ borderColor: colors.navy }}
                  >
                    Details
                  </button>
                </div>

                <p className="mt-3 text-xs text-slate-600">
                  Refund if MOQ isn’t met • {p.minUnits.toLocaleString()} {p.unitLabel} minimum
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Persuasion band */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-6 w-6 flex-shrink-0" style={{ color: colors.navy }} />
            <p className="text-slate-800">
              <span className="font-semibold">Escrow first. Production after lock.</span> If a pool doesn’t hit MOQ, your funds are released instantly.
            </p>
          </div>
          <a
            href="/how-it-works"
            className="inline-flex items-center justify-center rounded-lg px-5 py-3 font-medium text-white hover:opacity-90"
            style={{ backgroundColor: colors.navy }}
          >
            How pooling works <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>

      <SiteFooter />

      {/* Modals */}
      <JoinModal open={joinOpen} pool={activePool} onClose={closeJoin} />
      <DetailsModal open={detailsOpen} pool={activePool} onClose={closeDetails} onJoinAfter={openJoin} />
    </div>
  );
}
