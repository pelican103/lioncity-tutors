import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Star, TrendingUp, Award, Quote } from "lucide-react";

export default function SuccessStoriesSection() {
  const stories = [
    {
      name: "Jonathan Goh",
      role: "H2 Math, Raffles Institution",
      before: "D (January)",
      after: "A (Sept)",
      quote: "Mrs Lim, the MOE teacher matched for my H2 Math was exceptional. Her teaching methods and practice materials were exactly what I needed.",
      initial: "J",
      improvement: "3 grades",
      subject: "Mathematics"
    },
    {
      name: "Li Jie",
      role: "PSLE Science, Nan Hua Primary",
      before: "AL5 (March)",
      after: "AL1 (Sept)",
      quote: "Tutor James made Science fun and easy to understand. He helped my grades improve significantly!",
      initial: "L",
      improvement: "4 levels",
      subject: "Science"
    }
  ];

  const stats = [
    { number: "98%", label: "Success Rate", icon: TrendingUp },
    { number: "100+", label: "Students Helped", icon: Award },
    { number: "4.8/5", label: "Parent Rating", icon: Star }
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
            Proven Results
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Student Success <span className="text-blue-600">Stories</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Real students, real improvements. See how our expert tutors help students achieve their academic goals.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 gap-4 md:gap-8 mb-16 max-w-2xl mx-auto"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-3 shadow-lg">
                  <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-sm md:text-base text-gray-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>

        {/* Success Stories Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="group"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 h-full">
                {/* Card Header */}
                <div className="p-6 md:p-8 pb-0">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <span className="text-white text-xl md:text-2xl font-bold">{story.initial}</span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                          <TrendingUp className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-1">{story.name}</h3>
                        <p className="text-sm md:text-base text-gray-600 font-medium">{story.role}</p>
                        <div className="inline-flex items-center gap-1 mt-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                          <TrendingUp className="w-3 h-3" />
                          {story.improvement} improvement
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-sm md:text-base">
                      <span className="text-gray-500 font-medium">Before</span>
                      <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full font-bold text-sm">{story.before}</span>
                    </div>
                    
                    <div className="relative">
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: "0%" }}
                          whileInView={{ width: "100%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: index * 0.3 + 0.5 }}
                          className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-500 rounded-full relative"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                        </motion.div>
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.3 + 1.2 }}
                        className="absolute right-0 -top-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-lg"
                      ></motion.div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm md:text-base">
                      <span className="text-gray-500 font-medium">After</span>
                      <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full font-bold text-sm">{story.after}</span>
                    </div>
                  </div>
                </div>

                {/* Quote Section */}
                <div className="p-6 md:p-8 pt-0">
                  <div className="relative bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-xl md:rounded-2xl p-4 md:p-6">
                    <Quote className="w-6 h-6 text-blue-400 mb-2" />
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base italic">
                      "{story.quote}"
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