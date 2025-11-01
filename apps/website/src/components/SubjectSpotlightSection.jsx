// src/components/SubjectSpotlightSection.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Atom, Calculator, Languages, ArrowRight, Radiation } from 'lucide-react';

const subjects = [
  { name: 'PSLE Math', href: '/psle-math', icon: <Calculator className="w-8 h-8 text-accent" />, description: 'Build a strong foundation for PSLE success.' },
  { name: 'O-Level Chemistry', href: '/o-level-chemistry', icon: <Atom className="w-8 h-8 text-accent" />, description: 'Master concepts from stoichiometry to organic chemistry.' },
  { name: 'A-Level GP', href: '/a-level-physics', icon: <Radiation className="w-8 h-8 text-accent" />, description: 'Develop critical thinking and essay writing skills.' },
  { name: 'Primary English', href: '/psle-english', icon: <BookOpen className="w-8 h-8 text-accent" />, description: 'Excel in composition, comprehension, and grammar.' },
];

const cardVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

const SubjectSpotlightSection = () => {
  return (
  <section className="py-16 bg-background-default ">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Find a Tutor for Your Subject</h2>
          <p className="text-text-default mt-3 text-lg max-w-2xl mx-auto">We have specialists for all core subjects and levels. Get started with 1 of our 4 most requested subjects.</p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {subjects.map((subject) => (
            <motion.div key={subject.name} variants={cardVariants}>
              <Link href={subject.href} passHref>
                <div className="group bg-background-card h-full p-6 rounded-xl shadow-md hover:shadow-xl border border-border hover:border-primary transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
                  <div className="mb-4">{subject.icon}</div>
                  <h3 className="text-xl font-bold text-primary mb-2">{subject.name}</h3>
                  <p className="text-text-default/80 flex-grow">{subject.description}</p>
                  <div className="mt-4 flex items-center text-accent font-semibold">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SubjectSpotlightSection;