import React from "react";
import blueSchool from "../../assets/CounselingPage/iti1.png";
import redSchool from "../../assets/CounselingPage/iti2.png";
import centerCircle from "../../assets/CounselingPage/iti3.png";

const Card = ({ bg, img, rating, price, desc, alt }) => (
  <div className="w-full sm:w-[48%] bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden shadow-md flex flex-col">
    <div className={`${bg} h-40 sm:h-48 flex items-center justify-center p-4`}>
      <img src={img} alt={alt} className="h-full w-auto object-contain max-w-full" />
    </div>
    <div className="p-4 sm:p-5 flex flex-col flex-grow">
      <h3 className="text-sm sm:text-base font-semibold text-gray-800">ITI</h3>
      <div className="flex items-center text-yellow-500 text-xs sm:text-sm mt-1">
        ★ <span className="ml-2 text-gray-700">{rating}</span>
      </div>
      <p className="mt-2 text-gray-900 font-semibold text-sm sm:text-base">{price}</p>
      <p className="text-gray-500 text-xs sm:text-sm mb-4">{desc}</p>
      <button className="bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 transition-colors px-4 sm:px-5 py-2 sm:py-2.5 rounded-md font-semibold mt-auto w-full text-sm sm:text-base touch-manipulation">
        Buy Now
      </button>
    </div>
  </div>
);

const ITICounselling = () => (
  <div className="w-full bg-white mb-6 px-0 sm:px-6 lg:px-12">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8 lg:gap-12">
        <div className="w-full lg:w-7/12 px-4 sm:px-0">
          <div className="text-center mb-4 sm:mb-6 lg:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">
              "Your Path, Your Future" <br /> Start Now !
            </h1>
            <p className="text-gray-600 mt-2 italic text-xs sm:text-sm">
              "Empower Your Journey to Success"
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
            <Card 
              bg="bg-[#f0d3eb]" 
              img={blueSchool} 
              rating="4.9" 
              price="399.00 Rs" 
              desc="Single Pack" 
              alt="ITI Single Pack" 
            />
            <Card 
              bg="bg-[#ffecea]" 
              img={redSchool} 
              rating="5.2" 
              price="1890.00 Rs" 
              desc="Combo Pack – 5 Meetings with Mentor" 
              alt="ITI Combo Pack" 
            />
          </div>
        </div>
        <div className="w-full lg:w-5/12 flex flex-col items-center mt-6 sm:mt-8 lg:mt-0 px-4 sm:px-0">
          <span className="font-medium text-gray-800 mb-2 text-sm sm:text-base">Industrial Training Institute</span>
          <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[280px] lg:w-[380px] lg:h-[320px] flex items-center justify-center">
            <img src={centerCircle} alt="ITI guidance center" className="w-full h-full object-contain" />
          </div>
          <p className="text-center font-bold text-gray-600 mt-4 sm:mt-6 max-w-md px-4 text-sm sm:text-base">
            "Unlock your potential with expert guidance tailored to your future. Apply now and take the first step towards success!"
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default ITICounselling;