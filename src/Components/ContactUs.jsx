// ContactUs.jsx - Contact Us Page Component (FIXED)
import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000';

const ContactUs = () => {
  const navigate = useNavigate();
  const successMessageRef = useRef(null);
  const errorMessageRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Smooth scroll to top FIRST, then show success message
  useEffect(() => {
    if (success) {
      // First scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Wait for scroll to complete, then show the message with animation
      // Reduced delay for faster appearance after scroll
      setTimeout(() => {
        if (successMessageRef.current) {
          successMessageRef.current.style.display = 'flex';
        }
      }, 500);
    }
  }, [success]);

  // Smooth scroll to top FIRST, then show error message
  useEffect(() => {
    if (error) {
      // First scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Wait for scroll to complete, then show the message with animation
      setTimeout(() => {
        if (errorMessageRef.current) {
          errorMessageRef.current.style.display = 'flex';
        }
      }, 500);
    }
  }, [error]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
    // Clear success message when user starts typing again
    if (success) {
      setSuccess(false);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.subject.trim()) {
      setError('Please enter a subject');
      return false;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setError('Please enter a message (at least 10 characters)');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!validateForm()) return;

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Clear the form after successful submission
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // ✓ REMOVED: Auto-redirect to dashboard
        // User stays on the contact page after successful submission
        
      } else {
        setError(result.message || 'Failed to send message');
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'support@yourcompany.com',
      link: 'mailto:support@yourcompany.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 1234567890',
      link: 'tel:+911234567890'
    },
    {
      icon: MapPin,
      title: 'Address',
      value: 'Mumbai, Maharashtra, India',
      link: null
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFF2E9] p-4 md:p-6 pt-30 lg:pt-20 pb-12">
      <style>{`
        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-30px) scale(0.95);
          }
          50% {
            opacity: 0.5;
            transform: translateY(-10px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-slide-down {
          animation: slideDown 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-[#ED9455] mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Contact Us</h1>
          <p className="text-gray-600 mt-2">Have a question? We'd love to hear from you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#ED9455] to-[#A7561C] rounded-xl flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 mb-1">{info.title}</h3>
                    {info.link ? (
                      <a 
                        href={info.link} 
                        className="text-gray-600 hover:text-[#ED9455] transition-colors break-all"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-600">{info.value}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Quick Info */}
            <div className="bg-gradient-to-br from-[#ED9455] to-[#A7561C] rounded-2xl p-6 shadow-lg text-white">
              <h3 className="font-bold text-xl mb-3">Need Immediate Help?</h3>
              <p className="text-sm opacity-90 mb-4">
                Our support team typically responds within 24 hours on business days.
              </p>
              <div className="text-sm">
                <p className="font-medium">Business Hours:</p>
                <p className="opacity-90">Monday - Friday: 9 AM - 6 PM IST</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>

              {success && (
                <div 
                  ref={successMessageRef}
                  style={{ display: 'none' }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3 animate-slide-down"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800">Message sent successfully!</p>
                    <p className="text-sm text-green-600">We'll get back to you soon.</p>
                  </div>
                </div>
              )}

              {error && (
                <div 
                  ref={errorMessageRef}
                  style={{ display: 'none' }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-slide-down"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-800">Error</p>
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Your full name"
                      disabled={loading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#ED9455] focus:ring-2 focus:ring-[#ED9455] focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      disabled={loading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#ED9455] focus:ring-2 focus:ring-[#ED9455] focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    placeholder="What is this about?"
                    disabled={loading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#ED9455] focus:ring-2 focus:ring-[#ED9455] focus:outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Tell us more about your inquiry..."
                    rows="6"
                    disabled={loading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-[#ED9455] focus:ring-2 focus:ring-[#ED9455] focus:outline-none transition-all resize-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Minimum 10 characters ({formData.message.length}/10)
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#ED9455] to-[#A7561C] text-white py-4 rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              {success && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => navigate(-1)}
                    className="text-[#ED9455] hover:text-[#A7561C] font-medium transition-colors"
                  >
                    ← Go back to previous page
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;