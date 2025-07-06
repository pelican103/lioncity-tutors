"use client";

import React, { useState } from 'react';
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { Info } from "lucide-react";

export default function RequestForTutor() {
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
    
        const [firstName, ...rest] = (formData.name || '').trim().split(' ');
        const lastName = rest.join(' ');
    
        await fetch('/api/meta-capi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            phone: formData.mobile,
            email: formData.email || '',
            firstName,
            lastName,
            eventName: 'Lead',
            test_event_code: 'TEST31390'
          })
        });
        setFormData(initialFormData);
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
      <div className="max-w-4xl mx-auto py-16 px-6">
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email<span className="text-red-500">*</span></label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. name@gmail.com"
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
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location/Region<span className="text-red-500">*</span></label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. 610146, Bishan, Jurong, Bedok, Sengkang"
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
