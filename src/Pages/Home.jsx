import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [upcomingCurrentIndex, setUpcomingCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [upcomingIsDragging, setUpcomingIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [upcomingStartX, setUpcomingStartX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse move handler for parallax effect
  const handleParallaxMouseMove = useCallback((e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 20,
      y: (e.clientY / window.innerHeight) * 20
    });
  }, []);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add mouse move listener for parallax
  useEffect(() => {
    window.addEventListener('mousemove', handleParallaxMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleParallaxMouseMove);
  }, [handleParallaxMouseMove]);

  // Animated blobs configuration
  const blobs = useMemo(() => [
    { pos: 'top-10 left-10', color: 'bg-orange-200', delay: 0, x: 1, y: 1, size: 'w-64 h-64' },
    { pos: 'top-32 right-20', color: 'bg-yellow-200', delay: 2000, x: -1, y: 1, size: 'w-72 h-72' },
    { pos: 'bottom-20 left-1/4', color: 'bg-orange-300', delay: 4000, x: 1, y: -1, size: 'w-80 h-80' },
    { pos: 'top-1/2 right-10', color: 'bg-pink-200', delay: 3000, x: -1, y: -1, size: 'w-56 h-56' }
  ], []);

  const cards = [
    {
      title: "Counseling",
      desc: "Helps journey towards peak",
      link: "/counseling",
      gradient: "from-[#6A6999] to-[#B1AFFF]",
      buttonTextColor: "#6A6999",
      image: "/src/assets/Homepage/Counseling.png",
      alt: "Counseling services"
    },
    {
      title: "Practices",
      desc: "For a successful journey",
      link: "/practice",
      gradient: "from-[#8B5B79] to-[#F19ED2]",
      buttonTextColor: "#8B5B79",
      image: "/src/assets/Homepage/practice.png",
      alt: "Practice sessions"
    },
    {
      title: "Hackathon",
      desc: "To improve knowledge",
      link: "/hackathon",
      gradient: "from-[#5A714D] to-[#ACD793]",
      buttonTextColor: "#7FA068",
      image: "/src/assets/Homepage/hackthon.png",
      alt: "Hackathon events"
    },
    {
      title: "Courses",
      desc: "Learn with structured paths",
      link: "/courses",
      gradient: "from-[#397277] to-[#6AD4DD]",
      buttonTextColor: "#397277",
      image: "/src/assets/Homepage/Courses.png",
      alt: "Course materials"
    },
    {
      title: "Startup Services",
      desc: "Support for your ideas",
      link: "/startup",
      gradient: "from-[#A67B06] to-[#CDCE82]",
      buttonTextColor: "#A67B06",
      image: "/src/assets/Homepage/StartupServices.png",
      alt: "Startup support"
    },
  ];

  const upcomingCards = [
    {
      title: "Internship",
      desc: "Opportunity to work on real-world projects",
      status: "Upcoming...",
      link: "/internship",
      gradient: "from-[#93AC4B] to-[#FFF7AF]",
      buttonTextColor: "#93AC4B",
      image: "/src/assets/Homepage/Internship.png",
      alt: "Internship opportunities"
    },
    {
      title: "Go-kart Students",
      desc: "Accelerate your skills",
      status: "Upcoming...",
      link: "/gokart",
      gradient: "from-[#5B888B] to-[#9EDDF1]",
      buttonTextColor: "#4A9B9B",
      image: "/src/assets/Homepage/Gokart.png",
      alt: "Go-kart racing"
    },
    {
      title: "Formula Students",
      desc: "Showcase skills, talent",
      status: "Upcoming...",
      link: "/formula",
      gradient: "from-[#974F4F] to-[#D79B9B]",
      buttonTextColor: "#974F4F",
      image: "/src/assets/Homepage/Formula.png",
      alt: "Formula racing"
    },
    {
      title: "Industrial Visit",
      desc: "Build tomorrow's solutions",
      status: "Upcoming...",
      link: "/innovation",
      gradient: "from-[#50934A] to-[#C9FFAF]",
      buttonTextColor: "#50934A",
      image: "/src/assets/Homepage/IndustrialVisit.png",
      alt: "Innovation laboratory"
    },
    {
      title: "Interview Prep",
      desc: "Master your interview skills",
      status: "Upcoming...",
      link: "/interview",
      gradient: "from-[#AC17BF] to-[#D088D9]",
      buttonTextColor: "#AC17BF",
      image: "/src/assets/Homepage/Interviewprep.png",
      alt: "Interview preparation"
    },
  ];

  const totalSlides = isMobile ? cards.length : 2;
  const upcomingTotalSlides = isMobile ? upcomingCards.length : 2;

  // Opportunities Section Handlers
  const nextSlide = () => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleCardClick = (link) => {
    if (!isDragging) {
      navigate(link);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(false);
    setStartX(e.pageX || e.touches?.[0]?.pageX);
  };

  const handleMouseMove = (e) => {
    if (startX === 0) return;
    
    const currentX = e.pageX || e.touches?.[0]?.pageX;
    const diffX = startX - currentX;
    
    if (Math.abs(diffX) > 50) {
      setIsDragging(true);
      if (diffX > 0 && currentIndex < totalSlides - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (diffX < 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
      setStartX(0);
    }
  };

  const handleMouseUp = () => {
    setTimeout(() => setIsDragging(false), 100);
    setStartX(0);
  };

  // Upcoming handlers
  const upcomingNextSlide = () => {
    if (upcomingCurrentIndex < upcomingTotalSlides - 1) {
      setUpcomingCurrentIndex(upcomingCurrentIndex + 1);
    }
  };

  const upcomingPrevSlide = () => {
    if (upcomingCurrentIndex > 0) {
      setUpcomingCurrentIndex(upcomingCurrentIndex - 1);
    }
  };

  const upcomingGoToSlide = (index) => {
    setUpcomingCurrentIndex(index);
  };

  const handleUpcomingCardClick = (link) => {
    if (!upcomingIsDragging) {
      navigate(link);
    }
  };

  const handleUpcomingMouseDown = (e) => {
    setUpcomingIsDragging(false);
    setUpcomingStartX(e.pageX || e.touches?.[0]?.pageX);
  };

  const handleUpcomingMouseMove = (e) => {
    if (upcomingStartX === 0) return;
    
    const currentX = e.pageX || e.touches?.[0]?.pageX;
    const diffX = upcomingStartX - currentX;
    
    if (Math.abs(diffX) > 50) {
      setUpcomingIsDragging(true);
      if (diffX > 0 && upcomingCurrentIndex < upcomingTotalSlides - 1) {
        setUpcomingCurrentIndex(upcomingCurrentIndex + 1);
      } else if (diffX < 0 && upcomingCurrentIndex > 0) {
        setUpcomingCurrentIndex(upcomingCurrentIndex - 1);
      }
      setUpcomingStartX(0);
    }
  };

  const handleUpcomingMouseUp = () => {
    setTimeout(() => setUpcomingIsDragging(false), 100);
    setUpcomingStartX(0);
  };

  const renderCard = (card, index, isUpcoming = false) => (
    <div
      key={index}
      className="flex-shrink-0 rounded-2xl shadow-lg relative text-white overflow-hidden group card-hover-lift"
      style={{ 
        width: isMobile ? '320px' : '360px',
        height: isMobile ? '260px' : '270px'
      }}
    >
      {/* Gradient background with shine effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} transition-all duration-500 group-hover:scale-105`}></div>
      
      {/* Animated shine overlay on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
      </div>

      <div className="relative z-10 p-4 h-full flex flex-col">
        <div className="mb-2">
          <h3 className="text-lg md:text-xl font-bold text-white transition-transform duration-300 group-hover:translate-x-1">
            {card.title}
          </h3>
        </div>

        <p className="text-[14px] leading-relaxed text-white/90 font-medium mb-1 max-w-[100%] transition-all duration-300 group-hover:text-white">
          {card.desc}
        </p>

        <div className="mt-auto flex items-end justify-between">
          <button
            className="bg-white font-semibold py-1.5 px-3 rounded-md shadow-md hover:bg-gray-100 transition-all duration-300 text-[12px] hover:scale-110 hover:shadow-lg transform relative overflow-hidden group/btn"
            style={{ color: card.buttonTextColor }}
            onClick={(e) => {
              e.stopPropagation();
              if (!isDragging && !upcomingIsDragging) {
                isUpcoming ? handleUpcomingCardClick(card.link) : handleCardClick(card.link);
              }
            }}
          >
            {/* Button ripple effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover/btn:opacity-100 group-hover/btn:animate-button-shine pointer-events-none"></span>
            <span className="relative z-10">{isUpcoming ? 'Upcoming...' : 'Know more'}</span>
          </button>

          <div className={`flex-shrink-0 flex items-center justify-center ml-2 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${isMobile ? 'w-48 h-36' : 'w-56 h-40'}`}>
            <img
              src={card.image}
              alt={card.alt}
              className="max-w-full max-h-full object-contain object-center filter drop-shadow-lg"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const CARDS_PER_SLIDE = 3;
  const renderCarousel = (
    cardsData,
    currentIdx,
    totalSlidesCount,
    prevHandler,
    nextHandler,
    goToHandler,
    mouseHandlers,
    isUpcoming = false
  ) => {
    const cardWidth = isMobile ? 320 : 360;
    const gap = 20;
    const totalCardWidth = cardWidth + gap;

    const translateValue = isMobile 
      ? currentIdx * (cardWidth + gap)
      : currentIdx * (totalCardWidth * (CARDS_PER_SLIDE - 1));

    return (
      <div className="relative w-full max-w-10xl mx-auto" style={{ padding: '20px 0' }}>
        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
          style={{ margin: '-20px 0', padding: '20px 0' }}
          onMouseDown={mouseHandlers.onMouseDown}
          onMouseMove={mouseHandlers.onMouseMove}
          onMouseUp={mouseHandlers.onMouseUp}
          onTouchStart={mouseHandlers.onMouseDown}
          onTouchMove={mouseHandlers.onMouseMove}
          onTouchEnd={mouseHandlers.onMouseUp}
        >
          <div
            className={`flex transition-transform duration-500 ease-out ${isMobile ? 'justify-start pl-6' : ''}`}
            style={{
              transform: `translateX(-${translateValue}px)`,
              gap: `${gap}px`
            }}
          >
            {cardsData.map((card, index) =>
              renderCard(card, index, isUpcoming)
            )}
          </div>
        </div>

        {currentIdx > 0 && (
          <button
            onClick={prevHandler}
            className="absolute top-1/2 -left-4 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 z-20 hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700"/>
          </button>
        )}

        {currentIdx < totalSlidesCount - 1 && (
          <button
            onClick={nextHandler}
            className="absolute top-1/2 -right-4 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 z-20 hover:scale-110"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        )}

        {totalSlidesCount > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalSlidesCount }, (_, index) => (
              <button
                key={index}
                onClick={() => goToHandler(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 hover:scale-125 ${
                  currentIdx === index
                    ? "bg-[#ED9455] shadow-md"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* CTA Section with Dynamic Background */}
      <section className="relative flex flex-col items-center justify-center text-center py-20 px-4 overflow-hidden" style={{ backgroundColor: '#FFFDFB' }}>
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {blobs.map((blob, i) => (
            <div 
              key={i}
              className={`absolute ${blob.pos} ${blob.size} ${blob.color} rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob`}
              style={{ 
                transform: `translate(${mousePosition.x * blob.x}px, ${mousePosition.y * blob.y}px)`,
                animationDelay: `${blob.delay}ms`
              }}
            />
          ))}
        </div>

        {/* Content - with z-index to appear above blobs */}
        <div className="relative z-10 animate-fadeInUp">
          {/* Sparkles Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg mb-6 border border-orange-200 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 animate-pulse" />
            <span className="text-orange-600 font-semibold text-xs sm:text-sm tracking-wide">START YOUR JOURNEY</span>
          </div>

          <h1
            className="text-[#ED9455] font-bold text-4xl md:text-5xl mb-4 animate-fadeInUp"
            style={{ fontFamily: "Domine, serif", animationDelay: '400ms' }}
          >
            Welcome to <span className="relative inline-block">
              xplore!
              <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
                <path d="M2 8C41.7 3.7 160.3 -1.7 198 8" stroke="#ED9455" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>

          <p
            className="text-gray-700 text-[26px] leading-[43px] max-w-[650px] mb-8 animate-fadeInUp"
            style={{ fontFamily: "Domine, serif", animationDelay: '600ms' }}
          >
            Login with us to learn and earn
          </p>

          <button
            onClick={() => navigate("/login")}
            className="bg-[#ED9455] text-white font-medium py-3 px-8 rounded-2xl shadow-lg hover:bg-[#d87f40] hover:shadow-xl transition-all duration-300 flex items-center gap-3 transform hover:scale-105 mx-auto animate-fadeInUp"
            style={{ fontFamily: "Public Sans", animationDelay: '800ms' }}
          >
            Login here <span className="text-lg">→</span>
          </button>
        </div>
      </section>

      {/* Opportunities Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#FFFDFB] to-gray-50 relative">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl font-bold text-gray-800 mb-10 animate-fadeInUp"
            style={{ fontFamily: "Domine, serif" }}
          >
            Opportunities
          </h2>

          {renderCarousel(
            cards,
            currentIndex,
            totalSlides,
            prevSlide,
            nextSlide,
            goToSlide,
            {
              onMouseDown: handleMouseDown,
              onMouseMove: handleMouseMove,
              onMouseUp: handleMouseUp
            },
            false
          )}
        </div>
      </section>

      {/* Upcoming Opportunities Section */}
      <section className="py-16 px-4 pb-32 bg-gradient-to-b from-gray-50 to-[#FFFDFB] relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2
              className="text-3xl font-bold text-gray-800 animate-fadeInUp"
              style={{ fontFamily: "Domine, serif" }}
            >
              Upcoming Opportunities...
            </h2>
            <button
              className="text-[#ED9455] font-semibold text-lg hover:text-[#d87f40] transition-colors duration-300 animate-fadeInUp"
              style={{ fontFamily: "Public Sans", animationDelay: '200ms' }}
            >
              See all →
            </button>
          </div>

          {renderCarousel(
            upcomingCards,
            upcomingCurrentIndex,
            upcomingTotalSlides,
            upcomingPrevSlide,
            upcomingNextSlide,
            upcomingGoToSlide,
            {
              onMouseDown: handleUpcomingMouseDown,
              onMouseMove: handleUpcomingMouseMove,
              onMouseUp: handleUpcomingMouseUp
            },
            true
          )}
        </div>
      </section>

      <div className="h-10 md:h-10" style={{ backgroundColor: '#FFFDFB' }}></div>

      {/* CTA Section - Elevate your career */}
      <section className="py-10 px-4" style={{ backgroundColor: '#FFFDFB' }}>
        <div className="max-w-6xl mx-auto">
          <div 
            className="relative rounded-3xl shadow-2xl"
            style={{
              background: '#BBE9FF',
              height: isMobile ? '280px' : '350px'
            }}
          >
            {/* Inner container with overflow hidden for decorative images only */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              {/* Ellipse shape at the bottom - clipped inside box */}
              <div className={`absolute left-0 bottom-0 z-0 ${isMobile ? 'hidden' : 'block'}`}>
                <img
                  src="/src/assets/Homepage/Ellipse21.png"
                  alt=""
                  className="w-[700px] h-[600px] object-contain opacity-70"
                  style={{ 
                    transform: 'translateY(40%) translateX(-30px)',
                    transformOrigin: 'bottom left'
                  }}
                  draggable="false"
                />
              </div>

              {/* Triangular shape on right side - clipped inside box */}
              <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-0 ${isMobile ? 'hidden' : 'block'}`}>
                <img
                  src="/src/assets/Homepage/Group50.png"
                  alt=""
                  className="w-[359px] h-[380px] object-contain opacity-70"
                  style={{ 
                    transform: 'translateX(24%)',
                    transformOrigin: 'right center'
                  }}
                  draggable="false"
                />
              </div>
            </div>

            {/* Content container - NO overflow hidden, so employee can overflow */}
            <div className="relative z-10 h-full flex items-center">
              {/* Left side - Employee images - CAN overflow outside */}
              <div className={`flex-shrink-0 h-full relative flex items-center justify-center ${
                isMobile ? 'w-2/5' : 'w-1/2'
              }`}>
                <div className="relative" style={{ marginTop: isMobile ? '0px' : '-80px' }}>
                  <img
                    src="/src/assets/Homepage/Employee.png"
                    alt="Professional employees"
                    className={`object-contain relative z-20 ${
                      isMobile ? 'h-[240px] w-auto' : 'h-[430px] w-auto'
                    }`}
                    draggable="false"
                  />
                </div>
              </div>

              {/* Right side - Text content */}
              <div className={`flex-1 flex flex-col justify-center items-start relative z-20 ${
                isMobile ? 'px-4 pr-6' : 'px-8'
              }`}>
                <h2 
                  className={`font-extrabold text-gray-800 mb-2 leading-tight ${
                    isMobile ? 'text-2xl' : 'text-4xl md:text-4.5xl'
                  }`}
                  style={{ fontFamily: "Public Sans" }}
                >
                  Elevate your career with us
                </h2>
                
                <p 
                  className={`text-gray-600 mb-6 leading-tight ${
                    isMobile ? 'text-lg mb-4' : 'text-2xl mb-8'
                  }`}
                  style={{ fontFamily: "Public Sans" }}
                >
                  do professional, be professional
                </p>

                <button
                  onClick={() => navigate("/register")}
                  className={`bg-[#FFEC9E] text-gray-800 font-semibold rounded-2xl shadow-lg hover:bg-[#ffe680] hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                    isMobile ? 'py-3 px-6 text-sm' : 'py-4 px-8'
                  }`}
                  style={{ fontFamily: "Public Sans" }}
                >
                  Register as employer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        @keyframes button-shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-blob { 
          animation: blob 7s infinite; 
        }
        .animate-fadeInUp { 
          animation: fadeInUp 0.8s ease-out forwards; 
          opacity: 0;
        }
        .animate-shine {
          animation: shine 2s ease-in-out;
        }
        .animate-button-shine {
          animation: button-shine 0.6s ease-out;
        }
        .card-hover-lift {
          transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.5s ease;
          will-change: transform;
        }
        .card-hover-lift:hover {
          transform: translateY(-12px);
          box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.1);
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-blob, .animate-fadeInUp, .animate-pulse, .animate-shine, .animate-button-shine {
            animation: none !important;
            opacity: 1 !important;
          }
          .hover\\:scale-105:hover, .hover\\:scale-110:hover, .hover\\:scale-125:hover, .card-hover-lift:hover {
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
}