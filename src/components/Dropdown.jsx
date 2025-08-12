"use client";
import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function Dropdown({ label, items, open, onToggle, isMobile = false }) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        aria-haspopup="true"
        aria-expanded={open}
        className={`text-sm font-medium px-4 py-2 rounded hover:bg-gray-100 transition flex items-center gap-1 w-full justify-center`}
      >
        {label}
        <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          className={`${isMobile ? "bg-gray-50 py-2" : "absolute left-0 pt-2 z-20"} animate-fadeIn`}
        >
          <div className={`${isMobile ? "" : "bg-white rounded-md shadow-lg py-1 min-w-[200px]"}`}>
            {items.map((item) => (
              <div key={item.path} className="relative">
                <Link
                  href={item.path}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center"
                >
                  {item.name}
                </Link>
                {item.submenu && !isMobile && (
                  <div className="absolute left-full top-0 bg-white rounded-md shadow-lg py-1 min-w-[180px] hidden group-hover:block">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.path}
                        href={sub.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
