import React from 'react';

const Practice = () => {
  const handleNavigateToDetails = () => console.log('Navigate to practice details');
  const handleAptitudeClick = () => console.log('Navigate to Aptitude Test');
  const handleInterviewClick = () => console.log('Navigate to Mock Interview');

  return (
    <div className="bg-[#FFFDFB] min-h-screen">
      {/* Hero Section */}
      <section className="pt-8 pb-4 px-4 md:pt-20 md:pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-[#78C2C3] rounded-3xl shadow-2xl overflow-visible h-[280px] md:h-[350px]">
            {/* Triangle Pattern */}
            <div className="absolute right-0 top-0 bottom-0 hidden md:block overflow-hidden z-0">
              <img src="/src/assets/Practice/triangle.png" alt="" className="h-full w-auto object-contain opacity-30" style={{ transform: 'translateX(11%)', transformOrigin: 'right center' }} draggable="false" />
            </div>

            <div className="relative z-10 h-full flex items-center">
              {/* Employee Image */}
              <div className="flex-shrink-0 h-full flex items-center justify-start w-2/5 pl-4 md:w-1/2 md:pl-14">
                <div className="relative md:-mt-20 md:-ml-10">
                  <img src="/src/assets/Practice/employee.png" alt="Team collaboration" className="object-contain relative z-20 h-[260px] md:h-[480px] w-auto" style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.15))' }} draggable="false" />
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1 flex flex-col justify-center relative z-20 px-4 pr-6 md:px-8 md:pr-16">
                <h2 className="font-bold text-white mb-3 leading-tight text-xl md:text-4xl font-['Public_Sans']">Preparing for a Bright Future</h2>
                <p className="text-white/90 leading-tight font-light mb-4 md:mb-7 text-sm md:text-xl font-['Public_Sans']">Master Your Skills, Achieve Your Dreams</p>
                <button onClick={handleNavigateToDetails} className="bg-[#FFE8A3] text-gray-800 font-semibold rounded-lg shadow-lg hover:bg-[#ffd97a] hover:shadow-xl transition-all duration-300 transform hover:scale-105 py-2 px-5 text-sm md:py-3 md:px-10 md:text-base font-['Public_Sans'] w-fit">
                  Click here to know more
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selection Section */}
      <section className="py-6 px-4 md:py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-bold text-gray-800 mb-8 text-2xl md:text-3xl font-['Domine']">Select anyone</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { bg: '#C8F4D4', icon: 'pencil.png', title: 'Aptitude Test', onClick: handleAptitudeClick },
              { bg: '#D9F0C7', icon: 'interview.png', title: 'Mock Interview', onClick: handleInterviewClick }
            ].map((card, i) => (
              <div key={i} onClick={card.onClick} className="rounded-3xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-14 md:p-20" style={{ backgroundColor: card.bg }}>
                <div className="flex items-center gap-6">
                  <img src={`/src/assets/Practice/${card.icon}`} alt={card.title} className="w-16 h-16 md:w-20 md:h-20 object-contain flex-shrink-0" draggable="false" />
                  <h3 className="font-bold text-gray-800 text-xl md:text-2xl font-['Public_Sans']">{card.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Practice;