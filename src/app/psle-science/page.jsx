"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';
import { Step1, Step2, Step3 } from "@/components/FormSteps";


export default function PSLEScience() {
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
        {/* Main Content */}
        <section id="overview" className="space-y-6">
          <h1 className="text-4xl font-bold text-blue-800">A Complete Guide to Primary School & PSLE Science</h1>
          <p className="text-lg text-gray-700">
            Welcome to our comprehensive guide to PSLE Science. This guide is designed to help students, parents, and educators understand the PSLE Science examination format, scoring system, and provide valuable tips for success.
          </p>
        </section>

        {/* Overview Section */}
        <section id="overview" className="space-y-4">
          <h2 className="text-3xl font-semibold text-blue-700">1. An Overview to PSLE Science</h2>
          <p className="text-gray-700">
            PSLE Science is a crucial examination that tests students' understanding of scientific concepts and their ability to apply scientific knowledge. The examination covers topics from Primary 3 to Primary 6, focusing on three main themes:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Diversity of Living and Non-living Things</li>
            <li>Life Cycles and Reproduction</li>
            <li>Materials and their Properties</li>
            <li>Energy and Forces</li>
            <li>Interactions within the Environment</li>
          </ul>
        </section>

        {/* Objectives Section */}
        <section id="objectives" className="space-y-4">
          <h2 className="text-3xl font-semibold text-blue-700">2. Objectives of PSLE Science</h2>
          <p className="text-gray-700">
            The PSLE Science examination aims to:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>Assess students' understanding of scientific concepts</li>
            <li>Evaluate students' ability to apply scientific knowledge</li>
            <li>Test students' skills in scientific inquiry</li>
            <li>Measure students' ability to communicate scientific ideas</li>
          </ul>
        </section>

        {/* Exam Format Section */}
        <section id="exam-format" className="space-y-6">
          <h2 className="text-3xl font-semibold text-blue-700">3. PSLE Science Exam Format</h2>
          
          <div id="booklet-a" className="space-y-4">
            <h3 className="text-2xl font-semibold text-blue-600">3.1. Booklet A (Multiple-choice Questions)</h3>
            <Card>
              <CardContent className="p-6">
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>28 multiple-choice questions</li>
                  <li>2 marks per question</li>
                  <li>Total: 56 marks</li>
                  <li>Duration: 1 hour</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div id="booklet-b" className="space-y-4">
            <h3 className="text-2xl font-semibold text-blue-600">3.2. Booklet B (Open-ended Questions)</h3>
            <Card>
              <CardContent className="p-6">
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>12-13 open-ended questions</li>
                  <li>2-4 marks per question</li>
                  <li>Total: 44 marks</li>
                  <li>Duration: 1 hour 15 minutes</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tips and Resources Section */}
        <section id="tips-resources" className="space-y-6">
          <h2 className="text-3xl font-semibold text-blue-700">4. PSLE Science Tips and Resources</h2>

          <div id="tips" className="space-y-4">
            <h3 className="text-2xl font-semibold text-blue-600">4.1. PSLE Science Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg text-emerald-700 mb-3">Study Tips</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Understand concepts thoroughly</li>
                    <li>Practice past year papers</li>
                    <li>Create mind maps for each topic</li>
                    <li>Review mistakes regularly</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg text-blue-700 mb-3">Exam Tips</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Read questions carefully</li>
                    <li>Manage time effectively</li>
                    <li>Show all working steps</li>
                    <li>Check answers thoroughly</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <div id="resources" className="space-y-4">
            <h3 className="text-2xl font-semibold text-blue-600">4.2. PSLE Science Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg text-purple-700 mb-3">Recommended Books</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>PSLE Science Guide</li>
                    <li>Science Process Skills</li>
                    <li>PSLE Science Practice Papers</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg text-emerald-700 mb-3">Online Resources</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>MOE Science Syllabus</li>
                    <li>Science Learning Portal</li>
                    <li>Educational Videos</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg text-blue-700 mb-3">Practice Materials</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Past Year Papers</li>
                    <li>Mock Tests</li>
                    <li>Revision Notes</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Conclusion Section */}
        <section id="conclusion" className="space-y-4">
          <h2 className="text-3xl font-semibold text-blue-700">5. Conclusion</h2>
          <p className="text-gray-700">
            Success in PSLE Science requires a combination of thorough understanding, regular practice, and effective exam strategies. With the right approach and resources, students can achieve their desired results.
          </p>
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
            <h3 className="text-lg font-semibold mb-3">Request a PSLE Science Tutor</h3>
            <p className="mb-4">Fill out the form below to get matched with an experienced PSLE Science tutor who can help your child achieve their A* goals.</p>
            
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
                    handleCheckboxChange={handleCheckboxChange}
                    status={status}
                  />
                )}
              </form>
            )}
          </div>
        </section>
      </div>
    </>
  );
} 