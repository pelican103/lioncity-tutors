"use client"

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [subjectsOpen, setSubjectsOpen] = useState(false);
  const [levelsOpen, setLevelsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  // New state for desktop submenu
  const [hoveredLevel, setHoveredLevel] = useState(null);
  // Fixed state for mobile submenu - make it specific to item
  const [openMobileSecondarySubmenu, setOpenMobileSecondarySubmenu] = useState(null);

  const levelsRef = useRef(null);
  const subjectsRef = useRef(null);
  const resourcesRef = useRef(null);

  const navLinkStyle = (path) =>
    `text-sm font-medium px-4 py-2 rounded hover:bg-gray-100 transition ${
      pathname === path ? "bg-gray-200 font-semibold" : ""
    }`;
  
  // Close mobile menu when a link is clicked
  const handleNavLinkClick = () => {
    setMenuOpen(false);
    // Reset mobile submenu states when main menu closes
    setLevelsOpen(false);
    setSubjectsOpen(false);
    setResourcesOpen(false);
    setOpenMobileSecondarySubmenu(null);
  };

  const subjects = [
    { name: "Math Tuition", path: "/math-tuition" },
    { name: "Science Tuition", path: "/science-tuition" },
    { name: "Physics Tuition", path: "/physics-tuition" },
    { name: "Chemistry Tuition", path: "/chemistry-tuition" },
    { name: "Biology Tuition", path: "/biology-tuition" },
    { name: "Economics Tuition", path: "/economics-tuition" },
    { name: "English Tuition", path: "/english-tuition" },
    { name: "Chinese Tuition", path: "/chinese-tuition" },
  ];

  const levels = [
    { name: "Primary School Tuition", path: "/primary-school-tuition" },
    {
      name: "Secondary School Tuition",
      path: "/secondary-school-tuition",
      submenu: [
        { name: "O Level Tuition", path: "/secondary-school-tuition/o-level-tuition" },
        { name: "N Level Tuition", path: "/secondary-school-tuition/n-level-tuition" },
      ],
    },
    { name: "Junior College Tuition", path: "/jc-tuition" },
  ];

  const resources = [
    { name: "Free Notes", path: "/free-notes" },
    { name: "Free Test Papers", path: "/free-test-papers" },
    { name: "Blog", path: "/blog" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (levelsRef.current && !levelsRef.current.contains(event.target)) {
        setLevelsOpen(false);
        setHoveredLevel(null);
      }
      if (subjectsRef.current && !subjectsRef.current.contains(event.target)) {
        setSubjectsOpen(false);
      }
      if (resourcesRef.current && !resourcesRef.current.contains(event.target)) {
        setResourcesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <nav className="w-full bg-white shadow-md px-4 py-3 sm:px-6 flex justify-between items-center relative rounded-b-lg">
      {/* Logo */}
      <Link href="/" className="flex flex-col items-center text-xl font-bold text-red-500">
        <img
          src="/favicon1.webp"
          alt="LionCity Logo"
          className="h-10 w-10"
        />
        LionCity Tutors
      </Link>

      {/* Desktop Nav */}
      <div className="hidden sm:flex space-x-2">
        <Link href="/" className={navLinkStyle("/")}>
          Home
        </Link>
        <Link href="/request-tutor" className={navLinkStyle("/request-tutor")}>
          Request For a Tutor
        </Link>
        <Link href="/register-tutor" className={navLinkStyle("/register-tutor")}>
          Register As a Tutor 
        </Link>
        
        {/* Levels & Exams Dropdown */}
        <div
          ref={levelsRef}
          className="relative group"
          onMouseEnter={() => setLevelsOpen(true)}
          onMouseLeave={() => { setLevelsOpen(false); setHoveredLevel(null); }}
        >
          <button className={`${navLinkStyle("/levels")} flex items-center gap-1 focus:outline-none`}>
            Levels & Exams
            <ChevronDown size={16} className={`transition-transform ${levelsOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {levelsOpen && (
            <div 
              className="absolute left-0 pt-2 w-56 z-20 flex"
              onMouseEnter={() => setLevelsOpen(true)}
              onMouseLeave={() => { setLevelsOpen(false); setHoveredLevel(null); }}
            >
              <div className="bg-white rounded-md shadow-lg py-1 min-w-[220px]">
                {levels.map((level) => (
                  <div
                    key={level.path}
                    onMouseEnter={() => level.submenu ? setHoveredLevel(level.name) : setHoveredLevel(null)}
                    className="relative"
                  >
                    <Link
                      href={level.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap flex justify-between items-center"
                    >
                      <span>{level.name}</span>
                      {level.submenu && (
                        <ChevronDown size={14} className="ml-2 -rotate-90 flex-shrink-0" />
                      )}
                    </Link>
                    {/* Submenu for Secondary School Tuition */}
                    {level.submenu && hoveredLevel === level.name && (
                      <div className="absolute left-full top-0 z-30 flex"
                        onMouseEnter={() => setHoveredLevel(level.name)}
                        onMouseLeave={() => setHoveredLevel(null)}
                      >
                        {/* Transparent buffer to prevent accidental mouseout */}
                        <div style={{ width: '1px', height: '100%' }} />
                        <div className="bg-white rounded-md shadow-lg py-1 min-w-[180px] flex flex-col border border-gray-100">
                          {level.submenu.map((sub) => (
                            <Link
                              key={sub.path}
                              href={sub.path}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Subjects Dropdown */}
        <div
          ref={subjectsRef}
          className="relative group"
          onMouseEnter={() => setSubjectsOpen(true)}
          onMouseLeave={() => setSubjectsOpen(false)}
        >
          <button className={`${navLinkStyle("/subjects")} flex items-center gap-1 focus:outline-none`}>
            Subjects
            <ChevronDown size={16} className={`transition-transform ${subjectsOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {subjectsOpen && (
            <div 
              className="absolute left-0 pt-2 w-48 z-20"
              onMouseEnter={() => setSubjectsOpen(true)}
              onMouseLeave={() => setSubjectsOpen(false)}
            >
              <div className="bg-white rounded-md shadow-lg py-1 min-w-[180px] border border-gray-100">
                {subjects.map((subject) => (
                  <Link
                    key={subject.path}
                    href={subject.path}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
                  >
                    {subject.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Resources Dropdown */}
        <div
          ref={resourcesRef}
          className="relative group"
          onMouseEnter={() => setResourcesOpen(true)}
          onMouseLeave={() => setResourcesOpen(false)}
        >
          <button className={`${navLinkStyle("/resources")} flex items-center gap-1 focus:outline-none`}>
            Resources
            <ChevronDown size={16} className={`transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
          </button>

          {resourcesOpen && (
            <div
              className="absolute left-0 pt-2 w-max z-20"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <div className="bg-white rounded-md shadow-lg py-1 min-w-[180px] border border-gray-100">
                {resources.map((resource) => (
                  <Link
                    key={resource.path}
                    href={resource.path}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
                  >
                    {resource.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <Link href="/tuition-rates" className={navLinkStyle("/tuition-rates")}>
          Tuition Rates
        </Link>

        <Link href="/contact-us" className={navLinkStyle("/contact-us")}>
          Contact Us
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="sm:hidden text-gray-600 focus:outline-none p-2 rounded-md hover:bg-gray-100"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle mobile menu"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-center py-4 space-y-2 z-10 sm:hidden rounded-b-lg">
          <Link href="/" onClick={handleNavLinkClick} className={navLinkStyle("/")}>
            Home
          </Link>
          <Link href="/request-tutor" onClick={handleNavLinkClick} className={navLinkStyle("/request-tutor")}>
            Request For a Tutor
          </Link>
          <Link href="/register-tutor" onClick={handleNavLinkClick} className={navLinkStyle("/register-tutor")}>
            Register As a Tutor
          </Link>

          {/* Mobile Levels & Exams Dropdown */}
          <div className="w-full">
            <button
              onClick={() => setLevelsOpen(!levelsOpen)}
              className={`${navLinkStyle("/levels")} w-full flex items-center justify-center px-4 py-2 focus:outline-none`}
            >
              Levels & Exams
              <ChevronDown size={16} className={`transition-transform ${levelsOpen ? 'rotate-180' : ''}`} />
            </button>
            {levelsOpen && (
              <div className="w-full bg-gray-50 py-2 border-t border-gray-100 flex flex-col items-center">
                {levels.map((level) => (
                  <div key={level.path} className="w-full">
                    {level.submenu ? (
                      <>
                        <button
                          onClick={() => setOpenMobileSecondarySubmenu(
                            openMobileSecondarySubmenu === level.name ? null : level.name
                          )}
                          className="block w-full text-center px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-center"
                        >
                          {level.name}
                          <ChevronDown 
                            size={14} 
                            className={`ml-0.5 transition-transform ${
                              openMobileSecondarySubmenu === level.name ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>
                        {openMobileSecondarySubmenu === level.name && (
                          <div className="w-full border-l border-gray-200 flex flex-col items-center">
                            {level.submenu.map((sub) => (
                              <Link
                                key={sub.path}
                                href={sub.path}
                                onClick={handleNavLinkClick}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={level.path}
                        onClick={handleNavLinkClick}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center"
                      >
                        {level.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Subjects Dropdown */}
          <div className="w-full">
            <button
              onClick={() => setSubjectsOpen(!subjectsOpen)}
              className={`${navLinkStyle("/subjects")} w-full flex items-center justify-center px-4 py-2 focus:outline-none`}
            >
              Subjects
              <ChevronDown size={16} className={`transition-transform ${subjectsOpen ? 'rotate-180' : ''}`} />
            </button>

            {subjectsOpen && (
              <div className="w-full bg-gray-50 py-2 border-t border-gray-100 flex flex-col items-center">
                {subjects.map((subject) => (
                  <Link
                    key={subject.path}
                    href={subject.path}
                    onClick={handleNavLinkClick}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center"
                  >
                    {subject.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Resources Dropdown */}
          <div className="w-full">
            <button
              onClick={() => setResourcesOpen(!resourcesOpen)}
              className={`${navLinkStyle("/resources")} w-full flex items-center justify-center px-4 py-2 focus:outline-none`}
            >
              Resources
              <ChevronDown size={16} className={`transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
            </button>

            {resourcesOpen && (
              <div className="w-full bg-gray-50 py-2 border-t border-gray-100 flex flex-col items-center">
                {resources.map((resource) => (
                  <Link
                    key={resource.path}
                    href={resource.path}
                    onClick={handleNavLinkClick}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center"
                  >
                    {resource.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/tuition-rates" onClick={handleNavLinkClick} className={navLinkStyle("/tuition-rates")}>
            Tuition Rates
          </Link>
          <Link href="/contact-us" onClick={handleNavLinkClick} className={navLinkStyle("/contact-us")}>
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
}