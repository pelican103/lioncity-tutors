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
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { 
        duration: 0.7, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  return (
    <section className="py-20 sm:py-32 px-6 bg-gradient-to-b from-background-default to-background-subtle relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-primary leading-tight tracking-tight mb-6">
            Why Parents in Singapore<br />Choose Us
          </h2>
          <p className="text-xl text-text-default/80 max-w-3xl mx-auto leading-relaxed">
            We go beyond just finding a tutor. We deliver a comprehensive, supportive, and results-driven experience.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {uniqueFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -12,
                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
              }}
              className="group relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl flex flex-col items-start text-left border border-border/50 transition-all duration-500 overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon with animated background */}
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="relative w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow duration-300"
              >
                <feature.icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-300" />
              </motion.div>
              
              <h3 className="relative text-2xl font-semibold text-primary mb-3 leading-tight group-hover:text-accent transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="relative text-base text-text-default/80 leading-relaxed">
                {feature.description}
              </p>
              
              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}