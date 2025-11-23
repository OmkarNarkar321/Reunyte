// src/Components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

const ProtectedRoute = ({ children, allowedUserTypes = [] }) => {
  const { isAuthenticated, loading, userType } = useAuth();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    console.log('🚫 Access denied: User not authenticated');
    return <Navigate to="/login" replace />;
  }

  // Check if user type is allowed (if specified)
  if (allowedUserTypes.length > 0 && !allowedUserTypes.includes(userType)) {
    console.log(`🚫 Access denied: User type "${userType}" not allowed`);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">
            This page is only accessible to {allowedUserTypes.join(', ')} accounts.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // User is authenticated and has correct user type
  return children;
};

export default ProtectedRoute;