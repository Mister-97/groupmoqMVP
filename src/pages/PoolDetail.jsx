// src/pages/PoolDetail.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Package,
  MapPin,
  Users,
  Clock,
  Shield,
  CheckCircle,
  Star,
  Share2,
  Heart,
  MessageCircle,
  Eye,
  Building
} from "lucide-react";
import TopNav from "../components/TopNav";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

// Import assets
import refinedSugar from "../assets/refinedsugar.png";
import sugarHeader from "../assets/sugarheader.png";

const colors = { navy: "#1B2A41", gold: "#F0A92D" };

export default function PoolDetail() {
  const { poolId } = useParams();
  const navigate = useNavigate();
  const [pool, setPool] = useState(null);
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  useEffect(() => {
    loadPoolData();
  }, [poolId]);

  const loadPoolData = async () => {
    try {
      const poolDoc = await getDoc(doc(db, "pools", poolId));
      if (poolDoc.exists()) {
        const poolData = { id: poolDoc.id, ...poolDoc.data() };
        setPool(poolData);
        
        const supplierDoc = await getDoc(doc(db, "users", poolData.supplierId));
        if (supplierDoc.exists()) {
          setSupplier(supplierDoc.data());
        }
      } else {
        setPool(mockPoolData);
        setSupplier(mockSupplierData);
      }
    } catch (error) {
      console.error("Error loading pool:", error);
      setPool(mockPoolData);
      setSupplier(mockSupplierData);
    } finally {
      setLoading(false);
    }
  };

  // Mock data for testing
  const mockPoolData = {
    id: poolId || "test-pool-1",
    title: "ICUMSA-45 Refined White Sugar",
    category: "Sugar & Sweeteners",
    description: "Premium quality refined white sugar meeting ICUMSA-45 standards. Perfect for food processing, beverages, and confectionery applications. Sourced from certified sugar mills with full traceability.",
    specifications: "• ICUMSA: 45 RBU max\n• Moisture: 0.04% max\n• Ash: 0.04% max\n• SO2: 20mg/kg max\n• Polarization: 99.8° min",
    unitPrice: 485,
    currency: "USD",
    moq: 500,
    unit: "MT",
    maxOrderQuantity: 2000,
    currentQuantity: 340,
    participantCount: 28,
    poolDuration: "30",
    leadTime: "15-30",
    deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
    origin: "Santos, Brazil",
    shippingTerms: "FOB",
    availableLanes: ["US ↔ Brazil", "Europe ↔ Brazil"],
    paymentTerms: "escrow",
    status: "active",
    createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
    images: [refinedSugar, sugarHeader],
    certifications: ["ISO 9001", "HACCP", "Organic"],
    customizations: "Private labeling available, custom packaging options"
  };

  const mockSupplierData = {
    companyName: "Santos Sugar Trading Co.",
    businessName: "Santos Sugar",
    contactPerson: "Maria Silva",
    primaryEmail: "maria@santossugar.com",
    primaryPhone: "+55 13 3333-4444",
    country: "Brazil",
    verificationStatus: "verified",
    yearEstablished: "1995",
    employeeCount: "201-500",
    rating: 4.8,
    completedOrders: 156,
    responseTime: "< 2 hours"
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <TopNav />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!pool) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <TopNav />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Pool Not Found</h1>
          <p className="text-slate-600 mb-8">The pool you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate("/pools")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Browse All Pools
          </button>
        </div>
      </div>
    );
  }

  const progress = (pool.currentQuantity / pool.moq) * 100;
  const timeLeft = Math.max(0, Math.ceil((pool.deadline - new Date()) / (1000 * 60 * 60 * 24)));
  const isPoolActive = pool.status === "active" && timeLeft > 0;

  const marketPrice = 520;
  const savingsPerUnit = marketPrice - pool.unitPrice;
  const savingsPercent = ((savingsPerUnit / marketPrice) * 100).toFixed(1);
  const deadlineDate = new Date(pool.deadline).toLocaleDateString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <TopNav />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-600 mb-6">
          <button onClick={() => navigate("/pools")} className="hover:text-blue-600">Pools</button>
          <span>/</span>
          <span className="text-slate-900">{pool.title}</span>
        </nav>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Product Images */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-6">
              <div className="aspect-[16/9] bg-slate-100 relative">
                {pool.images && pool.images.length > 0 ? (
                  <img src={pool.images[0]} alt={pool.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="h-16 w-16 text-slate-400" />
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isPoolActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {isPoolActive ? 'Active' : 'Closed'}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                    <Share2 className="h-4 w-4 text-slate-600" />
                  </button>
                  <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                    <Heart className="h-4 w-4 text-slate-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 mb-2">{pool.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <Package className="h-4 w-4" />
                      {pool.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {pool.origin}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      1,247 views
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-slate-900">${pool.unitPrice}</p>
                  <p className="text-sm text-slate-600">per {pool.unit}</p>
                  <p className="text-xs text-green-600 mt-1">
                    Save ${savingsPerUnit}/{pool.unit} ({savingsPercent}% vs market avg ${marketPrice})
                  </p>
                </div>
              </div>

              {/* Pool Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-slate-600 mb-2">
                  <span>Pool Progress</span>
                  <span>{pool.currentQuantity}/{pool.moq} {pool.unit} committed</span>
                </div>
                <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>{Math.round(progress)}% funded</span>
                  <span>Join before {deadlineDate}</span>
                </div>
              </div>

              {/* Key Details */}
              <div className="grid md:grid-cols-3 gap-4 py-4 border-t border-slate-200">
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full mx-auto mb-2">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="font-semibold text-slate-900">{pool.participantCount}</p>
                  <p className="text-xs text-slate-600">Businesses already joined</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full mx-auto mb-2">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="font-semibold text-slate-900">{pool.leadTime} days</p>
                  <p className="text-xs text-slate-600">Lead Time</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full mx-auto mb-2">
                    <Shield className="h-5 w-5 text-purple-600" />
                  </div>
                  <p className="font-semibold text-slate-900">Escrow</p>
                  <p className="text-xs text-slate-600">Funds held until delivery</p>
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Product Description</h2>
              <p className="text-slate-700 mb-6 leading-relaxed">{pool.description}</p>
              
              <h3 className="font-semibold text-slate-900 mb-3">Technical Specifications</h3>
              <div className="bg-slate-50 rounded-lg p-4">
                <pre className="text-sm text-slate-700 font-mono whitespace-pre-wrap">{pool.specifications}</pre>
              </div>

              {pool.certifications && pool.certifications.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold text-slate-900 mb-3">Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {pool.certifications.map(cert => (
                      <span key={cert} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Shipping & Terms */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Shipping & Terms</h2>
              
              <div className="grid md:grid-cols-2 gap-6 items-start">
                <div>
                  <h3 className="font-medium text-slate-900 mb-2">Shipping Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Origin:</span>
                      <span className="text-slate-900">{pool.origin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Terms:</span>
                      <span className="text-slate-900">{pool.shippingTerms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Available Lanes:</span>
                      <span className="text-slate-900">{pool.availableLanes?.join(", ")}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-slate-900 mb-2">Payment Terms</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-slate-900">GroupMOQ Escrow Protection</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Funds secured until delivery confirmed
                  </p>
                </div>
              </div>

              {pool.customizations && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h3 className="font-medium text-slate-900 mb-2">Customization Options</h3>
                  <p className="text-sm text-slate-700">{pool.customizations}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Join Pool Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
              <div className="text-center mb-4">
  <p className="text-2xl font-bold text-slate-900">{pool.moq} {pool.unit}</p>
  <p className="text-sm text-slate-600">MOQ Goal</p>
  <p className="text-sm text-green-600 mt-1">
    {pool.currentQuantity}/{pool.moq} {pool.unit} committed
  </p>
</div>


              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Minimum order:</span>
                  <span className="text-slate-900">{Math.ceil(pool.moq / 20)} {pool.unit}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Current price:</span>
                  <span className="text-slate-900">${pool.unitPrice}/{pool.unit}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Estimated delivery:</span>
                  <span className="text-slate-900">{pool.leadTime} days</span>
                </div>
              </div>

              {isPoolActive ? (
                <button 
                  onClick={() => setJoinModalOpen(true)}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Join This Pool
                </button>
              ) : (
                <button 
                  disabled
                  className="w-full bg-slate-300 text-slate-500 py-3 rounded-lg font-medium cursor-not-allowed"
                >
                  Pool Closed
                </button>
              )}

              <div className="mt-4 text-xs text-slate-500 text-center">
                <Shield className="h-3 w-3 inline mr-1" />
                Escrow holds funds until delivery, protecting your order
              </div>
            </div>

            {/* Supplier Info */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
              <h3 className="font-semibold text-slate-900 mb-4">Supplier Information</h3>
              
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900">{supplier?.companyName}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    {supplier?.verificationStatus === "verified" && (
                      <span className="flex items-center gap-1 text-xs text-green-600">
                        <CheckCircle className="h-3 w-3" />
                        Verified
                      </span>
                    )}
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-slate-600">{supplier?.rating}/5.0</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Established:</span>
                  <span className="text-slate-900">{supplier?.yearEstablished}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Employees:</span>
                  <span className="text-slate-900">{supplier?.employeeCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Completed orders:</span>
                  <span className="text-slate-900">{supplier?.completedOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Response time:</span>
                  <span className="text-slate-900">{supplier?.responseTime}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-slate-300 rounded-lg text-sm hover:bg-slate-50">
                  <MessageCircle className="h-4 w-4" />
                  Ask GroupMOQ
                </button>
                <button className="flex-1 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm hover:bg-slate-200">
                  View Profile
                </button>
              </div>
            </div>

            {/* Safety Features */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h3 className="font-medium text-green-900 mb-3">Safety Features</h3>
              <div className="space-y-2 text-sm text-green-800">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Escrow-protected payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Verified supplier credentials</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Full refund if MOQ not met</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Quality inspection available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {joinModalOpen && (
        <JoinPoolModal 
          pool={pool}
          isOpen={joinModalOpen}
          onClose={() => setJoinModalOpen(false)}
          onSuccess={() => loadPoolData()}
        />
      )}
    </div>
  );
}

// Join Pool Modal Component
function JoinPoolModal({ pool, isOpen, onClose, onSuccess }) {
  const [quantity, setQuantity] = useState(Math.ceil(pool.moq / 20));
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const totalCost = quantity * pool.unitPrice;
  const platformFee = totalCost * 0.03;
  const finalTotal = totalCost + platformFee;

  const handleJoin = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (error) {
      alert("Failed to join pool: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        {!success ? (
          <>
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Join Pool</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Quantity ({pool.unit})
                </label>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="bg-slate-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between font-semibold text-base">
                  <span>Total:</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Includes escrow protection & platform services (3%)
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                <Shield className="h-4 w-4 inline mr-1" />
                Funds will be held in escrow until delivery
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleJoin}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Joining...' : 'Join Pool'}
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-green-700 mb-4">Success!</h3>
            <p className="text-slate-800 mb-6 text-center">
              Successfully joined pool with <strong>{quantity} {pool.unit}</strong>!
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
