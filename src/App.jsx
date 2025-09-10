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

// Corrected image imports from your working code
import refinedSugar from "./assets/refinedsugar.png";
import sugarHeader from "./assets/sugarheader.png";
import coffeeHeader from "./assets/coffeebeansheader.png";
import fabricsHeader from "./assets/fabricheader.png";
import metalsHeader from "./assets/metalheader.png";
import hairHeader from "./assets/humanhairheader.png";
import howWorksBg from "./assets/factoryhowitworkssection.png";

// You will need to install this library if you haven't already
// npm install react-modal
import Modal from 'react-modal';

// Neutral, classic theme: warm beige + deep navy with subtle gold accents
const colors = {
  navy: "#1B2A41",
  gold: "#F0A92D",
  bgLight: "#F7F5F2",
};

// ===========================
// Reusable Components
// ===========================

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
        More buyers, lower prices. If MOQ isn't met, everyone gets a full refund.
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

// ===========================
// Modal Component
// ===========================

const JoinModal = ({ isOpen, onRequestClose, pool }) => {
  if (!pool) return null;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Join Pool Modal"
      ariaHideApp={false}
      className="fixed inset-0 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Join Pool</h2>
          <button onClick={onRequestClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <p className="text-gray-700 mb-4">You are about to join the **{pool.title}** pool.</p>
        <div className="aspect-[16/10] w-full overflow-hidden rounded-lg mb-4">
          <img src={pool.image} alt={pool.title} className="h-full w-full object-cover" />
        </div>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Current progress:</span>
            <span>{pool.progress}/{pool.target} joined</span>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gold-500" style={{ width: `${(pool.progress / pool.target) * 100}%` }} />
          </div>
          <p className="mt-2 text-xs text-gray-500">
            A full refund will be issued if the MOQ is not met by the deadline.
          </p>
        </div>
        <div className="space-y-3">
          <input
            type="number"
            placeholder="Enter quantity"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            onClick={() => {
              alert(`Successfully joined the ${pool.title} pool!`);
              onRequestClose();
            }}
            className="w-full rounded-lg px-4 py-2.5 font-medium text-white"
            style={{ backgroundColor: colors.navy }}
          >
            Confirm and Join
          </button>
        </div>
      </div>
    </Modal>
  );
};

// ===========================
// App.js (Main Component)
// ===========================

export default function App() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedPool, setSelectedPool] = React.useState(null);

  const openModal = (pool) => {
    setSelectedPool(pool);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPool(null);
  };

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
      badge: "Featured Pool"
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
    },
  ];

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
      badge: "Made in USA",
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
      badge: "Made in USA",
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
      badge: "Made in USA",
    },
  ];

  const [q, setQ] = React.useState("");
  const filteredPools = pools.filter((p) => {
    const s = q.trim().toLowerCase();
    if (!s) return true;
    return (
      p.title.toLowerCase().includes(s) ||
      p.category.toLowerCase().includes(s) ||
      p.subtitle.toLowerCase().includes(s)
    );
  });

  return (
    <>
      <Hero pools={pools} openModal={openModal} />
      <HowItWorks />
      <PoolsSection pools={filteredPools} q={q} setQ={setQ} openModal={openModal} />
      <MadeInUSASection pools={usaPools} openModal={openModal} />
      <SupplierBand />
      <AfterSupplierInfo />
      <SiteFooter />
      <JoinModal isOpen={modalOpen} onRequestClose={closeModal} pool={selectedPool} />
    </>
  );
}

// ===========================
// Hero Section
// ===========================

const Hero = ({ pools, openModal }) => {
  const featuredPool = pools.find(p => p.id === 1); // Get the first pool as the featured one

  return (
    <section className="relative isolate">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#F7F5F2] to-[#ECEBE7]" />

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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-2 pt-4">
        <div className="flex items-center justify-center gap-14 overflow-x-auto">
          {[
            { label: "Sugar", link: "#sugar", image: sugarHeader },
            { label: "Coffee Beans", link: "#coffee", image: coffeeHeader },
            { label: "Fabrics", link: "#fabrics", image: fabricsHeader },
            { label: "Metals", link: "#metals", image: metalsHeader },
            { label: "Human Hair", link: "#hair", image: hairHeader },
          ].map((c) => (
            <Category key={c.label} {...c} />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16 grid lg:grid-cols-12 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6"
        >
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge>Verified suppliers</Badge>
            <Badge>Escrow protected</Badge>
            <Badge>Freight pooling</Badge>
          </div>
          <h1 className="text-4xl sm:text-5xl/tight font-extrabold text-slate-900">
            Buy together. <span className="text-slate-700">Save more.</span>
          </h1>
          <p className="mt-4 text-lg text-slate-700 max-w-xl">
            Pool orders with other buyers to unlock wholesale pricing from manufacturers. Power in numbers, savings in bulk.
          </p>

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

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { Icon: Users, label: "Buyers pooled", value: "2,340+" },
              { Icon: Percent, label: "Avg. savings", value: "22%" },
              { Icon: ShieldCheck, label: "Escrow backed", value: "Stripe Connect" },
              { Icon: Truck, label: "Ship lanes", value: "US ↔ VN/TH/CN" },
            ].map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-6"
        >
          <PoolCard pool={featuredPool} openModal={openModal} />
        </motion.div>
      </div>
    </section>
  );
};

// ===========================
// How It Works Section
// ===========================

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

const HowItWorks = () => (
  <section id="how" className="relative scroll-mt-28 md:scroll-mt-32">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="relative rounded-3xl overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={howWorksBg}
            alt="How it works background"
            className="h-full w-full object-cover"
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
          <div className="mt-8">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  n: 1,
                  Icon: Users,
                  title: "Join or start a pool",
                  text: "Pick a category and join an open pool, or create your own with a target quantity and deadline.",
                },
                {
                  n: 2,
                  Icon: DollarSign,
                  title: "Commit with escrow",
                  text: "Your funds are held via Stripe Connect until the pool closes. Cancel anytime before close.",
                },
                {
                  n: 3,
                  Icon: Factory,
                  title: "Produce • Inspect • Ship",
                  text: "MOQ met → supplier starts production. Optional third-party inspection. Freight is pooled for better rates.",
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
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white/15 backdrop-blur border border-white/30 grid place-items-center text-sm font-semibold text-white">
                    {n}
                  </div>
                  {idx < arr.length - 1 && (
                    <>
                      <div className="hidden md:block absolute top-1/2 -right-8 w-12 h-[2px] bg-white/40" />
                      <div className="hidden md:block absolute top-1/2 -right-8 translate-x-full -translate-y-1/2 w-0 h-0 border-y-[10px] border-y-transparent border-l-[10px] border-l-white/60" />
                    </>
                  )}
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

// ===========================
// Pools Section
// ===========================

const PoolsSection = ({ pools, q, setQ, openModal }) => (
  <section id="pools" className="relative scroll-mt-28 md:scroll-mt-32">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 lg:pt-14 pb-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Popular pools</h2>
          <p className="text-slate-700">
            Browse active pools or search by commodity, spec, or lane.
          </p>
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
        {pools.map((p) => (
          <PoolCard key={p.id} pool={p} openModal={openModal} />
        ))}
      </div>
    </div>
  </section>
);

const PoolCard = ({ pool, openModal }) => {
  const pct = Math.round((pool.progress / pool.target) * 100);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="aspect-[16/10] w-full overflow-hidden rounded-lg bg-slate-100 relative">
        <img src={pool.image} alt={pool.title} className="h-full w-full object-cover" />
        {pool.badge && (
          <span className="absolute left-2 top-2 rounded-full bg-white/90 text-slate-900 text-xs font-medium px-2 py-0.5 border border-slate-200">
            {pool.badge}
          </span>
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
        <button
          onClick={() => openModal(pool)}
          className="rounded-lg px-3 py-2 font-medium text-white hover:opacity-90"
          style={{ backgroundColor: colors.navy }}
        >
          Join
        </button>
        <button
          className="rounded-lg border px-3 py-2 text-slate-900 hover:bg-slate-50"
          style={{ borderColor: colors.navy }}
        >
          Details
        </button>
      </div>
    </div>
  );
};

// ===========================
// Made in USA Section
// ===========================

const MadeInUSASection = ({ pools, openModal }) => (
  <section id="made-in-usa" className="relative scroll-mt-28 md:scroll-mt-32">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-10">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs text-red-800">
          🇺🇸 Made in USA
        </span>
        <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900">
          Support American manufacturers
        </h2>
        <p className="mt-3 text-slate-700 max-w-2xl mx-auto">
          Pool orders for US-made goods. Shorter lanes, faster delivery, and support domestic
          production.
        </p>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pools.map((pool) => (
          <PoolCard key={pool.id} pool={pool} openModal={openModal} />
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

// ===========================
// SupplierBand
// ===========================

const SupplierBand = () => {
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
        <img
          src={howWorksBg}
          alt="Factory background"
          className="h-full w-full object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-[rgba(27,42,65,0.72)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-lg p-8 text-white shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
            <p className="text-white/80">Partner with us</p>
            <h3 className="mt-2 text-3xl font-extrabold tracking-tight">Are you a supplier?</h3>
            <p className="mt-3 text-white/90 text-sm sm:text-base">
              List a product, set your MOQ, and tap into pooled demand. We'll verify documents before
              you go live.
            </p>
            <ul className="mt-4 space-y-2 text-white/90 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-white" /> Verified by GroupMOQ
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-white" /> Escrow-protected payouts
              </li>
              <li className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-white" /> Access pooled freight
              </li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#apply"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium text-navy-900"
                style={{ backgroundColor: colors.gold }}
              >
                Apply to list <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="#faq"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-5 py-3 text-white/90 hover:bg-white/10"
              >
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
              Send us your suggestions and we will work to source verified suppliers before going
              live.
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
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium text-navy-900"
                  style={{ backgroundColor: colors.gold }}
                >
                  Send suggestion <Send className="ml-2 h-4 w-4" />
                </button>
                <button
                  type="reset"
                  onClick={() => { setCommodity(""); setEmail(""); setNote(""); }}
                  className="rounded-xl px-4 py-2.5 text-white/90 hover:bg-white/10"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// ===========================
// Footer
// ===========================

const AfterSupplierInfo = () => (
  <section className="bg-slate-50">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 text-center">
      <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
        Ready to save on your next order?
      </h2>
      <p className="mt-3 text-xl text-slate-600 sm:mt-4">
        Discover open pools or start one for your required commodity.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
        <a
          href="#pools"
          className="inline-flex items-center justify-center rounded-lg px-5 py-3 font-medium text-white hover:opacity-90"
          style={{ backgroundColor: colors.navy }}
        >
          Browse open pools
        </a>
        <a
          href="#create"
          className="inline-flex items-center justify-center rounded-lg border px-5 py-3 text-slate-900 hover:bg-slate-100"
          style={{ borderColor: colors.navy }}
        >
          Create a new pool
        </a>
      </div>
    </div>
  </section>
);

const SiteFooter = () => (
  <footer className="bg-white border-t border-slate-200">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md" style={{ backgroundColor: colors.navy }}>
              <div className="h-full w-full grid place-items-center text-white font-black">G</div>
            </div>
            <span className="font-semibold text-slate-900">GroupMOQ</span>
          </div>
          <p className="mt-4 text-sm text-slate-600">
            Simplifying B2B wholesale by pooling demand.
          </p>
          <div className="mt-4 flex gap-4">
            <a href="#" className="text-slate-400 hover:text-slate-600"><Twitter size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-slate-600"><Facebook size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-slate-600"><Instagram size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-slate-600"><Linkedin size={20} /></a>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:col-span-3 gap-8 mt-6 md:mt-0">
          <div>
            <h4 className="font-semibold text-slate-900">Platform</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li><a href="#pools" className="hover:text-slate-900">Open Pools</a></li>
              <li><a href="#how" className="hover:text-slate-900">How It Works</a></li>
              <li><a href="#made-in-usa" className="hover:text-slate-900">Made in USA</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">Company</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-slate-900">About</a></li>
              <li><a href="#" className="hover:text-slate-900">Careers</a></li>
              <li><a href="#" className="hover:text-slate-900">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">Resources</h4>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-slate-900">FAQ</a></li>
              <li><a href="#" className="hover:text-slate-900">Blog</a></li>
              <li><a href="#" className="hover:text-slate-900">Help Center</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} GroupMOQ. All rights reserved.</p>
        <div className="mt-2 flex justify-center gap-4">
          <a href="#" className="hover:text-slate-600">Terms</a>
          <span>•</span>
          <a href="#" className="hover:text-slate-600">Privacy</a>
        </div>
      </div>
    </div>
  </footer>
);
