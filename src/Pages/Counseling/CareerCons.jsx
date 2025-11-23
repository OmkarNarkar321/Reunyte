import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; 
import CounselingTabs from "./CounsellingTabs";
import CounselingImg from "../../assets/CounselingPage/pngwing 2.png";
import TenthCounselling from "./TenthStd";
import TwelfthCounselling from "./TwelfthStd";
import EngineeringCounselling from "./Engineering";
import ITI from "./ITI";
import Medical from "./Medical";

export default function CareerCons() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tabs = [
    { label: "10th Std", path: "/counseling/career/10th" },
    { label: "12th Std", path: "/counseling/career/12th" },
    { label: "Engineering", path: "/counseling/career/engineering" },
    { label: "ITI", path: "/counseling/career/iti" },
    { label: "Medical", path: "/counseling/career/medical" },
  ];

  const contentMap = {
    "/counseling/career/10th": <TenthCounselling />,
    "/counseling/career/12th": <TwelfthCounselling />,
    "/counseling/career/engineering": <EngineeringCounselling />,
    "/counseling/career/iti": <ITI />,
    "/counseling/career/medical": <Medical />,
  };

  const learningPoints = [
    { title: "Study Skills", desc: "Teaching effective study habits, time management, and organizational skills." },
    { title: "Mental Health Support", desc: "Offering support for issues such as stress, anxiety, and depression, and providing referrals to professional help if needed." },
    { title: "Tutoring and Academic Support", desc: "Providing resources for extra academic help." },
    { title: "Course Selection", desc: "Advising on course choices for the remaining years of high school to ensure students meet graduation requirements and are prepared for post-secondary education or career paths." },
    { title: "Test Preparation", desc: "Guidance for exams and career readiness." },
    { title: "Career Exploration", desc: "Helping students identify their interests and strengths, and exploring potential career paths." },
    { title: "College Information Sessions", desc: "Providing information about different colleges, admission requirements, and application processes." },
  ];

  const renderContent = () => {
    if (contentMap[location.pathname]) return contentMap[location.pathname];
    
    return (
      <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12 items-start">
        <div className="w-full md:w-5/12 flex justify-center pt-2">
          <div className="w-full max-w-sm px-4 sm:px-0">
            <div className="w-full h-64 sm:h-72 md:h-72 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
              <img 
                src={CounselingImg} 
                alt="Career Counseling illustration" 
                className="object-contain h-56 sm:h-64 w-auto max-w-full" 
                draggable="false" 
              />
            </div>
          </div>
        </div>

        <div className="w-full md:w-7/12 px-4 sm:px-0">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6 font-['Public_Sans']">
            What you learn?
          </h3>
          <ol className="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
            {learningPoints.map((point, idx) => (
              <li key={idx} className="font-['Public_Sans']">
                <strong className="font-semibold text-gray-900">
                  {idx + 1}. {point.title}:
                </strong>
                <br className="mb-1" /> 
                <span className="inline-block mt-1">{point.desc}</span>
              </li>
            ))}
          </ol>

          <div className="mt-8 sm:mt-10 text-center md:text-left">
            <Link 
              to="/apply" 
              className="inline-block w-full sm:w-auto bg-orange-500 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg shadow-md hover:bg-orange-600 active:bg-orange-700 transition-all duration-200 hover:shadow-lg font-['Public_Sans'] text-sm sm:text-base touch-manipulation"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FFFDFB]">
      <div className={`max-w-7xl mx-auto ${isMobile ? 'px-4' : 'px-6 sm:px-8 lg:px-16'} py-6 sm:py-8`}>
        <nav className={`text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 font-['Public_Sans'] ${isMobile ? '' : 'px-4'} overflow-x-auto`}>
          <div className="inline-flex items-center gap-2 whitespace-nowrap min-w-max">
            <Link 
              to="/counseling" 
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200 touch-manipulation"
            >
              Counseling
            </Link>
            <span className="mx-2 text-gray-400">|</span>
            <Link 
              to="/counseling/career" 
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200 touch-manipulation"
            >
              Career counseling
            </Link>
          </div>
        </nav> 

        <div className={`mb-3 sm:mb-4 ${isMobile ? '' : 'px-4'}`}>
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 p-2 -ml-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 touch-manipulation min-h-[44px] min-w-[44px]" 
            aria-label="Go back"
          >
            <ArrowLeft size={isMobile ? 20 : 24} />
          </button>
        </div>

        <div className={`mb-4 sm:mb-6 ${isMobile ? '' : 'px-4'}`}>
          <h1 className="font-bold text-2xl sm:text-3xl text-gray-900 font-['Public_Sans']">
            Categories
          </h1>
        </div>

        <div className="relative mb-6 sm:mb-8 z-10">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="px-4 sm:px-0">
              <CounselingTabs tabs={tabs} />
            </div>
          </div>
        </div>

        <div className="relative mt-6 sm:mt-8 z-0 min-h-[400px]">
          {renderContent()}
        </div>

        <div className="h-12 sm:h-16"></div>
      </div>

      {/* Add custom styles for better mobile experience */}
      <style jsx>{`
        @media (max-width: 640px) {
          * {
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
          }
        }
        
        /* Hide scrollbar but keep functionality */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Smooth scroll behavior */
        .scrollbar-hide {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
      `}</style>
    </div>
  );
}