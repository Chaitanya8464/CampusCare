import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import facebook from "../assets/facebook.png";
import google from "../assets/google.png";
import github from "../assets/github.png";
import auth from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";

const db = getFirestore();

export default function SignUpForm({ isSignUp }) {
   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirmPassword] = useState("");
 
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage("❌ Passwords do not match!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("✅ Account created successfully!");
      setTimeout(() => navigate("/signin"), 1500);
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };
  
 

  return (
    <div
      className="h-screen w-full flex transition-transform duration-700 ease-in-out"
    >
      <div className="h-screen w-full flex relative">
        <header className="flex flex-col md:flex-row items-center justify-between flex-grow px-5 py-36 shadow-lg shadow-green-500/50 bg-gradient-to-br from-gray-500 to-white-600 rounded-lg m-10">
          <div className="w-lg mb-10">
            <h1 className="text-4xl font-bold text-gray-800 mt-20">
              Join CampusCare Today!
            </h1>
            <p className="text-white text-lg pt-4">
              Create your account to get started and be part of our community.
            </p>
          </div>
        </header>

        <section className="absolute top-0 right-0 h-full w-1/2 flex transition-all duration-700 py-24 px-12 ">
          <div className="h-full w-1/2 flex flex-col justify-center text-center opacity-100 ml-80 px-8 py-20 shadow-green-500 shadow-lg rounded-lg bg-gradient-to-br from-gray-500 to-white-600">
            <h1 className="text-2xl font-bold text-white">Sign Up</h1>
            <div className="flex gap-3 my-4 justify-center items-center">
              <a
                href="#"
                className="border border-white-500 rounded-full h-10 w-10 flex items-center justify-center hover:rotate-12 transition"
              >
                <img
                  src={github}
                  alt="github"
                  className="h-10 w-10 rounded-full"
                />
              </a>
              <a
                href="#"
                className="border border-white-500 rounded-full h-10 w-10 flex items-center justify-center hover:rotate-12 transition"
              >
                <img
                  src={google}
                  alt="google"
                  className="h-10 w-10 rounded-full"
                />
              </a>
              <a
                href="#"
                className="border border-white-500 rounded-full h-10 w-10 flex items-center justify-center hover:rotate-12 transition"
              >
                <img
                  src={facebook}
                  alt="facebook"
                  className="h-10 w-10 rounded-full"
                />
              </a>
            </div>
            <span className="text-xs text-gray-800">
              Or sign up using email address
            </span>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-gray-100 rounded-full px-4 py-2 my-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-100 rounded-full px-4 py-2 my-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-100 rounded-full px-4 py-2 my-2"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-gray-100 rounded-full px-4 py-2 my-2"
            />
            <button className="w-full bg-green-500 text-white rounded-full px-4 py-2 my-2 hover:shadow-lg">
              Sign Up
            </button>
            {message && <p className="mt-2 text-sm">{message}</p>}
            <span className="text-xs text-white my-2">
              Already have an account?
              <Link
                to="/login"
               
                className="text-blue-600 hover:underline ml-1"
              >
                Sign In
              </Link>
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
