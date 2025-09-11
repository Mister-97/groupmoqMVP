// src/pages/HowItWorksPage.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import TopNav from "../components/TopNav";
import {
  Users,
  ShieldCheck,
  Truck,
  DollarSign,
  Factory,
  Check,
  Clock,
  Percent,
  ArrowRight,
  ChevronDown,
  ArrowUpRight,
  LineChart,
} from "lucide-react";

import metalsHeader from "../assets/shippingport.png";
import { SiteFooter } from "../App.jsx";

const colors = {
  navy: "#1B2A41",
  gold: "#F0A92D",
  bgLight: "#F7F5F2",
};

/* -------------------------------------------
   Small UI helpers
------------------------------------------- */
const Chip = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-white/90 text-xs">
    {children}
  </span>
);

function FAQItem({ q, a, defaultOpen = false }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <span className="font-medium text-slate-900">{q}</span>
        <ChevronDown className={`h-4 w-4 text-slate-500 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-4 pb-4 text-sm text-slate-700">{a}</div>}
    </div>
  );
}


/* -------------------------------------------
   Two-box explainer pieces
------------------------------------------- */
function PoolingBars() {
  return (
    <div className="mt-5 space-y-6">
      {/* Unit price */}
      <div>
        <div className="flex justify-between text-sm font-medium">
          <span>Unit price</span>
          <span className="text-green-700 font-semibold">~30% lower</span>
        </div>
        <div className="mt-2 h-3 w-full bg-slate-200 rounded-full relative overflow-hidden">
          {/* Solo (faded) */}
          <div className="absolute left-0 top-0 h-full w-full bg-slate-300" />
          {/* GroupMOQ (gold highlight) */}
          <div
            className="absolute left-0 top-0 h-full bg-[#F0A92D]"
            style={{ width: "70%" }}
          />
        </div>
        <div className="mt-1 flex justify-between text-xs">
          <span className="text-slate-500">Solo</span>
          <span className="font-semibold text-slate-900 flex items-center gap-1">
            GroupMOQ ✅
          </span>
        </div>
      </div>

      {/* Freight per unit */}
      <div>
        <div className="flex justify-between text-sm font-medium">
          <span>Freight per unit</span>
          <span className="text-green-700 font-semibold">~40% less</span>
        </div>
        <div className="mt-2 h-3 w-full bg-slate-200 rounded-full relative overflow-hidden">
          {/* Solo (faded) */}
          <div className="absolute left-0 top-0 h-full w-full bg-slate-300" />
          {/* GroupMOQ (gold highlight) */}
          <div
            className="absolute left-0 top-0 h-full bg-[#F0A92D]"
            style={{ width: "60%" }}
          />
        </div>
        <div className="mt-1 flex justify-between text-xs">
          <span className="text-slate-500">Solo</span>
          <span className="font-semibold text-slate-900 flex items-center gap-1">
            GroupMOQ ✅
          </span>
        </div>
      </div>
    </div>
  );
}

function SavingsSimulatorExact() {
  // Fixed, illustrative example matching your screenshot
  const [qty, setQty] = React.useState(12);

  const unitSolo = 32;
  const unitGroup = 27;

  // Freight “floors” only (so 12 units shows 684 / 504 / 180 exactly)
  const freightSolo = 300;
  const freightGroup = 180;

  const totalSolo = qty * unitSolo + freightSolo;
  const totalGroup = qty * unitGroup + freightGroup;
  const savings = Math.max(0, totalSolo - totalGroup);
  const pct = Math.round((savings / totalSolo) * 100);

  const fmt = (n) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-6">
      <p className="text-slate-700">
        Move the slider—see how pooling can improve your landed cost.{" "}
        <span className="text-slate-500">(Illustrative example.)</span>
      </p>

      <label className="block text-base font-medium text-slate-900">
        Units you plan to buy
      </label>

      <input
        type="range"
        min={1}
        max={120}
        step={1}
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        className="w-full accent-slate-800"
      />

      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-700">
          Qty: <span className="font-semibold text-slate-900">{qty}</span>
        </span>
        <span className="text-slate-500">Illustrative pricing</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Buying solo */}
        <div className="rounded-2xl border border-slate-200 p-6 bg-white shadow-[0_1px_0_0_rgba(2,6,23,0.04)]">
          <p className="text-xs font-semibold tracking-wide text-slate-600">BUYING SOLO</p>
          <p className="mt-2 text-4xl font-extrabold text-slate-900">{fmt(totalSolo)}</p>
          <p className="mt-2 text-sm text-slate-600">@ ${unitSolo}/unit + freight</p>
        </div>

        {/* With GroupMOQ */}
        <div className="rounded-2xl border border-slate-200 p-6 bg-white shadow-[0_1px_0_0_rgba(2,6,23,0.04)]">
          <p className="text-xs font-semibold tracking-wide text-slate-600">WITH GROUPMOQ</p>
          <p className="mt-2 text-4xl font-extrabold text-slate-900">{fmt(totalGroup)}</p>
          <p className="mt-2 text-sm text-slate-600">@ ${unitGroup}/unit + pooled freight</p>
        </div>

        {/* Savings (highlighted) */}
        <div className="rounded-2xl border border-amber-200 p-6 bg-amber-50 shadow-[0_1px_0_0_rgba(2,6,23,0.04)]">
          <p className="text-xs font-semibold tracking-wide text-slate-700">EST. SAVINGS</p>
          <p className="mt-2 text-4xl font-extrabold text-slate-900">
            {fmt(savings)}
            <span className="ml-2 align-baseline text-base font-medium text-slate-700">
              (~{pct}%)
            </span>
          </p>

          <a
            href="/#pools"
            className="mt-4 inline-flex items-center gap-2 text-slate-900 underline decoration-2 underline-offset-4"
          >
            Join an open pool
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}


/* -------------------------------------------
   Page
------------------------------------------- */
export default function HowItWorksPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1); // "faq"
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      {/* hero */}
      <section className="relative isolate">
  <div className="absolute inset-0 -z-10">
    <img src={metalsHeader} alt="Background" className="h-full w-full object-cover" />
    <div className="absolute inset-0 bg-[rgba(27,42,65,0.72)]" />
  </div>

  {/* Nav inside hero */}
  <TopNav inverted />   {/* <-- use inverted here */}

  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10 lg:pb-16 text-center text-white">
          <span className="inline-block rounded-full px-3 py-1 text-xs font-medium border border-white/20 bg-white/10">
            How it works
          </span>
          <h1 className="mt-3 text-3xl sm:text-5xl/tight font-extrabold">Pooling power, made simple</h1>
          <p className="mt-3 max-w-2xl mx-auto text-white/90">
            Buyers team up to hit a factory’s minimum order (MOQ). Funds sit in escrow. When the pool closes and MOQ is met,
            production starts and freight is pooled to cut landed cost.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
            <Chip><Check className="h-4 w-4" /> Verified suppliers</Chip>
            <Chip><ShieldCheck className="h-4 w-4" /> Escrow protected</Chip>
            <Chip><Truck className="h-4 w-4" /> Pooled freight</Chip>
          </div>

          <div className="mt-8">
            <a
              href="/#pools"
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium text-navy-900"
              style={{ backgroundColor: colors.gold }}
            >
              Explore open pools <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 1) How it works — in 4 steps */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center">How it works — in 4 steps</h2>

        <div className="mt-8 grid md:grid-cols-4 gap-6">
          {[
            {
              Icon: Users,
              title: "1) Join a pool",
              text: "Pick a live pool in your category (or start one). Each pool shows target MOQ, deadline and docs.",
            },
            {
              Icon: ShieldCheck,
              title: "2) Commit via escrow",
              text: "Authorize your pledge. Funds are held via Escrow.com until the pool locks. Cancel anytime before lock.",
            },
            {
              Icon: Factory,
              title: "3) Production & QC",
              text: "MOQ met → supplier starts production. Optional third-party inspection available before release.",
            },
            {
              Icon: Truck,
              title: "4) Consolidated freight",
              text: "We pool shipments on common lanes to reduce landed cost. Track to delivery or arrange your own freight.",
            },
          ].map(({ Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white border border-slate-200 grid place-items-center">
                  <Icon className="h-5 w-5" style={{ color: colors.navy }} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
              </div>
              <p className="mt-3 text-slate-700 text-sm leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/#pools"
            className="inline-flex items-center justify-center rounded-lg px-5 py-3 font-medium text-white hover:opacity-90"
            style={{ backgroundColor: colors.navy }}
          >
            See pools now <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </section>

      {/* 2) Why pooling wins + Savings calculator */}
<section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
  <div className="grid lg:grid-cols-12 gap-8 items-stretch">
    {/* LEFT: Why pooling beats solo buying */}
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className="lg:col-span-5 h-full flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <h3 className="text-[20px] font-bold text-slate-900 flex items-center gap-2">
        <LineChart className="h-5 w-5" style={{ color: colors.navy }} />
        Why pooling beats solo buying
      </h3>

      <p className="mt-3 text-[15px] leading-7 text-slate-700">
        Factories quote best pricing at MOQ. Alone, you rarely hit it. Together, you do—
        and you share the lower rate and the freight.
      </p>

      <div className="mt-6 flex-grow">
        <PoolingBars />
      </div>

      <a
        href="/#pools"
        className="mt-auto inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium text-white hover:opacity-90"
        style={{ backgroundColor: colors.navy }}
      >
        See active pools <ArrowRight className="ml-2 h-4 w-4" />
      </a>
    </motion.div>

    {/* RIGHT: Your savings in 10 seconds */}
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      className="lg:col-span-7 h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="flex items-center gap-2 text-slate-900">
        <DollarSign className="h-5 w-5" />
        <h3 className="text-xl font-bold">Your savings in 10 seconds</h3>
      </div>

      <div className="mt-4">
        <SavingsSimulatorExact />
      </div>
    </motion.div>
  </div>
</section>



      {/* 3) Trust + Process details */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Clock className="h-5 w-5" style={{ color: colors.navy }} /> What happens to your money
            </h3>
            <ol className="mt-3 list-decimal pl-6 text-sm text-slate-700 space-y-1">
              <li>Commit → funds held in escrow (Escrow.com).</li>
              <li>Pool closes → MOQ met: capture & pay supplier; not met: instant refund.</li>
              <li>Shipment arranged → pooled freight → delivery.</li>
            </ol>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Quality, compliance & logistics</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2"><Check className="h-5 w-5 mt-0.5" style={{ color: colors.navy }} /> Verified suppliers, documents on file (COA, MSDS when applicable)</li>
              <li className="flex items-start gap-2"><Check className="h-5 w-5 mt-0.5" style={{ color: colors.navy }} /> Optional third-party inspection & QC services</li>
              <li className="flex items-start gap-2"><Truck className="h-5 w-5 mt-0.5" style={{ color: colors.navy }} /> Pooled freight to reduce landed cost</li>
              <li className="flex items-start gap-2"><ShieldCheck className="h-5 w-5 mt-0.5" style={{ color: colors.navy }} /> Escrow-backed transactions</li>
            </ul>
            <div className="mt-6">
              <a
                href="/#pools"
                className="inline-flex items-center justify-center rounded-lg px-5 py-3 font-medium text-white hover:opacity-90"
                style={{ backgroundColor: colors.navy }}
              >
                Browse open pools <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4) FAQ */}
      <section id="faq" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center">FAQ</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <FAQItem 
  q="What if the MOQ isn’t met?" 
  a={<span>Everyone gets a <b>full refund</b> immediately when the pool closes.</span>} 
/>

<FAQItem 
  q="Can I cancel my pledge?" 
  a="Yes, up until the pool locks. After that, funds are moved to escrow and production starts." 
/>

<FAQItem 
  q="Who arranges shipping?" 
  a="We coordinate pooled freight on common lanes to reduce cost. You can also arrange your own on request." 
/>

<FAQItem 
  q="Are suppliers vetted?" 
  a="Yes. We verify documentation and can enable third-party inspection for added assurance." 
/>

{/* --- New FAQs --- */}

<FAQItem 
  q="How do I know my money is safe?" 
  a="Funds are held securely in escrow until the pool closes. If MOQ isn’t met, you get a full refund — no delays, no questions asked." 
/>

<FAQItem 
  q="Can I join multiple pools at once?" 
  a="Yes. You can pledge to as many pools as you like across different categories." 
/>

<FAQItem 
  q="What happens if a pool exceeds the MOQ?" 
  a="Extra volume is accepted if the supplier allows it. Otherwise, the pool closes at MOQ and new pools may open." 
/>

<FAQItem 
  q="Are there minimum purchase requirements for buyers?" 
  a="No strict minimums. Each pool shows the smallest unit pledge available, so you can join at the level that fits your needs." 
/>

<FAQItem 
  q="Do I need an import license?" 
  a="In most categories, GroupMOQ manages the import/export process. Certain regulated products may require buyers to provide a license." 
/>

<FAQItem 
  q="How do you vet suppliers?" 
  a="We require all suppliers to provide factory documents (COA, MSDS when applicable). Optional third-party inspections can be arranged." 
/>

<FAQItem 
  q="What industries or categories are supported?" 
  a="Common pools include raw materials, apparel, electronics, and consumer goods. New categories are added as demand grows." 
/>

<FAQItem 
  q="Can I suggest a new supplier or category?" 
  a="Yes! Members can request suppliers or categories. If enough demand exists, we’ll launch a pool." 
/>

<FAQItem 
  q="Where are goods shipped from?" 
  a="Most pools source from factories in Asia, with freight consolidated into common lanes to reduce cost." 
/>

<FAQItem 
  q="How long does it take to receive my order?" 
  a="After MOQ is met and production begins, typical lead times are 4–8 weeks including freight. Timelines vary by category." 
/>

        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
