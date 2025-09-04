import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Star, TrendingUp, Award, Quote } from "lucide-react";

export default function SuccessStoriesSection() {
  const stories = [
    {
      name: "Jonathan Goh",
      role: "JC2 Student, Raffles Institution",
      before: "D Grade (Mid-Years)",
      after: "A Grade (Prelims)",
      quote: "The MOE teacher matched for my H2 Math was exceptional. Mrs. Lim's teaching methods and the targeted practice materials were exactly what I needed to grasp complex topics.",
      initial: "J",
      improvement: "From D to A",
      subject: "H2 Mathematics"
    },
    {
      name: "Li Jie's Mother",
      role: "Parent of a P6 Student, Nan Hua Primary",
      before: "AL5 (Term 1)",
      after: "AL1 (PSLE)",
      quote: "Tutor James made Science engaging and easy to understand for my daughter. His patience and passion for teaching helped her grades improve significantly and boosted her confidence.",
      initial: "L",
      improvement: "From AL5 to AL1",
      subject: "PSLE Science"
    }
  ];

  const stats = [
    { number: "98%", label: "Successful Matches", icon: TrendingUp },
    { number: "Top 10%", label: "of Tutors Accepted", icon: Award },
    { number: "4.8/5", label: "Average Parent Rating", icon: Star }
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/15 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100/80 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            Proven Academic Results
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Stories of <span className="text-blue-600">Transformation and Success</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover how our dedicated tutors have helped students across Singapore not only improve their grades but also build lasting confidence.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16 max-w-3xl mx-auto"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center p-6 bg-white/50 rounded-2xl shadow-md">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-base text-gray-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>

        {/* Success Stories Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="group"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 h-full flex flex-col">
                {/* Card Header */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white text-2xl font-bold">{story.initial}</span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900">{story.name}</h3>
                      <p className="text-base text-gray-600 font-medium">{story.role}</p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    Improvement: {story.improvement}
                  </div>
                </div>

                {/* Progress Section */}
                <div className="px-6 md:px-8">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-red-600 font-semibold bg-red-100 px-3 py-1 rounded-md text-sm">Before: {story.before}</span>
                        <span className="text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-md text-sm">After: {story.after}</span>
                    </div>
                  <div className="relative h-2.5 w-full bg-gray-200 rounded-full">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-400 to-green-500 rounded-full"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                    />
                  </div>
                </div>

                {/* Quote Section */}
                <div className="p-6 md:p-8 mt-auto">
                  <div className="relative bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-xl md:rounded-2xl p-6">
                    <Quote className="w-8 h-8 text-blue-300 absolute top-3 left-3" />
                    <p className="text-gray-700 leading-relaxed text-base italic pl-4">
                      {story.quote}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}