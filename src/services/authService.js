// authService.js - Centralized authentication service
const API_BASE_URL = 'http://localhost:5000';

export const authService = {
  // Get stored auth data
  getAuthData: () => ({
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
    userEmail: localStorage.getItem('userEmail'),
  }),

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Clear all auth data
  clearAuthData: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole'); // if you have roles
  },

  // Logout with API call
  logout: async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Call logout endpoint if you have one
      if (token) {
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Logout API error:', error);
      // Still clear local data even if API fails
    } finally {
      authService.clearAuthData();
    }
  },

  // Change password (simplified - no current password needed)
  changePassword: async (newPassword, confirmPassword) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newPassword,
        confirmPassword,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to change password');
    }

    return result;
  },

  // Request password reset (forgot password)
  forgotPassword: async (email) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to send reset email');
    }

    return result;
  },

  // Reset password with token
  resetPassword: async (token, newPassword) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, newPassword }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to reset password');
    }

    return result;
  },
};

// useAuth.js - Custom hook for authentication
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      setLoading(false);

      if (!authenticated) {
        navigate('/login', { replace: true });
      }
    };

    checkAuth();
  }, [navigate]);

  const logout = async () => {
    try {
      await authService.logout();
      setIsAuthenticated(false);
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      // Still navigate even if error
      navigate('/login', { replace: true });
    }
  };

  const switchAccount = () => {
    authService.clearAuthData();
    setIsAuthenticated(false);
    navigate('/login', { replace: true, state: { message: 'Please login with your account' } });
  };

  return {
    isAuthenticated,
    loading,
    logout,
    switchAccount,
    authData: authService.getAuthData(),
  };
};