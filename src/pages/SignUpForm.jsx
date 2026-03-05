import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import google from "../assets/google.png";
import github from "../assets/github.png";
import facebook from "../assets/facebook.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

export default function SignUpForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: fullName
      });
      setMessage("Account created successfully!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-br from-gray-800 to-gray-600">
      {/* Left Section - Welcome */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-12">
        <div className="max-w-lg text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Join CampusCare Today!
          </h1>
          <p className="text-gray-300 text-lg">
            Create your account to get started and be part of our community.
          </p>
        </div>
      </div>

      {/* Right Section - Sign Up Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-6 py-12">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl px-8 py-10">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Sign Up</h1>

          {/* Social Sign Up */}
          <div className="flex gap-3 mb-4 justify-center">
            <a href="#github" className="border rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-100 transition">
              <img src={github} alt="github" className="w-6 h-6" />
            </a>
            <a href="#google" className="border rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-100 transition">
              <img src={google} alt="google" className="w-6 h-6" />
            </a>
            <a href="#facebook" className="border rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-100 transition">
              <img src={facebook} alt="facebook" className="w-6 h-6" />
            </a>
          </div>

          <p className="text-xs text-gray-500 text-center mb-4">Or, sign up using email address</p>

          <form onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-gray-100 rounded-full px-4 py-2 mb-2"
              required
            />

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

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-gray-100 rounded-full px-4 py-2 mb-4"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-full px-4 py-2 mb-2 hover:bg-blue-600 transition"
            >
              Sign Up
            </button>

            {message && (
              <p className={`mt-2 text-sm text-center ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}

            <p className="text-xs text-gray-600 text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-green-600 hover:underline font-medium">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
