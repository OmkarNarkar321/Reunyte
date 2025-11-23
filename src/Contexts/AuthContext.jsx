// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null); // 'student', 'colleges', 'startup', 'organization'

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      const storedUserType = localStorage.getItem('userType');
      
      if (token && storedUser && storedUserType) {
        const userData = JSON.parse(storedUser);
        
        // Only verify token for student (since other modules aren't ready yet)
        if (storedUserType === 'student') {
          // Verify token is still valid by calling /api/auth/me
          const response = await fetch('http://localhost:5000/api/auth/me', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data.data);
            setUserType(storedUserType);
            setIsAuthenticated(true);
            console.log('✅ User authenticated:', data.data.email, '| Type:', storedUserType);
          } else {
            // Token invalid, clear storage
            handleLogout();
          }
        } else {
          // For non-student types (future implementation)
          setUser(userData);
          setUserType(storedUserType);
          setIsAuthenticated(true);
          console.log('✅ User authenticated (non-student):', userData.email, '| Type:', storedUserType);
        }
      }
    } catch (error) {
      console.error('❌ Auth check failed:', error);
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData, token, type = 'student') => {
    try {
      // Store in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userEmail', userData.email);
      localStorage.setItem('userId', userData.id);
      localStorage.setItem('userType', type);
      
      // Update state
      setUser(userData);
      setUserType(type);
      setIsAuthenticated(true);
      
      console.log('✅ Login successful:', userData.email, '| Type:', type);
      return true;
    } catch (error) {
      console.error('❌ Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      const currentUserType = localStorage.getItem('userType');
      
      // Call logout endpoint only for student (since API is ready)
      if (token && currentUserType === 'student') {
        await fetch('http://localhost:5000/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
      
      handleLogout();
      
      console.log('✅ Logout successful');
      return true;
    } catch (error) {
      console.error('❌ Logout error:', error);
      handleLogout(); // Still clear local data even if API call fails
      return true;
    }
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    
    // Clear state
    setUser(null);
    setUserType(null);
    setIsAuthenticated(false);
    
    // Redirect to home
    navigate('/');
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const getDashboardRoute = () => {
    switch(userType) {
      case 'student':
        return '/studentdashboard/your-name';
      case 'colleges':
        return '/college/dashboard';
      case 'startup':
        return '/startup/dashboard';
      case 'organization':
        return '/organization/dashboard';
      default:
        return '/';
    }
  };

  const value = {
    user,
    userType,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
    checkAuthStatus,
    getDashboardRoute
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};