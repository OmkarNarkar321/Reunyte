import React from "react";
import blueSchool from "../../assets/CounselingPage/high-school-building.png";
import redSchool from "../../assets/CounselingPage/pana.png";
import centerCircle from "../../assets/CounselingPage/Tenthmain.png";
import img1 from "../../assets/CounselingPage/Image 2-1.png";
import img2 from "../../assets/CounselingPage/Image 2.png";
import img3 from "../../assets/CounselingPage/Image 3.png";
import img4 from "../../assets/CounselingPage/Image 4.png";

const Card = ({ bg, img, title, rating, price, desc, alt }) => (
  <div className="w-full sm:w-[48%] bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden shadow-md flex flex-col">
    <div className={`${bg} h-40 sm:h-48 flex items-center justify-center p-4`}>
      <img src={img} alt={alt} className="h-full w-auto object-contain max-w-full" />
    </div>
    <div className="p-4 sm:p-5 flex flex-col flex-grow">
      <h3 className="text-sm sm:text-base font-semibold text-gray-800">{title}</h3>
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

const TenthCounselling = () => (
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
              bg="bg-[#C5E1F8]" 
              img={blueSchool} 
              title="10th Std" 
              rating="4.9" 
              price="399.00 Rs" 
              desc="Single Pack" 
              alt="10th Std Single Pack" 
            />
            <Card 
              bg="bg-[#FAD5D1]" 
              img={redSchool} 
              title="10th Std" 
              rating="5.2" 
              price="1890.00 Rs" 
              desc="Combo Pack – 5 Meetings with Mentor" 
              alt="10th Std Combo Pack" 
            />
          </div>
        </div>
        <div className="w-full lg:w-5/12 flex flex-col items-center mt-6 sm:mt-8 lg:mt-0 px-4 sm:px-0">
          <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] flex items-center justify-center">
            <img src={centerCircle} alt="Career guidance center" className="w-full h-full object-contain" />
            {[
              { src: img1, pos: "-top-6 sm:-top-7 md:-top-9 left-1/2 -translate-x-1/2" },
              { src: img2, pos: "-right-6 sm:-right-8 md:-right-10 top-1/2 -translate-y-1/2" },
              { src: img3, pos: "-bottom-6 sm:-bottom-7 md:-bottom-9 left-1/2 -translate-x-1/2" },
              { src: img4, pos: "-left-6 sm:-left-8 md:-left-10 top-1/2 -translate-y-1/2" }
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

export default TenthCounselling;