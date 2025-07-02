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

  const navLinkStyle = (path) =>
    `text-sm font-medium px-4 py-2 rounded hover:bg-gray-100 transition ${
      pathname === path ? "bg-gray-200 font-semibold" : ""
    }`;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSubjects = () => {
    setSubjectsOpen(!subjectsOpen);
  };

  const toggleLevels = () => {
    setLevelsOpen(!levelsOpen);
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
    { name: "Primary School", path: "/primary-school-tuition" },
    { name: "Secondary School", path: "/secondary-school-tuition" },
    { name: "Junior College", path: "/jc-tuition" },
  ];

  return (
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
          onMouseLeave={() => setLevelsOpen(false)}
        >
          <button className={`${navLinkStyle("/levels")} flex items-center gap-1`}>
            Levels & Exams
            <ChevronDown size={16} className={`transition-transform ${levelsOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {levelsOpen && (
            <div 
              className="absolute left-0 pt-2 w-48 z-20"
              onMouseEnter={() => setLevelsOpen(true)}
              onMouseLeave={() => setLevelsOpen(false)}
            >
              <div className="bg-white rounded-md shadow-lg py-1">
                {levels.map((level) => (
                  <Link
                    key={level.path}
                    href={level.path}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {level.name}
                  </Link>
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
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {subject.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <Link href="/free-test-papers" className={navLinkStyle("/free-test-papers")}>
          Free Test Papers
        </Link>
        <Link href="/tuition-rates" className={navLinkStyle("/tuition-rates")}>
          Tuition Rates
        </Link>
        <Link href="/blog" className={navLinkStyle("/blog")}>
          Blog
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
              <div className="w-full bg-gray-50 py-2">
                {levels.map((level) => (
                  <Link
                    key={level.path}
                    href={level.path}
                    onClick={toggleMenu}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {level.name}
                  </Link>
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
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {subject.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/free-test-papers" onClick={toggleMenu} className={navLinkStyle("/free-test-papers")}>
            Free Test Papers
          </Link>
          <Link href="/tuition-rates" onClick={toggleMenu} className={navLinkStyle("/tuition-rates")}>
            Tuition Rates
          </Link>
          <Link href="/blog" onClick={toggleMenu} className={navLinkStyle("/blog")}>
            Blog
          </Link>
          <Link href="/contact-us" onClick={toggleMenu} className={navLinkStyle("/contact-us")}>
            Contact Us
          </Link>
        </div>
      )}
    </nav>
  );
}