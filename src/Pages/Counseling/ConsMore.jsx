import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/CounselingPage/more1.png";
import img2 from "../../assets/CounselingPage/more2.png";
import img3 from "../../assets/CounselingPage/more3.png";
import img4 from "../../assets/CounselingPage/more4.png";
import img5 from "../../assets/CounselingPage/more5.png";

export default function ConsMore() {
  const navigate = useNavigate();

  const categories = [
    { name: "Carrier", price: "$99.00", rating: 4.7, bgColor: "bg-pink-100", image: img1, link: "/counseling/career" },
    { name: "Domain", price: "$85.00", rating: 4.5, bgColor: "bg-green-100", image: img2, link: "/counseling/domain" },
    { name: "Interview", price: "$80.00", rating: 4.4, bgColor: "bg-yellow-100", image: img3, link: "/counseling/interview" },
    { name: "Engineering", price: "$70.00", rating: 4.1, bgColor: "bg-gray-200", image: img4, link: "/counseling/career/engineering" },
  ];

  const features = ["Theories & Models", "Ethics & Development", "Quizzes and Assessments", "Discussion Forum", "Strategies & Interventions", "Verified Experts"];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={i < fullStars || (i === fullStars && hasHalfStar) ? "text-yellow-500" : "text-gray-300"}>★</span>
    ));
  };

  return (
    <div className="min-h-screen bg-[#FFFDFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200" aria-label="Go back">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 font-['Public_Sans']">Counseling</h1>
        </div>

        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 font-['Public_Sans']">Categories</h2>
            <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 font-['Public_Sans']">See all</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className={`${item.bgColor} h-48 flex items-center justify-center p-4`}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" draggable="false" />
                  ) : (
                    <span className="text-gray-400 text-sm font-['Public_Sans']">Add Image</span>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2 font-['Public_Sans']">{item.name}</h3>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-base">{renderStars(item.rating)}</div>
                    <span className="text-sm text-gray-600 ml-1 font-['Public_Sans']">{item.rating}</span>
                  </div>

                  <p className="text-gray-700 font-semibold text-base mb-4 font-['Public_Sans']">{item.price}</p>

                  <button onClick={() => navigate(item.link)} className="w-full bg-orange-500 text-white py-2.5 rounded-lg font-medium hover:bg-orange-600 transition-all duration-200 shadow-sm hover:shadow-md font-['Public_Sans']">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden bg-gradient-to-br from-white to-[#FFF9F0]">
          <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-10">
            <div className="w-full md:w-2/5 flex-shrink-0">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-[#E8F4F8]">
                <img src={img5} alt="Mindful Counseling" className="w-full h-auto object-cover" draggable="false" />
              </div>
            </div>

            <div className="flex-1 w-full">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 text-center md:text-left font-['Domine']">"Mindful Counseling"</h2>
              <p className="text-gray-600 text-base md:text-lg mb-8 text-center md:text-left font-['Public_Sans']">Navigate Life's Challenges with Confidence</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-800 text-base font-medium font-['Public_Sans']">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="h-16"></div>
      </div>
    </div>
  );
}