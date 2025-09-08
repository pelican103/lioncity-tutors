'use client';

import React, { useRef } from 'react';
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Button } from '@/components/ui/button'; 
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

// Register GSAP plugins only on the client side
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export default function HowItWorksSection({ formRef }) {
  const containerRef = useRef(null);

  const steps = [
    { 
      number: "01", 
      title: "Submit Your Request", 
      description: "Tell us exactly what you need—subject, level, location, and your goals. Our simple form takes less than three minutes to complete.", 
      highlight: {
        before: "Tell us exactly what you need—",
        text: "subject, level, location. ",
        after: "Our simple form takes less than three minutes to complete."
      },
      bgColor: "bg-slate-100", 
      textColor: "text-white",
      accentColor: "text-white",
      bgImage: "url('/combined-chemistry-biology.webp')",
      bgOverlay: "bg-black/40"       
    },
    { 
      number: "02", 
      title: "Receive Curated Profiles", 
      description: "Within 24 hours, we send you a shortlist of 2-3 highly qualified tutors whose experience and teaching style are a perfect match.", 
      highlight: {
        before: "Within 24 hours, we send you a shortlist of 2-3 ",
        text: "highly qualified tutors",
        after: " whose experience and teaching style are a perfect match."
      },
      bgColor: "bg-primary", 
      textColor: "text-white", 
      accentColor: "text-white",
      bgImage: "url('/jc-tuition_optimized.webp')",
      bgOverlay: "bg-black/40"
    },
    { 
      number: "03", 
      title: "Start Learning", 
      description: "Choose the tutor you're most confident in and schedule your first lesson. We handle all the coordination, and our service is always free for you.",
      highlight: {
        before: "Choose the tutor you're most confident in and schedule your first lesson. We handle all the coordination, and our service is ",
        text: "always free for you.",
        after: ""
      }, 
      bgColor: "bg-[#FF6B00]", 
      textColor: "text-white", 
      accentColor: "text-white",
      bgImage: "url('/english-tuition.webp')",
      bgOverlay: "bg-black/50"
    }
  ];

  useGSAP(() => {
  const panels = gsap.utils.toArray('.panel');
  if (panels.length <= 1) return;

  ScrollTrigger.matchMedia({
    "(prefers-reduced-motion: no-preference)": function() {
      const horizontalAnimation = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + (containerRef.current.offsetWidth * (panels.length - 1)),
        }
      });

      panels.forEach((panel, i) => {
        if (i === 0) return; // Skip intro panel

        const title = panel.querySelector(".step-title");
        const description = panel.querySelector(".step-description");
        const ctaButton = panel.querySelector(".cta-button-container");

        // Split both title + description into words
        let splitTitle = new SplitText(title, { type: "words" });
        let splitDesc = new SplitText(description, { type: "words" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            containerAnimation: horizontalAnimation,
            start: "left 50%",
            end: "right 80%",
            toggleActions: "play play play reverse",
            onLeaveBack: () => {
              splitTitle.revert();
              splitDesc.revert();
            },
            onLeave: () => {
              splitTitle.revert();
              splitDesc.revert();
            },
          }
        });

        // Title falling words
        tl.from(splitTitle.words, {
          y: -80,
          opacity: 0,
          scale: 0.9,
          rotationX: -60,
          transformOrigin: "50% 100%",
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1
        });

        // Description falling words (shorter stagger so it flows faster)
        tl.from(splitDesc.words, {
          y: -60,
          opacity: 0,
          scale: 0.95,
          rotationX: -45,
          transformOrigin: "50% 100%",
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.06
        }, "-=0.3"); // start slightly before title finishes

        // CTA button (only panel 3)
        if (ctaButton) {
          tl.from(ctaButton, {
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: "power2.out"
          }, "-=0.2");
        }
      });
    }
  });
}, { scope: containerRef });



  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Intro panel */}
      <div className="w-full flex flex-col justify-center items-center text-center py-24 md:py-32 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          Your Simple Path to the Perfect Tutor
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
          Our process is designed to be transparent, efficient, and tailored to your needs. Scroll to see how we connect you with academic success in just three steps.
        </p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-8 h-8 text-slate-500" />
        </motion.div>
      </div>

      {/* Horizontal scrolling section */}
      <div ref={containerRef} className="h-screen w-full overflow-hidden">
        <div className="flex h-full w-[300vw]">
          {steps.map((step, index) => {
            const isDarkBg = index > 0;
            const activeDotClass = isDarkBg ? 'bg-white' : 'bg-primary';
            const inactiveDotClass = isDarkBg ? 'bg-white/50' : 'bg-slate-400';

            return (
              <div 
                key={index}
                className="panel w-screen h-full flex-shrink-0 flex items-center justify-center p-8 bg-cover bg-center relative"
                style={{ perspective: '1000px' }} // Add perspective for 3D rotation
              >
                {/* Background Image & Overlay */}
                {step.bgImage && (
                  <>
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: step.bgImage }}
                    />
                    <div className={`absolute inset-0 ${step.bgOverlay}`} />
                  </>
                )}

                <div className={`absolute inset-0 flex items-center justify-center text-8xl lg:text-9xl font-extrabold ${step.accentColor} opacity-10 pointer-events-none`}>
                  {step.number}
                </div>
                <div className="max-w-4xl mx-auto text-center z-10 px-4">
                  <h2 className={`step-title text-5xl lg:text-7xl font-bold mb-6 leading-tight ${step.textColor}`}>
                    {step.title}
                  </h2>
                  <p className={`step-description text-2xl lg:text-3xl leading-relaxed max-w-3xl mx-auto mb-8 ${step.textColor}`}>
                    {step.highlight.text ? (
                      <>
                        {step.highlight.before}
                        <span className="font-bold text-accent">{step.highlight.text}</span>
                        {step.highlight.after}
                      </>
                    ) : (
                      step.description
                    )}
                  </p>
                  {index === 2 && (
                    <div className="cta-button-container mt-8">
                      <Button
                        onClick={scrollToForm}
                        size="lg"
                        className="bg-white text-accent hover:bg-white/90 font-bold text-lg px-8 py-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
                      >
                        Request a Tutor Now
                      </Button>
                    </div>
                  )}
                </div>
                
                {/* Navigation indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                  {steps.map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        i === index ? `${activeDotClass} scale-125` : inactiveDotClass
                      }`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}