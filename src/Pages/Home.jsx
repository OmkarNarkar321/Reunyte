import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [upcomingCurrentIndex, setUpcomingCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [upcomingIsDragging, setUpcomingIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [upcomingStartX, setUpcomingStartX] = useState(0);
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

  // Fixed navigation - 2 slides for 5 cards (desktop), mobile: 1 card per slide
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
      window.location.href = link;
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
      window.location.href = link;
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
      className="flex-shrink-0 rounded-2xl shadow-lg relative text-white overflow-hidden transition-all duration-300 hover:shadow-xl"
      style={{ 
        width: isMobile ? '320px' : '360px',
        height: isMobile ? '260px' : '270px'
      }}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`}></div>

      {/* Card Content */}
      <div className="relative z-10 p-4 h-full flex flex-col">
        {/* Title section */}
        <div className="mb-2">
          <h3 className="text-lg md:text-xl font-bold text-white">
            {card.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-[14px] leading-relaxed text-white/90 font-medium mb-1 max-w-[100%]">
          {card.desc}
        </p>

        {/* Bottom section */}
        <div className="mt-auto flex items-end justify-between">
          {/* Know More Button */}
          <button
            className="bg-white font-semibold py-1.5 px-3 rounded-md shadow-md hover:bg-gray-100 transition-all duration-200 text-[12px] hover:scale-105"
            style={{ color: card.buttonTextColor }}
            onClick={(e) => {
              e.stopPropagation();
              if (!isDragging && !upcomingIsDragging) {
                isUpcoming ? handleUpcomingCardClick(card.link) : handleCardClick(card.link);
              }
            }}
          >
            {isUpcoming ? 'Upcoming...' : 'Know more'}
          </button>

          {/* Image container - Right side with fixed dimensions and positioning */}
          <div className={`flex-shrink-0 flex items-center justify-center ml-2 ${isMobile ? 'w-48 h-36' : 'w-56 h-40'}`}>
            <img
              src={card.image}
              alt={card.alt}
              className="max-w-full max-h-full object-contain object-center"
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
      <div className="relative w-full max-w-10xl mx-auto">
        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
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
              gap: `${gap}px`,
            }}
          >
            {cardsData.map((card, index) =>
              renderCard(card, index, isUpcoming)
            )}
          </div>
        </div>

        {/* Left arrow */}
        {currentIdx > 0 && (
          <button
            onClick={prevHandler}
            className="absolute top-1/2 -left-4 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 z-20 hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700"/>
          </button>
        )}

        {/* Right arrow */}
        {currentIdx < totalSlidesCount - 1 && (
          <button
            onClick={nextHandler}
            className="absolute top-1/2 -right-4 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300 z-20 hover:scale-110"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        )}

        {/* Dots */}
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
      {/* CTA Section */}
      <section className="flex flex-col items-center justify-center text-center py-16 px-4" style={{ backgroundColor: '#FFFDFB' }}>
        <h1
          className="text-[#ED9455] font-bold text-4xl md:text-5xl mb-4"
          style={{ fontFamily: "Domine, serif" }}
        >
          Welcome to xplore!
        </h1>

        <p
          className="text-gray-700 text-[26px] leading-[43px] max-w-[650px] mb-8"
          style={{ fontFamily: "Domine, serif" }}
        >
          Login with us to learn and earn
        </p>

        <button
          onClick={() => (window.location.href = "/login")}
          className="bg-[#ED9455] text-white font-medium py-3 px-8 rounded-2xl shadow-lg hover:bg-[#d87f40] hover:shadow-xl transition-all duration-300 flex items-center gap-3 transform hover:scale-105"
          style={{ fontFamily: "Public Sans" }}
        >
          Login here <span className="text-lg">→</span>
        </button>
      </section>

      {/* Opportunities Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#FFFDFB] to-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-3xl font-bold text-gray-800 mb-10"
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

      {/* Upcoming Opportunities Section - Added extra padding bottom to prevent overlap */}
      <section className="py-16 px-4 pb-32 bg-gradient-to-b from-gray-50 to-[#FFFDFB]">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2
              className="text-3xl font-bold text-gray-800"
              style={{ fontFamily: "Domine, serif" }}
            >
              Upcoming Opportunities...
            </h2>
            <button
              className="text-[#ED9455] font-semibold text-lg hover:text-[#d87f40] transition-colors duration-300"
              style={{ fontFamily: "Public Sans" }}
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

      {/* Spacer */}
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
                  onClick={() => (window.location.href = "/register")}
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
    </>
  );
}