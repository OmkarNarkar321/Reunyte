import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const Studentform = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [registrationData, setRegistrationData] = useState(null);
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Personal Information State
  const [personalInfo, setPersonalInfo] = useState({
    address: '',
    gender: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    mobileNo: '',
    emailId: ''
  });

  // Education State
  const [education, setEducation] = useState({
    courseName: '',
    college: '',
    from: '',
    to: ''
  });

  // Courses and Certifications State
  const [courseCert, setCourseCert] = useState({
    title: '',
    specifications: '',
    description: ''
  });

  // Training and Internships State
  const [training, setTraining] = useState({
    title: '',
    company: '',
    from: '',
    to: '',
    description: ''
  });

  useEffect(() => {
    // Get registration data from sessionStorage or location state
    let data = null;
    
    if (location.state?.userData) {
      data = location.state.userData;
    } else {
      const storedData = sessionStorage.getItem('registrationData');
      if (storedData) {
        data = JSON.parse(storedData);
      }
    }

    if (data) {
      setRegistrationData(data);
      setPersonalInfo(prev => ({
        ...prev,
        emailId: data.email || ''
      }));
    } else {
      // If no registration data, redirect back to register
      alert('Please complete the registration form first');
      navigate('/register');
    }
  }, [location, navigate]);

  // Personal Information Handlers
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Education Handlers
  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setEducation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Skills Handlers
  const handleAddSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  // Courses and Certifications Handlers
  const handleCourseCertChange = (e) => {
    const { name, value } = e.target;
    setCourseCert(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Training and Internships Handlers
  const handleTrainingChange = (e) => {
    const { name, value } = e.target;
    setTraining(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate all required fields
  const validateForm = () => {
    if (!personalInfo.address || !personalInfo.gender || !personalInfo.mobileNo) {
      alert('Please fill in all required personal information fields');
      return false;
    }

    if (!personalInfo.birthDay || !personalInfo.birthMonth || !personalInfo.birthYear) {
      alert('Please select your complete birth date');
      return false;
    }

    if (!education.courseName || !education.college) {
      alert('Please fill in education details');
      return false;
    }

    if (skills.length === 0) {
      alert('Please add at least one skill');
      return false;
    }

    return true;
  };

  // Final Submit - Simplified without duplicate email handling
  const handleFinalSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Format date properly
      const formattedDate = personalInfo.birthYear && personalInfo.birthMonth && personalInfo.birthDay
        ? `${personalInfo.birthYear}-${personalInfo.birthMonth.padStart(2, '0')}-${personalInfo.birthDay.padStart(2, '0')}`
        : '';

      // Match backend expected structure (flat, not nested objects)
      const completeStudentData = {
        // From registration form
        email: registrationData.email,
        password: registrationData.password,
        fullName: registrationData.fullName,

        // Personal Information (flat structure)
        address: personalInfo.address,
        gender: personalInfo.gender,
        dateOfBirth: formattedDate,
        mobileNo: personalInfo.mobileNo,

        // Education (flat with prefixed names)
        courseName: education.courseName,
        college: education.college,
        educationFrom: education.from || '',
        educationTo: education.to || '',

        // Skills array
        skills: skills,

        // Courses and Certifications (flat with prefixed names) - only if filled
        certificationTitle: courseCert.title || '',
        certificationSpecs: courseCert.specifications || '',
        certificationDesc: courseCert.description || '',

        // Training and Internships (flat with prefixed names) - only if filled
        trainingTitle: training.title || '',
        trainingCompany: training.company || '',
        trainingFrom: training.from || '',
        trainingTo: training.to || '',
        trainingDesc: training.description || ''
      };

      console.log('📤 Sending data to API:', completeStudentData);

      const response = await axios.post(`${API_URL}/register`, completeStudentData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('✅ API Response:', response.data);

      if (response.data.success) {
        // Clear sessionStorage
        sessionStorage.removeItem('registrationData');
        
        // Store token if provided
        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('userType', 'student');
          localStorage.setItem('studentData', JSON.stringify(response.data.student));
        }

        // Show success message
        alert('✅ Registration Successful! Welcome to Xplore!');
        
        // Redirect to login page
        navigate('/login');
      }

    } catch (error) {
      console.error('❌ Registration error:', error);
      
      // Simplified error handling
      if (error.response) {
        const errorMessage = error.response.data?.message || 'Registration failed';
        alert(`❌ ${errorMessage}`);
      } else if (error.request) {
        alert('❌ Cannot connect to server. Please check if the backend is running on http://localhost:5000');
      } else {
        alert(`❌ Error: ${error.message}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: '#FFFDFB' }}>
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-orange-400 mb-2">Complete Your Student Profile</h1>
          <p className="text-gray-600">Please fill in all the details below to complete your registration</p>
        </div>

        {/* Personal Information Section */}
        <div className="bg-white rounded-lg shadow-md p-6 relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
            <span className="text-red-500 text-sm">* Required</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Address: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={personalInfo.address}
                onChange={handlePersonalInfoChange}
                placeholder="Enter your address"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Gender: <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <select
                    name="gender"
                    value={personalInfo.gender}
                    onChange={handlePersonalInfoChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 appearance-none bg-white pr-10 transition-all duration-300 hover:border-orange-300 hover:shadow-md cursor-pointer"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none transition-transform duration-300 group-hover:scale-110">
                    <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Birth Date: <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <input
                    type="date"
                    name="birthDate"
                    value={`${personalInfo.birthYear}-${personalInfo.birthMonth}-${personalInfo.birthDay}`}
                    onChange={(e) => {
                      const date = e.target.value.split('-');
                      setPersonalInfo(prev => ({
                        ...prev,
                        birthYear: date[0] || '',
                        birthMonth: date[1] || '',
                        birthDay: date[2] || ''
                      }));
                    }}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white pr-10 transition-all duration-300 hover:border-orange-300 hover:shadow-md cursor-pointer"
                    style={{ colorScheme: 'light' }}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none transition-transform duration-300 group-hover:scale-110">
                    <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Mobile no: <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="mobileNo"
                value={personalInfo.mobileNo}
                onChange={handlePersonalInfoChange}
                placeholder="+91 1234567890"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Email id:</label>
              <input
                type="email"
                name="emailId"
                value={personalInfo.emailId}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-white rounded-lg shadow-md p-6 relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Education</h2>
            <span className="text-red-500 text-sm">* Required</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Course name: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="courseName"
                value={education.courseName}
                onChange={handleEducationChange}
                placeholder="e.g., B.Tech Computer Science"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                College: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="college"
                value={education.college}
                onChange={handleEducationChange}
                placeholder="Your college/university name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">From:</label>
                <div className="relative group">
                  <select
                    name="from"
                    value={education.from}
                    onChange={handleEducationChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 appearance-none bg-white pr-10 transition-all duration-300 hover:border-orange-300 hover:shadow-md cursor-pointer"
                  >
                    <option value="">Select Year</option>
                    {Array.from({ length: 50 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return <option key={year} value={year}>{year}</option>;
                    })}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none transition-transform duration-300 group-hover:scale-110">
                    <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">To:</label>
                <div className="relative group">
                  <select
                    name="to"
                    value={education.to}
                    onChange={handleEducationChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 appearance-none bg-white pr-10 transition-all duration-300 hover:border-orange-300 hover:shadow-md cursor-pointer"
                  >
                    <option value="">Select Year</option>
                    {Array.from({ length: 50 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return <option key={year} value={year}>{year}</option>;
                    })}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none transition-transform duration-300 group-hover:scale-110">
                    <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-lg shadow-md p-6 relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
            <span className="text-red-500 text-sm">* Add at least one skill</span>
          </div>

          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a skill and press Enter (e.g., React, Python, UI Design)"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Add Skill
              </button>
            </div>

            <div className="flex flex-wrap gap-2 min-h-[50px] p-4 bg-gray-50 rounded-md border border-gray-200">
              {skills.length === 0 ? (
                <p className="text-gray-400 text-sm">No skills added yet. Add your skills above.</p>
              ) : (
                skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-gray-900 rounded-full text-sm font-semibold"
                  >
                    {skill}
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:text-gray-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Courses and Certifications Section - Optional */}
        <div className="bg-white rounded-lg shadow-md p-6 relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Courses and Certifications</h2>
            <span className="text-gray-500 text-sm">Optional</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Title:</label>
              <input
                type="text"
                name="title"
                value={courseCert.title}
                onChange={handleCourseCertChange}
                placeholder="Course/Certification title"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Specifications:</label>
              <input
                type="text"
                name="specifications"
                value={courseCert.specifications}
                onChange={handleCourseCertChange}
                placeholder="Platform or issuing authority"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Description:</label>
              <textarea
                name="description"
                value={courseCert.description}
                onChange={handleCourseCertChange}
                placeholder="Brief description of what you learned"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
              />
            </div>
          </div>
        </div>

        {/* Training and Internships Section - Optional */}
        <div className="bg-white rounded-lg shadow-md p-6 relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Training and Internships</h2>
            <span className="text-gray-500 text-sm">Optional</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Title:</label>
              <input
                type="text"
                name="title"
                value={training.title}
                onChange={handleTrainingChange}
                placeholder="Internship/Training title"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Company:</label>
              <input
                type="text"
                name="company"
                value={training.company}
                onChange={handleTrainingChange}
                placeholder="Company name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">From:</label>
                <div className="relative group">
                  <select
                    name="from"
                    value={training.from}
                    onChange={handleTrainingChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 appearance-none bg-white pr-10 transition-all duration-300 hover:border-orange-300 hover:shadow-md cursor-pointer"
                  >
                    <option value="">Select Year</option>
                    {Array.from({ length: 50 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return <option key={year} value={year}>{year}</option>;
                    })}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none transition-transform duration-300 group-hover:scale-110">
                    <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-2">To:</label>
                <div className="relative group">
                  <select
                    name="to"
                    value={training.to}
                    onChange={handleTrainingChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 appearance-none bg-white pr-10 transition-all duration-300 hover:border-orange-300 hover:shadow-md cursor-pointer"
                  >
                    <option value="">Select Year</option>
                    {Array.from({ length: 50 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return <option key={year} value={year}>{year}</option>;
                    })}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none transition-transform duration-300 group-hover:scale-110">
                    <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Description:</label>
              <textarea
                name="description"
                value={training.description}
                onChange={handleTrainingChange}
                placeholder="Describe your responsibilities and learnings"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"
              />
            </div>
          </div>
        </div>

        {/* Final Submit Button */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <button
            onClick={handleFinalSubmit}
            disabled={isSubmitting}
            className="w-full bg-orange-400 text-white py-4 rounded-md font-semibold text-lg hover:bg-orange-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </span>
            ) : (
              'Complete Registration'
            )}
          </button>
          <p className="text-center text-sm text-gray-500 mt-3">
            By completing registration, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>

      </div>
    </div>
  );
};

export default Studentform;