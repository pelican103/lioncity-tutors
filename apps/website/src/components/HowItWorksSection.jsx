"use client";
import Image from "next/image";
import { FaWpforms, FaUserCheck, FaBookReader } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import React from "react";
import { motion } from "framer-motion";

export default function HowItWorksSection({ formRef }) {
  const steps = [
    {
      icon: <FaWpforms size={28} />,
      title: "1. Tell Us Your Needs",
      desc: "Complete our quick, 2-minute form detailing the subject, level, and your child's learning style. This service is completely free with no obligations."
    },
    {
      icon: <FaUserCheck size={28} />,
      title: "2. Receive Tutor Profiles",
      desc: "Within 24 hours, our coordinators will send you a curated list of highly qualified and verified tutors whose credentials and experience match your requirements."
    },
    {
      icon: <FaBookReader size={28} />,
      title: "3. Begin Lessons with Confidence",
      desc: "Select the ideal tutor for your child and schedule the first lesson. Payment is only required after the lesson is confirmed, ensuring a perfect match."
    }
  ];

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Find Your Perfect Tutor in 3 Simple Steps</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          Our streamlined process makes it easy to connect with Singapore's best tutors, hassle-free and with complete transparency.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-6 items-center">
        {/* Left Side: Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-96 rounded-xl overflow-hidden shadow-xl order-last md:order-first"
        >
          <Image
            src="/primary-tuition_optimized.webp"
            alt="A friendly Singaporean tutor from LionCity Tutors helping a primary school student with their mathematics homework."
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL="/primary-tuition_optimized.webp"
          />
        </motion.div>

        {/* Right Side: Steps */}
        <div className="flex flex-col gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="flex items-start"
            >
              <div className="flex-shrink-0 bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mr-5 shadow-lg">
                {step.icon}
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-900">{step.title}</h3>
                <p className="text-gray-700 mt-1">{step.desc}</p>
              </div>
            </motion.div>
          ))}

          {/* Call-to-Action Button */}
          <div className="mt-6 ml-20">
            <Button onClick={scrollToForm} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md text-lg">
              Start Your Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}