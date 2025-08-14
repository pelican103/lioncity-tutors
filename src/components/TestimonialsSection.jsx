"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Molly Tan",
      role: "Parent of Primary 3 and Primary 5 Student",
      quote:
        "Suggestion of tutor is good. Able to match my requirement and tutor is very responsible in meeting my children's needs.",
      highlight:
        "Able to match my requirement and tutor is very responsible.",
      initial: "M",
      subject: "Chinese"
    },
    {
      name: "Madushani",
      role: "Parent of Secondary 3 Student",
      quote:
        "Fast and fuss-free. Just filled in the form and someone got back within the hour. Helped me find a Sec 3 E Math and Chem tutor for my son. So far the tutor is very patient and reliable. Fee also reasonable.",
      highlight:
        "Fast and fuss-free... tutor is very patient and reliable.",
      initial: "M",
      subject: "Math & Chemistry"
    },
    {
      name: "John Goh",
      role: "Parent of JC Student",
      quote:
        "Mrs Jenny Lim has helped my daughter's tremendously. Very knowledgeable and experienced when it comes to H2 Math.",
      highlight:
        "Very knowledgeable and experienced when it comes to H2 Math.",
      initial: "J",
      subject: "H2 Mathematics"
    }
  ];

  const stats = [
    { 
      number: "100+", 
      label: "Parents Served", 
      sub: "And growing fast",
      icon: "👥"
    },
    { 
      number: "100%", 
      label: "Success Rate", 
      sub: "Parents found their ideal tutor",
      icon: "🎯"
    },
    { 
      number: "< 6h", 
      label: "Response Time", 
      sub: "Quick matching guaranteed",
      icon: "⚡"
    },
    { 
      number: "100%", 
      label: "Free Service", 
      sub: "No hidden fees ever",
      icon: "💯"
    }
  ];

  return (
    <section id="testimonials" className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star size={16} className="fill-current" />
            Parent Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Trusted by Singapore Parents
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See why hundreds of families choose LionCity Tutors for their children's academic success
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          
          {/* Testimonials Column - Takes 2/3 on desktop */}
          <div className="lg:col-span-2">
            <div className="grid gap-6 sm:gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Quote size={48} className="text-orange-500" />
                  </div>
                  
                  <div className="flex items-start gap-4 mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <span className="text-white font-bold text-lg">
                        {testimonial.initial}
                      </span>
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4 className="font-bold text-gray-900 text-lg">
                          {testimonial.name}
                        </h4>
                        <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                          ✓ Verified
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {testimonial.role}
                      </p>
                      <span className="inline-block bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded-md font-medium">
                        {testimonial.subject}
                      </span>
                    </div>
                  </div>

                  <blockquote className="text-gray-700 text-base leading-relaxed mb-4 relative z-10">
                    "{testimonial.quote}"
                  </blockquote>

                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} className="fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">Verified Review</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats Column - Takes 1/3 on desktop */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="sticky top-8"
            >
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 text-center lg:text-left">
                  Why Choose Us?
                </h3>
                <p className="text-gray-600 text-sm mb-8 text-center lg:text-left">
                  Numbers that speak for themselves
                </p>

                <div className="grid grid-cols-2 lg:grid-cols-1 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="text-center lg:text-left p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 transition-all duration-300"
                    >
                      <div className="text-2xl mb-2">{stat.icon}</div>
                      <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">
                        {stat.number}
                      </div>
                      <div className="font-semibold text-gray-800 text-sm">
                        {stat.label}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {stat.sub}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8"
                >
                  <a href="/request-tutor" className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    Find Your Perfect Tutor
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}