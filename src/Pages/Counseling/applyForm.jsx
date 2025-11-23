import React, { useState } from "react";
import { ArrowLeft } from "lucide-react"; 
import { useNavigate } from "react-router-dom";

const CounselingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: "", email: "", counselingPoints: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
    if (successMessage) setSuccessMessage("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email";
    if (!formData.counselingPoints.trim()) newErrors.counselingPoints = "Please mention your counseling points";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setErrors({});
      
      try {
        // Make API call to backend
        const response = await fetch('http://localhost:5000/api/counseling/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          console.log("Form submitted successfully:", data);
          setSuccessMessage(data.message);
          
          // Scroll to top smoothly
          window.scrollTo({ top: 0, behavior: 'smooth' });
          
          // Clear form
          setFormData({ fullName: "", email: "", counselingPoints: "" });
          
        } else {
          // Handle error from backend
          setErrors({ 
            submit: data.message || "Failed to submit form. Please try again." 
          });
          // Scroll to top to show error
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setErrors({ 
          submit: "Network error. Please check your connection and try again." 
        });
        // Scroll to top to show error
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
      // Scroll to top to show validation errors
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-['Public_Sans']">
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
      <div className="bg-orange-100 w-full max-w-md rounded-2xl shadow-md p-6 md:p-8">
        <div className="mb-6">
          <button 
            type="button" 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition mb-4" 
            aria-label="Go back"
            disabled={isSubmitting}
          >
            <ArrowLeft size={30} />
          </button>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Tell us about you!</h2>
            <p className="text-sm text-gray-600 mt-1">Please fill the below information properly</p>
          </div>
        </div>

        <hr className="border-t border-gray-300 mb-6" />

        {/* Success Message with smooth animation */}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg animate-fadeIn">
            <p className="font-semibold">✅ {successMessage}</p>
          </div>
        )}

        {/* Error Message with smooth animation */}
        {errors.submit && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg animate-fadeIn">
            <p className="font-semibold">❌ {errors.submit}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">Full name :</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none"
              aria-invalid={errors.fullName ? "true" : "false"}
              disabled={isSubmitting}
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email id :</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none"
              aria-invalid={errors.email ? "true" : "false"}
              disabled={isSubmitting}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="counselingPoints" className="block text-gray-700 font-medium mb-2">Add the points:</label>
            <textarea
              id="counselingPoints"
              name="counselingPoints"
              rows="5"
              value={formData.counselingPoints}
              onChange={handleChange}
              placeholder="Mention the points about which you need counseling"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none resize-none"
              aria-invalid={errors.counselingPoints ? "true" : "false"}
              disabled={isSubmitting}
            />
            <p className="text-xs text-gray-500 mt-1">(Mention the points about which you need counseling)</p>
            {errors.counselingPoints && <p className="text-red-500 text-sm mt-1">{errors.counselingPoints}</p>}
          </div>

          <div className="flex justify-between mt-6">
            <button 
              type="button" 
              onClick={() => navigate(-1)} 
              className="border-2 border-orange-400 text-orange-500 font-semibold py-2 px-6 rounded-md hover:bg-orange-50 transition-all"
              disabled={isSubmitting}
            >
              Back
            </button>
            <button 
              type="submit" 
              className="bg-orange-400 text-white font-semibold py-2 px-6 rounded-md hover:bg-orange-500 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CounselingForm;