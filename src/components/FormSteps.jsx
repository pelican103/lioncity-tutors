import React from 'react';
import { Info } from 'lucide-react';

export const Step1 = ({ nextStep, formData, handleChange }) => (
  <div className="space-y-5 animate-fadeIn">
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name<span className="text-red-500">*</span></label>
      <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your name" />
    </div>
    <div>
      <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number<span className="text-red-500">*</span></label>
      <input id="mobile" name="mobile" type="tel" value={formData.mobile} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 91234567" />
    </div>
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email<span className="text-red-500">*</span></label>
      <input id="email" name="email" type="text" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. admin@lioncitytutors.com" />
    </div>
    <div>
      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location<span className="text-red-500">*</span></label>
      <input id="location" name="location" type="text" value={formData.location} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 610123, Bishan, Sengkang" />
    </div>
    <div>
      <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">Student's Level & Subject<span className="text-red-500">*</span></label>
      <input id="level" name="level" type="text" value={formData.level} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Sec 3 A-Math" />
    </div>
    <div>
      <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">Student's School</label>
      <input id="school" name="school" type="text" value={formData.school} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. NJC" />
    </div>
    <button type="button" onClick={nextStep} className="w-full py-3 px-4 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-colors text-lg">
      Next: Schedule & Logistics
    </button>
  </div>
);

// =================================================================
// STEP 2: LOGISTICS & SCHEDULING COMPONENT
// =================================================================
export const Step2 = ({ nextStep, prevStep, formData, handleChange }) => (
  <div className="space-y-5 animate-fadeIn">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <label htmlFor="lessonDuration" className="block text-sm font-medium text-gray-700 mb-1">Lesson Duration<span className="text-red-500">*</span></label>
        <select id="lessonDuration" name="lessonDuration" value={formData.lessonDuration} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="1.5 Hours">1.5 Hours</option>
          <option value="2 Hours">2 Hours</option>
          <option value="Others">Others</option>
        </select>
        {formData.lessonDuration === "Others" && (
          <input type="text" name="customDuration" value={formData.customDuration} onChange={handleChange} placeholder="Please specify" className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        )}
      </div>
      <div>
        <label htmlFor="lessonFrequency" className="block text-sm font-medium text-gray-700 mb-1">Lesson Frequency<span className="text-red-500">*</span></label>
        <select id="lessonFrequency" name="lessonFrequency" value={formData.lessonFrequency} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="1 Lesson/Week">1 Lesson/Week</option>
          <option value="2 Lessons/Week">2 Lessons/Week</option>
          <option value="Others">Others</option>
        </select>
        {formData.lessonFrequency === "Others" && (
          <input type="text" name="customFrequency" value={formData.customFrequency} onChange={handleChange} placeholder="Please specify" className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        )}
      </div>
    </div>
    <div>
      <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-1">Preferred Days/Time<span className="text-red-500">*</span></label>
      <input id="preferredTime" name="preferredTime" type="text" value={formData.preferredTime} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Weekday evenings, Saturday afternoon" />
    </div>
    <div className="flex flex-col-reverse sm:flex-row gap-4">
      <button type="button" onClick={prevStep} className="w-full py-3 px-4 rounded-lg text-gray-700 font-semibold bg-gray-200 hover:bg-gray-300 transition-colors text-lg">Back</button>
      <button type="button" onClick={nextStep} className="w-full py-3 px-4 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-colors text-lg">Next: Tutor Preferences</button>
    </div>
  </div>
);

// =================================================================
// STEP 3: PREFERENCES & SUBMISSION COMPONENT
// =================================================================
export const Step3 = ({ prevStep, formData, handleChange, handleCheckboxChange, status }) => (
    // Note: The form submission is handled by the parent component's <form> tag
    <div className="space-y-5 animate-fadeIn">
        {/* Tutor Type Checkboxes */}
        <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
            <h3 className="font-semibold text-lg mb-3">Tutor Type</h3>
            <div className="space-y-3">
                <div className="flex items-center">
                    <input type="checkbox" id="tutorType.partTime" name="tutorType.partTime" checked={formData.tutorType.partTime} onChange={handleCheckboxChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <label htmlFor="tutorType.partTime" className="ml-2 block text-gray-700"><span className="font-bold">Part-Time Tutors</span> <span className="font-bold">$25-$35/Hour</span></label>
                    <div className="relative group ml-2"><Info size={16} className="text-blue-600 cursor-pointer" />
                        <div className="absolute hidden group-hover:block bg-white border border-gray-200 p-3 rounded shadow-lg z-10 w-72 -translate-x-1/2 left-1/2 mt-1"><p className="font-medium text-gray-800 mb-2">Part-Time Tutors:</p><ul className="text-sm text-gray-600 space-y-1 list-disc pl-4"><li>Mostly University Undergraduates</li><li>Pursuing Tutoring As A Part-Time Career</li><li>1-3 Years of Tutoring Experience</li><li>Young & Vibrant (Average Age of 20+)</li><li>Small Age Gap With Students, Able To Relate Well</li><li>Scored Good Grades During Schooling Days (A*, A1)</li><li>Most Budget Friendly Option</li></ul></div>
                    </div>
                </div>
                <div className="flex items-center">
                    <input type="checkbox" id="tutorType.fullTime" name="tutorType.fullTime" checked={formData.tutorType.fullTime} onChange={handleCheckboxChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <label htmlFor="tutorType.fullTime" className="ml-2 block text-gray-700"><span className="font-bold">Full-Time Tutors</span> <span className="font-bold">$35-$45/Hour</span></label>
                    <div className="relative group ml-2"><Info size={16} className="text-blue-600 cursor-pointer" />
                        <div className="absolute hidden group-hover:block bg-white border border-gray-200 p-3 rounded shadow-lg z-10 w-72 -translate-x-1/2 left-1/2 mt-1"><p className="font-medium text-gray-800 mb-2">Full-Time Tutors:</p><ul className="text-sm text-gray-600 space-y-1 list-disc pl-4"><li>Mostly University Graduates</li><li>Pursuing Tutoring As A Full-Time Career</li><li>At Least 5 Years of Tutoring Experience</li><li>Professional & Responsible</li><li>Able To Recommend/Provide Learning Materials</li><li>Large Pool of Students, Often Teaching Students of Same Level</li><li>Able To Cope With Students of All Ages & Abilities</li><li>Highest Level of Commitment</li><li>Reasonable Tuition Rates</li></ul></div>
                    </div>
                </div>
                <div className="flex items-center">
                    <input type="checkbox" id="tutorType.moeTeacher" name="tutorType.moeTeacher" checked={formData.tutorType.moeTeacher} onChange={handleCheckboxChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <label htmlFor="tutorType.moeTeacher" className="ml-2 block text-gray-700"><span className="font-bold">Ex/Current MOE Teachers</span> <span className="font-bold">$50-$70/Hour</span></label>
                    <div className="relative group ml-2"><Info size={16} className="text-blue-600" />
                        <div className="absolute hidden group-hover:block bg-white border border-gray-200 p-3 rounded shadow-lg z-10 w-72 -translate-x-1/2 left-1/2 mt-1"><p className="font-medium text-gray-800 mb-2">Ex/Current MOE Teachers:</p><ul className="text-sm text-gray-600 space-y-1 list-disc pl-4"><li>MOE & NIE Trained School Teachers</li><li>Highly Familiar with MOE Syllabus</li><li>National Exam Markers (PSLE, O/N/A Levels, IBDP)</li><li>In-Depth & Well-Versed Teaching Pedagogy</li><li>Able To Access/Provide Special Learning Materials</li><li>Highly Experienced with All Types of Students</li><li>Most Qualified Tutor Option</li></ul></div>
                    </div>
                </div>
            </div>
        </div>

        {/* --- REFACTORED: Simplified Budget Section --- */}
        <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
            <h3 className="font-semibold text-lg mb-3">Tutor Budget</h3>
            <div className="space-y-3">
                <div className="flex items-center">
                    <input type="radio" id="budgetMarketRate" name="budget.type" value="marketRate" checked={formData.budget.type === 'marketRate'} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <label htmlFor="budgetMarketRate" className="ml-3 block text-gray-700">I'm comfortable with the market rates above</label>
                </div>
                <div className="flex items-center">
                    <input type="radio" id="budgetCustom" name="budget.type" value="custom" checked={formData.budget.type === 'custom'} onChange={handleChange} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                    <label htmlFor="budgetCustom" className="ml-3 block text-gray-700">I have a preferred budget</label>
                </div>
                {formData.budget.type === 'custom' && (
                    <div className="mt-2 ml-7">
                        <input type="text" name="budget.customAmount" value={formData.budget.customAmount} onChange={handleChange} placeholder="Your budget per hour (e.g., $40)" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                )}
            </div>
        </div>

        {/* Other Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
                <label htmlFor="genderPreference" className="block text-sm font-medium text-gray-700 mb-1">Gender Preference<span className="text-red-500">*</span></label>
                <select id="genderPreference" name="genderPreference" value={formData.genderPreference} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="No preference">No preference</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <div>
                <label htmlFor="bilingualRequired" className="block text-sm font-medium text-gray-700 mb-1">Is a Bilingual Tutor Required?<span className="text-red-500">*</span></label>
                <select id="bilingualRequired" name="bilingualRequired" value={formData.bilingualRequired} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
            </div>
        </div>
        <div>
            <label htmlFor="preferences" className="block text-sm font-medium text-gray-700 mb-1">Other Preferences or Questions</label>
            <textarea id="preferences" name="preferences" value={formData.preferences} onChange={handleChange} rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Any specific tutor requirements or questions?" />
        </div>

        {/* Navigation and Submission Buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-4 pt-4">
            <button type="button" onClick={prevStep} className="w-full py-3 px-4 rounded-lg text-gray-700 font-semibold bg-gray-200 hover:bg-gray-300 transition-colors text-lg">Back</button>
            <button type="submit" disabled={status.submitting} className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors text-lg ${status.submitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
                {status.submitting ? 'Submitting...' : 'Submit Request'}
            </button>
        </div>
    </div>
);