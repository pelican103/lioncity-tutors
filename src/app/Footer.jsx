import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-teal-700 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* About Us & Video */}
        <div>
          <h4 className="text-lg font-semibold mt-4 mb-2">About Us</h4>
          <p className="text-sm text-white">
            LionCity Tutors is Singapore's top tuition agency. 100% free service with over 100+ successful matches. We offer qualified tutors for all subjects and levels. Our team is available 7 days a week.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links:</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/request-tutor" className="hover:underline">Request A Tutor</Link></li>
            <li><Link href="/tuition-rates" className="hover:underline">Tuition Rates</Link></li>
            <li><Link href="/register-tutor" className="hover:underline">Register as a Tutor</Link></li>
            <li><Link href="/free-test-papers" className="hover:underline">Free Test Papers</Link></li>
            <li><Link href="/blog" className="hover:underline">Our Blog</Link></li>
          </ul>
        </div>

        {/* Contact Info & Socials */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <p className="text-sm mb-2"><strong>Whatsapp / Call:</strong> +65 8870 1152</p>
          <p className="text-sm mb-4"><strong>Email:</strong> admin@lioncitytutors.com</p>
          
          <h4 className="text-lg font-semibold mb-2">Socials</h4>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/lioncitytutors/" target="_blank" rel="noopener noreferrer">
              <img src="https://singaporetuitionteachers.com/wp-content/themes/Divi-child/icons/instagram-xxl.png" alt="Instagram" className="w-6 h-6" />
            </a>
            <a href="https://www.facebook.com/LionCityTutors/" target="_blank" rel="noopener noreferrer">
              <img src="https://singaporetuitionteachers.com/wp-content/themes/Divi-child/icons/facebook-xxl.png" alt="Facebook" className="w-6 h-6" />
            </a>
            <a href="https://www.carousell.sg/u/lioncity_tutors/" target="_blank" rel="noopener noreferrer">
              <img src="https://singaporetuitionteachers.com/wp-content/themes/Divi-child/icons/carousell-xxl.png" alt="Carousell" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="mt-12 border-t border-white/20 pt-6 text-center text-sm text-white/80">
        &copy; {new Date().getFullYear()} LionCity Tutors. All Rights Reserved.<br />
      </div>
    </footer>
  );
}