import React, { useState, useEffect } from "react";
import { ArrowLeft, Lock, Mail, Bell, Sparkles, AlertCircle } from "lucide-react";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPageVisible, setIsPageVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsPageVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleNotifyMe = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase())) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Notify email:", email);
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setIsSubscribed(false);
      }, 5000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Subscription error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const opportunities = [
    { title: "Internship", desc: "Opportunity to work on real-world projects with industry experts", gradient: "from-[#93AC4B] to-[#FFF7AF]", icon: "💼", launch: "Coming in Q1 2026" },
    { title: "Go-kart Students", desc: "Accelerate your skills with hands-on racing experience", gradient: "from-[#5B888B] to-[#9EDDF1]", icon: "🏎️", launch: "Coming in Q2 2026" },
    { title: "Formula Students", desc: "Showcase your skills and talent in competitive racing", gradient: "from-[#974F4F] to-[#D79B9B]", icon: "🏁", launch: "Coming in Q2 2026" },
    { title: "Industrial Visit", desc: "Build tomorrow's solutions with real industry exposure", gradient: "from-[#50934A] to-[#C9FFAF]", icon: "🏭", launch: "Coming in Q1 2026" },
    { title: "Interview Prep", desc: "Master your interview skills with expert guidance", gradient: "from-[#AC17BF] to-[#D088D9]", icon: "🎯", launch: "Coming Soon" }
  ];

  const fadeClass = (delay) => `transition-all duration-700 delay-${delay} ${isPageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`;
  const fonts = { sans: { fontFamily: "Public Sans, sans-serif" }, serif: { fontFamily: "Domine, serif" } };

  return (
    <div className={`min-h-screen bg-[#FFF5ED] transition-opacity duration-700 ease-out flex flex-col ${isPageVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header */}
      <header className="bg-white shadow-sm flex-shrink-0">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button onClick={() => window.location.href = "/"} className="flex items-center gap-2 text-gray-600 hover:text-[#ED9455] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#ED9455] focus:ring-offset-2 rounded-lg p-2 -m-2">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium" style={fonts.sans}>Back to Home</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6 border border-orange-200 ${fadeClass('100')}`}>
            <Sparkles className="w-5 h-5 text-orange-400" />
            <span className="text-orange-600 font-semibold text-sm tracking-wide" style={fonts.sans}>COMING SOON</span>
          </div>

          <h1 className={`text-4xl md:text-5xl font-bold text-gray-800 mb-4 ${fadeClass('200')}`} style={fonts.serif}>
            Exciting Opportunities<br /><span className="text-[#ED9455]">On the Horizon</span>
          </h1>

          <p className={`text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto ${fadeClass('300')}`} style={fonts.sans}>
            We're working hard to bring you amazing new opportunities. Be the first to know when they launch!
          </p>

          <div className={fadeClass('400')}>
            {!isSubscribed ? (
              <div className="space-y-3 max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" disabled={isLoading}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#ED9455] focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      style={fonts.sans} onKeyDown={(e) => e.key === 'Enter' && handleNotifyMe(e)} />
                  </div>
                  <button onClick={handleNotifyMe} disabled={isLoading} style={fonts.sans}
                    className="bg-[#ED9455] text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-[#d87f40] hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-h-[48px]">
                    {isLoading ? (
                      <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div><span>Subscribing...</span></>
                    ) : (
                      <><Bell className="w-5 h-5" /><span>Notify Me</span></>
                    )}
                  </button>
                </div>
                {error && (
                  <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg py-2 px-3 text-left animate-shake">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700 text-sm" style={fonts.sans}>{error}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl py-4 px-6 max-w-md mx-auto animate-slideInUp">
                <p className="text-green-700 font-semibold flex items-center justify-center gap-2" style={fonts.sans}>
                  <span className="text-xl">✓</span>
                  <span>You're on the list! We'll notify you when these opportunities launch.</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Opportunities Grid */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-3xl font-bold text-gray-800 mb-8 text-center ${fadeClass('500')}`} style={fonts.serif}>What's Coming</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opp, i) => (
              <article key={i} className={`relative rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-700 transform hover:scale-105 ${isPageVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${600 + i * 100}ms` }}>
                <div className={`absolute inset-0 bg-gradient-to-br ${opp.gradient} opacity-90`} />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md z-10">
                  <Lock className="w-5 h-5 text-gray-600" />
                </div>
                <div className="relative z-10 p-6 text-white h-full flex flex-col">
                  <div className="text-5xl mb-4">{opp.icon}</div>
                  <h3 className="text-2xl font-bold mb-2" style={fonts.serif}>{opp.title}</h3>
                  <p className="text-white/90 mb-4 flex-grow" style={fonts.sans}>{opp.desc}</p>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                    <p className="text-sm font-semibold" style={fonts.sans}>{opp.launch}</p>
                  </div>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shine-animation" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-[#FFF5ED] mt-8">
        <div className={`max-w-4xl mx-auto text-center ${fadeClass('1000')}`}>
          <h3 className="text-2xl font-bold text-gray-800 mb-4" style={fonts.serif}>Want to explore current opportunities?</h3>
          <button onClick={() => window.location.href = "/"} style={fonts.sans}
            className="bg-[#ED9455] text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:bg-[#d87f40] hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#ED9455] focus:ring-offset-2">
            View Available Opportunities
          </button>
        </div>
      </footer>

      <style>{`
        @keyframes shine { 0% { transform: translateX(-100%) skewX(-15deg); } 100% { transform: translateX(200%) skewX(-15deg); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        @keyframes slideInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .shine-animation { animation: shine 2s ease-in-out; }
        .animate-shake { animation: shake 0.3s ease-in-out; }
        .animate-slideInUp { animation: slideInUp 0.5s ease-out; }
        .animate-spin { animation: spin 1s linear infinite; }
        *:focus-visible { outline: 2px solid #ED9455; outline-offset: 2px; }
      `}</style>
    </div>
  );
}