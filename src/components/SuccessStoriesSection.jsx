import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function SuccessStoriesSection({ scrollToForm }) {
  const stories = [
    {
      name: "Jonathan Goh",
      role: "H2 Math, Raffles Institution",
      before: "C (March)",
      after: "A (Sept)",
      quote: "Mrs Lim, the MOE teacher matched for my H2 Math was exceptional. Her teaching methods and practice materials were exactly what I needed.",
      initial: "J"
    },
    {
      name: "Li Jie",
      role: "PSLE Science, Nan Hua Primary",
      before: "AL5 (March)",
      after: "AL1 (Sept)",
      quote: "Tutor James made Science fun and easy to understand. He helped my grades improve significantly!",
      initial: "L"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-12 text-center">Student Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((s, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xl font-bold">{s.initial}</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-lg">{s.name}</h4>
                    <p className="text-sm text-gray-600">{s.role}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Before</span>
                    <span className="text-red-500 font-bold">{s.before}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-gradient-to-r from-red-500 to-green-500 rounded-full w-full"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">After</span>
                    <span className="text-green-500 font-bold">{s.after}</span>
                  </div>
                </div>
                <p className="mt-4 text-gray-700"><strong>{s.quote}</strong></p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button onClick={scrollToForm} className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 font-bold">
            Request My Tutor Now
          </Button>
        </div>
      </div>
    </section>
  );
}
