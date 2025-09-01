import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Image from Next.js
import { FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-100 via-blue-100 to-slate-50 text-slate-800 border-t border-blue-200 shadow-lg"> 
      <div className="max-w-7xl mx-auto py-16 px-6">
        {/* Changed to a 4-column layout for better organization */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Column 1: Branding & Trust */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              {/* Using the original logo since it's orange and will pop against the light background */}
              <Image src="/favicon.png" alt="LionCity Tutors Logo" width={50} height={50} />
            </Link>
            <h3 className="text-xl font-bold text-blue-800">LionCity Tutors</h3>
            <p className="text-sm text-slate-700">
              Singapore's trusted choice for qualified and dedicated tutors.
            </p>
          </div>

          {/* Column 2: For Students & Parents */}
          <div className="mt-4 md:mt-0">
            <h4 className="text-lg font-semibold mb-4 text-blue-800 border-b-2 border-orange-400 pb-2 inline-block">For Students & Parents</h4>
            <ul className="space-y-3 text-sm text-slate-700">
              <li><Link href="/request-tutor" className="hover:text-orange-600 hover:underline transition-colors duration-200">Request A Tutor</Link></li>
              <li><Link href="/tuition-rates" className="hover:text-orange-600 hover:underline transition-colors duration-200">Tuition Rates</Link></li>
              <li><Link href="/blog" className="hover:text-orange-600 hover:underline transition-colors duration-200">Our Blog</Link></li>
              <li><Link href="/free-test-papers" className="hover:text-orange-600 hover:underline transition-colors duration-200">Free Test Papers</Link></li>
              <li><Link href="/free-notes" className="hover:text-orange-600 hover:underline transition-colors duration-200">Free Notes</Link></li>            
            </ul>
          </div>

          {/* Column 3: For Tutors */}
          <div className="mt-4 md:mt-0">
            <h4 className="text-lg font-semibold mb-4 text-blue-800 border-b-2 border-green-400 pb-2 inline-block">For Tutors</h4>
            <ul className="space-y-3 text-sm text-slate-700">
              <li><Link href="/register-tutor" className="hover:text-green-600 hover:underline transition-colors duration-200">Become a Tutor</Link></li>
              <li><Link href="/tuition-assignments" className="hover:text-green-600 hover:underline transition-colors duration-200">Tuition Assignments</Link></li>
              <li><Link href="/terms-and-conditions-for-tutors" className="hover:text-green-600 hover:underline transition-colors duration-200">Tutor T&Cs</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Contact & Socials */}
          <div className="mt-4 md:mt-0">
            <h4 className="text-lg font-semibold mb-4 text-slate-800 border-b-2 border-blue-400 pb-2 inline-block">Contact Us</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><strong className="text-slate-700">WhatsApp:</strong> <a href="tel:+6588701152" className="hover:text-blue-600 hover:underline transition-colors duration-200">+65 8870 1152</a></li>
              <li><strong className="text-slate-700">Email:</strong> <a href="mailto:admin@lioncitytutors.com" className="hover:text-blue-600 hover:underline transition-colors duration-200">admin@lioncitytutors.com</a></li>
            </ul>
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-4 text-slate-800">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/lioncitytutors/" target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram" className="group">
                  <FaInstagram className="w-6 h-6 text-slate-500 group-hover:text-pink-500 transition-colors duration-200" />
                </a>
                <a href="https://www.facebook.com/LionCityTutors/" target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook" className="group">
                  <FaFacebook className="w-6 h-6 text-slate-500 group-hover:text-blue-600 transition-colors duration-200" />
                </a>
                <a href="https://www.carousell.sg/u/lioncity_tutors/" target="_blank" rel="noopener noreferrer" aria-label="Visit our Carousell" className="group">
                  <img src="/carousell_fixed.svg" alt="Carousell" className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity duration-200" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-16 border-t border-slate-300 pt-8 flex flex-col sm:flex-row justify-between items-center text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} LionCity Tutors. All Rights Reserved.</p>
          <div className="space-x-4 mt-4 sm:mt-0">
            <Link href="/terms-and-conditions-for-clients" className="hover:text-blue-600 hover:underline transition-colors duration-200">Client T&Cs</Link>
            <Link href="/privacy-policy" className="hover:text-blue-600 hover:underline transition-colors duration-200">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}