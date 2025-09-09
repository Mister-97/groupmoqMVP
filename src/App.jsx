import React from "react";
// Place these files under: src/assets/
import refinedSugar from "./assets/refinedsugar.png";
import sugarHeader from "./assets/sugarheader.png";
import coffeeHeader from "./assets/coffeebeansheader.png";
import fabricsHeader from "./assets/fabricheader.png";
import metalsHeader from "./assets/metalheader.png";
import hairHeader from "./assets/humanhairheader.png";
import howWorksBg from "./assets/factoryhowitworkssection.png";
import { motion } from "framer-motion";
import { Users, ShieldCheck, Truck, CheckCircle2, DollarSign, Clock, Percent, ArrowRight, Check, X, Factory, Lightbulb, Send } from "lucide-react";

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
        <span>
          {current}/{target} joined
        </span>
      </div>
      <div className="h-2 w-full bg-navy-100 rounded-full overflow-hidden">
        <div className="h-full bg-gold-500" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-2 text-xs text-navy-700">
        More buyers, lower prices. If MOQ isn’t met, everyone gets a full refund.
      </p>
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

const colors = {
  navy: "#1B2A41",
  gold: "#F0A92D",
  bgLight: "#F7F5F2",
};

export default function Hero() {
  return (
    <>
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
        <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg" style={{ backgroundColor: colors.navy }}>
              <div className="h-full w-full grid place-items-center text-white font-black">G</div>
            </div>
            <span className="font-semibold text-slate-900">GroupMOQ</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-slate-700 text-sm">
            <a href="#how" className="hover:text-slate-900">
              How it works
            </a>
            <a href="#pools" className="hover:text-slate-900">
              Open pools
            </a>
            <a href="#suppliers" className="hover:text-slate-900">
              For suppliers
            </a>
            <a href="#faq" className="hover:text-slate-900">
              FAQ
            </a>
            <a href="#signin" className="rounded-md border border-slate-300 px-3 py-1.5 hover:bg-slate-50">
              Sign in
            </a>
          </nav>
        </header>

        {/* Categories section placed over hero under header */}
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
                  style={{ ['--tw-ring-color']: colors.gold }}
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
              {
                [
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
                ))
              }
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
                <button className="rounded-lg px-4 py-2.5 font-medium text-white hover:opacity-90" style={{ backgroundColor: colors.navy }}>
                  Join this pool
                </button>
                <button className="rounded-lg border px-4 py-2.5 text-slate-900 hover:bg-slate-50" style={{ borderColor: colors.navy }}>
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
      <SupplierBand />
    </>
  );
}

// ---------------------------
// How It Works Section
// ---------------------------

const Step = ({ icon: Icon, title, text, bullets = [] }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-white border border-slate-200 grid place-items-center">
        <Icon className="h-5 w-5" style={{ color: colors.navy }} />
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
    </div>
    <p className="mt-3 text-slate-700 text-sm leading-relaxed">{text}</p>
    {bullets.length > 0 && (
      <ul className="mt-3 space-y-1 text-sm text-slate-700 list-disc pl-6">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    )}
  </div>
);

export function HowItWorks() {
  return (
    <section id="how" className="relative scroll-mt-28 md:scroll-mt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Header */}
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <img src={howWorksBg} alt="How it works background" className="h-full w-full object-cover" aria-hidden />
            <div className="absolute inset-0 bg-[rgba(27,42,65,0.72)]" />
          </div>
          <div className="mx-auto max-w-3xl text-center py-10 sm:py-14">
            <span className="inline-block rounded-full px-3 py-1 text-xs font-medium border border-white/20 bg-white/10 text-white">
              How it works
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">Pooling power, made simple</h2>
            <p className="mt-3 text-white/90">
              Buyers team up to hit a factory’s minimum order (MOQ). Funds sit in escrow. When the pool closes and MOQ is met, production starts and freight is pooled to cut landed cost.
            </p>

            {/* value chips */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-white/90"><Check className="h-4 w-4" style={{ color: 'white' }} /> Verified suppliers</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-white/90"><ShieldCheck className="h-4 w-4" style={{ color: 'white' }} /> Escrow protected</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-white/90"><Truck className="h-4 w-4" style={{ color: 'white' }} /> Pooled freight</span>
            </div>
          </div>
        </div>

        {/* Timeline steps */}
        <div className="relative mt-10">
          <div className="absolute left-10 right-10 top-8 hidden md:block h-0.5 bg-slate-200" />
          <div className="grid md:grid-cols-3 gap-6">
            {[{
              n: 1,
              Icon: Users,
              title: 'Join or start a pool',
              text: 'Pick a category and join an open pool, or create your own with a target quantity and deadline.'
            },{
              n: 2,
              Icon: DollarSign,
              title: 'Commit with escrow',
              text: 'Your funds are held via Stripe Connect until the pool closes. Cancel anytime before close.'
            },{
              n: 3,
              Icon: Factory,
              title: 'Produce • Inspect • Ship',
              text: 'MOQ met → supplier starts production. Optional third‑party inspection. Freight is pooled for better rates.'
            }].map(({ n, Icon, title, text }) => (
              <div key={n} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="absolute -top-3 md:top-6 md:-translate-y-1/2 left-6 md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-white border border-slate-300 grid place-items-center font-semibold text-slate-900">{n}</div>
                <div className="mt-6 md:mt-10 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full border border-slate-200 bg-white grid place-items-center">
                    <Icon className="h-5 w-5" style={{ color: colors.navy }} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                </div>
                <p className="mt-3 text-slate-700 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Proof & persuasion: comparison */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Why GroupMOQ</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2"><Check className="h-5 w-5 mt-0.5" style={{ color: colors.navy }} />Factory pricing unlocked at MOQ</li>
              <li className="flex items-start gap-2"><Check className="h-5 w-5 mt-0.5" style={{ color: colors.navy }} />Escrow + refund guarantee if MOQ isn’t met</li>
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
        </div>

        {/* Money flow & fees (kept, refined) */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
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
            <div className="mt-4 h-2 w-full bg-slate-200 rounded-full overflow-hidden"><div className="h-full" style={{ width: '22%', backgroundColor: colors.gold }} /></div>
            <p className="mt-2 text-xs text-slate-600">Illustrative savings based on recent pools.</p>
          </div>
        </div>

        {/* Risk reversal / CTA band */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-6 w-6 flex-shrink-0" style={{ color: colors.navy }} />
            <p className="text-slate-800"><span className="font-semibold">Full refund if MOQ isn’t met.</span> Your commitment is held in escrow with Stripe Connect until the pool closes.</p>
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

        {/* (Supplier callout moved into dedicated SupplierBand section) */}
      </div>
    </section>
  );
}

// ---------------------------
// SupplierBand Section (frosted cards on tinted image)
// ---------------------------
export function SupplierBand() {
  const [commodity, setCommodity] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [note, setNote] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ commodity, email, note });
    alert("Thanks! We’ll review your suggestion and reach out.");
    setCommodity("");
    setEmail("");
    setNote("");
  };

  return (
    <section id="suppliers" className="relative overflow-hidden">
      {/* Background image with warm tint */}
      <div className="absolute inset-0 -z-10">
        <img src={metalsHeader} alt="Factory background" className="h-full w-full object-cover" aria-hidden />
        <div className="absolute inset-0 bg-[rgba(27,42,65,0.72)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Card: Supplier invite */}
          <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-lg p-8 text-white shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
            <p className="text-white/80">Partner with us</p>
            <h3 className="mt-2 text-3xl font-extrabold tracking-tight">Are you a supplier?</h3>
            <p className="mt-3 text-white/90 text-sm sm:text-base">List a product, set your MOQ, and tap into pooled demand. We’ll verify documents before you go live.</p>
            <ul className="mt-4 space-y-2 text-white/90 text-sm">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-white" /> Verified by GroupMOQ</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-white" /> Escrow‑protected payouts</li>
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

          {/* Card: Commodity interest capture */}
          <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-lg p-8 text-white shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
            <p className="text-white/80">Tell us what you need</p>
            <h3 className="mt-2 text-3xl font-extrabold tracking-tight flex items-center gap-2">
              <Lightbulb className="h-8 w-8" /> Interested in a certain commodity?
            </h3>
            <p className="mt-3 text-white/90 text-sm sm:text-base">Send us your suggestions and we will work to source verified suppliers before going live.</p>

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
                <a href="#pools" className="inline-flex items-center justify-center rounded-xl border border-white/30 px-5 py-3 text-white/90 hover:bg-white/10">See open pools</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

