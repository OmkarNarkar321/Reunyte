import React from "react";
import blue12 from "../../assets/CounselingPage/rafiki.png";
import green12 from "../../assets/CounselingPage/bro.png";
import triangle from "../../assets/CounselingPage/triangle.png";
import small1 from "../../assets/CounselingPage/Img1.png";
import small2 from "../../assets/CounselingPage/Img2.png";
import small3 from "../../assets/CounselingPage/Img3.png";
import small4 from "../../assets/CounselingPage/Img4.png";

const Card = ({ bg, img, rating, price, desc, alt }) => (
  <div className="w-full sm:w-[48%] bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden shadow-md flex flex-col">
    <div className={`${bg} h-40 sm:h-48 flex items-center justify-center p-4`}>
      <img src={img} alt={alt} className="h-full w-auto object-contain max-w-full" />
    </div>
    <div className="p-4 sm:p-5 flex flex-col flex-grow">
      <h3 className="text-sm sm:text-base font-semibold text-gray-800">12th std</h3>
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

const TwelfthCounselling = () => (
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
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Card 
              bg="bg-[#C5E1F8]" 
              img={blue12} 
              rating="4.9" 
              price="449.00 Rs" 
              desc="Single Pack" 
              alt="12th Std Single Pack" 
            />
            <Card 
              bg="bg-[#E4F3D5]" 
              img={green12} 
              rating="5.2" 
              price="2140.00 Rs" 
              desc="Combo Pack – 5 Meetings with Mentor" 
              alt="12th Std Combo Pack" 
            />
          </div>
        </div>
        <div className="w-full lg:w-5/12 flex flex-col items-center mt-6 sm:mt-8 lg:mt-0 px-4 sm:px-0">
          <div className="relative w-[280px] h-[240px] sm:w-[320px] sm:h-[280px] md:w-[400px] md:h-[320px] flex items-center justify-center">
            <img src={triangle} alt="Career path triangle" className="w-full h-auto object-contain" />
            {[
              { src: small1, pos: "-top-2 sm:-top-3 left-1/2 -translate-x-1/2" },
              { src: small2, pos: "top-1/2 -right-2 sm:-right-3 -translate-y-1/2" },
              { src: small3, pos: "-bottom-6 sm:-bottom-7 md:-bottom-9 left-1/2 -translate-x-1/2" },
              { src: small4, pos: "top-1/2 left-4 sm:left-6 md:left-8 -translate-y-1/2" }
            ].map((item, i) => (
              <img 
                key={i} 
                src={item.src} 
                alt={`Career option ${i+1}`} 
                className={`absolute ${item.pos} w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full border-3 sm:border-4 border-white shadow-md object-cover`} 
              />
            ))}
          </div>
          <p className="text-center font-bold text-gray-600 mt-6 sm:mt-8 md:mt-12 max-w-md px-4 text-sm sm:text-base">
            "Unlock your potential with expert guidance tailored to your future. Apply now and take the first step towards success!"
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default TwelfthCounselling;