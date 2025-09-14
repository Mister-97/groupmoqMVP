// src/pages/SupplierSetup.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  Upload, 
  CheckCircle,
  AlertCircle,
  DollarSign,
  Truck,
  Shield,
  Clock
} from "lucide-react";
import TopNav from "../components/TopNav";
import { SiteFooter } from "../App.jsx";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const colors = { navy: "#1B2A41", gold: "#F0A92D" };

export default function SupplierSetup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Company Information
    companyName: "",
    companyType: "",
    registrationNumber: "",
    taxId: "",
    yearEstablished: "",
    employeeCount: "",
    
    // Contact Information
    contactPerson: "",
    contactTitle: "",
    primaryEmail: "",
    primaryPhone: "",
    website: "",
    
    // Business Address
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    
    // Manufacturing & Capabilities
    productCategories: [],
    manufacturingCapacity: "",
    qualityCertifications: [],
    exportExperience: "",
    mainMarkets: [],
    
    // Financial & Legal
    annualRevenue: "",
    bankName: "",
    bankCountry: "",
    insuranceProvider: "",
    
    // Platform Specific
    preferredPaymentTerms: "",
    minimumOrderValue: "",
    leadTime: "",
    shippingMethods: [],
    
    // Documents (mock file upload)
    businessLicense: null,
    taxCertificate: null,
    exportLicense: null,
    qualityCerts: null,
    bankReference: null,
    insuranceCert: null
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelect = (field, option) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(option) 
        ? prev[field].filter(item => item !== option)
        : [...prev[field], option]
    }));
  };

  const handleFileUpload = (field, file) => {
    // Mock file upload - in real app, upload to Firebase Storage
    handleInputChange(field, { name: file.name, size: file.size, uploaded: true });
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No authenticated user");

      await updateDoc(doc(db, "users", user.uid), {
        ...formData,
        userType: "supplier",
        supplierSetupComplete: true,
        verificationStatus: "pending",
        updatedAt: new Date()
      });

      navigate("/supplier-dashboard");
    } catch (error) {
      console.error("Supplier setup failed:", error);
      alert("Setup failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };


  const productCategoryOptions = [
    "Sugar & Sweeteners", "Coffee & Tea", "Textiles & Fabrics", "Metals & Alloys",
    "Chemicals", "Electronics", "Agricultural Products", "Plastics & Polymers",
    "Food & Beverages", "Construction Materials", "Automotive Parts", "Other"
  ];

  const certificationOptions = [
    "ISO 9001", "ISO 14001", "ISO 45001", "HACCP", "FDA", "CE", "GMP", "FSSC 22000", "Other"
  ];

  

  const marketOptions = [
    "North America", "Europe", "Asia-Pacific", "Middle East", "Africa", "Latin America"
  ];

  const shippingOptions = [
    "FOB", "CIF", "DDP", "EXW", "Air Freight", "Sea Freight", "Land Transport"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0F1826] to-[#15233A] text-white">
      <TopNav inverted />

      <section className="flex flex-grow items-start justify-center px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-4xl rounded-2xl bg-white p-8 shadow-lg text-slate-900"
        >
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-extrabold text-slate-900">
                Supplier Verification Setup
              </h1>
              <div className="text-sm text-slate-500">
                Step {step} of 4
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
              <div 
                className="h-2 rounded-full transition-all duration-300"
                style={{ 
                  backgroundColor: colors.gold,
                  width: `${(step / 4) * 100}%`
                }}
              />
            </div>

            {/* Step Labels */}
            <div className="grid grid-cols-4 gap-4 text-sm">
              {["Company Info", "Manufacturing", "Financial", "Documents"].map((label, idx) => (
                <div key={label} className={`text-center ${step > idx + 1 ? 'text-green-600' : step === idx + 1 ? 'text-blue-600 font-medium' : 'text-slate-400'}`}>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Company Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold">Company Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Company Type *
                  </label>
                  <select
                    value={formData.companyType}
                    onChange={(e) => handleInputChange("companyType", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select type</option>
                    <option value="manufacturer">Manufacturer</option>
                    <option value="trading">Trading Company</option>
                    <option value="distributor">Distributor</option>
                    <option value="cooperative">Cooperative</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Business Registration Number *
                  </label>
                  <input
                    type="text"
                    value={formData.registrationNumber}
                    onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Company registration number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Tax ID / VAT Number
                  </label>
                  <input
                    type="text"
                    value={formData.taxId}
                    onChange={(e) => handleInputChange("taxId", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tax identification number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Year Established *
                  </label>
                  <input
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={formData.yearEstablished}
                    onChange={(e) => handleInputChange("yearEstablished", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Number of Employees
                  </label>
                  <select
                    value={formData.employeeCount}
                    onChange={(e) => handleInputChange("employeeCount", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select range</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Primary Contact
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={formData.contactTitle}
                      onChange={(e) => handleInputChange("contactTitle", e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="CEO, Sales Manager, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      value={formData.primaryEmail}
                      onChange={(e) => handleInputChange("primaryEmail", e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="contact@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.primaryPhone}
                      onChange={(e) => handleInputChange("primaryPhone", e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Company Website
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://www.yourcompany.com"
                    />
                  </div>
                </div>
              </div>

              {/* Business Address */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Business Address
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      value={formData.streetAddress}
                      onChange={(e) => handleInputChange("streetAddress", e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Street address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      State/Province
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Country *
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select country</option>
                      <option value="US">United States</option>
                      <option value="CN">China</option>
                      <option value="IN">India</option>
                      <option value="VN">Vietnam</option>
                      <option value="TH">Thailand</option>
                      <option value="ID">Indonesia</option>
                      <option value="MY">Malaysia</option>
                      <option value="BR">Brazil</option>
                      <option value="MX">Mexico</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Manufacturing & Capabilities */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Truck className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold">Manufacturing & Capabilities</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Product Categories * (Select all that apply)
                </label>
                <div className="grid md:grid-cols-3 gap-3">
                  {productCategoryOptions.map(category => (
                    <label key={category} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.productCategories.includes(category)}
                        onChange={() => handleMultiSelect("productCategories", category)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Manufacturing Capacity *
                </label>
                <textarea
                  value={formData.manufacturingCapacity}
                  onChange={(e) => handleInputChange("manufacturingCapacity", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                  placeholder="Describe your production capacity, equipment, and capabilities..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Quality Certifications (Select all that apply)
                </label>
                <div className="grid md:grid-cols-3 gap-3">
                  {certificationOptions.map(cert => (
                    <label key={cert} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.qualityCertifications.includes(cert)}
                        onChange={() => handleMultiSelect("qualityCertifications", cert)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700">{cert}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Export Experience *
                </label>
                <select
                  value={formData.exportExperience}
                  onChange={(e) => handleInputChange("exportExperience", e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select experience level</option>
                  <option value="new">New to exporting</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-10">3-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Main Export Markets (Select all that apply)
                </label>
                <div className="grid md:grid-cols-3 gap-3">
                  {marketOptions.map(market => (
                    <label key={market} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.mainMarkets.includes(market)}
                        onChange={() => handleMultiSelect("mainMarkets", market)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700">{market}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Typical Lead Time *
                  </label>
                  <select
                    value={formData.leadTime}
                    onChange={(e) => handleInputChange("leadTime", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select lead time</option>
                    <option value="1-2-weeks">1-2 weeks</option>
                    <option value="3-4-weeks">3-4 weeks</option>
                    <option value="1-2-months">1-2 months</option>
                    <option value="2-3-months">2-3 months</option>
                    <option value="3+-months">3+ months</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Minimum Order Value (USD)
                  </label>
                  <input
                    type="number"
                    value={formData.minimumOrderValue}
                    onChange={(e) => handleInputChange("minimumOrderValue", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="5000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Shipping Methods (Select all that apply)
                </label>
                <div className="grid md:grid-cols-3 gap-3">
                  {shippingOptions.map(method => (
                    <label key={method} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.shippingMethods.includes(method)}
                        onChange={() => handleMultiSelect("shippingMethods", method)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-700">{method}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Financial Information */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold">Financial Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Annual Revenue (USD) *
                  </label>
                  <select
                    value={formData.annualRevenue}
                    onChange={(e) => handleInputChange("annualRevenue", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select range</option>
                    <option value="under-100k">Under $100K</option>
                    <option value="100k-500k">$100K - $500K</option>
                    <option value="500k-1m">$500K - $1M</option>
                    <option value="1m-5m">$1M - $5M</option>
                    <option value="5m-20m">$5M - $20M</option>
                    <option value="20m+">$20M+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Preferred Payment Terms
                  </label>
                  
                  {/* Escrow Promotion Box */}
                  <div className="mb-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-semibold text-green-800">Recommended: GroupMOQ Escrow</span>
                    </div>
                    <ul className="text-xs text-green-700 space-y-1">
                      <li>• Guaranteed payment on delivery</li>
                      <li>• Zero payment disputes</li>
                      <li>• Priority listing placement</li>
                      <li>• Lower platform fees (2.5% vs 3.5%)</li>
                    </ul>
                  </div>

                  <select
                    value={formData.preferredPaymentTerms}
                    onChange={(e) => handleInputChange("preferredPaymentTerms", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select payment terms</option>
                    <option value="escrow">✅ Escrow (GroupMOQ) - RECOMMENDED</option>
                    <option value="advance">100% Advance Payment</option>
                    <option value="30-70">30% Advance, 70% on Delivery</option>
                    <option value="50-50">50% Advance, 50% on Delivery</option>
                    <option value="lc">Letter of Credit (L/C)</option>
                    <option value="other">Other Terms</option>
                  </select>
                  
                  <p className="text-xs text-slate-500 mt-2">
                    Suppliers using escrow get 40% more inquiries and faster payments
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Primary Bank Name *
                  </label>
                  <input
                    type="text"
                    value={formData.bankName}
                    onChange={(e) => handleInputChange("bankName", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Bank name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Bank Country *
                  </label>
                  <input
                    type="text"
                    value={formData.bankCountry}
                    onChange={(e) => handleInputChange("bankCountry", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Country where bank is located"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Insurance Provider
                  </label>
                  <input
                    type="text"
                    value={formData.insuranceProvider}
                    onChange={(e) => handleInputChange("insuranceProvider", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Export insurance provider (if any)"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Financial Verification</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      This information helps us verify your business stability and set appropriate transaction limits. 
                      All financial data is kept confidential and used only for verification purposes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Document Upload */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-semibold">Required Documents</h2>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-900">Document Requirements</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      Please upload clear, legible copies of the following documents. All documents will be reviewed by our verification team within 3-5 business days.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Required Documents */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900">Required Documents</h3>
                  
                  <FileUploadCard
                    title="Business License/Registration"
                    description="Official business registration certificate"
                    file={formData.businessLicense}
                    onUpload={(file) => handleFileUpload("businessLicense", file)}
                    required
                  />

                  <FileUploadCard
                    title="Tax Certificate"
                    description="Tax registration or VAT certificate"
                    file={formData.taxCertificate}
                    onUpload={(file) => handleFileUpload("taxCertificate", file)}
                    required
                  />

                  <FileUploadCard
                    title="Export License"
                    description="Export license or permit (if applicable)"
                    file={formData.exportLicense}
                    onUpload={(file) => handleFileUpload("exportLicense", file)}
                  />
                </div>

                {/* Optional Documents */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900">Optional Documents</h3>
                  
                  <FileUploadCard
                    title="Quality Certifications"
                    description="ISO, HACCP, or other quality certificates"
                    file={formData.qualityCerts}
                    onUpload={(file) => handleFileUpload("qualityCerts", file)}
                  />

                  <FileUploadCard
                    title="Bank Reference Letter"
                    description="Bank reference or credit standing letter"
                    file={formData.bankReference}
                    onUpload={(file) => handleFileUpload("bankReference", file)}
                  />

                  <FileUploadCard
                    title="Insurance Certificate"
                    description="Export credit insurance certificate"
                    file={formData.insuranceCert}
                    onUpload={(file) => handleFileUpload("insuranceCert", file)}
                  />
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">Verification Process</h4>
                    <p className="text-sm text-green-700 mt-1">
                      After submission, our team will review your application within 3-5 business days. 
                      You'll receive an email notification with the verification result and next steps.
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
                  className="px-6 py-2.5 rounded-lg font-medium text-white transition-colors"
                  style={{ backgroundColor: colors.navy }}
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-8 py-2.5 rounded-lg font-medium text-white transition-colors disabled:opacity-50"
                  style={{ backgroundColor: colors.gold }}
                >
                  {loading ? 'Submitting...' : 'Complete Setup'}
                </button>
              )}
            </div>
          </div>

          {/* Info Panel */}
          <div className="mt-6 bg-slate-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-slate-500 mt-0.5" />
              <div className="text-sm text-slate-600">
                <p className="font-medium">What happens next?</p>
                <ul className="mt-2 space-y-1 text-slate-600">
                  <li>• Your application will be reviewed within 3-5 business days</li>
                  <li>• You'll receive email updates on verification status</li>
                  <li>• Once approved, you can start creating product listings</li>
                  <li>• Our team may contact you for additional information if needed</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
}

// File Upload Component
function FileUploadCard({ title, description, file, onUpload, required = false }) {
  const inputRef = React.useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 hover:border-blue-400 transition-colors">
      <div className="text-center">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-slate-900 text-sm">
            {title} {required && <span className="text-red-500">*</span>}
          </h4>
          {file?.uploaded && (
            <CheckCircle className="h-4 w-4 text-green-500" />
          )}
        </div>
        
        <p className="text-xs text-slate-500 mb-3">{description}</p>
        
        {file?.uploaded ? (
          <div className="text-sm text-green-600">
            ✓ {file.name} uploaded
          </div>
        ) : (
          <button
            type="button"
            onClick={handleClick}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-700"
          >
            <Upload className="h-4 w-4" />
            Upload File
          </button>
        )}
        
        <input
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          className="hidden"
        />
      </div>
    </div>
  );
}