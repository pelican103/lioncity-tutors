"use client";

import React, { useState } from 'react';
import { FaPhoneAlt, FaWhatsapp, FaTelegram } from "react-icons/fa";
import Link from 'next/link';

export default function RegisterAsTutor() {
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    contactNumber: '',
    email: '',
    dob: { day: '', month: '', year: '' },
    gender: '',
    age: '',
    nationality: '',
    nationalityOther: '',
    race: '',
    nricLast4: '',
    
    // Tutoring Preferences
    teachingLevels: {
      primary: {
        english: false,
        math: false,
        science: false,
        chinese: false,
        malay: false,
        tamil: false
      },
      secondary: {
        english: false,
        math: false,
        aMath: false,
        eMath: false,
        physics: false,
        chemistry: false,
        biology: false,
        science: false,
        history: false,
        geography: false,
        literature: false,
        chinese: false,
        malay: false,
        tamil: false
      },
      jc: {
        generalPaper: false,
        h1Math: false,
        h2Math: false,
        h1Physics: false,
        h2Physics: false,
        h1Chemistry: false,
        h2Chemistry: false,
        h1Biology: false,
        h2Biology: false,
        h1Economics: false,
        h2Economics: false,
        h1History: false,
        h2History: false
      },
      international: {
        ib: false,
        igcse: false,
        ielts: false,
        toefl: false
      }
    },
    
    // Locations
    locations: {
      north: false,
      south: false,
      east: false,
      west: false,
      central: false,
      northeast: false,
      northwest: false
    },
    
    // Qualifications & Experience
    tutorType: '',
    yearsOfExperience: '',
    highestEducation: '',
    currentSchool: '',
    previousSchools: '',
    
    // Fee Structure
    hourlyRate: {
      primary: '',
      secondary: '',
      jc: '',
      international: ''
    },
    
    // Tutor Profile
    introduction: '',
    teachingExperience: '',
    trackRecord: '',
    sellingPoints: '',
    
    // Availability
    availableTimeSlots: {
      weekdayMorning: false,
      weekdayAfternoon: false,
      weekdayEvening: false,
      weekendMorning: false,
      weekendAfternoon: false,
      weekendEvening: false
    }
  });

  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDOBChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      dob: { ...prev.dob, [field]: value }
    }));
  };

  const handleCheckboxChange = (category, subcategory, field) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [subcategory]: {
          ...prev[category][subcategory],
          [field]: !prev[category][subcategory][field]
        }
      }
    }));
  };

  const handleLocationChange = (location) => {
    setFormData(prev => ({
      ...prev,
      locations: {
        ...prev.locations,
        [location]: !prev.locations[location]
      }
    }));
  };

  const handleAvailabilityChange = (timeSlot) => {
    setFormData(prev => ({
      ...prev,
      availableTimeSlots: {
        ...prev.availableTimeSlots,
        [timeSlot]: !prev.availableTimeSlots[timeSlot]
      }
    }));
  };

  const handleHourlyRateChange = (level, value) => {
    setFormData(prev => ({
      ...prev,
      hourlyRate: {
        ...prev.hourlyRate,
        [level]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, submitted: false, error: null });

    try {
      const response = await fetch('https://tuition-backend-afud.onrender.com/api/registerfortutor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, formType: 'register' })
      });

      if (!response.ok) throw new Error(await response.text());
      const [firstName, ...rest] = (formData.fullName || '').trim().split(' ');
      const lastName = rest.join(' ');

      await fetch('/api/meta-capi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone: formData.contactNumber,
          email: formData.email,
          firstName,
          lastName,
          eventName: 'CompleteRegistration'
        })
      });
      // Reset form after successful submission
      setFormData({
        // Reset all form fields to initial state
        fullName: '',
        contactNumber: '',
        email: '',
        dob: { day: '', month: '', year: '' },
        gender: '',
        age: '',
        nationality: '',
        nationalityOther: '',
        race: '',
        nricLast4: '',
        teachingLevels: {
          // Reset all teaching levels
          primary: { english: false, math: false, science: false, chinese: false, malay: false, tamil: false },
          secondary: { 
            english: false, math: false, aMath: false, eMath: false, physics: false, 
            chemistry: false, biology: false, science: false, history: false, geography: false, 
            literature: false, chinese: false, malay: false, tamil: false 
          },
          jc: {
            generalPaper: false, h1Math: false, h2Math: false, h1Physics: false, h2Physics: false,
            h1Chemistry: false, h2Chemistry: false, h1Biology: false, h2Biology: false,
            h1Economics: false, h2Economics: false, h1History: false, h2History: false
          },
          international: { ib: false, igcse: false, ielts: false, toefl: false }
        },
        locations: {
          north: false, south: false, east: false, west: false, 
          central: false, northeast: false, northwest: false
        },
        tutorType: '',
        yearsOfExperience: '',
        highestEducation: '',
        currentSchool: '',
        previousSchools: '',
        hourlyRate: { primary: '', secondary: '', jc: '', international: '' },
        introduction: '',
        teachingExperience: '',
        trackRecord: '',
        sellingPoints: '',
        availableTimeSlots: {
          weekdayMorning: false, weekdayAfternoon: false, weekdayEvening: false,
          weekendMorning: false, weekendAfternoon: false, weekendEvening: false
        }
      });
      
      setStatus({ submitting: false, submitted: true, error: null });
    } catch (error) {
      setStatus({ submitting: false, submitted: false, error: error.message || 'Failed to submit.' });
    }
  };

  return (
    <>
    <main>
    <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Telegram Assignments Section - ADDED AT TOP */}
        <div className="mb-12 bg-blue-50 p-8 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">View Available Assignments</h2>
          <p className="font-medium mb-2">Fill up the form below to start signing up for available assignments 🙂</p>
          <p className="mb-4">(Join our Telegram Group for full-listing & daily updates of assignments)</p>
          
          <a 
            href="https://t.me/LionCityTutors" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md font-medium transition-colors duration-300"
          >
            <FaTelegram size={20} className="mr-2" /> Join Our Telegram Group
          </a>
          <p className="text-sm mt-2 text-gray-600 italic">(Don't forget to fill up the form below!)</p>
        </div>
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-6">Register as a Tutor</h1>
        <p className="text-center text-gray-600 mb-8">Fill out the form below to register as a tutor with LionCity Tutors.</p>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg">
          {status.error && (
            <div className="bg-red-100 text-red-800 p-4 rounded-md">
              <p className="font-semibold">Submission Error</p>
              <p className="text-sm">{status.error}</p>
            </div>
          )}

          {status.submitted ? (
            <div className="bg-green-100 text-green-700 p-6 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-2">Registration Successful!</h3>
              <p className="mb-4">Thank you for registering as a tutor with us. We have received your information and will contact you shortly.</p>
              <p className="text-sm">Our team will review your profile and reach out to you within 2-3 business days.</p>
            </div>
          ) : (
            <>
              {/* Section 1: Personal Information */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-2xl font-semibold mb-6 text-blue-700">1. Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name <span className="text-red-500">*</span></label>
                    <input 
                      name="fullName" 
                      value={formData.fullName} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Contact Number <span className="text-red-500">*</span></label>
                    <input 
                      name="contactNumber" 
                      value={formData.contactNumber} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Email <span className="text-red-500">*</span></label>
                    <input 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Date of Birth <span className="text-red-500">*</span></label>
                    <div className="flex space-x-2">
                      <input 
                        type="number" 
                        placeholder="DD" 
                        value={formData.dob.day} 
                        onChange={(e) => handleDOBChange('day', e.target.value)} 
                        className="w-1/3 border rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500" 
                        required 
                        min="1" 
                        max="31"
                      />
                      <input 
                        type="number" 
                        placeholder="MM" 
                        value={formData.dob.month} 
                        onChange={(e) => handleDOBChange('month', e.target.value)} 
                        className="w-1/3 border rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500" 
                        required 
                        min="1" 
                        max="12"
                      />
                      <input 
                        type="number" 
                        placeholder="YYYY" 
                        value={formData.dob.year} 
                        onChange={(e) => handleDOBChange('year', e.target.value)} 
                        className="w-1/3 border rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500" 
                        required 
                        min="1950" 
                        max="2010"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Gender <span className="text-red-500">*</span></label>
                    <div className="flex space-x-6 items-center">
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          name="gender" 
                          value="Male" 
                          checked={formData.gender === "Male"}
                          onChange={handleInputChange} 
                          className="h-4 w-4 text-blue-600"
                          required
                        />
                        <span className="ml-2">Male</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          name="gender" 
                          value="Female" 
                          checked={formData.gender === "Female"}
                          onChange={handleInputChange} 
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2">Female</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Age <span className="text-red-500">*</span></label>
                    <input 
                      name="age" 
                      type="number" 
                      value={formData.age} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      required 
                      min="18"
                      max="99"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Nationality <span className="text-red-500">*</span></label>
                    <div className="space-y-2">
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          name="nationality" 
                          value="Singaporean" 
                          checked={formData.nationality === "Singaporean"}
                          onChange={handleInputChange} 
                          className="h-4 w-4 text-blue-600"
                          required
                        />
                        <span className="ml-1">Singaporean</span>
                        <span className="ml-4"></span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          name="nationality" 
                          value="Singapore PR" 
                          checked={formData.nationality === "Singapore PR"}
                          onChange={handleInputChange} 
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-1">Singapore PR</span>
                        <span className="ml-4"></span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          name="nationality" 
                          value="Others" 
                          checked={formData.nationality === "Others"}
                          onChange={handleInputChange} 
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-1">Others</span>
                      </label>
                      {formData.nationality === 'Others' && (
                        <input 
                          type="text" 
                          name="nationalityOther" 
                          value={formData.nationalityOther} 
                          onChange={handleInputChange} 
                          className="w-full mt-2 border rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500" 
                          placeholder="Please specify" 
                          required
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Race <span className="text-red-500">*</span></label>
                    <select 
                      name="race" 
                      value={formData.race} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      required
                    >
                      <option value="">Select Race</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Malay">Malay</option>
                      <option value="Indian">Indian</option>
                      <option value="Eurasian">Eurasian</option>
                      <option value="Caucasian">Caucasian</option>
                      <option value="Punjabi">Punjabi</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">NRIC (Last 4 Digits) <span className="text-red-500">*</span></label>
                    <input 
                      name="nricLast4" 
                      maxLength={4} 
                      value={formData.nricLast4} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      required 
                      pattern="[0-9]{3}[A-Za-z]{1}"
                      placeholder="e.g. 123A"
                    />
                  </div>
                </div>
                <p className="mt-3 text-xs text-gray-600 mb-2">
                  <strong>In the case you are confirmed for a tuition assignment:</strong> Upon arrival for 1st lesson, Tutor will be required to present a simple form of identification for Client to verify. (E.g. IC/Driving License/Singpass)
                </p>
              </div>

              {/* Section 2: Teaching Levels & Subjects */}
              <div className="border-b border-gray-200 pb-6 ">
                <p className="mb-4"></p>
                <h2 className="text-2xl font-semibold mb-6 text-blue-700">2. Teaching Levels & Subjects</h2>
                <p className="text-gray-600 mb-4">Select all the levels and subjects you are qualified to teach:</p>
                
                {/* Primary Level */}
                <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-3">Primary Level</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.primary.english} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'primary', 'english')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">English</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.primary.math} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'primary', 'math')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Mathematics</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.primary.science} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'primary', 'science')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Science</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.primary.chinese} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'primary', 'chinese')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Chinese</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.primary.malay} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'primary', 'malay')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Malay</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.primary.tamil} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'primary', 'tamil')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Tamil</span>
                    </label>
                  </div>
                </div>
                
                {/* Secondary Level */}
                <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-3">Secondary Level</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.secondary.english} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'secondary', 'english')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">English</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.secondary.math} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'secondary', 'math')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Mathematics</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.secondary.aMath} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'secondary', 'aMath')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Additional Mathematics</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.secondary.eMath} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'secondary', 'eMath')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Elementary Mathematics</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.secondary.physics} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'secondary', 'physics')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Physics</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.secondary.chemistry} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'secondary', 'chemistry')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Chemistry</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.secondary.biology} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'secondary', 'biology')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Biology</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.secondary.science} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'secondary', 'science')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Combined Science</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.secondary.history} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'secondary', 'history')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">History</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.secondary.geography} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'secondary', 'geography')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Geography</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.secondary.literature} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'secondary', 'literature')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Literature</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.secondary.chinese} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'secondary', 'chinese')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Chinese</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.secondary.malay} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'secondary', 'malay')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Malay</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.secondary.tamil} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'secondary', 'tamil')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Tamil</span>
                    </label>
                  </div>
                </div>
                
                {/* JC Level */}
                <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-3">Junior College (JC) Level</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.jc.generalPaper} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'jc', 'generalPaper')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">General Paper (GP)</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.jc.h1Math} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'jc', 'h1Math')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">H1 Mathematics</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.jc.h2Math} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'jc', 'h2Math')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">H2 Mathematics</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.jc.h1Physics} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'jc', 'h1Physics')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">H1 Physics</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.jc.h2Physics} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'jc', 'h2Physics')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">H2 Physics</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.jc.h1Chemistry} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'jc', 'h1Chemistry')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">H1 Chemistry</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox"
                        checked={formData.teachingLevels.jc.h2Chemistry} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'jc', 'h2Chemistry')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">H2 Chemistry</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.jc.h1Biology} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'jc', 'h1Biology')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">H1 Biology</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.jc.h2Biology} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'jc', 'h2Biology')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">H2 Biology</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.jc.h1Economics} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'jc', 'h1Economics')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">H1 Economics</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.jc.h2Economics} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'jc', 'h2Economics')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">H2 Economics</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.jc.h1History} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'jc', 'h1History')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">H1 History</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.jc.h2History} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'jc', 'h2History')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">H2 History</span>
                    </label>
                  </div>
                </div>
                
                {/* International Level */}
                <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-3">International Programs</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.international.ib} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'international', 'ib')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">IB</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.international.igcse} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'international', 'igcse')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">IGCSE</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.international.ielts} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'international', 'ielts')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">IELTS</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input 
                        type="checkbox" 
                        checked={formData.teachingLevels.international.toefl} 
                        onChange={() => handleCheckboxChange('teachingLevels', 'international', 'toefl')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">TOEFL</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Section 3: Preferred Teaching Locations */}
              <div className="border-b border-gray-200 pb-6">
                <p className="mb-4"></p>
                <h2 className="text-2xl font-semibold mb-6 text-blue-700">3. Preferred Teaching Locations</h2>
                <p className="text-gray-600 mb-4">Select all areas where you are willing to travel for lessons:</p>
                
                <div className="space-y-6">
                  {/* North */}
                  <div className="border-t border-gray-200 pt-3">
                    <label className="inline-flex items-center mb-2">
                      <input 
                        type="checkbox" 
                        checked={formData.locations.north} 
                        onChange={() => handleLocationChange('north')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 font-medium">North</span>
                    </label>
                    <div className="ml-6 text-gray-600 text-sm">
                      Woodlands, Yishun, Sembawang, Admiralty, Khatib
                    </div>
                  </div>
                  
                  {/* South */}
                  <div className="border-t border-gray-200 pt-3">
                    <label className="inline-flex items-center mb-2">
                      <input 
                        type="checkbox" 
                        checked={formData.locations.south} 
                        onChange={() => handleLocationChange('south')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 font-medium">South</span>
                    </label>
                    <div className="ml-6 text-gray-600 text-sm">
                      Telok Blangah, Harbourfront, Sentosa, Bukit Merah, Pasir Panjang
                    </div>
                  </div>
                  
                  {/* East */}
                  <div className="border-t border-gray-200 pt-3">
                    <label className="inline-flex items-center mb-2">
                      <input 
                        type="checkbox" 
                        checked={formData.locations.east} 
                        onChange={() => handleLocationChange('east')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 font-medium">East</span>
                    </label>
                    <div className="ml-6 text-gray-600 text-sm">
                      Tampines, Pasir Ris, Bedok, Changi, East Coast, Chai Chee
                    </div>
                  </div>
                  
                  {/* West */}
                  <div className="border-t border-gray-200 pt-3">
                    <label className="inline-flex items-center mb-2">
                      <input 
                        type="checkbox" 
                        checked={formData.locations.west} 
                        onChange={() => handleLocationChange('west')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 font-medium">West</span>
                    </label>
                    <div className="ml-6 text-gray-600 text-sm">
                      Jurong, Clementi, Boon Lay, Pioneer, Lakeside, Chinese Garden
                    </div>
                  </div>
                  
                  {/* Central */}
                  <div className="border-t border-gray-200 pt-3">
                    <label className="inline-flex items-center mb-2">
                      <input 
                        type="checkbox" 
                        checked={formData.locations.central} 
                        onChange={() => handleLocationChange('central')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 font-medium">Central</span>
                    </label>
                    <div className="ml-6 text-gray-600 text-sm">
                      Orchard, Newton, Novena, River Valley, Bugis, Chinatown, CBD
                    </div>
                  </div>
                  
                  {/* North-East */}
                  <div className="border-t border-gray-200 pt-3">
                    <label className="inline-flex items-center mb-2">
                      <input 
                        type="checkbox" 
                        checked={formData.locations.northeast} 
                        onChange={() => handleLocationChange('northeast')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 font-medium">North-East</span>
                    </label>
                    <div className="ml-6 text-gray-600 text-sm">
                      Sengkang, Punggol, Hougang, Serangoon, Ang Mo Kio, Buangkok
                    </div>
                  </div>
                  
                  {/* North-West */}
                  <div className="border-t border-gray-200 pt-3">
                    <label className="inline-flex items-center mb-2">
                      <input 
                        type="checkbox" 
                        checked={formData.locations.northwest} 
                        onChange={() => handleLocationChange('northwest')} 
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 font-medium">North-West</span>
                    </label>
                    <div className="ml-6 text-gray-600 text-sm">
                      Choa Chu Kang, Bukit Panjang, Bukit Batok, Yew Tee, Jelapang
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: Qualifications & Experience */}
              <div className="border-b border-gray-200 pb-6">
                <p className="mb-4"></p>
                <h2 className="text-2xl font-semibold mb-6 text-blue-700">4. Qualifications & Experience</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Tutor Type <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          name="tutorType" 
                          value="Full-time Tutor" 
                          checked={formData.tutorType === "Full-time Tutor"}
                          onChange={handleInputChange} 
                          className="h-4 w-4 text-blue-600"
                          required
                        />
                        <span className="ml-2">Full-time Tutor</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          name="tutorType" 
                          value="Part-time Tutor" 
                          checked={formData.tutorType === "Part-time Tutor"}
                          onChange={handleInputChange} 
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2">Part-time Tutor</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          name="tutorType" 
                          value="MOE Teacher" 
                          checked={formData.tutorType === "MOE Teacher"}
                          onChange={handleInputChange} 
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2">MOE Teacher</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          name="tutorType" 
                          value="Ex-MOE Teacher" 
                          checked={formData.tutorType === "Ex-MOE Teacher"}
                          onChange={handleInputChange} 
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2">Ex-MOE Teacher</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          name="tutorType" 
                          value="NIE Trainee" 
                          checked={formData.tutorType === "NIE Trainee"}
                          onChange={handleInputChange} 
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2">NIE Trainee</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="radio" 
                          name="tutorType" 
                          value="Undergraduate" 
                          checked={formData.tutorType === "Undergraduate"}
                          onChange={handleInputChange} 
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2">Undergraduate</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Years of Teaching Experience <span className="text-red-500">*</span></label>
                    <select 
                      name="yearsOfExperience" 
                      value={formData.yearsOfExperience} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      required
                    >
                      <option value="">Select Experience</option>
                      <option value="0-1 year">0-1 year</option>
                      <option value="1-3 years">1-3 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5-10 years">5-10 years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Highest Education Level <span className="text-red-500">*</span></label>
                    <select 
                      name="highestEducation" 
                      value={formData.highestEducation} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      required
                    >
                      <option value="">Select Education Level</option>
                      <option value="PhD">PhD</option>
                      <option value="Masters">Masters</option>
                      <option value="Bachelor's Degree">Bachelor's Degree</option>
                      <option value="Diploma">Diploma</option>
                      <option value="A-Level">A-Level</option>
                      <option value="O-Level">O-Level</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Current School/University/Workplace <span className="text-red-500">*</span></label>
                    <input 
                      name="currentSchool" 
                      value={formData.currentSchool} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      required 
                      placeholder="E.g., NUS, NTU, SMU, Private Tutor"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Previous Schools/Universities</label>
                    <textarea 
                      name="previousSchools" 
                      value={formData.previousSchools} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24" 
                      placeholder="List your previous educational institutions"
                    />
                  </div>
                </div>
              </div>

              {/* Section 5: Fee Structure */}
              <div className="border-b border-gray-200 pb-6">
              < p className="mb-4"></p>
                <h2 className="text-2xl font-semibold mb-6 text-blue-700">5. Fee Structure</h2>
                <p className="text-gray-600 mb-4">Indicate your hourly rate (SGD) for each educational level:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Primary Level Rate</label>
                    <div className="flex items-center">
                      <span className="mr-2">$</span>
                      <input 
                        type="number" 
                        value={formData.hourlyRate.primary} 
                        onChange={(e) => handleHourlyRateChange('primary', e.target.value)} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Hourly rate"
                        min="0"
                      />
                      <span className="ml-2">/hr</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Secondary Level Rate</label>
                    <div className="flex items-center">
                      <span className="mr-2">$</span>
                      <input 
                        type="number" 
                        value={formData.hourlyRate.secondary} 
                        onChange={(e) => handleHourlyRateChange('secondary', e.target.value)} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Hourly rate"
                        min="0"
                      />
                      <span className="ml-2">/hr</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Junior College (JC) Level Rate</label>
                    <div className="flex items-center">
                      <span className="mr-2">$</span>
                      <input 
                        type="number" 
                        value={formData.hourlyRate.jc} 
                        onChange={(e) => handleHourlyRateChange('jc', e.target.value)} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Hourly rate"
                        min="0"
                      />
                      <span className="ml-2">/hr</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">International Programs Rate</label>
                    <div className="flex items-center">
                      <span className="mr-2">$</span>
                      <input 
                        type="number" 
                        value={formData.hourlyRate.international} 
                        onChange={(e) => handleHourlyRateChange('international', e.target.value)} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Hourly rate"
                        min="0"
                      />
                      <span className="ml-2">/hr</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 6: Tutor Profile */}
              <div className="border-b border-gray-200 pb-6">
                <p className="mb-4"></p>
                <h2 className="text-2xl font-semibold mb-6 text-blue-700">6. Tutor Profile (Important)</h2>
                <p className="text-gray-600 mb">This section will be a key factor in your success rate of assignment matching.</p>
                <p className="text-gray-600 mb-6">Create a compelling profile to attract potential students:</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Brief Introduction <span className="text-red-500">*</span></label>
                    <textarea 
                      name="introduction" 
                      value={formData.introduction} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24" 
                      required 
                      placeholder="Provide a brief introduction about yourself"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Teaching Experience <span className="text-red-500">*</span></label>
                    <textarea 
                      name="teachingExperience" 
                      value={formData.teachingExperience} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24" 
                      required 
                      placeholder="Describe your teaching experience and methodology"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Track Record & Achievements<span className="text-red-500">*</span></label>
                    <textarea 
                      name="trackRecord" 
                      value={formData.trackRecord} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24" 
                      placeholder="Share your students' achievements and success stories"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Your Selling Points <span className="text-red-500">*</span></label>
                    <textarea 
                      name="sellingPoints" 
                      value={formData.sellingPoints} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24" 
                      required 
                      placeholder="What makes you stand out as a tutor? Why should students choose you?"
                    />
                  </div>
                </div>
              </div>

              {/* Section 7: Availability */}
              <div className="border-b border-gray-200 pb-6">
                <p className="mb-4"></p>
                <h2 className="text-2xl font-semibold mb-6 text-blue-700">7. Availability</h2>
                <p className="text-gray-600 mb-4">Select your available time slots for tutoring:</p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Weekdays:</h3>
                    <div className="flex flex-wrap gap-4">
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          checked={formData.availableTimeSlots.weekdayMorning} 
                          onChange={() => handleAvailabilityChange('weekdayMorning')} 
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2">Morning (8am-12pm)</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          checked={formData.availableTimeSlots.weekdayAfternoon} 
                          onChange={() => handleAvailabilityChange('weekdayAfternoon')} 
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2">Afternoon (12pm-5pm)</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          checked={formData.availableTimeSlots.weekdayEvening} 
                          onChange={() => handleAvailabilityChange('weekdayEvening')} 
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2">Evening (5pm-10pm)</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Weekends:</h3>
                    <div className="flex flex-wrap gap-4">
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          checked={formData.availableTimeSlots.weekendMorning} 
                          onChange={() => handleAvailabilityChange('weekendMorning')} 
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2">Morning (8am-12pm)</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          checked={formData.availableTimeSlots.weekendAfternoon} 
                          onChange={() => handleAvailabilityChange('weekendAfternoon')} 
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2">Afternoon (12pm-5pm)</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input 
                          type="checkbox" 
                          checked={formData.availableTimeSlots.weekendEvening} 
                          onChange={() => handleAvailabilityChange('weekendEvening')} 
                          className="h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2">Evening (5pm-10pm)</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="mb-8">
                <label className="inline-flex items-center">
                  <input 
                    type="checkbox" 
                    required 
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2 text-sm" >
                  I agree to receiving SMS/WhatsApp/Emails regarding new tuition assignments.
                  <span className="text-red-500">*</span>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button 
                  type="submit" 
                  className="mb-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out"
                  disabled={status.submitting}
                >
                  {status.submitting ? 'Submitting...' : 'Register as Tutor'}
                </button>
                <p className="ml-2 text-sm">*We're repairing our servers, it might take a while to submit, please wait for up to 45 seconds*</p>
              </div>
            </>
          )}
        </form>
      </div>
      <div className="fixed bottom-6 right-8 z-50 group">
              <a
                href="https://wa.me/6588701152" 
                className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp">
                <FaWhatsapp size={24} />
              </a>
              <div className="absolute bottom-15 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                WhatsApp Us
              </div>
            </div>
    </div>
    </main>
    </>
  );
}