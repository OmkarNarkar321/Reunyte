import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Register = ({ onNavigateToLogin, onNavigateToForm }) => {
  const navigate = useNavigate();
  const errorRef = useRef(null);
  const topRef = useRef(null);
  const [userType, setUserType] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  });

  // ============================================
  // 🔒 MODULE LOCK CONFIGURATION
  // ============================================
  // To UNLOCK a module, change its value from 'true' to 'false'
  // Example: To unlock colleges, change colleges: true → colleges: false
  
  const LOCKED_MODULES = {
    student: false,        // ✅ UNLOCKED - Working
    colleges: true,        // 🔒 LOCKED - To unlock, set to false
    startup: true,         // 🔒 LOCKED - To unlock, set to false
    organization: true     // 🔒 LOCKED - To unlock, set to false
  };

  // Custom messages for locked modules (optional - you can customize these)
  const LOCKED_MESSAGES = {
    colleges: 'College registration is currently unavailable. This feature will be available soon!',
    startup: 'Startup registration is currently unavailable. This feature will be available soon!',
    organization: 'Organization registration is currently unavailable. This feature will be available soon!'
  };
  // ============================================

  const userTypes = [
    { id: 'student', label: 'Student', description: 'For individual learners' },
    { id: 'colleges', label: 'Colleges', description: 'Educational institutions' },
    { id: 'startup', label: 'Startup', description: 'Growing businesses' },
    { id: 'organization', label: 'Organization', description: 'Established companies' }
  ];

  // Check if current selected user type is locked
  const isCurrentModuleLocked = () => {
    return LOCKED_MODULES[userType] === true;
  };

  // Add meta tags for SEO
  useEffect(() => {
    document.title = 'Register - Xplore | Create Your Account';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Create your Xplore account as a Student, College, Startup, or Organization. Join our platform to explore opportunities and connect with the community.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Create your Xplore account as a Student, College, Startup, or Organization. Join our platform to explore opportunities and connect with the community.';
      document.head.appendChild(meta);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Register - Xplore",
      "description": "Create your Xplore account",
      "url": window.location.href,
      "mainEntity": {
        "@type": "WebApplication",
        "name": "Xplore Registration",
        "applicationCategory": "EducationalApplication"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  // Auto-scroll to top when error appears - FIXED VERSION
  useEffect(() => {
    if (error) {
      // First, scroll window to absolute top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Small delay to ensure smooth scrolling completes, then focus on error
      setTimeout(() => {
        if (errorRef.current) {
          errorRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
          });
        }
      }, 300);
    }
  }, [error]);

  // Clear error/success messages after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    setError('');
  };

  const validateForm = () => {
    const { email, password, fullName, confirmPassword } = formData;
    
    if (!email || !password || !fullName || !confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return false;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  // Check if email already exists with better error handling
  const checkEmailExists = async (email) => {
    try {
      console.log('🔍 Checking if email exists:', email);
      
      const response = await fetch('http://localhost:5000/api/auth/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      console.log('📧 Email check response:', data);
      
      if (response.ok && data.success) {
        return data.exists;
      } else {
        console.error('❌ Error checking email:', data.message);
        throw new Error(data.message || 'Failed to check email availability');
      }
    } catch (error) {
      console.error('❌ Network error checking email:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ============================================
    // 🔒 CHECK IF MODULE IS LOCKED
    // ============================================
    if (isCurrentModuleLocked()) {
      const lockedMessage = LOCKED_MESSAGES[userType] || 
        `${userTypes.find(t => t.id === userType)?.label} registration is currently unavailable. This feature will be available soon!`;
      setError(lockedMessage);
      return; // Stop registration process
    }
    // ============================================
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Check if email already exists BEFORE proceeding
      console.log('🔍 Checking if email exists:', formData.email);
      const emailExists = await checkEmailExists(formData.email);
      
      if (emailExists) {
        setError('This email is already registered. Please use a different email address or try logging in.');
        setIsLoading(false);
        return;
      }

      // Email is available, show success message
      console.log('✅ Email is available! Proceeding to form...');
      setSuccess('Email is available! Redirecting to complete your profile...');
      
      // Store registration data in sessionStorage for StudentForm to access
      const registrationData = {
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        userType: userType
      };
      
      sessionStorage.setItem('registrationData', JSON.stringify(registrationData));
      
      // Wait a moment to show success message
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to respective form based on userType
      if (onNavigateToForm) {
        onNavigateToForm(userType, formData);
      } else {
        // Fallback navigation if onNavigateToForm is not provided
        if (userType === 'student') {
          navigate('/student-form', { state: { userData: registrationData } });
        } else if (userType === 'colleges') {
          navigate('/college-form', { state: { userData: registrationData } });
        } else if (userType === 'startup') {
          navigate('/startup-form', { state: { userData: registrationData } });
        } else if (userType === 'organization') {
          navigate('/organization-form', { state: { userData: registrationData } });
        }
      }
      
    } catch (error) {
      console.error('❌ Registration error:', error);
      
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        setError('Cannot connect to server. Please check if the backend is running on http://localhost:5000 and try again.');
      } else {
        setError(error.message || 'Unable to verify email. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    // ============================================
    // 🔒 CHECK IF MODULE IS LOCKED FOR GOOGLE AUTH
    // ============================================
    if (isCurrentModuleLocked()) {
      const lockedMessage = LOCKED_MESSAGES[userType] || 
        `${userTypes.find(t => t.id === userType)?.label} registration is currently unavailable. This feature will be available soon!`;
      setError(lockedMessage);
      return; // Stop Google auth process
    }
    // ============================================
    
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setError('Google authentication is not yet implemented. Please use email/password registration.');
    } catch (error) {
      setError('Google authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const getRegisterButtonText = () => {
    const typeLabels = {
      'student': 'Student',
      'colleges': 'College',
      'startup': 'Startup',
      'organization': 'Organization'
    };
    return `Register as ${typeLabels[userType]}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-2 sm:p-4 pt-20 sm:pt-4">
      <div className="max-w-6xl w-full bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-700 ease-out animate-fadeIn">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Side - Form */}
          <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center transform transition-all duration-500 ease-out">
            {/* Logo */}
            <div className="mb-6 sm:mb-8 transform transition-all duration-700 delay-100 animate-slideInLeft">
              <img
                src="/src/assets/Logo.png"
                alt="Xplore Logo - Registration Platform"
                className="w-20 sm:w-24 h-auto object-contain"
                loading="eager"
                width="96"
                height="auto"
              />
            </div>

            {/* Header */}
            <div className="mb-6 sm:mb-8 transform transition-all duration-700 delay-200 animate-slideInLeft">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-400 mb-2 leading-tight" style={{ fontFamily: "Domine, serif" }}>
                Welcome! to xplore..
              </h1>
              <p className="text-gray-600 text-base sm:text-lg">
                Please register yourself here
              </p>
            </div>

            {/* Error/Success Messages */}
            {error && (
              <div 
                ref={errorRef}
                className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3 animate-slideInLeft"
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-red-800 text-sm font-medium">Error</p>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg flex items-start gap-3 animate-slideInLeft">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-green-800 text-sm font-medium">Success</p>
                  <p className="text-green-700 text-sm">{success}</p>
                </div>
              </div>
            )}

            {/* User Type Selection */}
            <div className="mb-6 transform transition-all duration-700 delay-300 animate-slideInLeft" role="radiogroup" aria-labelledby="user-type-label">
              <label id="user-type-label" className="sr-only">Select your account type</label>
              <div className="grid grid-cols-2 lg:flex lg:flex-wrap gap-2 bg-gray-100 p-1 rounded-full">
                {userTypes.map((type, index) => {
                  const isLocked = LOCKED_MODULES[type.id];
                  return (
                    <button
                      key={type.id}
                      type="button"
                      role="radio"
                      aria-checked={userType === type.id}
                      aria-describedby={`${type.id}-description`}
                      onClick={() => setUserType(type.id)}
                      disabled={isLoading}
                      className={`lg:flex-1 lg:min-w-0 px-3 sm:px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative ${
                        userType === type.id
                          ? 'bg-orange-400 text-white shadow-md scale-105'
                          : 'text-gray-600 hover:text-orange-400 hover:bg-white'
                      }`}
                      style={{ 
                        animationDelay: `${400 + index * 100}ms`
                      }}
                    >
                      <span className="flex items-center justify-center gap-1.5">
                        <span>{type.label}</span>
                        {isLocked && (
                          <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" aria-label="Locked" />
                        )}
                      </span>
                      <span id={`${type.id}-description`} className="sr-only">{type.description}</span>
                    </button>
                  );
                })}
              </div>
              {isCurrentModuleLocked() && (
                <div className="mt-2 text-xs text-orange-600 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>This registration type is currently unavailable</span>
                </div>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 transform transition-all duration-700 delay-500 animate-slideInLeft">
              {/* Email Field */}
              <div className="transform transition-all duration-500 hover:translate-x-1">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                  Email <span className="text-red-500" aria-label="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  aria-describedby="email-error"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all duration-300 hover:border-orange-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                />
              </div>

              {/* Full Name Field */}
              <div className="transform transition-all duration-500 hover:translate-x-1">
                <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                  Full Name <span className="text-red-500" aria-label="required">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your full name"
                  required
                  autoComplete="name"
                  aria-describedby="fullName-error"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all duration-300 hover:border-orange-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                />
              </div>

              {/* Password Field */}
              <div className="transform transition-all duration-500 hover:translate-x-1">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                  Password <span className="text-red-500" aria-label="required">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your password (min 8 characters)"
                    required
                    minLength="8"
                    autoComplete="new-password"
                    aria-describedby="password-error password-requirements"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all duration-300 hover:border-orange-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 rounded disabled:opacity-50 disabled:cursor-not-allowed p-1"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </button>
                </div>
                <div id="password-requirements" className="text-xs text-gray-500 mt-1">
                  Password must be at least 8 characters long
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="transform transition-all duration-500 hover:translate-x-1">
                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                  Confirm Password <span className="text-red-500" aria-label="required">*</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Confirm your password"
                  required
                  autoComplete="new-password"
                  aria-describedby="confirmPassword-error"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all duration-300 hover:border-orange-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                />
              </div>

              {/* Divider */}
              <div className="flex items-center my-4 sm:my-6">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-4 text-gray-500 bg-white text-sm">or</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Google Login */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={isLoading}
                aria-label="Continue with Google"
                className="w-full flex items-center justify-center gap-3 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-orange-200 transition-all duration-300 font-medium transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {isLoading ? 'Processing...' : 'Continue With Google'}
              </button>

              {/* Submit Button - Dynamic text based on userType with Lock Icon */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-400 text-white py-2.5 sm:py-3 px-4 sm:px-6 text-sm sm:text-base rounded-lg font-semibold hover:bg-orange-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Checking...
                  </>
                ) : (
                  <>
                    {isCurrentModuleLocked() && <Lock className="w-4 h-4" />}
                    {getRegisterButtonText()}
                  </>
                )}
              </button>

              {/* Switch Page Link */}
              <div className="text-center mt-4 sm:mt-6 transform transition-all duration-700 delay-700">
                <span className="text-gray-600 text-sm sm:text-base">
                  Already Have an Account ? 
                </span>
                <button
                  type="button"
                  onClick={onNavigateToLogin}
                  disabled={isLoading}
                  className="text-orange-400 hover:text-orange-500 font-medium transition-all duration-300 hover:underline ml-1 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 rounded text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>

          {/* Right Side - Illustration with Image */}
          <div className="flex-1 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center p-4 sm:p-8 lg:p-12 transform transition-all duration-700 delay-300 animate-slideInRight relative overflow-hidden">
            <div className="max-w-md w-full relative z-10">
              <div className="relative mb-4">
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl transform hover:scale-105 transition-all duration-500 hover:rotate-1">
                  <img
                    src="/src/assets/Login&Registerpage/Login.png"
                    alt="Xplore Registration Process - Visual representation of account creation"
                    className="w-full h-auto object-contain rounded-lg max-h-60 sm:max-h-80"
                    loading="lazy"
                    width="320"
                    height="320"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  
                  <div className="w-full h-60 sm:h-80 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center relative overflow-hidden" style={{display: 'none'}} role="img" aria-label="Registration illustration">
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                      <div className="w-24 sm:w-32 h-24 sm:h-32 bg-blue-300 rounded-full opacity-50 animate-pulse"></div>
                    </div>
                    
                    <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
                      <div className="w-16 sm:w-20 h-20 sm:h-28 bg-white rounded-lg shadow-lg transform rotate-6 hover:rotate-0 transition-transform duration-300 p-2">
                        <div className="w-full h-2 sm:h-3 bg-blue-400 rounded mb-2"></div>
                        <div className="space-y-1">
                          <div className="w-full h-1.5 sm:h-2 bg-gray-300 rounded"></div>
                          <div className="w-3/4 h-1.5 sm:h-2 bg-gray-300 rounded"></div>
                          <div className="w-full h-1.5 sm:h-2 bg-gray-300 rounded"></div>
                          <div className="w-2/3 h-1.5 sm:h-2 bg-gray-300 rounded"></div>
                        </div>
                        <div className="w-full h-2 sm:h-3 bg-blue-400 rounded mt-2"></div>
                      </div>
                      
                      <div className="w-12 sm:w-16 h-12 sm:h-16 bg-white rounded-full shadow-lg transform -rotate-12 hover:rotate-0 transition-transform duration-300 flex items-center justify-center">
                        <div className="w-6 sm:w-8 h-6 sm:h-8 bg-blue-400 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="absolute top-4 left-4 w-3 sm:w-4 h-3 sm:h-4 bg-white rounded-full opacity-70 animate-ping"></div>
                    <div className="absolute bottom-4 right-4 w-2 h-2 bg-white rounded-full opacity-50 animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 w-6 sm:w-8 h-6 sm:h-8 bg-blue-400 rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute -bottom-2 -left-2 w-4 sm:w-6 h-4 sm:h-6 bg-white rounded-full opacity-80 animate-pulse"></div>
              
              <div className="absolute top-6 sm:top-8 right-6 sm:right-8 transform rotate-12 hover:rotate-0 transition-transform duration-300">
                <div className="w-8 sm:w-10 h-8 sm:h-10 bg-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs font-bold">UI</span>
                </div>
              </div>
              
              <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                <div className="w-8 sm:w-10 h-8 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs font-bold">UX</span>
                </div>
              </div>
            </div>
            
            <div className="absolute top-6 sm:top-8 left-6 sm:left-8 w-16 sm:w-20 h-16 sm:h-20 bg-white rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute bottom-8 sm:bottom-12 right-8 sm:right-12 w-12 sm:w-16 h-12 sm:h-16 bg-blue-300 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute top-1/2 left-2 sm:left-4 w-8 sm:w-12 h-8 sm:h-12 bg-purple-300 rounded-full opacity-25 animate-ping"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-out forwards;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.7s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.7s ease-out forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fadeIn,
          .animate-slideInLeft,
          .animate-slideInRight,
          .animate-bounce,
          .animate-pulse,
          .animate-ping,
          .transform,
          .transition-all {
            animation: none !important;
            transition: none !important;
          }
        }

        @media (prefers-contrast: high) {
          .border-gray-300 {
            border-color: #000;
          }
          
          .text-gray-600 {
            color: #000;
          }
          
          .bg-gray-50 {
            background-color: #fff;
          }
        }

        @media print {
          .bg-gradient-to-br,
          .shadow-2xl,
          .animate-fadeIn,
          .animate-slideInLeft,
          .animate-slideInRight {
            background: white !important;
            box-shadow: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;