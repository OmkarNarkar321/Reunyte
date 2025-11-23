import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { BookOpen, Sparkles, Rocket, Zap, Users, Award } from 'lucide-react';

const Courses = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 20,
      y: (e.clientY / window.innerHeight) * 20
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const features = useMemo(() => [
    {
      icon: Rocket,
      title: 'Expert-Led Courses',
      description: 'Learn from industry professionals with years of real-world experience in their fields.',
      gradient: 'from-orange-400 to-orange-500',
      delay: 200
    },
    {
      icon: Zap,
      title: 'Interactive Learning',
      description: 'Engage with hands-on projects, quizzes, and real-world scenarios that accelerate your growth.',
      gradient: 'from-yellow-400 to-orange-400',
      delay: 400
    },
    {
      icon: Award,
      title: 'Certified Success',
      description: 'Earn industry-recognized certifications that boost your career prospects and credibility.',
      gradient: 'from-orange-500 to-red-400',
      delay: 600
    }
  ], []);

  const blobs = useMemo(() => [
    { pos: 'top-20 left-10', color: 'bg-orange-200', delay: 0, x: 1, y: 1 },
    { pos: 'top-40 right-10', color: 'bg-yellow-200', delay: 2000, x: -1, y: 1 },
    { pos: '-bottom-8 left-1/2', color: 'bg-orange-300', delay: 4000, x: 1, y: -1 }
  ], []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-orange-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {blobs.map((blob, i) => (
          <div 
            key={i}
            className={`absolute ${blob.pos} w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72 ${blob.color} rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob`}
            style={{ 
              transform: `translate(${mousePosition.x * blob.x}px, ${mousePosition.y * blob.y}px)`,
              animationDelay: `${blob.delay}ms`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-6xl w-full">
          <div className="text-center mb-12 sm:mb-16 animate-fadeInUp">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg mb-6 sm:mb-8 border border-orange-200">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 animate-pulse" />
              <span className="text-orange-600 font-semibold text-xs sm:text-sm tracking-wide">LAUNCHING SOON</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2" style={{ fontFamily: "Domine, serif" }}>
              Something <span className="text-orange-400 relative inline-block">
                Exciting
                <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C41.7 3.7 160.3 -1.7 198 8" stroke="#FB923C" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
              <br />is Coming Your Way
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              We're building an extraordinary learning platform that will transform how you acquire new skills and knowledge.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 px-2">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={idx}
                  className="group bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 animate-fadeInUp"
                  style={{ animationDelay: `${feature.delay}ms`, opacity: 0 }}
                >
                  <div className={`bg-gradient-to-br ${feature.gradient} w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl relative overflow-hidden animate-fadeInUp mx-2" style={{ animationDelay: '800ms', opacity: 0 }}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            
            <div className="relative z-10 text-center">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl">
                  <BookOpen className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-2" style={{ fontFamily: "Domine, serif" }}>
                Be the First to Know
              </h2>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                Join our waitlist and get exclusive early access when we launch. Plus, special discounts for early birds!
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-xl mx-auto px-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:border-white/60 transition-all duration-300 text-sm sm:text-base lg:text-lg"
                  aria-label="Email address"
                />
                <button 
                  className="bg-white text-orange-500 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 whitespace-nowrap"
                  aria-label="Join waitlist"
                >
                  Join Waitlist
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6 text-white/80">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm">Join 2,500+ students already on the waitlist</span>
              </div>
            </div>
          </div>

          <div className="mt-12 sm:mt-16 text-center animate-fadeInUp" style={{ animationDelay: '1000ms', opacity: 0 }}>
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/60 backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-full shadow-lg border border-orange-200">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-400 rounded-full animate-pulse" />
              <span className="text-gray-700 font-medium text-xs sm:text-sm lg:text-base">Expected Launch: Q2 2025</span>
            </div>
          </div>
        </div>
      </div>

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
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-shimmer { animation: shimmer 3s infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-blob, .animate-fadeInUp, .animate-pulse, .animate-shimmer {
            animation: none !important;
            opacity: 1 !important;
          }
          .group:hover, button:hover { transform: none !important; }
        }
        @media (max-width: 640px) {
          .animate-blob { animation-duration: 10s; }
        }
      `}</style>
    </div>
  );
};

export default Courses;