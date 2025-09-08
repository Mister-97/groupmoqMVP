import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  DollarSign,
  ShieldCheck,
  Users,
  Factory,
  Timer,
  Plus,
  Search,
  BarChart3,
  X,
  Info,
  Tag,
  Clock,
} from "lucide-react";

/* ------------------------ Minimal UI Primitives ------------------------ */

const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  disabled = false,
  onClick,
  style,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-blue-500",
    primary: "bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500",
  };
  const sizes = { 
    default: "px-4 py-2", 
    lg: "px-6 py-3 text-base",
    sm: "px-3 py-1.5 text-sm"
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "", style }) => (
  <div
    className={`bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow ${className}`}
    style={style}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`px-6 py-4 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "", style }) => (
  <h3
    className={`text-lg font-semibold leading-none tracking-tight ${className}`}
    style={style}
  >
    {children}
  </h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`px-6 pb-5 ${className}`}>{children}</div>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
    {...props}
  />
);

const Textarea = ({ className = "", rows = 3, ...props }) => (
  <textarea
    className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
    rows={rows}
    {...props}
  />
);

const Badge = ({ children, variant = "default", className = "", style }) => {
  const variants = {
    default: "bg-blue-50 text-blue-700 border border-blue-200",
    secondary: "bg-gray-50 text-gray-700 border border-gray-200",
    success: "bg-green-50 text-green-700 border border-green-200",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${variants[variant]} ${className}`}
      style={style}
    >
      {children}
    </span>
  );
};

const Label = ({ children, htmlFor, className = "" }) => (
  <label
    htmlFor={htmlFor}
    className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
  >
    {children}
  </label>
);

const Switch = ({ id, checked, onCheckedChange }) => (
  <button
    id={id}
    role="switch"
    aria-checked={checked}
    onClick={() => onCheckedChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
      checked ? "bg-blue-600" : "bg-gray-200"
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        checked ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

const Progress = ({ value, className = "" }) => (
  <div className={`w-full bg-gray-100 rounded-full h-2 ${className}`}>
    <div
      className="h-2 rounded-full transition-all duration-300 bg-green-500"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);

/* ----------------------------- Brand System ---------------------------- */

const COLORS = {
  navy: "#1F3C88",
  amber: "#F0A92D",
  amberHover: "#E59B1D",
  emerald: "#2ECC71",
  warning: "#FA690E",
  grayBg: "#F5F5F7",
  charcoal: "#333333",
};

const CATEGORIES = [
  "Textiles",
  "Hair & Beauty",
  "Footwear",
  "Electronics",
  "Food & Beverage",
  "Packaging",
];

const CUSTOM_OPTIONS = [
  { id: "neck_label", name: "Private label neck print", perUnit: 0.35, setupFee: 80 },
  { id: "hangtag", name: "Hangtag set (tag+string+barcode)", perUnit: 1.2, setupFee: 60 },
];

const PLATFORM_FEE_RATE = 0.03;
const DEFAULT_QC_HOLDBACK_RATE = 0.1;

const currency = (n) =>
  new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

/* ------------------------------ Seed Pools ----------------------------- */

const seedPools = [
  {
    id: "p1",
    title: "Premium Virgin Hair Bundles (10A)",
    supplier: "Bắc Ninh Collective",
    category: "Hair & Beauty",
    moqUnits: 500,
    minPledgeUnits: 10,
    unitPrice: 36,
    deadline: Date.now() + 1000 * 60 * 60 * 24 * 7,
    badges: ["Factory-verified", "Lab-tested", "QC Included"],
    specs: "Lengths 8–30in • Natural black • Double-weft",
    joinedUnits: 320,
    watchers: 94,
    qcHoldbackPct: DEFAULT_QC_HOLDBACK_RATE,
    state: "OPEN",
    allowsCustomization: true,
  },
  {
    id: "p2",
    title: "Men's Wool Blend Suit Set",
    supplier: "Đà Nẵng Apparel",
    category: "Textiles",
    moqUnits: 800,
    minPledgeUnits: 20,
    unitPrice: 61,
    deadline: Date.now() + 1000 * 60 * 60 * 24 * 10,
    badges: ["AQL 2.5", "Trade Assurance"],
    specs: "Jacket + Pants • Sizes 36–48 • 240–260 GSM",
    joinedUnits: 410,
    watchers: 120,
    qcHoldbackPct: 0.05,
    state: "OPEN",
    allowsCustomization: true,
  },
  {
    id: "p3",
    title: "Full Grain Leather Dress Shoes",
    supplier: "HCMC Leatherworks",
    category: "Footwear",
    moqUnits: 600,
    minPledgeUnits: 12,
    unitPrice: 27,
    deadline: Date.now() + 1000 * 60 * 60 * 24 * 3,
    badges: ["REACH compliant", "ISO 9001"],
    specs: "EU 39–46 • Cowhide • Black/Brown",
    joinedUnits: 250,
    watchers: 58,
    qcHoldbackPct: DEFAULT_QC_HOLDBACK_RATE,
    state: "OPEN",
    allowsCustomization: false,
  },
  {
    id: "p4",
    title: "ICUMSA-45 Refined Sugar (50kg bags)",
    supplier: "Thai-VN Mill Co.",
    category: "Food & Beverage",
    moqUnits: 1000,
    minPledgeUnits: 50,
    unitPrice: 24,
    deadline: Date.now() + 1000 * 60 * 60 * 24 * 14,
    badges: ["SGS Inspection", "LC Accepted"],
    specs: "50kg PP bags • CIF options",
    joinedUnits: 540,
    watchers: 203,
    qcHoldbackPct: DEFAULT_QC_HOLDBACK_RATE,
    state: "OPEN",
    allowsCustomization: false,
  },
];

/* ------------------------------ Small Bits ----------------------------- */

const Pill = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className="px-3 py-1.5 rounded-full border text-sm font-medium transition-colors"
    style={{
      backgroundColor: active ? COLORS.navy : "transparent",
      color: active ? "#ffffff" : "#4B5563",
      borderColor: active ? COLORS.navy : "#D1D5DB",
    }}
  >
    {children}
  </button>
);

function Countdown({ deadline }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const left = Math.max(0, deadline - now);
  const days = Math.floor(left / (1000 * 60 * 60 * 24));
  const hours = Math.floor((left / (1000 * 60 * 60)) % 24);
  
  if (days > 0) {
    return <span>{days}d {hours}h</span>;
  }
  return <span>{hours}h</span>;
}

function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="font-semibold text-lg" style={{ color: COLORS.navy }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1 rounded hover:bg-gray-100"
          >
            <X className="w-5 h-5" style={{ color: COLORS.navy }} />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

/* ----------------------------- Join Pool Form ---------------------------- */

function JoinPoolForm({ pool, onSubmit }) {
  const [units, setUnits] = useState(pool.minPledgeUnits);
  const [accept, setAccept] = useState(false);
  const [autoWaitlist, setAutoWaitlist] = useState(true);
  const [selected, setSelected] = useState([]);
  const [notes, setNotes] = useState("");

  const toggle = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const productSubtotal = units * pool.unitPrice;
  const addonPerUnit = selected.reduce((sum, id) => {
    const opt = CUSTOM_OPTIONS.find((o) => o.id === id);
    return sum + (opt ? opt.perUnit : 0);
  }, 0);
  const addonSetup = selected.reduce((sum, id) => {
    const opt = CUSTOM_OPTIONS.find((o) => o.id === id);
    return sum + (opt ? opt.setupFee : 0);
  }, 0);
  const addonSubtotal = Math.round(units * addonPerUnit);
  const platformFee = Math.round((productSubtotal + addonSubtotal) * PLATFORM_FEE_RATE);
  const estTotal = productSubtotal + addonSubtotal + platformFee + addonSetup;

  const remainingCapacity = Math.max(0, pool.moqUnits - pool.joinedUnits);
  const overflow = Math.max(0, units - remainingCapacity);
  const willOverflow = overflow > 0;

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label>Units to pledge (min {pool.minPledgeUnits})</Label>
          <Input
            type="number"
            min={pool.minPledgeUnits}
            value={units}
            onChange={(e) =>
              setUnits(Math.max(pool.minPledgeUnits, Number(e.target.value || 0)))
            }
          />
          <p className="text-xs mt-1 text-gray-500">
            You can edit or cancel before the pool locks.
          </p>
          {willOverflow && (
            <div
              className="mt-2 text-xs border rounded-md p-2"
              style={{
                color: COLORS.warning,
                backgroundColor: "#FFF5ED",
                borderColor: "#FED7AA",
              }}
            >
              This pledge exceeds remaining capacity by <b>{overflow}</b> units. Extra
              units will be {autoWaitlist ? "auto-waitlisted for Batch #2." : "declined."}
              <div className="flex items-center gap-2 mt-2">
                <Switch
                  id="waitlist"
                  checked={autoWaitlist}
                  onCheckedChange={setAutoWaitlist}
                />
                <Label htmlFor="waitlist" className="text-xs">
                  Auto-waitlist overflow
                </Label>
              </div>
            </div>
          )}
        </div>
        <div>
          <Label>Estimated Cost (authorization at pledge)</Label>
          <div className="text-2xl font-semibold mt-1" style={{ color: COLORS.charcoal }}>
            {currency(estTotal)}
          </div>
          <div className="text-xs space-y-1 mt-1 text-gray-600">
            <div>
              Base: {currency(productSubtotal)} • Add-ons: {currency(addonSubtotal)} •
              Setup: {currency(addonSetup)} • Platform fee: {currency(platformFee)}
            </div>
          </div>
        </div>
      </div>

      {pool.allowsCustomization && (
        <div
          className="rounded-md border p-3"
          style={{ backgroundColor: COLORS.grayBg, borderColor: "#E5E7EB" }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-4 h-4" style={{ color: COLORS.navy }} />
            <span className="font-medium" style={{ color: COLORS.charcoal }}>
              Optional private label add-ons
            </span>
          </div>
          <div className="space-y-2 text-sm text-gray-700">
            {CUSTOM_OPTIONS.map((opt) => (
              <label
                key={opt.id}
                className="flex items-center justify-between gap-3 py-2 px-2 rounded-md bg-white border"
                style={{ borderColor: "#E5E7EB" }}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selected.includes(opt.id)}
                    onChange={() => toggle(opt.id)}
                  />
                  <div>
                    <div className="font-medium">{opt.name}</div>
                    <div className="text-xs text-gray-500">
                      +{currency(opt.perUnit)} / unit • Setup {currency(opt.setupFee)}
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>
          <div className="mt-3">
            <Label>Notes / brand instructions (optional)</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Upload artwork after lock via emailed link..."
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <Switch id="accept" checked={accept} onCheckedChange={setAccept} />
        <Label htmlFor="accept" className="text-sm">
          I agree to the {" "}
          <span className="underline cursor-pointer" style={{ color: COLORS.navy }}>
            Pool Terms
          </span>
        </Label>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <Button variant="ghost">Cancel</Button>
        <Button
          variant="primary"
          disabled={!accept || units < pool.minPledgeUnits}
          onClick={() =>
            onSubmit({
              units,
              total: estTotal,
              overflow,
              autoWaitlist,
              selected,
              notes,
              addonSubtotal,
              addonSetup,
            })
          }
        >
          Confirm Pledge
        </Button>
      </div>
    </div>
  );
}

/* ----------------------------- Create Pool ----------------------------- */

function CreatePool({ onCreate }) {
  const [form, setForm] = useState({
    title: "",
    category: CATEGORIES[0],
    supplier: "",
    moqUnits: 500,
    minPledgeUnits: 10,
    unitPrice: 10,
    deadlineDays: 7,
    specs: "",
    badges: "Factory-verified, Trade Assurance",
    allowsCustomization: true,
  });

  const update = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  const submit = () => {
    const id = Math.random().toString(36).slice(2);
    onCreate({
      id,
      title: form.title || "Untitled Pool",
      supplier: form.supplier || "Supplier",
      category: form.category,
      moqUnits: Number(form.moqUnits) || 0,
      minPledgeUnits: Number(form.minPledgeUnits) || 0,
      unitPrice: Number(form.unitPrice) || 0,
      deadline: Date.now() + (Number(form.deadlineDays) || 0) * 86400000,
      badges: (form.badges || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      specs: form.specs,
      joinedUnits: 0,
      watchers: 0,
      qcHoldbackPct: DEFAULT_QC_HOLDBACK_RATE,
      state: "OPEN",
      allowsCustomization: !!form.allowsCustomization,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle style={{ color: COLORS.navy }}>Create a Group MOQ Pool</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Product Name</Label>
            <Input
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="e.g., 100% Cotton T-Shirts"
            />
          </div>
          <div>
            <Label>Category</Label>
            <select
              className="w-full h-10 rounded-md border px-3"
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Supplier</Label>
            <Input
              value={form.supplier}
              onChange={(e) => update("supplier", e.target.value)}
              placeholder="Factory / Mill / Vendor"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            <div>
              <Label>MOQ</Label>
              <Input
                type="number"
                value={form.moqUnits}
                onChange={(e) => update("moqUnits", e.target.value)}
              />
            </div>
            <div>
              <Label>Min pledge</Label>
              <Input
                type="number"
                value={form.minPledgeUnits}
                onChange={(e) => update("minPledgeUnits", e.target.value)}
              />
            </div>
            <div>
              <Label>Unit price</Label>
              <Input
                type="number"
                value={form.unitPrice}
                onChange={(e) => update("unitPrice", e.target.value)}
              />
            </div>
            <div>
              <Label>Days</Label>
              <Input
                type="number"
                value={form.deadlineDays}
                onChange={(e) => update("deadlineDays", e.target.value)}
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <Label>Specs</Label>
            <Textarea
              value={form.specs}
              onChange={(e) => update("specs", e.target.value)}
              placeholder="Sizes, materials, colors..."
            />
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Button
            variant="primary"
            onClick={submit}
          >
            <Plus className="w-4 h-4 mr-1" /> Publish Pool
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

/* ------------------------------ SIMPLIFIED Pool Card ------------------------------ */

function PoolCard({ pool, onJoin, onLock }) {
  const pct =
    pool.moqUnits > 0
      ? Math.min(100, Math.round((pool.joinedUnits / pool.moqUnits) * 100))
      : 0;
  const remaining = Math.max(0, pool.moqUnits - pool.joinedUnits);

  return (
    <Card className="p-6 space-y-4">
      {/* Header - Product name and trust indicator */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">
            {pool.title}
          </h3>
          <p className="text-gray-600">
            by {pool.supplier} • {pool.category}
          </p>
        </div>
        <Badge variant="success" className="shrink-0">
          <ShieldCheck className="w-3 h-3 mr-1" />
          Verified
        </Badge>
      </div>

      {/* Key metrics - Price, Progress, Time */}
      <div className="grid grid-cols-3 gap-4 py-3">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{currency(pool.unitPrice)}</div>
          <div className="text-sm text-gray-500">per unit</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{pool.joinedUnits}/{pool.moqUnits}</div>
          <div className="text-sm text-gray-500">pledged</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            <Countdown deadline={pool.deadline} />
          </div>
          <div className="text-sm text-gray-500">remaining</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <Progress value={pct} />
        <div className="flex justify-between text-sm text-gray-600">
          <span>{remaining} units to MOQ</span>
          <span>{pct}% funded</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => onJoin(pool)}
        >
          Join Pool
        </Button>
        <Button
          variant="primary"
          className="flex-1"
          onClick={() => onLock(pool.id)}
          disabled={pool.joinedUnits < pool.moqUnits || pool.state !== "OPEN"}
        >
          {pool.state === "LOCKED" ? "Locked" : "Lock Pool"}
        </Button>
      </div>

      {/* Optional specs - smaller, less prominent */}
      {pool.specs && (
        <div className="pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-500">{pool.specs}</p>
        </div>
      )}
    </Card>
  );
}

/* --------------------------------- Hero -------------------------------- */

function Hero({ onCTAClick }) {
  return (
    <section
      className="relative overflow-hidden rounded-3xl p-8 md:p-12"
      style={{
        background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.amber} 100%)`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Factory pricing, without factory MOQs.
          </h1>
          <p className="mt-2 text-lg text-white/90">Power in numbers, savings in bulk.</p>
          <p className="mt-4 text-lg text-white/90">
            Join forces with other U.S. brands to meet high minimum order quantities.
            Pledge what you need—we pool the rest.
          </p>
          <div className="mt-6 flex gap-3">
            <Button
              size="lg"
              style={{ backgroundColor: "#ffffff", color: COLORS.navy }}
              onClick={onCTAClick}
            >
              Start a Pool
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              style={{ borderColor: "#ffffff" }}
              onClick={() => {
                const el = document.getElementById("pools");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Browse Pools
            </Button>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-white">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5" /> <span>Escrow-backed</span>
            </div>
            <div className="flex items-center gap-3">
              <Factory className="w-5 h-5" /> <span>Verified suppliers</span>
            </div>
            <div className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5" /> <span>Transparent progress</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* --------------------------------- App --------------------------------- */

export default function App() {
  const [pools, setPools] = useState(seedPools);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [showCreate, setShowCreate] = useState(false);
  const [joining, setJoining] = useState(null);
  const [banner, setBanner] = useState("");

  const filtered = useMemo(
    () =>
      pools.filter((p) => {
        const hay = `${p.title} ${p.supplier} ${p.specs}`.toLowerCase();
        const matchesText = hay.includes(query.toLowerCase());
        const matchesCat = cat === "All" || p.category === cat;
        return matchesText && matchesCat;
      }),
    [pools, query, cat]
  );

  const flash = (msg, ms = 4200) => {
    setBanner(msg);
    window.clearTimeout(flash._t || 0);
    flash._t = window.setTimeout(() => setBanner(""), ms);
  };

  const handleCreate = (newPool) => {
    setPools((prev) => [newPool, ...prev]);
    setShowCreate(false);
    flash("Pool published! Invite buyers to pledge before it locks.");
  };

  const handleJoinSubmit = ({
    units,
    total,
    overflow,
    autoWaitlist,
    selected,
    notes,
  }) => {
    if (!joining) return;
    setPools((prev) =>
      prev.map((p) => {
        if (p.id !== joining.id) return p;
        const remaining = Math.max(0, p.moqUnits - p.joinedUnits);
        const addNow = Math.min(units, remaining);
        return {
          ...p,
          joinedUnits: p.joinedUnits + addNow,
          watchers: p.watchers + 1,
        };
      })
    );
    setJoining(null);
    flash(`Pledge authorized: ${units} units • Est: ${currency(total)}`);
  };

  const handleLock = (poolId) => {
    setPools((prev) =>
      prev.map((p) => {
        if (p.id !== poolId) return p;
        if (p.joinedUnits >= p.moqUnits && p.state === "OPEN") {
          return { ...p, state: "LOCKED" };
        }
        return p;
      })
    );
    flash("Pool locked. Capturing authorizations and funding Escrow.com.");
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: COLORS.grayBg, color: COLORS.charcoal }}
    >
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="font-extrabold text-xl tracking-tight" style={{ color: COLORS.navy }}>
            GroupMOQ
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a className="hover:underline text-gray-800" href="#how">
              How it works
            </a>
            <a className="hover:underline text-gray-800" href="#pools">
              Active pools
            </a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="outline"
              style={{ borderColor: COLORS.navy, color: COLORS.navy }}
              onClick={() => setShowCreate(true)}
            >
              <Plus className="w-4 h-4 mr-1" /> Create pool
            </Button>
            <Button variant="primary">
              Sign in
            </Button>
          </div>
        </div>
        {banner && (
          <div className="border-t" style={{ backgroundColor: "#EAF9F0", borderColor: "#C7EFD8" }}>
            <div
              className="max-w-6xl mx-auto px-4 py-2 text-sm flex items-center gap-2"
              style={{ color: COLORS.emerald }}
            >
              <CheckCircle2 className="w-4 h-4" />
              {banner}
            </div>
          </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        <Hero onCTAClick={() => setShowCreate(true)} />

        {/* How it works */}
        <section id="how" className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Users,
              title: "Post or join a pool",
              text:
                "Describe the item, target MOQ, unit price, and deadline. Or join an existing pool in your niche.",
            },
            {
              icon: DollarSign,
              title: "Pledge safely",
              text:
                "Funds are authorized at pledge. When MOQ is hit, authorizations capture and funds move to Escrow.com.",
            },
            {
              icon: ShieldCheck,
              title: "QC & release",
              text:
                "QC holdback protects you. On delivery acceptance or arrival at port, escrow releases to supplier.",
            },
          ].map((s, i) => (
            <Card key={i} style={{ backgroundColor: "#FFFFFF" }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <s.icon className="w-5 h-5" style={{ color: COLORS.navy }} />
                  <CardTitle className="text-base" style={{ color: COLORS.charcoal }}>
                    {s.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-gray-700">{s.text}</CardContent>
            </Card>
          ))}
        </section>

        {/* Search & Filters */}
        <section className="space-y-6" id="pools">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative md:w-1/2">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-9"
                placeholder="Search products, suppliers, specs…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search pools"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Pill active={cat === "All"} onClick={() => setCat("All")}>
                All
              </Pill>
              {CATEGORIES.map((c) => (
                <Pill key={c} active={cat === c} onClick={() => setCat(c)}>
                  {c}
                </Pill>
              ))}
            </div>
            <div className="md:ml-auto">
              <Button
                variant="outline"
                style={{ borderColor: COLORS.navy, color: COLORS.navy }}
                onClick={() => setShowCreate(true)}
              >
                <Plus className="w-4 h-4 mr-1" /> Start a pool
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <PoolCard key={p.id} pool={p} onJoin={setJoining} onLock={handleLock} />
            ))}
          </div>
        </section>
      </main>

      {/* Modals */}
      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Start a Pool">
        <CreatePool onCreate={handleCreate} />
      </Modal>

      <Modal
        open={!!joining}
        onClose={() => setJoining(null)}
        title={joining ? `Join: ${joining.title}` : "Join Pool"}
      >
        {joining && <JoinPoolForm pool={joining} onSubmit={handleJoinSubmit} />}
      </Modal>
    </div>
  );
}
