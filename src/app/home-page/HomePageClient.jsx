'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaPhoneAlt, FaWhatsapp, FaArrowRight } from "react-icons/fa";
import { motion, useScroll, useTransform, useAnimation } from "framer-motion";
import { Info } from "lucide-react";
import Head from 'next/head';
import Image from 'next/image';
import UniqueFeaturesSection from "@/components/UniqueFeaturesSection";
import {Step1, Step2, Step3} from "@/components/FormSteps";
import TutorPopup from "@/components/TutorPopup";

// Counter component
const Counter = ({ end, duration = 2.5, suffix = "", decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      // Handle decimal numbers
      const currentValue = progress * end;
      setCount(decimals > 0 ? Number(currentValue.toFixed(decimals)) : Math.floor(currentValue));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, decimals]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {count}{suffix}
    </motion.span>
  );
};


export default function HomePageClient(props) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const initialFormData = {
    name: '',
    mobile: '',
    email: '',
    level: '',
    location: '',
    lessonDuration: '1.5 Hours',
    customDuration: '',
    lessonFrequency: '1 Lesson/Week',
    customFrequency: '',
    preferredTime: '',
    tutorType: {
      partTime: false,
      fullTime: false,
      moeTeacher: false
    },
    budget: {
      type: 'marketRate', // 'marketRate' or 'custom'
      customAmount: ''
    },
    genderPreference: 'No preference',
    bilingualRequired: 'No',
    preferences: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prevData => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleNestedChange = (objectName, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [objectName]: {
        ...prevData[objectName],
        [field]: value
      }
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name.includes('.')) {
      const [objectName, field] = name.split('.');
      handleNestedChange(objectName, field, checked);
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: checked
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: null });
    const payload = {
      ...formData,
      budget: {
        marketRate: formData.budget.type === 'marketRate',
        custom: formData.budget.type === 'custom',
        customAmount: formData.budget.type === 'custom' ? formData.budget.customAmount : ''
      }
    };
    
    try {
      const response = await fetch('https://tuition-backend-afud.onrender.com/api/requestfortutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const result = await response.json();
        console.log('Submission successful:', result);
        setFormData(initialFormData);
        setCurrentStep(1);
        setStatus({ submitting: false, submitted: true, error: null });
      } else {
        const errorText = await response.text();
        throw new Error(errorText || 'Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({ submitting: false, submitted: false, error: error.message || 'Failed to submit the form. Please try again.' });
    }
  };
 
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  
    return (
      <>
      <Head>
        <title>#1 Home Tuition Agency in Singapore | LionCity Tutors</title>
        <meta name="description" content="Connect with trusted home tutors in Singapore for Primary, Secondary, and JC subjects. Fast matching, no agency fees, and guaranteed satisfaction." />
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
              ]
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
      <main>
      <TutorPopup />
      <div className="min-h-screen bg-white text-gray-800">
        {/* Hero Banner Section - Fixed mobile formatting issues */}
        {/* MODIFIED: Increased the base height on mobile from h-[280px] to h-[360px] to prevent content from being cut off. */}
        <section className="relative w-full h-[360px] sm:h-[300px] md:h-[550px] overflow-hidden">
        {/* The motion.div now wraps the Image component to apply the scaling animation.
          It is positioned absolutely to fill the parent <section>.
        */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
            <Image
              src="/final.webp"
              alt="Students receiving personalized home tuition in Singapore - LionCity Tutors"
              fill 
              className="object-cover object-top" 
              priority 
            />
        </motion.div>

          {/* The overlay div for text and buttons. This sits on top of the image. */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              // MODIFIED: Increased top padding (pt-8 to pt-12) and bottom padding (pb-6 to pb-8) for more vertical space.
              className="text-center text-white px-3 sm:px-4 max-w-4xl w-full pt-6 pb-8 sm:py-0"
            >
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                // MODIFIED: Increased margin-bottom (mb-1 to mb-2) for more space below the subheading.
                className="text-lg sm:text-xl uppercase font-extrabold text-red-500 mb-2 sm:mb-2"
              >
                LionCity Tutors
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl sm:text-3xl md:text-5xl font-extrabold leading-tight mb-2 sm:mb-6"
              >
                Unlock Your Child's Potential with Singapore's Top Tutors
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-xs sm:text-lg md:text-xl mb-2 sm:mb-8 text-gray-100 max-w-md mx-auto"
              >
                Get matched with a qualified professional for free. We guarantee a perfect 
                fit for your child's learning style.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center"
              >
                {/* --- PRIMARY CTA (High Visibility) --- */}
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg rounded-lg w-full sm:w-auto shadow-lg"
                  onClick={() => router.push("/request-tutor")}>
                  Get Your Free Tutor Match
                </Button>
                {/* --- SECONDARY CTA (Lower Visibility) --- */}
                <Button
                  className="bg-transparent border border-white/80 hover:bg-white hover:text-red-500 text-white px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg rounded-lg w-full sm:w-auto transition-colors duration-200"
                  onClick={() => router.push("/tuition-rates")}>
                  View Tuition Rates
                </Button>
              </motion.div>
              <motion.p 
                className="mt-4 text-sm text-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                Rated <span className="font-bold text-yellow-400">4.8/5 stars</span> by parents across Singapore. 
                <a href="#testimonials" className="underline hover:text-white">Read reviews</a>.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="mt-2 sm:mt-8 flex flex-wrap items-center justify-center gap-1 sm:gap-4"
              >
                <div className="flex items-center bg-black/20 px-1.5 py-0.5 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-sm">
                  <span className="text-yellow-400 mr-1 sm:mr-2">✓</span>
                  <span>100% Free Service</span>
                </div>
                <div className="flex items-center bg-black/20 px-1.5 py-0.5 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-sm">
                  <span className="text-yellow-400 mr-1 sm:mr-2">✓</span>
                  <span>24h Response Time</span>
                </div>
                <div className="flex items-center bg-black/20 px-1.5 py-0.5 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-sm">
                  <span className="text-yellow-400 mr-1 sm:mr-2">✓</span>
                  <span>Qualified Tutors</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      
        {/* Hero Section */}
        <section className="bg-blue-50 py-10 sm:py-10 px-4 sm:px-6 text-center">
          
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-5">
            A Results-Proven Home Tuition Agency
          </motion.h2>
          <p className="text-lg text-black-600 max-w-xl mx-auto mb-3">
            We connect parents/students with qualified and experienced tutors across Singapore. Fast, reliable, and free to request.
          </p>
        </section>

        {/* Quick Links Section */}
        <section className="bg-white py-8 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            
            {/* Request a Tutor */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-red-100 rounded-lg shadow-sm cursor-pointer"
              onClick={() => router.push("/request-tutor")}
            >
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-xl font-bold text-red-800 mb-2">Request a Tutor</h3>
              <p className="text-red-700">Get a free, no-obligation tutor match.</p>
            </motion.div>

            {/* Free Test Papers */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-amber-50 rounded-lg shadow-sm cursor-pointer"
              onClick={() => router.push("/free-test-papers")} 
            >
              <div className="text-4xl mb-3">🧪</div>
              <h3 className="text-xl font-bold text-amber-800 mb-2">Free Test Papers</h3>
              <p className="text-amber-700">Download past year papers for all levels.</p>
            </motion.div>

            {/* Free Notes */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-sky-50 rounded-lg shadow-sm cursor-pointer"
              onClick={() => router.push("/free-notes")} 
            >
              <div className="text-4xl mb-3">📘</div>
              <h3 className="text-xl font-bold text-sky-800 mb-2">Free Notes</h3>
              <p className="text-sky-700">Access concise revision notes from top schools.</p>
            </motion.div>
          </div>
        </section>
  
        {/* Statistics Section */}
        <section className="bg-white py-12 sm:py-16">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto px-4 sm:px-6"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-4 sm:p-6 bg-blue-50 rounded-lg shadow-sm"
              >
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">
                  <Counter end={100} suffix="+" />
                </div>
                <p className="text-sm sm:text-base text-gray-600">Successful Matches</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-4 sm:p-6 bg-blue-50 rounded-lg shadow-sm"
              >
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">
                  <Counter end={100} suffix="+" />
                </div>
                <p className="text-sm sm:text-base text-gray-600">Qualified Tutors</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-4 sm:p-6 bg-blue-50 rounded-lg shadow-sm"
              >
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">
                  <Counter end={24} suffix="h" />
                </div>
                <p className="text-sm sm:text-base text-gray-600">Response Time</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="p-4 sm:p-6 bg-blue-50 rounded-lg shadow-sm"
              >
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">
                  <Counter end={4.8} duration={2} suffix="/5" decimals={1} />
                </div>
                <p className="text-sm sm:text-base text-gray-600">Client Rating</p>
              </motion.div>
            </div>
          </motion.div>
        </section>
  
        {/* How It Works Section */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 bg-white text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12">Getting started with LionCity Tutors is simple and straightforward. Here's how we match you with the perfect tutor:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <Card className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <CardContent className="p-4 sm:p-6 pt-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Submit Request</h3>
                <p className="text-sm sm:text-base text-gray-600">Fill out our simple form with your tuition needs, preferred schedule, and any specific requirements.</p>
              </CardContent>
            </Card>
            <Card className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <CardContent className="p-4 sm:p-6 pt-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Tutor Matching</h3>
                <p className="text-sm sm:text-base text-gray-600">Our team reviews your requirements and matches you with qualified tutors from our database.</p>
              </CardContent>
            </Card>
            <Card className="relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <CardContent className="p-4 sm:p-6 pt-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2">Start Learning</h3>
                <p className="text-sm sm:text-base text-gray-600">Review the tutor profiles, choose your preferred tutor, and begin your learning journey!</p>
              </CardContent>
            </Card>
          </div>
        </section>
        <UniqueFeaturesSection />

        {/* Testimonials Section */}
        <section id="testimonials" className="py-12 sm:py-20 px-4 sm:px-6 bg-white">
          <h2 
            className="text-2xl sm:text-3xl font-semibold mb-8 sm:mb-12 text-center"
          >
            What Our Clients Say
          </h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-blue-50 p-4 sm:p-6 rounded-xl shadow-sm"
            >
              <div className="flex items-center mb-4">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center"
                >
                  <span className="text-blue-600 font-bold">M</span>
                </motion.div>
                <div className="ml-3 sm:ml-4">
                  <h4 className="font-semibold">Molly Tan</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Parent of Primary 5 Student</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-700">"Suggestion of tutor is good. Able to match my requirement and tutor is very responsible in meeting my children’s needs"</p>
              <div className="mt-3 sm:mt-4 flex text-yellow-400">
                {"★".repeat(5)}
              </div>
            </motion.div>
  
            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -5 }}
              className="bg-blue-50 p-4 sm:p-6 rounded-xl shadow-sm"
            >
              <div className="flex items-center mb-4">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center"
                >
                  <span className="text-blue-600 font-bold">M</span>
                </motion.div>
                <div className="ml-3 sm:ml-4">
                  <h4 className="font-semibold">Madushani</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Parent of Secondary 3 Student</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-700">"Fast and fuss-free. Just filled in the form and someone got back within the hour. Helped me find a Sec 3 E Math and Chem tutor for my son. So far the tutor is very patient and reliable. Fee also reasonable. Will recommend to other parents."</p>
              <div className="mt-3 sm:mt-4 flex text-yellow-400">
                {"★".repeat(5)}
              </div>
            </motion.div>
  
            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ y: -5 }}
              className="bg-blue-50 p-4 sm:p-6 rounded-xl shadow-sm"
            >
              <div className="flex items-center mb-4">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center"
                >
                  <span className="text-blue-600 font-bold">J</span>
                </motion.div>
                <div className="ml-3 sm:ml-4">
                  <h4 className="font-semibold">John Goh</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Parent of JC Student</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-700">"Mrs Jenny Lim has helped my daughter's tremendously. Very knowledgeable and experienced when it comes to H2 Math. Highly recommended!!"</p>
              <div className="mt-3 sm:mt-4 flex text-yellow-400">
                {"★".repeat(5)}
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Success Stories Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-white to-blue-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold mb-12 text-center">Student Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Success Story 1 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xl font-bold">J</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-lg">Jonathan Goh</h4>
                      <p className="text-sm text-gray-600">H2 Math, Raffles Institution Student</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Before</span>
                      <span className="text-red-500 font-bold">C</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-gradient-to-r from-red-500 to-green-500 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">After</span>
                      <span className="text-green-500 font-bold">A</span>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-700">"Mrs Lim, the MOE teacher matched for my H2 Math was exceptional. Her teaching methods and practice materials were exactly what I needed to improve my grades."</p>
                </div>
              </div>
  
              {/* Success Story 2 */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-xl font-bold">L</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-lg">Li Jie</h4>
                      <p className="text-sm text-gray-600">PSLE Science, Nan Hua Primary</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Before</span>
                      <span className="text-red-500 font-bold">AL5</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-gradient-to-r from-red-500 to-green-500 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">After</span>
                      <span className="text-green-500 font-bold">AL1</span>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-700">"Tutor James made Science fun and easy to understand. He helped my grades to improve significantly!"</p>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* Request Form Section */}
        <div className="max-w-4xl mx-auto py-16 px-6">
          <h2 className="text-4xl font-bold text-center text-blue-700 mb-10 leading-relaxed">Free Request For Tutor</h2>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Your form and success message here - unchanged */}
            {status.submitted ? (
            <div className="text-center py-10">
              <div className="text-green-500 text-5xl mb-4">✓</div>
              <h2 className="text-2xl font-semibold mb-2">Thank you!</h2>
              <p className="text-gray-600 mb-4">We'll send you tutor profiles shortly.</p>
              <button 
                onClick={() => setStatus({ submitting: false, submitted: false, error: null })}
                className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form id="mainForm" onSubmit={handleSubmit}>
              {/* --- NEW: Progress Bar --- */}
              <div className="mb-8">
                <div className="flex justify-between mb-1">
                  <span className={`text-sm font-medium ${currentStep >= 1 ? 'text-blue-700' : 'text-gray-400'}`}>Core Info</span>
                  <span className={`text-sm font-medium ${currentStep >= 2 ? 'text-blue-700' : 'text-gray-400'}`}>Logistics</span>
                  <span className={`text-sm font-medium ${currentStep >= 3 ? 'text-blue-700' : 'text-gray-400'}`}>Preferences</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-in-out"
                    style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                  ></div>
                </div>
              </div>

              {status.error && (
                <div className="bg-red-100 text-red-800 p-4 rounded-md mb-6">
                  <p className="font-semibold">Submission Error</p>
                  <p className="text-sm">{status.error}</p>
                </div>
              )}
              {/* --- NEW: Conditional Step Rendering --- */}
              {currentStep === 1 && (
                <Step1 
                  nextStep={nextStep} 
                  formData={formData} 
                  handleChange={handleChange} 
                />
              )}
              {currentStep === 2 && (
                <Step2 
                  nextStep={nextStep} 
                  prevStep={prevStep} 
                  formData={formData} 
                  handleChange={handleChange} 
                />
              )}
              {currentStep === 3 && (
                <Step3 
                  prevStep={prevStep} 
                  formData={formData} 
                  handleChange={handleChange}
                  handleCheckboxChange={handleCheckboxChange} // Pass this if needed in the full Step3 code
                  status={status}
                />
              )}
            </form>
            )}
          </div>
        </div>
        {/* FAQ Section */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">How much does it cost to request a tutor?</h3>
                <p className="text-gray-600">Our matching service is completely free! You only pay the tutor's rate directly to them after the lessons begin.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">How quickly will I receive tutor profiles?</h3>
                <p className="text-gray-600">We typically send you tutor profiles within 24 hours of your request. Our team works 7 days a week to ensure fast matching.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">What qualifications do your tutors have?</h3>
                <p className="text-gray-600">Our tutors range from university undergraduates to MOE teachers. All tutors are carefully vetted and have proven academic excellence.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Can I try a lesson before committing?</h3>
                <p className="text-gray-600">Yes! We offer trial lessons so you can ensure the tutor is the right fit for your child before making a long-term commitment.</p>
              </div>
            </div>
          </div>
        </section>
        </div>
      </main>
      </>
    );
  
}