"use client";

import React, { useState, useRef } from "react";
import Link from 'next/link';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Step1, Step2, Step3 } from "@/components/FormSteps";
import { CheckCircle } from "lucide-react";

const validateStep = (step, data) => {
    const newErrors = {};

    if (step === 1) {
        if (!data.name.trim()) newErrors.name = "Name is required.";
        if (!data.mobile.trim()) {
            newErrors.mobile = "Mobile number is required.";
        } else if (!/^[689]\d{7}$/.test(data.mobile.trim())) {
            newErrors.mobile = "Please enter a valid 8-digit Singapore mobile number.";
        }
        if (!data.level.trim()) newErrors.level = "Level & Subject are required.";
    }

    if (step === 2) {
        if (!data.location.trim()) newErrors.location = "Location is required.";
    }
    return newErrors;
};

export default function PSLEChinese() {
  const [currentStep, setCurrentStep] = useState(1);
  const initialFormData = {
    name: '',
    mobile: '',
    level: 'PSLE Chinese',
    location: '',
    lessonDuration: '1.5 Hours',
    customDuration: '',
    lessonFrequency: '1 Lesson/Week',
    customFrequency: '',
    preferredTime: '',
    tutorType: {
      partTime: true,
      fullTime: false,
      moeTeacher: false
    },
    budget: {
      type: 'marketRate',
      customAmount: ''
    },
    preferences: ''
  };
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);

  const nextStep = () => {
      const newErrors = validateStep(currentStep, formData);
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
          setCurrentStep(prev => prev + 1);
      }
  };

  const prevStep = () => {
      setErrors({}); // Clear errors when going back
      setCurrentStep(prev => prev - 1);
  };

  const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      const inputValue = type === 'checkbox' ? checked : value;

      // Clear the specific error when the user starts typing
      if (errors[name]) {
          setErrors(prev => ({ ...prev, [name]: null }));
      }

      if (name.includes('.')) {
          const [parent, child] = name.split('.');
          setFormData(prev => ({
              ...prev,
              [parent]: { ...prev[parent], [child]: inputValue }
          }));
      } else {
          setFormData(prev => ({ ...prev, [name]: inputValue }));
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     // Final validation check on all fields before submitting
      const step1Errors = validateStep(1, formData);
      const step2Errors = validateStep(2, formData);
      const allErrors = { ...step1Errors, ...step2Errors }; // Combine errors from all steps

      if (Object.keys(allErrors).length > 0) {
          setErrors(allErrors);
          // If there are errors from Step 1, automatically go back to it
          if (Object.keys(step1Errors).length > 0) {
              setCurrentStep(1);
          } else if (Object.keys(step2Errors).length > 0) {
              setCurrentStep(2);
          }
          return; // Stop submission
      }
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
        setFormData(initialFormData);
        setCurrentStep(1);
        setStatus({ submitting: false, submitted: true, error: null });
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      <p className="text-sm text-gray-500 mb-8">Posted on June 14, 2025 • 12 min read</p>

      <article className="space-y-6 text-gray-700 leading-relaxed">
        <p className="text-lg font-medium text-gray-800">
          PSLE Chinese is a crucial subject that tests students' language proficiency and cultural understanding. With consistent effort and the right strategies, students can excel. This guide provides a comprehensive roadmap for PSLE Chinese success in 2025.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Understanding PSLE Chinese Structure</h2>
          <p>
            The PSLE Chinese examination comprises three papers, each assessing different language skills.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mt-3">
            <h4 className="font-semibold mb-2">PSLE Chinese Papers Breakdown:</h4>
            <div className="space-y-3">
              <div>
                <h5 className="font-semibold text-blue-600">Paper 1: Writing (40 marks, 50 minutes)</h5>
                <ul className="list-disc ml-4 space-y-1 text-sm">
                  <li>Composition writing (choose 1 of 2 topics)</li>
                  <li>Tests writing skills, creativity, and language use</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-blue-600">Paper 2: Language Use and Comprehension (90 marks, 1 hour 40 minutes)</h5>
                <ul className="list-disc ml-4 space-y-1 text-sm">
                  <li>Multiple-choice questions on language use</li>
                  <li>Comprehension passages with various question types</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-blue-600">Paper 3: Oral and Listening Comprehension (70 marks)</h5>
                <ul className="list-disc ml-4 space-y-1 text-sm">
                  <li>Oral: Reading a passage and conversation</li>
                  <li>Listening Comprehension: Answering questions based on audio clips</li>
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
                <li>Strengthen vocabulary and character recognition</li>
                <li>Practice basic sentence structures</li>
                <li>Develop reading habits with Chinese storybooks</li>
                <li>Work on pronunciation and oral expression</li>
              </ul>
            </div>

            <div className="border-l-4 border-yellow-400 pl-4">
              <h4 className="font-semibold text-yellow-700">Primary 6 Term 2 (Skill Development Phase)</h4>
              <ul className="list-disc ml-4 mt-2 space-y-1">
                <li>Complete P6 syllabus coverage</li>
                <li>Begin intensive practice with past year PSLE papers</li>
                <li>Develop time management skills for each paper</li>
                <li>Identify and work on weak areas in grammar and comprehension</li>
              </ul>
            </div>

            <div className="border-l-4 border-orange-400 pl-4">
              <h4 className="font-semibold text-orange-700">Primary 6 Term 3 to Prelims (Application Phase)</h4>
              <ul className="list-disc ml-4 mt-2 space-y-1">
                <li>Daily practice with PSLE standard questions</li>
                <li>Focus on composition writing techniques and oral conversation topics</li>
                <li>Simulate exam conditions with full paper attempts</li>
                <li>Review mistakes and consolidate learning</li>
              </ul>
            </div>

            <div className="border-l-4 border-red-400 pl-4">
              <h4 className="font-semibold text-red-700">Post-Prelims to PSLE (Mastery Phase)</h4>
              <ul className="list-disc ml-4 mt-2 space-y-1">
                <li>Intensive revision based on prelim performance</li>
                <li>Final consolidation of vocabulary and grammar</li>
                <li>Practice oral conversation with a variety of topics</li>
                <li>Mental preparation and stress management</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">PSLE Chinese Components Mastery Guide</h2>
          
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-700 mb-2">✍️ Writing Skills</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Key Areas:</strong> Composition Planning, Vocabulary, Sentence Structure
                </div>
                <div>
                  <strong>Study Strategy:</strong>
                  <ul className="list-disc ml-4 mt-1 space-y-1">
                    <li>Create a bank of good phrases and idioms</li>
                    <li>Practice writing on a variety of topics</li>
                    <li>Learn to structure compositions with a clear beginning, middle, and end</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-700 mb-2">📖 Comprehension Skills</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Key Areas:</strong> Reading Speed, Understanding Passages, Answering Techniques
                </div>
                <div>
                  <strong>Study Strategy:</strong>
                  <ul className="list-disc ml-4 mt-1 space-y-1">
                    <li>Read widely to improve reading speed and comprehension</li>
                    <li>Practice identifying keywords and main ideas in passages</li>
                    <li>Learn how to answer different types of comprehension questions</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-700 mb-2">🎤 Oral and Listening Skills</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Key Areas:</strong> Pronunciation, Fluency, Conversation, Listening for Details
                </div>
                <div>
                  <strong>Study Strategy:</strong>
                  <ul className="list-disc ml-4 mt-1 space-y-1">
                    <li>Read aloud daily to improve pronunciation and fluency</li>
                    <li>Practice conversing in Chinese on various topics</li>
                    <li>Listen to Chinese audio clips and practice note-taking</li>
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
                <p><strong>Flashcards:</strong></p>
                <p>Use flashcards to memorize vocabulary and characters.</p>
              </div>
              <div>
                <p><strong>Mind Maps:</strong></p>
                <p>Create mind maps to organize thoughts for composition writing.</p>
              </div>
              <div>
                <p><strong>Role-Playing:</strong></p>
                <p>Practice oral conversation with a partner or tutor through role-playing.</p>
              </div>
              <div>
                <p><strong>Journaling:</strong></p>
                <p>Keep a daily journal in Chinese to improve writing skills.</p>
              </div>
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
                  <li>Incorrect character writing</li>
                  <li>Grammatical errors</li>
                  <li>Poor composition structure</li>
                  <li>Misinterpreting comprehension questions</li>
                  <li>Poor time management</li>
                </ol>
              </div>
              <div>
                <ol className="list-decimal ml-4 space-y-1" start="6">
                  <li>Inaccurate pronunciation in oral exams</li>
                  <li>Lack of confidence in conversation</li>
                  <li>Not paying attention during listening comprehension</li>
                  <li>Leaving questions blank</li>
                  <li>Poor handwriting</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">When to Consider PSLE Chinese Tuition</h2>
          <p>Consider professional PSLE Chinese tuition if your child:</p>
          <ul className="list-disc ml-6 space-y-1 mt-3">
            <li>Struggles with character recognition and writing</li>
            <li>Has difficulty with grammar and sentence structure</li>
            <li>Needs help with composition writing and oral skills</li>
            <li>Requires structured practice and guidance</li>
            <li>Benefits from personalized attention and a supportive learning environment</li>
          </ul>
          <div className="bg-blue-50 p-4 rounded-lg mt-4">
            <p><strong>Choose PSLE Chinese tutors who:</strong> Are native or near-native speakers, have a deep understanding of the PSLE syllabus, and can make learning Chinese engaging and effective.</p>
          </div>
        </section>

        <section ref={formRef} className="form-section-gradient"> 
          <div className="max-w-4xl mx-auto px-6 py-16 sm:py-24"> 
            <motion.div
              className="form-card-container"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-4xl font-bold text-center text-primary mb-4">
                  Ready to Find The Perfect Tutor?
              </h2>
              <p className="text-center text-text-default/80 mb-10 text-lg">
                  Get matched with qualified tutors in 24 hours. Just fill out the details below.
              </p>
              
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
              <div className="bg-background-card rounded-xl shadow-lg p-8">
                  {status.submitted ? (
                      <div className="text-center py-10">
                          <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
                          <h2 className="text-2xl font-semibold mb-2">Thank you!</h2>
                          <p className="text-text-default/80 mb-4">We'll send you tutor profiles shortly.</p>
                          <Button 
                              className="bg-accent text-text-inverse hover:bg-accent/90" 
                              onClick={() => setStatus({ submitting: false, submitted: false, error: null })}
                          >
                              Submit Another Request
                          </Button>
                      </div>
                  ) : (
                      <form onSubmit={handleSubmit}>
                          <div className="mb-8">
                              <div className="flex justify-between mb-1">
                                  {["Your Details", "Lesson Details", "Tutor Preferences"].map((step, i) => (
                                      <span key={i} className={`text-sm font-medium ${currentStep >= i + 1 ? 'text-primary' : 'text-gray-400'}`}>{step}</span>
                                  ))}
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: `${((currentStep - 1) / 2) * 100}%` }} />
                              </div>
                          </div>
                          {status.error && <div className="bg-red-100 text-red-800 p-4 rounded-md mb-6">{status.error}</div>}
                          
                          {currentStep === 1 && <Step1 nextStep={nextStep} formData={formData} handleChange={handleChange} errors={errors} />}
                          {currentStep === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} formData={formData} handleChange={handleChange} errors={errors} />}
                          {currentStep === 3 && <Step3 prevStep={prevStep} formData={formData} handleChange={handleChange} status={status} errors={errors} />}
                      </form>
                  )}
              </div>
            </motion.div>
          </div>
        </section>
      </article>
    </main>
    </>
  );
}