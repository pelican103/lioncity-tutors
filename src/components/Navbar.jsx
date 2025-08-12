"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Dropdown from "./Dropdown";
import { subjects, levels, resources } from "../data/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const navLinkStyle = (path) =>
    `text-sm font-medium px-4 py-2 rounded hover:bg-gray-100 transition ${
      pathname === path ? "bg-gray-200 font-semibold" : ""
    }`;

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <>
      {/* Contact Banner */}
      <div className="w-full bg-gradient-to-r from-red-50 to-red-100 border-b border-red-200 text-red-700 text-sm py-3 px-6 flex justify-center sm:justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-red-500">📞</span>
          <a href="tel:+6588701152" className="font-medium hover:text-red-600">
            +65 8870 1152
          </a>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-red-500">✉️</span>
          <a href="mailto:admin@lioncitytutors.com" className="font-medium hover:text-red-600">
            admin@lioncitytutors.com
          </a>
          <Link
            href="/request-tutor"
            className="ml-4 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition"
          >
            Get Free Tutor Matching
          </Link>
        </div>
      </div>

      <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center relative">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-center text-xl font-bold text-red-500">
          <Image src="/favicon1.png" alt="LionCity Logo" width={40} height={40} priority />
          LionCity Tutors
        </Link>

        {/* Desktop Nav */}
        <div className="hidden sm:flex space-x-2 items-center">
          <Link href="/" className={navLinkStyle("/")}>Home</Link>

          <Link href="/register-tutor" className={navLinkStyle("/register-tutor")}>
            Register As a Tutor
          </Link>

          <Dropdown
            label="Levels & Exams"
            items={levels}
            open={openDropdown === "levels"}
            onToggle={() => toggleDropdown("levels")}
          />
          <Dropdown
            label="Subjects"
            items={subjects}
            open={openDropdown === "subjects"}
            onToggle={() => toggleDropdown("subjects")}
          />
          <Dropdown
            label="Free Resources"
            items={resources}
            open={openDropdown === "resources"}
            onToggle={() => toggleDropdown("resources")}
          />

          <Link href="/tuition-rates" className={navLinkStyle("/tuition-rates")}>Tuition Rates</Link>
          <Link href="/contact-us" className={navLinkStyle("/contact-us")}>Contact Us</Link>
          {/* Main CTA */}
          <Link
            href="/request-tutor"
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 shadow-md hover:shadow-lg transition font-semibold"
          >
            📚 Get Free Tutor Matching
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="sm:hidden text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-2 z-50">
            {/* CTA First */}
            <Link
              href="/request-tutor"
              onClick={() => setMenuOpen(false)}
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 shadow-md font-semibold"
            >
              📚 Get Free Tutor Matching
            </Link>

            <Link href="/" onClick={() => setMenuOpen(false)} className={navLinkStyle("/")}>
              Home
            </Link>
            <Link href="/register-tutor" onClick={() => setMenuOpen(false)} className={navLinkStyle("/register-tutor")}>
              Register As a Tutor
            </Link>

            <Dropdown
              label="Levels & Exams"
              items={levels}
              open={openDropdown === "levels"}
              onToggle={() => toggleDropdown("levels")}
              isMobile
            />
            <Dropdown
              label="Subjects"
              items={subjects}
              open={openDropdown === "subjects"}
              onToggle={() => toggleDropdown("subjects")}
              isMobile
            />
            <Dropdown
              label="Free Resources"
              items={resources}
              open={openDropdown === "resources"}
              onToggle={() => toggleDropdown("resources")}
              isMobile
            />

            <Link href="/tuition-rates" onClick={() => setMenuOpen(false)} className={navLinkStyle("/tuition-rates")}>
              Tuition Rates
            </Link>
            <Link href="/contact-us" onClick={() => setMenuOpen(false)} className={navLinkStyle("/contact-us")}>
              Contact Us
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
