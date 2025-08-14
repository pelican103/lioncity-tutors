"use client";
import Image from "next/image";
import { FaWpforms, FaUserCheck, FaBookReader } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import React from "react";

export default function HowItWorksSection( { formRef }) {
  const steps = [
    {
      icon: <FaWpforms size={24} />,
      title: "1. Submit Your Request",
      desc: "Fill out our simple form in just 2 minutes. Tell us the subject, level, and your specific needs. It's 100% free and no obligation."
    },
    {
      icon: <FaUserCheck size={24} />,
      title: "2. Get Matched for Free",
      desc: "Our experienced coordinators will handpick and verify qualified tutors for you within 24 hours. We'll send you their profiles to review."
    },
    {
      icon: <FaBookReader size={24} />,
      title: "3. Start Learning",
      desc: "Choose the tutor you like best and schedule your first lesson. You only pay after a lesson is confirmed. It's that simple!"
    }
  ];

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth' });
  

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Easy 3-Step Tutor Matching Process</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          We've streamlined our process to connect you with the best tutors in Singapore, hassle-free.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-6 items-center">
        {/* Left Side: Image */}
        <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-xl order-last md:order-first">
          <Image
            src="/primary-tuition_optimized.webp" 
            alt="A friendly Singaporean tutor helping a primary school student with their mathematics homework."
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL="/primary-tuition_optimized.webp"
          />
        </div>

        {/* Right Side: Steps */}
        <div className="flex flex-col gap-8">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start">
              <div className="flex-shrink-0 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mr-5">
                {step.icon}
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-900">{step.title}</h3>
                <p className="text-gray-700 mt-1">{step.desc}</p>
              </div>
            </div>
          ))}
          
          {/* Call-to-Action Button */}
          <div className="mt-6 ml-16">
            <Button onClick={scrollToForm} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md">
              Find Your Perfect Tutor
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}