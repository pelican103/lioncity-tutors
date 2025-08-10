"use client"

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Menu, X, ChevronDown } from "lucide-react"; // using lucide icons!

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [subjectsOpen, setSubjectsOpen] = useState(false);
  const [levelsOpen, setLevelsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false); // New state for resources
  // New state for desktop submenu
  const [hoveredLevel, setHoveredLevel] = useState(null);
  // New state for mobile submenu
  const [openSecondarySubmenu, setOpenSecondarySubmenu] = useState(false);

  const navLinkStyle = (path) =>
    `text-sm font-medium px-4 py-2 rounded hover:bg-gray-100 transition ${
      pathname === path ? "bg-gray-200 font-semibold" : ""
    }`;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Close dropdowns when closing main menu
    if (menuOpen) {
        setLevelsOpen(false);
        setSubjectsOpen(false);
        setResourcesOpen(false);
        setOpenSecondarySubmenu(false);
    }
  };

  const toggleSubjects = () => {
    setSubjectsOpen(!subjectsOpen);
    setLevelsOpen(false); // Close other menus
    setResourcesOpen(false);
  };

  const toggleLevels = () => {
    setLevelsOpen(!levelsOpen);
    setSubjectsOpen(false); // Close other menus
    setResourcesOpen(false);
  };

  const toggleResources = () => {
    setResourcesOpen(!resourcesOpen);
    setLevelsOpen(false); // Close other menus
    setSubjectsOpen(false);
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

  // New resources array
  const resources = [
    { name: "Free Notes", path: "/free-notes" },
    { name: "Free Test Papers", path: "/free-test-papers" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <>
    {/* Contact Banner */}
    <div className="w-full bg-gradient-to-r from-red-50 to-red-100 border-b border-red-200 text-red-700 text-sm py-3 px-6 flex justify-center sm:justify-end items-center">
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2">
          <span className="text-red-500">📞</span>
          <a 
            href="tel:+6588701152" 
            className="font-medium hover:text-red-600 transition-colors duration-200"
          >
            +65 8870 1152
          </a>
        </div>
        <div className="hidden sm:block w-px h-4 bg-red-300"></div>
        <div className="flex items-center gap-2">
          <span className="text-red-500">✉️</span>
          <a 
            href="mailto:admin@lioncitytutors.com" 
            className="font-medium hover:text-red-600 transition-colors duration-200"
          >
            admin@lioncitytutors.com
          </a>
        </div>
      </div>
    </div>

    <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center relative">
      {/* Logo */}
      <Link href="/" className="flex flex-col items-center text-xl font-bold text-red-500">
        <img
          src="/favicon1.png"
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
          className="relative group"
          onMouseEnter={() => setLevelsOpen(true)}
          onMouseLeave={() => { setLevelsOpen(false); setHoveredLevel(null); }}
        >
          <button className={`${navLinkStyle("/levels")} flex items-center gap-1`}>
            Levels & Exams
            <ChevronDown size={16} className={`transition-transform ${levelsOpen ? 'rotate-180' : ''}`} />
          </button>

          {levelsOpen && (
            <div 
              className="absolute left-0 pt-2 w-50 z-20 flex"
              onMouseEnter={() => setLevelsOpen(true)}
              onMouseLeave={() => { setLevelsOpen(false); setHoveredLevel(null); }}
            >
              <div className="bg-white rounded-md shadow-lg py-1 min-w-[200px]">
                {levels.map((level) => (
                  <div
                    key={level.path}
                    onMouseEnter={() => level.submenu ? setHoveredLevel(level.path) : setHoveredLevel(null)}
                    onMouseLeave={() => setHoveredLevel(null)}
                    className="relative"
                  >
                    <Link
                      href={level.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap text-center" // <-- Added this
                    >
                      {level.name}
                      {level.submenu && <ChevronDown size={14} className="inline align-middle ml-0.5" />}
                    </Link>
                    {/* Submenu for Secondary School Tuition */}
                    {level.submenu && hoveredLevel === level.path && (
                      
                      <div className="absolute left-full top-0 z-30 flex"
                        onMouseEnter={() => setHoveredLevel(level.path)}
                        onMouseLeave={() => setHoveredLevel(null)}
                      >
                        {/* Transparent buffer to prevent accidental mouseout */}
                        <div style={{ width: 1, height: '100%' }} />
                        <div className="bg-white rounded-md shadow-lg py-1 min-w-[180px] flex flex-col">
                          {level.submenu.map((sub) => (
                            <Link
                              key={sub.path}
                              href={sub.path}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap text-center" // <-- Added this
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
          className="relative group"
          onMouseEnter={() => setSubjectsOpen(true)}
          onMouseLeave={() => setSubjectsOpen(false)}
        >
          <button className={`${navLinkStyle("/subjects")} flex items-center gap-1`}>
            Subjects
            <ChevronDown size={16} className={`transition-transform ${subjectsOpen ? 'rotate-180' : ''}`} />
          </button>

          {subjectsOpen && (
            <div 
              className="absolute left-0 pt-2 w-48 z-20"
              onMouseEnter={() => setSubjectsOpen(true)}
              onMouseLeave={() => setSubjectsOpen(false)}
            >
              <div className="bg-white rounded-md shadow-lg py-1">
                {subjects.map((subject) => (
                  <Link
                    key={subject.path}
                    href={subject.path}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center" // <-- Added this
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
          className="relative group"
          onMouseEnter={() => setResourcesOpen(true)}
          onMouseLeave={() => setResourcesOpen(false)}
        >
          <button className={`${navLinkStyle("/resources")} flex items-center gap-1`}>
            Free Resources
            <ChevronDown size={16} className={`transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
          </button>

          {resourcesOpen && (
            <div 
              className="absolute left-0 pt-2 w-48 z-20"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <div className="bg-white rounded-md shadow-lg py-1">
                {resources.map((resource) => (
                  <Link
                    key={resource.path}
                    href={resource.path}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center" // <-- Added this
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
        className="sm:hidden text-gray-600 focus:outline-none"
        onClick={toggleMenu}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-2 z-10">
          <Link href="/" onClick={toggleMenu} className={navLinkStyle("/")}>
            Home
          </Link>
          <Link href="/request-tutor" onClick={toggleMenu} className={navLinkStyle("/request-tutor")}>
            Request For a Tutor
          </Link>
          <Link href="/register-tutor" onClick={toggleMenu} className={navLinkStyle("/register-tutor")}>
            Register As a Tutor
          </Link>

          {/* Mobile Levels & Exams Dropdown */}
          <div className="w-full">
            <button 
              onClick={toggleLevels}
              className={`${navLinkStyle("/levels")} w-full flex items-center justify-center gap-1`}
            >
              Levels & Exams
              <ChevronDown size={16} className={`transition-transform ${levelsOpen ? 'rotate-180' : ''}`} />
            </button>
            {levelsOpen && (
              <div className="w-full mx-auto bg-gray-50 py-2">
                {levels.map((level) => (
                  <div key={level.path} className="w-full">
                    {level.submenu ? (
                      <>
                        <button
                          onClick={() => setOpenSecondarySubmenu((prev) => !prev)}
                          className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-center" // <-- Centered button text
                        >
                          {level.name}
                          <ChevronDown size={14} className={`ml-2 transition-transform ${openSecondarySubmenu ? 'rotate-180' : ''}`} />
                        </button>
                        {openSecondarySubmenu && (
                          <div className="pl-4 border-l border-gray-200">
                            {level.submenu.map((sub) => (
                              <Link
                                key={sub.path}
                                href={sub.path}
                                onClick={toggleMenu}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center" // <-- Added this
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
                        onClick={toggleMenu}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center" // <-- Added this
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
              onClick={toggleSubjects}
              className={`${navLinkStyle("/subjects")} w-full flex items-center justify-center gap-1`}
            >
              Subjects
              <ChevronDown size={16} className={`transition-transform ${subjectsOpen ? 'rotate-180' : ''}`} />
            </button>

            {subjectsOpen && (
              <div className="w-full bg-gray-50 py-2">
                {subjects.map((subject) => (
                  <Link
                    key={subject.path}
                    href={subject.path}
                    onClick={toggleMenu}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center" // <-- Added this
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
              onClick={toggleResources}
              className={`${navLinkStyle("/resources")} w-full flex items-center justify-center gap-1`}
            >
              Resources
              <ChevronDown size={16} className={`transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
            </button>

            {resourcesOpen && (
              <div className="w-full bg-gray-50 py-2">
                {resources.map((resource) => (
                  <Link
                    key={resource.path}
                    href={resource.path}
                    onClick={toggleMenu}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center" // <-- Added this
                  >
                    {resource.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/tuition-rates" onClick={toggleMenu} className={navLinkStyle("/tuition-rates")}>
            Tuition Rates
          </Link>
          <Link href="/contact-us" onClick={toggleMenu} className={navLinkStyle("/contact-us")}>
            Contact Us
          </Link>
        </div>
      )}
    </nav>
    </>
  );
}