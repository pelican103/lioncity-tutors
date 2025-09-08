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

export default function PSLEScience() {
  const [currentStep, setCurrentStep] = useState(1);
  const initialFormData = {
    name: '',
    mobile: '',
    level: 'PSLE Science',
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
      <h1 className="text-3xl font-bold text-blue-800 mb-4">PSLE Science Guide 2025: Master Primary School Science</h1>
      <p className="text-sm text-gray-500 mb-8">Posted on June 14, 2025 • 10 min read</p>

      <article className="space-y-6 text-gray-700 leading-relaxed">
        <p className="text-lg font-medium text-gray-800">
          PSLE Science is a crucial subject that tests students' understanding of scientific concepts and their application in real-world scenarios. With a structured approach, students can excel in this subject. This guide provides effective strategies for PSLE Science success in 2025.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Understanding PSLE Science Structure</h2>
          <p>
            The PSLE Science examination consists of a single paper with two booklets, testing knowledge and process skills.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mt-3">
            <h4 className="font-semibold mb-2">PSLE Science Paper Breakdown:</h4>
            <div className="space-y-3">
              <div>
                <h5 className="font-semibold text-blue-600">Booklet A (56 marks, 1 hour 45 minutes total for both booklets)</h5>
                <ul className="list-disc ml-4 space-y-1 text-sm">
                  <li>28 multiple-choice questions (MCQ)</li>
                  <li>Tests knowledge and understanding of scientific concepts</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-blue-600">Booklet B (44 marks)</h5>
                <ul className="list-disc ml-4 space-y-1 text-sm">
                  <li>12-13 open-ended questions</li>
                  <li>Tests application of concepts and scientific process skills</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">12-Month PSLE Science Preparation Timeline</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-green-400 pl-4">
              <h4 className="font-semibold text-green-700">Primary 5 Term 4 to Primary 6 Term 1 (Foundation Phase)</h4>
              <ul className="list-disc ml-4 mt-2 space-y-1">
                <li>Master fundamental concepts from P3-P5</li>
                <li>Build strong scientific vocabulary</li>
                <li>Develop systematic answering techniques</li>
                <li>Focus on understanding key scientific principles</li>
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
                <li>Master scientific process skills</li>
              </ul>
            </div>

            <div className="border-l-4 border-orange-400 pl-4">
              <h4 className="font-semibold text-orange-700">Primary 6 Term 3 to Prelims (Application Phase)</h4>
              <ul className="list-disc ml-4 mt-2 space-y-1">
                <li>Daily practice with PSLE standard questions</li>
                <li>Focus on exam techniques and keyword usage</li>
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
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">PSLE Science Topics Mastery Guide</h2>
          
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-700 mb-2">🔬 Physical Sciences</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Key Topics:</strong> Matter, Heat, Light, Electricity, Forces
                </div>
                <div>
                  <strong>Study Strategy:</strong>
                  <ul className="list-disc ml-4 mt-1 space-y-1">
                    <li>Conduct hands-on experiments to understand concepts</li>
                    <li>Use diagrams and models to visualize abstract ideas</li>
                    <li>Practice calculations for topics like electricity and forces</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-700 mb-2">🌿 Life Sciences</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Key Topics:</strong> Living Things, Plants, Animals, Human Body, Ecosystems
                </div>
                <div>
                  <strong>Study Strategy:</strong>
                  <ul className="list-disc ml-4 mt-1 space-y-1">
                    <li>Use mind maps to connect different life science concepts</li>
                    <li>Memorize key biological terms and definitions</li>
                    <li>Relate concepts to everyday life and the environment</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">PSLE Science Study Techniques</h2>
          <div className="bg-amber-50 p-5 rounded-lg">
            <h4 className="font-semibold mb-3">Proven PSLE Science Study Methods:</h4>
            <div className="space-y-3 text-sm">
              <div>
                <p><strong>Concept Mapping:</strong></p>
                <p>Create visual diagrams to link different scientific concepts and see the bigger picture.</p>
              </div>
              <div>
                <p><strong>Keyword Identification:</strong></p>
                <p>Practice identifying and using scientific keywords accurately in open-ended answers.</p>
              </div>
              <div>
                <p><strong>CER Framework:</strong></p>
                <p>Structure answers using the Claim-Evidence-Reasoning (CER) framework to ensure completeness.</p>
              </div>
              <div>
                <p><strong>Practical Application:</strong></p>
                <p>Relate scientific concepts to real-world examples and everyday phenomena.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">PSLE Science Exam Strategies</h2>
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-700 mb-2">Booklet A (MCQ) Strategy:</h4>
              <ul className="list-disc ml-4 space-y-1 text-sm">
                <li>Read questions carefully and highlight keywords</li>
                <li>Use the elimination method to narrow down options</li>
                <li>Review all answers if time permits</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-700 mb-2">Booklet B (Open-Ended) Strategy:</h4>
              <ul className="list-disc ml-4 space-y-1 text-sm">
                <li>Analyze diagrams and graphs carefully</li>
                <li>Structure answers logically and use scientific terms</li>
                <li>Provide complete and specific explanations</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Common PSLE Science Mistakes to Avoid</h2>
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-semibold text-red-700 mb-3">Top 10 PSLE Science Pitfalls:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <ol className="list-decimal ml-4 space-y-1">
                  <li>Misinterpreting questions</li>
                  <li>Incomplete or vague answers</li>
                  <li>Incorrect use of scientific keywords</li>
                  <li>Not linking answers back to the question</li>
                  <li>Poor time management</li>
                </ol>
              </div>
              <div>
                <ol className="list-decimal ml-4 space-y-1" start="6">
                  <li>Conceptual errors</li>
                  <li>Ignoring data from tables or graphs</li>
                  <li>Making assumptions without evidence</li>
                  <li>Poor handwriting and presentation</li>
                  <li>Leaving questions blank</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Creating Your PSLE Science Study Schedule</h2>
          <div className="bg-indigo-50 p-5 rounded-lg">
            <h4 className="font-semibold mb-3">Recommended Weekly Schedule (Primary 6):</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>School Days:</strong></p>
                <ul className="list-disc ml-4 space-y-1">
                  <li>30-45 minutes daily practice</li>
                  <li>Complete homework thoroughly</li>
                  <li>Review class notes and create concept maps</li>
                </ul>
              </div>
              <div>
                <p><strong>Weekends:</strong></p>
                <ul className="list-disc ml-4 space-y-1">
                  <li>Complete 1-2 practice papers</li>
                  <li>Review and analyze mistakes</li>
                  <li>Focus on weak topics</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Essential PSLE Science Resources</h2>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold">Recommended Textbooks:</h4>
              <ul className="list-disc ml-4 text-sm space-y-1">
                <li>My Pals Are Here! Science (Marshall Cavendish)</li>
                <li>PSLE Science Revision Guide (EPH)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Practice Materials:</h4>
              <ul className="list-disc ml-4 text-sm space-y-1">
                <li>PSLE past papers (last 5 years)</li>
                <li>School preliminary examination papers</li>
                <li>Topical practice books</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">Mental Preparation for PSLE Science</h2>
          <p>
            A curious and analytical mindset is key for PSLE Science success. Here's how to cultivate it:
          </p>
          <ul className="list-disc ml-6 space-y-2 mt-3">
            <li><strong>Stay Curious:</strong> Ask questions about the world around you</li>
            <li><strong>Think Critically:</strong> Analyze information and draw logical conclusions</li>
            <li><strong>Embrace Challenges:</strong> View difficult questions as learning opportunities</li>
            <li><strong>Stay Organized:</strong> Keep notes and study materials well-organized</li>
            <li><strong>Take Breaks:</strong> Rest your mind to stay fresh and focused</li>
            <li><strong>Seek Help:</strong> Clarify doubts with teachers or tutors</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">When to Consider PSLE Science Tuition</h2>
          <p>Consider professional PSLE Science tuition if your child:</p>
          <ul className="list-disc ml-6 space-y-1 mt-3">
            <li>Struggles with scientific concepts</li>
            <li>Needs help with answering techniques</li>
            <li>Requires structured practice and guidance</li>
            <li>Benefits from personalized attention</li>
            <li>Aims for A* grades</li>
            <li>Needs regular practice supervision</li>
          </ul>
          <div className="bg-blue-50 p-4 rounded-lg mt-4">
            <p><strong>Choose PSLE Science tutors who:</strong> Have a deep understanding of the PSLE syllabus, can explain complex concepts clearly, and provide effective strategies for tackling exam questions.</p>
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