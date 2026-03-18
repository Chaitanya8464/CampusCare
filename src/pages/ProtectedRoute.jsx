import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

/**
 * Loading Spinner Component
 */
const LoadingSpinner = () => (
  <div 
    className="min-h-screen flex items-center justify-center bg-white dark:bg-black"
    role="status"
    aria-label="Loading"
  >
    <div className="text-center">
      <div 
        className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"
        aria-hidden="true"
      ></div>
      <p className="text-gray-600 dark:text-gray-300">Loading...</p>
    </div>
  </div>
);

/**
 * Protected Route Component
 * Wraps routes that require authentication
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {string} [props.requiredRole] - Required user role (optional)
 */
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, role, loading } = useAuth();

  // Show loading spinner while auth state is being determined
  if (loading) {
    return <LoadingSpinner />;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to home if user doesn't have required role
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
