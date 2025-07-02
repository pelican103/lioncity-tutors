"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link';
import { Info } from 'lucide-react';

export default function PSLEScience() {
  const [showTOC, setShowTOC] = useState(true);
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
      below50: false,
      below75: false,
      below100: false,
      above100: false
    },
    genderPreference: '',
    bilingual: false,
    otherPreferences: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Check if this is a nested field (contains a dot)
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
      // Handle regular fields
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

  return (
    <>
      <div className="p-6 max-w-5xl mx-auto space-y-12">
        {/* Table of Contents */}
        <section className="bg-blue-50 p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-blue-800">Table of Contents</h2>
            <Button 
              onClick={() => setShowTOC(!showTOC)}
              className="text-blue-600 hover:text-blue-800"
            >
              {showTOC ? 'Hide' : 'Show'}
            </Button>
          </div>
          
          {showTOC && (
            <nav className="space-y-2">
              <ol className="list-decimal list-inside space-y-2 text-blue-700">
                <li>
                  <a href="#overview" className="hover:text-blue-900">An Overview to PSLE Science</a>
                </li>
                <li>
                  <a href="#objectives" className="hover:text-blue-900">Objectives of PSLE Science</a>
                </li>
                <li>
                  <a href="#exam-format" className="hover:text-blue-900">PSLE Science Exam Format</a>
                  <ul className="list-disc list-inside ml-6 mt-1">
                    <li><a href="#booklet-a" className="hover:text-blue-900">3.1. Booklet A (Multiple-choice Questions)</a></li>
                    <li><a href="#booklet-b" className="hover:text-blue-900">3.2. Booklet B (Open-ended Questions)</a></li>
                  </ul>
                </li>
                <li>
                  <a href="#tips-resources" className="hover:text-blue-900">PSLE Science Tips and Resources</a>
                  <ul className="list-disc list-inside ml-6 mt-1">
                    <li><a href="#tips" className="hover:text-blue-900">4.1. PSLE Science Tips</a></li>
                    <li><a href="#resources" className="hover:text-blue-900">4.2. PSLE Science Resources</a></li>
                  </ul>
                </li>
                <li>
                  <a href="#conclusion" className="hover:text-blue-900">Conclusion</a>
                </li>
              </ol>
            </nav>
          )}
        </section>

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
                    placeholder="e.g. P6 Science"
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
                    placeholder="e.g. Primary School Name"
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
                          I have a specific budget
                        </label>
                      </div>
                      
                      {formData.budget.custom && (
                        <div className="mt-2">
                          <input
                            type="text"
                            name="budget.customAmount"
                            value={formData.budget.customAmount}
                            onChange={handleChange}
                            placeholder="Please specify your budget per hour"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="genderPreference" className="block text-sm font-medium text-gray-700 mb-1">
                    Gender Preference
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
                    Bilingual Required
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

                <div>
                  <label htmlFor="preferences" className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Preferences
                  </label>
                  <textarea
                    id="preferences"
                    name="preferences"
                    value={formData.preferences}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Any specific requirements or preferences?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                >
                  {status.submitting ? 'Submitting...' : 'Request PSLE Science Tutor'}
                </button>
              </form>
            </>
          )}
        </div>
        </section>
      </div>
    </>
  );
} 