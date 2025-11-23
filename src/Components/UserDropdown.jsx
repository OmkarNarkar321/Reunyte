// src/Components/UserDropdown.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../Contexts/AuthContext';

const UserDropdown = () => {
  const navigate = useNavigate();
  const { user, userType, logout, getDashboardRoute } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Mouse enter handler (for hover on desktop)
  const handleMouseEnter = () => {
    if (window.innerWidth < 1024) return; // Only on desktop
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsOpen(true);
  };

  // Mouse leave handler (for hover on desktop)
  const handleMouseLeave = () => {
    if (window.innerWidth < 1024) return; // Only on desktop
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  // Dropdown mouse enter (keep open)
  const handleDropdownEnter = () => {
    if (window.innerWidth < 1024) return;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  // Dropdown mouse leave
  const handleDropdownLeave = () => {
    if (window.innerWidth < 1024) return;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
  };

  const handleProfile = () => {
    setIsOpen(false);
    const dashboardRoute = getDashboardRoute();
    navigate(dashboardRoute);
  };

  // Get full name or fallback to 'User'
  const getDisplayName = () => {
    if (!user?.fullName) return 'User';
    return user.fullName;
  };

  return (
    <div 
      className="relative" 
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* User Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 xl:px-6 py-1.5 xl:py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg hover:from-orange-500 hover:to-orange-600 transition-all duration-200 text-sm xl:text-base font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5"
      >
        <User className="w-4 h-4" />
        <span className="max-w-[120px] truncate">
          {getDisplayName()}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-[10000]"
          onMouseEnter={handleDropdownEnter}
          onMouseLeave={handleDropdownLeave}
        >
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-amber-50">
            <p className="font-semibold text-gray-800 truncate text-sm">
              {getDisplayName()}
            </p>
            <p className="text-xs text-gray-500 capitalize mt-0.5">
              {userType || 'User'}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {/* My Account Button */}
            <button
              onClick={handleProfile}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 hover:text-orange-600 transition-all duration-150 font-medium"
            >
              <User className="w-4 h-4" />
              <span>My Account</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-600 transition-all duration-150 font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;