import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, HandCoins, ShieldCheck, Users, Factory, Timer, Plus, Search, BarChart3, X, Info, Lock, ClipboardCheck, Ship, Tag as TagIcon, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";

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

// In JS we don’t declare types — just use strings directly

const CATEGORIES = ["Textiles", "Hair & Beauty", "Footwear", "Electronics", "Food & Beverage", "Packaging"];
const PLATFORM_FEE_RATE = 0.03;
const DEFAULT_QC_HOLDBACK_RATE = 0.10;
const USA_ONLY = true;

function currency(n) number) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

type Pool = {
  id: string;
  title: string;
  supplier: string;
  category: typeof CATEGORIES[number];
  moqUnits: number;
  minPledgeUnits: number;
  unitPrice: number;
  deadline: number;
  badges: string[];
  specs: string;
  joinedUnits: number;
  watchers: number;
  qcHoldbackPct?: number;
  state?: "OPEN" | "LOCKED" | "PRODUCTION" | "QC" | "SHIPPING" | "COMPLETE" | "FAILED";
  allowsCustomization?: boolean; // NEW: pool allows simple private label add-ons
};

// ---------- Seed Pools ----------
const seedPools: Pool[] = [
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
    title: "Men’s Wool Blend Suit Set",
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
const Stat = ({ icon: Icon, label, value }: any) => (
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

const Pill: React.FC<React.PropsWithChildren<{ active?: boolean; onClick?: () => void }>> = ({ children, active, onClick }) => (
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

function Countdown({ deadline }: { deadline: number }) {
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

function Modal({ open, onClose, title, children }: any) {
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
function JoinPoolForm({ pool, onSubmit }: { pool: Pool; onSubmit: (args: any) => void }) {
  const [units, setUnits] = useState(pool.minPledgeUnits);
  const [accept, setAccept] = useState(false);
  const [kyc, setKyc] = useState({ company: "", contact: "", website: "", country: USA_ONLY ? "United States" : "" });
  const [autoWaitlist, setAutoWaitlist] = useState(true);
  const [selected, setSelected] = useState<CustomOptionId[]>([]);
  const [notes, setNotes] = useState("");

  function toggle(id: CustomOptionId) {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  const productSubtotal = units * pool.unitPrice;
  const addonPerUnit = selected.reduce((sum, id) => {
    const opt = CUSTOM_OPTIONS.find(o => o.id === id)!; return sum + opt.perUnit;
  }, 0);
  const addonSetup = selected.reduce((sum, id) => {
    const opt = CUSTOM_OPTIONS.find(o => o.id === id)!; return sum + opt.setupFee;
  }, 0);
  const addonSubtotal = Math.round(units * addonPerUnit);
  const platformFee = Math.round((productSubtotal + addonSubtotal) * PLATFORM_FEE_RATE);
  const estTotal = productSubtotal + addonSubtotal + platformFee + addonSetup; // setup shown for transparency

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
function CreatePool({ onCreate }: { onCreate: (p: Pool) => void }) {
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
  function update(k: any, v: any) { setForm(prev => ({ ...prev, [k]: v })); }

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
function PoolCard({ pool, onJoin, onLock }: { pool: Pool; onJoin: (p: Pool) => void; onLock: (id: string) => void }) {
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

        {/* Re-tinted progress: track = pale navy, indicator = emerald */}
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
              onClick={() => onLock(pool.id)}
              disabled={pool.joinedUnits < pool.moqUnits || pool.state !== "OPEN"}
            >
              Lock Pool
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ---------- Hero ----------
function Hero({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <section
      className="relative overflow-hidden rounded-3xl p-8 md:p-12"
      style={{ background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.amber} 100%)` }}
    >
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            Factory pricing, without factory MOQs.
          </h1>
          <p className="mt-2 text-lg text-white/90">Power in numbers, savings in bulk.</p>
          <p className="mt-4 text-lg text-white/90">
            Join forces with other U.S. brands to meet high minimum order quantities. Pledge what you need—we pool the rest. If the MOQ isn’t hit, you’re refunded. Simple.
          </p>
          <div className="mt-6 flex gap-3">
            <Button
              size="lg"
              className="transition-colors"
              style={{ backgroundColor: "#ffffff", color: COLORS.navy }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FDFDFD")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
              onClick={onCTAClick}
            >
              Start a Pool
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border"
              style={{ borderColor: "#ffffff", color: "#ffffff" }}
            >
              Browse Pools
            </Button>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-white">
            <div className="flex items-center gap-3"><ShieldCheck className="w-5 h-5" /><span>Escrow-backed pledges</span></div>
            <div className="flex items-center gap-3"><Factory className="w-5 h-5" /><span>Verified suppliers</span></div>
            <div className="flex items-center gap-3"><BarChart3 className="w-5 h-5" /><span>Transparent progress</span></div>
          </div>
        </div>
      </motion.div>
      <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full blur-3xl opacity-40" style={{ backgroundColor: "#ffffff" }} />
    </section>
  );
}

// ---------- Main App ----------
export default function App() {
  const [pools, setPools] = useState<Pool[]>(seedPools);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [showCreate, setShowCreate] = useState(false);
  const [joining, setJoining] = useState<Pool | null>(null);
  const [banner, setBanner] = useState("");

  const filtered = useMemo(() => pools.filter(p => {
    const matchesText = `${p.title} ${p.supplier} ${p.specs}`.toLowerCase().includes(query.toLowerCase());
    const matchesCat = cat === "All" || p.category === cat;
    return matchesText && matchesCat;
  }), [pools, query, cat]);

  function flash(msg: string, ms = 4200) {
    setBanner(msg);
    setTimeout(() => setBanner(""), ms);
  }

  function handleCreate(newPool: Pool) {
    setPools(prev => [newPool, ...prev]);
    setShowCreate(false);
    flash("Pool published! Invite buyers to pledge before it locks.");
  }

  function handleJoinSubmit({ units, total, overflow, autoWaitlist, selected, notes, addonSubtotal, addonSetup }: any) {
    if (!joining) return;
    setPools(prev => prev.map(p => {
      if (p.id !== joining.id) return p;
      const remaining = Math.max(0, p.moqUnits - p.joinedUnits);
      const addNow = Math.min(units, remaining);
      return { ...p, joinedUnits: p.joinedUnits + addNow, watchers: p.watchers + 1 };
    }));
    const chosen = (selected as CustomOptionId[]).map(id => CUSTOM_OPTIONS.find(o => o.id === id)!.name).join(", ");
    setJoining(null);

    const parts: string[] = [];
    parts.push(`Pledge authorized: ${units} units • Est: ${currency(total)} (escrow on lock)`);
    if (chosen) parts.push(`Add-ons: ${chosen} (incl. setup ${currency(addonSetup)})`);
    if (overflow > 0) parts.push(`Overflow ${overflow} units ${(true) ? "waitlisted for Batch #2." : "declined."}`);
    flash(parts.join("  "));
  }

  function handleLock(poolId: string) {
    setPools(prev => prev.map(p => {
      if (p.id !== poolId) return p;
      if (p.joinedUnits >= p.moqUnits && p.state === "OPEN") {
        return { ...p, state: "LOCKED" };
      }
      return p;
    }));
    flash("Pool locked. Capturing authorizations and funding Escrow.com. 48-hour grace window for any failed payments.");
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.grayBg, color: COLORS.charcoal }}>
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b" style={{ backgroundColor: "#ffffff", borderColor: "#E5E7EB" }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="font-extrabold text-xl tracking-tight" style={{ color: COLORS.navy }}>GroupMOQ</div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a className="hover:underline" style={{ color: COLORS.charcoal }} href="#how">How it works</a>
            <a className="hover:underline" style={{ color: COLORS.charcoal }} href="#pools">Active pools</a>
            <a className="hover:underline" style={{ color: COLORS.charcoal }} href="#trust">Trust & escrow</a>
            <a className="hover:underline" style={{ color: COLORS.charcoal }} href="#faq">FAQ</a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="outline"
              className="border"
              style={{ borderColor: COLORS.navy, color: COLORS.navy }}
              onClick={() => setShowCreate(true)}
            >
              <Plus className="w-4 h-4 mr-1" /> Create pool
            </Button>
            <Button
              className="transition-colors"
              style={{ backgroundColor: COLORS.amber, color: "#fff" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.amberHover)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.amber)}
            >
              Sign in
            </Button>
          </div>
        </div>
        {banner && (
          <div style={{ backgroundColor: "#EAF9F0", borderTop: "1px solid #C7EFD8" }}>
            <div className="max-w-6xl mx-auto px-4 py-2 text-sm flex items-center gap-2" style={{ color: COLORS.emerald }}>
              <CheckCircle2 className="w-4 h-4" />{banner}
            </div>
          </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        <Hero onCTAClick={() => setShowCreate(true)} />

        {/* How it works */}
        <section id="how" className="grid md:grid-cols-3 gap-4">
          {[{
            icon: Users,
            title: "Post or join a pool",
            text: "Describe the item, target MOQ, unit price, and deadline. Or join an existing pool in your niche.",
          },{
            icon: HandCoins,
            title: "Pledge safely",
            text: "Funds are authorized at pledge. When MOQ is hit, authorizations capture and funds move to Escrow.com.",
          },{
            icon: ShieldCheck,
            title: "QC & release",
            text: "QC holdback protects you. On delivery acceptance or arrival at port (international), escrow releases to supplier.",
          }].map((s, i) => (
            <Card key={i} className="border" style={{ borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <s.icon className="w-5 h-5" style={{ color: COLORS.navy }} />
                  <CardTitle className="text-base" style={{ color: COLORS.charcoal }}>{s.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm" style={{ color: "#4B5563" }}>{s.text}</CardContent>
            </Card>
          ))}
        </section>

        {/* Search & Filters */}
        <section className="space-y-4" id="pools">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="relative md:w-1/2">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }} />
              <Input className="pl-9" placeholder="Search products, suppliers, specs…" value={query} onChange={e => setQuery(e.target.value)} />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Pill active={cat === "All"} onClick={() => setCat("All")}>All</Pill>
              {CATEGORIES.map(c => (
                <Pill key={c} active={cat === c} onClick={() => setCat(c)}>{c}</Pill>
              ))}
            </div>
            <div className="md:ml-auto">
              <Button
                variant="outline"
                className="border"
                style={{ borderColor: COLORS.navy, color: COLORS.navy }}
                onClick={() => setShowCreate(true)}
              >
                <Plus className="w-4 h-4 mr-1" /> Start a pool
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(p => (
              <PoolCard key={p.id} pool={p} onJoin={setJoining} onLock={handleLock} />
            ))}
          </div>
        </section>

        {/* Trust & Escrow */}
        <section id="trust" className="grid lg:grid-cols-2 gap-6">
          <Card className="border" style={{ borderColor: "#E5E7EB" }}>
            <CardHeader>
              <CardTitle style={{ color: COLORS.navy }}>Trust & Escrow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm" style={{ color: "#4B5563" }}>
              <div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 w-4 h-4" style={{ color: COLORS.navy }} /><p>Funds are authorized at pledge and moved into a licensed third-party escrow (Escrow.com) when the pool locks (MOQ hit + supplier verified). If MOQ fails, authorizations are voided or refunded.</p></div>
              <div className="flex items-start gap-3"><Info className="mt-0.5 w-4 h-4" style={{ color: COLORS.navy }} /><p>Failed capture grace window: 48 hours to update payment after lock. If unresolved, pledge is removed and a waitlisted buyer may replace it.</p></div>
              <div className="flex items-start gap-3"><Factory className="mt-0.5 w-4 h-4" style={{ color: COLORS.navy }} /><p>Suppliers pass verification (business license, references, QA certificates). QC holdback ({Math.round(DEFAULT_QC_HOLDBACK_RATE * 100)}% by default) releases on delivery acceptance or arrival at port (international).</p></div>
            </CardContent>
          </Card>
          <Card className="border" style={{ borderColor: "#E5E7EB" }}>
            <CardHeader>
              <CardTitle style={{ color: COLORS.navy }}>Fees & Timeline</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2" style={{ color: "#4B5563" }}>
              <ul className="list-disc pl-5 space-y-1">
                <li>Platform fee: {Math.round(PLATFORM_FEE_RATE * 100)}% on successful pools (0% if MOQ not met).</li>
                <li>Payments via card/ACH/wire; funds captured on lock and held in escrow until QC/delivery.</li>
                <li>QC: AQL recommended; photos & reports posted to the pool page.</li>
                <li>Logistics: EXW/FOB/CIF supported; freight splitting available.</li>
                <li>USA-only buyers (MVP). Regional expansion will add later.</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* FAQ */}
        <section id="faq" className="space-y-4">
          <h2 className="text-2xl font-bold" style={{ color: COLORS.navy }}>FAQ</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { q: "What happens if the pool misses MOQ?", a: "Your authorization is released / refunded immediately. You can auto-join the next batch." },
              { q: "Can I add my brand label?", a: "Yes, on eligible pools. Choose add-ons like neck print or hangtags in the Join flow. Setup fees apply after proof approval." },
              { q: "What if a payment fails after lock?", a: "You have 48 hours to update payment. If unresolved, your pledge is removed and a waitlisted buyer may replace it." },
              { q: "Do you support private pools?", a: "Yes—invite-only pools for associations, groups, and brands." },
            ].map((f, i) => (
              <Card key={i} className="border" style={{ borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}>
                <CardHeader><CardTitle className="text-base" style={{ color: COLORS.charcoal }}>{f.q}</CardTitle></CardHeader>
                <CardContent className="text-sm" style={{ color: "#4B5563" }}>{f.a}</CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t mt-12" style={{ borderColor: "#E5E7EB", backgroundColor: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm flex flex-col md:flex-row gap-3 md:items-center">
          <div style={{ color: COLORS.charcoal }}>© {new Date().getFullYear()} GroupMOQ — Factory pricing, without factory MOQs.</div>
          <div className="md:ml-auto flex items-center gap-4">
            <a className="hover:underline" style={{ color: COLORS.navy }} href="#">Terms</a>
            <a className="hover:underline" style={{ color: COLORS.navy }} href="#">Privacy</a>
            <a className="hover:underline" style={{ color: COLORS.navy }} href="#">Refunds</a>
            <a className="hover:underline" style={{ color: COLORS.navy }} href="#">Supplier Verification</a>
          </div>
        </div>
      </footer>

      {/* Create Pool Modal */}
      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Start a Pool">
        <CreatePool onCreate={handleCreate} />
      </Modal>

      {/* Join Pool Modal */}
      <Modal open={!!joining} onClose={() => setJoining(null)} title={joining ? `Join: ${joining.title}` : "Join Pool"}>
        {joining && <JoinPoolForm pool={joining} onSubmit={handleJoinSubmit} />}
      </Modal>
    </div>
  );
}
