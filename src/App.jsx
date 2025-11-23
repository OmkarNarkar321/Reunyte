import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import ScrollToTop from './Components/ScrollToTop';
import ContactUs from './Components/ContactUs';
import ProtectedRoute from './Components/ProtectedRoute';

// Import all your page components
import Home from './Pages/Home';

// ✅ FIXED: Counseling main page is at src/Pages/Counseling.jsx
import Counseling from './Pages/Counseling';

// ✅ FIXED: All counseling sub-pages are in src/Pages/Counseling/
import CareerCons from './Pages/Counseling/CareerCons';
import Domain from './Pages/Counseling/Domain';
import Interview from './Pages/Counseling/Interview';
import Project from './Pages/Counseling/Project';
import After10th from './Pages/Counseling/After10th';
import ConsMore from './Pages/Counseling/ConsMore';

// // ✅ FIXED: Nested Career pages
// import TenthStd from './Pages/Counseling/TenthStd';
// import TwelfthStd from './Pages/Counseling/TwelfthStd';
// import Engineering from './Pages/Counseling/Engineering';
// import ITI from './Pages/Counseling/ITI';
// import Medical from './Pages/Counseling/Medical';

// Counseling Form Pages
import Apply from './Pages/Counseling/applyForm';
import Request from './Pages/Counseling/mentorForm';

// Courses Pages
import Courses from './Pages/Courses';
import Cprogramming from './Pages/Courses/Cprogramming';
import JavaProgramming from './Pages/Courses/JavaProgramming';
import PythonProgramming from './Pages/Courses/PythonProgramming';
import Mean from './Pages/Courses/Mean';
import MernStack from './Pages/Courses/MernStack';

// Hackathon Pages
import Hackathon from './Pages/Hackathon';
import HackathonSelectionPage from './Pages/Hackathon/HackathonSelectionPage';

// Practice Pages
import Practice from './Pages/Practice';

// Other Pages
import StartupServices from './Pages/StartupServices';
import Login from './Pages/Login';
import Register from './Pages/Register';

// Import Registration Form Pages
import Studentform from './Pages/RegisterForms/Studentform';
import Collegeform from './Pages/RegisterForms/Collegeform';
import Startupform from './Pages/RegisterForms/Startupform';
import Organizationform from './Pages/RegisterForms/Organization';

// Import Dashboard
import StudentDashboard from './Pages/Dashboard/StudentDashboard';

// Import Change Password Component
import ChangePasswordModal from './Components/ChangePasswordModal';

// Page wrapper component to handle navbar spacing
const PageWrapper = ({ children }) => (
  <div className="pt-16 min-h-screen flex flex-col">
    {children}
  </div>
);

// Login Wrapper
const LoginWrapper = () => {
  const navigate = useNavigate();
  
  const handleNavigateToRegister = () => {
    navigate('/register');
  };
  
  return (
    <PageWrapper>
      <Login 
        onNavigateToRegister={handleNavigateToRegister}
      />
    </PageWrapper>
  );
};

// Register Wrapper
const RegisterWrapper = () => {
  const navigate = useNavigate();
  
  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  const handleNavigateToForm = (userType, formData) => {
    const routes = {
      'student': '/register/student-form',
      'colleges': '/register/college-form',
      'startup': '/register/startup-form',
      'organization': '/register/organization-form'
    };
    
    sessionStorage.setItem('registrationData', JSON.stringify({
      userType,
      ...formData
    }));
    
    navigate(routes[userType]);
  };
  
  return (
    <PageWrapper>
      <Register 
        onNavigateToLogin={handleNavigateToLogin}
        onNavigateToForm={handleNavigateToForm}
      />
    </PageWrapper>
  );
};

// ✅ UPDATED: Main App component
function App() {
  const location = useLocation();

  useEffect(() => {
    const links = document.querySelectorAll("nav a");
    links.forEach(link => {
      if (link.getAttribute("href") === location.pathname) {
        link.classList.add("text-yellow-500", "font-semibold");
      } else {
        link.classList.remove("text-yellow-500", "font-semibold");
      }
    });
  }, [location.pathname]);

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* Home */}
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />

            {/* Contact Us */}
            <Route path="/contact" element={<ContactUs />} />

            {/* ✅ FIXED: Counseling Routes with proper nesting */}
            <Route path="/counseling" element={<PageWrapper><Counseling /></PageWrapper>} />
            <Route path="/counseling/about" element={<PageWrapper><ConsMore /></PageWrapper>} />
            
            {/* ✅ Career Counseling - Main page and nested routes */}
            <Route path="/counseling/career" element={<PageWrapper><CareerCons /></PageWrapper>} />
            <Route path="/counseling/career/10th" element={<PageWrapper><CareerCons /></PageWrapper>} />
            <Route path="/counseling/career/12th" element={<PageWrapper><CareerCons /></PageWrapper>} />
            <Route path="/counseling/career/engineering" element={<PageWrapper><CareerCons /></PageWrapper>} />
            <Route path="/counseling/career/iti" element={<PageWrapper><CareerCons /></PageWrapper>} />
            <Route path="/counseling/career/medical" element={<PageWrapper><CareerCons /></PageWrapper>} />
            
            {/* ✅ Other Counseling Pages */}
            <Route path="/counseling/domain" element={<PageWrapper><Domain /></PageWrapper>} />
            <Route path="/counseling/interview" element={<PageWrapper><Interview /></PageWrapper>} />
            <Route path="/counseling/project" element={<PageWrapper><Project /></PageWrapper>} />
            <Route path="/counseling/after-10th" element={<PageWrapper><After10th /></PageWrapper>} />

            <Route path="/counseling/domain/computer" element={<PageWrapper><Domain initialCategory="Computer" /></PageWrapper>} />
            <Route path="/counseling/domain/mechanical" element={<PageWrapper><Domain initialCategory="Mechanical" /></PageWrapper>} />
            <Route path="/counseling/domain/automobile" element={<PageWrapper><Domain initialCategory="Automobile" /></PageWrapper>} />
            <Route path="/counseling/domain/electrical" element={<PageWrapper><Domain initialCategory="Electrical" /></PageWrapper>} />
            <Route path="/counseling/domain/civil" element={<PageWrapper><Domain initialCategory="Civil" /></PageWrapper>} />

            {/* ✅ Counseling Form Routes */}
            <Route path="/apply" element={<PageWrapper><Apply /></PageWrapper>} />
            <Route path="/request" element={<PageWrapper><Request /></PageWrapper>} />

            {/* Courses Routes */}
            <Route path="/courses" element={<PageWrapper><Courses /></PageWrapper>} />
            <Route path="/courses/Cprogramming" element={<PageWrapper><Cprogramming /></PageWrapper>} />
            <Route path="/courses/JavaProgramming" element={<PageWrapper><JavaProgramming /></PageWrapper>} />
            <Route path="/courses/PythonProgramming" element={<PageWrapper><PythonProgramming /></PageWrapper>} />
            <Route path="/courses/Mean" element={<PageWrapper><Mean /></PageWrapper>} />
            <Route path="/courses/MernStack" element={<PageWrapper><MernStack /></PageWrapper>} />

            {/* Hackathon Routes */}
            <Route path="/hackathon" element={<PageWrapper><Hackathon /></PageWrapper>} />
            <Route path="/hackathon/hackathon-selection" element={<PageWrapper><HackathonSelectionPage /></PageWrapper>} />

            {/* Practice Routes */}
            <Route path="/practice" element={<PageWrapper><Practice /></PageWrapper>} />

            {/* Startup Services Routes */}
            <Route path="/startup" element={<PageWrapper><StartupServices /></PageWrapper>} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<LoginWrapper />} />
            <Route path="/register" element={<RegisterWrapper />} />

            {/* Registration Form Routes */}
            <Route path="/register/student-form" element={<PageWrapper><Studentform /></PageWrapper>} />
            <Route path="/register/college-form" element={<PageWrapper><Collegeform /></PageWrapper>} />
            <Route path="/register/startup-form" element={<PageWrapper><Startupform /></PageWrapper>} />
            <Route path="/register/organization-form" element={<PageWrapper><Organizationform /></PageWrapper>} />

            {/* Protected Dashboard Routes */}
            <Route 
              path="/studentdashboard/your-name" 
              element={
                <ProtectedRoute allowedUserTypes={['student']}>
                  <PageWrapper><StudentDashboard /></PageWrapper>
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/college/dashboard" 
              element={
                <ProtectedRoute allowedUserTypes={['colleges']}>
                  <PageWrapper>
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">🎓 College Dashboard</h1>
                        <p className="text-xl text-gray-600">Coming Soon!</p>
                      </div>
                    </div>
                  </PageWrapper>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/startup/dashboard" 
              element={
                <ProtectedRoute allowedUserTypes={['startup']}>
                  <PageWrapper>
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">🚀 Startup Dashboard</h1>
                        <p className="text-xl text-gray-600">Coming Soon!</p>
                      </div>
                    </div>
                  </PageWrapper>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/organization/dashboard" 
              element={
                <ProtectedRoute allowedUserTypes={['organization']}>
                  <PageWrapper>
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">🏢 Organization Dashboard</h1>
                        <p className="text-xl text-gray-600">Coming Soon!</p>
                      </div>
                    </div>
                  </PageWrapper>
                </ProtectedRoute>
              } 
            />

            {/* Change Password Route */}
            <Route path="/change-password" element={<ChangePasswordModal />} />
          </Routes>
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </AuthProvider>
  );
}

export default App;