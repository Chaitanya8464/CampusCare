import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import profileLogo from "../assets/profileLogo.jpg";
import logo from "../assets/CampusCare.jpg";
import { auth } from "../firebase"; // adjust path to your firebase.js
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Listen for login state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-gray-800 text-white px-6 py-4 shadow-sm fixed top-0 left-0 w-full z-50">
        {/* Logo */}
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <img src={logo} alt="CampusCare" className="w-10 h-10 rounded-full" />
          CampusCare
        </h1>

        {/* Menu (Desktop) */}
        <div className="hidden md:flex gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/services" className="hover:underline">Services</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* User Info */}
              <span className="text-sm font-medium">
                👤 {user.displayName || user.email}
              </span>

              {/* Profile Icon */}
              <Link
                to="/profile"
                className="bg-white text-blue-600 rounded-full hover:bg-gray-100 transition"
              >
                <img
                  src={profileLogo}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              </Link>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-red-600 px-3 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-white text-blue-600 rounded-full hover:bg-gray-100 transition"
            >
              <img
                src={profileLogo}
                alt="Login"
                className="w-10 h-10 rounded-full"
              />
            </Link>
          )}

          {/* Hamburger Button (Mobile) */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-16 bg-gray-800 text-white flex flex-col items-center py-4 space-y-4 shadow-md z-40">
            <Link to="/" className="hover:underline" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/about" className="hover:underline" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/services" className="hover:underline" onClick={() => setIsOpen(false)}>Services</Link>
            <Link to="/contact" className="hover:underline" onClick={() => setIsOpen(false)}>Contact</Link>
          </div>
        )}
      </nav>
    </div>
  );
}
