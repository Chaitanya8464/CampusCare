import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import facebook from "../assets/facebook.png";
import google from "../assets/google.png";
import github from "../assets/github.png";
import app from "../firebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [slide, setSlide] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleSwap = (e) => {
    e.preventDefault();
    setSlide(true);
    setTimeout(() => navigate("/signup"), 600);
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed in:", result.user);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Login Successful");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setMessage("User Not Found: " + err.message);
    }
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col md:flex-row transition-transform duration-700 ease-in-out ${
        slide ? "-translate-x-full" : "translate-x-0"
      }`}
    >
      {/* Left Section */}
      <header className="flex flex-col items-center justify-center md:items-start flex-grow px-6 py-12 md:py-36 bg-gradient-to-br from-gray-500 to-white-600 rounded-lg m-4 md:m-10 shadow-blue-500/50">
        <div className="max-w-lg text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-6 md:mt-20">
            Welcome Back To CampusCare!
          </h1>
          <p className="text-white text-base md:text-lg pt-4">
            We're glad to see you again, please enter your credentials to
            continue.
          </p>
        </div>
      </header>

      {/* Sign-in Card */}
      <section className="flex justify-center items-center w-full md:w-1/2 py-12 px-4 sm:px-8 md:px-12">
        <div className="w-full sm:max-w-md flex flex-col justify-center text-center px-6 py-10 shadow-blue-500 shadow-lg rounded-lg bg-gradient-to-br from-gray-500 to-white-600">
          <h1 className="text-2xl font-bold text-white">Sign In</h1>

          {/* Social Logins */}
          <div className="flex gap-3 my-4 justify-center items-center">
            <a
              href="#x"
              className="border rounded-full h-10 w-10 flex items-center justify-center hover:rotate-12 transition"
            >
              <img src={github} alt="github" className="w-8 h-8 rounded-full" />
            </a>
            <button
              onClick={handleGoogleLogin}
              className="h-10 w-10 border rounded-full flex items-center justify-center hover:rotate-12 transition"
            >
              <img src={google} alt="google" className="w-8 h-8 rounded-full" />
            </button>
            <a
              href="#"
              className="border rounded-full h-10 w-10 flex items-center justify-center hover:rotate-12 transition"
            >
              <img src={facebook} alt="facebook" className="w-8 h-8 rounded-full" />
            </a>
          </div>

          <span className="text-xs text-gray-800">
            Or, sign in using email address
          </span>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-100 rounded-full px-4 py-2 my-2"
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-100 rounded-full px-4 py-2 my-2"
            required
          />

          <a href="#" className="text-sm text-green-600 my-2 block text-right">
            Forget Password?
          </a>

          <button
            onClick={handleSignIn}
            className="w-full bg-blue-500 text-white rounded-full px-4 py-2 my-2 hover:shadow-lg"
          >
            Sign In
          </button>

          {message && <p className="mt-2 text-sm text-white">{message}</p>}

          <span className="text-xs text-white my-2">
            Don't have an account?
            <Link
              to="/signup"
              onClick={handleSwap}
              className="text-green-600 hover:underline ml-1"
            >
              Create New
            </Link>
          </span>
        </div>
      </section>
    </div>
  );
}
