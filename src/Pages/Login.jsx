import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../Contexts/AuthContext';

const Login = ({ onNavigateToRegister, onLoginSuccess }) => {
  const [userType, setUserType] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const errorRef = useRef(null);
  const topRef = useRef(null);

  const userTypes = [
    { id: 'student', label: 'Student', description: 'For individual learners' },
    { id: 'colleges', label: 'Colleges', description: 'Educational institutions' },
    { id: 'startup', label: 'Startup', description: 'Growing businesses' },
    { id: 'organization', label: 'Organization', description: 'Established companies' }
  ];

  useEffect(() => {
    document.title = 'Login - Xplore | Access Your Account';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Login to your Xplore account as a Student, College, Startup, or Organization. Access your dashboard and connect with opportunities.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Login to your Xplore account as a Student, College, Startup, or Organization. Access your dashboard and connect with opportunities.';
      document.head.appendChild(meta);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Login - Xplore",
      "description": "Login to your Xplore account",
      "url": window.location.href,
      "mainEntity": {
        "@type": "WebApplication",
        "name": "Xplore Login",
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

  useEffect(() => {
    if (error || success) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      if (topRef.current) {
        topRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }

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
    setError('');
  };

  const validateForm = () => {
    const { email, password } = formData;
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) return;

  // 🔒 Check if non-student module is selected
  if (userType !== 'student') {
    const dashboardMessages = {
      colleges: '🎓 Your College dashboard is not ready yet. Please check back soon or contact support for more information.',
      startup: '🚀 Your Startup dashboard is not ready yet. Please check back soon or contact support for more information.',
      organization: '🏢 Your Organization dashboard is not ready yet. Please check back soon or contact support for more information.'
    };
    
    setError(dashboardMessages[userType] || 'This dashboard type is not available yet.');
    return;
  }
  
  setIsLoading(true);
  setError('');
  setSuccess('');
  
  try {
    console.log('🔐 Attempting login for:', formData.email);

    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      })
    });

    const data = await response.json();
    console.log('📨 Login response:', data);

    if (response.ok && data.success) {
      setSuccess('Login successful! Redirecting to dashboard...');
      
      // ✅ USE AUTH CONTEXT LOGIN (CHANGED THIS PART)
      await login(data.student, data.token, userType);
      
      console.log('✅ Login successful:', data.student);
      console.log('📦 User Type:', userType);

      setFormData({
        email: '',
        password: ''
      });

      setTimeout(() => {
        if (onLoginSuccess) {
          onLoginSuccess(data.student, userType);
        } else {
          window.location.href = `/studentdashboard/your-name`;
        }
      }, 2000);

    } else {
      console.error('❌ Login failed:', data.message);
      setError(data.message || 'Login failed. Please check your credentials and try again.');
    }
    
  } catch (error) {
    console.error('❌ Login error:', error);
    setError('Unable to connect to server. Please check your internet connection and try again.');
  } finally {
    setIsLoading(false);
  }
};

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setError('Google authentication is not yet implemented. Please use email/password login.');
    } catch (error) {
      setError('Google authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setError('Password reset functionality will be implemented soon. Please contact support for assistance.');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div ref={topRef} className="min-h-screen bg-gray-50 flex items-center justify-center p-2 sm:p-4">
      <div className="max-w-6xl w-full bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-700 ease-out animate-fadeIn">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-center transform transition-all duration-500 ease-out">
            <div className="mb-6 sm:mb-8 transform transition-all duration-700 delay-100 animate-slideInLeft">
              <img
                src="/src/assets/Logo.png"
                alt="Xplore Logo - Login to Your Account"
                className="w-20 sm:w-24 h-auto object-contain"
                loading="eager"
                width="96"
                height="auto"
              />
            </div>

            <div className="mb-6 sm:mb-8 transform transition-all duration-700 delay-200 animate-slideInLeft">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-400 mb-2 leading-tight" style={{ fontFamily: "Domine, serif" }}>
                Welcome! to xplore..
              </h1>
              <p className="text-gray-600 text-base sm:text-lg">
                Please Log in yourself here
              </p>
            </div>

            {error && (
              <div ref={errorRef} className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3 animate-slideInLeft">
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

            <div className="mb-6 transform transition-all duration-700 delay-300 animate-slideInLeft" role="radiogroup" aria-labelledby="user-type-label">
              <label id="user-type-label" className="sr-only">Select your account type</label>
              <div className="grid grid-cols-2 lg:flex lg:flex-wrap gap-2 bg-gray-100 p-1 rounded-full">
                {userTypes.map((type, index) => (
                  <button
                    key={type.id}
                    type="button"
                    role="radio"
                    aria-checked={userType === type.id}
                    aria-describedby={`${type.id}-description`}
                    onClick={() => setUserType(type.id)}
                    disabled={isLoading}
                    className={`lg:flex-1 lg:min-w-0 px-3 sm:px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                      userType === type.id
                        ? 'bg-orange-400 text-white shadow-md scale-105'
                        : 'text-gray-600 hover:text-orange-400 hover:bg-white'
                    }`}
                    style={{ 
                      animationDelay: `${400 + index * 100}ms`
                    }}
                  >
                    {type.label}
                    <span id={`${type.id}-description`} className="sr-only">{type.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 transform transition-all duration-700 delay-500 animate-slideInLeft">
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
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    aria-describedby="password-error"
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
                <div className="text-right mt-2">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-orange-400 hover:text-orange-500 text-xs sm:text-sm font-medium transition-all duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    Forgot Password ?
                  </button>
                </div>
              </div>

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
                    Logging in...
                  </>
                ) : (
                  'Log in'
                )}
              </button>

              <div className="flex items-center my-4 sm:my-6">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-4 text-gray-500 bg-white text-sm">or</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

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

              <div className="text-center mt-4 sm:mt-6 transform transition-all duration-700 delay-700">
                <span className="text-gray-600 text-sm sm:text-base">
                  Don't Have an Account ? 
                </span>
                <button
                  type="button"
                  onClick={onNavigateToRegister}
                  disabled={isLoading}
                  className="text-orange-400 hover:text-orange-500 font-medium transition-all duration-300 hover:underline ml-1 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 rounded text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Register here
                </button>
              </div>
            </form>
          </div>

          <div className="flex-1 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center p-4 sm:p-8 lg:p-12 transform transition-all duration-700 delay-300 animate-slideInRight relative overflow-hidden">
            <div className="max-w-md w-full relative z-10">
              <div className="relative mb-4">
                <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl transform hover:scale-105 transition-all duration-500 hover:rotate-1">
                  <img
                    src="/src/assets/Login&Registerpage/Login.png"
                    alt="Xplore Login Process - Visual representation of user authentication"
                    className="w-full h-auto object-contain rounded-lg max-h-60 sm:max-h-80"
                    loading="lazy"
                    width="320"
                    height="320"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  
                  <div className="w-full h-60 sm:h-80 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center relative overflow-hidden" style={{display: 'none'}} role="img" aria-label="Login illustration">
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                      <div className="w-24 sm:w-32 h-24 sm:h-32 bg-orange-300 rounded-full opacity-50 animate-pulse"></div>
                    </div>
                    
                    <div className="relative z-10 flex items-center justify-center space-x-4">
                      <div className="w-12 sm:w-16 h-16 sm:h-24 bg-gray-800 rounded-lg shadow-lg transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                        <div className="w-full h-4 sm:h-6 bg-orange-400 rounded-t-lg flex items-center justify-center">
                          <div className="w-6 sm:w-8 h-0.5 sm:h-1 bg-white rounded-full"></div>
                        </div>
                        <div className="p-1 sm:p-2 space-y-1">
                          <div className="w-full h-1.5 sm:h-2 bg-gray-600 rounded"></div>
                          <div className="w-3/4 h-1.5 sm:h-2 bg-gray-600 rounded"></div>
                          <div className="w-1/2 h-1.5 sm:h-2 bg-gray-600 rounded"></div>
                        </div>
                      </div>
                      
                      <div className="w-20 sm:w-24 h-12 sm:h-16 bg-gray-800 rounded-lg shadow-lg transform rotate-6 hover:rotate-0 transition-transform duration-300">
                        <div className="w-full h-8 sm:h-12 bg-white rounded-t-lg p-1 sm:p-2">
                          <div className="w-full h-1.5 sm:h-2 bg-orange-400 rounded mb-1"></div>
                          <div className="space-y-1">
                            <div className="w-full h-0.5 sm:h-1 bg-gray-300 rounded"></div>
                            <div className="w-3/4 h-0.5 sm:h-1 bg-gray-300 rounded"></div>
                          </div>
                        </div>
                        <div className="w-full h-4 bg-gray-700 rounded-b-lg"></div>
                      </div>
                    </div>
                    
                    <div className="absolute top-4 right-4 w-3 sm:w-4 h-3 sm:h-4 bg-white rounded-full opacity-70 animate-ping"></div>
                    <div className="absolute bottom-4 left-4 w-2 h-2 bg-white rounded-full opacity-50 animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 w-6 sm:w-8 h-6 sm:h-8 bg-orange-400 rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute -bottom-2 -left-2 w-4 sm:w-6 h-4 sm:h-6 bg-white rounded-full opacity-80 animate-pulse"></div>
              
              <div className="absolute top-6 sm:top-8 right-6 sm:right-8 transform rotate-12 hover:rotate-0 transition-transform duration-300">
                <div className="w-8 sm:w-10 h-8 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs font-bold">JS</span>
                </div>
              </div>
              
              <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                <div className="w-8 sm:w-10 h-8 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
              </div>
            </div>
            
            <div className="absolute top-6 sm:top-8 left-6 sm:left-8 w-16 sm:w-20 h-16 sm:h-20 bg-white rounded-full opacity-20 animate-bounce"></div>
            <div className="absolute bottom-8 sm:bottom-12 right-8 sm:right-12 w-12 sm:w-16 h-12 sm:h-16 bg-orange-300 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute top-1/2 left-2 sm:left-4 w-8 sm:w-12 h-8 sm:h-12 bg-yellow-300 rounded-full opacity-25 animate-ping"></div>
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

        @keyframes slideInDown {
          from { 
            opacity: 0; 
            transform: translateY(-30px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
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

        .animate-slideInDown {
          animation: slideInDown 0.5s ease-out forwards;
        }

        .focus\\:ring-2:focus {
          box-shadow: 0 0 0 2px rgba(251, 146, 60, 0.5);
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fadeIn,
          .animate-slideInLeft,
          .animate-slideInRight,
          .animate-slideInDown,
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
          .animate-slideInRight,
          .animate-slideInDown {
            background: white !important;
            box-shadow: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;