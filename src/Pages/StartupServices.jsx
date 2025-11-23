import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Rocket, Lightbulb, TrendingUp, Target, Sparkles, Bell, ArrowRight, CheckCircle, Users, Briefcase } from 'lucide-react';

const StartupServices = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
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

  const handleNotifyMe = useCallback(() => {
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 3000);
    }
  }, [email]);

  const services = useMemo(() => [
    {
      icon: Lightbulb,
      title: 'Ideation & Validation',
      description: 'Transform your ideas into viable business concepts with expert guidance and market validation.',
      gradient: 'from-orange-400 to-amber-500',
      delay: 200
    },
    {
      icon: Target,
      title: 'Business Planning',
      description: 'Develop comprehensive business plans, financial models, and go-to-market strategies.',
      gradient: 'from-amber-500 to-yellow-500',
      delay: 400
    },
    {
      icon: TrendingUp,
      title: 'Growth Mentorship',
      description: 'One-on-one mentorship from successful entrepreneurs to accelerate your startup journey.',
      gradient: 'from-orange-500 to-red-500',
      delay: 600
    },
    {
      icon: Rocket,
      title: 'Launch Support',
      description: 'End-to-end support for launching your startup, from MVP to market entry.',
      gradient: 'from-red-400 to-orange-400',
      delay: 800
    }
  ], []);

  const features = useMemo(() => [
    { text: 'Personalized startup consultation sessions', delay: 100 },
    { text: 'Access to industry experts and mentors', delay: 200 },
    { text: 'Business model canvas workshops', delay: 300 },
    { text: 'Pitch deck preparation and refinement', delay: 400 },
    { text: 'Investor connection programs', delay: 500 },
    { text: 'Legal and compliance guidance', delay: 600 }
  ], []);

  const blobs = useMemo(() => [
    { pos: 'top-20 left-10', color: 'bg-orange-200', delay: 0, x: 1, y: 1 },
    { pos: 'top-40 right-10', color: 'bg-amber-200', delay: 2000, x: -1, y: 1 },
    { pos: 'bottom-20 left-1/4', color: 'bg-yellow-200', delay: 4000, x: 1, y: -1 }
  ], []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-amber-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {blobs.map((blob, i) => (
          <div 
            key={i}
            className={`absolute ${blob.pos} w-64 h-64 md:w-80 md:h-80 ${blob.color} rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob`}
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
              <span className="text-orange-600 font-semibold text-xs sm:text-sm tracking-wide">LAUNCHING Q2 2025</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2" style={{ fontFamily: "Domine, serif" }}>
              Your <span className="text-orange-500 relative inline-block">
                Startup Dream
                <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C41.7 3.7 160.3 -1.7 198 8" stroke="#F97316" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                Is About to Become Reality
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 mb-8 sm:mb-12">
              We're building something extraordinary for aspiring entrepreneurs, college students, and innovators. 
              Get ready for expert guidance, mentorship, and everything you need to launch your startup successfully.
            </p>

            <div className="max-w-md mx-auto mb-6 sm:mb-8 px-4 animate-fadeInUp" style={{ animationDelay: '200ms' }}>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-xl border-2 border-orange-200 bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:border-orange-400 transition-all duration-300 text-sm sm:text-base"
                  aria-label="Email address"
                />
                <button
                  onClick={handleNotifyMe}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 whitespace-nowrap"
                  aria-label="Get notified"
                >
                  <Bell className="w-5 h-5" />
                  Notify Me
                </button>
              </div>
              {isSubscribed && (
                <div className="mt-4 text-green-600 font-medium flex items-center justify-center gap-2 animate-fadeInUp">
                  <CheckCircle className="w-5 h-5" />
                  Awesome! We'll notify you when we launch.
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 text-gray-600 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
              <span className="text-xs sm:text-sm">Join <span className="font-bold text-orange-600">1,800+</span> entrepreneurs on our waitlist</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 px-2">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div 
                  key={idx}
                  className="group bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 animate-fadeInUp"
                  style={{ animationDelay: `${service.delay}ms`, opacity: 0 }}
                >
                  <div className={`bg-gradient-to-br ${service.gradient} w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{service.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl relative overflow-hidden animate-fadeInUp mx-2" style={{ animationDelay: '1000ms', opacity: 0 }}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 text-center" style={{ fontFamily: "Domine, serif" }}>
                Everything You Need to Launch
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 hover:bg-white/20 transition-all duration-300 animate-fadeInUp"
                    style={{ animationDelay: `${1200 + feature.delay}ms`, opacity: 0 }}
                  >
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0 mt-0.5" />
                    <span className="text-white font-medium text-sm sm:text-base">{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <p className="text-white/90 text-sm sm:text-base lg:text-lg mb-6">
                  Designed specifically for college students, first-time founders, and aspiring entrepreneurs
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-white/80 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                    <span>🎓</span>
                    <span>College Students</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                    <span>💡</span>
                    <span>First-Time Founders</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                    <span>🚀</span>
                    <span>Innovators</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 sm:mt-16 text-center animate-fadeInUp px-2" style={{ animationDelay: '1800ms', opacity: 0 }}>
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10" />
              <div className="relative z-10">
                <Briefcase className="w-12 h-12 sm:w-16 sm:h-16 text-orange-400 mx-auto mb-4 animate-bounce" />
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4" style={{ fontFamily: "Domine, serif" }}>
                  Ready to Turn Your Idea Into Reality?
                </h3>
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
                  Be among the first to access exclusive startup resources, expert mentorship, and a supportive community of entrepreneurs.
                </p>
                <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-xl font-bold text-base sm:text-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center gap-2">
                  Get Early Access
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 text-center animate-fadeInUp" style={{ animationDelay: '2000ms', opacity: 0 }}>
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
          .animate-blob, .animate-fadeInUp, .animate-pulse, .animate-shimmer, .animate-bounce {
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

export default StartupServices;