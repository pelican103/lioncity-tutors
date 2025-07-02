import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Contact Us | LionCity Tutors',
  description: 'Contact Us at LionCity Tutors.',
  openGraph: {
    title: 'Contact Us | LionCity Tutors',
    description: 'Contact Us at LionCity Tutors.',
    url: 'https://www.lioncitytutors.com/contact-us',
    type: 'website',
  },
};

export default function ContactUs() {
  return (
  <>
  <main>
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-7">Contact Us</h1>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        We'd love to hear from you! Reach out via any of the methods below and our team will get back to you as soon as possible.
      </p>

      <div className="bg-white shadow-md rounded-xl p-8 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">📞 Phone / WhatsApp</h2>
          <p className="text-gray-700 text-lg">+65 8870 1152</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">📧 Email</h2>
          <p className="text-gray-700 text-lg">admin@lioncitytutors.com</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-blue-600 mb-2">🕒 Operating Hours</h2>
          <p className="text-gray-700 text-lg">Monday – Sunday: 9:00 AM – 9:00 PM</p>
        </div>

      </div>
    </div>
    </main>
    </>
  );
}
