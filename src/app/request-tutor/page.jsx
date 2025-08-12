"use client";

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Info } from "lucide-react";
import {Step1, Step2, Step3} from "@/components/FormSteps";

function RequestForTutorContent(){
  const searchParams = useSearchParams();
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

  // This hook reads the URL parameters on page load and pre-fills the form data.
  useEffect(() => {
    const name = searchParams.get('name');
    const mobile = searchParams.get('mobile');

    // Update the state only if any of the URL parameters exist
    if (name || mobile ) {
      setFormData(prevData => ({
        ...prevData,
        name: name || prevData.name,
        mobile: mobile || prevData.mobile,
      }));
    }
  }, [searchParams]);

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

  // Handle changes for nested objects with checkboxes
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
    
    // Check if this is a nested field (contains a dot)
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
        body: JSON.stringify(payload)
      });
    
      if (response.ok) {
        const result = await response.json();
        console.log('Submission successful:', result);
    
        const [firstName, ...rest] = (formData.name || '').trim().split(' ');
        const lastName = rest.join(' ');
    
        await fetch('/api/meta-capi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            phone: formData.mobile,
            firstName,
            lastName,
            eventName: 'Lead',
          })
        });
        setFormData(initialFormData);
        setCurrentStep(1); // Reset to first step
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setStatus({ submitting: false, submitted: true, error: null });
      } else {
        const errorText = await response.text();
        throw new Error(errorText || 'Form submission failed');
      }
    }
    catch (error) {
      console.error('Error submitting form:', error);
      setStatus({ submitting: false, submitted: false, error: error.message || 'Failed to submit the form. Please try again.' });
    }
  };

  return (
    <>
    <main>
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 py-12 text-center mb-10 rounded-xl shadow">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Find Your Ideal Tutor Today!</h2>
      <p className="text-gray-600 max-w-xl mx-auto">Complete this simple form and we'll match you with the best tutors in Singapore. 100% Free. Fast Response Guaranteed.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mt-12">
      <div className="p-6 border rounded-lg shadow hover:shadow-md transition">
        <h4 className="text-xl font-semibold text-blue-600">100+ Successful Matches</h4>
        <p className="text-sm text-gray-600 mt-2">We've helped over 100 students connect with qualified tutors.</p>
      </div>
      <div className="p-6 border rounded-lg shadow hover:shadow-md transition">
        <h4 className="text-xl font-semibold text-blue-600">100% Free Service</h4>
        <p className="text-sm text-gray-600 mt-2">No hidden fees. Get matched with tutors without paying a cent.</p>
      </div>
      <div className="p-6 border rounded-lg shadow hover:shadow-md transition">
        <h4 className="text-xl font-semibold text-blue-600">Fast Response</h4>
        <p className="text-sm text-gray-600 mt-2">Most clients receive tutor profiles within 24 hours.</p>
      </div>
      </div>

      {/* Centered Form Container */}
      <div id = "form" className="max-w-4xl mx-auto py-16 px-6">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-10 leading-relaxed">Free Request For Tutor</h1>
        
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
                <span className={`text-sm font-medium ${currentStep >= 1 ? 'text-blue-700' : 'text-gray-400'}`}>About Your Child</span>
                <span className={`text-sm font-medium ${currentStep >= 2 ? 'text-blue-700' : 'text-gray-400'}`}>Lesson Details</span>
                <span className={`text-sm font-medium ${currentStep >= 3 ? 'text-blue-700' : 'text-gray-400'}`}>Tutor Preferences</span>
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
    </div>
    </main>
    </>
  );
}

export default function RequestForTutor() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <RequestForTutorContent />
    </Suspense>
  );
}