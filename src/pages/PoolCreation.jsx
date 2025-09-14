// src/pages/PoolCreation.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Package,
  DollarSign,
  Calendar,
  MapPin,
  Truck,
  FileText,
  Upload,
  Eye,
  AlertCircle,
  CheckCircle,
  Camera,
  Tag,
  Users,
  Clock
} from "lucide-react";
import TopNav from "../components/TopNav";
import { auth, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const colors = { navy: "#1B2A41", gold: "#F0A92D" };

export default function PoolCreation() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const [poolData, setPoolData] = useState({
    // Basic Product Info
    title: "",
    category: "",
    description: "",
    specifications: "",
    images: [],
    
    // Pricing & MOQ
    unitPrice: "",
    currency: "USD",
    moq: "",
    unit: "",
    maxOrderQuantity: "",
    
    // Timeline
    poolDuration: "",
    leadTime: "",
    deadline: "",
    
    // Shipping & Location
    origin: "",
    shippingTerms: "",
    availableLanes: [],
    
    // Additional Info
    certifications: [],
    complianceDocs: [],
    customizations: "",
    paymentTerms: ""
  });

  const handleInputChange = (field, value) => {
    setPoolData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelect = (field, option) => {
    setPoolData(prev => ({
      ...prev,
      [field]: prev[field].includes(option) 
        ? prev[field].filter(item => item !== option)
        : [...prev[field], option]
    }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Please sign in to create a pool");
        navigate("/signin");
        return;
      }

      // Create pool in Firebase
      const poolRef = await addDoc(collection(db, "pools"), {
        ...poolData,
        supplierId: user.uid,
        createdAt: new Date(),
        status: "draft", // draft, active, closed, cancelled
        participants: [],
        currentQuantity: 0,
        progress: 0
      });

      alert("Pool created successfully!");
      navigate(`/pool/${poolRef.id}`);
    } catch (error) {
      console.error("Error creating pool:", error);
      alert("Failed to create pool: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Sugar & Sweeteners", "Coffee & Tea", "Textiles & Fabrics", 
    "Metals & Alloys", "Chemicals", "Electronics", "Agricultural Products",
    "Plastics & Polymers", "Food & Beverages", "Construction Materials"
  ];

  const shippingTermsOptions = ["FOB", "CIF", "DDP", "EXW"];
  const shippingLanes = [
    "US ↔ China", "US ↔ Vietnam", "US ↔ Thailand", "US ↔ India",
    "Europe ↔ China", "Europe ↔ Vietnam", "Intra-Asia", "Other"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <TopNav />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Create New Pool</h1>
          <p className="text-slate-600">Set up a group buying opportunity for your product</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= i 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-200 text-slate-500'
                }`}>
                  {i}
                </div>
                {i < 4 && (
                  <div className={`w-full h-1 mx-4 ${
                    step > i ? 'bg-blue-600' : 'bg-slate-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-4 text-sm text-center">
            <span className={step >= 1 ? 'text-blue-600 font-medium' : 'text-slate-500'}>Product Info</span>
            <span className={step >= 2 ? 'text-blue-600 font-medium' : 'text-slate-500'}>Pricing & MOQ</span>
            <span className={step >= 3 ? 'text-blue-600 font-medium' : 'text-slate-500'}>Timeline & Shipping</span>
            <span className={step >= 4 ? 'text-blue-600 font-medium' : 'text-slate-500'}>Review & Publish</span>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          {/* Step 1: Product Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Package className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold">Product Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    value={poolData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., ICUMSA-45 Refined White Sugar"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={poolData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Unit of Measurement *
                  </label>
                  <select
                    value={poolData.unit}
                    onChange={(e) => handleInputChange("unit", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select unit</option>
                    <option value="MT">Metric Tons (MT)</option>
                    <option value="kg">Kilograms (kg)</option>
                    <option value="m">Meters (m)</option>
                    <option value="pieces">Pieces</option>
                    <option value="liters">Liters</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Product Description *
                  </label>
                  <textarea
                    value={poolData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your product, its uses, and key benefits..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Technical Specifications
                  </label>
                  <textarea
                    value={poolData.specifications}
                    onChange={(e) => handleInputChange("specifications", e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Technical specs, certifications, quality standards..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Product Images
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Camera className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600 mb-2">Upload product images</p>
                    <p className="text-xs text-slate-500">JPG, PNG up to 5MB each (max 5 images)</p>
                    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Choose Files
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Pricing & MOQ */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold">Pricing & Minimum Order Quantity</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Unit Price *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 text-slate-500">
                      $
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      value={poolData.unitPrice}
                      onChange={(e) => handleInputChange("unitPrice", e.target.value)}
                      className="flex-1 rounded-r-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Price per {poolData.unit || 'unit'}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Minimum Order Quantity (MOQ) *
                  </label>
                  <input
                    type="number"
                    value={poolData.moq}
                    onChange={(e) => handleInputChange("moq", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1000"
                  />
                  <p className="text-xs text-slate-500 mt-1">Minimum total quantity needed to start production</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Maximum Order Quantity
                  </label>
                  <input
                    type="number"
                    value={poolData.maxOrderQuantity}
                    onChange={(e) => handleInputChange("maxOrderQuantity", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="10000"
                  />
                  <p className="text-xs text-slate-500 mt-1">Maximum you can supply (optional)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Payment Terms *
                  </label>
                  <select
                    value={poolData.paymentTerms}
                    onChange={(e) => handleInputChange("paymentTerms", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select payment terms</option>
                    <option value="escrow">GroupMOQ Escrow (Recommended)</option>
                    <option value="advance">100% Advance Payment</option>
                    <option value="30-70">30% Advance, 70% on Delivery</option>
                    <option value="lc">Letter of Credit</option>
                  </select>
                </div>
              </div>

              {/* MOQ Calculator */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Pool Target Preview</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700">MOQ:</span>
                    <p className="font-semibold text-blue-900">{poolData.moq || '—'} {poolData.unit}</p>
                  </div>
                  <div>
                    <span className="text-blue-700">Unit Price:</span>
                    <p className="font-semibold text-blue-900">${poolData.unitPrice || '—'}</p>
                  </div>
                  <div>
                    <span className="text-blue-700">Pool Value:</span>
                    <p className="font-semibold text-blue-900">
                      ${poolData.moq && poolData.unitPrice ? (parseFloat(poolData.moq) * parseFloat(poolData.unitPrice)).toLocaleString() : '—'}
                    </p>
                  </div>
                  <div>
                    <span className="text-blue-700">Est. Participants:</span>
                    <p className="font-semibold text-blue-900">{poolData.moq ? Math.ceil(poolData.moq / 100) : '—'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Timeline & Shipping */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold">Timeline & Shipping</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Pool Duration *
                  </label>
                  <select
                    value={poolData.poolDuration}
                    onChange={(e) => handleInputChange("poolDuration", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select duration</option>
                    <option value="7">7 days</option>
                    <option value="14">14 days</option>
                    <option value="30">30 days</option>
                    <option value="45">45 days</option>
                    <option value="60">60 days</option>
                  </select>
                  <p className="text-xs text-slate-500 mt-1">How long buyers have to join the pool</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Production Lead Time *
                  </label>
                  <select
                    value={poolData.leadTime}
                    onChange={(e) => handleInputChange("leadTime", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select lead time</option>
                    <option value="7-14">7-14 days</option>
                    <option value="15-30">15-30 days</option>
                    <option value="30-45">30-45 days</option>
                    <option value="45-60">45-60 days</option>
                    <option value="60+">60+ days</option>
                  </select>
                  <p className="text-xs text-slate-500 mt-1">Time needed after pool closes to fulfill orders</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Origin Location *
                  </label>
                  <input
                    type="text"
                    value={poolData.origin}
                    onChange={(e) => handleInputChange("origin", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Shanghai, China"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Shipping Terms *
                  </label>
                  <select
                    value={poolData.shippingTerms}
                    onChange={(e) => handleInputChange("shippingTerms", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select terms</option>
                    {shippingTermsOptions.map(term => (
                      <option key={term} value={term}>{term}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Available Shipping Lanes *
                  </label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {shippingLanes.map(lane => (
                      <label key={lane} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={poolData.availableLanes.includes(lane)}
                          onChange={() => handleMultiSelect("availableLanes", lane)}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-slate-700">{lane}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Customization Options
                  </label>
                  <textarea
                    value={poolData.customizations}
                    onChange={(e) => handleInputChange("customizations", e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Available customizations, private labeling, packaging options..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Publish */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold">Review & Publish</h2>
              </div>

              {/* Pool Preview */}
              <div className="border border-slate-200 rounded-lg p-6 bg-slate-50">
                <h3 className="font-semibold text-slate-900 mb-4">Pool Preview</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-lg text-slate-900">{poolData.title || "Product Title"}</h4>
                    <p className="text-sm text-slate-600 mb-2">{poolData.category} • {poolData.origin}</p>
                    <p className="text-sm text-slate-700">{poolData.description || "Product description will appear here..."}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-900">${poolData.unitPrice || "—"}/{poolData.unit}</p>
                    <p className="text-sm text-slate-600">MOQ: {poolData.moq || "—"} {poolData.unit}</p>
                    <p className="text-sm text-slate-600">Lead time: {poolData.leadTime || "—"}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-300">
                  <div className="flex justify-between text-sm text-slate-600 mb-2">
                    <span>Pool Progress</span>
                    <span>0/{poolData.moq || "—"} committed</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full">
                    <div className="h-full w-0 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Publishing Options */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">Ready to Publish</h4>
                    <p className="text-sm text-green-700 mt-1">
                      Your pool will be visible to verified buyers immediately after publishing. 
                      You can edit details or pause the pool at any time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-slate-200">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className={`px-6 py-2.5 rounded-lg font-medium transition-colors ${
                step === 1 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              Previous
            </button>

            <div className="flex gap-3">
              {step < 4 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-2.5 rounded-lg font-medium text-white transition-colors bg-blue-600 hover:bg-blue-700"
                >
                  Next Step
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      // Save as draft logic
                      alert("Pool saved as draft");
                    }}
                    className="px-6 py-2.5 rounded-lg font-medium border border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    Save as Draft
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-8 py-2.5 rounded-lg font-medium text-white transition-colors bg-green-600 hover:bg-green-700 disabled:opacity-50"
                  >
                    {loading ? 'Publishing...' : 'Publish Pool'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
