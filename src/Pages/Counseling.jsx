import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import CounsellingImg from "../assets/CounselingPage/counselling 1 1.png";
import Career from "../assets/CounselingPage/carrer counsalling 1.png";
import domain from "../assets/CounselingPage/web-domain 2.png";
import interviewImg from "../assets/CounselingPage/interview 1.png";  // ✅ FIXED: Renamed to avoid conflict
import project from "../assets/CounselingPage/project 1.png";
import man from "../assets/CounselingPage/businessman 1.png";
import CareerCons from "./Counseling/CareerCons";
import ConsMore from "./Counseling/ConsMore";
import DomainCounseling from "./Counseling/Domain";
import InterviewCounseling from "./Counseling/Interview";  // ✅ FIXED: Removed .jsx extension

function ProjectCounseling() {
  return <div className="p-6 text-center text-xl">Project Counseling Page</div>;
}

// Counseling Body Component
export default function Counseling() {
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ backgroundColor: '#FFFDFB' }}>
      {/* Hero Section - CTA */}
      <section className="py-16 px-4" style={{ backgroundColor: '#FFFDFB' }}>
        <div className="max-w-6xl mx-auto">
          <div 
            className="relative rounded-3xl shadow-2xl"
            style={{
              background: '#F19ED2',
              height: isMobile ? '280px' : '350px',
              overflow: 'visible'
            }}
          >
            {/* ADD YOUR SPHERE/ELLIPSE IMAGE HERE - positioned at bottom left */}
            <div className={`absolute left-0 bottom-0 z-0 ${isMobile ? 'hidden' : 'block'}`}
              style={{ 
                width: '700px',
                height: '350px',
                overflow: 'hidden',
                borderBottomLeftRadius: '1.5rem'
              }}
            >
              <img
                src="/assets/CounselingPage/Sphere.png"
                alt="Sphere"
                className="w-[650px] h-[700px] object-contain opacity-50"
                style={{ 
                  transform: 'translateY(-12%) translateX(-50px)',
                  transformOrigin: 'bottom left'
                }}
                draggable="false"
              />
            </div>

            {/* ADD YOUR TRIANGULAR IMAGE HERE - positioned at right side */}
            <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-0 overflow-hidden ${isMobile ? 'hidden' : 'block'}`}>
              <img
                src="/assets/CounselingPage/Group50.png"
                alt=""
                className="w-[359px] h-[380px] object-contain opacity-40"
                style={{ 
                  transform: 'translateX(24%)',
                  transformOrigin: 'right center'
                }}
                draggable="false"
              />
            </div>

            {/* Content container */}
            <div className="relative z-10 h-full flex items-center">
              {/* Left side - Counseling Girls Image - OVERLAPPING FROM TOP */}
              <div className={`flex-shrink-0 h-full relative flex items-end justify-center ${
                isMobile ? 'w-2/5' : 'w-1/2'
              }`}>
                <div className="relative">
                  <img
                    src={CounsellingImg}
                    alt="Counseling Girls"
                    className={`object-contain relative z-20 ${
                      isMobile ? 'h-[320px] w-auto' : 'h-[420px] w-auto'
                    }`}
                    style={{
                      transform: isMobile ? 'translateY(-20px)' : 'translateY(-35px)',
                      marginBottom: '-36px'
                    }}
                    draggable="false"
                  />
                </div>
              </div>

              {/* Right side - Text content */}
              <div className={`flex-1 flex flex-col justify-center items-start relative z-20 ${
                isMobile ? 'px-4 pr-6' : 'px-8'
              }`}>
                <h2 
                  className={`font-extrabold text-white mb-2 leading-tight ${
                    isMobile ? 'text-2xl' : 'text-4xl md:text-4.5xl'
                  }`}
                  style={{ fontFamily: "Public Sans" }}
                >
                  Get a best counseling from us
                </h2>
                
                <p 
                  className={`text-white mb-6 leading-tight ${
                    isMobile ? 'text-lg mb-4' : 'text-2xl mb-8'
                  }`}
                  style={{ fontFamily: "Public Sans" }}
                >
                  Seize yours goals with clarity and confidence
                </p>

                <Link
                  to="/counseling/about"
                  className={`bg-[#FFEC9E] text-gray-800 font-semibold rounded-2xl shadow-lg hover:bg-[#ffe680] hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                    isMobile ? 'py-3 px-6 text-sm' : 'py-4 px-8'
                  }`}
                  style={{ fontFamily: "Public Sans" }}
                >
                  Click here to know more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Counseling Options Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#FFFDFB] to-[#FFEBD4]">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900"
            style={{ fontFamily: "Domine, serif" }}
          >
            Our Counseling Services
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            
            {/* Career Counseling */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-[280px] hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-teal-200 flex items-center justify-center h-48">
                <img src={Career} alt="Career Counseling" className="w-24 h-24 object-contain" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2" style={{ fontFamily: "Public Sans" }}>
                  Career counseling
                </h3>
                <p className="text-gray-500 mb-4 text-sm" style={{ fontFamily: "Public Sans" }}>
                  Grow career from best counselor
                </p>
                <Link 
                  to="/counseling/career" 
                  className="block w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
                  style={{ fontFamily: "Public Sans" }}
                >
                  Read more
                </Link>
              </div>
            </div>

            {/* Domain Counseling */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-[280px] hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-orange-200 flex items-center justify-center h-48">
                <img src={domain} alt="Domain Counseling" className="w-24 h-24 object-contain" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2" style={{ fontFamily: "Public Sans" }}>
                  Domain counseling
                </h3>
                <p className="text-gray-500 mb-4 text-sm" style={{ fontFamily: "Public Sans" }}>
                  Grow career from best counselor
                </p>
                <Link 
                  to="/counseling/domain"
                  className="block w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
                  style={{ fontFamily: "Public Sans" }}
                >
                  Read more
                </Link>
              </div>
            </div>

            {/* Interview Counseling */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-[280px] hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-red-200 flex items-center justify-center h-48">
                <img src={interviewImg} alt="Interview Counseling" className="w-24 h-24 object-contain" /> {/* ✅ FIXED: Changed to interviewImg */}
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2" style={{ fontFamily: "Public Sans" }}>
                  Interview counseling
                </h3>
                <p className="text-gray-500 mb-4 text-sm" style={{ fontFamily: "Public Sans" }}>
                  Grow career from best counselor
                </p>
                <Link 
                  to="/counseling/interview" 
                  className="block w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
                  style={{ fontFamily: "Public Sans" }}
                >
                  Read more
                </Link>
              </div>
            </div>

            {/* Project Counseling */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-[280px] hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="bg-purple-200 flex items-center justify-center h-48">
                <img src={project} alt="Project Counseling" className="w-24 h-24 object-contain" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2" style={{ fontFamily: "Public Sans" }}>
                  Project counseling
                </h3>
                <p className="text-gray-500 mb-4 text-sm" style={{ fontFamily: "Public Sans" }}>
                  Grow career from best counselor
                </p>
                <Link 
                  to="/counseling/project" 
                  className="block w-full py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
                  style={{ fontFamily: "Public Sans" }}
                >
                  Read more
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CEO Vision Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#FFEBD4] to-[#FFFDFB]">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900"
            style={{ fontFamily: "Domine, serif" }}
          >
            Vision to add counseling
          </h2>

          <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
            {/* Left side - CEO Image with background */}
            <div className="w-full md:w-1/3 flex flex-col items-center md:items-start relative">
              {/* Background rectangle */}
              <div 
                className="absolute w-80 h-80 rounded-3xl"
                style={{
                  background: 'linear-gradient(180deg, #FFE17B 0%, #F0A500 100%)',
                  top: isMobile ? '20px' : '40px',
                  left: isMobile ? '50%' : '0',
                  transform: isMobile ? 'translateX(-50%)' : 'none',
                  zIndex: 0
                }}
              ></div>
              
              {/* CEO Image */}
              <img
                src={man}  
                alt="CEO"
                className="relative z-10 rounded-2xl shadow-lg max-h-[350px] md:max-h-[400px] w-auto object-cover"
                style={{
                  marginTop: isMobile ? '40px' : '60px',
                  marginLeft: isMobile ? '0' : '-50px'
                }}
              />
            </div>

            {/* Right Side Text */}
            <div className="w-full md:w-2/3 flex flex-col justify-center">
              <div className="space-y-4">
                <p className="text-base md:text-lg text-gray-700 leading-relaxed" style={{ fontFamily: "Public Sans" }}>
                  I hope this message finds you filled with curiosity and excitement for your educational journey ahead. At [Education Platform Name], we believe in the transformative power of learning and the boundless potential within each of you.
                </p>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed" style={{ fontFamily: "Public Sans" }}>
                  Your commitment to expanding your knowledge and skills is not just inspiring—it's shaping the future. Whether you're mastering a new subject, exploring a passion, or preparing for a career, know that you are part of a community dedicated to your success.
                </p>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed" style={{ fontFamily: "Public Sans" }}>
                  As CEO, I am privileged to witness the impact of your dedication firsthand. Your achievements and aspirations drive us to innovate and improve, ensuring that our platform continues to meet your evolving needs.
                </p>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed" style={{ fontFamily: "Public Sans" }}>
                  Embrace every opportunity to learn, grow, and challenge yourselves. The skills and insights you gain today will empower you to make a difference in the world tomorrow.
                </p>
                <div className="mt-6">
                  <p className="text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "Public Sans" }}>
                    From
                  </p>
                  <p className="text-2xl text-gray-900 font-bold mt-2" style={{ fontFamily: "Public Sans" }}>
                    CEO, Xplore
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom spacing */}
      <div className="h-20"></div>
    </div>
  );
}

// Nested routes for counseling
export function CounselingRoutes() {
  return (
    <Routes>
      <Route index element={<Counseling />} />
      <Route path="career/*" element={<CareerCons />} />
      <Route path="domain/*" element={<DomainCounseling />} />
      <Route path="interview" element={<InterviewCounseling />} />
      <Route path="project" element={<ProjectCounseling />} />
      <Route path="about" element={<ConsMore />} />
    </Routes>
  );
}