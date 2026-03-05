import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import profileLogo from "../assets/profileLogo.jpg";
import logo from "../assets/CampusCare.jpg";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-gray-800 dark:bg-gray-900 text-white px-6 py-4 shadow-sm fixed top-0 left-0 w-full z-50 transition-colors duration-300">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center gap-2 hover:opacity-80">
          <img src={logo} alt="CampusCare" className="w-10 h-10 rounded-full" />
          CampusCare
        </Link>

        {/* Menu (Desktop) */}
        <div className="hidden md:flex gap-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/services" className="hover:underline">Services</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-700 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-700 transition"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          {user ? (
            <>
              {/* User Info */}
              <span className="text-sm font-medium hidden md:block">
                👤 {user.displayName || user.email}
              </span>

              {/* Profile Icon */}
              <Link
                to="/dashboard"
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
                className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
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
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-16 bg-gray-800 dark:bg-gray-900 text-white flex flex-col items-center py-4 space-y-4 shadow-md z-40 absolute top-full left-0 w-full">
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
