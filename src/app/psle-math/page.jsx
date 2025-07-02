"use client";

import React, { useState } from "react";
import Link from 'next/link';
import { Info } from 'lucide-react';

export default function PSLEMath() {
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
      marketRate: false,
      custom: false,
      customAmount: ''
    },
    genderPreference: '',
    bilingualRequired: 'No',
    preferences: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState({ submitting: false, submitted: false, error: null });

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
    <main className="px-4 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">PSLE Math Guide 2025: Master Primary School Mathematics</h1>
      <p className="text-sm text-gray-500 mb-8">Posted on June 14, 2025 • 12 min read</p>

      <article className="space-y-6 text-gray-700 leading-relaxed">
        <p className="text-lg font-medium text-gray-800">
          PSLE Mathematics is a crucial subject that tests students' understanding of fundamental mathematical concepts and problem-solving abilities. With the right preparation strategy, students can achieve excellent results. This comprehensive guide provides proven strategies for PSLE Math success in 2025.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Understanding PSLE Mathematics Structure</h2>
          <p>
            The PSLE Mathematics examination consists of two papers, testing different aspects of mathematical understanding and application.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mt-3">
            <h4 className="font-semibold mb-2">PSLE Math Papers Breakdown:</h4>
            <div className="space-y-3">
              <div>
                <h5 className="font-semibold text-blue-600">Paper 1 (50 marks, 1 hour)</h5>
                <ul className="list-disc ml-4 space-y-1 text-sm">
                  <li>Multiple-choice questions (MCQ)</li>
                  <li>Short-answer questions</li>
                  <li>No calculator allowed</li>
                  <li>Tests basic concepts and mental calculation skills</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-blue-600">Paper 2 (50 marks, 1 hour 40 minutes)</h5>
                <ul className="list-disc ml-4 space-y-1 text-sm">
                  <li>Short-answer questions</li>
                  <li>Structured questions</li>
                  <li>Calculator allowed</li>
                  <li>Tests problem-solving and application skills</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">12-Month PSLE Math Preparation Timeline</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-green-400 pl-4">
              <h4 className="font-semibold text-green-700">Primary 5 Term 4 to Primary 6 Term 1 (Foundation Phase)</h4>
              <ul className="list-disc ml-4 mt-2 space-y-1">
                <li>Master fundamental concepts from P1-P5</li>
                <li>Build strong mental calculation skills</li>
                <li>Develop systematic problem-solving approaches</li>
                <li>Focus on accuracy in basic operations</li>
                <li>Complete all textbook exercises thoroughly</li>
              </ul>
            </div>

            <div className="border-l-4 border-yellow-400 pl-4">
              <h4 className="font-semibold text-yellow-700">Primary 6 Term 2 (Skill Development Phase)</h4>
              <ul className="list-disc ml-4 mt-2 space-y-1">
                <li>Complete P6 syllabus coverage</li>
                <li>Begin intensive practice with past year PSLE papers</li>
                <li>Develop time management skills</li>
                <li>Identify and strengthen weak topic areas</li>
                <li>Master calculator techniques</li>
              </ul>
            </div>

            <div className="border-l-4 border-orange-400 pl-4">
              <h4 className="font-semibold text-orange-700">Primary 6 Term 3 to Prelims (Application Phase)</h4>
              <ul className="list-disc ml-4 mt-2 space-y-1">
                <li>Daily practice with PSLE standard questions</li>
                <li>Focus on exam techniques and presentation</li>
                <li>Simulate exam conditions with full paper attempts</li>
                <li>Review and analyze all mistakes systematically</li>
                <li>Prepare for Preliminary Examinations</li>
              </ul>
            </div>

            <div className="border-l-4 border-red-400 pl-4">
              <h4 className="font-semibold text-red-700">Post-Prelims to PSLE (Mastery Phase)</h4>
              <ul className="list-disc ml-4 mt-2 space-y-1">
                <li>Intensive revision based on prelim performance</li>
                <li>Final consolidation of key concepts</li>
                <li>Practice papers under strict timing</li>
                <li>Mental preparation and stress management</li>
                <li>Maintain consistent study routine</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">PSLE Math Topics Mastery Guide</h2>
          
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-700 mb-2">🔢 Numbers and Algebra</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Key Topics:</strong> Whole Numbers, Fractions, Decimals, Percentage, Ratio, Algebra
                </div>
                <div>
                  <strong>Study Strategy:</strong>
                  <ul className="list-disc ml-4 mt-1 space-y-1">
                    <li>Master mental calculation techniques</li>
                    <li>Practice fraction and decimal conversions</li>
                    <li>Learn percentage and ratio problem-solving</li>
                    <li>Understand basic algebraic concepts</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-700 mb-2">📐 Geometry and Measurement</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Key Topics:</strong> Angles, Triangles, Quadrilaterals, Circles, Area, Perimeter, Volume
                </div>
                <div>
                  <strong>Study Strategy:</strong>
                  <ul className="list-disc ml-4 mt-1 space-y-1">
                    <li>Memorize geometric properties</li>
                    <li>Practice drawing accurate diagrams</li>
                    <li>Master area and perimeter calculations</li>
                    <li>Learn to solve complex measurement problems</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-700 mb-2">📊 Statistics and Data Analysis</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Key Topics:</strong> Tables, Graphs, Average, Probability
                </div>
                <div>
                  <strong>Study Strategy:</strong>
                  <ul className="list-disc ml-4 mt-1 space-y-1">
                    <li>Practice reading and interpreting graphs</li>
                    <li>Master average calculations</li>
                    <li>Learn basic probability concepts</li>
                    <li>Practice data analysis questions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">PSLE Math Study Techniques</h2>
          <div className="bg-amber-50 p-5 rounded-lg">
            <h4 className="font-semibold mb-3">Proven PSLE Math Study Methods:</h4>
            <div className="space-y-3 text-sm">
              <div>
                <p><strong>The 5-5-5 Method:</strong></p>
                <p>Practice 5 similar questions, review 5 mistakes from previous sessions, spend 5 minutes on mental math daily.</p>
              </div>
              <div>
                <p><strong>Error Analysis Technique:</strong></p>
                <p>Keep a detailed error log categorizing mistakes (careless, conceptual, or procedural) and review weekly.</p>
              </div>
              <div>
                <p><strong>Visual Learning:</strong></p>
                <p>Use diagrams and models to understand mathematical concepts. Draw pictures for word problems.</p>
              </div>
              <div>
                <p><strong>Step-by-Step Problem Solving:</strong></p>
                <p>Break down complex problems into smaller, manageable steps.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">PSLE Math Exam Strategies</h2>
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-700 mb-2">Paper 1 Strategy:</h4>
              <ul className="list-disc ml-4 space-y-1 text-sm">
                <li>Complete MCQs within 30 minutes</li>
                <li>Show working for short-answer questions</li>
                <li>Double-check calculations</li>
                <li>Use elimination method for difficult MCQs</li>
                <li>Review all answers if time permits</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-700 mb-2">Paper 2 Strategy:</h4>
              <ul className="list-disc ml-4 space-y-1 text-sm">
                <li>Read all questions first</li>
                <li>Start with easier questions</li>
                <li>Show clear working steps</li>
                <li>Use proper mathematical notation</li>
                <li>Check final answers for reasonableness</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Common PSLE Math Mistakes to Avoid</h2>
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-700 mb-3">Top 10 PSLE Math Pitfalls:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <ol className="list-decimal ml-4 space-y-1">
                  <li>Careless calculation errors</li>
                  <li>Misreading question requirements</li>
                  <li>Not showing working steps</li>
                  <li>Incorrect units in answers</li>
                  <li>Poor time management</li>
                </ol>
              </div>
              <div>
                <ol className="list-decimal ml-4 space-y-1" start="6">
                  <li>Incorrect calculator usage</li>
                  <li>Not checking answer reasonableness</li>
                  <li>Confusing similar concepts</li>
                  <li>Incomplete solutions</li>
                  <li>Poor presentation of working</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Creating Your PSLE Math Study Schedule</h2>
          <div className="bg-indigo-50 p-5 rounded-lg">
            <h4 className="font-semibold mb-3">Recommended Weekly Schedule (Primary 6):</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>School Days:</strong></p>
                <ul className="list-disc ml-4 space-y-1">
                  <li>30-45 minutes daily practice</li>
                  <li>Complete homework thoroughly</li>
                  <li>Review class notes</li>
                  <li>Practice mental calculations</li>
                </ul>
              </div>
              <div>
                <p><strong>Weekends:</strong></p>
                <ul className="list-disc ml-4 space-y-1">
                  <li>Complete 1-2 practice papers</li>
                  <li>Review and analyze mistakes</li>
                  <li>Focus on weak topics</li>
                  <li>Prepare summary notes</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Essential PSLE Math Resources</h2>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold">Recommended Textbooks:</h4>
              <ul className="list-disc ml-4 text-sm space-y-1">
                <li>My Pals Are Here! Maths (Marshall Cavendish)</li>
                <li>Shaping Maths (Marshall Cavendish)</li>
                <li>Maths Problem-Solving Strategies (EPH)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Practice Materials:</h4>
              <ul className="list-disc ml-4 text-sm space-y-1">
                <li>PSLE past papers (last 5 years)</li>
                <li>School preliminary examination papers</li>
                <li>Topical practice books</li>
                <li>Online practice platforms (KooBits, MathScore)</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Mental Preparation for PSLE Math</h2>
          <p>
            Mathematical confidence is crucial for PSLE success. Here's how to build it:
          </p>
          <ul className="list-disc ml-6 space-y-2 mt-3">
            <li><strong>Build Number Sense:</strong> Practice mental calculations daily</li>
            <li><strong>Embrace Mistakes:</strong> Learn from errors and improve</li>
            <li><strong>Practice Under Pressure:</strong> Simulate exam conditions regularly</li>
            <li><strong>Stay Positive:</strong> Maintain a growth mindset</li>
            <li><strong>Take Breaks:</strong> Rest and recharge between study sessions</li>
            <li><strong>Seek Help:</strong> Don't hesitate to ask questions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">When to Consider PSLE Math Tuition</h2>
          <p>Consider professional PSLE Math tuition if your child:</p>
          <ul className="list-disc ml-6 space-y-1 mt-3">
            <li>Struggles with mathematical concepts</li>
            <li>Needs help with problem-solving strategies</li>
            <li>Requires structured practice and guidance</li>
            <li>Benefits from personalized attention</li>
            <li>Aims for A* grades</li>
            <li>Needs regular practice supervision</li>
          </ul>
          <div className="bg-blue-50 p-4 rounded-lg mt-4">
            <p><strong>Choose PSLE Math tutors who:</strong> Have extensive experience with the PSLE syllabus, understand common student misconceptions, can teach both conceptual understanding and exam techniques, and provide structured practice programs.</p>
          </div>
        </section>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">Request a PSLE Math Tutor</h3>
          <p className="mb-4">Fill out the form below to get matched with an experienced PSLE Math tutor who can help your child achieve their A* goals.</p>
          
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
                    placeholder="e.g. P6 Math"
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
                  {status.submitting ? 'Submitting...' : 'Request PSLE Math Tutor'}
                </button>
              </form>
            </>
          )}
        </div>
      </article>
    </main>
    </>
  );
}
