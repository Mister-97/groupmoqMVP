import React from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";

// Assets you already have
import metalsHeader from "../assets/metalheader.png"; // page hero background (feel free to swap to howWorksBg)

// Optional: reuse footer from your existing file if it's exported
import { SiteFooter } from "../App"; // if path differs, update accordingly

const colors = {
  navy: "#1B2A41",
  gold: "#F0A92D",
  bgLight: "#F7F5F2",
};

/* ---------------------------------------------------------
   Small helpers
--------------------------------------------------------- */
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

/* ---------------------------------------------------------
   Page
--------------------------------------------------------- */
export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      {/* Top hero banner */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          <img src={metalsHeader} alt="Background" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[rgba(27,42,65,0.72)]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center text-white">
          <span className="inline-block rounded-full px-3 py-1 text-xs font-medium border border-white/20 bg-white/10">How it works</span>
          <h1 className="mt-3 text-3xl sm:text-5xl/tight font-extrabold">Pooling power, made simple</h1>
          <p className="mt-3 max-w-2xl mx-auto text-white/90">
            Buyers team up to hit a factory's minimum order (MOQ). Funds sit in escrow. When the pool closes and MOQ is met,
            production starts and freight is pooled to cut landed cost.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
            <Chip><Check className="h-4 w-4" /> Verified suppliers</Chip>
            <Chip><ShieldCheck className="h-4 w-4" /> Escrow protected</Chip>
            <Chip><Truck className="h-4 w-4" /> Pooled freight</Chip>
          </div>

          <div className="mt-8">
            <a href="/#pools" className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium text-navy-900" style={{ backgroundColor: colors.gold }}>
              Explore open pools <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              Icon: Users,
              title: "Join or start a pool",
              text:
                "Pick a category and join an open pool, or create your own with a target quantity and deadline.",
            },
            {
              Icon: DollarSign,
              title: "Commit with escrow",
              text:
                "Your funds are authorized and held via Stripe Connect until the pool closes. Cancel anytime before close.",
            },
            {
              Icon: Factory,
              title: "Produce • Inspect • Ship",
              text:
                "MOQ met → supplier starts production. Optional third-party inspection. Freight is pooled for better rates.",
            },
          ].map(({ Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
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
      </section>

      {/* Escrow + Savings */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-4">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2"><Clock className="h-5 w-5" style={{ color: colors.navy }} /> What happens to your money</h3>
            <ol className="mt-3 list-decimal pl-6 text-sm text-slate-700 space-y-1">
              <li>Commit → funds held in escrow (Stripe Connect).</li>
              <li>Pool closes → MOQ met: capture & pay supplier; not met: instant refund.</li>
              <li>Shipment arranged → pooled freight → delivery.</li>
            </ol>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2"><Percent className="h-5 w-5" style={{ color: colors.navy }} /> Typical savings</h3>
            <p className="mt-3 text-sm text-slate-700">Members report double‑digit savings versus buying solo, depending on category and lane.</p>
            <div className="mt-4 h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full" style={{ width: "22%", backgroundColor: colors.gold }} />
            </div>
            <p className="mt-2 text-xs text-slate-600">Illustrative savings based on recent pools.</p>
          </div>
        </div>
      </section>

      {/* Shipping & Compliance */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Quality, compliance & logistics</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li className="flex items-start gap-2"><Check className="h-5 w-5 mt-0.5" style={{ color: colors.navy }} /> Verified suppliers, documents on file (COA, MSDS when applicable)</li>
            <li className="flex items-start gap-2"><Check className="h-5 w-5 mt-0.5" style={{ color: colors.navy }} /> Optional third‑party inspection & QC services</li>
            <li className="flex items-start gap-2"><Truck className="h-5 w-5 mt-0.5" style={{ color: colors.navy }} /> Pooled freight to reduce landed cost</li>
            <li className="flex items-start gap-2"><ShieldCheck className="h-5 w-5 mt-0.5" style={{ color: colors.navy }} /> Escrow‑backed transactions via Stripe Connect</li>
          </ul>
          <div className="mt-6">
            <a href="/#pools" className="inline-flex items-center justify-center rounded-lg px-5 py-3 font-medium text-white hover:opacity-90" style={{ backgroundColor: colors.navy }}>
              Browse open pools <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center">FAQ</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <FAQItem q="What if the MOQ isn’t met?" a={<span>Everyone gets a <b>full refund</b> immediately when the pool closes.</span>} defaultOpen />
          <FAQItem q="Can I cancel my pledge?" a="Yes, up until the pool locks. After that, funds are moved to escrow and production starts." />
          <FAQItem q="Who arranges shipping?" a="We coordinate pooled freight on common lanes to reduce cost. You can also arrange your own on request." />
          <FAQItem q="Are suppliers vetted?" a="Yes. We verify documentation and can enable third‑party inspection for added assurance." />
        </div>
      </section>

      {/* Footer (reused) */}
      <SiteFooter />
    </div>
  );
}
