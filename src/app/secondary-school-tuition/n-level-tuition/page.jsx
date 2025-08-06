"use client";

import React, { useState } from "react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Step1, Step2, Step3 } from "@/components/FormSteps";


export default function NLevelTuition() {
  const [currentStep, setCurrentStep] = useState(1);
  const initialFormData = {
    name: '',
    mobile: '',
    email: '',
    level: '',
    school: '',
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
      type: 'marketRate',
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
          <h1 className="text-4xl font-bold text-blue-800">N-Level Tuition: Expert Guidance for Normal Academic & Technical Streams</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Trusted by over 200 families. We help N(A) and N(T) students build confidence, master key concepts, and achieve their best results.
          </p>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Whether your child is in Sec 1 -3 or preparing for the N-Level exams, our experienced tutors deliver structured, engaging lessons that build confidence and boost grades. We support every step, from foundational skills to exam strategies.
          </p>
        </section>

        {/* Tutor Request Form Section */}
        <section className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-indigo-700 mb-4">Request an N-Level Tutor</h2>
            
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
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">🎉</div>
                  <h3 className="text-2xl font-bold text-indigo-700 mb-2">Thank You!</h3>
                  <p className="text-gray-600 mb-4">We've received your request and will contact you within 24 hours to discuss your child's needs.</p>
                  <button
                    onClick={() => setStatus({ submitting: false, submitted: false, error: null })}
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form id="mainForm" onSubmit={handleSubmit}>
                  {/* --- NEW: Progress Bar --- */}
                  <div className="mb-8">
                    <div className="flex justify-between mb-1">
                      <span className={`text-sm font-medium ${currentStep >= 1 ? 'text-indigo-700' : 'text-gray-400'}`}>Core Info</span>
                      <span className={`text-sm font-medium ${currentStep >= 2 ? 'text-indigo-700' : 'text-gray-400'}`}>Logistics</span>
                      <span className={`text-sm font-medium ${currentStep >= 3 ? 'text-indigo-700' : 'text-gray-400'}`}>Preferences</span>
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

        {/* Section 2: Why N-Levels Matter */}
        <section className="bg-gradient-to-br from-indigo-50 to-purple-50 p-12 rounded-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-indigo-700 text-center">Why N-Level Success Matters</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
            The N-Level exams are a key milestone for students in the Normal Academic and Normal Technical streams. Good results open doors to O-Levels, ITE, and Polytechnic pathways. We help your child build the skills and confidence needed to excel.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎓</span>
              </div>
              <h3 className="font-bold text-xl text-indigo-700 text-center mb-4">Pathway to Progression</h3>
              <p className="text-gray-600 text-center">Qualify for O-Levels, ITE, or Polytechnic with strong N-Level results</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">💼</span>
              </div>
              <h3 className="font-bold text-xl text-indigo-700 text-center mb-4">Future Opportunities</h3>
              <p className="text-gray-600 text-center">Build a strong foundation for future academic and career success</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="font-bold text-xl text-indigo-700 text-center mb-4">Essential Skills</h3>
              <p className="text-gray-600 text-center">Develop critical thinking and problem-solving abilities that last a lifetime</p>
            </div>
          </div>
        </section>

        {/* Section 3: Subjects We Cover (N-Level) */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-indigo-700 text-center">Comprehensive N-Level Subjects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Languages */}
            <Card className="border-t-4 border-t-emerald-500 shadow-lg">
              <CardContent className="p-8">
                <h3 className="font-bold text-xl text-emerald-700 mb-6">Languages</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-emerald-600 mb-3">Core Languages</h4>
                    <ul className="text-gray-600 space-y-3">
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        <span>English Language (N(A) & N(T))</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        <span>Mother Tongue Languages (Chinese, Malay, Tamil)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mathematics */}
            <Card className="border-t-4 border-t-blue-500 shadow-lg">
              <CardContent className="p-8">
                <h3 className="font-bold text-xl text-blue-700 mb-6">Mathematics</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-blue-600 mb-3">N(A) & N(T) Math</h4>
                    <ul className="text-gray-600 space-y-3">
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>Mathematics (N(A))</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span>Mathematics (N(T))</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Science */}
            <Card className="border-t-4 border-t-purple-500 shadow-lg">
              <CardContent className="p-8">
                <h3 className="font-bold text-xl text-purple-700 mb-6">Science</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-purple-600 mb-3">N(A) & N(T) Science</h4>
                    <ul className="text-gray-600 space-y-3">
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span>Science (N(A))</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span>Science (N(T))</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Humanities */}
            <Card className="border-t-4 border-t-rose-500 shadow-lg">
              <CardContent className="p-8">
                <h3 className="font-bold text-xl text-rose-700 mb-6">Humanities</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-rose-600 mb-3">Core Components</h4>
                    <ul className="text-gray-600 space-y-3">
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                        <span>Social Studies</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                        <span>Geography</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-rose-500 rounded-full"></span>
                        <span>History</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Electives & Applied Subjects */}
            <Card className="border-t-4 border-t-cyan-500 shadow-lg">
              <CardContent className="p-8">
                <h3 className="font-bold text-xl text-cyan-700 mb-6">Electives & Applied Subjects</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-cyan-600 mb-3">Creative & Technical</h4>
                    <ul className="text-gray-600 space-y-3">
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                        <span>Design & Technology</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                        <span>Food & Nutrition</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                        <span>Principles of Accounts</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                        <span>Computer Applications (N(T))</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 4: N-Level Study Tips */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 p-12 rounded-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-indigo-700 text-center">N-Level Study Tips & Resources</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
            Access our curated tips and resources to help you excel in your N-Level journey. Each resource is crafted by experienced educators to provide comprehensive coverage of the syllabus.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/blog/n-level-preparation-guide" className="block group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] cursor-pointer border-2 border-transparent group-hover:border-indigo-500">
                <CardContent className="p-6 relative">
                  <div className="absolute top-4 right-4 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl text-indigo-700 mb-2 group-hover:text-indigo-600">N-Level Preparation Guide</h3>
                  <p className="text-gray-600">Essential tips and strategies for N-Level success.</p>
                  <div className="mt-4 text-sm text-indigo-600 font-medium flex items-center">
                    View Guide
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* Section 5: Teaching Methods */}
        <section>
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-indigo-700 text-center">Our Proven Teaching Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-emerald-700 mb-4">📚 Interactive Learning</h3>
              <p className="text-gray-600">
                Engaging activities and real-world examples to make complex concepts accessible and memorable.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-blue-700 mb-4">🎯 Targeted Practice</h3>
              <p className="text-gray-600">
                Customized exercises and past year papers to strengthen weak areas and build exam confidence.
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
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-indigo-700 text-center">Success Stories from Our N-Level Students</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-start space-x-4">
                <span className="text-3xl">📈</span>
                <div>
                  <strong className="text-emerald-700 text-lg">Alicia (Sec 4N):</strong>
                  <p className="text-gray-600 mt-2">Improved from C6 to B3 in N(A) Math in just 4 months</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-start space-x-4">
                <span className="text-3xl">🎯</span>
                <div>
                  <strong className="text-blue-700 text-lg">Marcus (Sec 5N):</strong>
                  <p className="text-gray-600 mt-2">Qualified for O-Levels after consistent improvement in Science and English</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: Service Areas */}
        <section className="bg-gray-50 p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-700 text-center">N-Level Tuition Available Across Singapore</h2>
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
                <span>Sengkang</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-emerald-400">•</span>
                <span>Tampines</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-purple-400">•</span>
                <span>Toa Payoh</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: Final CTA */}
        <section className="text-center space-y-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-12 rounded-2xl shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold">Start Your Journey To N-Level Success Today</h2>
          <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
            Experience the difference with our handpicked tutors. We'll match you within 24 hours.
          </p>
          <Link href="/request-tutor" className="block w-full md:w-auto">
            <Button className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-700 hover:bg-gray-100 font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200">
              Get an N-Level Tutor Now
            </Button>
          </Link>
          <p className="text-sm text-indigo-100 mt-4">Improved grades • Expert tutors • Proven results</p>
        </section>
      </div>
    </>
  );
} 