"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Info } from 'lucide-react';


export default function PSLEEnglish() {
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


      <h1 className="text-3xl font-bold text-blue-800 mb-4">PSLE English Guide 2025: Master Primary School English</h1>
      <p className="text-sm text-gray-500 mb-8">Posted on June 14, 2025 • 15 min read</p>

      <article className="space-y-6 text-gray-700 leading-relaxed">
        <p className="text-lg font-medium text-gray-800">
          PSLE English is a crucial subject that tests students' language proficiency across multiple components. With the right preparation strategy, students can achieve excellent results. This comprehensive guide provides proven strategies for PSLE English success in 2025.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Understanding PSLE English Structure</h2>
          <p>
            The PSLE English examination consists of four main components, each testing different aspects of language proficiency.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mt-3">
            <h4 className="font-semibold mb-2">PSLE English Components Breakdown:</h4>
            <div className="space-y-3">
              <div>
                <h5 className="font-semibold text-blue-600">Paper 1: Writing (55 marks, 1 hour 10 minutes)</h5>
                <ul className="list-disc ml-4 space-y-1 text-sm">
                  <li>Situational Writing (15 marks)</li>
                  <li>Continuous Writing (40 marks)</li>
                  <li>Tests writing skills and creativity</li>
                  <li>Focus on language use and organization</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-blue-600">Paper 2: Language Use and Comprehension (95 marks, 1 hour 50 minutes)</h5>
                <ul className="list-disc ml-4 space-y-1 text-sm">
                  <li>Grammar and Vocabulary (10 marks)</li>
                  <li>Grammar Cloze (10 marks)</li>
                  <li>Visual Text Comprehension (8 marks)</li>
                  <li>Comprehension Cloze (15 marks)</li>
                  <li>Comprehension Open-Ended (20 marks)</li>
                  <li>Editing for Spelling and Grammar (12 marks)</li>
                  <li>Synthesis and Transformation (10 marks)</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-blue-600">Paper 3: Listening Comprehension (20 marks, 35 minutes)</h5>
                <ul className="list-disc ml-4 space-y-1 text-sm">
                  <li>Multiple-choice questions</li>
                  <li>Tests listening and comprehension skills</li>
                  <li>Various text types and contexts</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-blue-600">Paper 4: Oral Communication (30 marks, 10 minutes)</h5>
                <ul className="list-disc ml-4 space-y-1 text-sm">
                  <li>Reading Aloud (10 marks)</li>
                  <li>Stimulus-based Conversation (20 marks)</li>
                  <li>Tests pronunciation and communication skills</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">12-Month PSLE English Preparation Timeline</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-green-400 pl-4">
              <h4 className="font-semibold text-green-700">Primary 5 Term 4 to Primary 6 Term 1 (Foundation Phase)</h4>
              <ul className="list-disc ml-4 mt-2 space-y-1">
                <li>Master fundamental grammar rules</li>
                <li>Build vocabulary through reading</li>
                <li>Develop writing skills and techniques</li>
                <li>Practice comprehension strategies</li>
                <li>Work on pronunciation and oral skills</li>
              </ul>
            </div>

            <div className="border-l-4 border-yellow-400 pl-4">
              <h4 className="font-semibold text-yellow-700">Primary 6 Term 2 (Skill Development Phase)</h4>
              <ul className="list-disc ml-4 mt-2 space-y-1">
                <li>Complete P6 syllabus coverage</li>
                <li>Begin intensive practice with past year PSLE papers</li>
                <li>Develop time management skills</li>
                <li>Identify and strengthen weak areas</li>
                <li>Master exam techniques for each component</li>
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
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">PSLE English Components Mastery Guide</h2>
          
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-700 mb-2">✍️ Writing Skills</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Key Areas:</strong> Situational Writing, Continuous Writing, Grammar, Vocabulary
                </div>
                <div>
                  <strong>Study Strategy:</strong>
                  <ul className="list-disc ml-4 mt-1 space-y-1">
                    <li>Practice different text types for situational writing</li>
                    <li>Develop story planning and organization skills</li>
                    <li>Build vocabulary through reading and word lists</li>
                    <li>Master grammar rules and common errors</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-700 mb-2">📖 Comprehension Skills</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Key Areas:</strong> Visual Text, Comprehension Cloze, Open-Ended Questions
                </div>
                <div>
                  <strong>Study Strategy:</strong>
                  <ul className="list-disc ml-4 mt-1 space-y-1">
                    <li>Practice skimming and scanning techniques</li>
                    <li>Develop inference and deduction skills</li>
                    <li>Master vocabulary in context</li>
                    <li>Learn to identify key information</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-700 mb-2">🎤 Oral Communication</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Key Areas:</strong> Reading Aloud, Stimulus-based Conversation
                </div>
                <div>
                  <strong>Study Strategy:</strong>
                  <ul className="list-disc ml-4 mt-1 space-y-1">
                    <li>Practice pronunciation and intonation</li>
                    <li>Develop conversation skills</li>
                    <li>Learn to express opinions clearly</li>
                    <li>Build confidence in speaking</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-700 mb-2">👂 Listening Skills</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Key Areas:</strong> Listening Comprehension, Note-taking
                </div>
                <div>
                  <strong>Study Strategy:</strong>
                  <ul className="list-disc ml-4 mt-1 space-y-1">
                    <li>Practice active listening techniques</li>
                    <li>Develop note-taking skills</li>
                    <li>Learn to identify key information</li>
                    <li>Practice with various audio materials</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">PSLE English Study Techniques</h2>
          <div className="bg-amber-50 p-5 rounded-lg">
            <h4 className="font-semibold mb-3">Proven PSLE English Study Methods:</h4>
            <div className="space-y-3 text-sm">
              <div>
                <p><strong>Reading Strategy:</strong></p>
                <p>Read widely across different genres. Keep a vocabulary journal and practice using new words in sentences.</p>
              </div>
              <div>
                <p><strong>Writing Practice:</strong></p>
                <p>Write regularly, focusing on different text types. Get feedback and revise your work.</p>
              </div>
              <div>
                <p><strong>Grammar Mastery:</strong></p>
                <p>Create grammar rules cards and practice identifying and correcting errors.</p>
              </div>
              <div>
                <p><strong>Oral Practice:</strong></p>
                <p>Record yourself reading and speaking, then review for improvement.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">PSLE English Exam Strategies</h2>
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-700 mb-2">Paper 1 (Writing) Strategy:</h4>
              <ul className="list-disc ml-4 space-y-1 text-sm">
                <li>Plan before writing (5-10 minutes)</li>
                <li>Check format requirements carefully</li>
                <li>Use appropriate language and tone</li>
                <li>Review and edit your work</li>
                <li>Manage time effectively</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-700 mb-2">Paper 2 (Language Use) Strategy:</h4>
              <ul className="list-disc ml-4 space-y-1 text-sm">
                <li>Read questions carefully</li>
                <li>Use elimination method for MCQs</li>
                <li>Show working for synthesis questions</li>
                <li>Check answers for accuracy</li>
                <li>Manage time per section</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-700 mb-2">Paper 3 & 4 (Listening & Oral) Strategy:</h4>
              <ul className="list-disc ml-4 space-y-1 text-sm">
                <li>Listen carefully to instructions</li>
                <li>Take notes during listening</li>
                <li>Speak clearly and confidently</li>
                <li>Use appropriate expressions</li>
                <li>Maintain good eye contact</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Common PSLE English Mistakes to Avoid</h2>
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-700 mb-3">Top 10 PSLE English Pitfalls:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <ol className="list-decimal ml-4 space-y-1">
                  <li>Poor time management</li>
                  <li>Incorrect format in situational writing</li>
                  <li>Weak vocabulary usage</li>
                  <li>Grammar and spelling errors</li>
                  <li>Incomplete comprehension answers</li>
                </ol>
              </div>
              <div>
                <ol className="list-decimal ml-4 space-y-1" start="6">
                  <li>Poor paragraph organization</li>
                  <li>Weak oral presentation skills</li>
                  <li>Inadequate listening skills</li>
                  <li>Lack of supporting details</li>
                  <li>Poor handwriting and presentation</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Creating Your PSLE English Study Schedule</h2>
          <div className="bg-indigo-50 p-5 rounded-lg">
            <h4 className="font-semibold mb-3">Recommended Weekly Schedule (Primary 6):</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>School Days:</strong></p>
                <ul className="list-disc ml-4 space-y-1">
                  <li>30-45 minutes reading practice</li>
                  <li>Complete homework thoroughly</li>
                  <li>Practice writing skills</li>
                  <li>Review grammar rules</li>
                </ul>
              </div>
              <div>
                <p><strong>Weekends:</strong></p>
                <ul className="list-disc ml-4 space-y-1">
                  <li>Complete 1-2 practice papers</li>
                  <li>Review and analyze mistakes</li>
                  <li>Focus on weak areas</li>
                  <li>Practice oral skills</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Essential PSLE English Resources</h2>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold">Recommended Textbooks:</h4>
              <ul className="list-disc ml-4 text-sm space-y-1">
                <li>English Practice Papers (EPH)</li>
                <li>PSLE English Thematic Vocabulary (EPH)</li>
                <li>PSLE English Model Compositions (EPH)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Practice Materials:</h4>
              <ul className="list-disc ml-4 text-sm space-y-1">
                <li>PSLE past papers (last 5 years)</li>
                <li>School preliminary examination papers</li>
                <li>Topical practice books</li>
                <li>Online practice platforms</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Reading Materials:</h4>
              <ul className="list-disc ml-4 text-sm space-y-1">
                <li>Age-appropriate novels and stories</li>
                <li>Newspapers and magazines</li>
                <li>Online articles and blogs</li>
                <li>Educational websites</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Mental Preparation for PSLE English</h2>
          <p>
            Language confidence is crucial for PSLE success. Here's how to build it:
          </p>
          <ul className="list-disc ml-6 space-y-2 mt-3">
            <li><strong>Read Widely:</strong> Develop a love for reading</li>
            <li><strong>Practice Speaking:</strong> Build confidence in communication</li>
            <li><strong>Stay Positive:</strong> Maintain a growth mindset</li>
            <li><strong>Take Breaks:</strong> Rest and recharge between study sessions</li>
            <li><strong>Seek Help:</strong> Don't hesitate to ask questions</li>
            <li><strong>Stay Calm:</strong> Practice relaxation techniques</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">When to Consider PSLE English Tuition</h2>
          <p>Consider professional PSLE English tuition if your child:</p>
          <ul className="list-disc ml-6 space-y-1 mt-3">
            <li>Struggles with language concepts</li>
            <li>Needs help with writing skills</li>
            <li>Requires structured practice and guidance</li>
            <li>Benefits from personalized attention</li>
            <li>Aims for A* grades</li>
            <li>Needs regular practice supervision</li>
          </ul>
          <div className="bg-blue-50 p-4 rounded-lg mt-4">
            <p><strong>Choose PSLE English tutors who:</strong> Have extensive experience with the PSLE syllabus, understand common student misconceptions, can teach both conceptual understanding and exam techniques, and provide structured practice programs.</p>
          </div>
        </section>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">Request a PSLE English Tutor</h3>
          <p className="mb-4">Fill out the form below to get matched with an experienced PSLE English tutor who can help your child achieve their A* goals.</p>
          
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
                    placeholder="e.g. P6 English"
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
                  {status.submitting ? 'Submitting...' : 'Request PSLE English Tutor'}
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
