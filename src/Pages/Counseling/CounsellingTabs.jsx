import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const CounselingTabs = ({ tabs }) => {
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
    <div 
      className="w-full py-2 sm:py-4"
      style={{ 
        position: 'relative',
        zIndex: 50,
        isolation: 'isolate'
      }}
    >
      <div 
        className={`flex ${isMobile ? 'gap-3 overflow-x-auto pl-1' : 'gap-4 md:gap-6'}`}
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingBottom: '8px',
          paddingRight: isMobile ? '16px' : '0'
        }}
      >
        {tabs.map((tab, index) => (
          <NavLink
            key={index}
            to={tab.path}
            className={({ isActive }) =>
              `${isMobile ? 'flex-shrink-0 min-w-[130px]' : 'flex-1 max-w-[200px]'} 
              text-center py-3 px-4 sm:px-6 rounded-xl font-semibold transition-all duration-300 
              whitespace-nowrap text-sm sm:text-base
              ${isActive
                ? "bg-yellow-400 text-black shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-gray-900 active:bg-yellow-200"}`
            }
            style={{
              fontFamily: "Public Sans",
              cursor: 'pointer',
              userSelect: 'none',
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation',
              position: 'relative',
              zIndex: 100,
              pointerEvents: 'auto'
            }}
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
      
      {/* Hide scrollbar with CSS */}
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CounselingTabs;