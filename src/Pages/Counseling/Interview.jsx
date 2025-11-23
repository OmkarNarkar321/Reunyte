import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import images
import interviewBanner from "../../assets/CounselingPage/interview-banner.png";
import interviewIllustration from "../../assets/CounselingPage/interview-illustration.png";
import triangularShape from "../../assets/CounselingPage/Group50 interview.png";

// Import company logos
import company1 from "../../assets/CounselingPage/company1.png";
import company2 from "../../assets/CounselingPage/company2.png";
import company3 from "../../assets/CounselingPage/company3.png";
import company4 from "../../assets/CounselingPage/company4.png";
import company5 from "../../assets/CounselingPage/company5.png";

const COMPANY_LOGOS = [company1, company2, company3, company4, company5];

const LEARNING_POINTS = [
  "Research the Company.",
  "Understand the Job Role.",
  "Prepare for Common Interview Questions.",
  "Practice Technical Skills.",
  "Prepare Questions for the Interviewer.",
  "Exhibit Positive Body Language.",
  "Continuous Improvement.",
  "We provide the basics and the most commonly asked interview questions."
];

const InterviewCounseling = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ backgroundColor: '#FFFDFB' }}>
      {/* Breadcrumb Navigation */}
      <nav className="text-sm text-gray-600 px-4 pt-6 max-w-6xl mx-auto">
        <Link
          to="/counseling"
          className="text-blue-600 hover:text-blue-800 transition"
          style={{ fontFamily: "Public Sans" }}
        >
          Counseling
        </Link>
        <span className="mx-2 text-gray-400">|</span>
        <span className="text-gray-900" style={{ fontFamily: "Public Sans" }}>
          Interview
        </span>
      </nav>

      {/* Hero Section - CTA */}
      <section className="py-8 sm:py-12 md:py-16 px-4" style={{ backgroundColor: '#FFFDFB' }}>
        <div className="max-w-6xl mx-auto">
          <div 
            className="relative rounded-3xl shadow-2xl"
            style={{
              background: '#c597f6',
              height: isMobile ? '280px' : '350px',
              overflow: 'visible'
            }}
          >
            {/* Triangular Shape Image */}
            {!isMobile && (
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-0 overflow-hidden">
                <img
                  src={triangularShape}
                  alt=""
                  className="w-[359px] h-[380px] object-contain opacity-40"
                  style={{ 
                    transform: 'translateX(24%)',
                    transformOrigin: 'right center'
                  }}
                  draggable="false"
                />
              </div>
            )}

            {/* Content container */}
            <div className="relative z-10 h-full flex items-center">
              {/* Left side - Interview Banner Image */}
              <div className={`flex-shrink-0 h-full relative flex items-end ${
                isMobile ? 'w-2/5 justify-center' : 'w-[45%] justify-start pl-8'
              }`}>
                <div className="relative">
                  <img
                    src={interviewBanner}
                    alt="Interview Professional"
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
                isMobile ? 'px-4 pr-6' : 'px-8 pr-12'
              }`}>
                <h2 
                  className={`font-extrabold text-white mb-2 ${
                    isMobile ? 'text-xl leading-tight' : 'text-4xl leading-tight'
                  }`}
                  style={{ fontFamily: "Public Sans" }}
                >
                  Crack any interview, Confidently
                </h2>
                
                <p 
                  className={`text-white mb-6 ${
                    isMobile ? 'text-sm sm:text-base mb-4 leading-snug' : 'text-xl mb-8 leading-relaxed'
                  }`}
                  style={{ fontFamily: "Public Sans", fontWeight: "500" }}
                >
                  Achieve your ambitions with precision and certainty
                </p>

                <Link
                  to="/practice"
                  className={`bg-[#FFEC9E] text-gray-800 font-semibold rounded-2xl shadow-lg hover:bg-[#ffe680] hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                    isMobile ? 'py-3 px-6 text-sm' : 'py-3 sm:py-4 px-6 sm:px-8 text-base'
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

      {/* What You Learn Section */}
      <section className="py-12 sm:py-16 px-4 bg-gradient-to-b from-[#FFFDFB] to-[#FFEBD4]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            {/* Left side - Content */}
            <div className="flex-1 w-full">
              <h2 
                className="text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-gray-900"
                style={{ fontFamily: "Domine, serif" }}
              >
                What you learn?
              </h2>
              
              <ol 
                className="list-decimal list-inside text-gray-700 space-y-2 sm:space-y-3 text-base md:text-lg leading-relaxed mb-6 sm:mb-8"
                style={{ fontFamily: "Public Sans" }}
              >
                {LEARNING_POINTS.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ol>

              <div className="mt-6 sm:mt-8">
                <Link
                  to="/request"
                  className="inline-block bg-orange-400 text-gray-900 font-semibold py-3 px-6 sm:px-8 rounded-xl shadow-lg hover:bg-orange-500 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  style={{ fontFamily: "Public Sans" }}
                >
                  Apply Now
                </Link>
              </div>
            </div>

            {/* Right side - Illustration */}
            <div className="flex-1 w-full flex justify-center md:justify-end">
              <img
                src={interviewIllustration}
                alt="Interview Illustration"
                className="w-full max-w-md object-contain"
                draggable="false"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Companies Tie-up Section */}
      <section className="py-12 sm:py-16 px-4 bg-gradient-to-b from-[#FFEBD4] to-[#FFFDFB]">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-gray-900"
            style={{ fontFamily: "Domine, serif" }}
          >
            Companies tie up with us:
          </h2>

          <div className="flex overflow-x-auto space-x-4 sm:space-x-6 py-4 scrollbar-hide">
            {COMPANY_LOGOS.map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-white rounded-xl shadow-lg p-4 sm:p-6 min-w-[120px] sm:min-w-[140px] flex items-center justify-center hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={logo}
                  alt={`Company ${index + 1}`}
                  className="h-16 sm:h-20 w-auto object-contain"
                  draggable="false"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom spacing */}
      <div className="h-12 sm:h-20"></div>
    </div>
  );
};

export default InterviewCounseling;