import React from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";

// Assets (place under src/assets and update paths if different)
import refinedSugar from "./assets/refinedsugar.png";
import sugarHeader from "./assets/sugarheader.png";
import coffeeHeader from "./assets/coffeebeansheader.png";
import fabricsHeader from "./assets/fabricheader.png";
import metalsHeader from "./assets/metalheader.png";
import hairHeader from "./assets/humanhairheader.png";
import howWorksBg from "./assets/factoryhowitworkssection.png";

// ------------------------------------------------------------
// THEME
// ------------------------------------------------------------
const colors = {
  navy: "#1B2A41",
  gold: "#F0A92D",
  bgLight: "#F7F5F2",
};

// Join flow context so any card can open the join modal
const JoinPoolContext = React.createContext({ openJoin: (_pool) => {} });

// ============================================================
// ROOT APP (default export)
// ============================================================
export default function App() {
  const [joinOpen, setJoinOpen] = React.useState(false);
  const [activePool, setActivePool] = React.useState(null);
  const openJoin = (pool) => {
    setActivePool(pool);
    setJoinOpen(true);
  };
  const closeJoin = () => setJoinOpen(false);

  return (
    <JoinPoolContext.Provider value={{ openJoin }}>
      <div className="min-h-screen bg-white">
        <Hero />
        <HowItWorks />
        <PoolsSection />
        <MadeInUSASection />
        <SupplierBand />
        <AfterSupplierInfo />
        <SiteFooter />
      </div>

      {/* Global join modal lives once here */}
      <JoinModal open={joinOpen} pool={activePool} onClose={closeJoin} />
    </JoinPoolContext.Provider>
  );
}

// ============================================================
// HERO (announcement + nav + hero card)
// ============================================================
function Hero() {
  return (
    <section className="relative isolate">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#F7F5F2] to-[#ECEBE7]" />

      {/* Announcement bar */}
      <div className="w-full border-b border-slate-200 bg-white/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center gap-3 text-slate-800 text-sm">
          <span className="rounded-full px-2 py-0.5 text-xs" style={{ backgroundColor: colors.gold, color: colors.navy }}>
            Limited Pilot
          </span>
          <span className="font-medium" style={{ color: colors.navy }}>
            Factory pricing, without factory MOQs.
          </span>
        </div>
      </div>

      {/* Nav */}
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg grid place-items-center text-white font-black" style={{ backgroundColor: colors.navy }}>
            G
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

      {/* Categories (chips) */}
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
                style={{ ["--tw-ring-color"]: colors.gold }}
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="lg:col-span-6">
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
            <a href="#pools" className="inline-flex items-center justify-center rounded-lg px-5 py-3 font-medium text-white hover:opacity-90" style={{ backgroundColor: colors.navy }}>
              Join an open pool
            </a>
            <a href="#create" className="inline-flex items-center justify-center rounded-lg border px-5 py-3 text-slate-900 hover:bg-slate-50" style={{ borderColor: colors.navy }}>
              Start a new pool
            </a>
          </div>

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

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-6">
          <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-700 text-sm">Featured pool</span>
              <span className="rounded-md px-2 py-1 text-xs text-slate-900" style={{ backgroundColor: colors.bgLight }}>
                Ends in 3d 12h
              </span>
            </div>
            <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100">
              <img src={refinedSugar} alt="Refined sugar crystals" className="h-full w-full object-cover" loading="eager" />
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
              <p className="mt-2 text-xs text-slate-600">More buyers, lower prices. If MOQ isn't met, everyone gets a full refund.</p>
            </div>

            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              <a href="#pools" className="rounded-lg px-4 py-2.5 font-medium text-white hover:opacity-90 grid place-items-center" style={{ backgroundColor: colors.navy }}>
                Join this pool
              </a>
              <a href="#pools" className="rounded-lg border px-4 py-2.5 text-slate-900 hover:bg-slate-50 grid place-items-center" style={{ borderColor: colors.navy }}>
                View details
              </a>
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

// ============================================================
// HOW IT WORKS
// ============================================================
function HowItWorks() {
  const steps = [
    { n: 1, Icon: Users, title: "Join or start a pool", text: "Pick a category and join an open pool, or create your own with a target quantity and deadline." },
    { n: 2, Icon: DollarSign, title: "Commit with escrow", text: "Your funds are held via Stripe Connect until the pool closes. Cancel anytime before close." },
    { n: 3, Icon: Factory, title: "Produce • Inspect • Ship", text: "MOQ met → supplier starts production. Optional third-party inspection. Freight is pooled for better rates." },
  ];

 // Remove this line:
// const metalBgUrl = new URL("./assets/metalheader.png", import.meta.url).href;

return (
  <section id="how" className="relative scroll-mt-28 md:scroll-mt-32">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="relative rounded-3xl overflow-hidden">
        {/* Use the imported variable directly */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundColor: "#0F1826",
            backgroundImage: `linear-gradient(rgba(27,42,65,0.72), rgba(27,42,65,0.72)), url('${metalsHeader}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* ...rest of the component */}
      </div>
    </div>
  </section>
);

          <div className="relative mx-auto max-w-5xl px-4 py-10 sm:py-14 text-center">
            <span className="inline-block rounded-full px-3 py-1 text-xs font-medium border border-white/20 bg-white/10 text-white">
              How it works
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">Pooling power, made simple</h2>
            <p className="mt-3 text-white/90">
              Buyers team up to hit a factory's minimum order (MOQ). Funds sit in escrow. When the pool closes and MOQ is met, production starts and freight is pooled to cut landed cost.
            </p>

            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {steps.map(({ n, Icon, title, text }, idx) => (
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

                  {/* Step number badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white/15 backdrop-blur border border-white/30 grid place-items-center text-sm font-semibold text-white">
                    {n}
                  </div>

                  {/* little connectors on desktop */}
                  {idx < steps.length - 1 && (
                    <>
                      <div className="hidden md:block absolute top-1/2 -right-8 w-12 h-[2px] bg-white/40" />
                      <div className="hidden md:block absolute top-1/2 -right-8 translate-x-full -translate-y-1/2 w-0 h-0 border-y-[10px] border-y-transparent border-l-[10px] border-l-white/60" />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// POOLS (search + cards)
// ============================================================
function PoolsSection() {
  const [q, setQ] = React.useState("");
  const pools = [
    { id: 1, title: "ICUMSA-45 Refined Sugar", subtitle: "MOQ 10 MT • Saigon/Laem Chabang lanes", category: "Sugar", image: refinedSugar, price: "$XXX/MT", oldPrice: "$YYY/MT", progress: 63, target: 100 },
    { id: 2, title: "Specialty Coffee Beans (AA)", subtitle: "MOQ 2 MT • HCMC/Hai Phong lanes", category: "Coffee", image: coffeeHeader, price: "$—/MT", oldPrice: "$—/MT", progress: 41, target: 80 },
    { id: 3, title: "Woven Upholstery Fabrics", subtitle: "MOQ 5,000 m • TH/CN lanes", category: "Fabrics", image: fabricsHeader, price: "$—/m", oldPrice: "$—/m", progress: 28, target: 60 },
  ];

  const filtered = pools.filter((p) => {
    const s = q.trim().toLowerCase();
    if (!s) return true;
    return (
      p.title.toLowerCase().includes(s) ||
      p.category.toLowerCase().includes(s) ||
      p.subtitle.toLowerCase().includes(s)
    );
  });

  return (
    <section id="pools" className="relative scroll-mt-28 md:scroll-mt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 lg:pt-14 pb-8 lg:pb-10">
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

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PoolCard key={p.id} pool={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PoolCard({ pool }) {
  const { openJoin } = React.useContext(JoinPoolContext);
  const pct = Math.round((pool.progress / pool.target) * 100);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="aspect-[16/10] w-full overflow-hidden rounded-lg bg-slate-100 relative">
        <img src={pool.image} alt={pool.title} className="h-full w-full object-cover" />
        {pool.badge && (
          <span className="absolute left-2 top-2 rounded-full bg-white/90 text-slate-900 text-xs font-medium px-2 py-0.5 border border-slate-200">{pool.badge}</span>
        )}
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
        <button className="rounded-lg px-3 py-2 font-medium text-white hover:opacity-90" style={{ backgroundColor: colors.navy }} onClick={() => openJoin(pool)}>
          Join
        </button>
        <button className="rounded-lg border px-3 py-2 text-slate-900 hover:bg-slate-50" style={{ borderColor: colors.navy }}>
          Details
        </button>
      </div>
    </div>
  );
}

// ============================================================
// MADE IN USA (curated)
// ============================================================
function MadeInUSASection() {
  const usaPools = [
    { id: "us1", title: "Organic Cane Sugar (USA)", subtitle: "MOQ 5 MT • Gulf Coast lanes", category: "Sugar", image: refinedSugar, price: "$—/MT", oldPrice: "$—/MT", progress: 12, target: 40, badge: "Made in USA" },
    { id: "us2", title: "Premium Cotton Fabric (USA)", subtitle: "MOQ 3,000 m • Southeast lanes", category: "Fabrics", image: fabricsHeader, price: "$—/m", oldPrice: "$—/m", progress: 26, target: 60, badge: "Made in USA" },
    { id: "us3", title: "Corrugated Steel Panels (USA)", subtitle: "MOQ 20,000 ft² • Midwest lanes", category: "Metals", image: metalsHeader, price: "$—/ft²", oldPrice: "$—/ft²", progress: 18, target: 50, badge: "Made in USA" },
  ];

  return (
    <section id="made-in-usa" className="relative scroll-mt-28 md:scroll-mt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Made in USA</h2>
        <p className="text-slate-700">American-made pools curated for faster lead times and simpler logistics.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {usaPools.map((p) => (
            <PoolCard key={p.id} pool={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SUPPLIER BAND (frosted)
// ============================================================
function SupplierBand() {
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

  // SUPER-RELIABLE URL for CSS background
  const factoryBgUrl = new URL("./assets/factoryhowitworkssection.png", import.meta.url).href;

  return (
    <section id="suppliers" className="relative overflow-hidden">
      {/* Background (base color + gradient + image) */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundColor: "#0F1826",
          backgroundImage: `linear-gradient(rgba(27,42,65,0.72), rgba(27,42,65,0.72)), url('${factoryBgUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Supplier invite card */}
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

          {/* Commodity interest capture card */}
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

// ============================================================
// AFTER SUPPLIER INFO (benefits + CTA band)
// ============================================================
function AfterSupplierInfo() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
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
              <li className="flex items-start gap-2"><X className="h-5 w-5 mt-0.5 text-slate-400" />Small‑lot or retail pricing</li>
              <li className="flex items-start gap-2"><X className="h-5 w-5 mt-0.5 text-slate-400" />You carry more risk up front</li>
              <li className="flex items-start gap-2"><X className="h-5 w-5 mt-0.5 text-slate-400" />Higher freight per unit</li>
              <li className="flex items-start gap-2"><X className="h-5 w-5 mt-0.5 text-slate-400" />Limited supplier leverage</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2"><Clock className="h-5 w-5" style={{ color: colors.navy }} /> What happens to your money</h3>
            <ol className="mt-3 list-decimal pl-6 text-sm text-slate-700 space-y-1">
              <li>Commit → funds held in escrow (Stripe Connect).</li>
              <li>Pool closes → MOQ met: capture & pay supplier; MOQ not met: instant refund.</li>
              <li>Shipment arranged → pooled freight → delivery.</li>
            </ol>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2"><Percent className="h-5 w-5" style={{ color: colors.navy }} /> Typical savings</h3>
            <p className="mt-3 text-sm text-slate-700">Members report double‑digit savings versus buying solo, depending on category and ship lane.</p>
            <div className="mt-4 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full" style={{ width: "22%", backgroundColor: colors.gold }} />
            </div>
            <p className="mt-2 text-xs text-slate-600">Illustrative savings based on recent pools.</p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
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

// ============================================================
// FOOTER
// ============================================================
function SiteFooter() {
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
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
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
                  <li><a href="#how" className="hover:text-white inline-flex items-center gap-1">How it works <ArrowUpRight className="h-3 w-3" /></a></li>
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

// ============================================================
// JOIN MODAL (global)
// ============================================================
function JoinModal({ open, pool, onClose }) {
  const platformFeePct = pool?.platformFeePct ?? 0.03;
  const unitPrice = pool?.unitPrice ?? 27;
  const minUnits = pool?.minUnits ?? 12;

  const [units, setUnits] = React.useState(minUnits);
  const [company, setCompany] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [country, setCountry] = React.useState("United States");

  React.useEffect(() => { if (open) setUnits(minUnits); }, [open, minUnits]);
  if (!open || !pool) return null;

  const est = Math.round(units * unitPrice * (1 + platformFeePct));
  const valid = Number(units) >= minUnits && company.trim() && contact.trim();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!valid) return;
    const payload = { poolId: pool.id, poolTitle: pool.title, units: Number(units), unitPrice, platformFeePct, estimatedAuthorization: est, company, contact, website, country };
    console.log("Pledge submitted", payload);
    alert("Pledge submitted! We'll email you a confirmation.");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      {/* Make dialog scrollable and keyboard-friendly */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-xl max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-slate-200 bg-white/95 backdrop-blur">
          <h3 className="text-lg sm:text-xl font-semibold text-slate-900">Join: {pool.title}</h3>
          <button onClick={onClose} className="h-9 w-9 grid place-items-center rounded-md hover:bg-slate-50">✕</button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-800">Units to pledge (min {minUnits})</label>
            <input type="number" min={minUnits} value={units} onChange={(e) => setUnits(Number(e.target.value))} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300" />
            <p className="mt-1 text-xs text-slate-500">You can edit or cancel before the pool locks.</p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-800">Estimated Cost (authorization at pledge)</p>
            <p className="text-3xl font-extrabold text-slate-900 mt-1">${est.toLocaleString()}</p>
            <p className="text-xs text-slate-500">${unitPrice} per unit • Platform fee {Math.round(platformFeePct * 100)}% included</p>
            <p className="text-xs text-slate-500">Funds <span className="font-semibold">authorized</span> now, <span className="font-semibold">moved to escrow on lock</span></p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800">Company / Brand</label>
            <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g., MP Global Exports" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800">Contact Name</label>
            <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Your full name" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800">Website / Social</label>
            <input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://… or @handle" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800">Country (USA‑only for MVP)</label>
            <select value={country} onChange={(e) => setCountry(e.target.value)} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-slate-300">
              <option>United States</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg border px-4 py-2 text-slate-900 hover:bg-slate-50" style={{ borderColor: colors.navy }}>Cancel</button>
            <button type="submit" disabled={!valid} className="rounded-lg px-4 py-2 font-medium text-white disabled:opacity-60" style={{ backgroundColor: colors.navy }}>Join & Authorize</button>
          </div>
        </form>
      </div>
    </div>
  );
}
