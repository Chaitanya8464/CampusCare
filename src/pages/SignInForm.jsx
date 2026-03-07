import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user role from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const userRole = userData.role || "student";

        // Check if selected role matches actual user role
        if (loginAs !== userRole) {
          // Sign out the user
          await auth.signOut();
          setMessage(`❌ This account is registered as ${userRole}, not ${loginAs}.`);
          setIsLoggingIn(false);
          return;
        }

        setMessage("✅ Login Successful!");
        
        // Redirect based on actual role
        if (userRole === "admin") {
          setTimeout(() => navigate("/admin"), 1500);
        } else {
          setTimeout(() => navigate("/"), 1500);
        }
      } else {
        // No user document - treat as student
        if (loginAs !== "student") {
          await auth.signOut();
          setMessage("❌ This account is not registered as admin.");
          setIsLoggingIn(false);
          return;
        }
        setMessage("✅ Login Successful!");
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Login failed: " + err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-br from-gray-800 to-gray-600">
      {/* Left Section - Welcome */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-12">
        <div className="max-w-lg text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome Back To CampusCare!
          </h1>
          <p className="text-gray-300 text-lg">
            We're glad to see you again, please enter your credentials to continue.
          </p>
        </div>
      </div>

      {/* Sign-in Card */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-6 py-12">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl px-8 py-10">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Sign In</h1>

          {/* Social Logins */}
          <div className="flex gap-3 mb-4 justify-center">
            <a href="#github" className="border rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-100 transition">
              <img src={github} alt="github" className="w-6 h-6" />
            </a>
            <button
              onClick={handleGoogleLogin}
              className="border rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-100 transition"
            >
              <img src={google} alt="google" className="w-6 h-6" />
            </button>
            <a href="#facebook" className="border rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-100 transition">
              <img src={facebook} alt="facebook" className="w-6 h-6" />
            </a>
          </div>

          <p className="text-xs text-gray-500 text-center mb-4">Or, sign in using email address</p>

          <form onSubmit={handleSignIn}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-100 rounded-full px-4 py-2 mb-2"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-100 rounded-full px-4 py-2 mb-2"
              required
            />

            {/* Login As Selection */}
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Login as:</p>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="loginAs"
                    value="student"
                    checked={loginAs === "student"}
                    onChange={(e) => setLoginAs(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Student</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="loginAs"
                    value="admin"
                    checked={loginAs === "admin"}
                    onChange={(e) => setLoginAs(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Admin</span>
                </label>
              </div>
            </div>

            <a href="#forgot" className="text-sm text-green-600 block text-right mb-4 hover:underline">
              Forgot Password?
            </a>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-blue-500 text-white rounded-full px-4 py-2 mb-2 hover:bg-blue-600 transition disabled:opacity-50"
            >
              {isLoggingIn ? "Signing In..." : "Sign In"}
            </button>

            {message && (
              <p className={`mt-2 text-sm text-center ${message.includes('Successful') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}

            <p className="text-xs text-gray-600 text-center mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-green-600 hover:underline font-medium">
                Create New
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
