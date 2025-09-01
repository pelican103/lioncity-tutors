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
const SuccessStories = dynamic(() => import('@/components/SuccessStoriesSection'), { ssr: false });
const FAQSection = dynamic(() => import('@/components/FAQSection'), { ssr: false });
const HowitWorksSection = dynamic(() => import('@/components/HowItWorksSection'), { ssr: false });

// Enhanced Trust Strip Component
const TrustStrip = () => {
  const trustFactors = [
    { icon: Shield, text: "MOE-Certified Tutors", color: "text-green-100" },
    { icon: Clock, text: "24-Hour Matching", color: "text-blue-100" },
    { icon: Users, text: "500+ Happy Families", color: "text-purple-100" },
    { icon: Award, text: "4.9/5 Star Rating", color: "text-amber-100" }
  ];

  return (
    <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {trustFactors.map((factor, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <factor.icon className={`w-8 h-8 mb-2 ${factor.color}`} />
              <span className="text-sm font-semibold">{factor.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Consolidated Social Proof Section (replaces both ReviewStrip and Testimonials)
const SocialProofSection = ({ formRef }) => {
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth' });
  
  const quickStats = [
    { number: "500+", label: "Students Matched", sublabel: "This year alone" },
    { number: "4.9/5", label: "Parent Rating", sublabel: "From verified reviews" },
    { number: "6hrs", label: "Avg. Match Time", sublabel: "Most within same day" },
    { number: "100%", label: "Free for Parents", sublabel: "No hidden charges" }
  ];

  const featuredReviews = [
    { 
      name: "Sharon T.", 
      role: "Parent of Sec 4 Student",
      text: "Matched excellent O-Level Math tutor within a day. Professional service with clear updates throughout. My daughter's confidence improved dramatically.",
      rating: 5,
      verified: true,
      subject: "O-Level Mathematics",
      location: "Tampines"
    },
    { 
      name: "Mr David Lim", 
      role: "Parent of Pri 6 Student",
      text: "No fees for parents and incredibly fast response. My son's PSLE Math improved from AL4 to AL1 in just 8 weeks. Highly recommend!", 
      rating: 5,
      verified: true,
      subject: "PSLE Mathematics",
      location: "Jurong West"
    },
    { 
      name: "Mrs Rahman", 
      role: "Parent of JC1 Student",
      text: "Appreciate the MOE-familiar tutors and excellent follow-up after the first lesson. The H2 Chemistry tutor they matched was perfect for my daughter's learning style.", 
      rating: 5,
      verified: true,
      subject: "H2 Chemistry",
      location: "Woodlands"
    }
  ];

  const mediaLogos = [
    { name: "The Straits Times", logo: "📰" },
    { name: "Channel NewsAsia", logo: "📺" },
    { name: "Today Online", logo: "🗞️" },
    { name: "8Days", logo: "📱" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star size={16} className="fill-current" />
            Trusted by Singapore Parents
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            What Parents Say About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              LionCity Tutors
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Real feedback from Singapore families who found their perfect tutors through our platform
          </p>
        </motion.div>

        {/* Quick Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-4xl mx-auto"
        >
          {quickStats.map((stat, i) => (
            <div key={i} className="text-center p-6 bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-slate-800 font-semibold text-sm">{stat.label}</div>
              <div className="text-slate-500 text-xs mt-1">{stat.sublabel}</div>
            </div>
          ))}
        </motion.div>

        {/* Featured Reviews */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {featuredReviews.map((review, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 group"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote size={32} className="text-blue-500" />
              </div>

              {/* Review Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} className="fill-current" />
                  ))}
                </div>
                {review.verified && (
                  <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
                    <CheckCircle size={12} />
                    Verified
                  </span>
                )}
              </div>

              {/* Review Content */}
              <blockquote className="text-slate-700 mb-6 leading-relaxed font-medium">
                "{review.text}"
              </blockquote>

              {/* Reviewer Info */}
              <div className="border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900">{review.name}</h4>
                    <p className="text-sm text-slate-600">{review.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded">
                      {review.subject}
                    </div>
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <MapPin size={10} />
                      {review.location}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 mb-8"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Featured In Singapore Media</h3>
              <div className="grid grid-cols-2 gap-4">
                {mediaLogos.map((media, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <span className="text-2xl">{media.logo}</span>
                    <span className="text-sm font-medium text-slate-700">{media.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="inline-block p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                <div className="text-4xl font-bold text-green-600 mb-2">4.9★</div>
                <div className="text-slate-700 font-semibold">Average Rating</div>
                <div className="text-sm text-slate-600">From 200+ verified reviews</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={scrollToForm}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-12 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg"
            >
              Find My Perfect Tutor Today
            </Button>
          </motion.div>
          <p className="text-sm text-slate-600 mt-3">
            Join 500+ families who found their ideal tutor this year
          </p>
        </div>
      </div>
    </section>
  );
};

// Enhanced Benefits Section for SEO
const BenefitsSection = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Verified MOE-Trained Teachers",
      description: "Access current and former Ministry of Education teachers who understand Singapore's education system. All tutors undergo thorough background checks and qualification verification.",
      color: "blue",
      stats: "200+ MOE Teachers"
    },
    {
      icon: Clock,
      title: "Lightning-Fast Tutor Matching",
      description: "Get matched with 3-5 qualified tutors within 24 hours. Our advanced matching algorithm considers location, budget, learning style, and schedule preferences.",
      color: "green",
      stats: "Avg. 6 hours"
    },
    {
      icon: Users,
      title: "Completely Free for Parents",
      description: "No registration fees, no agency charges, no hidden costs. We only earn when tutors get successfully placed, ensuring we're motivated to find the best matches.",
      color: "orange",
      stats: "$0 Parent Fees"
    },
    {
      icon: Award,
      title: "Proven Academic Results",
      description: "98% of our students show grade improvements within 3 months. Track record includes PSLE AL1 achievers, O-Level distinctions, and A-Level university placements.",
      color: "purple",
      stats: "98% Success Rate"
    }
  ];

  const colorClasses = {
    blue: { bg: "bg-blue-50", icon: "text-blue-600", title: "text-blue-800", desc: "text-blue-700", badge: "bg-blue-100 text-blue-700" },
    green: { bg: "bg-emerald-50", icon: "text-emerald-600", title: "text-emerald-800", desc: "text-emerald-700", badge: "bg-emerald-100 text-emerald-700" },
    orange: { bg: "bg-orange-50", icon: "text-orange-600", title: "text-orange-800", desc: "text-orange-700", badge: "bg-orange-100 text-orange-700" },
    purple: { bg: "bg-purple-50", icon: "text-purple-600", title: "text-purple-800", desc: "text-purple-700", badge: "bg-purple-100 text-purple-700" }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Why Singapore Parents Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              LionCity Tutors
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            We've revolutionized home tuition in Singapore by putting families first, removing unnecessary barriers, and focusing on academic excellence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, i) => {
            const colors = colorClasses[benefit.color];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`${colors.bg} p-8 rounded-2xl border border-slate-200 hover:shadow-xl transition-all duration-300 group`}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className={`w-8 h-8 ${colors.icon}`} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className={`text-xl md:text-2xl font-bold ${colors.title}`}>{benefit.title}</h3>
                      <span className={`${colors.badge} text-xs px-3 py-1 rounded-full font-bold`}>
                        {benefit.stats}
                      </span>
                    </div>
                    <p className={`${colors.desc} leading-relaxed text-base`}>{benefit.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Enhanced Credentials Section
const CredentialsSection = () => {
  const credentials = [
    { title: "Ministry of Education Approved", desc: "Registered tuition agency", icon: "🏛️" },
    { title: "Background Checked Tutors", desc: "Police clearance verified", icon: "🛡️" },
    { title: "Insurance Coverage", desc: "Full liability protection", icon: "📋" },
    { title: "Singapore Business License", desc: "ACRA registered entity", icon: "🏢" }
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-green-50 to-emerald-50 border-y border-green-100">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-green-800 mb-3">
            Fully Licensed & Regulated Singapore Tuition Agency
          </h3>
          <p className="text-green-700 max-w-2xl mx-auto">
            Your child's safety and academic success are our top priorities
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {credentials.map((cred, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-green-200 hover:shadow-lg transition-all"
            >
              <div className="text-3xl mb-3">{cred.icon}</div>
              <h4 className="font-bold text-green-800 mb-2 text-sm">{cred.title}</h4>
              <p className="text-green-600 text-xs">{cred.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

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
        <title>Singapore Home Tuition Agency | MOE-Certified PSLE, O-Level & A-Level Tutors | LionCity Tutors</title>
        <meta name="description" content="Find qualified home tutors in Singapore for PSLE, O-Level, A-Level & IB. MOE-certified teachers available. Free matching service for parents. Get matched in 24 hours." />
        <meta name="keywords" content="home tuition singapore, private tutor singapore, PSLE tutor, O level tutor, A level tutor, MOE teacher tutor, singapore tuition agency, home tutoring service singapore" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.lioncitytutors.com/" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Singapore's #1 Home Tuition Agency | LionCity Tutors" />
        <meta property="og:description" content="Connect with MOE-certified tutors for PSLE, O-Level & A-Level. Free for parents, matched in 24 hours." />
        <meta property="og:image" content="https://www.lioncitytutors.com/og-image.jpg" />
        <meta property="og:url" content="https://www.lioncitytutors.com/" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Singapore Home Tuition Agency | LionCity Tutors" />
        <meta name="twitter:description" content="Find MOE-certified tutors for PSLE, O-Level & A-Level. Free for parents." />
        
        {/* Enhanced Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "EducationalOrganization"],
            "name": "LionCity Tutors",
            "description": "Singapore's premier home tuition agency connecting parents with MOE-certified tutors for PSLE, O-Level, A-Level and IB subjects",
            "url": "https://www.lioncitytutors.com/",
            "telephone": "+6588701152",
            "email": "admin@lioncitytutors.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Singapore",
              "addressCountry": "SG"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 1.3521,
              "longitude": 103.8198
            },
            "areaServed": {
              "@type": "Country",
              "name": "Singapore"
            },
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 1.3521,
                "longitude": 103.8198
              },
              "geoRadius": 50000
            },
            "priceRange": "Free for parents",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "200",
              "bestRating": "5"
            },
            "hasOfferingCatalog": {
              "@type": "OfferingCatalog",
              "name": "Home Tuition Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "PSLE Tuition Singapore",
                    "description": "Primary School Leaving Examination tutoring by qualified teachers"
                  }
                },
                {
                  "@type": "Offer", 
                  "itemOffered": {
                    "@type": "Service",
                    "name": "O-Level Tuition Singapore",
                    "description": "GCE Ordinary Level examination tutoring by experienced educators"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service", 
                    "name": "A-Level Tuition Singapore",
                    "description": "GCE Advanced Level examination tutoring by subject specialists"
                  }
                }
              ]
            },
            "review": [
              {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Sharon T." },
                "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                "reviewBody": "Matched excellent O-Level Math tutor within a day. Professional service with clear updates throughout."
              },
              {
                "@type": "Review", 
                "author": { "@type": "Person", "name": "Mr David Lim" },
                "reviewRating": { "@type": "Rating", "ratingValue": "5" },
                "reviewBody": "No fees for parents and incredibly fast response. My son's PSLE Math improved significantly."
              }
            ]
          })}
        </script>

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How much does it cost to request a tutor in Singapore?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our tutor matching service is completely free for parents. You only pay the tutor's hourly rate directly to them after lessons begin. No agency fees or hidden charges."
                }
              },
              {
                "@type": "Question",
                "name": "How quickly can I get a tutor in Singapore?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We typically send you 3-5 qualified tutor profiles within 24 hours. Our average matching time is 6 hours, and we work 7 days a week."
                }
              },
              {
                "@type": "Question",
                "name": "Are your tutors MOE-certified?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Many of our tutors are current or former MOE teachers. All tutors are thoroughly vetted with background checks and proven academic qualifications."
                }
              },
              {
                "@type": "Question",
                "name": "What subjects do you provide tutors for?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We provide tutors for all PSLE, O-Level, A-Level and IB subjects including Math, Science, English, Chinese, and specialized subjects like Further Mathematics and Economics."
                }
              }
            ]
          })}
        </script>
      </Head>

      <main className="bg-white text-gray-800">
        <TutorPopup />
        
        {/* Enhanced Hero Section */}
        <section className="bg-gradient-to-br from-white via-blue-50/30 to-slate-50 px-4 py-12 md:py-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <CheckCircle size={16} />
                  Singapore's Most Trusted Tuition Agency
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Find Singapore's Best{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                    Home Tutors
                  </span>{" "}
                  <span className="text-emerald-600">100% Free</span>
                </h1>
                
                <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                  MOE-certified teachers and top university graduates specialized in PSLE, O-Level, A-Level & IB. 
                  Get matched in under 24 hours with zero parent fees.
                </p>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                  <Button
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg"
                    onClick={() => {
                      formRef.current?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Find My Perfect Tutor
                  </Button>
                  <a
                    href="https://wa.me/6588701152?text=Hi%20LionCity%20Tutors%2C%20I%27m%20looking%20for%20a%20tutor."
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    <Phone size={16} />
                    <span>WhatsApp Us Directly</span>
                  </a>
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Star className="w-4 h-4 text-amber-500 fill-current" />
                    <span>4.9/5 from Singapore parents</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>MOE-familiar curriculum</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>Match within 24 hours</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Shield className="w-4 h-4 text-purple-500" />
                    <span>No parent fees, ever</span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl h-64 md:h-80 relative bg-gradient-to-br from-blue-100 to-indigo-100">
                <Image
                  src="/final.webp"
                  alt="Professional home tuition in Singapore - LionCity Tutors connecting students with qualified MOE teachers"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay badges */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
                  <span className="text-sm font-bold text-blue-600">500+ Families Served</span>
                </div>
                <div className="absolute bottom-4 right-4 bg-emerald-500/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
                  <span className="text-sm font-bold text-white">MOE Approved</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Enhanced Trust Strip */}
        <TrustStrip />

        {/* Credentials Section */}
        <CredentialsSection />
        
        {/* Benefits Section (SEO-rich content) */}
        <BenefitsSection />

        {/* How It Works Section */}
        <HowitWorksSection formRef={formRef} />
        
        {/* Social Proof (replaces both ReviewStrip and Testimonials) */}
        <SocialProofSection formRef={formRef} />

        {/* Success Stories */}
        <SuccessStories />

        {/* Unique Features */}
        <UniqueFeaturesSection />

        {/* Enhanced Academic Resources Banner */}
        <section className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white py-8">
          <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
                <span className="text-3xl">📚</span>
              </div>
              <div>
                <h3 className="font-bold text-xl">Free PSLE & O-Level Resources</h3>
                <p className="text-orange-100">Access our collection of exam papers and revision notes from top Singapore schools</p>
              </div>
            </div>
            <Button 
              className="bg-white text-orange-600 font-bold hover:bg-orange-50 shadow-lg px-6 py-3"
              onClick={scrollToResources}
            >
              Access Free Resources
            </Button>
          </div>
        </section>

        {/* Enhanced Form Section */}
        <section ref={formRef} className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-6">
                Request Your Perfect Tutor Today
              </h2>
              <p className="text-xl text-slate-700 mb-4">
                Get matched with 3-5 qualified Singapore tutors in 24 hours
              </p>
              <div className="flex items-center justify-center gap-6 text-sm font-semibold">
                <span className="flex items-center gap-2 text-green-600">
                  <CheckCircle size={16} />
                  Completely Free
                </span>
                <span className="flex items-center gap-2 text-blue-600">
                  <Shield size={16} />
                  No Commitments
                </span>
                <span className="flex items-center gap-2 text-purple-600">
                  <Clock size={16} />
                  24-Hour Matching
                </span>
              </div>
            </motion.div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
              {status.submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Request Submitted Successfully!</h3>
                  <p className="text-slate-600 mb-6 text-lg">
                    We'll send you 3-5 tutor profiles within 24 hours via WhatsApp and email.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-xl mb-6">
                    <p className="text-blue-800 text-sm">
                      <strong>Next Steps:</strong> Our team will review your requirements and send you carefully selected tutor profiles. You can interview them and choose the best fit for your child.
                    </p>
                  </div>
                  <Button 
                    onClick={() => setStatus({ submitting: false, submitted: false, error: null })}
                    variant="outline"
                    className="border-blue-300 text-blue-600 hover:bg-blue-50"
                  >
                    Submit Another Request
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-8">
                    <div className="flex justify-between mb-2">
                      {["Your Details", "Lesson Requirements", "Tutor Preferences"].map((step, i) => (
                        <span key={i} className={`text-sm font-semibold ${currentStep >= i + 1 ? 'text-blue-700' : 'text-gray-400'}`}>
                          Step {i + 1}: {step}
                        </span>
                      ))}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500" 
                        style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                      />
                    </div>
                  </div>
                  {status.error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl mb-6 flex items-center gap-2">
                      <span className="text-red-500">⚠️</span>
                      {status.error}
                    </div>
                  )}
                  {currentStep === 1 && <Step1 nextStep={nextStep} formData={formData} handleChange={handleChange} />}
                  {currentStep === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} formData={formData} handleChange={handleChange} />}
                  {currentStep === 3 && <Step3 prevStep={prevStep} formData={formData} handleChange={handleChange} handleCheckboxChange={handleCheckboxChange} status={status} />}
                </form>
              )}
            </div>
          </div>
        </section>
        
        {/* Enhanced Resources Section */}
        <section ref={resourcesRef} className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-20 px-4 sm:px-6">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-20 h-20 bg-orange-500 rounded-full blur-xl"></div>
            <div className="absolute top-32 right-20 w-16 h-16 bg-red-500 rounded-full blur-lg"></div>
            <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-amber-500 rounded-full blur-xl"></div>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Free Educational Resources for Singapore Students
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
              <p className="text-slate-600 mt-4 text-lg max-w-2xl mx-auto">
                Access our comprehensive collection of past year papers and revision materials from top Singapore schools
              </p>
            </motion.div>

            {/* Resource Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

              {/* Free Test Papers */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-amber-200 overflow-hidden"
                onClick={() => router.push("/free-test-papers")}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">📊</span>
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-amber-800 mb-3 group-hover:text-orange-900 transition-colors">
                    Free PSLE & O-Level Test Papers
                  </h3>
                  <p className="text-amber-700/90 leading-relaxed mb-4">
                    Download comprehensive past year papers for all academic levels and subjects from top Singapore schools.
                  </p>
                  <div className="flex items-center text-amber-600 font-medium group-hover:text-amber-700 transition-colors">
                    <span>Browse Papers</span>
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-2xl border-2 border-amber-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>

              {/* Free Notes */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-blue-200 overflow-hidden"
                onClick={() => router.push("/free-notes")}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">📚</span>
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-blue-800 mb-3 group-hover:text-indigo-900 transition-colors">
                    Free Revision Notes
                  </h3>
                  <p className="text-blue-700/90 leading-relaxed mb-4">
                    Access concise, high-quality revision notes curated from top Singapore schools and experienced tutors.
                  </p>
                  <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                    <span>View Notes</span>
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-2xl border-2 border-blue-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            </div>

            {/* Resource Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-orange-200"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-orange-600 mb-1">500+</div>
                  <div className="text-sm text-slate-700 font-medium">Test Papers</div>
                  <div className="text-xs text-slate-500">All subjects covered</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600 mb-1">50+</div>
                  <div className="text-sm text-slate-700 font-medium">Top Schools</div>
                  <div className="text-xs text-slate-500">Including SAP schools</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-600 mb-1">10K+</div>
                  <div className="text-sm text-slate-700 font-medium">Downloads</div>
                  <div className="text-xs text-slate-500">This month alone</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600 mb-1">100%</div>
                  <div className="text-sm text-slate-700 font-medium">Free Access</div>
                  <div className="text-xs text-slate-500">Always and forever</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <div ref={faqRef}>
          <FAQSection />
        </div>

        {/* Contact Information Section for Local SEO */}
        <section className="bg-slate-900 text-white py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold mb-4">Get In Touch With Singapore's Top Tuition Agency</h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Ready to transform your child's academic journey? Our experienced team is here to help you find the perfect tutor for PSLE, O-Level, A-Level, or IB subjects.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-300">
                    <Phone className="w-5 h-5 text-blue-400" />
                    <span>+65 8870 1152</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Mail className="w-5 h-5 text-green-400" />
                    <span>admin@lioncitytutors.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <MapPin className="w-5 h-5 text-orange-400" />
                    <span>Serving all areas across Singapore</span>
                  </div>
                </div>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-2xl">
                <h4 className="font-bold mb-4">Operating Hours</h4>
                <div className="space-y-2 text-sm text-slate-300">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>10:00 AM - 5:00 PM</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-900/30 rounded-lg">
                  <p className="text-green-300 text-xs">
                    WhatsApp us anytime for immediate response!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="bg-gradient-to-r from-red-500 via-orange-500 to-red-600 text-white py-12 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Boost Your Child's Grades?
            </h2>
            <p className="text-xl mb-8 text-red-100">
              Join 500+ Singapore families who found their perfect tutor this year. Get 3 qualified profiles in 24 hours – absolutely free.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                className="bg-white text-red-500 font-bold px-8 py-4 hover:bg-red-50 shadow-lg text-lg rounded-xl"
                onClick={scrollToForm}
              >
                Request My Tutor Now
              </Button>
              <a
                href="https://wa.me/6588701152?text=Hi%20LionCity%20Tutors%2C%20I%27m%20looking%20for%20a%20tutor."
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-white hover:text-red-100 font-semibold transition-colors border border-white/30 px-6 py-3 rounded-xl hover:bg-white/10"
              >
                <Phone size={16} />
                <span>WhatsApp Direct</span>
              </a>
            </div>
            <p className="text-sm text-red-200 mt-4">
              No signup required • No credit card needed • Instant matching
            </p>
          </motion.div>
        </section>
      </main>
    </>
  );
}