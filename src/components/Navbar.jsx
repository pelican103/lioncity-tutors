"use client"

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  // 1. Initialize the router
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [subjectsOpen, setSubjectsOpen] = useState(false);
  const [levelsOpen, setLevelsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [hoveredLevel, setHoveredLevel] = useState(null);
  const [openMobileSecondarySubmenu, setOpenMobileSecondarySubmenu] = useState(null);

  const levelsRef = useRef(null);
  const subjectsRef = useRef(null);
  const resourcesRef = useRef(null);

  const navLinkStyle = (path) =>
    `text-sm font-medium px-4 py-2 rounded hover:bg-gray-100 transition ${
      pathname === path ? "bg-gray-200 font-semibold" : ""
    }`;

  // 2. Create a new handler for mobile navigation
  const handleMobileLinkClick = (path) => {
    // First, initiate navigation
    router.push(path);
    // Then, close all menus
    setMenuOpen(false);
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

  // --- No changes needed in the Desktop JSX ---
  return (
    <nav className="w-full bg-white shadow-md px-4 py-3 sm:px-6 flex justify-between items-center relative rounded-b-lg">
      <Link href="/" className="flex flex-col items-center text-xl font-bold text-red-500">
        <img
          src="/favicon1.webp"
          alt="LionCity Logo"
          className="h-10 w-10"
        />
        LionCity Tutors
      </Link>

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
                    {level.submenu && hoveredLevel === level.name && (
                      <div className="absolute left-full top-0 z-30 flex"
                        onMouseEnter={() => setHoveredLevel(level.name)}
                        onMouseLeave={() => setHoveredLevel(null)}
                      >
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

      <button
        className="sm:hidden text-gray-600 focus:outline-none p-2 rounded-md hover:bg-gray-100"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle mobile menu"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* --- Changes are in the Mobile Menu JSX below --- */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-center py-4 space-y-2 z-10 sm:hidden rounded-b-lg">
          {/* 3. Use a button or div for the onClick, not the Link itself, and call the new handler */}
          <button onClick={() => handleMobileLinkClick("/")} className={navLinkStyle("/")}>
            Home
          </button>
          <button onClick={() => handleMobileLinkClick("/request-tutor")} className={navLinkStyle("/request-tutor")}>
            Request For a Tutor
          </button>
          <button onClick={() => handleMobileLinkClick("/register-tutor")} className={navLinkStyle("/register-tutor")}>
            Register As a Tutor
          </button>

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
                              // 4. Update the submenu links to use the new handler
                              <button
                                key={sub.path}
                                onClick={() => handleMobileLinkClick(sub.path)}
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center"
                              >
                                {sub.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      // 5. Update the primary level links to use the new handler
                      <button
                        onClick={() => handleMobileLinkClick(level.path)}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center"
                      >
                        {level.name}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

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
                  // 6. Update all other submenu links
                  <button
                    key={subject.path}
                    onClick={() => handleMobileLinkClick(subject.path)}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center"
                  >
                    {subject.name}
                  </button>
                ))}
              </div>
            )}
          </div>

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
                  <button
                    key={resource.path}
                    onClick={() => handleMobileLinkClick(resource.path)}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center"
                  >
                    {resource.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button onClick={() => handleMobileLinkClick("/tuition-rates")} className={navLinkStyle("/tuition-rates")}>
            Tuition Rates
          </button>
          <button onClick={() => handleMobileLinkClick("/contact-us")} className={navLinkStyle("/contact-us")}>
            Contact Us
          </button>
        </div>
      )}
    </nav>
  );
}