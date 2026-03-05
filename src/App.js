import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./pages/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

// Components
import Navbar from "./components/Navbar";
import ComplaintForm from "./components/ComplaintForm";
import TrackComplaints from "./components/TrackComplaints";

// Pages
import LandingPage from "./LandingPage/landing";
import SignInForm from "./pages/SignInForm";
import SignUpForm from "./pages/SignUpForm";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Support from "./pages/Support";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import AdminDashboard from "./pages/AdminDashboard";

// Protected Route
import ProtectedRoute from "./pages/ProtectedRoute";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<SignInForm />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/support" element={<Support />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/help" element={<Help />} />

                {/* Protected Routes */}
                <Route
                  path="/submit"
                  element={
                    <ProtectedRoute>
                      <ComplaintForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/track"
                  element={
                    <ProtectedRoute>
                      <TrackComplaints />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 dark:bg-gray-900 text-white text-center border-t border-gray-700 py-4 mt-auto">
              <p>&copy; {new Date().getFullYear()} CampusCare. All rights reserved.</p>
            </footer>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
