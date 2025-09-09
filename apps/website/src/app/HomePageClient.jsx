'use client';
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import Image from 'next/image';
import UniqueFeaturesSection from "@/components/UniqueFeaturesSection";
import { Step1, Step2, Step3 } from "@/components/FormSteps";
import TutorPopup from "@/components/TutorPopup";
import { Star, CheckCircle, Award, Users, Clock, Shield, Quote, TrendingUp, MapPin, Phone, Mail } from "lucide-react";

// Lazy-loaded sections
import dynamic from 'next/dynamic';
import ReviewStrip from "@/components/ReviewStrip";
import TestimonialAutoScroller from "@/components/TestimonialAutoScroller";
const SuccessStories = dynamic(() => import('@/components/SuccessStoriesSection'), { ssr: false });
const FAQSection = dynamic(() => import('@/components/FAQSection'), { ssr: false });
const HowitWorksSection = dynamic(() => import('@/components/HowItWorksSection'), { ssr: false });

const Counter = ({ end, duration = 2.5, suffix = "", decimals = 0 }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const currentValue = progress * end;
      setCount(decimals > 0 ? Number(currentValue.toFixed(decimals)) : Math.floor(currentValue));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, decimals]);
  return <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{count}{suffix}</motion.span>;
};

const validateStep = (step, data) => {
    const newErrors = {};

    if (step === 1) {
        if (!data.name.trim()) newErrors.name = "Name is required.";
        if (!data.mobile.trim()) {
            newErrors.mobile = "Mobile number is required.";
        } else if (!/^[689]\d{7}$/.test(data.mobile.trim())) {
            newErrors.mobile = "Please enter a valid 8-digit Singapore mobile number.";
        }
        if (!data.level.trim()) newErrors.level = "Level & Subject are required.";
    }

    if (step === 2) {
        if (!data.location.trim()) newErrors.location = "Location is required.";
    }
    return newErrors;
};


export default function HomePageClient() {
  const router = useRouter();
  const formRef = useRef(null);
  const faqRef = useRef(null);
  const resourcesRef = useRef(null);
  const main = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Use a context for safe cleanup
    const ctx = gsap.context(() => {
      const heroSpans = gsap.utils.toArray('.hero-headline-span');
      gsap.set(heroSpans, { y: 30, opacity: 0 }); // Set initial state

      // 1. Text reveal on load
      gsap.to(heroSpans, {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
      });

      gsap.from('.hero-subheadline, .hero-cta', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.6,
      });


      // 2. Parallax and Fade on Scroll
      ScrollTrigger.create({
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        onUpdate: self => {
          // Parallax for the image
          gsap.to(".hero-image", { y: self.progress * -100, ease: "none" }); 
          // Fade out for the text content
          gsap.to(".hero-content", { opacity: 1 - self.progress * 1.5, ease: "none" }); 
        }
      });

      
    }, main); // Scope the animations to the <main> element

    // Cleanup function
    return () => ctx.revert();
  }, []);

  const scrollToResources = () => resourcesRef.current?.scrollIntoView({ behavior: 'smooth' });

  const [currentStep, setCurrentStep] = useState(1);
  const initialFormData = {
      name: '',
      mobile: '',
      level: '',
      location: '',
      lessonDuration: '1.5 Hours',
      customDuration: '',
      lessonFrequency: '1 Lesson/Week',
      customFrequency: '',
      preferredTime: '',
      tutorType: { partTime: true, fullTime: false, moeTeacher: false }, // Default to Part-Time
      budget: { type: 'marketRate', customAmount: '' },
      preferences: ''
  };
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState({ submitting: false, submitted: false, error: null });
  const [errors, setErrors] = useState({});

  // --- CORRECTED STEP TRANSITION LOGIC ---
  const nextStep = () => {
      const newErrors = validateStep(currentStep, formData);
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
          setCurrentStep(prev => prev + 1);
      }
  };

  const prevStep = () => {
      setErrors({}); // Clear errors when going back
      setCurrentStep(prev => prev - 1);
  };

  // --- CONSOLIDATED & ROBUST handleChange LOGIC ---
  const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      const inputValue = type === 'checkbox' ? checked : value;

      // Clear the specific error when the user starts typing
      if (errors[name]) {
          setErrors(prev => ({ ...prev, [name]: null }));
      }

      if (name.includes('.')) {
          const [parent, child] = name.split('.');
          setFormData(prev => ({
              ...prev,
              [parent]: { ...prev[parent], [child]: inputValue }
          }));
      } else {
          setFormData(prev => ({ ...prev, [name]: inputValue }));
      }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      // Final validation check on all fields before submitting
      const step1Errors = validateStep(1, formData);
      const allErrors = { ...step1Errors };

      if (Object.keys(allErrors).length > 0) {
          setErrors(allErrors);
          // If there are errors from Step 1, automatically go back to it
          if (Object.keys(step1Errors).length > 0) {
              setCurrentStep(1);
          }
          return; // Stop submission if there are any errors
      }

      setStatus({ submitting: true, submitted: false, error: null });
      try {
          const response = await fetch('https://tuition-backend-afud.onrender.com/api/requestfortutor', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData)
          });
          const result = await response.json();
          if (!response.ok) throw new Error(result.error || 'Form submission failed');

          setFormData(initialFormData);
          setCurrentStep(1);
          setStatus({ submitting: false, submitted: true, error: null });
          formRef.current?.scrollIntoView({ behavior: 'smooth' });

      } catch (error) {
          setStatus({ submitting: false, submitted: false, error: error.message });
      }
  };

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToFAQ = () => faqRef.current?.scrollIntoView({ behavior: 'smooth' });
  const testimonials = [
    { initials: 'M.T', name: 'Molly Tan', relation: 'Parent of Primary 3 and Primary 5 Student', text: "Suggestion of tutor is good. Able to match my requirement and tutor is very responsible in meeting my children's needs.", subject: 'Primary Chinese', location: 'Pasir Panjang Road' },
    { initials: 'D.L', name: 'David L.', relation: 'Parent of P6 Student', text: 'No fees for parents. Tutor helped my son move up 3 grades in 2 months.', subject: 'PSLE Math', location: 'Jurong West' },
    { initials: 'M', name: 'Mrs Madushani', relation: 'Parent of Secondary 3 Student', text: "Fast and fuss-free. Just filled in the form and someone got back within the hour. Helped me find a Sec 3 E Math and Chem tutor for my son. So far the tutor is very patient and reliable. Fee also reasonable.", subject: 'Secondary 3 Math & Chemistry', location: 'Woodlands' },
    { initials: 'K.A', name: 'Kaveesha Archana', relation: 'Parent of JC1 Student', text: 'Really glad I found LionCity Tutors. I’ve already recommended them to a few friends. As a working parent, I appreciated how easy and stress-free the entire process was — they listened to our needs and quickly found us a tutor who was a great fit for my daughter. The tutor was not only well-versed in the subject matter but also very encouraging and engaging.', subject: 'H2 Chemistry', location: 'Woodlands' },
    { initials: 'A', name: 'Mrs Athikashri ', relation: 'Parent of Secondary 1 Student', text: 'The agency was very efficient in helping me find a tutor quickly. Communication and arrangements were smooth, and the overall experience was pleasant and hassle-free.', subject: 'Secondary 1 Maths', location: 'Sengkang Central' },


    { initials: 'R.R', name: 'Mrs Rahman', relation: 'Parent of JC1', text: 'Great follow-up and tutor matched to learning style. Highly recommended.', subject: 'H2 Chemistry', location: 'Woodlands' }
  ];

  return (
    <>
      <main ref={main} className="bg-background-default text-text-default">
        <TutorPopup />
        {/* Hero Section */}
        <section className="bg-background-card px-4 py-16 md:py-20 overflow-hidden">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div className="hero-content">
            {/* Animated Text Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2, // This will animate children one by one
                  },
                },
              }}
            >
              <motion.h1
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-4xl md:text-5xl font-bold text-primary leading-tight"
              >
                Find the Right Tutor to Unlock Your Child's Potential.
                <span className="text-text-default"> Expert Matches, Zero Agency Fees.</span>
              </motion.h1>
              
              <motion.p
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mt-4 text-text-default text-lg"
              >
                We connect you with top-rated, MOE-familiar tutors for PSLE, O-Level, and JC subjects. Get qualified profiles within 24 hours. Your child's success starts here.
              </motion.p>

              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <Button
                  className="bg-accent hover:opacity-90 text-text-inverse font-semibold px-8 py-6 rounded-xl shadow-lg text-xl w-full sm:w-auto"
                  onClick={scrollToForm}
                >
                  Get Tutor Profiles Now
                </Button>
                
                <a
                  href="https://wa.me/6588701152?text=Hi%20LionCity%20Tutors%2C%20I%27m%20looking%20for%20a%20tutor."
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary font-semibold flex items-center gap-2 border-2 border-primary px-4 py-2 text-sm rounded-xl hover:bg-primary hover:text-text-inverse transition-colors w-full sm:w-auto justify-center"
                >
                  <Phone className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </motion.div>
            </motion.div>
            </div>

            {/* Animated Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="rounded-2xl overflow-hidden shadow-inner h-64 md:h-80 relative mt-8 md:mt-0 hero-image"
            >
              <Image src="/final.webp" alt="A dedicated tutor helping a student." fill className="object-cover" priority />
            </motion.div>
          </div>
        </section>
        
        <ReviewStrip />
        
        {/* Stats */}
        <section className="bg-background-subtle py-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }} // Triggers when 20% of the section is visible
              className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
            >
            {[
              { icon: <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary" />, end: 100, suffix: "+", label: "Successful Matches", sub: "Every month across SG" },
              { icon: <Users className="w-8 h-8 mx-auto mb-2 text-primary" />, end: 200, suffix: "+", label: "Qualified Tutors", sub: "Carefully vetted professionals" },
              { icon: <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />, end: 24, suffix: "h", label: "Response Time", sub: "Most matched within 6h" },
              { icon: <Star className="w-8 h-8 mx-auto mb-2 text-primary" />, end: 4.8, suffix: "/5", label: "Client Rating", sub: "From hundreds of parents", decimals: 1 }
            ].map((stat, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }} viewport={{ once: true }} className="p-6 bg-background-card rounded-lg shadow-sm border border-border">
                {stat.icon}
                <div className="text-4xl font-bold text-primary mb-2">
                  <Counter end={stat.end} suffix={stat.suffix} decimals={stat.decimals || 0} />
                </div>
                <p className="text-text-default font-semibold">{stat.label}</p>
                <p className="text-text-default/70 text-sm">{stat.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <HowitWorksSection formRef={formRef} />
        
        {/* Social Proof */}
        <section className="py-16 bg-background-subtle">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">Trusted by Parents Across Singapore</h2>
              <p className="text-text-default mt-3 text-lg">Verified reviews from families who found success with our tutors.</p>
            </div>
            <TestimonialAutoScroller testimonials={testimonials} />
            <div className="mt-12 text-center">
              <Button 
                onClick={() => window.open('https://search.google.com/local/reviews?placeid=ChIJz5sczNYR2jERc_4Ka3tDwyY','_blank')} 
                className="bg-transparent text-primary border-2 border-primary hover:bg-primary hover:text-text-inverse font-semibold px-8 py-3 rounded-xl shadow-md text-base"
              >
                Read More Google Reviews
              </Button>
            </div>
          </div>
        </section>
        
        <section className="bg-primary/10 py-8">
            <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
                <div className="flex items-center">
                    <span className="text-3xl mr-4">📚</span>
                    <div>
                        <h3 className="font-bold text-lg text-primary">Studying for Exams?</h3>
                        <p className="text-primary/80">We offer free access to top school exam papers and revision notes.</p>
                    </div>
                </div>
                <Button 
                    className="bg-background-card text-primary font-semibold mt-4 md:mt-0 ring-1 ring-inset ring-border hover:bg-primary/10"
                    onClick={scrollToResources}
                >
                    Show Me The Resources
                </Button>
            </div>
        </section>
        
        <UniqueFeaturesSection />
        <SuccessStories />
  
    {/* --- Form Section with Corrected Props --- */}
    <section ref={formRef} className="form-section-gradient"> 
      <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24"> 
  
      <motion.div
          className="form-card-container"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-4xl font-bold text-center text-primary mb-4">
            Ready to Find The Perfect Tutor?
        </h2>
        <p className="text-center text-text-default/80 mb-10 text-lg">
            Get matched with qualified tutors in 24 hours. Just fill out the details below.
        </p>
        
        {/* The existing benefits icons */}
        <div className="flex justify-center space-x-8 mb-8">
            <div className="flex items-center text-emerald-600">
                <span className="text-2xl mr-2">✅</span>
                <span className="font-medium">Matched within 24 hours</span>
            </div>
            <div className="flex items-center text-emerald-600">
                <span className="text-2xl mr-2">✅</span>
                <span className="font-medium">No hidden fees, ever</span>
            </div>
        </div>
            <div className="bg-background-card rounded-xl shadow-lg p-8">
                {status.submitted ? (
                    <div className="text-center py-10">
                        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
                        <h2 className="text-2xl font-semibold mb-2">Thank you!</h2>
                        <p className="text-text-default/80 mb-4">We'll send you tutor profiles shortly.</p>
                        <Button 
                            className="bg-accent text-text-inverse hover:bg-accent/90" 
                            onClick={() => setStatus({ submitting: false, submitted: false, error: null })}
                        >
                            Submit Another Request
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-8">
                            <div className="flex justify-between mb-1">
                                {["Your Details", "Lesson Details", "Tutor Preferences"].map((step, i) => (
                                    <span key={i} className={`text-sm font-medium ${currentStep >= i + 1 ? 'text-primary' : 'text-gray-400'}`}>{step}</span>
                                ))}
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: `${((currentStep - 1) / 2) * 100}%` }} />
                            </div>
                        </div>
                        {status.error && <div className="bg-red-100 text-red-800 p-4 rounded-md mb-6">{status.error}</div>}
                        
                        {/* Make sure you pass the consolidated handleChange to all steps */}
                        {currentStep === 1 && <Step1 nextStep={nextStep} formData={formData} handleChange={handleChange} errors={errors} />}
                        {currentStep === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} formData={formData} handleChange={handleChange} errors={errors} />}
                        {currentStep === 3 && <Step3 prevStep={prevStep} formData={formData} handleChange={handleChange} handleCheckboxChange={handleChange} status={status} errors={errors} />}
                    </form>
                )}
            </div>
            </motion.div>
            </div>
        </section>
        
        {/* Enhanced Quick Links Section */}

          <section ref={resourcesRef} className="relative overflow-hidden bg-background-default py-16 px-4 sm:px-6">
           {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-20 h-20 bg-blue-600 rounded-full blur-xl"></div>
            <div className="absolute top-32 right-20 w-16 h-16 bg-purple-500 rounded-full blur-lg"></div>
            <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-pink-500 rounded-full blur-xl"></div>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                Access Our Free Resources
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
              <p className="text-slate-600 mt-4 text-lg max-w-2xl mx-auto">
                Unlock your potential with our comprehensive collection of educational materials
              </p>
            </motion.div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Free Test Papers */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative p-8 bg-background-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-border overflow-hidden"
                onClick={() => router.push("/free-test-papers")}
              >
                {/* Card Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Icon Container */}
                <div className="relative z-10 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">📊</span>
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-amber-800 mb-3 group-hover:text-amber-900 transition-colors">
                    Free Test Papers
                  </h3>
                  <p className="text-amber-700/80 leading-relaxed mb-4">
                    Download comprehensive past year papers for all academic levels and subjects.
                  </p>
                  <div className="flex items-center text-amber-600 font-medium group-hover:text-amber-700 transition-colors">
                    <span>Browse Papers</span>
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-amber-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>

              {/* Free Notes */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative p-8 bg-background-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-border overflow-hidden"
                onClick={() => router.push("/free-notes")}
              >
                {/* Card Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Icon Container */}
                <div className="relative z-10 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">📚</span>
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-blue-800 mb-3 group-hover:text-blue-900 transition-colors">
                    Free Notes
                  </h3>
                  <p className="text-blue-700/80 leading-relaxed mb-4">
                    Access concise, high-quality revision notes curated from top schools.
                  </p>
                  <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                    <span>View Notes</span>
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            </div>
            
          </div>
        </section>

        {/* FAQ */}
        <div ref={faqRef}>
          <FAQSection />
        </div>

        {/* Final CTA Banner */}
        <section className="bg-primary text-text-inverse py-10 px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-text-inverse">Ready to Find the Perfect Tutor?</h2>
          <p className="mb-6">Get 3 qualified tutor profiles in 24 hours – absolutely free.</p>
          <Button 
            className="bg-accent text-text-inverse font-bold px-8 py-3 hover:bg-accent/90 transition-colors" 
            onClick={scrollToForm}
          >
            Request My Tutor Now
          </Button>
        </section>
      </main>
    </>
  );
}