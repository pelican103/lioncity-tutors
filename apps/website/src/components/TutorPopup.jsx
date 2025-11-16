"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function TutorPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState({ name: "", mobile: "" });
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const popupActionTaken = sessionStorage.getItem('popupActionTaken');
    if (popupActionTaken) {
      return;
    }
    // Show popup after 6 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, [pathname]);

  const closePopup = () => {
    setShowPopup(false);
    // Set the flag when the user closes the popup
    sessionStorage.setItem('popupActionTaken', 'true');
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPopupData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Set the flag when the user submits the form
    sessionStorage.setItem('popupActionTaken', 'true');
    // Encode values to make URL safe
    const params = new URLSearchParams(popupData).toString();

    // Redirect to full form with data
    router.push(`/request-tutor?${params}#form`);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative transform animate-scaleIn">
        {/* Close button */}
        <button aria-label="Close popup"
          onClick={closePopup}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
        >
          &times;
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Receive Your <span className="text-orange-600">Free</span> List of Tutors
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Fast, free, and tailored to your needs.
        </p>

        {/* Bullet points */}
        <ul className="text-gray-700 mb-6 space-y-2">
          <li>✅ 100% Free & No Obligations</li>
          <li>✅ Request Now, Decide Later</li>
          <li>✅ Experienced & Vetted Tutors</li>
          <li>✅ Fast Response from Our Team</li>
        </ul>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={popupData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile"
            value={popupData.mobile}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg w-full transition"
          >
            Receive List of Tutors
          </button>
        </form>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
