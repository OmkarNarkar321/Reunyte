// src/Pages/Hackathon/HackathonSelectionPage.jsx

import React, { useState, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import CitySelectionModal from './CitySelectionModal';
import HackathonDetailsModal from './HackathonDetailsModal';
import { getAllStates } from './stateData';

const HackathonSelectionPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isHackathonModalOpen, setIsHackathonModalOpen] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const allStates = useMemo(() => getAllStates(), []);

  const navigate = useCallback((direction) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => direction === 'prev' 
      ? (prev === 0 ? allStates.length - 1 : prev - 1)
      : (prev === allStates.length - 1 ? 0 : prev + 1)
    );
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, allStates.length]);

  const getStateAtPosition = useCallback((offset) => {
    const index = (currentIndex + offset + allStates.length) % allStates.length;
    return allStates[index];
  }, [currentIndex, allStates]);

  const handleSideClick = useCallback((offset, e) => {
    e.stopPropagation();
    if (!isAnimating) navigate(offset === -1 ? 'prev' : 'next');
  }, [isAnimating, navigate]);

  const handleCenterClick = useCallback((state, e) => {
    e.stopPropagation();
    if (state.isAvailable) {
      setSelectedState(state.name);
      setIsCityModalOpen(true);
    }
  }, []);

  const handleCitySelect = useCallback((cityName) => {
    setSelectedCity(cityName);
    setIsCityModalOpen(false);
    setIsHackathonModalOpen(true);
  }, []);

  const handleBackToCities = useCallback(() => {
    setIsHackathonModalOpen(false);
    setIsCityModalOpen(true);
  }, []);

  const handleCloseAll = useCallback(() => {
    setIsCityModalOpen(false);
    setIsHackathonModalOpen(false);
    setSelectedState(null);
    setSelectedCity(null);
  }, []);

  const getImgSize = (size) => ({
    'w-64 h-64': '192px', 'w-44 h-44': '112px', 'w-52 h-52': '144px', 'w-36 h-36': '80px'
  }[size] || '80px');

  const renderStateCircle = useCallback((state, size, isCenter, position) => {
    const { isAvailable, gradient, image, name } = state;
    const imgSize = getImgSize(size);
    
    return (
      <div className="flex flex-col items-center pointer-events-none">
        <div 
          className={`${size} rounded-full shadow-2xl flex items-center justify-center transition-all duration-400 relative group pointer-events-auto ${
            isAvailable ? 'cursor-pointer' : 'cursor-not-allowed'
          } ${!isCenter && isAvailable ? 'hover:scale-105 hover:shadow-3xl' : ''}`}
          style={{ background: gradient, opacity: isAvailable ? 1 : 0.4, filter: isAvailable ? 'none' : 'grayscale(70%)', willChange: 'transform, opacity' }}
        >
          <img src={image} alt={name} className={`object-contain drop-shadow-2xl transition-transform duration-400 pointer-events-none ${isAvailable && isCenter ? 'group-hover:scale-105' : ''}`} style={{ width: imgSize, height: imgSize, willChange: 'transform' }} />
          
          {!isAvailable && (
            <div className="absolute inset-0 rounded-full bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center pointer-events-none">
              <div className="bg-white/90 rounded-full p-2 sm:p-3 mb-1 sm:mb-2 shadow-lg">
                <Lock className="w-4 h-4 sm:w-6 sm:h-6 text-gray-700" />
              </div>
              {isCenter && <div className="bg-white/90 rounded-full px-3 py-0.5 sm:px-4 sm:py-1 shadow-lg"><p className="text-[10px] sm:text-xs font-bold text-gray-700">Coming Soon</p></div>}
            </div>
          )}
          
          {isAvailable && isCenter && (
            <>
              <div className="absolute inset-0 rounded-full border-2 sm:border-4 border-white/30 animate-ping-slow pointer-events-none" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 sm:px-6 sm:py-2 shadow-xl">
                  <p className="text-white font-bold text-xs sm:text-sm">Click to explore</p>
                </div>
              </div>
            </>
          )}
          
          {!isCenter && isAvailable && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 shadow-xl border-2 border-white">
                <p className="text-gray-800 font-bold text-[10px] sm:text-xs">Click to view</p>
              </div>
            </div>
          )}
        </div>
        
        {position !== 'far' && (
          <p className={`text-center mt-2 sm:mt-3 ${isCenter ? 'text-lg sm:text-xl md:text-2xl' : 'text-sm sm:text-base'} font-semibold transition-all duration-400 pointer-events-none ${isAvailable ? 'text-gray-800' : 'text-gray-500'}`}>{name}</p>
        )}
        
        {!isAvailable && isCenter && (
          <div className="mt-3 sm:mt-4 bg-orange-100 border-2 border-orange-300 rounded-xl px-4 py-2 sm:px-6 sm:py-3 shadow-lg animate-fadeIn pointer-events-none">
            <p className="text-orange-800 font-semibold text-xs sm:text-sm text-center">🔒 Not available in {name} yet</p>
            <p className="text-orange-600 text-[10px] sm:text-xs text-center mt-1">We're expanding soon!</p>
          </div>
        )}
      </div>
    );
  }, []);

  const carouselItems = useMemo(() => [
    { offset: -2, pos: { left: '8%', top: '45%', transform: 'translateY(-50%) scale(0.45)', opacity: 0.25, zIndex: 1, filter: 'blur(1px)' }, size: 'w-36 h-36', type: 'far', show: 'hidden lg:block' },
    { offset: -1, pos: { left: '20%', top: '45%', transform: 'translateY(-50%) scale(0.75)', opacity: 0.65, zIndex: 5 }, size: 'w-44 h-44', type: 'side', onClick: handleSideClick, show: 'hidden sm:block' },
    { offset: 0, pos: { left: '50%', top: '45%', transform: 'translate(-50%, -50%) scale(1)', opacity: 1, zIndex: 10 }, size: 'w-64 h-64', type: 'center', onClick: handleCenterClick },
    { offset: 1, pos: { right: '20%', top: '45%', transform: 'translateY(-50%) scale(0.75)', opacity: 0.65, zIndex: 5 }, size: 'w-44 h-44', type: 'side', onClick: handleSideClick, show: 'hidden sm:block' },
    { offset: 2, pos: { right: '8%', top: '45%', transform: 'translateY(-50%) scale(0.45)', opacity: 0.25, zIndex: 1, filter: 'blur(1px)' }, size: 'w-36 h-36', type: 'far', show: 'hidden lg:block' }
  ], [handleSideClick, handleCenterClick]);

  const NavBtn = ({ dir, onClick }) => (
    <button onClick={onClick} disabled={isAnimating} className={`absolute ${dir === 'prev' ? 'left-0 sm:left-2 md:left-4' : 'right-0 sm:right-2 md:right-4'} z-30 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-50 transition-all duration-300 flex items-center justify-center shadow-xl hover:scale-110 active:scale-95`} style={{ top: '40%', transform: 'translateY(-50%)' }}>
      {dir === 'prev' ? <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" /> : <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />}
    </button>
  );

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#E8FFD3' }}>
      <div className="relative px-4 sm:px-6 md:px-12 py-6 sm:py-8 md:py-12">
        <div className="absolute left-2 sm:left-6 md:left-10 top-8 sm:top-12 md:top-20 z-20">
          <div className="w-32 h-36 sm:w-40 sm:h-48 md:w-50 md:h-60 rounded-full">
            <img src="/src/assets/HackathonPage/Hackathonhero.png" alt="Hackathon Hero Badge" className="w-full h-full object-contain" />
          </div>
        </div>

        <div className="text-center pt-0 sm:pt-2 mb-4 sm:mb-6 md:mb-8 relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-orange-600 tracking-wider drop-shadow-lg px-4" style={{ fontFamily: "'Nosifer', cursive", textShadow: '3px 3px 6px rgba(0,0,0,0.15), 0px 2px 4px rgba(255,140,0,0.3)' }}>
            HACKATHON SELECTION
          </h1>
        </div>

        <div className="flex justify-center items-center mt-2 sm:mt-4 relative">
          <div className="absolute left-0 right-0 max-h-screen -mx-4 sm:-mx-6 md:-mx-12">
            <img src="/src/assets/HackathonPage/gradient.png" alt="Gradient Background" className="w-full h-full object-cover" />
          </div>
          <div className="w-full max-w-5xl h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] relative flex items-center justify-center z-10">
            <img src="/src/assets/HackathonPage/India.png" alt="India Hackathon Illustration" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>

      <div className="relative px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-20 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3" style={{ fontFamily: "'Domine', serif" }}>
              Select Your State <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">→</span>
            </h2>
          </div>

          <div className="relative flex items-center justify-center h-[400px] sm:h-[500px] md:h-[530px] lg:h-[550px]">
            <NavBtn dir="prev" onClick={() => navigate('prev')} />
            
            <div className="relative w-full h-full flex items-center justify-center perspective-1000">
              {carouselItems.map(({ offset, pos, size, type, onClick, show }) => {
                const state = getStateAtPosition(offset);
                
                return (
                  <div key={`${offset}-${state.name}`} className={`${show || ''} absolute transition-all duration-500 ease-in-out`} style={pos} onClick={onClick ? (e) => onClick(offset === 0 ? state : offset, e) : undefined}>
                    {renderStateCircle(state, size, offset === 0, type)}
                  </div>
                );
              })}
            </div>

            <NavBtn dir="next" onClick={() => navigate('next')} />
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <p className="text-base sm:text-lg text-gray-600 font-semibold">{currentIndex + 1} / {allStates.length}</p>
          </div>
        </div>
      </div>

      <CitySelectionModal isOpen={isCityModalOpen} onClose={handleCloseAll} selectedState={selectedState} onCitySelect={handleCitySelect} />
      <HackathonDetailsModal isOpen={isHackathonModalOpen} onClose={handleCloseAll} selectedState={selectedState} selectedCity={selectedCity} onBack={handleBackToCities} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nosifer&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Domine:wght@400;500;600;700&display=swap');
        .perspective-1000{perspective:1000px}
        @keyframes ping-slow{0%,100%{transform:scale(1);opacity:.3}50%{transform:scale(1.08);opacity:0}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .animate-ping-slow{animation:ping-slow 2.5s ease-in-out infinite}
        .animate-fadeIn{animation:fadeIn .4s ease-out}
        .duration-400{transition-duration:400ms}
        .shadow-3xl{box-shadow:0 20px 40px -12px rgba(0,0,0,.3)}
        @media(max-width:640px){.perspective-1000{perspective:600px}}
      `}</style>
    </div>
  );
};

export default HackathonSelectionPage;