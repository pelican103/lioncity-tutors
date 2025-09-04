'use client';
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import Head from 'next/head';
import Image from 'next/image';
import UniqueFeaturesSection from "@/components/UniqueFeaturesSection";
import { Step1, Step2, Step3 } from "@/components/FormSteps";
import TutorPopup from "@/components/TutorPopup";
import { Star, CheckCircle, Award, Users, Clock, Shield, Quote, TrendingUp, MapPin, Phone, Mail } from "lucide-react";

// Lazy-loaded sections
import dynamic from 'next/dynamic';
import ReviewStrip from "@/components/ReviewStrip";
const SuccessStories = dynamic(() => import('@/components/SuccessStoriesSection'), { ssr: false });
const FAQSection = dynamic(() => import('@/components/FAQSection'), { ssr: false });
const HowitWorksSection = dynamic(() => import('@/components/HowItWorksSection'), { ssr: false });
const TestimonialCard = ({ t }) => (
  <article className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className="flex items-center gap-2 mb-3">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
      ))}
    </div>
    <div className="flex-grow">
      <p className="text-slate-700 text-base leading-relaxed relative">
        <Quote className="w-8 h-8 text-slate-100 absolute -top-2 -left-3" />
        <span className="relative z-10">{t.text}</span>
      </p>
    </div>
    <div className="mt-4 flex items-center gap-4 pt-4 border-t border-slate-100">
      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-lg">{t.initials}</div>
      <div>
        <h4 className="font-semibold text-slate-900">{t.name}</h4>
        <div className="text-sm text-slate-500">{t.relation} • {t.location}</div>
      </div>
    </div>
  </article>
);

// Counter component
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

export default function HomePageClient() {
  const router = useRouter();
  const formRef = useRef(null);
  const faqRef = useRef(null);
  const resourcesRef = useRef(null);
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
    tutorType: { partTime: false, fullTime: false, moeTeacher: false },
    budget: { type: 'marketRate', customAmount: '' },
    genderPreference: 'No preference',
    bilingualRequired: 'No',
    preferences: ''
  };
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState({ submitting: false, submitted: false, error: null });

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prevData => ({ ...prevData, [parent]: { ...prevData[parent], [child]: value } }));
    } else {
      setFormData(prevData => ({ ...prevData, [name]: value }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name.includes('.')) {
      const [objectName, field] = name.split('.');
      setFormData(prevData => ({
        ...prevData,
        [objectName]: { ...prevData[objectName], [field]: checked }
      }));
    } else {
      setFormData(prevData => ({ ...prevData, [name]: checked }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: null });
    try {
      const response = await fetch('https://tuition-backend-afud.onrender.com/api/requestfortutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setFormData(initialFormData);
        setCurrentStep(1);
        setStatus({ submitting: false, submitted: true, error: null });
      } else {
        throw new Error(await response.text() || 'Form submission failed');
      }
    } catch (error) {
      setStatus({ submitting: false, submitted: false, error: error.message || 'Failed to submit form.' });
    }
  };

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToFAQ = () => faqRef.current?.scrollIntoView({ behavior: 'smooth' });
  const testimonials = [
    { initials: 'S.T', name: 'Sharon T.', relation: 'Parent of Sec 4', text: 'Matched an excellent O-Level Math tutor within a day. Clear updates and professional service.', subject: 'O-Level Math', location: 'Tampines' },
    { initials: 'D.L', name: 'David L.', relation: 'Parent of P6', text: 'No fees for parents. Tutor helped my son move up 3 grades in 2 months.', subject: 'PSLE Math', location: 'Jurong West' },
    { initials: 'R.R', name: 'Mrs Rahman', relation: 'Parent of JC1', text: 'Great follow-up and tutor matched to learning style. Highly recommended.', subject: 'H2 Chemistry', location: 'Woodlands' }
    ];

  return (
    <>
      <main className="bg-white text-gray-800">
        <TutorPopup />
        {/* Hero */}
        <section className="bg-white px-4 py-12 md:py-16">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            
            {/* Left Side: Content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Find the Right Tutor to Unlock Your Child's Potential.
                <span className="text-emerald-600"> Expert Matches, Zero Agency Fees.</span>
              </h1>
              
              <p className="mt-4 text-gray-700 text-lg">
                We connect you with top-rated, MOE-familiar tutors for PSLE, O-Level, and JC subjects. Get qualified profiles within 24 hours. Your child's success starts here.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* PRIMARY CTA - Solid and Prominent */}
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-6 rounded-xl shadow-lg text-xl w-full sm:w-auto"
                  onClick={() => {
                    formRef.current?.scrollIntoView({ behavior: "smooth" });
                    // gaEvent("lead_view", { form_id: "parent_request" }); // Uncomment if you have analytics setup
                  }}
                >
                  Get Tutor Profiles Now
                </Button>
                
                {/* SECONDARY CTA - Outline style, less prominent */}
                <a
                  href="https://wa.me/6588701152?text=Hi%20LionCity%20Tutors%2C%20I%27m%20looking%20for%20a%20tutor."
                  target="_blank"
                  rel="noreferrer"
                  // onClick={() => gaEvent("lead_submit", { method: "whatsapp" })} // Uncomment if you have analytics setup
                  className="text-emerald-700 font-semibold flex items-center gap-2 border-2 border-emerald-600 px-4 py-2 text-sm rounded-xl hover:bg-emerald-50 transition-colors w-full sm:w-auto justify-center"
                >
                  <Phone className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Right Side: Image */}
            <div className="rounded-2xl overflow-hidden shadow-inner h-64 md:h-80 relative mt-8 md:mt-0">
              <Image
                src="/final.webp" // Ensure you have this image in your /public folder
                alt="A dedicated tutor from LionCity Tutors helping a student in Singapore excel."
                fill
                className="object-cover"
                priority
              />
            </div>
            
          </div>
        </section>
        
        <ReviewStrip />
        
        {/* Stats */}
        <section className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { end: 100, suffix: "+", label: "Successful Matches", sub: "Every month across SG" },
              { end: 200, suffix: "+", label: "Qualified Tutors", sub: "Carefully vetted professionals" },
              { end: 24, suffix: "h", label: "Response Time", sub: "Most matched within 6h" },
              { end: 4.8, suffix: "/5", label: "Client Rating", sub: "From hundreds of parents", decimals: 1 }
            ].map((stat, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }} viewport={{ once: true }} className="p-6 bg-blue-50 rounded-lg shadow-sm">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  <Counter end={stat.end} suffix={stat.suffix} decimals={stat.decimals || 0} />
                </div>
                <p className="text-gray-700 font-semibold">{stat.label}</p>
                <p className="text-gray-500 text-sm">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <HowitWorksSection formRef={formRef} />
        
        {/* Soical Proof */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Trusted by Parents Across Singapore</h2>
              <p className="text-slate-600 mt-3 text-lg">Verified reviews from families who found success with our tutors.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => <TestimonialCard key={i} t={t} />)}
            </div>
            <div className="mt-12 text-center">
              <Button 
                onClick={() => window.open('https://search.google.com/local/reviews?placeid=ChIJz5sczNYR2jERc_4Ka3tDwyY','_blank')} 
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3 rounded-xl shadow-md text-base"
              >
                Read More Google Reviews
              </Button>
            </div>
          </div>
        </section>
            
        <section className="bg-blue-50 py-8">
          <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            <div className="flex items-center">
              <span className="text-3xl mr-4">📚</span>
              <div>
                <h3 className="font-bold text-lg text-blue-900">Studying for Exams?</h3>
                <p className="text-blue-800">We offer free access to top school exam papers and revision notes.</p>
              </div>
            </div>
            <Button 
              className="bg-white text-blue-600 font-semibold mt-4 md:mt-0 ring-1 ring-inset ring-blue-200 hover:bg-blue-100"
              onClick={scrollToResources}
            >
              Show Me The Resources
            </Button>
          </div>
        </section>
        
        {/* Unique Features */}
        <UniqueFeaturesSection />
        
        {/* Success Stories */}
        <SuccessStories  />

        {/* Form */}
        <div ref={formRef} className="max-w-4xl mx-auto py-16 px-6">
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">Free Request For Tutor</h2>
          <p className="text-center text-gray-600 mb-10">Get matched with qualified tutors in 24 hours</p>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {status.submitted ? (
              <div className="text-center py-10">
                <div className="text-green-500 text-5xl mb-4">✓</div>
                <h2 className="text-2xl font-semibold mb-2">Thank you!</h2>
                <p className="text-gray-600 mb-4">We'll send you tutor profiles shortly.</p>
                <Button onClick={() => setStatus({ submitting: false, submitted: false, error: null })}>Submit Another Request</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <div className="flex justify-between mb-1">
                    {["About You", "Lesson Details", "Tutor Preferences"].map((step, i) => (
                      <span key={i} className={`text-sm font-medium ${currentStep >= i + 1 ? 'text-blue-700' : 'text-gray-400'}`}>{step}</span>
                    ))}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full transition-all duration-500" style={{ width: `${((currentStep - 1) / 2) * 100}%` }} />
                  </div>
                </div>
                {status.error && <div className="bg-red-100 text-red-800 p-4 rounded-md mb-6">{status.error}</div>}
                {currentStep === 1 && <Step1 nextStep={nextStep} formData={formData} handleChange={handleChange} />}
                {currentStep === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} formData={formData} handleChange={handleChange} />}
                {currentStep === 3 && <Step3 prevStep={prevStep} formData={formData} handleChange={handleChange} handleCheckboxChange={handleCheckboxChange} status={status} />}
              </form>
            )}
          </div>
        </div>
        
        {/* Enhanced Quick Links Section */}
        <section ref = {resourcesRef} className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50 py-16 px-4 sm:px-6">
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
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-4">
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
                className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-amber-100 overflow-hidden"
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
                className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-blue-100 overflow-hidden"
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
        <section className="bg-red-500 text-white py-10 px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Find the Perfect Tutor?</h2>
          <p className="mb-6">Get 3 qualified tutor profiles in 24 hours – absolutely free.</p>
          <Button className="bg-white text-red-500 font-bold px-8 py-3 hover:bg-gray-100" onClick={scrollToForm}>
            Request My Tutor Now
          </Button>
        </section>
      </main>
    </>
  );
}
