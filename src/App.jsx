import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, HandCoins, ShieldCheck, Users, Factory, Timer, Plus, Search, BarChart3, X, Info, Lock, ClipboardCheck, Ship, Tag as TagIcon, FileText } from "lucide-react";

// Simple UI Components (replacing the missing @/components/ui imports)
const Button = ({ children, variant = "default", size = "default", className = "", disabled = false, onClick, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
    ghost: "text-gray-700 hover:bg-gray-100"
  };
  const sizes = {
    default: "px-4 py-2",
    lg: "px-6 py-3 text-base"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white border border-gray-200 rounded-lg shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "", style }) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} style={style}>
    {children}
  </h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`px-6 pb-4 ${className}`}>
    {children}
  </div>
);

const Input = ({ className = "", ...props }) => (
  <input 
    className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
    {...props}
  />
);

const Textarea = ({ className = "", ...props }) => (
  <textarea 
    className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
    rows={3}
    {...props}
  />
);

const Badge = ({ children, variant = "default", className = "", style }) => {
  const variants = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800"
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`} style={style}>
      {children}
    </span>
  );
};

const Label = ({ children, htmlFor, className = "" }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}>
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
      checked ? 'bg-blue-600' : 'bg-gray-200'
    }`}
  >
    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
      checked ? 'translate-x-6' : 'translate-x-1'
    }`} />
  </button>
);

const Progress = ({ value, className = "" }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
    <div 
      className="h-2 rounded-full transition-all duration-300"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);

// ---------- BRAND PALETTE ----------
const COLORS = {
  navy: "#1F3C88",
  amber: "#F0A92D",
  amberHover: "#E59B1D",
  emerald: "#2ECC71",
  warning: "#FA690E",
  grayBg: "#F5F5F7",
  charcoal: "#333333",
};

// ---------- SIMPLE CUSTOMIZATION OPTIONS (MVP) ----------
// Keep this intentionally minimal for speed. You can add more later.
const CUSTOM_OPTIONS = [
  { id: "neck_label", name: "Private label neck print", perUnit: 0.35, setupFee: 80 },
  { id: "hangtag", name: "Hangtag set (tag+string+barcode)", perUnit: 1.2, setupFee: 60 },
];

// In JS we don't declare types — just use strings directly
const CATEGORIES = ["Textiles", "Hair & Beauty", "Footwear", "Electronics", "Food & Beverage", "Packaging"];
const PLATFORM_FEE_RATE = 0.03;
const DEFAULT_QC_HOLDBACK_RATE = 0.10;
const USA_ONLY = true;

function currency(n) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

// ---------- Seed Pools ----------
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

// ---------- UI Bits ----------
const Stat = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="rounded-2xl p-2" style={{ backgroundColor: COLORS.grayBg }}>
      <Icon className="w-5 h-5" style={{ color: COLORS.navy }} />
    </div>
    <div>
      <div className="text-sm" style={{ color: "#6B7280" }}>{label}</div>
      <div className="font-semibold" style={{ color: COLORS.charcoal }}>{value}</div>
    </div>
  </div>
);

const Pill = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-2.5 py-1 rounded-full border text-xs transition-colors`}
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
  React.useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const left = Math.max(0, deadline - now);
  const days = Math.floor(left / (1000 * 60 * 60 * 24));
  const hours = Math.floor((left / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((left / (1000 * 60)) % 60);
  return <span>{days}d {hours}h {mins}m</span>;
}

function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" role="dialog" aria-modal>
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="font-semibold text-lg" style={{ color: COLORS.navy }}>{title}</h3>
          <button onClick={onClose} aria-label="Close" className="p-1 rounded hover:bg-gray-100">
            <X className="w-5 h-5" style={{ color: COLORS.navy }} />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

// ---------- Join Pool Form (with SIMPLE customization) ----------
function JoinPoolForm({ pool, onSubmit }) {
  const [units, setUnits] = useState(pool.minPledgeUnits);
  const [accept, setAccept] = useState(false);
  const [kyc, setKyc] = useState({ company: "", contact: "", website: "", country: USA_ONLY ? "United States" : "" });
  const [autoWaitlist, setAutoWaitlist] = useState(true);
  const [selected, setSelected] = useState([]);
  const [notes, setNotes] = useState("");

  function toggle(id) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  const productSubtotal = units * pool.unitPrice;
  const addonPerUnit = selected.reduce((sum, id) => {
    const opt = CUSTOM_OPTIONS.find(o => o.id === id);
    return sum + (opt ? opt.perUnit : 0);
  }, 0);
  const addonSetup = selected.reduce((sum, id) => {
    const opt = CUSTOM_OPTIONS.find(o => o.id === id);
    return sum + (opt ? opt.setupFee : 0);
  }, 0);
  const addonSubtotal = Math.round(units * addonPerUnit);
  const platformFee = Math.round((productSubtotal + addonSubtotal) * PLATFORM_FEE_RATE);
  const estTotal = productSubtotal + addonSubtotal + platformFee + addonSetup;

  const remainingCapacity = Math.max(0, pool.moqUnits - pool.joinedUnits);
  const overflow = Math.max(0, units - remainingCapacity);
  const willOverflow = overflow > 0;

  const countryInvalid = USA_ONLY && kyc.country.trim().toLowerCase() !== "united states";

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Units to pledge (min {pool.minPledgeUnits})</Label>
          <Input type="number" min={pool.minPledgeUnits} value={units} onChange={e => setUnits(Math.max(pool.minPledgeUnits, Number(e.target.value || 0)))} />
          <p className="text-xs mt-1" style={{ color: "#6B7280" }}>You can edit or cancel before the pool locks.</p>
          {willOverflow && (
            <div className="mt-2 text-xs border rounded-md p-2" style={{ color: COLORS.warning, backgroundColor: "#FFF5ED", borderColor: "#FED7AA" }}>
              This pledge exceeds remaining capacity by <b>{overflow}</b> units. Extra units will be {autoWaitlist ? "auto-waitlisted for Batch #2." : "declined."}
              <div className="flex items-center gap-2 mt-2">
                <Switch id="waitlist" checked={autoWaitlist} onCheckedChange={setAutoWaitlist} />
                <Label htmlFor="waitlist" className="text-xs">Auto-waitlist overflow</Label>
              </div>
            </div>
          )}
        </div>
        <div>
          <Label>Estimated Cost (authorization at pledge)</Label>
          <div className="text-2xl font-semibold mt-1" style={{ color: COLORS.charcoal }}>{currency(estTotal)}</div>
          <div className="text-xs space-y-1 mt-1" style={{ color: "#6B7280" }}>
            <div>Base: {currency(productSubtotal)} • Add-ons: {currency(addonSubtotal)} • Setup: {currency(addonSetup)} • Platform fee: {currency(platformFee)}</div>
            <div>Funds <b>authorized</b> now, <b>moved to escrow on lock</b>. Setup fees become non‑refundable after proof approval.</div>
          </div>
        </div>
      </div>

      {/* SIMPLE CUSTOMIZATION CHECKBOXES */}
      {pool.allowsCustomization && (
        <div className="rounded-md border p-3" style={{ backgroundColor: COLORS.grayBg, borderColor: "#E5E7EB" }}>
          <div className="flex items-center gap-2 mb-2">
            <TagIcon className="w-4 h-4" style={{ color: COLORS.navy }} />
            <span className="font-medium" style={{ color: COLORS.charcoal }}>Optional private label add‑ons</span>
          </div>
          <div className="space-y-2 text-sm" style={{ color: "#374151" }}>
            {CUSTOM_OPTIONS.map(opt => (
              <label key={opt.id} className="flex items-center justify-between gap-3 py-2 px-2 rounded-md bg-white border" style={{ borderColor: "#E5E7EB" }}>
                <div className="flex items-center gap-3">
                  <input type="checkbox" checked={selected.includes(opt.id)} onChange={() => toggle(opt.id)} />
                  <div>
                    <div className="font-medium">{opt.name}</div>
                    <div className="text-xs text-gray-500">+{currency(opt.perUnit)} / unit • Setup {currency(opt.setupFee)}</div>
                  </div>
                </div>
              </label>
            ))}
          </div>
          <div className="mt-3">
            <Label>Notes / brand instructions (optional)</Label>
            <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Upload artwork after lock via emailed link. Include Pantone codes, placement (e.g., inside neck), and any packaging notes." />
            <p className="text-xs mt-1" style={{ color: "#6B7280" }}>
              Simple MVP: we'll collect artwork by email after lock for proof approval within 48–72h. No uploads here yet.
            </p>
          </div>
        </div>
      )}

      <div className="rounded-md border p-3 text-xs" style={{ backgroundColor: COLORS.grayBg, color: COLORS.charcoal, borderColor: "#E5E7EB" }}>
        <div className="flex items-center gap-2"><Lock className="w-3.5 h-3.5" style={{ color: COLORS.navy }} /><b>On Lock:</b> authorizations capture → funds move to Escrow.com.</div>
        <div className="flex items-center gap-2 mt-1"><ClipboardCheck className="w-3.5 h-3.5" style={{ color: COLORS.navy }} /><b>Failed payment grace:</b> 48 hours to update payment. If unresolved, pledge removed; waitlist may replace.</div>
        <div className="flex items-center gap-2 mt-1"><Ship className="w-3.5 h-3.5" style={{ color: COLORS.navy }} /><b>QC holdback:</b> up to {Math.round((pool.qcHoldbackPct ?? DEFAULT_QC_HOLDBACK_RATE) * 100)}% released on delivery acceptance or arrival at port (international).</div>
      </div>

      <div className="flex items-center gap-3">
        <Switch id="accept" checked={accept} onCheckedChange={setAccept} />
        <Label htmlFor="accept" className="text-sm">
          I agree to the <span className="underline cursor-pointer" style={{ color: COLORS.navy }}>Pool Terms</span> (escrow, refunds if MOQ not met, oversubscription, 48-hour failed-payment window, U.S. buyers only for MVP).
        </Label>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <Button variant="ghost">Cancel</Button>
        <Button
          className="transition-colors"
          style={{ backgroundColor: COLORS.amber, color: "#fff" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.amberHover)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.amber)}
          disabled={!accept || units < pool.minPledgeUnits || (USA_ONLY && countryInvalid)}
          onClick={() => onSubmit({ units, kyc, total: estTotal, overflow, autoWaitlist, selected, notes, addonSubtotal, addonSetup })}
        >
          Confirm Pledge (Auth Only)
        </Button>
      </div>
    </div>
  );
}

// ---------- Create Pool ----------
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
    qcHoldbackPct: DEFAULT_QC_HOLDBACK_RATE * 100,
    allowsCustomization: true,
  });
  
  function update(k, v) { 
    setForm(prev => ({ ...prev, [k]: v })); 
  }

  function submit() {
    const id = Math.random().toString(36).slice(2);
    onCreate({
      id,
      title: form.title,
      supplier: form.supplier,
      category: form.category,
      moqUnits: Number(form.moqUnits),
      minPledgeUnits: Number(form.minPledgeUnits),
      unitPrice: Number(form.unitPrice),
      deadline: Date.now() + Number(form.deadlineDays) * 86400000,
      badges: form.badges.split(",").map(s => s.trim()).filter(Boolean),
      specs: form.specs,
      joinedUnits: 0,
      watchers: 0,
      qcHoldbackPct: Math.min(100, Math.max(0, Number(form.qcHoldbackPct))) / 100,
      state: "OPEN",
      allowsCustomization: !!form.allowsCustomization,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle style={{ color: COLORS.navy }}>Create a Group MOQ Pool</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Product Name</Label>
            <Input value={form.title} onChange={e => update("title", e.target.value)} placeholder="e.g., 100% Cotton T-Shirts (200 GSM)" />
          </div>
          <div>
            <Label>Category</Label>
            <select className="w-full h-10 rounded-md border px-3" value={form.category} onChange={e => update("category", e.target.value)}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <Label>Supplier</Label>
            <Input value={form.supplier} onChange={e => update("supplier", e.target.value)} placeholder="Factory / Mill / Vendor" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            <div>
              <Label>MOQ (units)</Label>
              <Input type="number" value={form.moqUnits} onChange={e => update("moqUnits", e.target.value)} />
            </div>
            <div>
              <Label>Min pledge</Label>
              <Input type="number" value={form.minPledgeUnits} onChange={e => update("minPledgeUnits", e.target.value)} />
            </div>
            <div>
              <Label>Unit price (USD)</Label>
              <Input type="number" value={form.unitPrice} onChange={e => update("unitPrice", e.target.value)} />
            </div>
            <div>
              <Label>Deadline (days)</Label>
              <Input type="number" value={form.deadlineDays} onChange={e => update("deadlineDays", e.target.value)} />
            </div>
          </div>
          <div className="md:col-span-2">
            <Label>Key Specs</Label>
            <Textarea value={form.specs} onChange={e => update("specs", e.target.value)} placeholder="Sizes, materials, colors, incoterms, QC, packaging…" />
          </div>
          <div className="md:col-span-2">
            <Label>Badges (comma-separated)</Label>
            <Input value={form.badges} onChange={e => update("badges", e.target.value)} />
          </div>
          <div className="md:col-span-2 grid md:grid-cols-2 gap-3">
            <div>
              <Label>QC Holdback (%)</Label>
              <Input type="number" value={form.qcHoldbackPct} onChange={e => update("qcHoldbackPct", e.target.value)} />
              <p className="text-xs mt-1" style={{ color: "#6B7280" }}>Percent of funds kept in escrow until delivery acceptance or arrival at port (international).</p>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <Switch id="allowsCustomization" checked={!!form.allowsCustomization} onCheckedChange={(v) => update("allowsCustomization", v)} />
              <Label htmlFor="allowsCustomization">Allow simple private label add‑ons</Label>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Button
            className="transition-colors"
            style={{ backgroundColor: COLORS.amber, color: "#fff" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.amberHover)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.amber)}
            onClick={submit}
          >
            <Plus className="w-4 h-4 mr-1" /> Publish Pool
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ---------- Pool Card ----------
function PoolCard({ pool, onJoin, onLock }) {
  const pct = Math.min(100, Math.round((pool.joinedUnits / pool.moqUnits) * 100));
  const remaining = Math.max(0, pool.moqUnits - pool.joinedUnits);
  const statusColor =
    pool.state === "LOCKED" ? "#FFE8C2" :
    pool.state === "PRODUCTION" ? "#DDEBFF" :
    pool.state === "QC" ? "#EDE7FF" :
    pool.state === "SHIPPING" ? "#D7F3F6" :
    pool.state === "COMPLETE" ? "#D7F5E5" :
    pool.state === "FAILED" ? "#FFE2E2" :
    COLORS.grayBg;

  return (
    <Card className="hover:shadow-xl transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-base" style={{ color: COLORS.charcoal }}>{pool.title}</CardTitle>
            <div className="mt-1 text-sm" style={{ color: "#6B7280" }}>
              by {pool.supplier} • <span className="font-medium" style={{ color: COLORS.navy }}>{pool.category}</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            <span className="text-xs px-2 py-1 rounded-full border" style={{ backgroundColor: statusColor, color: COLORS.charcoal, borderColor: "#E5E7EB" }}>
              {pool.state ?? "OPEN"}
            </span>
            {pool.allowsCustomization && <Badge variant="secondary" className="border" style={{ borderColor: "#E5E7EB", color: COLORS.navy }}>Private label available</Badge>}
            {pool.badges?.slice(0, 2).map((b, i) => (
              <Badge key={i} variant="secondary" className="border" style={{ borderColor: "#E5E7EB", color: COLORS.navy }}>
                {b}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm" style={{ color: "#4B5563" }}>{pool.specs}</div>
        <div className="grid grid-cols-3 gap-3">
          <Stat icon={Users} label="Joined" value={`${pool.joinedUnits} / ${pool.moqUnits}`} />
          <Stat icon={HandCoins} label="Unit Price" value={currency(pool.unitPrice)} />
          <Stat icon={Timer} label="Time left" value={<Countdown deadline={pool.deadline} />} />
        </div>

        <Progress value={pct} className="h-2 rounded-full bg-[#E8EEF9] [&>div]:bg-[#2ECC71]" />

        <div className="flex items-center justify-between text-sm">
          <div style={{ color: "#6B7280" }}>{remaining} units to MOQ</div>
          <div style={{ color: "#6B7280" }}>QC holdback: {Math.round((pool.qcHoldbackPct ?? DEFAULT_QC_HOLDBACK_RATE) * 100)}%</div>
        </div>
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs" style={{ color: "#6B7280" }}>Platform fee {Math.round(PLATFORM_FEE_RATE * 100)}% on success</div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="border"
              style={{ borderColor: COLORS.navy, color: COLORS.navy }}
              onClick={() => onJoin(pool)}
            >
              Join
            </Button>
            <Button
              className="transition-colors"
              style={{ backgroundColor: COLORS.amber, color: "#fff" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.amberHover)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.amber)}
              onClick
