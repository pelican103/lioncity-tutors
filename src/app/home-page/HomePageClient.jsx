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
  const initialFormData = {
    name: '',
    mobile: '',
    level: '',
    school: '',
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
      marketRate: true,
      custom: false,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
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
      </Head>
      <main>
      <div className="min-h-screen bg-white text-gray-800">
        {/* Hero Banner Section - Fixed mobile formatting issues */}
        <section className="relative w-full h-[280px] sm:h-[300px] md:h-[550px] overflow-hidden">
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
              className="text-center text-white px-3 sm:px-4 max-w-4xl w-full pt-8 pb-6 sm:py-0"
            >
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg sm:text-xl uppercase font-extrabold text-red-500 mb-1 sm:mb-2"
              >
                LionCity Tutors
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl sm:text-3xl md:text-5xl font-extrabold leading-tight mb-1 sm:mb-4"
              >
                Find the Perfect Home Tutor in Singapore
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-xs sm:text-lg md:text-xl mb-2 sm:mb-8 text-gray-100 max-w-md mx-auto"
              >
                Connect with qualified tutors who can help your child excel academically. 
                Fast matching, free service, and guaranteed satisfaction.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-col sm:flex-row gap-1 sm:gap-4 justify-center"
              >
                <Button
                  className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-8 py-1 sm:py-3 text-xs sm:text-lg rounded-lg w-full sm:w-auto"
                  onClick={() => router.push("/request-tutor")}>
                  Request a Tutor Now
                </Button>
                <Button
                  className="bg-white hover:bg-gray-100 text-blue-600 px-3 sm:px-8 py-1 sm:py-3 text-xs sm:text-lg rounded-lg w-full sm:w-auto"
                  onClick={() => router.push("/tuition-rates")}>
                  View Tuition Rates
                </Button>
              </motion.div>
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
        <section className="bg-blue-50 py-12 sm:py-16 px-4 sm:px-6 text-center">
          
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-4">
            A Results-Proven Home Tuition Agency
          </motion.h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto mb-6">
            We connect parents/students with qualified and experienced tutors across Singapore. Fast, reliable, and free to request.
          </p>
  
          <Button
              className="bg-black text-white font text-xl px-6 py-3 rounded-xl"
              onClick={() => router.push("/request-tutor")}>
            Request a Tutor
          </Button>
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
                  <Counter end={4.9} duration={2} suffix="/5" decimals={1} />
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
        <section className="py-12 sm:py-20 px-4 sm:px-6 bg-blue-50">
          <div>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8 sm:mb-12 text-center">What's Unique About LionCity Tutors?</h2>
          </div>
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 text-center">
            {/* Feature 1 */}
            <div>
              <img src="https://singaporetuitionteachers.com/wp-content/uploads/2020/07/icon-1.png" alt="Tutors" className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-yellow-500">100+ Tutors</h3>
              <p className="text-xs sm:text-sm text-gray-700 mt-2">The most comprehensive tutor database in Singapore to suit your every need.</p>
            </div>
  
            {/* Feature 2 */}
            <div>
              <img src="https://singaporetuitionteachers.com/wp-content/uploads/2020/07/icon-2.png" alt="Affordable" className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-yellow-500">100% Free Service</h3>
              <p className="text-xs sm:text-sm text-gray-700 mt-2">No agency fees. Most affordable rates guaranteed.</p>
            </div>
  
            {/* Feature 3 */}
            <div>
              <img src="https://singaporetuitionteachers.com/wp-content/uploads/2020/07/icon-3.png" alt="Experienced" className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-yellow-500">Experienced Tutors</h3>
              <p className="text-xs sm:text-sm text-gray-700 mt-2">Only top-rated, highly qualified tutors are shortlisted. Think: MOE Teachers, 90RP Graduates, RI/HCI Graduates etc.</p>
            </div>
  
            {/* Feature 4 */}
            <div>
              <img src="https://singaporetuitionteachers.com/wp-content/uploads/2020/07/icon-4-1.png" alt="Fast" className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-yellow-500">24-Hour Turnaround</h3>
              <p className="text-xs sm:text-sm text-gray-700 mt-2">Receive tutor matches within a day via our express matching system.</p>
            </div>
  
            {/* Feature 5 */}
            <div>
              <img src="https://singaporetuitionteachers.com/wp-content/uploads/2020/07/icon-5-1.png" alt="Support" className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-yellow-500">7-Day Support</h3>
              <p className="text-xs sm:text-sm text-gray-700 mt-2">Friendly tuition coordinators available every day of the week.</p>
            </div>
  
            {/* Feature 6 */}
            <div>
              <img src="https://singaporetuitionteachers.com/wp-content/uploads/2020/07/icon-6-1.png" alt="Trial Lessons" className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-yellow-500">Trial Lessons</h3>
              <p className="text-xs sm:text-sm text-gray-700 mt-2">Try before you commit. Find your perfect tutor fit first.</p>
            </div>
  
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-12 sm:py-20 px-4 sm:px-6 bg-white">
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
                  <span className="text-blue-600 font-bold">S</span>
                </motion.div>
                <div className="ml-3 sm:ml-4">
                  <h4 className="font-semibold">Sarah Lim</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Parent of Sec 3 Student</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-700">"The tutor matched for my daughter is excellent! Her grades improved from C5 to A2 in just 3 months. Very professional service!"</p>
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
                  <span className="text-blue-600 font-bold">J</span>
                </motion.div>
                <div className="ml-3 sm:ml-4">
                  <h4 className="font-semibold">James Wong</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Parent of P5 Student</p>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-700">"Fast response and great matching service. The tutor is patient and my son enjoys his lessons. Highly recommended!"</p>
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
                  <span className="text-blue-600 font-bold">M</span>
                </motion.div>
                <div className="ml-3 sm:ml-4">
                  <h4 className="font-semibold">Mary Tan</h4>
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
            <>
              {status.error && (
                <div className="bg-red-100 text-red-800 p-4 rounded-md mb-6">
                  <p className="font-semibold">Submission Error</p>
                  <p className="text-sm">{status.error}</p>
                </div>
              )}
  
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name<span className="text-red-500">*</span></label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your name"
                  />
                </div>
  
                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number<span className="text-red-500">*</span></label>
                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. 91234567"
                  />
                </div>
  
                <div>
                  <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">Student's Level & Subject<span className="text-red-500">*</span></label>
                  <input
                    id="level"
                    name="level"
                    type="text"
                    value={formData.level}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Sec 3 A-Math"
                  />
                </div>
                <div>
                  <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">
                    Student's School
                  </label>
                  <input
                    id="school"
                    name="school"
                    type="text"
                    value={formData.school}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. NJC"
                  />
                </div>
  
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="lessonDuration" className="block text-sm font-medium text-gray-700 mb-1">
                      Lesson Duration<span className="text-red-500">*</span>
                    </label>
                    <select
                      id="lessonDuration"
                      name="lessonDuration"
                      value={formData.lessonDuration}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="1.5 Hours">1.5 Hours</option>
                      <option value="2 Hours">2 Hours</option>
                      <option value="Others">Others</option>
                    </select>
                    
                    {formData.lessonDuration === "Others" && (
                      <div className="mt-2">
                        <input
                          type="text"
                          name="customDuration"
                          value={formData.customDuration}
                          onChange={handleChange}
                          placeholder="Please specify"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="lessonFrequency" className="block text-sm font-medium text-gray-700 mb-1">
                      Lesson Frequency<span className="text-red-500">*</span>
                    </label>
                    <select
                      id="lessonFrequency"
                      name="lessonFrequency"
                      value={formData.lessonFrequency}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="1 Lesson/Week">1 Lesson/Week</option>
                      <option value="2 Lessons/Week">2 Lessons/Week</option>
                      <option value="Others">Others</option>
                    </select>
                    
                    {formData.lessonFrequency === "Others" && (
                      <div className="mt-2">
                        <input
                          type="text"
                          name="customFrequency"
                          value={formData.customFrequency}
                          onChange={handleChange}
                          placeholder="Please specify"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}
                  </div>
                </div>
  
                <div>
                  <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1">Preferred Days/Time<span className="text-red-500">*</span></label>
                  <input
                    id="preferredTime"
                    name="preferredTime"
                    type="text"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Weekday evenings"
                  />
                </div>
                <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                  <h3 className="font-semibold text-lg mb-3">Tutor Rates</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="tutorType.partTime"
                        name="tutorType.partTime"
                        checked={formData.tutorType.partTime}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="tutorType.partTime" className="ml-2 block text-gray-700">
                        <span className="font-bold">Part-Time Tutors</span>{" "}
                        <span className="font-bold">$25-$35/Hour</span>
                      </label>
                      <div className="relative group ml-2">
                        <Info size={16} className="text-blue-600 cursor-pointer" />
                        <div className="absolute hidden group-hover:block bg-white border border-gray-200 p-3 rounded shadow-lg z-10 w-72 -translate-x-1/2 left-1/2 mt-1">
                          <p className="font-medium text-gray-800 mb-2">Part-Time Tutors:</p>
                          <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                            <li>Mostly University Undergraduates</li>
                            <li>Pursuing Tutoring As A Part-Time Career</li>
                            <li>1-3 Years of Tutoring Experience</li>
                            <li>Young & Vibrant (Average Age of 20+)</li>
                            <li>Small Age Gap With Students, Able To Relate Well</li>
                            <li>Scored Good Grades During Schooling Days (A*, A1)</li>
                            <li>Most Budget Friendly Option</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="tutorType.fullTime"
                        name="tutorType.fullTime"
                        checked={formData.tutorType.fullTime}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="tutorType.fullTime" className="ml-2 block text-gray-700">
                        <span className="font-bold">Full-Time Tutors</span>{" "}
                        <span className="font-bold">$35-$45/Hour</span>
                      </label>
                      <div className="relative group ml-2">
                        <Info size={16} className="text-blue-600 cursor-pointer" />
                        <div className="absolute hidden group-hover:block bg-white border border-gray-200 p-3 rounded shadow-lg z-10 w-72 -translate-x-1/2 left-1/2 mt-1">
                          <p className="font-medium text-gray-800 mb-2">Full-Time Tutors:</p>
                          <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                            <li>Mostly University Graduates</li>
                            <li>Pursuing Tutoring As A Full-Time Career</li>
                            <li>At Least 5 Years of Tutoring Experience</li>
                            <li>Professional & Responsible</li>
                            <li>Able To Recommend/Provide Learning Materials</li>
                            <li>Large Pool of Students, Often Teaching Students of Same Level</li>
                            <li>Able To Cope With Students of All Ages & Abilities</li>
                            <li>Highest Level of Commitment</li>
                            <li>Reasonable Tuition Rates</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="tutorType.moeTeacher"
                        name="tutorType.moeTeacher"
                        checked={formData.tutorType.moeTeacher}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="tutorType.moeTeacher" className="ml-2 block text-gray-700">
                        <span className="font-bold">Ex/Current MOE Teachers</span>{" "}
                        <span className="font-bold">$50-$70/Hour</span>
                      </label>
                      <div className="relative group ml-2">
                        <Info size={16} className="text-blue-600" />
                        <div className="absolute hidden group-hover:block bg-white border border-gray-200 p-3 rounded shadow-lg z-10 w-72 -translate-x-1/2 left-1/2 mt-1">
                          <p className="font-medium text-gray-800 mb-2">Ex/Current MOE Teachers:</p>
                          <ul className="text-sm text-gray-600 space-y-1 list-disc pl-4">
                            <li>MOE & NIE Trained School Teachers</li>
                            <li>Highly Familiar with MOE Syllabus</li>
                            <li>National Exam Markers (PSLE, O/N/A Levels, IBDP)</li>
                            <li>In-Depth & Well-Versed Teaching Pedagogy</li>
                            <li>Able To Access/Provide Special Learning Materials</li>
                            <li>Highly Experienced with All Types of Students</li>
                            <li>Most Qualified Tutor Option</li>
                          </ul>
                        </div>
                      </div>
                    </div>
  
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="budget.marketRate"
                          name="budget.marketRate"
                          checked={formData.budget.marketRate}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            setFormData({
                              ...formData,
                              budget: {
                                ...formData.budget,
                                marketRate: isChecked,
                                custom: isChecked ? false : formData.budget.custom
                              }
                            });
                          }}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="budget.marketRate" className="ml-2 block text-gray-700">
                          I am comfortable with the market rates above
                        </label>
                      </div>
                      
                      <div className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          id="budget.custom"
                          name="budget.custom"
                          checked={formData.budget.custom}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            setFormData({
                              ...formData,
                              budget: {
                                ...formData.budget,
                                custom: isChecked,
                                marketRate: isChecked ? false : formData.budget.marketRate
                              }
                            });
                          }}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="budget.custom" className="ml-2 block text-gray-700">
                          I Have A Preferred Budget
                        </label>
                      </div>
                      
                      {formData.budget.custom && (
                        <div className="mt-2 ml-6">
                          <input
                            type="text"
                            name="budget.customAmount"
                            value={formData.budget.customAmount}
                            onChange={handleChange}
                            placeholder="Your budget per hour (SGD)"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
  
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="genderPreference" className="block text-sm font-medium text-gray-700 mb-1">
                      Gender Preference<span className="text-red-500">*</span>
                    </label>
                    <select
                      id="genderPreference"
                      name="genderPreference"
                      value={formData.genderPreference}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="No preference">No preference</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="bilingualRequired" className="block text-sm font-medium text-gray-700 mb-1">
                      Is a Bilingual Tutor Required?<span className="text-red-500">*</span>
                    </label>
                    <select
                      id="bilingualRequired"
                      name="bilingualRequired"
                      value={formData.bilingualRequired}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                </div>
  
                <div>
                  <label htmlFor="preferences" className="block text-sm font-medium text-gray-700 mb-1">Other Preferences or Questions</label>
                  <textarea
                    id="preferences"
                    name="preferences"
                    value={formData.preferences}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Any specific tutor requirements or questions?"
                  />
                </div>
  
                <button
                  type="submit"
                  disabled={status.submitting}
                  className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-colors ${
                    status.submitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {status.submitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            </>
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