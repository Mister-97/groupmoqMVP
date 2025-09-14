// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Users, 
  ShoppingCart, 
  Factory, 
  Settings, 
  LogOut, 
  Bell,
  TrendingUp,
  DollarSign,
  Package,
  Clock,
  Plus,
  Activity,
  Award,
  Shield
} from "lucide-react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import TopNav from "../components/TopNav";

const colors = { navy: "#1B2A41", gold: "#F0A92D" };

export default function Dashboard() {
  const [userType, setUserType] = useState(null);
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
          if (!userData.profileComplete) {
            navigate("/profile-setup");
            return;
          }
          setUserType(userData.userType);
          setUserProfile(userData);
        }
      } catch (err) {
        console.error("Error loading user type:", err.message);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Mock data for demo purposes
  const mockStats = {
    totalSavings: userType === "buyer" ? 2847 : 12450,
    activeDeals: userType === "buyer" ? 3 : 8,
    completedOrders: userType === "buyer" ? 12 : 47,
    rating: 4.8
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <TopNav />
      
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Welcome back, {userProfile?.businessName || "User"}!
              </h1>
              <p className="text-slate-600 mt-1">
                {userType === "buyer" ? "Ready to join some pools?" : "Manage your listings and orders"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
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
                <p className="text-sm font-medium text-slate-600">
                  {userType === "buyer" ? "Total Savings" : "Total Revenue"}
                </p>
                <p className="text-2xl font-bold text-slate-900">${mockStats.totalSavings.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600">+12% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  {userType === "buyer" ? "Active Pools" : "Active Listings"}
                </p>
                <p className="text-2xl font-bold text-slate-900">{mockStats.activeDeals}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <Clock className="h-4 w-4 text-blue-500 mr-1" />
              <span className="text-slate-600">2 ending soon</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Completed Orders</p>
                <p className="text-2xl font-bold text-slate-900">{mockStats.completedOrders}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <Shield className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-slate-600">100% success rate</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-slate-600">Pool Participation</p>
                <p className="text-2xl font-bold text-slate-900">78%</p>
              </div>
              <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div className="relative h-3 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000" 
                style={{ width: "78%" }}
              ></div>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
              <span>Joined: 23</span>
              <span>Completed: 18</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Actions */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
              <button 
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                {userType === "buyer" ? "Create Pool Request" : "Add New Listing"}
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Profile Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Settings className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">Your Profile</h3>
                      <p className="text-sm text-slate-600">Account type: {userType}</p>
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 text-sm mt-4 mb-6">
                  Update your contact info, business details, and verification status.
                </p>
                <Link
                  to="/profile-setup"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Edit Profile →
                </Link>
              </div>

              {/* Buyer-specific cards */}
              {userType === "buyer" && (
                <>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                          <ShoppingCart className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">Open Pools</h3>
                          <p className="text-sm text-slate-600">347 active pools</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm mt-4 mb-6">
                      Browse available pools and join forces with other buyers.
                    </p>
                    <Link
                      to="/pools"
                      className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm"
                    >
                      Explore Pools →
                    </Link>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">Your Pools</h3>
                          <p className="text-sm text-slate-600">{mockStats.activeDeals} active</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm mt-4 mb-6">
                      Track the pools you've joined and see funding progress.
                    </p>
                    <Link
                      to="/my-pools"
                      className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium text-sm"
                    >
                      View My Pools →
                    </Link>
                  </div>
                </>
              )}

              {/* Supplier-specific cards */}
              {userType === "supplier" && (
                <>
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                          <Factory className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">Your Listings</h3>
                          <p className="text-sm text-slate-600">{mockStats.activeDeals} active</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm mt-4 mb-6">
                      Manage your product offerings, pricing, and MOQ.
                    </p>
                    <Link
                      to="/my-listings"
                      className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-medium text-sm"
                    >
                      Manage Listings →
                    </Link>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">Buyer Requests</h3>
                          <p className="text-sm text-slate-600">23 new requests</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm mt-4 mb-6">
                      View requests from buyers looking for group deals.
                    </p>
                    <Link
                      to="/buyer-requests"
                      className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium text-sm"
                    >
                      See Requests →
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
              <h3 className="font-semibold text-slate-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="text-sm">
                    <p className="text-slate-900">Pool funding completed</p>
                    <p className="text-slate-500">ICUMSA-45 Sugar • 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="text-sm">
                    <p className="text-slate-900">New pool available</p>
                    <p className="text-slate-500">Coffee Beans AA • 4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div className="text-sm">
                    <p className="text-slate-900">Payment processed</p>
                    <p className="text-slate-500">Fabric Order #12 • 1 day ago</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-blue-100 text-sm mb-4">
                Get started with our comprehensive guide to group buying.
              </p>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                View Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}