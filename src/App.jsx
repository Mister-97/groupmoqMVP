import React from "react";
import { Navigate, useNavigate } from 'react-router-dom';
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
  ChevronDown,
} from "lucide-react";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<PublicRoute><SignInPage /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><SignUpPage /></PublicRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      {/* etc */}
    </Routes>
  );
}

// Firebase Auth Context
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Existing pages
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProfileSetup from "./pages/ProfileSetup";
import Dashboard from "./pages/Dashboard";

// Pool marketplace pages
import PoolCreation from './pages/PoolCreation';
import PoolDetail from './pages/PoolDetail';
import PoolBrowse from './pages/PoolBrowse';
import MyPools from './pages/MyPools';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import NotFound from './pages/NotFound';

// components
import TopNav from "./components/TopNav";

// assets
import refinedSugar from "./assets/refinedsugar.png";
import sugarHeader from "./assets/sugarheader.png";
import coffeeHeader from "./assets/coffeebeansheader.png";
import fabricsHeader from "./assets/cookingoilheader.png";
import howitworkss from "./assets/metalheader.png";
import metalsHeader from "./assets/riceheader.png";
import hairHeader from "./assets/flourheader.png";
import howWorksBg from "./assets/factoryhowitworkssection.png";

// theme colors
const colors = {
  navy: "#1B2A41",
  gold: "#F0A92D",
  bgLight: "#F7F5F2",
};

// Protected Route Component
const ProtectedRoute = ({ children, requiredUserType = null }) => {
  const { user, userProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (requiredUserType && userProfile?.userType !== requiredUserType) {
    const redirectPath = userProfile?.userType === 'supplier' ? '/dashboard' : '/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

// Public Route Component
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// Authenticated Link Component - handles auth checks for navigation
function AuthenticatedLink({ href, children, className, style, ...props }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (!user) {
      localStorage.setItem('redirectAfterLogin', href);
      navigate('/signin');
      return;
    }
    navigate(href);
  };

  return (
    <button 
      onClick={handleClick} 
      className={className} 
      style={style} 
      {...props}
    >
      {children}
    </button>
  );
}

// Landing Page Component
function LandingPage() {
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
    unitLabel: "unit",
    minUnits: 12,
    unitPrice: 27,
    currency: "USD",
  };

  return (
    <div className="min-h-screen flex flex-col pt-16">
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

        <TopNav />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-55 pt-55">
          <div className="flex items-center justify-center gap-14 overflow-x-auto">
            {[
              { label: "Sugar", link: "/pools?category=sugar", image: sugarHeader },
              { label: "Coffee Beans", link: "/pools?category=coffee", image: coffeeHeader },
              { label: "Cooking Oils", link: "/pools?category=oils", image: fabricsHeader },
              { label: "Rice", link: "/pools?category=rice", image: metalsHeader },
              { label: "Flour", link: "/pools?category=flour", image: hairHeader },
            ].map((c) => (
              <AuthenticatedLink 
                key={c.label} 
                href={c.link} 
                className="flex flex-col items-center gap-3 group p-1"
              >
                <div
                  className="h-24 w-24 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm ring-0 group-hover:ring-2 transition"
                  style={{ "--tw-ring-color": colors.gold }}
                >
                  <img src={c.image} alt={c.label} className="h-full w-full object-cover" />
                </div>
                <span className="text-slate-800 text-sm font-medium">{c.label}</span>
              </AuthenticatedLink>
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
              <AuthenticatedLink
                href="/pools"
                className="inline-flex items-center justify-center rounded-lg px-5 py-3 font-medium text-white hover:opacity-90"
                style={{ backgroundColor: colors.navy }}
              >
                Browse Pools
              </AuthenticatedLink>
              <AuthenticatedLink
                href="/pool/create"
                className="inline-flex items-center justify-center rounded-lg border px-5 py-3 text-slate-900 hover:bg-slate-50"
                style={{ borderColor: colors.navy }}
              >
                Start a new pool
              </AuthenticatedLink>
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6"
          >
            <FeaturedPoolCard 
              pool={featuredPool} 
              onJoin={() => openJoin(featuredPool)} 
              onDetails={() => openDetails(featuredPool)} 
            />
          </motion.div>
        </div>
      </section>

      <HowItWorks />
      <PoolsSection onJoin={openJoin} onDetails={openDetails} />
      <MadeInUSASection onJoin={openJoin} onDetails={openDetails} />
      <SupplierBand />
      <AfterSupplierInfo />
      <SiteFooter />

      <JoinModal open={joinOpen} pool={activePool} onClose={closeJoin} />
      <PoolDetailsModal open={detailsOpen} pool={activePool} onClose={closeDetails} />
    </div>
  );
}

// Featured Pool Card Component
function FeaturedPoolCard({ pool, onJoin, onDetails }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleViewPool = (e) => {
    e.preventDefault();
    if (!user) {
      localStorage.setItem('redirectAfterLogin', `/pool/${pool.id}`);
      navigate('/signin');
      return;
    }
    navigate(`/pool/${pool.id}`);
  };

  const handleDetailsClick = (e) => {
    e.preventDefault();
    if (!user) {
      localStorage.setItem('redirectAfterLogin', `/pool/${pool.id}`);
      localStorage.setItem('pendingAction', 'details');
      navigate('/signin');
      return;
    }
    onDetails();
  };

  return (
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
          src={pool.image}
          alt="Refined sugar crystals"
          className="h-full w-full object-cover"
          loading="eager"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-slate-900 font-semibold">{pool.title}</h3>
          <p className="text-slate-600 text-sm">{pool.subtitle}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-extrabold text-slate-900">{pool.price}</p>
          <p className="text-slate-500 text-xs line-through">{pool.oldPrice}</p>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex justify-between text-xs text-slate-600 mb-1">
          <span>Group progress</span>
          <span>{pool.progress}/{pool.target} joined</span>
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
          onClick={handleViewPool}
          className="inline-flex items-center justify-center rounded-lg px-4 py-2.5 font-medium text-white hover:opacity-90"
          style={{ backgroundColor: colors.navy }}
        >
          {!user ? 'Sign In to View' : 'View Pool'}
        </button>
        <button
          onClick={handleDetailsClick}
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
  );
}

// How It Works Section
function HowItWorks() {
  return (
    <section id="how" className="relative scroll-mt-28 md:scroll-mt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <img
              src={howitworkss}
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
}

// Pools Section
function PoolsSection({ onJoin, onDetails }) {
  const [q, setQ] = React.useState("");

  const pools = [
    {
      id: "sugar-icumsa-45",
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
      id: "coffee-aa",
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
      id: "woven-fabrics",
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
            <PoolCard key={p.id} pool={p} onJoin={() => onJoin(p)} onDetails={() => onDetails(p)} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <AuthenticatedLink
            href="/pools"
            className="inline-flex items-center justify-center rounded-lg px-5 py-3 font-medium text-white hover:opacity-90"
            style={{ backgroundColor: colors.navy }}
          >
            View All Pools <ArrowRight className="ml-2 h-4 w-4" />
          </AuthenticatedLink>
        </div>
      </div>
    </section>
  );
}

// Pool Card Component with Auth Checks
function PoolCard({ pool, onJoin, onDetails }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const pct = Math.round((pool.progress / pool.target) * 100);

  const handleViewPool = (e) => {
    e.preventDefault();
    if (!user) {
      localStorage.setItem('redirectAfterLogin', `/pool/${pool.id}`);
      navigate('/signin');
      return;
    }
    navigate(`/pool/${pool.id}`);
  };

  const handleDetailsClick = (e) => {
    e.preventDefault();
    if (!user) {
      localStorage.setItem('redirectAfterLogin', `/pool/${pool.id}`);
      localStorage.setItem('pendingAction', 'details');
      navigate('/signin');
      return;
    }
    onDetails();
  };

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
          <span>{pool.progress}/{pool.target} joined</span>
        </div>
        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full" style={{ width: `${pct}%`, backgroundColor: colors.gold }} />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button 
          onClick={handleViewPool}
          className="inline-flex items-center justify-center rounded-lg px-3 py-2 font-medium text-white hover:opacity-90" 
          style={{ backgroundColor: colors.navy }}
        >
          {!user ? 'Sign In to View' : 'View Pool'}
        </button>
        <button 
          onClick={handleDetailsClick} 
          className="rounded-lg border px-3 py-2 text-slate-900 hover:bg-slate-50" 
          style={{ borderColor: colors.navy }}
        >
          Details
        </button>
      </div>
    </div>
  );
}

// Made in USA Section
function MadeInUSASection({ onJoin, onDetails }) {
  const usaPools = [
    {
      id: "us-organic-sugar",
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
      id: "us-cotton-fabric",
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
      id: "us-steel-panels",
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
          <AuthenticatedLink
            href="/pools?category=usa"
            className="inline-flex items-center justify-center rounded-lg px-5 py-3 font-medium text-white hover:opacity-90"
            style={{ backgroundColor: colors.navy }}
          >
            View all USA pools <ArrowRight className="ml-2 h-4 w-4" />
          </AuthenticatedLink>
        </div>
      </div>
    </section>
  );
}

// Supplier Band
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
              <AuthenticatedLink 
                href="/register?type=supplier" 
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium text-navy-900" 
                style={{ backgroundColor: colors.gold }}
              >
                Apply to list <ArrowRight className="ml-2 h-4 w-4" />
              </AuthenticatedLink>
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
                <AuthenticatedLink 
                  href="/pools" 
                  className="inline-flex items-center justify-center rounded-xl border border-white/30 px-5 py-3 text-white/90 hover:bg-white/10"
                >
                  See open pools
                </AuthenticatedLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// After Supplier Info
function AfterSupplierInfo() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Why Buyers & Suppliers Choose GroupMOQ</h2>
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
              <li>Pool closes → MOQ met: capture & pay supplier; MOQ not met: instant refund.</li>
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
            <AuthenticatedLink 
              href="/pools" 
              className="inline-flex items-center justify-center rounded-lg px-5 py-3 font-medium text-white hover:opacity-90" 
              style={{ backgroundColor: colors.navy }}
            >
              Start now <ArrowRight className="ml-2 h-4 w-4" />
            </AuthenticatedLink>
            <AuthenticatedLink 
              href="/pool/create" 
              className="inline-flex items-center justify-center rounded-lg border px-5 py-3 text-slate-900 hover:bg-slate-50" 
              style={{ borderColor: colors.navy }}
            >
              Start a new pool
            </AuthenticatedLink>
          </div>
        </div>
      </div>
    </section>
  );
}

// Site Footer
function SiteFooter() {
  return (
    <footer className="relative bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg grid place-items-center" style={{ backgroundColor: colors.gold }}>
                <span className="font-bold text-slate-900">G</span>
              </div>
              <span className="text-xl font-bold">GroupMOQ</span>
            </div>
            <p className="mt-3 text-slate-300 max-w-md">
              Pool orders to unlock wholesale pricing from manufacturers. Power in numbers, savings in bulk.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="#" className="text-slate-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Platform</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li><AuthenticatedLink href="/pools" className="hover:text-white">Browse Pools</AuthenticatedLink></li>
              <li><AuthenticatedLink href="/pool/create" className="hover:text-white">Start a Pool</AuthenticatedLink></li>
              <li><AuthenticatedLink href="/my-pools" className="hover:text-white">My Pools</AuthenticatedLink></li>
              <li><AuthenticatedLink href="/dashboard" className="hover:text-white">Dashboard</AuthenticatedLink></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Company</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li><a href="#how" className="hover:text-white">How it Works</a></li>
              <li><a href="#suppliers" className="hover:text-white">For Suppliers</a></li>
              <li><AuthenticatedLink href="/register?type=supplier" className="hover:text-white">Apply to List</AuthenticatedLink></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            <a href="/terms" className="hover:text-white">Terms</a>
            <a href="/privacy" className="hover:text-white">Privacy</a>
            <a href="/help" className="hover:text-white">Help</a>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:hello@groupmoq.com" className="hover:text-white">hello@groupmoq.com</a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a href="tel:+1-555-0123" className="hover:text-white">+1 (555) 012-3456</a>
            </div>
          </div>
          <p className="text-sm text-slate-500">© 2024 GroupMOQ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// Join Modal Component with Auth Checks
function JoinModal({ open, pool, onClose }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [quantity, setQuantity] = React.useState(pool?.minUnits || 1);
  const [agreedToTerms, setAgreedToTerms] = React.useState(false);

  React.useEffect(() => {
    if (pool) {
      setQuantity(pool.minUnits || 1);
    }
  }, [pool]);

  if (!open || !pool) return null;

  const handleJoin = (e) => {
    e.preventDefault();
    
    if (!user) {
      localStorage.setItem('redirectAfterLogin', `/pool/${pool.id}`);
      localStorage.setItem('pendingAction', 'join');
      localStorage.setItem('pendingQuantity', quantity.toString());
      onClose();
      navigate('/signin');
      return;
    }
    
    // User is authenticated, redirect to full pool detail page
    navigate(`/pool/${pool.id}`);
  };

  const total = quantity * pool.unitPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">
            {!user ? 'Sign In Required' : 'Join Pool'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {!user && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              You need to sign in to join pools and access wholesale pricing.
            </p>
          </div>
        )}

        <div className="mb-4">
          <h4 className="font-medium text-slate-900">{pool.title}</h4>
          <p className="text-sm text-slate-600">{pool.subtitle}</p>
        </div>

        <form onSubmit={handleJoin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Quantity ({pool.unitLabel})
            </label>
            <input
              type="number"
              min={pool.minUnits}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || pool.minUnits)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!user}
            />
            <p className="text-xs text-slate-500 mt-1">
              Minimum: {pool.minUnits} {pool.unitLabel}
            </p>
          </div>

          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex justify-between text-sm">
              <span>Unit price:</span>
              <span>{pool.currency} {pool.unitPrice}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Quantity:</span>
              <span>{quantity} {pool.unitLabel}</span>
            </div>
            <div className="border-t border-slate-200 mt-2 pt-2 flex justify-between font-medium">
              <span>Total:</span>
              <span>{pool.currency} {total.toFixed(2)}</span>
            </div>
          </div>

          {user && (
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5"
              />
              <label htmlFor="terms" className="text-xs text-slate-600">
                I agree to the terms and understand my funds will be held in escrow until the pool closes.
                If MOQ isn't met, I'll receive a full refund.
              </label>
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={user && !agreedToTerms}
              className="flex-1 rounded-lg px-4 py-2 font-medium text-white disabled:opacity-50"
              style={{ backgroundColor: colors.navy }}
            >
              {!user ? 'Sign In to Continue' : 'View Full Details'}
            </button>
          </div>
        </form>

        <p className="text-xs text-slate-500 mt-3 text-center">
          Powered by Stripe Connect • Escrow protected
        </p>
      </div>
    </div>
  );
}

// Pool Details Modal Component with Auth Checks
function PoolDetailsModal({ open, pool, onClose }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!open || !pool) return null;

  const handleViewPool = (e) => {
    e.preventDefault();
    if (!user) {
      localStorage.setItem('redirectAfterLogin', `/pool/${pool.id}`);
      onClose();
      navigate('/signin');
      return;
    }
    navigate(`/pool/${pool.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Pool Details</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {!user && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              Sign in to join this pool and access wholesale pricing.
            </p>
          </div>
        )}

        <div className="mb-6">
          <div className="aspect-[16/10] w-full overflow-hidden rounded-lg bg-slate-100 mb-4">
            <img src={pool.image} alt={pool.title} className="h-full w-full object-cover" />
          </div>
          
          <h4 className="text-xl font-semibold text-slate-900 mb-2">{pool.title}</h4>
          <p className="text-slate-600 mb-4">{pool.subtitle}</p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-slate-500">Current Price</p>
              <p className="text-2xl font-bold text-slate-900">{pool.price}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Progress</p>
              <p className="text-lg font-semibold text-slate-900">{pool.progress}/{pool.target} joined</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm text-slate-600 mb-1">
              <span>Pool Progress</span>
              <span>{Math.round((pool.progress / pool.target) * 100)}%</span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all" 
                style={{ 
                  width: `${(pool.progress / pool.target) * 100}%`, 
                  backgroundColor: colors.gold 
                }} 
              />
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Minimum Order:</span>
              <span className="font-medium">{pool.minUnits} {pool.unitLabel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Unit Price:</span>
              <span className="font-medium">{pool.currency} {pool.unitPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Category:</span>
              <span className="font-medium">{pool.category}</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-slate-50 rounded-lg">
            <h5 className="font-medium text-slate-900 mb-2">Pool Benefits</h5>
            <ul className="space-y-1 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Factory pricing unlocked at MOQ
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Full refund if MOQ not met
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Pooled freight reduces shipping costs
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                Escrow protection via Stripe Connect
              </li>
            </ul>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
          >
            Close
          </button>
          <button
            onClick={handleViewPool}
            className="flex-1 rounded-lg px-4 py-2 font-medium text-white"
            style={{ backgroundColor: colors.navy }}
          >
            {!user ? 'Sign In to View Pool' : 'View Full Pool'} <ArrowUpRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Export components
export { SiteFooter };
export default LandingPage;