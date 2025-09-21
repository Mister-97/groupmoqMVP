// src/pages/SignUpPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import TopNav from "../components/TopNav";
import { SiteFooter } from "../App.jsx";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const colors = { navy: "#1B2A41", gold: "#F0A92D" };

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Validate password match
    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    // Validate password strength
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      // 1. Create Firebase auth user
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      // 2. Check for stored redirect information before creating profile
      const redirectPath = localStorage.getItem('redirectAfterLogin');
      const pendingAction = localStorage.getItem('pendingAction');
      const pendingQuantity = localStorage.getItem('pendingQuantity');

      // 3. Create Firestore user doc
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        profileComplete: false,
        createdAt: new Date().toISOString(),
      });

      // 4. Handle redirect information for profile setup
      if (redirectPath) {
        // Store redirect info for after profile setup
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

      // 5. Redirect to profile setup
      navigate("/profile-setup");
    } catch (err) {
      console.error("Signup failed:", err.message);
      
      // Show user-friendly error messages
      let errorMessage = "Account creation failed. Please try again.";
      
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = "An account with this email already exists. Try signing in instead.";
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = "Please enter a valid email address.";
      } else if (err.code === 'auth/weak-password') {
        errorMessage = "Password is too weak. Please choose a stronger password.";
      } else if (err.code === 'auth/operation-not-allowed') {
        errorMessage = "Account creation is currently disabled. Please contact support.";
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
      <TopNav inverted />

      <section className="flex flex-grow items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg text-slate-900"
        >
          <h1 className="text-2xl font-extrabold text-center text-slate-900">
            Create your GroupMOQ account
          </h1>

          <p className="mt-2 text-center text-sm text-slate-600">
            Join the escrow-protected group buying platform.
          </p>

          {/* Show context if user came from a pool */}
          {isFromPool && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800 text-center">
                {pendingAction === 'join' 
                  ? "Create account to join this pool and unlock wholesale pricing"
                  : "Create account to access group buying opportunities"
                }
              </p>
            </div>
          )}

          <form onSubmit={handleSignup} className="mt-6 space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
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
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 pl-9 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B2A41]"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Must be at least 6 characters long
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Confirm Password</label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type={showConfirm ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className={`w-full rounded-lg border pl-9 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B2A41] ${
                    confirm && password !== confirm 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-slate-300'
                  }`}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  disabled={loading}
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {confirm && password !== confirm && (
                <p className="text-xs text-red-600 mt-1">
                  Passwords do not match
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || (confirm && password !== confirm)}
              className="w-full rounded-lg px-4 py-2.5 font-medium text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              style={{ backgroundColor: colors.navy }}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="mt-4 text-sm text-center text-slate-600">
            Already have an account?{" "}
            <Link to="/signin" className="font-medium hover:underline" style={{ color: colors.navy }}>
              Sign in
            </Link>
          </div>

          {/* Benefits for pool users */}
          {isFromPool && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <h3 className="text-sm font-medium text-slate-700 mb-2">What you get with GroupMOQ:</h3>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• Factory pricing through group orders</li>
                <li>• Escrow protection via Stripe Connect</li>
                <li>• Full refund if MOQ isn't met</li>
                <li>• Pooled freight to reduce shipping costs</li>
              </ul>
            </div>
          )}

          {/* Terms and privacy notice */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-center">
              By creating an account, you agree to our{" "}
              <Link to="/terms" className="underline hover:text-slate-700">Terms of Service</Link>
              {" "}and{" "}
              <Link to="/privacy" className="underline hover:text-slate-700">Privacy Policy</Link>.
            </p>
          </div>
        </motion.div>
      </section>

      <SiteFooter />
    </div>
  );
}