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

// Lazy-loaded sections
import dynamic from 'next/dynamic';
const Testimonials = dynamic(() => import('@/components/TestimonialsSection'), { ssr: false });
const SuccessStories = dynamic(() => import('@/components/SuccessStoriesSection'), { ssr: false });
const FAQSection = dynamic(() => import('@/components/FAQSection'), { ssr: false });
const HowitWorksSection = dynamic(() => import('@/components/HowItWorksSection'), { ssr: false });

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

  return (
    <>
      <Head>
        <title>#1 Home Tuition Agency in Singapore | LionCity Tutors</title>
        <meta name="description" content="Get 3 qualified tutor profiles in 24h – Free. Connect with trusted home tutors for Primary, Secondary & JC subjects in Singapore." />
        {/* Local Business Schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "LionCity Tutors",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Boon Lay Wy, Tradehub 21",
                "addressLocality": "Singapore",
                "postalCode": "609966",
                "addressCountry": "SG"
              },
              "url": "https://www.lioncitytutors.com/",
              "telephone": "+65 88701152",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                  ],
                  "opens": "09:00",
                  "closes": "21:00"
                }
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8", 
                "reviewCount": "13",  
                "bestRating": "5",
                "worstRating": "3"
              }
            }
          `}
        </script>
        {/* Service Schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Home Tuition Services",
              "description": "Professional home tuition matching service connecting students with qualified tutors for Primary, Secondary, and JC subjects in Singapore.",
              "provider": {
                "@type": "LocalBusiness",
                "name": "LionCity Tutors",
                "url": "https://www.lioncitytutors.com/"
              },
              "serviceType": "Home Tuition",
              "areaServed": {
                "@type": "Country",
                "name": "Singapore"
              },
              "hasOfferingCatalog": {
                "@type": "OfferingCatalog",
                "name": "Tuition Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Primary School Tuition",
                      "description": "Home tuition for Primary 1-6 students"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Secondary School Tuition", 
                      "description": "Home tuition for Secondary 1-5 students"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Junior College Tuition",
                      "description": "Home tuition for JC1-2 students"
                    }
                  }
                ]
              },
              "offers": {
                "@type": "Offer",
                "description": "Free tutor matching service - no agency fees",
                "price": "0",
                "priceCurrency": "SGD"
              }
            }
          `}
        </script>
        {/* FAQ Page Schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How much does it cost to request a tutor?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our matching service is completely free! You only pay the tutor's rate directly to them after the lessons begin."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How quickly will I receive tutor profiles?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We typically send you tutor profiles within 24 hours of your request. Our team works 7 days a week to ensure fast matching."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What qualifications do your tutors have?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our tutors range from university undergraduates to MOE teachers. All tutors are carefully vetted and have proven academic excellence."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I try a lesson before committing?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! We offer trial lessons so you can ensure the tutor is the right fit for your child before making a long-term commitment."
                  }
                }
              ]
            }
          `}
        </script>
      </Head>

      <main className="bg-white text-gray-800">
        <TutorPopup />
        {/* Hero */}
        <section className="relative w-full overflow-hidden"> 
          <motion.div 
            className="absolute inset-0" 
            initial={{ scale: 1.1 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: 1.5 }}
          >
            <Image 
              src="/final.webp" 
              alt="Students receiving personalized home tuition" 
              fill 
              className="object-cover object-top" 
              priority 
              sizes="100vw" 
            />
          </motion.div>
          <div className="relative z-10 bg-black/40 flex items-center justify-center py-8 sm:py-20 md:py-20 min-h-[480px] sm:min-h-[450px] md:min-h-[550px]">
            <div className="text-center text-white px-4 max-w-4xl">
              <p className="text-lg sm:text-xl uppercase font-extrabold text-red-500 mb-2">
                LionCity Tutors
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-tight mb-2">
                Unlock Your Child's Potential with Singapore's Top Tutors
              </h1>
              <p className="text-base sm:text-lg mb-2">
                Rated <span className="font-bold text-yellow-400">4.8/5 stars</span> by parents across Singapore
              </p>
              <p className="text-sm sm:text-lg md:text-xl mb-8">
                Get matched with a qualified professional for free – guaranteed within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-3 text-base" onClick={scrollToForm}>
                  Get Tutor Profiles in 24h – Free
                </Button>
                <Button className="bg-transparent border border-white hover:bg-white hover:text-red-500 text-white px-8 py-3 text-base" onClick={() => router.push("/tuition-rates")}>
                  View Tuition Rates
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-3"> 
                {[
                  { text: "100% Free Service", action: scrollToForm },
                  { text: "24h Response Time", action: scrollToForm },
                  { text: "Qualified Tutors", action: scrollToFAQ }
                ].map((badge, i) => (
                  <div key={i} onClick={badge.action} className="flex items-center bg-black/20 px-3 py-1.5 rounded-full text-sm cursor-pointer hover:bg-black/30">
                    <span className="text-yellow-400 mr-2">✓</span> {badge.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

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

        {/* How It Works Section */}
        <HowitWorksSection formRef={formRef} />

        {/* Unique Features */}
        <UniqueFeaturesSection />
        
        {/* Testimonials */}
        <Testimonials formRef = {formRef}/>

        {/* Success Stories */}
        <SuccessStories  />

        {/* Form */}
        <div ref={formRef} className="max-w-4xl mx-auto py-16 px-6">
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">Free Request For Tutor</h2>
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
