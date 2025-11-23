import React, { useState, useMemo, useCallback, memo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import doMain from "../../assets/CounselingPage/doMain.png";
import img1 from "../../assets/CounselingPage/do1.png";
import img2 from "../../assets/CounselingPage/do2.png";
import img3 from "../../assets/CounselingPage/do3.png";
import img4 from "../../assets/CounselingPage/do4.png";
import img5 from "../../assets/CounselingPage/do5.png";

const DOMAIN_DATA = {
  Computer: [
    { id: 1, name: "Data Mining", image: img1, slug: "data-mining" },
    { id: 2, name: "Cyber Security", image: img2, slug: "cyber-security" },
    { id: 3, name: "Cloud Computing", image: img3, slug: "cloud-computing" },
    { id: 4, name: "Software Engineering", image: img4, slug: "software-engineering" },
    { id: 5, name: "Data Science", image: img5, slug: "data-science" },
  ],
  Mechanical: [
    { id: 6, name: "Thermodynamics", image: img1, slug: "thermodynamics" },
    { id: 7, name: "Fluid Mechanics", image: img2, slug: "fluid-mechanics" },
    { id: 8, name: "Robotics", image: img3, slug: "robotics" },
    { id: 9, name: "CAD/CAM", image: img4, slug: "cad-cam" },
    { id: 10, name: "Manufacturing", image: img5, slug: "manufacturing" },
  ],
  Automobile: [
    { id: 11, name: "Vehicle Dynamics", image: img1, slug: "vehicle-dynamics" },
    { id: 12, name: "Engine Design", image: img2, slug: "engine-design" },
    { id: 13, name: "EV Technology", image: img3, slug: "ev-technology" },
    { id: 14, name: "Fuel Systems", image: img4, slug: "fuel-systems" },
    { id: 15, name: "Automotive Electronics", image: img5, slug: "automotive-electronics" },
  ],
  Electrical: [
    { id: 16, name: "Power Systems", image: img1, slug: "power-systems" },
    { id: 17, name: "Circuit Analysis", image: img2, slug: "circuit-analysis" },
    { id: 18, name: "Control Systems", image: img3, slug: "control-systems" },
    { id: 19, name: "Renewable Energy", image: img4, slug: "renewable-energy" },
    { id: 20, name: "Microcontrollers", image: img5, slug: "microcontrollers" },
  ],
  Civil: [
    { id: 21, name: "Structural Engineering", image: img1, slug: "structural-engineering" },
    { id: 22, name: "Geotechnical", image: img2, slug: "geotechnical" },
    { id: 23, name: "Transportation", image: img3, slug: "transportation" },
    { id: 24, name: "Environmental Engg.", image: img4, slug: "environmental-engineering" },
    { id: 25, name: "Surveying", image: img5, slug: "surveying" },
  ],
};

const TABS = [
  { label: "Computer", value: "Computer", bgColor: "#FFE9D9", accentColor: "#FFD4B8" },
  { label: "Mechanical", value: "Mechanical", bgColor: "#DEFFD9", accentColor: "#CFFFBA" },
  { label: "Automobile", value: "Automobile", bgColor: "#D9FFFD", accentColor: "#B8FFFA" },
  { label: "Electrical", value: "Electrical", bgColor: "#D9E1FF", accentColor: "#C0CCFF" },
  { label: "Civil", value: "Civil", bgColor: "#FFD9F5", accentColor: "#FFC0ED" },
];

const LEARNING_STEPS = [
  { title: "Identify Your Goals", desc: "Determine what you want to achieve by learning the new skill." },
  { title: "Assess Current Skills", desc: "Evaluate your current skill level and identify gaps." },
  { title: "Find Quality Resources", desc: "Use reputable sources like online courses and books." },
  { title: "Create a Learning Plan", desc: "Break down the skill into manageable parts." },
  { title: "Join Communities", desc: "Participate in forums or groups to share knowledge." },
];

const Breadcrumb = memo(() => (
  <nav className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
    <Link to="/counseling" className="text-blue-600 hover:text-blue-800 transition">Counseling</Link>
    <span className="mx-2 text-gray-400">|</span>
    <Link to="/counseling/domain" className="text-blue-600 hover:text-blue-800 transition">Career counseling</Link>
  </nav>
));

const BackButton = memo(({ onClick }) => (
  <button onClick={onClick} className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition mb-4 sm:mb-6 focus:outline-none" aria-label="Go back">
    <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
    <span className="font-medium text-sm sm:text-base">Back</span>
  </button>
));

const CategoryTabs = memo(({ tabs, selected }) => (
  <div className="w-full py-4 sm:py-6">
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
      {tabs.map((tab) => (
        <Link
          key={tab.value}
          to={`/counseling/domain/${tab.value.toLowerCase()}`}
          className={`flex-1 min-w-[100px] sm:min-w-[130px] max-w-[180px] sm:max-w-[200px] text-center py-2 sm:py-3 px-3 sm:px-6 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 ${
            selected === tab.value
              ? "bg-yellow-400 text-black shadow-lg scale-105"
              : "bg-gray-100 text-gray-700 hover:bg-yellow-100 hover:shadow-md"
          }`}
          aria-label={`${tab.label} category`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  </div>
));

const DomainCard = memo(({ domain, accent, category }) => (
  <Link 
    to={`/counseling/domain/${category.toLowerCase()}/${domain.slug}`}
    className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col items-center text-center"
    aria-label={`Learn about ${domain.name}`}
  >
    <div className="mb-2 sm:mb-3 p-2 sm:p-3 rounded-full transition" style={{ backgroundColor: accent }}>
      <img src={domain.image} alt={domain.name} className="h-10 w-10 sm:h-12 sm:w-12 object-contain" loading="lazy" />
    </div>
    <p className="text-xs sm:text-sm font-medium text-gray-800">{domain.name}</p>
  </Link>
));

const DomainGrid = memo(({ selected, data, bgColor, accent }) => (
  <section className="p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-sm transition-all duration-500" style={{ backgroundColor: bgColor }}>
    <div className="flex justify-between items-center mb-4 sm:mb-6">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{selected} Domains</h2>
      <span className="text-orange-600 font-semibold text-sm sm:text-base">See all →</span>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
      {data[selected]?.map((domain) => (
        <DomainCard key={domain.id} domain={domain} accent={accent} category={selected} />
      ))}
    </div>
  </section>
));

const LearningSection = memo(() => (
  <section className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
    <div className="flex-1 space-y-4 sm:space-y-6 w-full">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">What You'll Learn</h2>
      <ol className="space-y-3 sm:space-y-4">
        {LEARNING_STEPS.map((step, i) => (
          <li key={i} className="flex gap-2 sm:gap-3">
            <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-orange-400 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm">
              {i + 1}
            </span>
            <div className="flex-1">
              <strong className="text-gray-800 block mb-1 text-sm sm:text-base">{step.title}:</strong>
              <span className="text-gray-600 text-xs sm:text-sm">{step.desc}</span>
            </div>
          </li>
        ))}
      </ol>
      <Link 
        to="/apply" 
        className="inline-block bg-orange-400 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-lg shadow-md hover:bg-orange-500 hover:shadow-lg transition text-sm sm:text-base"
        aria-label="Apply for counseling"
      >
        Apply Now
      </Link>
    </div>
    <div className="flex-1 flex justify-center w-full">
      <img src={doMain} alt="Learning illustration" className="w-full max-w-xs sm:max-w-md lg:max-w-lg rounded-2xl shadow-lg" loading="lazy" />
    </div>
  </section>
));

const DomainPage = ({ initialCategory = "Computer" }) => {
  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = useState(initialCategory);

  useEffect(() => {
    if (DOMAIN_DATA[initialCategory]) {
      setSelectedDomain(initialCategory);
    }
  }, [initialCategory]);

  const currentTab = useMemo(() => TABS.find(tab => tab.value === selectedDomain) || TABS[0], [selectedDomain]);
  const handleBack = useCallback(() => navigate(-1), [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
        <Breadcrumb />
        <BackButton onClick={handleBack} />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Categories</h1>
        <CategoryTabs tabs={TABS} selected={selectedDomain} />
        <div className="mb-8 sm:mb-10 md:mb-12">
          <DomainGrid
            selected={selectedDomain}
            data={DOMAIN_DATA}
            bgColor={currentTab.bgColor}
            accent={currentTab.accentColor}
          />
        </div>
        <LearningSection />
      </div>
    </div>
  );
};

export default DomainPage;