import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Hackathon = () => {
  const navigate = useNavigate();
  
  // Timer initial values - CHANGE THESE TO RESET
  const INITIAL_TIME = { days: 10, hours: 10, minutes: 30, seconds: 10 };
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNavigateToSelection = () => navigate('/hackathon/hackathon-selection');

  const TimerCircle = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="rounded-full bg-[#5D5D5D] flex items-center justify-center text-white font-bold shadow-lg w-16 h-16 text-xl md:w-28 md:h-28 md:text-4xl">
        {String(value).padStart(2, '0')}
      </div>
      <span className="mt-3 text-gray-800 font-semibold text-xs md:text-lg">{label}</span>
    </div>
  );

  return (
    <div className="bg-[#FFFDFB] min-h-screen">
      {/* Hero Section */}
      <section className="pt-8 pb-4 px-4 md:pt-20 md:pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl shadow-2xl overflow-visible h-[280px] md:h-[350px]" style={{ background: 'linear-gradient(to bottom right, #A5EF92 0%, #75CC5F 100%)' }}>
            {/* Triangle Pattern */}
            <div className="absolute right-0 top-0 bottom-0 overflow-hidden z-0">
              <img src="/src/assets/HackathonPage/triangle.png" alt="" className="h-full w-auto object-contain opacity-30" style={{ transform: 'translateX(12%)', transformOrigin: 'right center' }} draggable="false" />
            </div>

            <div className="relative z-10 h-full flex items-center">
              {/* Employee Image */}
              <div className="flex-shrink-0 h-full flex items-center justify-start w-2/5 pl-4 md:w-1/2 md:pl-8">
                <div className="relative md:-mt-20 md:-ml-10">
                  <img src="/src/assets/HackathonPage/employee.png" alt="Team on success chart" className="object-contain relative z-20 h-[300px] sm:h-[340px] md:h-[480px] w-auto" style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.15))' }} draggable="false" />
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1 flex flex-col justify-center relative z-20 px-4 pr-6 md:px-8 md:pr-16">
                <h2 className="font-bold text-white mb-3 leading-tight text-xl md:text-4xl font-['Public_Sans']">We equip you for success in your chosen field.</h2>
                <p className="text-white/90 leading-tight italic font-light mb-4 md:mb-7 text-sm md:text-xl font-['Public_Sans']">"Empowering Your Path to Excellence"</p>
                <button onClick={handleNavigateToSelection} className="bg-[#FFEC9E] text-gray-800 font-semibold rounded-lg shadow-lg hover:bg-[#ffe680] hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 py-2 px-5 text-sm md:py-3 md:px-10 md:text-base font-['Public_Sans'] w-fit">
                  Click here to know more
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-6 px-4 md:py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bold text-gray-800 mb-8 text-2xl md:text-3xl font-['Domine']">New Hackathon for you....</h2>

          <div className="relative max-w-full md:max-w-[1001px]">
            <div className="relative bg-[#D5D5D5] rounded-3xl shadow-xl overflow-visible p-10 pr-6 md:p-[35px] md:pr-80">
              {/* Timer Content */}
              <div className="relative z-10">
                <h3 className="font-bold text-gray-800 mb-6 text-xl md:text-2xl font-['Public_Sans']">Registration stars in....</h3>

                {/* Countdown Circles */}
                <div className="flex gap-3 md:gap-5 mb-6">
                  <TimerCircle value={timeLeft.days} label="Days" />
                  <TimerCircle value={timeLeft.hours} label="Hrs" />
                  <TimerCircle value={timeLeft.minutes} label="Min" />
                  <TimerCircle value={timeLeft.seconds} label="Sec" />
                </div>

                {/* Buttons */}
                <div className="flex gap-10">
                  <button onClick={handleNavigateToSelection} className="border-2 border-[#FF7A00] text-[#FF7A00] font-semibold rounded-lg hover:bg-orange-50 hover:border-[#e66d00] transition-all duration-300 transform hover:scale-105 active:scale-95 py-2 px-6 text-sm md:py-3 md:px-14 md:text-base font-['Public_Sans']">
                    See detail
                  </button>
                  <button className="bg-[#FF7A00] text-white font-semibold rounded-lg hover:bg-[#e66d00] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 py-2 px-6 text-sm md:py-3 md:px-14 md:text-base font-['Public_Sans']">
                    Waiting....
                  </button>
                </div>
              </div>

              {/* Professional Circle Image - Desktop */}
              <div className="hidden md:block absolute bottom-0 right-0 translate-x-1/3" style={{ bottom: '-5px', zIndex: 20 }}>
                <div className="relative rounded-full flex items-center justify-center w-[450px] h-[450px] bg-[#B0B0B0] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                  <div className="relative rounded-full overflow-hidden w-full h-full" style={{ background: 'linear-gradient(135deg, #3D4C5B 0%, #2C3A47 100%)' }}>
                    <img src="/src/assets/HackathonPage/employee1.png" alt="Professional holding quality badge" className="w-full h-full object-cover" draggable="false" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Professional Circle Image - Mobile */}
            <div className="flex justify-center mt-6 md:hidden">
              <div className="relative rounded-full flex items-center justify-center w-[260px] h-[260px] bg-[#B0B0B0] p-[14px] shadow-[0_15px_40px_rgba(0,0,0,0.2)]">
                <div className="relative rounded-full overflow-hidden w-full h-full" style={{ background: 'linear-gradient(135deg, #3D4C5B 0%, #2C3A47 100%)' }}>
                  <img src="/src/assets/HackathonPage/employee1.png" alt="Professional holding quality badge" className="w-full h-full object-cover" draggable="false" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hackathon;