import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { useAuth } from '../Contexts/AuthContext';
import UserDropdown from './UserDropdown';

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const subHoverTimeoutRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenMenu(null);
        setOpenSubMenu(null);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle window resize to close mobile menu on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
        setOpenMenu(null);
        setOpenSubMenu(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (subHoverTimeoutRef.current) {
        clearTimeout(subHoverTimeoutRef.current);
      }
    };
  }, []);

  // Main menu hover handlers (desktop only)
  const handleMouseEnter = (menuKey) => {
    if (window.innerWidth < 1024) return;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setOpenMenu(menuKey);
    setOpenSubMenu(null);
  };

  const handleMouseLeave = (menuKey) => {
    if (window.innerWidth < 1024) return;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenMenu((prev) => (prev === menuKey ? null : prev));
      setOpenSubMenu(null);
    }, 200);
  };

  const handleDropdownEnter = () => {
    if (window.innerWidth < 1024) return;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handleDropdownLeave = (menuKey) => {
    if (window.innerWidth < 1024) return;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenMenu((prev) => (prev === menuKey ? null : prev));
      setOpenSubMenu(null);
    }, 200);
  };

  // Submenu hover handlers (desktop only)
  const handleSubMouseEnter = (subMenuKey) => {
    if (window.innerWidth < 1024) return;
    if (subHoverTimeoutRef.current) {
      clearTimeout(subHoverTimeoutRef.current);
      subHoverTimeoutRef.current = null;
    }
    setOpenSubMenu(subMenuKey);
  };

  const handleSubMouseLeave = (subMenuKey) => {
    if (window.innerWidth < 1024) return;
    if (subHoverTimeoutRef.current) {
      clearTimeout(subHoverTimeoutRef.current);
    }
    subHoverTimeoutRef.current = setTimeout(() => {
      setOpenSubMenu((prev) => (prev === subMenuKey ? null : prev));
    }, 200);
  };

  const handleSubDropdownEnter = () => {
    if (window.innerWidth < 1024) return;
    if (subHoverTimeoutRef.current) {
      clearTimeout(subHoverTimeoutRef.current);
      subHoverTimeoutRef.current = null;
    }
  };

  const handleSubDropdownLeave = (subMenuKey) => {
    if (window.innerWidth < 1024) return;
    if (subHoverTimeoutRef.current) {
      clearTimeout(subHoverTimeoutRef.current);
    }
    subHoverTimeoutRef.current = setTimeout(() => {
      setOpenSubMenu((prev) => (prev === subMenuKey ? null : prev));
    }, 200);
  };

  // Click handlers for toggle functionality
  const handleMenuClick = (menuKey, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (openMenu === menuKey) {
      setOpenMenu(null);
      setOpenSubMenu(null);
    } else {
      setOpenMenu(menuKey);
      setOpenSubMenu(null);
    }
  };

  const handleSubMenuClick = (subMenuKey, e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenSubMenu(openSubMenu === subMenuKey ? null : subMenuKey);
  };

  const toggleMobileMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
    setOpenSubMenu(null);
  };

  // Handle navigation with React Router
  const handleNavigation = (href) => {
    setOpenMenu(null);
    setOpenSubMenu(null);
    setIsMobileMenuOpen(false);
    navigate(href);
  };

  const navItems = [
    {
      name: "Counseling",
      key: "counseling",
      href: "/counseling",
      items: [
        {
          name: "Career Guidance",
          href: "/counseling/career",
          description: "Professional career counseling",
          key: "career",
          subItems: [
            { name: "10th", href: "/counseling/career/10th" },
            { name: "12th", href: "/counseling/career/12th" },
            { name: "Engineering.", href: "/counseling/career/engineering" },
            { name: "ITI", href: "/counseling/career/iti" },
            { name: "Medical", href: "/counseling/career/medical" },
          ],
        },
        {
          name: "Domain",
          href: "/counseling/domain",
          description: "Specialized domain guidance",
          key: "domain",
          subItems: [
            { name: "Computer", href: "/counseling/domain/computer" },
            { name: "Mechanical", href: "/counseling/domain/mechanical" },
            { name: "Automobile", href: "/counseling/domain/automobile" },
            { name: "Electrical", href: "/counseling/domain/electrical" },
            { name: "Civil", href: "/counseling/domain/civil" },
          ],
        },
        {
          name: "Interview",
          href: "/counseling/interview",
          description: "Interview preparation",
          key: "interview",
          // subItems: [
          //   { name: "Technical Interview", href: "/counseling/interview/technical" },
          //   { name: "HR Interview", href: "/counseling/interview/hr" },
          //   { name: "Group Discussion", href: "/counseling/interview/gd" },
          //   { name: "Mock Interview", href: "/counseling/interview/mock" },
          // ],
        },
        {
          name: "Project",
          href: "/counseling/project",
          description: "Project guidance",
          key: "project",
          // subItems: [
          //   { name: "Final Year Project", href: "/counseling/project/final" },
          //   { name: "Mini Project", href: "/counseling/project/mini" },
          //   { name: "Research Project", href: "/counseling/project/research" },
          //   { name: "Industry Project", href: "/counseling/project/industry" },
          // ],
        },
        {
          name: "After 10th",
          href: "/counseling/career/10th",
          description: "What to do after 10th",
          key: "after-10th",
          subItems: [
            { name: "12th", href: "/counseling/career/12th" },
            { name: "Engineering", href: "/counseling/career/engineering" },
            { name: "ITI", href: "/counseling/career/iti" },
            { name: "Medical", href: "/counseling/career/medical" },
          ],
        },
      ],
    },
    {
      name: "Courses",
      key: "courses",
      href: "/courses",
      items: [
        // {
        //   name: "Programming Languages",
        //   href: "/courses/programming",
        //   description: "Core programming languages",
        //   key: "programming",
        //   subItems: [
        //     { name: "C Programming", href: "/courses/Cprogramming" },
        //     { name: "Java Programming", href: "/courses/JavaProgramming" },
        //     { name: "Python Programming", href: "/courses/PythonProgramming" },
        //     { name: "JavaScript", href: "/courses/javascript" },
        //   ],
        // },
        // {
        //   name: "Full Stack Development",
        //   href: "/courses/fullstack",
        //   description: "Complete web development stacks",
        //   key: "fullstack",
        //   subItems: [
        //     { name: "MEAN Stack", href: "/courses/Mean" },
        //     { name: "MERN Stack", href: "/courses/MernStack" },
        //     { name: "Django Stack", href: "/courses/django" },
        //     { name: "Laravel Stack", href: "/courses/laravel" },
        //   ],
        // },
        // {
        //   name: "Data Science & AI",
        //   href: "/courses/data-ai",
        //   description: "Data science and artificial intelligence",
        //   key: "data-ai",
        //   subItems: [
        //     { name: "Data Analytics", href: "/courses/data-analytics" },
        //     { name: "Machine Learning", href: "/courses/machine-learning" },
        //     { name: "Deep Learning", href: "/courses/deep-learning" },
        //     { name: "AI Applications", href: "/courses/ai-applications" },
        //   ],
        // },
        // {
        //   name: "Cloud & DevOps",
        //   href: "/courses/cloud-devops",
        //   description: "Cloud computing and DevOps",
        //   key: "cloud-devops",
        //   subItems: [
        //     { name: "AWS Fundamentals", href: "/courses/aws" },
        //     { name: "Docker & Kubernetes", href: "/courses/docker-k8s" },
        //     { name: "CI/CD Pipeline", href: "/courses/cicd" },
        //     { name: "Cloud Architecture", href: "/courses/cloud-arch" },
        //   ],
        // },
      ],
    },
    {
      name: "Hackathon",
      key: "hackathon",
      href: "/hackathon",
      items: [
        {
          name: "Upcoming Events",
          href: "/hackathon/hackathon-selection",
          description: "Join upcoming hackathons",
          key: "upcoming",
        },
      ],
    },
    {
      name: "Practice",
      key: "practice",
      href: "/practice",
      items: [
        {
          name: "Coding Challenges",
          href: "/practice/coding",
          description: "Algorithm and data structure problems",
          key: "coding",
        },
        {
          name: "Aptitude Tests",
          href: "/practice/aptitude",
          description: "Logical and quantitative tests",
          key: "aptitude",
        },
        {
          name: "Mock Interviews",
          href: "/practice/interviews",
          description: "Practice technical interviews",
          key: "interviews",
        },
      ],
    },
  ];

  return (
    <nav
      ref={navRef}
      style={{ backgroundColor: '#FFFDFB' }}
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        isScrolled ? "backdrop-blur-sm shadow-lg border-b border-gray-200" : "border-b border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button onClick={() => handleNavigation("/")}> 
              <img
                src="/src/assets/Logo.png"
                alt="Xplore Logo"
                className="w-20 h-auto sm:w-24 md:w-28 lg:w-32 object-contain"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => item.items.length > 0 && handleMouseEnter(item.key)}
                onMouseLeave={() => item.items.length > 0 && handleMouseLeave(item.key)}
              >
                <button
                  type="button"
                  onClick={() => handleNavigation(item.href)}
                  className="flex items-center px-2 xl:px-4 py-2 text-sm xl:text-base text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium rounded-lg hover:bg-blue-50 group"
                >
                  {item.name}
                  {item.items.length > 0 && (
                    <ChevronDown
                      className={`ml-1 xl:ml-2 w-3 h-3 xl:w-4 xl:h-4 transition-transform duration-200 ${
                        openMenu === item.key ? "rotate-180" : "rotate-0"
                      } group-hover:text-blue-600`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMenuClick(item.key, e);
                      }}
                    />
                  )}
                </button>

                {/* Main Dropdown Menu */}
                {item.items.length > 0 && (
                  <div
                    style={{ backgroundColor: '#FFFDFB' }}
                    className={`absolute top-full left-0 mt-1 w-72 xl:w-80 rounded-xl shadow-xl border border-gray-100 py-2 z-[10000] transition-all duration-200 ${
                      openMenu === item.key
                        ? 'opacity-100 visible transform translate-y-0'
                        : 'opacity-0 invisible transform -translate-y-2 pointer-events-none'
                    }`}
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={() => handleDropdownLeave(item.key)}
                  >
                    {item.items.map((subItem, index) => (
                      <div key={index} className="relative">
                        {subItem.subItems && subItem.subItems.length > 0 ? (
                          <div
                            className="relative"
                            onMouseEnter={() => handleSubMouseEnter(subItem.key)}
                            onMouseLeave={() => handleSubMouseLeave(subItem.key)}
                          >
                            <div className="w-full flex items-center hover:bg-gray-50 transition-colors duration-150 group/item">
                              <button
                                onClick={() => handleNavigation(subItem.href)}
                                className="flex-1 px-4 xl:px-6 py-2 xl:py-3 text-left"
                              >
                                <div className="font-medium text-sm xl:text-base text-gray-900 group-hover/item:text-blue-600 transition-colors duration-150">
                                  {subItem.name}
                                </div>
                                <div className="text-xs xl:text-sm text-gray-500 mt-1">{subItem.description}</div>
                              </button>
                              <button
                                onClick={(e) => handleSubMenuClick(subItem.key, e)}
                                className="px-2 xl:px-3 py-2 xl:py-3 hover:bg-gray-100 rounded-r-lg transition-colors duration-150"
                                title={`View ${subItem.name} options`}
                              >
                                <ChevronRight className="w-3 h-3 xl:w-4 xl:h-4 text-gray-400 group-hover/item:text-blue-600" />
                              </button>
                            </div>

                            {/* Sub Dropdown Menu */}
                            <div
                              style={{ backgroundColor: '#FFFDFB' }}
                              className={`absolute top-0 left-full ml-2 w-40 xl:w-48 rounded-xl shadow-xl border border-gray-100 py-2 z-[10001] transition-all duration-200 ${
                                openSubMenu === subItem.key
                                  ? 'opacity-100 visible transform translate-x-0'
                                  : 'opacity-0 invisible transform -translate-x-2 pointer-events-none'
                              }`}
                              onMouseEnter={handleSubDropdownEnter}
                              onMouseLeave={() => handleSubDropdownLeave(subItem.key)}
                            >
                              {subItem.subItems.map((nestedItem, nestedIndex) => (
                                <button
                                  key={nestedIndex}
                                  onClick={() => handleNavigation(nestedItem.href)}
                                  className="block w-full px-3 xl:px-4 py-1.5 xl:py-2 text-left text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150 font-medium"
                                >
                                  {nestedItem.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleNavigation(subItem.href)}
                            className="block w-full px-4 xl:px-6 py-2 xl:py-3 text-left hover:bg-gray-50 transition-colors duration-150 group/item"
                          >
                            <div className="font-medium text-sm xl:text-base text-gray-900 group-hover/item:text-blue-600 transition-colors duration-150">
                              {subItem.name}
                            </div>
                            {subItem.description && (
                              <div className="text-xs xl:text-sm text-gray-500 mt-1">{subItem.description}</div>
                            )}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={() => handleNavigation("/startup")}
              className="px-2 xl:px-4 py-2 text-sm xl:text-base text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium rounded-lg hover:bg-blue-50"
            >
              Startup Services
            </button>
          </div>

          {/* Right Side - Auth Buttons OR User Dropdown (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            {loading ? (
          // Loading skeleton
          <div className="w-24 h-10 bg-gray-200 animate-pulse rounded-lg"></div>
        ) : isAuthenticated ? (
          // Show User Dropdown when logged in
          <UserDropdown />
        ) : (
          // Show Login/Register buttons when not logged in
          <>
            <button
              type="button"
              onClick={() => handleNavigation("/login")}
              className="px-3 xl:px-6 py-1.5 xl:py-2 border-2 border-orange-400 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors duration-200 text-sm xl:text-base font-medium hover:border-orange-500 hover:text-orange-600 hover:shadow-xl hover:-translate-y-0.5"
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => handleNavigation("/register")}
              className="px-3 xl:px-6 py-1.5 xl:py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg hover:from-orange-500 hover:to-orange-600 transition-all duration-200 text-sm xl:text-base font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Register
            </button>
          </>
        )}
      </div>

          {/* Mobile Auth Buttons + Hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            {!loading && !isAuthenticated && (
              <>
                <button
                  type="button"
                  onClick={() => handleNavigation("/login")}
                  aria-label="Login"
                  className="px-2 py-1 border-2 border-orange-400 text-orange-500 rounded-lg bg-orange-50 transition-colors duration-200 text-sm xl:text-base font-medium shadow-lg"
                >
                  Login
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigation("/register")}
                  aria-label="Register"
                  className="px-3 py-1 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg text-sm xl:text-base font-medium shadow-lg"
                >
                  Register
                </button>
              </>
            )}

            {!loading && isAuthenticated && (
              <UserDropdown />
            )}

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div style={{ backgroundColor: '#FFFDFB' }} className="lg:hidden border-t border-gray-200 max-h-screen overflow-y-auto">
            <div className="px-2 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <div key={item.key} className="space-y-1">
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => handleNavigation(item.href)}
                      className="flex-1 px-3 py-2.5 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200 font-medium text-left"
                    >
                      {item.name}
                    </button>
                    {item.items.length > 0 && (
                      <button
                        type="button"
                        onClick={() => toggleMobileMenu(`mobile-${item.key}`)}
                        className="p-2.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            openMenu === `mobile-${item.key}` ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {openMenu === `mobile-${item.key}` && item.items.length > 0 && (
                    <div className="pl-4 space-y-1 bg-gray-50 rounded-lg p-2">
                      {item.items.map((subItem, index) => (
                        <div key={index}>
                          {subItem.subItems && subItem.subItems.length > 0 ? (
                            <div className="space-y-1">
                              <div className="flex items-center">
                                <button
                                  onClick={() => handleNavigation(subItem.href)}
                                  style={{ backgroundColor: '#FFFDFB' }}
                                  className="flex-1 px-3 py-2 text-left text-sm text-gray-600 hover:text-blue-600 rounded-lg transition-colors duration-200 font-medium"
                                >
                                  {subItem.name}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setOpenSubMenu(openSubMenu === `mobile-sub-${subItem.key}` ? null : `mobile-sub-${subItem.key}`)}
                                  className="px-2 py-2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
                                  title={`View ${subItem.name} options`}
                                >
                                  <ChevronDown
                                    className={`w-3 h-3 transition-transform duration-200 ${
                                      openSubMenu === `mobile-sub-${subItem.key}` ? "rotate-180" : "rotate-0"
                                    }`}
                                  />
                                </button>
                              </div>
                              {openSubMenu === `mobile-sub-${subItem.key}` && (
                                <div style={{ backgroundColor: '#FFFDFB' }} className="pl-4 space-y-1 rounded-lg p-2">
                                  {subItem.subItems.map((nestedItem, nestedIndex) => (
                                    <button
                                      key={nestedIndex}
                                      onClick={() => handleNavigation(nestedItem.href)}
                                      className="block w-full px-3 py-1.5 text-left text-xs text-gray-500 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                                    >
                                      {nestedItem.name}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            <button
                              onClick={() => handleNavigation(subItem.href)}
                              style={{ backgroundColor: '#FFFDFB' }}
                              className="block w-full px-3 py-2 text-left text-sm text-gray-600 hover:text-blue-600 rounded-lg transition-colors duration-200"
                            >
                              <div className="font-medium">{subItem.name}</div>
                              {subItem.description && (
                                <div className="text-xs text-gray-500 mt-0.5">{subItem.description}</div>
                              )}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={() => handleNavigation("/startup")}
                className="block w-full px-3 py-2.5 text-left rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Startup Services
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}