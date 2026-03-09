import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import facebook from "../assets/facebook.png";
import google from "../assets/google.png";
import github from "../assets/github.png";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginAs, setLoginAs] = useState("student");
  const [message, setMessage] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      setMessage("Error during sign-in: " + error.message);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setMessage("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const userRole = userData.role || "student";

        if (loginAs !== userRole) {
          await auth.signOut();
          setMessage(` This account is registered as ${userRole}, not ${loginAs}.`);
          setIsLoggingIn(false);
          return;
        }

        setMessage(" Login Successful!");

        if (userRole === "admin") {
          setTimeout(() => navigate("/admin"), 1500);
        } else {
          setTimeout(() => navigate("/"), 1500);
        }
      } else {
        if (loginAs !== "student") {
          await auth.signOut();
          setMessage("This account is not registered as admin.");
          setIsLoggingIn(false);
          return;
        }
        setMessage("Login Successful!");
        setTimeout(() => navigate("/dashboard"), 1500);
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Login failed: " + err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const socialButtons = [
    { icon: github, name: "GitHub", onClick: () => console.log("GitHub login") },
    { icon: google, name: "Google", onClick: handleGoogleLogin },
    { icon: facebook, name: "Facebook", onClick: () => console.log("Facebook login") },
  ];

  return (
    <div className="min-h-screen w-full flex bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Left Section - Greeting */}
      <div className="hidden lg:flex w-1/2 items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
          >
            <span className="text-5xl">🎓</span>
          </motion.div>
          <h1 className="text-5xl font-bold mb-4 text-gray-800 dark:text-white">Welcome Back, Hero!</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Ready to make your campus better?
          </p>
          
          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <div className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 shadow-sm">
              📝 Submit Complaints
            </div>
            <div className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 shadow-sm">
              🔍 Track Progress
            </div>
            <div className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 shadow-sm">
              ✅ Get Resolved
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.01 }}
          className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-xl px-6 py-8 border border-gray-200 dark:border-gray-700"
        >
          {/* Logo */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <span className="text-3xl">🎓</span>
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome Back</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Sign in to CampusCare</p>
          </div>

          {/* Social Logins */}
          <div className="flex gap-2 mb-4 justify-center">
            {socialButtons.map((social, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={social.onClick}
                className="group border border-gray-300 dark:border-gray-600 rounded-xl h-10 w-10 flex items-center justify-center hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/20 transition-all duration-300 bg-white dark:bg-gray-700"
                title={`Sign in with ${social.name}`}
              >
                <img src={social.icon} alt={social.name} className="w-5 h-5 object-contain group-hover:scale-110 transition-transform duration-300" />
              </motion.button>
            ))}
          </div>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSignIn}>
            {/* Email Input */}
            <div className="relative mb-3 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all dark:text-white"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative mb-3 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all dark:text-white"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-500 transition-colors"
              >
                {showPassword ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a9.026 9.026 0 012.122-.264c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.563 3.029m-5.858 5.908a9.973 9.973 0 01-2.122.264" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Login As Selection */}
            <div className="mb-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Login as:</p>
              <div className="flex gap-2">
                <motion.label
                  whileHover={{ scale: 1.03 }}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl cursor-pointer transition-all ${
                    loginAs === "student"
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  <input type="radio" name="loginAs" value="student" checked={loginAs === "student"} onChange={(e) => setLoginAs(e.target.value)} className="hidden" />
                  <span className="text-base">👨‍🎓</span>
                  <span className="text-sm font-medium">Student</span>
                </motion.label>
                <motion.label
                  whileHover={{ scale: 1.03 }}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl cursor-pointer transition-all ${
                    loginAs === "admin"
                      ? "bg-purple-500 text-white shadow-md"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  <input type="radio" name="loginAs" value="admin" checked={loginAs === "admin"} onChange={(e) => setLoginAs(e.target.value)} className="hidden" />
                  <span className="text-base">👤</span>
                  <span className="text-sm font-medium">Admin</span>
                </motion.label>
              </div>
            </div>

            <div className="flex justify-end mb-4">
              <Link to="#forgot" className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl px-4 py-2.5 mb-3 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
            >
              {isLoggingIn ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Signing In...
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </motion.button>

            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-2.5 rounded-xl text-xs text-center ${
                  message.includes("Successful")
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                    : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"
                }`}
              >
                {message}
              </motion.div>
            )}

            <p className="text-xs text-gray-600 dark:text-gray-400 text-center mt-5">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline transition-all">
                Create New
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
