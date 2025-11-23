import React, { useState, useEffect } from 'react';
import { User, MapPin, Phone, Mail, Calendar, Edit2, Plus, Upload, X, Save, Check, BookOpen, LogOut, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000';

// Auth Service Hook (inline implementation)
const useAuth = () => {
  const navigate = useNavigate();
  
  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Call backend logout endpoint
      if (token) {
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
      }
      
      // Clear all auth-related data from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');
      
      // Navigate to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API call fails, clear local storage and redirect
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');
      navigate('/login');
    }
  };

  const switchAccount = () => {
    // Clear current session and redirect to login
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return { logout, switchAccount };
};

// Reusable Components
const ProfileImage = ({ profileImage, size = 'w-24 h-24', onUpload, uploading }) => {
  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('data:image') || path.startsWith('http')) return path;
    return `${API_BASE_URL}${path}`;
  };

  return (
    <div className={`${size} rounded-full bg-gradient-to-br from-[#A7561C] to-[#ED9455] p-1 flex-shrink-0 relative`}>
      <div className="w-full h-full rounded-full overflow-hidden bg-white">
        {profileImage ? (
          <img src={getImageUrl(profileImage)} alt="Profile" className="w-full h-full object-cover" 
               onError={(e) => e.target.style.display = 'none'} />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#4D83E7]">
            <User className={`${size === 'w-24 h-24' ? 'w-12 h-12' : 'w-14 h-14'} text-white`} />
          </div>
        )}
      </div>
      {onUpload && (
        <label className={`absolute bottom-0 right-0 bg-[#ED9455] p-2 rounded-full cursor-pointer hover:bg-[#A7561C] transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <Upload className="w-4 h-4 text-white" />
          <input type="file" accept="image/*" onChange={onUpload} className="hidden" disabled={uploading} />
        </label>
      )}
      {uploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full">
          <div className="text-white text-xs">Uploading...</div>
        </div>
      )}
    </div>
  );
};

const SectionHeader = ({ title, onEdit, onAdd, isEditing, onSave }) => (
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-bold text-[#ED9455] flex items-center gap-2">
      <div className="w-1 h-6 bg-[#ED9455] rounded-full"></div>
      {title}
    </h3>
    {onAdd ? (
      <button onClick={onAdd} className="flex items-center gap-2 text-[#ED9455] hover:text-[#A7561C] font-semibold text-sm">
        <Plus className="w-4 h-4" /> Add
      </button>
    ) : onEdit && (
      isEditing ? (
        <button onClick={onSave} className="flex items-center gap-2 text-[#4CAF50] hover:text-green-700 font-semibold">
          <Save className="w-5 h-5" /> Save
        </button>
      ) : (
        <button onClick={onEdit} className="text-[#ED9455] hover:text-[#A7561C]">
          <Edit2 className="w-5 h-5" />
        </button>
      )
    )}
  </div>
);

const InfoField = ({ icon, value, isEditing, onChange, type = "text", options }) => (
  <div className="flex items-center gap-3">
    {icon ? React.createElement(icon, { className: "w-5 h-5 text-gray-500 flex-shrink-0" }) : null}
    {isEditing ? (
      type === "select" ? (
        <select value={value || ''} onChange={onChange} className="flex-1 border-b border-gray-300 focus:border-[#ED9455] outline-none py-1">
          {options && options.map(opt => <option key={opt} value={opt.toLowerCase()}>{opt}</option>)}
        </select>
      ) : (
        <input type={type} value={value || ''} onChange={onChange} 
               className="flex-1 border-b border-gray-300 focus:border-[#ED9455] outline-none py-1" />
      )
    ) : (
      <span className="text-gray-700 capitalize">{value || 'N/A'}</span>
    )}
  </div>
);

const EditableEntry = ({ entry, index, type, isEditing, editData, onEdit, onSave, onCancel, onChange, onDelete, fields }) => {
  if (isEditing) {
    return (
      <div className="space-y-3">
        {fields.map((field, idx) => {
          if (field.type === 'textarea') {
            return (
              <textarea key={field.name} placeholder={field.placeholder} value={editData[field.name] || ''} 
                       onChange={(e) => onChange(field.name, e.target.value)} rows={field.rows || 3}
                       className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#ED9455] outline-none" />
            );
          } else if (field.isGrid) {
            return (
              <div key={`grid-${idx}`} className="grid grid-cols-2 gap-2">
                {field.inputs.map(input => (
                  <input key={input.name} type="text" placeholder={input.placeholder} value={editData[input.name] || ''}
                         onChange={(e) => onChange(input.name, e.target.value)}
                         className="border border-gray-300 rounded-lg px-3 py-2 focus:border-[#ED9455] outline-none" />
                ))}
              </div>
            );
          } else {
            return (
              <input key={field.name} type="text" placeholder={field.placeholder} value={editData[field.name] || ''}
                     onChange={(e) => onChange(field.name, e.target.value)}
                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-[#ED9455] outline-none" />
            );
          }
        })}
        <div className="flex gap-2">
          <button onClick={onSave} className="flex items-center gap-1 px-3 py-1 bg-[#4CAF50] text-white rounded-lg hover:bg-green-600 text-sm">
            <Check className="w-4 h-4" /> Save
          </button>
          <button onClick={onCancel} className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  const renderViewContent = () => {
    if (type === 'education') {
      return (
        <>
          <h4 className="font-bold text-gray-800">{entry.courseName || 'N/A'}</h4>
          <p className="text-gray-600 text-sm">{entry.college || 'N/A'}</p>
          <p className="text-gray-500 text-sm">{entry.from} to {entry.to}</p>
        </>
      );
    } else if (type === 'certification') {
      return (
        <>
          <h4 className="font-bold text-gray-800">{entry.title || 'N/A'}</h4>
          <p className="text-gray-600 text-sm">{entry.specifications || 'N/A'}</p>
          <p className="text-gray-500 text-sm mt-2">{entry.description || 'N/A'}</p>
        </>
      );
    } else if (type === 'training') {
      return (
        <>
          <h4 className="font-bold text-gray-800">{entry.title || 'N/A'}</h4>
          <p className="text-gray-600 text-sm">{entry.company || 'N/A'}</p>
          <p className="text-gray-500 text-sm">{entry.from} - {entry.to}</p>
          <p className="text-gray-500 text-sm mt-2">{entry.description || 'N/A'}</p>
        </>
      );
    }
  };

  return (
    <div className="flex justify-between items-start">
      <div className="flex-1">
        {renderViewContent()}
      </div>
      <div className="flex gap-2">
        <button onClick={() => onEdit(type, index)} className="text-[#ED9455] hover:text-[#A7561C]">
          <Edit2 className="w-4 h-4" />
        </button>
        <button onClick={() => onDelete(type, index)} className="text-red-500 hover:text-red-700">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children, onSave }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        {children}
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={onSave} className="flex-1 px-4 py-3 bg-[#ED9455] text-white rounded-xl font-semibold hover:bg-[#A7561C]">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const StudentDashboard = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showAddModal, setShowAddModal] = useState(null);
  const [newEntry, setNewEntry] = useState({});
  const [editingEntry, setEditingEntry] = useState({ type: null, index: null });
  const [editEntryData, setEditEntryData] = useState({});
  const { logout, switchAccount } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem('userId');
      const userEmail = localStorage.getItem('userEmail');
      
      console.log('🔍 Fetching data for:', { userId, userEmail });
      
      if (!userId && !userEmail) {
        setError('Please login first');
        navigate('/login');
        setLoading(false);
        return;
      }

      let response, result;
      
      if (userId) {
        response = await fetch(`${API_BASE_URL}/api/auth/students/${userId}`);
        result = await response.json();

        if (result.success && result.data) {
          console.log('✅ Student data loaded:', result.data);
          setStudentData(result.data);
          setEditData(result.data);
          setProfileImage(result.data.profileImage);
        } else {
          setError('Student data not found');
        }
      } else {
        response = await fetch(`${API_BASE_URL}/api/auth/students`);
        result = await response.json();

        if (result.success && result.data) {
          const currentStudent = result.data.find(student => student.email === userEmail);
          if (currentStudent) {
            console.log('✅ Student data loaded:', currentStudent);
            setStudentData(currentStudent);
            setEditData(currentStudent);
            setProfileImage(currentStudent.profileImage);
            localStorage.setItem('userId', currentStudent._id);
          } else {
            setError('Student data not found');
          }
        }
      }
    } catch (err) {
      setError('Failed to fetch student data');
      console.error('❌ Error fetching student data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setUploadingImage(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login first');
        return;
      }

      const formData = new FormData();
      formData.append('profileImage', file);

      const response = await fetch(`${API_BASE_URL}/api/upload/profile-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        console.log('✅ Image uploaded successfully:', result.profileImage);
        setProfileImage(result.profileImage);
        await fetchStudentData();
        alert('Profile image updated successfully!');
      } else {
        alert(result.message || 'Failed to upload image');
      }
    } catch (err) {
      console.error('❌ Error uploading image:', err);
      alert('Error uploading image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const updateStudent = async (data) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/students/${studentData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        const result = await response.json();
        setStudentData(result.data);
        setEditData(result.data);
        return true;
      }
    } catch (err) {
      console.error('Update error:', err);
    }
    return false;
  };

  const handleEdit = (section) => {
    setIsEditing(section);
    setEditData({ ...studentData });
  };

  const handleSave = async () => {
    if (await updateStudent(editData)) {
      setIsEditing(false);
      alert('Profile updated successfully!');
    } else {
      alert('Failed to update profile');
    }
  };

  const handleInputChange = (field, value, section = null) => {
    if (section) {
      setEditData({
        ...editData,
        [section]: {
          ...editData[section],
          [field]: value
        }
      });
    } else {
      setEditData({
        ...editData,
        [field]: value
      });
    }
  };

  const handleAddNew = (type) => {
    setShowAddModal(type);
    setNewEntry({});
  };

  const handleNewEntryChange = (field, value) => {
    setNewEntry({
      ...newEntry,
      [field]: value
    });
  };

  const handleSaveNewEntry = async () => {
    try {
      const updatedData = { ...studentData };

      switch(showAddModal) {
        case 'education': {
          updatedData.education = [...(studentData.education || []), newEntry];
          break;
        }
        case 'skills': {
          const newSkills = newEntry.skills ? newEntry.skills.split(',').map(s => s.trim()) : [];
          updatedData.skills = [...(studentData.skills || []), ...newSkills];
          break;
        }
        case 'certification': {
          updatedData.coursesAndCertifications = [...(studentData.coursesAndCertifications || []), newEntry];
          break;
        }
        case 'training': {
          updatedData.trainingAndInternships = [...(studentData.trainingAndInternships || []), newEntry];
          break;
        }
        default:
          break;
      }

      const response = await fetch(`${API_BASE_URL}/api/auth/students/${studentData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
      });

      if (response.ok) {
        const result = await response.json();
        setStudentData(result.data);
        setEditData(result.data);
        setShowAddModal(null);
        setNewEntry({});
        alert('Added successfully!');
      } else {
        alert('Failed to add entry');
      }
    } catch (err) {
      console.error('Error adding entry:', err);
      alert('Error adding entry');
    }
  };

  const handleEditEntry = (type, index) => {
    setEditingEntry({ type, index });
    
    let entryData;
    switch(type) {
      case 'education':
        entryData = { ...studentData.education[index] };
        break;
      case 'certification':
        entryData = { ...studentData.coursesAndCertifications[index] };
        break;
      case 'training':
        entryData = { ...studentData.trainingAndInternships[index] };
        break;
      default:
        entryData = {};
    }
    
    setEditEntryData(entryData);
  };

  const handleCancelEditEntry = () => {
    setEditingEntry({ type: null, index: null });
    setEditEntryData({});
  };

  const handleEditEntryChange = (field, value) => {
    setEditEntryData({
      ...editEntryData,
      [field]: value
    });
  };

  const handleSaveEditEntry = async () => {
    try {
      const updatedData = { ...studentData };
      const { type, index } = editingEntry;

      switch(type) {
        case 'education':
          updatedData.education[index] = editEntryData;
          break;
        case 'certification':
          updatedData.coursesAndCertifications[index] = editEntryData;
          break;
        case 'training':
          updatedData.trainingAndInternships[index] = editEntryData;
          break;
        default:
          return;
      }

      const response = await fetch(`${API_BASE_URL}/api/auth/students/${studentData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
      });

      if (response.ok) {
        const result = await response.json();
        setStudentData(result.data);
        setEditData(result.data);
        setEditingEntry({ type: null, index: null });
        setEditEntryData({});
        alert('Updated successfully!');
      } else {
        alert('Failed to update entry');
      }
    } catch (err) {
      console.error('Error updating entry:', err);
      alert('Error updating entry');
    }
  };

  const handleDeleteEntry = async (type, index) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;

    try {
      const updatedData = { ...studentData };

      switch(type) {
        case 'education':
          updatedData.education = studentData.education.filter((_, i) => i !== index);
          break;
        case 'certification':
          updatedData.coursesAndCertifications = studentData.coursesAndCertifications.filter((_, i) => i !== index);
          break;
        case 'training':
          updatedData.trainingAndInternships = studentData.trainingAndInternships.filter((_, i) => i !== index);
          break;
        default:
          break;
      }

      const response = await fetch(`${API_BASE_URL}/api/auth/students/${studentData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
      });

      if (response.ok) {
        const result = await response.json();
        setStudentData(result.data);
        setEditData(result.data);
        alert('Deleted successfully!');
      } else {
        alert('Failed to delete entry');
      }
    } catch (err) {
      console.error('Error deleting entry:', err);
      alert('Error deleting entry');
    }
  };

  const handleDeleteSkill = async (index) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    
    const updatedSkills = studentData.skills.filter((_, i) => i !== index);
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/students/${studentData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills: updatedSkills })
      });
      if (response.ok) {
        const result = await response.json();
        setStudentData(result.data);
        setEditData(result.data);
        alert('Skill deleted successfully!');
      }
    } catch (err) {
      console.error('Error deleting skill:', err);
    }
  };

  const handleChangeAccount = () => {
    const confirmed = window.confirm(
      'Are you sure you want to switch account? You will be logged out.'
    );
    
    if (confirmed) {
      switchAccount();
    }
  };

  // UPDATED: Navigate to Change Password page
  const handleChangePassword = () => {
    navigate('/change-password');
  };

  const handleContactUs = () => {
    navigate('/contact');
  };

  const handleLogout = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to logout?'
    );
    
    if (confirmed) {
      setIsLoggingOut(true);
      try {
        await logout();
      } catch (error) {
        console.error('Logout failed:', error);
        alert('Logout failed. Please try again.');
      } finally {
        setIsLoggingOut(false);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleNavigation = (item) => {
    if (item.isLocal) {
      setActiveSection(item.id);
    } else {
      navigate(item.route);
    }
  };

  const navItems = [
    { id: 'profile', label: 'Profile', img: '/src/assets/Dashboard/Profile.png', isLocal: true },
    { id: 'practice', label: 'Practice', img: '/src/assets/Dashboard/Practice.png', route: '/practice' },
    { id: 'courses', label: 'Courses', img: '/src/assets/Dashboard/Courses.png', route: '/courses' },
    { id: 'counseling', label: 'Counseling', img: '/src/assets/Dashboard/Counseling.png', route: '/counseling' },
    { id: 'hackathon', label: 'Hackathon', img: '/src/assets/Dashboard/Hackathon.png', route: '/hackathon' },
    { id: 'startup', label: 'Startup service', img: '/src/assets/Dashboard/Startup service.png', route: '/startup' }
  ];

  const sidebarActions = [
    {
      id: 'change-account',
      label: 'Change account',
      icon: User,
      onClick: handleChangeAccount,
      color: 'text-gray-600 hover:text-[#ED9455]'
    },
    {
      id: 'change-password',
      label: 'Change password',
      icon: Lock,
      onClick: handleChangePassword,
      color: 'text-gray-600 hover:text-[#ED9455]'
    },
    {
      id: 'contact-us',
      label: 'Contact us',
      icon: Mail,
      onClick: handleContactUs,
      color: 'text-gray-600 hover:text-[#ED9455]'
    },
    {
      id: 'logout',
      label: 'Log out',
      icon: LogOut,
      onClick: handleLogout,
      color: 'text-red-600 hover:text-red-700',
      loading: isLoggingOut
    }
  ];

  const educationFields = [
    { name: 'courseName', placeholder: 'Course Name' },
    { name: 'college', placeholder: 'College/University' },
    { name: 'dates', isGrid: true, inputs: [
      { name: 'from', placeholder: 'From' },
      { name: 'to', placeholder: 'To' }
    ]}
  ];

  const certificationFields = [
    { name: 'title', placeholder: 'Certification Title' },
    { name: 'specifications', placeholder: 'Specifications' },
    { name: 'description', placeholder: 'Description', type: 'textarea', rows: 3 }
  ];

  const trainingFields = [
    { name: 'title', placeholder: 'Training/Internship Title' },
    { name: 'company', placeholder: 'Company' },
    { name: 'dates', isGrid: true, inputs: [
      { name: 'from', placeholder: 'From (e.g., Jan 2023)' },
      { name: 'to', placeholder: 'To (e.g., Jun 2023)' }
    ]},
    { name: 'description', placeholder: 'Description', type: 'textarea', rows: 3 }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF2E9] flex items-center justify-center">
        <div className="text-gray-800 text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !studentData) {
    return (
      <div className="min-h-screen bg-[#FFF2E9] flex items-center justify-center">
        <div className="text-gray-800 text-xl">{error || 'No data available'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF2E9] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <div className="flex flex-col items-center mb-6">
                <ProfileImage profileImage={profileImage} onUpload={handleImageUpload} uploading={uploadingImage} />
                <h3 className="mt-4 font-bold text-gray-800 text-center">{studentData.fullName}</h3>
                <p className="text-gray-600 text-sm">Student</p>
              </div>

              <nav className="space-y-2">
                {navItems.map(item => (
                  <button key={item.id} onClick={() => handleNavigation(item)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeSection === item.id ? 'bg-[#ED9455] text-white' : 'text-gray-700 hover:bg-[#ED9455] hover:text-white'
                    }`}>
                    {item.icon ? item.icon : <img src={item.img} alt={item.label} className="w-6 h-6 object-contain" />}
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-300 space-y-2">
                {sidebarActions.map(action => (
                  <button
                    key={action.id}
                    onClick={action.onClick}
                    disabled={action.loading}
                    className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed ${action.color}`}
                  >
                    {action.icon && React.createElement(action.icon, { className: "w-4 h-4" })}
                    <span>{action.loading ? 'Logging out...' : action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-lg flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <ProfileImage profileImage={profileImage} size="w-28 h-28" />
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800">{studentData.fullName}</h2>
                    <p className="text-gray-600">Student</p>
                    <div className="mt-2 inline-flex items-center gap-2 bg-[#E3F2FD] px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-[#4D83E7] rounded-full"></div>
                      <span className="text-sm text-[#4D83E7]">Verified Student for job</span>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-gray-300 rounded-2xl p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Profile Progress</span>
                    <span className="text-sm font-bold text-gray-800">75%</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">Complete your profile to grab more opportunities</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#4CAF50] h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <button className="w-full mt-4 bg-[#ED9455] text-white py-3 rounded-xl font-semibold hover:bg-[#A7561C] transition-colors">
                  Edit profile
                </button>
              </div>

              <div className="lg:col-span-1 bg-gradient-to-br from-[#ED9455] to-[#A7561C] rounded-3xl p-6 shadow-lg text-center flex flex-col justify-between">
                <div>
                  <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-[#4D83E7]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Blue Batch</h3>
                  <h4 className="text-white font-bold text-2xl mb-2">Congratulations!</h4>
                  <p className="text-white text-sm mb-4">when the student get the blue batch means they are 85% of ready to job</p>
                </div>
                <button className="w-full bg-gradient-to-r from-[#FCEBDF] to-[#4D83E7] text-gray-800 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                  View batch
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Personal Information */}
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <SectionHeader title="Personal information" onEdit={() => handleEdit('personal')} 
                               isEditing={isEditing === 'personal'} onSave={handleSave} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoField icon={MapPin} value={isEditing === 'personal' ? editData.personalInfo?.address : studentData.personalInfo?.address}
                             isEditing={isEditing === 'personal'} onChange={(e) => handleInputChange('address', e.target.value, 'personalInfo')} />
                  <InfoField icon={Phone} value={isEditing === 'personal' ? editData.personalInfo?.mobileNo : studentData.personalInfo?.mobileNo}
                             isEditing={isEditing === 'personal'} onChange={(e) => handleInputChange('mobileNo', e.target.value, 'personalInfo')} />
                  <InfoField icon={User} value={isEditing === 'personal' ? editData.personalInfo?.gender : studentData.personalInfo?.gender}
                             isEditing={isEditing === 'personal'} type="select" options={['Male', 'Female', 'Other']}
                             onChange={(e) => handleInputChange('gender', e.target.value, 'personalInfo')} />
                  <InfoField icon={Mail} value={studentData.email} isEditing={false} />
                  <InfoField icon={Calendar} value={isEditing === 'personal' ? editData.personalInfo?.dateOfBirth?.split('T')[0] : formatDate(studentData.personalInfo?.dateOfBirth)}
                             isEditing={isEditing === 'personal'} type="date" onChange={(e) => handleInputChange('dateOfBirth', e.target.value, 'personalInfo')} />
                </div>
              </div>

              {/* Education */}
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <SectionHeader title="Education" onAdd={() => handleAddNew('education')} />
                <div className="space-y-4">
                  {studentData.education && studentData.education.length > 0 ? (
                    studentData.education.map((edu, i) => (
                      <div key={i} className="border-l-2 border-gray-200 pl-4 py-2">
                        <EditableEntry entry={edu} index={i} type="education" fields={educationFields}
                          isEditing={editingEntry.type === 'education' && editingEntry.index === i}
                          editData={editEntryData} onEdit={handleEditEntry} onSave={handleSaveEditEntry}
                          onCancel={handleCancelEditEntry}
                          onChange={handleEditEntryChange}
                          onDelete={handleDeleteEntry} />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No education added yet</p>
                  )}
                </div>
              </div>

              {/* Skills */}
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <SectionHeader title="Skills" onAdd={() => handleAddNew('skills')} />
                <div className="flex flex-wrap gap-2">
                  {studentData.skills && studentData.skills.length > 0 ? (
                    studentData.skills.map((skill, i) => (
                      <span key={i} className="px-4 py-2 bg-[#FCEBDF] text-gray-700 rounded-full text-sm flex items-center gap-2">
                        {skill}
                        <button onClick={() => handleDeleteSkill(i)} className="text-red-500 hover:text-red-700">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No skills added yet</p>
                  )}
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <SectionHeader title="Courses and certifications" onAdd={() => handleAddNew('certification')} />
                <div className="space-y-4">
                  {studentData.coursesAndCertifications && studentData.coursesAndCertifications.length > 0 ? (
                    studentData.coursesAndCertifications.map((cert, i) => (
                      <div key={i} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <EditableEntry entry={cert} index={i} type="certification" fields={certificationFields}
                          isEditing={editingEntry.type === 'certification' && editingEntry.index === i}
                          editData={editEntryData} onEdit={handleEditEntry} onSave={handleSaveEditEntry}
                          onCancel={handleCancelEditEntry}
                          onChange={handleEditEntryChange}
                          onDelete={handleDeleteEntry} />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No certifications added yet</p>
                  )}
                </div>
              </div>

              {/* Training */}
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <SectionHeader title="Training and Internships" onAdd={() => handleAddNew('training')} />
                <div className="space-y-4">
                  {studentData.trainingAndInternships && studentData.trainingAndInternships.length > 0 ? (
                    studentData.trainingAndInternships.map((training, i) => (
                      <div key={i} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <EditableEntry entry={training} index={i} type="training" fields={trainingFields}
                          isEditing={editingEntry.type === 'training' && editingEntry.index === i}
                          editData={editEntryData} onEdit={handleEditEntry} onSave={handleSaveEditEntry}
                          onCancel={handleCancelEditEntry}
                          onChange={handleEditEntryChange}
                          onDelete={handleDeleteEntry} />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No training/internships added yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Modals */}
      <Modal isOpen={showAddModal === 'education'} onClose={() => setShowAddModal(null)} 
             title="Add Education" onSave={handleSaveNewEntry}>
        <div className="space-y-4">
          <input type="text" placeholder="Course Name" value={newEntry.courseName || ''}
                 onChange={(e) => handleNewEntryChange('courseName', e.target.value)}
                 className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:border-[#ED9455] outline-none" />
          <input type="text" placeholder="College/University" value={newEntry.college || ''}
                 onChange={(e) => handleNewEntryChange('college', e.target.value)}
                 className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:border-[#ED9455] outline-none" />
          <input type="text" placeholder="From (e.g., 2020)" value={newEntry.from || ''}
                 onChange={(e) => handleNewEntryChange('from', e.target.value)}
                 className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:border-[#ED9455] outline-none" />
          <input type="text" placeholder="To (e.g., 2024)" value={newEntry.to || ''}
                 onChange={(e) => handleNewEntryChange('to', e.target.value)}
                 className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:border-[#ED9455] outline-none" />
        </div>
      </Modal>

      <Modal isOpen={showAddModal === 'skills'} onClose={() => setShowAddModal(null)} 
             title="Add Skills" onSave={handleSaveNewEntry}>
        <textarea placeholder="Enter skills separated by commas (e.g., React, Node.js, Python)"
                  value={newEntry.skills || ''} rows="4"
                  onChange={(e) => handleNewEntryChange('skills', e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:border-[#ED9455] outline-none" />
      </Modal>

      <Modal isOpen={showAddModal === 'certification'} onClose={() => setShowAddModal(null)} 
             title="Add Certification" onSave={handleSaveNewEntry}>
        <div className="space-y-4">
          <input type="text" placeholder="Certification Title" value={newEntry.title || ''}
                 onChange={(e) => handleNewEntryChange('title', e.target.value)}
                 className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:border-[#ED9455] outline-none" />
          <input type="text" placeholder="Specifications" value={newEntry.specifications || ''}
                 onChange={(e) => handleNewEntryChange('specifications', e.target.value)}
                 className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:border-[#ED9455] outline-none" />
          <textarea placeholder="Description" value={newEntry.description || ''} rows="3"
                    onChange={(e) => handleNewEntryChange('description', e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:border-[#ED9455] outline-none" />
        </div>
      </Modal>

      <Modal isOpen={showAddModal === 'training'} onClose={() => setShowAddModal(null)} 
             title="Add Training/Internship" onSave={handleSaveNewEntry}>
        <div className="space-y-4">
          <input type="text" placeholder="Training/Internship Title" value={newEntry.title || ''}
                 onChange={(e) => handleNewEntryChange('title', e.target.value)}
                 className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:border-[#ED9455] outline-none" />
          <input type="text" placeholder="Company" value={newEntry.company || ''}
                 onChange={(e) => handleNewEntryChange('company', e.target.value)}
                 className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:border-[#ED9455] outline-none" />
          <input type="text" placeholder="From (e.g., Jan 2023)" value={newEntry.from || ''}
                 onChange={(e) => handleNewEntryChange('from', e.target.value)}
                 className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:border-[#ED9455] outline-none" />
          <input type="text" placeholder="To (e.g., Jun 2023)" value={newEntry.to || ''}
                 onChange={(e) => handleNewEntryChange('to', e.target.value)}
                 className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:border-[#ED9455] outline-none" />
          <textarea placeholder="Description" value={newEntry.description || ''} rows="3"
                    onChange={(e) => handleNewEntryChange('description', e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:border-[#ED9455] outline-none" />
        </div>
      </Modal>
    </div>
  );
};

export default StudentDashboard;