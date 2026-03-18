import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import profileLogo from "../assets/profileLogo.jpg";
import logo from "../assets/CampusCare.jpg";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../pages/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { role } = useAuth();

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
      <nav className="flex justify-between items-center bg-gray-900 dark:bg-black text-white px-6 py-3 shadow-lg fixed top-0 left-0 w-full z-50 transition-colors duration-300 border-b border-gray-700 dark:border-gray-800">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform duration-300">
          <img src={logo} alt="CampusCare" className="w-10 h-10 rounded-full shadow-md ring-2 ring-blue-500" />
          <span className="text-white">CampusCare</span>
        </Link>

        {/* Menu (Desktop) */}
        <div className="hidden md:flex gap-6 items-center">
          {/* Hide Home for admins */}
          {role !== "admin" && (
            <Link to="/" className="relative group hover:text-blue-400 transition-colors duration-300">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          )}
          <Link to="/about" className="relative group hover:text-blue-400 transition-colors duration-300">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
          </Link>

          {/* Show Services/Contact only for students, not admins */}
          {role !== "admin" && (
            <>
              <Link to="/services" className="relative group hover:text-blue-400 transition-colors duration-300">
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link to="/contact" className="relative group hover:text-blue-400 transition-colors duration-300">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </>
          )}

          {/* Admin Dashboard Link - Only for admins */}
          {role === "admin" && (
            <Link to="/admin" className="relative group hover:text-yellow-400 transition-colors duration-300">
              <span className="text-yellow-400">Admin Dashboard</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-700/50 dark:bg-gray-800/50 hover:bg-gray-600 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
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
              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-2 focus:outline-none group"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-400 dark:from-white dark:to-gray-300 rounded-full blur-sm opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                    <img
                      src={profileLogo}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border-2 border-transparent group-hover:border-blue-400 transition-all duration-300 relative z-10 shadow-lg"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full z-20"></div>
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                      {user.displayName || user.email?.split('@')[0]}
                    </p>
                    <p className="text-xs text-gray-400 capitalize">{role || 'User'}</p>
                  </div>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-300 hidden lg:block ${profileMenuOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {profileMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileMenuOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden border border-gray-200 dark:border-gray-700 animate-fade-in">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-600">
                        <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                          {user.displayName || user.email}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                      </div>
                      <div className="py-2">
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Dashboard
                        </Link>
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                          onClick={() => setProfileMenuOpen(false)}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Settings
                        </Link>
                        {role === "admin" && (
                          <Link
                            to="/admin"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-gray-700 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors duration-200"
                            onClick={() => setProfileMenuOpen(false)}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            Admin Panel
                          </Link>
                        )}
                      </div>
                      <div className="py-2 border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={() => {
                            handleLogout();
                            setProfileMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 dark:from-white dark:to-gray-300 hover:from-gray-800 hover:to-gray-700 dark:hover:from-gray-100 dark:hover:to-gray-200 text-white dark:text-gray-900 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span className="font-medium">Login</span>
            </Link>
          )}

          {/* Hamburger Button (Mobile) */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg className="w-6 h-6 text-gray-300 hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-300 hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-20 bg-gradient-to-b from-gray-800 to-gray-900 dark:from-gray-900 dark:to-gray-950 text-white flex flex-col items-center py-6 space-y-4 shadow-2xl z-40 absolute top-full left-0 w-full border-t border-gray-700">
            {/* Hide Home for admins */}
            {role !== "admin" && (
              <Link to="/" className="hover:text-blue-400 transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
            )}
            <Link to="/about" className="hover:text-blue-400 transition-colors" onClick={() => setIsOpen(false)}>About</Link>

            {/* Show Services/Contact only for students, not admins */}
            {role !== "admin" && (
              <>
                <Link to="/services" className="hover:text-blue-400 transition-colors" onClick={() => setIsOpen(false)}>Services</Link>
                <Link to="/contact" className="hover:text-blue-400 transition-colors" onClick={() => setIsOpen(false)}>Contact</Link>
              </>
            )}

            {/* Admin Dashboard Link - Only for admins */}
            {role === "admin" && (
              <Link to="/admin" className="hover:text-yellow-400 transition-colors" onClick={() => setIsOpen(false)}>Admin Dashboard</Link>
            )}

            {user && (
              <>
                <div className="border-t border-gray-700 w-3/4 my-2"></div>
                <Link to="/dashboard" className="hover:text-blue-400 transition-colors" onClick={() => setIsOpen(false)}>Dashboard</Link>
                <Link to="/profile" className="hover:text-blue-400 transition-colors" onClick={() => setIsOpen(false)}>Settings</Link>
                {role === "admin" && (
                  <Link to="/admin" className="hover:text-yellow-400 transition-colors" onClick={() => setIsOpen(false)}>Admin Panel</Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-red-400 hover:text-red-300 transition-colors font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </div>
  );
}
