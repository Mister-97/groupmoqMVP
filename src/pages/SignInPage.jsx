// src/pages/SignInPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import TopNav from "../components/TopNav";
import { SiteFooter } from "../App.jsx";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const colors = { navy: "#1B2A41", gold: "#F0A92D" };

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // 1. Authenticate with Firebase
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      // 2. Check Firestore for profile data
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      // 3. Check for stored redirect information
      const redirectPath = localStorage.getItem('redirectAfterLogin');
      const pendingAction = localStorage.getItem('pendingAction');
      const pendingQuantity = localStorage.getItem('pendingQuantity');

      if (userDoc.exists()) {
        const data = userDoc.data();
        if (data.profileComplete) {
          // Profile is complete, handle redirect
          if (redirectPath) {
            // Clear stored redirect data
            localStorage.removeItem('redirectAfterLogin');
            localStorage.removeItem('pendingAction');
            localStorage.removeItem('pendingQuantity');
            
            // Show success message if user was trying to join a pool
            if (pendingAction === 'join') {
              // You could show a toast notification here
              console.log('Redirecting to pool after successful login');
            }
            
            navigate(redirectPath);
          } else {
            navigate("/dashboard");
          }
        } else {
          // Profile incomplete, store redirect for after profile setup
          if (redirectPath) {
            localStorage.setItem('redirectAfterProfileSetup', redirectPath);
            if (pendingAction) {
              localStorage.setItem('pendingActionAfterProfileSetup', pendingAction);
            }
            if (pendingQuantity) {
              localStorage.setItem('pendingQuantityAfterProfileSetup', pendingQuantity);
            }
            // Clear the original redirect data
            localStorage.removeItem('redirectAfterLogin');
            localStorage.removeItem('pendingAction');
            localStorage.removeItem('pendingQuantity');
          }
          navigate("/profile-setup");
        }
      } else {
        // No profile exists, store redirect for after profile setup
        if (redirectPath) {
          localStorage.setItem('redirectAfterProfileSetup', redirectPath);
          if (pendingAction) {
            localStorage.setItem('pendingActionAfterProfileSetup', pendingAction);
          }
          if (pendingQuantity) {
            localStorage.setItem('pendingQuantityAfterProfileSetup', pendingQuantity);
          }
          // Clear the original redirect data
          localStorage.removeItem('redirectAfterLogin');
          localStorage.removeItem('pendingAction');
          localStorage.removeUser('pendingQuantity');
        }
        navigate("/profile-setup");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      
      // Show user-friendly error messages
      let errorMessage = "Login failed. Please try again.";
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = "No account found with this email address.";
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "Incorrect password. Please try again.";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Please enter a valid email address.";
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = "This account has been disabled.";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many failed attempts. Please try again later.";
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Check if user is coming from a pool page
  const redirectPath = localStorage.getItem('redirectAfterLogin');
  const pendingAction = localStorage.getItem('pendingAction');
  const isFromPool = redirectPath && redirectPath.includes('/pool/');

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0F1826] to-[#15233A] text-white">
      {/* Top navigation */}
      <TopNav inverted />

      {/* Main content */}
      <section className="flex flex-grow items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg text-slate-900"
        >
          <h1 className="text-2xl font-extrabold text-center text-slate-900">
            Sign in to GroupMOQ
          </h1>

          <p className="mt-2 text-center text-sm text-slate-600">
            Escrow-protected platform. Your info stays safe.
          </p>

          {/* Show context if user came from a pool */}
          {isFromPool && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 text-center">
                {pendingAction === 'join' 
                  ? "Sign in to join this pool and access wholesale pricing"
                  : "Sign in to view pool details and join group orders"
                }
              </p>
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B2A41]"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B2A41]"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Sign in button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg px-4 py-2.5 font-medium text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              style={{ backgroundColor: colors.navy }}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-4 text-sm text-center text-slate-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium hover:underline"
              style={{ color: colors.navy }}
            >
              Create one
            </Link>
          </div>

          {/* Additional context for pool users */}
          {isFromPool && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-500 text-center">
                New to GroupMOQ? Join thousands of buyers getting factory pricing through group orders.
              </p>
            </div>
          )}
          
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
}