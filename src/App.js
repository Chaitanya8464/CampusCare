import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './pages/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import ToastContainer from './components/ToastContainer';

// Components
import Navbar from './components/Navbar';
import ComplaintForm from './components/ComplaintForm';
import TrackComplaints from './components/TrackComplaints';
import LaxiAssistant from './components/LaxiAssistant';

// Pages
import LandingPage from './LandingPage/landing';
import SignInForm from './pages/SignInForm';
import SignUpForm from './pages/SignUpForm';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Support from './pages/Support';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Help from './pages/Help';
import AdminDashboard from './pages/AdminDashboard';
import FirebaseTest from './pages/FirebaseTest';

// Protected Route
import ProtectedRoute from './pages/ProtectedRoute';

import './App.css';

/**
 * Main Application Component
 * Sets up routing, authentication, and theme contexts
 */
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-white dark:bg-black text-black dark:text-white">
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
                  <Route path="/test-firebase" element={<FirebaseTest />} />

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
                <div className="container mx-auto px-4">
                  <p className="text-sm">
                    &copy; {new Date().getFullYear()} CampusCare. All rights reserved.
                  </p>
                 
                </div>
              </footer>

              {/* AI Assistant */}
              <LaxiAssistant />
              
              {/* Toast Notifications */}
              <ToastContainer />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
