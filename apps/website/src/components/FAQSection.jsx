import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// SEO & Best Practice: FAQ data is kept separate. No changes needed here.
const faqs = [
  {
    question: "How much does it cost to request a tutor?",
    answer: "Our matching service is completely free! You only pay the tutor's rate directly to them after the lessons begin."
  },
  {
    question: "How quickly will I receive tutor profiles?",
    answer: "We typically send you tutor profiles within 24 hours of your request. Our team works 7 days a week to ensure fast matching."
  },
  {
    question: "What qualifications do your tutors have?",
    answer: "Our tutors range from university undergraduates to MOE teachers. All tutors are carefully vetted and have proven academic excellence."
  },
  {
    question: "Can I try a lesson before committing?",
    answer: "Yes! We offer trial lessons so you can ensure the tutor is the right fit for your child before making a long-term commitment."
  }
];

// Best Practice: Individual FAQ item is its own component for clarity.
function FAQItem({ faq, isOpen, onClick }) {
  const itemVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  return (
    // SEO & Accessibility: Using <details> and <summary> is semantically correct for accordions.
    // It's accessible by default (keyboard navigable, screen-reader friendly).
    // We prevent the default toggle behavior to let our state and animation handle it.
    <details
      className="bg-background-card rounded-lg shadow-sm overflow-hidden border border-border"
      open={isOpen}
      onClick={(e) => {
        e.preventDefault(); // Prevent default browser toggle
        onClick();
      }}
    >
      <summary
        className="w-full flex justify-between items-center p-6 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        {/* SEO: The question is now a proper heading, improving the document outline. */}
        <h3 className="text-lg font-semibold text-primary">{faq.question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="text-primary" />
        </motion.div>
      </summary>
      
      {/* Performance Fix: AnimatePresence controls the enter/exit animations. */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="closed"
            animate="open"
            exit="closed"
            variants={itemVariants}
            className="px-6 text-text-default/90"
          >
            {/* The padding-bottom is now part of the content div to be included in the animation */}
            <div className="pb-6">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </details>
  );
}


export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // SEO: Generate JSON-LD structured data for Google Rich Results.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-20 px-6 bg-background-default">
      {/* Add the schema script to the head of your document */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-primary">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}