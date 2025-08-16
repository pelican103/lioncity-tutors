"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Info } from 'lucide-react';
import { Step1, Step2, Step3 } from "@/components/FormSteps";


export default function PSLEChinese() {
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
    <main className="px-4 py-12 max-w-3xl mx-auto">


      <h1 className="text-3xl font-bold text-blue-800 mb-4">PSLE Chinese Guide 2025: Master Primary School Chinese</h1>
      <p className="text-sm text-gray-500 mb-8">Posted on June 14, 2025 • 15 min read</p>

      <article className="space-y-6 text-gray-700 leading-relaxed">
        <p className="text-lg font-medium text-gray-800">
          PSLE Chinese is a crucial subject that tests students' proficiency in reading, writing, listening, and speaking Chinese. With the right preparation strategy, students can achieve excellent results. This comprehensive guide provides proven strategies for PSLE Chinese success in 2025.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Understanding PSLE Chinese Structure</h2>
          <p>
            The PSLE Chinese examination consists of four main components, each testing different aspects of language proficiency.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mt-3">
            <h4 className="font-semibold mb-2">PSLE Chinese Components Breakdown:</h4>
            <div className="space-y-3">
              <div>
                <h5 className="font-semibold text-blue-600">Paper 1: Composition (40 marks, 50 minutes)</h5>
                <ul className="list-disc ml-4 space-y-1 text-sm">
                  <li>Picture Composition (看图作文)</li>
                  <li>Tests writing skills and creativity</li>
                  <li>Focus on language use and organization</li>
                  <li>Requires good vocabulary and grammar</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-blue-600">Paper 2: Language Use and Comprehension (60 marks, 1 hour 40 minutes)</h5>
                <ul className="list-disc ml-4 space-y-1 text-sm">
                  <li>Vocabulary and Grammar (词语和语法)</li>
                  <li>Comprehension Cloze (阅读理解填充)</li>
                  <li>Comprehension MCQ (理解问答)</li>
                  <li>Comprehension Open-Ended (理解问答)</li>
                  <li>Editing (改错)</li>
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
                <h5 className="font-semibold text-blue-600">Paper 4: Oral Communication (40 marks, 10 minutes)</h5>
                <ul className="list-disc ml-4 space-y-1 text-sm">
                  <li>Reading Aloud (朗读)</li>
                  <li>Picture Description (看图说话)</li>
                  <li>Conversation (会话)</li>
                  <li>Tests pronunciation and communication skills</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">12-Month PSLE Chinese Preparation Timeline</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-green-400 pl-4">
              <h4 className="font-semibold text-green-700">Primary 5 Term 4 to Primary 6 Term 1 (Foundation Phase)</h4>
              <ul className="list-disc ml-4 mt-2 space-y-1">
                <li>Master fundamental vocabulary and grammar</li>
                <li>Build character recognition skills</li>
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
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">PSLE Chinese Components Mastery Guide</h2>
          
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-700 mb-2">✍️ Writing Skills (写作技巧)</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Key Areas:</strong> Picture Composition, Vocabulary, Grammar, Sentence Structure
                </div>
                <div>
                  <strong>Study Strategy:</strong>
                  <ul className="list-disc ml-4 mt-1 space-y-1">
                    <li>Practice picture description techniques</li>
                    <li>Develop story planning and organization skills</li>
                    <li>Build vocabulary through reading and word lists</li>
                    <li>Master grammar rules and common errors</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-700 mb-2">📖 Comprehension Skills (理解能力)</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Key Areas:</strong> Reading Comprehension, Cloze Passages, Vocabulary in Context
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
              <h4 className="font-semibold text-purple-700 mb-2">🎤 Oral Communication (口语交际)</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Key Areas:</strong> Reading Aloud, Picture Description, Conversation
                </div>
                <div>
                  <strong>Study Strategy:</strong>
                  <ul className="list-disc ml-4 mt-1 space-y-1">
                    <li>Practice pronunciation and intonation</li>
                    <li>Develop picture description skills</li>
                    <li>Learn to express opinions clearly</li>
                    <li>Build confidence in speaking</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-700 mb-2">👂 Listening Skills (听力理解)</h4>
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
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">PSLE Chinese Study Techniques</h2>
          <div className="bg-amber-50 p-5 rounded-lg">
            <h4 className="font-semibold mb-3">Proven PSLE Chinese Study Methods:</h4>
            <div className="space-y-3 text-sm">
              <div>
                <p><strong>Reading Strategy (阅读策略):</strong></p>
                <p>Read widely across different genres. Keep a vocabulary journal and practice using new words in sentences.</p>
              </div>
              <div>
                <p><strong>Writing Practice (写作练习):</strong></p>
                <p>Write regularly, focusing on different text types. Get feedback and revise your work.</p>
              </div>
              <div>
                <p><strong>Character Recognition (汉字认读):</strong></p>
                <p>Create character cards and practice writing characters regularly. Learn radicals and components.</p>
              </div>
              <div>
                <p><strong>Oral Practice (口语练习):</strong></p>
                <p>Record yourself reading and speaking, then review for improvement.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">PSLE Chinese Exam Strategies</h2>
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-700 mb-2">Paper 1 (Composition) Strategy:</h4>
              <ul className="list-disc ml-4 space-y-1 text-sm">
                <li>Plan before writing (5-10 minutes)</li>
                <li>Analyze picture details carefully</li>
                <li>Use appropriate vocabulary and grammar</li>
                <li>Review and edit your work</li>
                <li>Manage time effectively</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-700 mb-2">Paper 2 (Language Use) Strategy:</h4>
              <ul className="list-disc ml-4 space-y-1 text-sm">
                <li>Read questions carefully</li>
                <li>Use elimination method for MCQs</li>
                <li>Show working for comprehension questions</li>
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
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Common PSLE Chinese Mistakes to Avoid</h2>
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-700 mb-3">Top 10 PSLE Chinese Pitfalls:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <ol className="list-decimal ml-4 space-y-1">
                  <li>Poor time management</li>
                  <li>Incorrect character writing</li>
                  <li>Weak vocabulary usage</li>
                  <li>Grammar and sentence structure errors</li>
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
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Creating Your PSLE Chinese Study Schedule</h2>
          <div className="bg-indigo-50 p-5 rounded-lg">
            <h4 className="font-semibold mb-3">Recommended Weekly Schedule (Primary 6):</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>School Days:</strong></p>
                <ul className="list-disc ml-4 space-y-1">
                  <li>30-45 minutes reading practice</li>
                  <li>Complete homework thoroughly</li>
                  <li>Practice writing skills</li>
                  <li>Review vocabulary and grammar</li>
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
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Essential PSLE Chinese Resources</h2>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold">Recommended Textbooks:</h4>
              <ul className="list-disc ml-4 text-sm space-y-1">
                <li>Chinese Practice Papers (EPH)</li>
                <li>PSLE Chinese Thematic Vocabulary (EPH)</li>
                <li>PSLE Chinese Model Compositions (EPH)</li>
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
                <li>Age-appropriate Chinese storybooks</li>
                <li>Chinese newspapers and magazines</li>
                <li>Online articles and blogs</li>
                <li>Educational websites</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Mental Preparation for PSLE Chinese</h2>
          <p>
            Language confidence is crucial for PSLE success. Here's how to build it:
          </p>
          <ul className="list-disc ml-6 space-y-2 mt-3">
            <li><strong>Read Widely:</strong> Develop a love for Chinese reading</li>
            <li><strong>Practice Speaking:</strong> Build confidence in communication</li>
            <li><strong>Stay Positive:</strong> Maintain a growth mindset</li>
            <li><strong>Take Breaks:</strong> Rest and recharge between study sessions</li>
            <li><strong>Seek Help:</strong> Don't hesitate to ask questions</li>
            <li><strong>Stay Calm:</strong> Practice relaxation techniques</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">When to Consider PSLE Chinese Tuition</h2>
          <p>Consider professional PSLE Chinese tuition if your child:</p>
          <ul className="list-disc ml-6 space-y-1 mt-3">
            <li>Struggles with language concepts</li>
            <li>Needs help with writing skills</li>
            <li>Requires structured practice and guidance</li>
            <li>Benefits from personalized attention</li>
            <li>Aims for A* grades</li>
            <li>Needs regular practice supervision</li>
          </ul>
          <div className="bg-blue-50 p-4 rounded-lg mt-4">
            <p><strong>Choose PSLE Chinese tutors who:</strong> Have extensive experience with the PSLE syllabus, understand common student misconceptions, can teach both conceptual understanding and exam techniques, and provide structured practice programs.</p>
          </div>
        </section>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">Request a PSLE Chinese Tutor</h3>
          <p className="mb-4">Fill out the form below to get matched with an experienced PSLE Chinese tutor who can help your child achieve their A* goals.</p>
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
                  <span className={`text-sm font-medium ${currentStep >= 1 ? 'text-blue-700' : 'text-gray-400'}`}>About You</span>
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
                  handleCheckboxChange={handleCheckboxChange}
                  status={status}
                />
              )}
            </form>
          )}
        </div>
      </article>
    </main>
    </>
  );
}
