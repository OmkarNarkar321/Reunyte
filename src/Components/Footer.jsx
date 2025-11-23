// src/Components/Footer.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Instagram, Twitter, Facebook, ArrowRight } from "lucide-react";

export default function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleNavigation = (href) => {
    navigate(href);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      // Store email in sessionStorage to pass to contact page
      sessionStorage.setItem('userEmail', email);
      
      // Navigate to contact page
      navigate("/contact");
      
      // Clear the email input
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#2E2A28] text-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* top row: left 5 columns + right "Connect with us" (bigger) */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 items-start">
          {/* LEFT: contain 5 shorter columns inside a span of 4 cols */}
          <div className="md:col-span-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              
              {/* Counseling */}
              <div>
                <h3
                  onClick={() => handleNavigation("/counseling")}
                  className="text-base md:text-lg font-semibold mb-3 cursor-pointer hover:text-orange-400"
                >
                  Counseling
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><button onClick={() => handleNavigation("/counseling/career")} className="hover:text-orange-400">Carrier</button></li>
                  <li><button onClick={() => handleNavigation("/counseling/domain")} className="hover:text-orange-400">Domain</button></li>
                  <li><button onClick={() => handleNavigation("/counseling/interview")} className="hover:text-orange-400">Interview</button></li>
                  <li><button onClick={() => handleNavigation("/counseling/project")} className="hover:text-orange-400">Project</button></li>
                  <li><button onClick={() => handleNavigation("/counseling/career/10th")} className="hover:text-orange-400">After 10th</button></li>
                  <li><button onClick={() => handleNavigation("/counseling/career/12th")} className="hover:text-orange-400">After 12th</button></li>
                  <li><button onClick={() => handleNavigation("/counseling/career/engineering")} className="hover:text-orange-400">Engineering</button></li>
                  <li><button onClick={() => handleNavigation("/counseling/career/iti")} className="hover:text-orange-400">ITI</button></li>
                  <li><button onClick={() => handleNavigation("/counseling/career/medical")} className="hover:text-orange-400">Medical</button></li>
                </ul>
              </div>

              {/* Courses */}
              <div>
                <h3
                  onClick={() => handleNavigation("/courses")}
                  className="text-base md:text-lg font-semibold mb-3 cursor-pointer hover:text-orange-400"
                >
                  Courses
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><button onClick={() => handleNavigation("/courses/webdev")} className="hover:text-orange-400">Web development</button></li>
                  <li><button onClick={() => handleNavigation("/courses/Cprogramming")} className="hover:text-orange-400">C programming</button></li>
                  <li><button onClick={() => handleNavigation("/courses/PythonProgramming")} className="hover:text-orange-400">Python programming</button></li>
                  <li><button onClick={() => handleNavigation("/courses/MernStack")} className="hover:text-orange-400">MERN stack</button></li>
                  <li><button onClick={() => handleNavigation("/courses/Mean")} className="hover:text-orange-400">MEAN</button></li>
                  <li><button onClick={() => handleNavigation("/courses/JavaProgramming")} className="hover:text-orange-400">JAVA programming</button></li>
                </ul>
              </div>

              {/* Hackathon */}
              <div>
                <h3
                  onClick={() => handleNavigation("/hackathon")}
                  className="text-base md:text-lg font-semibold mb-3 cursor-pointer hover:text-orange-400"
                >
                  Hackathon
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><button onClick={() => handleNavigation("/hackathon/hackathon-selection")} className="hover:text-orange-400">Upcoming Events</button></li>
                  {/* <li><button onClick={() => handleNavigation("/hackathon/past")} className="hover:text-orange-400">Past Events</button></li> */}
                </ul>
              </div>

              {/* Practice */}
              <div>
                <h3
                  onClick={() => handleNavigation("/practice")}
                  className="text-base md:text-lg font-semibold mb-3 cursor-pointer hover:text-orange-400"
                >
                  Practice
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><button onClick={() => handleNavigation("/practice/coding")} className="hover:text-orange-400">Coding Challenges</button></li>
                  <li><button onClick={() => handleNavigation("/practice/interviews")} className="hover:text-orange-400">Mock Interviews</button></li>
                </ul>
              </div>

              {/* Startup services */}
              <div>
                <h3
                  onClick={() => handleNavigation("/startup")}
                  className="text-base md:text-lg font-semibold mb-3 cursor-pointer hover:text-orange-400"
                >
                  Startup services
                </h3>
                {/* <ul className="space-y-2 text-sm text-gray-300">
                  <li><button onClick={() => handleNavigation("/startup")} className="hover:text-orange-400">Incubation</button></li>
                  <li><button onClick={() => handleNavigation("/startup")} className="hover:text-orange-400">Mentorship</button></li>
                </ul> */}
              </div>
            </div>
          </div>

          {/* RIGHT: Bigger "Connect with us" column */}
          <div
            className="md:col-span-2 flex flex-col justify-start items-start md:pl-6"
            aria-labelledby="connect-heading"
          >
            <h3 id="connect-heading" className="text-2xl md:text-3xl font-semibold mb-6">
              Connect with us
            </h3>

            {/* subscription box */}
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex w-full max-w-lg bg-white rounded-lg overflow-hidden shadow-sm">
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Drop your mail here..."
                  aria-label="Your email"
                  className="flex-1 px-4 py-3 md:py-4 text-gray-800 text-sm md:text-base focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="bg-orange-400 hover:bg-orange-500 px-5 md:px-6 flex items-center justify-center text-white font-semibold"
                >
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            </form>

            {/* socials */}
            <div className="mt-8 md:mt-12">
              <h4 className="text-lg font-semibold mb-3">Follow us on</h4>
              <div className="flex items-center space-x-4">
                <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer"
                  className="bg-orange-400 hover:bg-orange-500 p-3 md:p-3.5 rounded-full shadow-md"
                  aria-label="Instagram">
                  <Instagram className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                  className="bg-orange-400 hover:bg-orange-500 p-3 md:p-3.5 rounded-full shadow-md"
                  aria-label="Twitter">
                  <Twitter className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                  className="bg-orange-400 hover:bg-orange-500 p-3 md:p-3.5 rounded-full shadow-md"
                  aria-label="Facebook">
                  <Facebook className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </a>
              </div>
            </div>

            {/* spacing to extend column lower */}
            <div className="hidden md:block mt-8" style={{ minHeight: 48 }} />
          </div>
        </div>

        {/* bottom logo */}
        <div className="mt-12 flex justify-start">
          <img
            src="/src/assets/Footer Logo.png"
            alt="Xplore Logo"
            className="w-[220px] h-auto object-contain"
          />
        </div>
      </div>
    </footer>
  );
}