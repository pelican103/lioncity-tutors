"use client";

import React, { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Step1, Step2, Step3 } from "@/components/FormSteps";

export default function PrimarySchoolTuition() {
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

  // Handle checkbox changes
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
        setFormData(initialFormData);
        setCurrentStep(1);
        setStatus({ submitting: false, submitted: true, error: null });
      } else {
        const errorText = await response.text();
        throw new Error(errorText || 'Form submission failed');
      }
    } catch (error) {
      setStatus({ submitting: false, submitted: false, error: error.message || 'Failed to submit the form. Please try again.' });
    }
  };
  return (
    <>
      <div className="p-6 max-w-5xl mx-auto space-y-12">
        {/* Section 1: Headline */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-blue-800">PSLE Success Starts Here: Personalised Primary School Tuition by Top Tutors in Singapore</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Trusted by over 100 families. We help your child grow in confidence and achieve real results.
          </p>
          <div className="my-8 relative w-full max-w-3xl mx-auto aspect-video overflow-hidden rounded-xl shadow-lg"> 
            <Image 
              src="/primary-tuition_optimized.webp" 
              alt="Primary school tuition in Singapore - Students learning with experienced tutors"
              className="object-cover"
              sizes="100vw"
              placeholder="blur"
              blurDataURL="/primary-tuition_optimized.webp"
              priority 
              fill 
            />
          </div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Whether your child is just starting P1 or preparing for PSLE, our experienced tutors deliver structured, engaging lessons that build confidence and boost grades — at every level. Because strong foundations make all the difference.
          </p>
        </section>
        {/* Tutor Request Form Section */}
        <section className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-indigo-700 mb-4">Request a Primary School Tutor</h2>
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
            <div className="bg-white rounded-xl shadow-lg p-8">
              {status.submitted ? (
                <div className="text-center py-10">
                  <div className="text-green-500 text-5xl mb-4">✓</div>
                  <h2 className="text-2xl font-semibold mb-2">Thank you!</h2>
                  <p className="text-gray-600 mb-4">We'll send you tutor profiles shortly.</p>
                  <button 
                    onClick={() => setStatus({ submitting: false, submitted: false, error: null })}
                    className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form id="mainForm" onSubmit={handleSubmit}>
                  {/* --- NEW: Progress Bar --- */}
                  <div className="mb-8">
                    <div className="flex justify-between mb-1">
                      <span className={`text-sm font-medium ${currentStep >= 1 ? 'text-indigo-700' : 'text-gray-400'}`}>About You</span>
                      <span className={`text-sm font-medium ${currentStep >= 2 ? 'text-indigo-700' : 'text-gray-400'}`}>Lesson Details</span>
                      <span className={`text-sm font-medium ${currentStep >= 3 ? 'text-indigo-700' : 'text-gray-400'}`}>Tutor Preferences</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-in-out"
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
                      handleCheckboxChange={handleCheckboxChange}
                      status={status}
                    />
                  )}
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Section 2: Why Primary Education Matters */}
        <section className="bg-gradient-to-br from-indigo-50 to-purple-50 p-12 rounded-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-indigo-700 text-center">Why Primary Education Matters</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
            Primary school years are where habits, confidence, and academic discipline take root. We help your child thrive in this crucial stage — academically and emotionally.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎓</span>
              </div>
              <h3 className="font-bold text-xl text-indigo-700 text-center mb-4">Academic Foundation</h3>
              <p className="text-gray-600 text-center">Builds strong fundamentals for future academic success</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💼</span>
              </div>
              <h3 className="font-bold text-xl text-indigo-700 text-center mb-4">Future Opportunities</h3>
              <p className="text-gray-600 text-center">Opens doors to top secondary schools and programs</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="font-bold text-xl text-indigo-700 text-center mb-4">Critical Thinking</h3>
              <p className="text-gray-600 text-center">Develops essential problem-solving and analytical skills</p>
            </div>
          </div>
        </section>

        {/* Section 3: Subjects We Cover */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-indigo-700 text-center">Comprehensive Primary School Subjects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-t-emerald-500 shadow-lg">
              <CardContent className="p-8">
                <h3 className="font-bold text-xl text-emerald-700 mb-6">Mathematics</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-emerald-600 mb-3">Core Topics</h4>
                    <ul className="text-gray-600 space-y-3">
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        <span>Numbers & Operations</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        <span>Fractions & Decimals</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        <span>Geometry & Measurement</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        <span>Problem-solving heuristics and exam-format questions for Paper 1 & 2</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-blue-500 shadow-lg">
              <CardContent className="p-8">
                <h3 className="font-bold text-xl text-blue-700 mb-6">English</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-blue-600 mb-3">Key Areas</h4>
                    <ul className="text-gray-600 space-y-3">
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>Grammar & Vocabulary</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>Comprehension Skills</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>Composition Writing</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>Model essays, guided writing, and feedback tailored to each child's writing level</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-purple-500 shadow-lg">
              <CardContent className="p-8">
                <h3 className="font-bold text-xl text-purple-700 mb-6">Science</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-purple-600 mb-3">Core Concepts</h4>
                    <ul className="text-gray-600 space-y-3">
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span>Life Cycles & Systems</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span>Materials & Properties</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span>Environmental Studies</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span>Experiment-based learning, concept mapping, and PSLE practice questions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-emerald-500 shadow-lg">
              <CardContent className="p-8">
                <h3 className="font-bold text-xl text-emerald-700 mb-6">Chinese / Mother Tongue</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-emerald-600 mb-3">Key Focus Areas</h4>
                    <ul className="text-gray-600 space-y-3">
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        <span>Oral Communication</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        <span>Composition Writing</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        <span>Comprehension Skills</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        <span>Vocabulary Building</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 4: PSLE Guides */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 p-12 rounded-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-indigo-700 text-center">Comprehensive PSLE Preparation Guides</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
            Access our detailed subject-specific PSLE guides, designed to help your child excel in every component of the examination.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/blog/psle-preparation-guide" className="block">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 h-full">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-bold text-lg text-indigo-700 text-center mb-2">PSLE Preparation Guide</h3>
                <p className="text-gray-600 text-sm text-center">Complete roadmap to PSLE success with proven strategies and study schedules</p>
              </div>
            </Link>

            <Link href="/psle-english" className="block">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 h-full">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="font-bold text-lg text-blue-700 text-center mb-2">PSLE English Guide</h3>
                <p className="text-gray-600 text-sm text-center">Master composition writing, comprehension, and oral communication skills</p>
              </div>
            </Link>

            <Link href="/psle-math" className="block">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 h-full">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔢</span>
                </div>
                <h3 className="font-bold text-lg text-emerald-700 text-center mb-2">PSLE Math Guide</h3>
                <p className="text-gray-600 text-sm text-center">Excel in problem-solving, mental calculations, and mathematical concepts</p>
              </div>
            </Link>

            <Link href="/psle-science" className="block">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 h-full">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔬</span>
                </div>
                <h3 className="font-bold text-lg text-purple-700 text-center mb-2">PSLE Science Guide</h3>
                <p className="text-gray-600 text-sm text-center">Master scientific concepts, process skills, and application questions</p>
              </div>
            </Link>

            <Link href="/psle-chinese" className="block">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 h-full">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="font-bold text-lg text-red-700 text-center mb-2">PSLE Chinese Guide</h3>
                <p className="text-gray-600 text-sm text-center">Excel in composition, comprehension, and oral communication</p>
              </div>
            </Link>
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Each guide includes:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-emerald-500">✓</span>
                <span className="text-sm">Detailed syllabus breakdown</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-emerald-500">✓</span>
                <span className="text-sm">Proven study strategies</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-emerald-500">✓</span>
                <span className="text-sm">Practice resources</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Teaching Methods */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-indigo-700 text-center">Our Proven Teaching Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-emerald-700 mb-4">📚 Interactive Learning</h3>
              <p className="text-gray-600">
                Engaging activities and real-world examples to make learning fun and memorable.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-blue-700 mb-4">🎯 Targeted Practice</h3>
              <p className="text-gray-600">
                Customized exercises and worksheets to strengthen weak areas and build confidence.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-purple-700 mb-4">🧭 Continuous Feedback</h3>
              <p className="text-gray-600">
                Regular progress updates and goal-setting with parents to keep learning on track.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Success Stories */}
        <section className="bg-gradient-to-r from-indigo-50 to-purple-50 p-12 rounded-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-indigo-700 text-center">Success Stories from Our Primary School Students</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-start space-x-4">
                <span className="text-3xl">📈</span>
                <div>
                  <strong className="text-emerald-700 text-lg">Amanda (P5):</strong>
                  <p className="text-gray-600 mt-2">Jumped from borderline pass to Band 1 in Science within 2 terms</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-start space-x-4">
                <span className="text-3xl">🎯</span>
                <div>
                  <strong className="text-blue-700 text-lg">Megan (P6):</strong>
                  <p className="text-gray-600 mt-2">PSLE English improved from AL6 to AL2 after weekly writing clinics</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Teaching Methods */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-indigo-700 text-center">Our Proven Teaching Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-emerald-700 mb-4">📚 Interactive Learning</h3>
              <p className="text-gray-600">
                Engaging activities and hands-on experiences that make learning fun and effective.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-blue-700 mb-4">🎯 Targeted Practice</h3>
              <p className="text-gray-600">
                Focused exercises and regular assessments to reinforce key concepts.
              </p>
            </div>
          </div>
        </section>

        {/* Section 8: Testimonials */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-indigo-700 text-center">What Parents Say About Our Primary School Tuition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <blockquote className="bg-gradient-to-br from-indigo-50 to-emerald-50 p-8 rounded-xl border-l-4 border-l-emerald-500 shadow-lg">
              <p className="italic text-lg mb-4">"The tutors really understand how to make learning fun while ensuring academic progress. My daughter looks forward to her lessons!"</p>
              <cite className="text-emerald-700 font-semibold text-lg">– Mrs Tan</cite>
            </blockquote>
            <blockquote className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-xl border-l-4 border-l-blue-500 shadow-lg">
              <p className="italic text-lg mb-4">"The structured approach and regular feedback have helped my son build confidence and improve his grades significantly."</p>
              <cite className="text-blue-700 font-semibold text-lg">– Mr Lim</cite>
            </blockquote>
          </div>
        </section>

        {/* Section 9: Service Areas */}
        <section className="bg-gray-50 p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-700 text-center">Primary School Tuition Available Across Singapore</h2>
          <p className="text-gray-700 text-center mb-6">
            Our experienced tutors serve families island-wide, including:
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-blue-400">•</span>
                <span>Ang Mo Kio</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-emerald-400">•</span>
                <span>Bedok</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-purple-400">•</span>
                <span>Bishan</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-400">•</span>
                <span>Bukit Timah</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-emerald-400">•</span>
                <span>Clementi</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-purple-400">•</span>
                <span>Hougang</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-400">•</span>
                <span>Jurong</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-emerald-400">•</span>
                <span>Pasir Ris</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-purple-400">•</span>
                <span>Punggol</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-400">•</span>
                <span>Sembawang</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-emerald-400">•</span>
                <span>Tampines</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-purple-400">•</span>
                <span>Woodlands</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: Final CTA */}
        <section className="text-center space-y-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-12 rounded-2xl shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold">Start Your Journey To PSLE Success Today</h2>
          <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
            Experience the difference with our handpicked tutors. We'll match you within 24 hours.
          </p>
          <Link href="/request-tutor" className="block w-full md:w-auto">
            <Button className="text-lg px-8 py-4 bg-white text-indigo-700 hover:bg-gray-100 font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200">
              Request a PSLE Tutor now
            </Button>
          </Link>
          <p className="text-sm text-indigo-100 mt-4">Improved grades • Expert tutors • Proven results</p>
        </section>
      </div>
    </>
  );
} 