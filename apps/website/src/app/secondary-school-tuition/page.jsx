"use client";

import React, { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";


export default function SecondarySchoolTuition() {
  const [formData, setFormData] = useState({
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
  });

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
        setFormData({
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
        });
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
    <main>
      <div className="p-6 max-w-5xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-blue-800">Secondary School Tuition in Singapore<br />O-Level & N-Level Specialist Tutors</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Achieve academic success with Singapore's top O-Level and N-Level tutors. We help students in Express, Normal Academic (N(A)), and Normal Technical (N(T)) streams build confidence, master key concepts, and excel in their exams.
          </p>
          <div className="my-8 relative w-full max-w-3xl mx-auto aspect-video overflow-hidden rounded-xl shadow-lg"> 
            <Image
              src="/secondary-tuition.webp"
              alt="Secondary school tuition in Singapore - Students learning with experienced tutors"
              fill
              className="object-cover"
              sizes="100vw"
              placeholder="blur"
              blurDataURL="/secondary-tuition.webp"
              priority 
            />
          </div>
        </section>

        {/* O-Level vs N-Level Info Section */}
        <section className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4 text-center">O-Level vs N-Level: Which Pathway?</h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-center mb-4">
            Singapore's secondary school system offers multiple pathways to success. <strong>O-Level</strong> (Express) is the direct route to Junior College or Polytechnic, while <strong>N-Level</strong> (Normal Academic & Technical) provides flexible options to progress to O-Levels, ITE, or Polytechnic. Our tutors are experienced in both streams and tailor lessons to each student's needs.
          </p>
        </section>

        {/* Feature Cards for O-Level and N-Level Tuition */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* O-Level Tuition Card */}
          <Card className="border-t-4 border-t-indigo-600 shadow-lg">
            <CardContent className="p-8 flex flex-col h-full">
              <h3 className="font-bold text-2xl text-indigo-700 mb-4">O-Level Tuition</h3>
              <p className="text-gray-700 mb-4">Comprehensive support for all O-Level subjects, including English, Math, Sciences, Humanities, and more. Our tutors help students master exam techniques, tackle challenging topics, and achieve top grades for JC or Poly entry.</p>
              <ul className="list-disc pl-5 mb-6 text-gray-600">
                <li>Experienced O-Level specialist tutors</li>
                <li>Express stream & IP support</li>
                <li>Exam strategies & past year paper practice</li>
                <li>Customised lesson plans</li>
              </ul>
              <Link href="/secondary-school-tuition/o-level-tuition" className="mt-auto">
                <Button className="bg-indigo-700 hover:bg-indigo-800 text-white w-full">Learn More</Button>
              </Link>
            </CardContent>
          </Card>
          {/* N-Level Tuition Card */}
          <Card className="border-t-4 border-t-emerald-600 shadow-lg">
            <CardContent className="p-8 flex flex-col h-full">
              <h3 className="font-bold text-2xl text-emerald-700 mb-4">N-Level Tuition</h3>
              <p className="text-gray-700 mb-4">Specialised tuition for Normal Academic (N(A)) and Normal Technical (N(T)) students. We focus on building strong foundations, exam confidence, and helping students progress to O-Levels, ITE, or Polytechnic.</p>
              <ul className="list-disc pl-5 mb-6 text-gray-600">
                <li>Expert N(A) & N(T) tutors</li>
                <li>All core and elective N-Level subjects</li>
                <li>Step-by-step concept mastery</li>
                <li>Support for progression to O-Levels or ITE</li>
              </ul>
              <Link href="/secondary-school-tuition/n-level-tuition" className="mt-auto">
                <Button className="bg-emerald-700 hover:bg-emerald-800 text-white w-full">Learn More</Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* General Request Form Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg mt-12">
          <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4">Request a Secondary School Tutor</h2>
          <p className="text-gray-700 text-center mb-8 max-w-2xl mx-auto">Fill in the form below and our team will match you with the best O-Level or N-Level tutor for your child's needs—fast, free, and no obligation.</p>
          <div className="max-w-4xl mx-auto">
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
                <>
                  {status.error && (
                    <div className="bg-red-100 text-red-800 p-4 rounded-md mb-6">
                      <p className="font-semibold">Submission Error</p>
                      <p className="text-sm">{status.error}</p>
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name<span className="text-red-500">*</span></label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g. Sec 3 A-Math, N(A) Science"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g. Springfield Secondary"
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
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <label htmlFor="tutorType.partTime" className="ml-2 block text-gray-700">
                            <span className="font-bold">Part-Time Tutors</span>{" "}
                            <span className="font-bold">$25-$35/Hour</span>
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="tutorType.fullTime"
                            name="tutorType.fullTime"
                            checked={formData.tutorType.fullTime}
                            onChange={handleCheckboxChange}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <label htmlFor="tutorType.fullTime" className="ml-2 block text-gray-700">
                            <span className="font-bold">Full-Time Tutors</span>{" "}
                            <span className="font-bold">$35-$45/Hour</span>
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="tutorType.moeTeacher"
                            name="tutorType.moeTeacher"
                            checked={formData.tutorType.moeTeacher}
                            onChange={handleCheckboxChange}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          />
                          <label htmlFor="tutorType.moeTeacher" className="ml-2 block text-gray-700">
                            <span className="font-bold">Ex/Current MOE Teachers</span>{" "}
                            <span className="font-bold">$50-$70/Hour</span>
                          </label>
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
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Any specific tutor requirements or questions?"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status.submitting}
                      className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
                        status.submitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                      }`}
                    >
                      {status.submitting ? 'Finding the perfect tutor...' : 'Find My Child\'s Ideal Tutor Now'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 