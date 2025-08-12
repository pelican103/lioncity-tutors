import React from "react";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Molly Tan",
      role: "Parent of Primary 5 Student",
      quote: "Suggestion of tutor is good. Able to match my requirement and tutor is very responsible in meeting my children’s needs.",
      highlight: "Able to match my requirement and tutor is very responsible.",
      initial: "M"
    },
    {
      name: "Madushani",
      role: "Parent of Secondary 3 Student",
      quote: "Fast and fuss-free. Just filled in the form and someone got back within the hour. Helped me find a Sec 3 E Math and Chem tutor for my son. So far the tutor is very patient and reliable. Fee also reasonable.",
      highlight: "Fast and fuss-free... tutor is very patient and reliable.",
      initial: "M"
    },
    {
      name: "John Goh",
      role: "Parent of JC Student",
      quote: "Mrs Jenny Lim has helped my daughter's tremendously. Very knowledgeable and experienced when it comes to H2 Math.",
      highlight: "Very knowledgeable and experienced when it comes to H2 Math.",
      initial: "J"
    }
  ];

  return (
    <section id="testimonials" className="py-12 sm:py-20 px-4 sm:px-6 bg-white">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-8 sm:mb-12 text-center">
        What Our Clients Say
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-blue-50 p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center mb-4">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"
              >
                <span className="text-blue-600 font-bold text-lg">{t.initial}</span>
              </motion.div>
              <div className="ml-4">
                <h4 className="font-semibold">{t.name}</h4>
                <p className="text-xs sm:text-sm text-gray-600">{t.role}</p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-700">
              {t.quote.replace(t.highlight, "")}
              <strong> {t.highlight}</strong>
            </p>
            <div className="mt-3 flex text-yellow-400">{"★".repeat(5)}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
