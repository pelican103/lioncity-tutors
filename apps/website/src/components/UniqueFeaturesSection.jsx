import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Wallet, Headphones, CalendarCheck, TrendingUp } from 'lucide-react';

const uniqueFeatures = [
  {
    icon: Users,
    title: 'Tailored Tutor Matching',
    description: 'We meticulously handpick tutors to perfectly align with your child\'s unique learning style, academic needs, and personality, ensuring a truly personalized educational journey.'
  },
  {
    icon: Award,
    title: 'Elite, Vetted Educators',
    description: 'Our tutors are rigorously screened for academic excellence, extensive teaching experience, and a genuine passion for guiding students to achieve their full potential.'
  },
  {
    icon: Wallet,
    title: 'Transparent & Fair Pricing',
    description: 'Experience premium tuition quality without any surprises. Our competitive rates are clear, with no hidden agency fees – you pay the tutor directly.'
  },
  {
    icon: Headphones,
    title: 'Dedicated Support & Guidance',
    description: 'From your initial inquiry to ongoing lesson coordination, our friendly and responsive team provides continuous support, making your experience seamless and stress-free.'
  },
  {
    icon: CalendarCheck,
    title: 'Flexible Learning Solutions',
    description: 'We understand busy schedules. Benefit from adaptable lesson timings, trial sessions, and customized learning plans designed to fit your family\'s lifestyle.'
  },
  {
    icon: TrendingUp,
    title: 'Proven Academic Transformations',
    description: 'Join a community of hundreds of students who have not only improved their grades but also developed confidence and a love for learning, thanks to our expert tutors.'
  }
];

export default function UniqueFeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };
  
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 bg-background-default">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary leading-tight">
            Why Parents in Singapore Choose Us
          </h2>
          <p className="mt-4 text-lg text-text-default/90 max-w-2xl mx-auto">
            We go beyond just finding a tutor. We deliver a comprehensive, supportive, and results-driven experience.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {uniqueFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -8,
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.2 }
              }}
              className="bg-background-card p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center border border-border border-b-4 border-b-transparent hover:border-b-primary transition-all duration-300"
            >
              <motion.div
                className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5"
              >
                <feature.icon className="w-9 h-9 text-primary" />
              </motion.div>
              
              <motion.h3
                variants={contentVariants}
                className="text-xl sm:text-2xl font-bold text-primary mb-2 leading-snug"
              >
                {feature.title}
              </motion.h3>
              
              <motion.p
                variants={contentVariants}
                className="text-sm text-text-default leading-relaxed"
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}