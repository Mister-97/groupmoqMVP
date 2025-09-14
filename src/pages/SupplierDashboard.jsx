// src/pages/SupplierDashboard.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Package,
  TrendingUp,
  DollarSign,
  Users,
  Plus,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Edit,
  BarChart3,
  MessageCircle,
  Truck,
  Star,
  Shield,
  Calendar
} from "lucide-react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import TopNav from "../components/TopNav";

const colors = { navy: "#1B2A41", gold: "#F0A92D" };

export default function SupplierDashboard() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        navigate("/signin");
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.userType !== "supplier") {
            navigate("/dashboard");
            return;
          }
          if (!userData.supplierSetupComplete) {
            navigate("/supplier-setup");
            return;
          }
          setUserProfile(userData);
        }
      } catch (err) {
        console.error("Error loading user profile:", err.message);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your supplier dashboard...</p>
        </div>
      </div>
    );
  }

  // Mock data for demo purposes
  const mockStats = {
    totalRevenue: 47850,
    activeListings: 12,
    totalOrders: 89,
    conversionRate: 18.5,
    verificationStatus: userProfile?.verificationStatus || "pending"
  };

  const mockListings = [
    {
      id: 1,
      title: "ICUMSA-45 Refined Sugar",
      category: "Sugar",
      status: "active",
      views: 234,
      inquiries: 18,
      moq: "10 MT",
      price: 485,
      poolProgress: 68
    },
    {
      id: 2,
      title: "Organic Cotton Fabric",
      category: "Textiles",
      status: "active",
      views: 156,
      inquiries: 12,
      moq: "500 m",
      price: 8.5,
      poolProgress: 45
    },
    {
      id: 3,
      title: "Aluminum Sheets",
      category: "Metals",
      status: "draft",
      views: 0,
      inquiries: 0,
      moq: "1000 kg",
      price: 2.8,
      poolProgress: 0
    }
  ];

  const mockOrders = [
    {
      id: "ORD-2024-001",
      product: "ICUMSA-45 Refined Sugar",
      buyer: "Global Imports LLC",
      quantity: "25 MT",
      value: 12125,
      status: "in_production",
      deadline: "2024-03-15"
    },
    {
      id: "ORD-2024-002", 
      product: "Organic Cotton Fabric",
      buyer: "Fashion Co",
      quantity: "2000 m",
      value: 17000,
      status: "shipped",
      deadline: "2024-02-28"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <TopNav />
      
      {/* Verification Status Banner */}
      {mockStats.verificationStatus !== "verified" && (
        <div className="bg-amber-50 border-b border-amber-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-800">
                  Account Verification {mockStats.verificationStatus === "pending" ? "In Progress" : "Required"}
                </p>
                <p className="text-xs text-amber-700">
                  {mockStats.verificationStatus === "pending" 
                    ? "Your documents are being reviewed. You'll receive an update within 3-5 business days."
                    : "Complete your verification to start receiving orders."}
                </p>
              </div>
              {mockStats.verificationStatus === "rejected" && (
                <Link
                  to="/supplier-setup"
                  className="text-xs bg-amber-600 text-white px-3 py-1 rounded hover:bg-amber-700"
                >
                  Update Documents
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Supplier Dashboard
              </h1>
              <p className="text-slate-600 mt-1">
                Welcome back, {userProfile?.companyName || userProfile?.businessName}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {mockStats.verificationStatus === "verified" ? (
                  <Shield className="h-5 w-5 text-green-500" />
                ) : (
                  <Clock className="h-5 w-5 text-amber-500" />
                )}
                <span className="text-sm text-slate-600 capitalize">
                  {mockStats.verificationStatus === "verified" ? "Verified Supplier" : `${mockStats.verificationStatus} Verification`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                <p className="text-2xl font-bold text-slate-900">${mockStats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600">+15% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Active Listings</p>
                <p className="text-2xl font-bold text-slate-900">{mockStats.activeListings}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <Activity className="h-4 w-4 text-blue-500 mr-1" />
              <span className="text-slate-600">3 pools forming</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Orders</p>
                <p className="text-2xl font-bold text-slate-900">{mockStats.totalOrders}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Truck className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-slate-600">95% on-time delivery</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-slate-900">{mockStats.conversionRate}%</p>
              </div>
              <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-slate-600">4.8/5.0 rating</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Product Listings */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900">Product Listings</h2>
              <button 
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Create New Listing
              </button>
            </div>

            <div className="space-y-4">
              {mockListings.map((listing) => (
                <div key={listing.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-slate-900">{listing.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          listing.status === 'active' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {listing.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">
                        {listing.category} • MOQ: {listing.moq} • ${listing.price}/{listing.category === 'Textiles' ? 'm' : listing.category === 'Sugar' ? 'MT' : 'kg'}
                      </p>
                      
                      {listing.status === 'active' && (
                        <div>
                          <div className="flex justify-between text-xs text-slate-600 mb-1">
                            <span>Pool Progress</span>
                            <span>{listing.poolProgress}% filled</span>
                          </div>
                          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                              style={{ width: `${listing.poolProgress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 ml-6">
                      <div className="text-right text-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Eye className="h-4 w-4" />
                          {listing.views}
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 mt-1">
                          <MessageCircle className="h-4 w-4" />
                          {listing.inquiries}
                        </div>
                      </div>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Recent Orders</h2>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="text-left py-3 px-4 font-medium text-slate-700 text-sm">Order ID</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-700 text-sm">Product</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-700 text-sm">Buyer</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-700 text-sm">Quantity</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-700 text-sm">Value</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-700 text-sm">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {mockOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 text-sm font-medium text-blue-600">{order.id}</td>
                          <td className="py-3 px-4 text-sm text-slate-900">{order.product}</td>
                          <td className="py-3 px-4 text-sm text-slate-600">{order.buyer}</td>
                          <td className="py-3 px-4 text-sm text-slate-600">{order.quantity}</td>
                          <td className="py-3 px-4 text-sm font-medium text-slate-900">${order.value.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === 'shipped' 
                                ? 'bg-green-100 text-green-700'
                                : order.status === 'in_production'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {order.status.replace('_', ' ')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
              <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                  <Plus className="h-5 w-5 text-blue-500" />
                  <span>Create New Listing</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                  <BarChart3 className="h-5 w-5 text-green-500" />
                  <span>View Analytics</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                  <MessageCircle className="h-5 w-5 text-purple-500" />
                  <span>Messages</span>
                </button>
                <Link
                  to="/supplier-setup"
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <Edit className="h-5 w-5 text-amber-500" />
                  <span>Update Profile</span>
                </Link>
              </div>
            </div>

            {/* Performance Insights */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
              <h3 className="font-semibold text-slate-900 mb-4">This Week</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Profile Views</span>
                  <span className="font-medium text-slate-900">342</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">New Inquiries</span>
                  <span className="font-medium text-slate-900">28</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Orders Shipped</span>
                  <span className="font-medium text-slate-900">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Revenue</span>
                  <span className="font-medium text-slate-900">$8,450</span>
                </div>
              </div>
            </div>

            {/* Help & Support */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-blue-100 text-sm mb-4">
                Get support with listings, orders, or platform features.
              </p>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}