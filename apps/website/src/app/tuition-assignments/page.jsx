'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

// Import from shared package
import { 
  EDUCATION_LEVELS, 
  SUBJECTS, 
  LEVEL_SUBJECT_MAPPINGS 
} from '@lioncity/shared/client-exports.js';

// --- Enhanced Icons ---
const LocationIcon = () => (
  <svg className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ScheduleIcon = () => (
  <svg className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const FilterIcon = () => (
  <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
  </svg>
);

const NoAssignmentsIcon = () => (
  <div className="mx-auto h-20 w-20 text-gray-300 mb-6">
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  </div>
);

// Enhanced Modal Component - FIXED
const VerificationModal = ({ isOpen, onClose, onSubmit, selectedAssignments, allAssignments }) => {
  const [identifier, setIdentifier] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [appliedAssignments, setAppliedAssignments] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setIdentifier('');
      setIsVerifying(false);
      setError('');
      setIsSuccess(false);
      setAppliedAssignments([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('Please enter your contact number or email.');
      return;
    }
    
    setError('');
    setIsVerifying(true);
    
    try {
      const result = await onSubmit(identifier);
      if (result === 'redirect') {
        onClose();
      } else if (Array.isArray(result)) {
        // Success - show applied assignments
        setAppliedAssignments(result);
        setIsSuccess(true);
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleContinueBrowsing = () => {
    setIsSuccess(false);
    setAppliedAssignments([]);
    onClose();
  };

  const handleApplyMore = () => {
    setIsSuccess(false);
    setAppliedAssignments([]);
    setIdentifier('');
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto">
        <div className="relative bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-t-2xl px-6 py-6">
          <button 
            onClick={handleContinueBrowsing} 
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
            aria-label="Close modal"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="text-center">
            {isSuccess ? (
              <>
                <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h2 id="modal-title" className="text-2xl font-bold">Application Successful!</h2>
              </>
            ) : (
              <>
                <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 id="modal-title" className="text-2xl font-bold">Apply for Tuition Assignments</h2>
              </>
            )}
          </div>
        </div>

        <div className="px-6 pb-6">
          {isSuccess ? (
            <div className="pt-4 space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <p className="text-emerald-800 font-medium mb-2">
                  You've successfully applied for {appliedAssignments.length} assignment{appliedAssignments.length !== 1 ? 's' : ''}!
                </p>
                <p className="text-emerald-700 text-sm">
                  We'll notify you via WhatsApp/email once parents respond to your application.
                </p>
              </div>

              {/* Show applied assignments */}
              <div className="space-y-3 max-h-60 overflow-y-auto">
                <h3 className="font-semibold text-gray-900 text-sm mb-3">Applied Assignments:</h3>
                {appliedAssignments.map((assignment) => (
                  <div key={assignment._id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm truncate">
                          {assignment.title}
                        </h4>
                        <p className="text-xs text-gray-600">
                          {assignment.level} • {assignment.subject}
                        </p>
                        <p className="text-xs text-gray-500">
                          {assignment.location}
                        </p>
                      </div>
                      <div className="text-right ml-3">
                        <span className="text-sm font-bold text-emerald-600">
                          {assignment.rate && assignment.rate !== 'Tutor to propose' ? `$${assignment.rate}/hr` : 'Rate to propose'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleContinueBrowsing} 
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Continue Browsing
                </button>
                
                <button 
                  onClick={handleApplyMore}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-xl transition-all duration-200"
                >
                  Apply for More Assignments
                </button>
              </div>

              {/* Success tips */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <h4 className="font-semibold text-blue-800 text-sm mb-2 flex items-center">
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  What's Next?
                </h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Parents typically respond within 24-48 hours</li>
                  <li>• Check your email and WhatsApp regularly</li>
                  <li>• Prepare your teaching materials in advance</li>
                </ul>
              </div>
            </div>
          ) : (
            <>
              <div className="pt-2 mb-6">
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center mb-2">
                    <svg className="h-5 w-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium text-orange-800">Selected Assignments</span>
                  </div>
                  <p className="text-orange-700 text-sm">
                    You're applying for <span className="font-semibold">{selectedAssignments.length}</span> assignment{selectedAssignments.length !== 1 ? 's' : ''}. Please verify your tutor profile to proceed.
                  </p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="identifier" className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Number or Email
                  </label>
                  <input
                    id="identifier"
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g., 81234567 or yourname@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    aria-describedby={error ? "error-message" : undefined}
                  />
                </div>
                
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4" role="alert" aria-live="polite">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p id="error-message" className="text-sm text-red-700 font-medium">{error}</p>
                    </div>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isVerifying && (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3" aria-hidden="true"></div>
                  )}
                  {isVerifying ? 'Verifying Profile...' : 'Verify & Submit Application'}
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-white text-gray-500">Don't have an account?</span>
                  </div>
                </div>
                <div className="mt-4">
                  <a 
                    href="/register-tutor" 
                    className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors hover:underline"
                  >
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Register as a Tutor
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default function TuitionAssignmentsPage() {
  const router = useRouter();
  
  // --- State Management ---
  const [allAssignments, setAllAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // User selections and filters
  const [selectedAssignments, setSelectedAssignments] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState(new Set());

  const toggleDescription = (assignmentId, e) => {
    e.stopPropagation();
    setExpandedDescriptions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(assignmentId)) {
        newSet.delete(assignmentId);
      } else {
        newSet.add(assignmentId);
      }
      return newSet;
    });
  };

  // --- Main Filtering Logic ---
  const filteredAssignments = useMemo(() => {
    return allAssignments
      .filter(assignment => levelFilter ? assignment.level === levelFilter : true)
      .filter(assignment => subjectFilter ? assignment.subject === subjectFilter : true)
      .filter(assignment => {
        const keyword = searchKeyword.toLowerCase();
        return keyword ? (
          assignment.title.toLowerCase().includes(keyword) ||
          assignment.level.toLowerCase().includes(keyword) ||
          assignment.subject.toLowerCase().includes(keyword) ||
          assignment.location.toLowerCase().includes(keyword)
        ) : true;
      });
  }, [allAssignments, levelFilter, subjectFilter, searchKeyword]);

  const pageTitle = useMemo(() => {
    const count = filteredAssignments.length;
    const level = levelFilter ? ` ${levelFilter}` : '';
    const subject = subjectFilter ? ` ${subjectFilter}` : '';
    return `${count}${level}${subject} Tuition Assignments in Singapore | LionCity Tutors`;
  }, [filteredAssignments.length, levelFilter, subjectFilter]);

  const pageDescription = useMemo(() => {
    const count = allAssignments.length;
    const level = levelFilter ? ` for ${levelFilter}` : '';
    const subject = subjectFilter ? ` ${subjectFilter}` : '';
    return `Find ${count}+ verified${subject} tuition assignments${level} in Singapore. Apply instantly for home tutoring jobs. Competitive rates, flexible schedules. Join LionCity Tutors today.`;
  }, [allAssignments.length, levelFilter, subjectFilter]);

  // --- Data Fetching ---
  useEffect(() => {
    document.title = pageTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', pageDescription);
    }

    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
        const response = await fetch(`${backendUrl}/api/assignments`, {
          headers: {
            'Cache-Control': 'max-age=300', // 5 minutes cache
          }
        });
        if (!response.ok) throw new Error(`Failed to load assignments: ${response.statusText}`);
        const data = await response.json();
        setAllAssignments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching assignments:', err);
        setError(err.message);
        setAllAssignments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, [pageTitle, pageDescription]);

  // --- Dynamic Subject Filtering ---
  const availableSubjects = useMemo(() => {
    if (!levelFilter || !LEVEL_SUBJECT_MAPPINGS[levelFilter]) return SUBJECTS;
    const levelSubjects = LEVEL_SUBJECT_MAPPINGS[levelFilter];
    const specialCategories = ['Multiple Subjects', 'All Subjects', 'Exam Preparation', 'Homework Support', 'Other'];
    return [...levelSubjects, ...specialCategories];
  }, [levelFilter]);

  useEffect(() => {
    if (levelFilter && subjectFilter && !availableSubjects.includes(subjectFilter)) {
      setSubjectFilter('');
    }
  }, [levelFilter, availableSubjects, subjectFilter]);

  // --- Event Handlers ---
  const handleAssignmentSelect = (assignmentId) => {
    setSelectedAssignments(prev => 
      prev.includes(assignmentId) 
        ? prev.filter(id => id !== assignmentId) 
        : [...prev, assignmentId]
    );
  };

  const handleSelectAll = () => {
    setSelectedAssignments(
      selectedAssignments.length === filteredAssignments.length 
        ? [] 
        : filteredAssignments.map(a => a._id)
    );
  };

  const handleApplyClick = () => {
    if (selectedAssignments.length > 0) {
      setShowModal(true);
    }
  };

  const handleVerifyAndSubmit = async (identifier) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

    try {
      // Step 1: Verify tutor
      const verifyResponse = await fetch(`${backendUrl}/api/tutors/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier }),
      });

      if (!verifyResponse.ok) {
        throw new Error('Verification failed. Please check your contact details and try again.');
      }

      const verificationData = await verifyResponse.json();

      // Step 2: Handle verification result
      if (verificationData.exists) {
        // Tutor exists, proceed to apply
        const applyResponse = await fetch(`${backendUrl}/api/assignments/apply`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            assignmentIds: selectedAssignments,
            tutorId: verificationData.tutor.id,
          }),
        });

        if (!applyResponse.ok) {
          throw new Error('Could not submit application. Please try again later.');
        }

        // Get the applied assignments data
        const appliedAssignmentsData = allAssignments.filter(assignment => 
          selectedAssignments.includes(assignment._id)
        );
        
        // Clear selections after successful application
        setSelectedAssignments([]);
        
        // Return the applied assignments to show in success screen
        return appliedAssignmentsData;
      } else {
        // Tutor does not exist, redirect to registration
        alert('No tutor profile found. You will be redirected to the registration page. If you have registered before, please use the same contact number or email.');
        router.push('/register-tutor');
        return 'redirect';
      }
    } catch (error) {
      console.error('Application error:', error);
      throw error;
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const resetFilters = () => {
    setLevelFilter('');
    setSubjectFilter('');
    setSearchKeyword('');
  };

  // --- Helper Functions ---
  const getAssignmentId = (id) => `#${id.slice(-6)}`;
  const formatRate = (rate) => !rate || rate === 'Tutor to propose' ? rate : `$${rate}/hr`;

  // --- Render Logic ---
  if (loading) {
    return (
      <>
        <Head>
          <title>Loading Tuition Assignments | LionCity Tutors</title>
          <meta name="description" content="Loading available tuition assignments in Singapore..." />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50 flex items-center justify-center">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-teal-200 border-t-teal-600 mx-auto mb-6"></div>
            </div>
            <p className="text-lg text-gray-700 font-medium">Loading tuition assignments...</p>
            <p className="text-sm text-gray-500 mt-2">Finding the perfect opportunities for you</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Error Loading Assignments | LionCity Tutors</title>
          <meta name="description" content="There was an error loading tuition assignments. Please try again." />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-pink-50 flex items-center justify-center">
          <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">Unable to Load Assignments</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`tuition assignments Singapore, tutoring jobs${levelFilter ? ` ${levelFilter}` : ''}${subjectFilter ? ` ${subjectFilter}` : ''}, private tutor opportunities, home tutoring, education jobs Singapore`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://lioncitytutors.com/assignments${levelFilter || subjectFilter ? `?level=${levelFilter}&subject=${subjectFilter}` : ''}`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://lioncitytutors.com/assignments${levelFilter || subjectFilter ? `?level=${levelFilter}&subject=${subjectFilter}` : ''}`} />
        
        {/* Enhanced SEO Meta Tags */}
        <meta name="geo.region" content="SG" />
        <meta name="geo.country" content="Singapore" />
        <meta name="language" content="en-SG" />
        <meta name="author" content="LionCity Tutors" />
        <meta name="publisher" content="LionCity Tutors" />
        
        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            "title": `Tuition Assignments in Singapore - ${filteredAssignments.length} Opportunities`,
            "description": pageDescription,
            "hiringOrganization": {
              "@type": "Organization",
              "name": "LionCity Tutors",
              "url": "https://lioncitytutors.com"
            },
            "jobLocation": {
              "@type": "Place",
              "addressCountry": "SG",
              "addressRegion": "Singapore"
            },
            "employmentType": "PART_TIME",
            "workHours": "Flexible",
            "baseSalary": {
              "@type": "MonetaryAmount",
              "currency": "SGD",
              "value": {
                "@type": "QuantitativeValue",
                "minValue": 20,
                "maxValue": 100,
                "unitText": "HOUR"
              }
            }
          })}
        </script>
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Enhanced Header with SEO optimization */}
          <header className="mb-8 text-center">
            <div className="mb-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                {levelFilter || subjectFilter ? (
                  <>Find {levelFilter} {subjectFilter} Tuition Assignments in Singapore</>
                ) : (
                  <>Available Tuition Assignments in Singapore</>
                )}
              </h1>
              
              {/* Breadcrumb for SEO */}
              <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <li><a href="/" className="hover:text-teal-600 transition-colors">Home</a></li>
                  <li><span className="mx-2">/</span></li>
                  <li><span className="text-gray-700 font-medium">Tuition Assignments</span></li>
                  {(levelFilter || subjectFilter) && (
                    <>
                      <li><span className="mx-2">/</span></li>
                      <li><span className="text-teal-600 font-medium">{levelFilter} {subjectFilter}</span></li>
                    </>
                  )}
                </ol>
              </nav>
            </div>
            
            <div className="flex items-center justify-center space-x-2 text-gray-600 mb-4">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-lg font-medium">{filteredAssignments.length}</span>
                <span>of</span>
                <span className="text-lg font-medium">{allAssignments.length}</span>
                <span>verified assignments available</span>
              </div>
            </div>
            
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {levelFilter || subjectFilter ? (
                <>Specialized {levelFilter} {subjectFilter} tutoring opportunities across Singapore. </>
              ) : (
                <>Browse premium tutoring opportunities across Singapore. </>
              )}
              Find assignments that match your expertise with competitive rates and flexible schedules.
            </p>
            
            {/* Trust indicators */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center">
                <svg className="h-4 w-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified Assignments
              </div>
              <div className="flex items-center">
                <svg className="h-4 w-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                Instant Application
              </div>
              <div className="flex items-center">
                <svg className="h-4 w-4 mr-1 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Trusted Platform
              </div>
            </div>
          </header>

          {/* Enhanced Filtering Section */}
          <section className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 mb-8" aria-labelledby="filters-heading">
            <div className="flex items-center mb-6">
              <FilterIcon />
              <h2 id="filters-heading" className="text-lg font-semibold text-gray-800">Filter Assignments</h2>
              {(levelFilter || subjectFilter || searchKeyword) && (
                <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                  {[levelFilter, subjectFilter, searchKeyword].filter(Boolean).length} active
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Level Filter */}
              <div>
                <label htmlFor="level-filter" className="block text-sm font-semibold text-gray-700 mb-2">Education Level</label>
                <select 
                  id="level-filter"
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors bg-white"
                >
                  <option value="">All Levels</option>
                  {EDUCATION_LEVELS.map(level => {
                    const count = allAssignments.filter(a => a.level === level).length;
                    return (
                      <option key={level} value={level}>{level}</option>
                    );
                  })}
                </select>
              </div>

              {/* Subject Filter */}
              <div>
                <label htmlFor="subject-filter" className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject {levelFilter && (
                    <span className="text-teal-600 text-xs">({levelFilter})</span>
                  )}
                </label>
                <select
                  id="subject-filter"
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors bg-white"
                >
                  <option value="">All Subjects</option>
                  {availableSubjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              {/* Keyword Search */}
              <div className="md:col-span-2">
                <label htmlFor="search-input" className="block text-sm font-semibold text-gray-700 mb-2">Search Keywords</label>
                <div className="relative">
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Search by title, location, level, or subject..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors bg-white"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <SearchIcon />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Filter Status & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2" role="group" aria-label="Active filters">
                {levelFilter && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                    Level: {levelFilter}
                    <button 
                      onClick={() => setLevelFilter('')}
                      className="ml-2 text-blue-600 hover:text-blue-800 text-lg leading-none"
                      aria-label={`Remove ${levelFilter} level filter`}
                    >
                      ×
                    </button>
                  </span>
                )}
                {subjectFilter && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Subject: {subjectFilter}
                    <button 
                      onClick={() => setSubjectFilter('')}
                      className="ml-2 text-emerald-600 hover:text-emerald-800 text-lg leading-none"
                      aria-label={`Remove ${subjectFilter} subject filter`}
                    >
                      ×
                    </button>
                  </span>
                )}
                {searchKeyword && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 border border-purple-200">
                    Search: "{searchKeyword}"
                    <button 
                      onClick={() => setSearchKeyword('')}
                      className="ml-2 text-purple-600 hover:text-purple-800 text-lg leading-none"
                      aria-label="Clear search keyword"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
              
              <div className="flex gap-3">
                {(levelFilter || subjectFilter || searchKeyword) && (
                  <button 
                    onClick={resetFilters} 
                    className="text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors flex items-center"
                  >
                    <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                    Clear All Filters
                  </button>
                )}
                {filteredAssignments.length > 0 && (
                  <button 
                    onClick={handleSelectAll}
                    className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors flex items-center"
                  >
                    <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                    {selectedAssignments.length === filteredAssignments.length ? 'Deselect All' : 'Select All'}
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Enhanced Assignments List */}
          <section className="space-y-6 mb-32" aria-labelledby="assignments-heading">
            <div className="flex items-center justify-between mb-4">
              <h2 id="assignments-heading" className="text-2xl font-bold text-gray-900">
                {levelFilter || subjectFilter ? 'Filtered Results' : 'All Assignments'}
              </h2>
              
              {filteredAssignments.length > 0 && (
                <div className="text-sm text-gray-500">
                  Showing {filteredAssignments.length} assignment{filteredAssignments.length !== 1 ? 's' : ''}
                </div>
              )}
            </div>
            
            {filteredAssignments.length > 0 ? (
              <div role="list" className="space-y-4">
                {filteredAssignments.map((assignment, index) => {
                  const isSelected = selectedAssignments.includes(assignment._id);
                  const isNew = new Date() - new Date(assignment.createdAt) < 7 * 24 * 60 * 60 * 1000;
                  
                  return (
                    <article 
                      key={assignment._id}
                      role="listitem"
                      className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-[1.01] ${
                        isSelected 
                          ? 'border-teal-300 bg-gradient-to-r from-teal-50 to-emerald-50 shadow-teal-100' 
                          : 'border-gray-200 hover:border-teal-200'
                      }`}
                      onClick={() => handleAssignmentSelect(assignment._id)}
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: 'slideInUp 0.5s ease-out forwards'
                      }}
                    >
                      {/* Selection Indicator */}
                      <div className={`absolute -left-1 top-6 bottom-6 w-1 rounded-full transition-all duration-300 ${
                        isSelected ? 'bg-gradient-to-b from-teal-400 to-emerald-400' : 'bg-transparent'
                      }`} />
                      
                      {/* Priority Badge for new assignments */}
                      {isNew && (
                        <div className="absolute -top-2 -right-2 z-10">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg animate-pulse">
                            NEW
                          </span>
                        </div>
                      )}
                      
                      <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                        {/* Enhanced Checkbox - Mobile friendly */}
                        <div className="flex items-start space-x-3 sm:block sm:space-x-0">
                          <div className="relative mt-1 flex-shrink-0">
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={isSelected}
                              onChange={() => handleAssignmentSelect(assignment._id)}
                              onClick={(e) => e.stopPropagation()}
                              aria-labelledby={`assignment-title-${assignment._id}`}
                            />
                            <div className={`h-6 w-6 border-2 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center ${
                              isSelected 
                                ? 'bg-teal-600 border-teal-600 scale-110' 
                                : 'border-gray-300 hover:border-teal-500 hover:scale-105'
                            }`}>
                              {isSelected && (
                                <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                          </div>

                          {/* Mobile: Assignment ID Badge inline with checkbox */}
                          <div className="sm:hidden">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-400 to-red-400 text-white shadow-sm">
                              {getAssignmentId(assignment._id)}
                            </span>
                          </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 min-w-0">
                          {/* Mobile Layout */}
                          <div className="sm:hidden space-y-3">
                            {/* Title - Expandable on mobile */}
                            <div>
                              <h3 id={`assignment-title-${assignment._id}`} className="text-lg font-bold text-gray-900 group-hover:text-teal-700 transition-colors">
                                {assignment.title}
                              </h3>
                            </div>
                            
                            {/* Rate - Prominent on mobile */}
                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-1">
                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                                  {assignment.level}
                                </span>
                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
                                  {assignment.subject}
                                </span>
                              </div>
                              <div className="text-right">
                                <div className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                  {formatRate(assignment.rate)}
                                </div>
                              </div>
                            </div>

                            {/* Location & Schedule - Compact */}
                            <div className="space-y-2">
                              <div className="flex items-center text-sm text-gray-600">
                                <LocationIcon />
                                <span className="truncate">{assignment.location}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <ScheduleIcon />
                                <span className="truncate">{assignment.frequency}</span>
                              </div>
                            </div>

                            {/* Description - Show more/less functionality */}
                            {assignment.description && (
                              <div className="p-3 bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg border border-gray-100">
                                <p className="text-sm text-gray-700 leading-relaxed">
                                  {expandedDescriptions.has(assignment._id) ? (
                                    <>
                                      {assignment.description}
                                      <button 
                                        onClick={(e) => toggleDescription(assignment._id, e)}
                                        className="text-teal-600 hover:text-teal-700 font-medium ml-1 underline"
                                      >
                                        Show less
                                      </button>
                                    </>
                                  ) : assignment.description.length > 90 ? (
                                    <>
                                      {assignment.description.substring(0,90)}...
                                      <button 
                                        onClick={(e) => toggleDescription(assignment._id, e)}
                                        className="text-teal-600 hover:text-teal-700 font-medium ml-1 underline"
                                      >
                                        Show more
                                      </button>
                                    </>
                                  ) : (
                                    assignment.description
                                  )}
                                </p>
                              </div>
                            )}

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                              <div className="text-xs text-gray-500">
                                Posted {new Date(assignment.createdAt).toLocaleDateString('en-SG', { 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </div>
                              <div className={`text-xs font-medium transition-all duration-200 ${
                                isSelected ? 'text-teal-600' : 'text-gray-400'
                              }`}>
                                {isSelected ? 'Selected' : 'Tap to select'}
                              </div>
                            </div>
                          </div>

                          {/* Desktop Layout - Keep existing */}
                          <div className="hidden sm:block">
                            {/* Header Section */}
                            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                              <div className="min-w-0 flex-1">
                                {/* Assignment ID Badge */}
                                <div className="flex items-center gap-3 mb-3">
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-400 to-red-400 text-white shadow-sm">
                                    <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    {getAssignmentId(assignment._id)}
                                  </span>
                                  
                                  {assignment.urgent && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 animate-pulse">
                                      <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                      </svg>
                                      Urgent
                                    </span>
                                  )}
                                </div>
                                
                                {/* Title - No truncation on desktop */}
                                <h3 id={`assignment-title-${assignment._id}`} className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-700 transition-colors">
                                  {assignment.title}
                                </h3>
                                
                                {/* Level & Subject Pills */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200">
                                    <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                                    </svg>
                                    {assignment.level}
                                  </span>
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 border border-purple-200">
                                    <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    {assignment.subject}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Rate Display */}
                              <div className="text-right flex-shrink-0">
                                <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                  {formatRate(assignment.rate)}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {assignment.rate && assignment.rate !== 'Tutor to propose' ? 'per hour' : 'Negotiable'}
                                </div>
                              </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="flex items-center space-x-3 p-3 bg-gray-50/80 rounded-xl border border-gray-100">
                                <div className="flex-shrink-0">
                                  <LocationIcon />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium text-gray-900">Location</p>
                                  <p className="text-sm text-gray-600" title={assignment.location}>
                                    {assignment.location}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-3 p-3 bg-gray-50/80 rounded-xl border border-gray-100">
                                <div className="flex-shrink-0">
                                  <ScheduleIcon />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium text-gray-900">Schedule</p>
                                  <p className="text-sm text-gray-600" title={assignment.frequency}>
                                    {assignment.frequency}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Description - Full on desktop */}
                            {assignment.description && (
                              <div className="mb-4 p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl border border-gray-100">
                                <h4 className="text-sm font-semibold text-gray-800 mb-2 flex items-center">
                                  <svg className="h-4 w-4 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                  </svg>
                                  Assignment Details
                                </h4>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                  {assignment.description}
                                </p>
                              </div>
                            )}

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                              <div className="flex items-center text-xs text-gray-500">
                                <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                                Posted {new Date(assignment.createdAt).toLocaleDateString('en-SG', { 
                                  year: 'numeric', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </div>
                              
                              <div className={`flex items-center text-xs font-medium transition-all duration-200 ${
                                isSelected ? 'text-teal-600' : 'text-gray-400 group-hover:text-teal-500'
                              }`}>
                                <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                                {isSelected ? 'Selected' : 'Click to select'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg py-20 px-8">
                <NoAssignmentsIcon />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Assignments Found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  {levelFilter || subjectFilter || searchKeyword 
                    ? "We couldn't find any assignments matching your current filters. Try adjusting your search criteria or clearing some filters to see more opportunities."
                    : "No assignments are currently available. New opportunities are posted regularly, so please check back soon!"}
                </p>
                {(levelFilter || subjectFilter || searchKeyword) && (
                  <button 
                    onClick={resetFilters}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
                  >
                    <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                    Clear All Filters
                  </button>
                )}
              </div>
            )}
          </section>

          {/* Modal */}
          <VerificationModal 
            isOpen={showModal}
            onClose={closeModal}
            onSubmit={handleVerifyAndSubmit}
            selectedAssignments={selectedAssignments}
            allAssignments={allAssignments}
          />

          {/* Enhanced Sticky Action Bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200/50 shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-4 py-3">
              {/* Mobile Layout (simplified) */}
              <div className="sm:hidden">
                {selectedAssignments.length > 0 ? (
                  <div className="flex items-center justify-between pr-20">
                    {/* Left: Selection count */}
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                      <span className="text-sm font-semibold text-gray-900">
                        {selectedAssignments.length} Selected
                      </span>
                    </div>
                    
                    {/* Right: Action buttons */}
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setSelectedAssignments([])}
                        className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1 rounded"
                      >
                        Clear
                      </button>
                      <button 
                        onClick={handleApplyClick}
                        className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-medium py-3 px-4 rounded-lg text-sm shadow-lg"
                      >
                        Apply ({selectedAssignments.length})
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <span className="text-sm text-gray-500">Select assignments to apply</span>
                  </div>
                )}
              </div>

              {/* Desktop Layout (full featured) */}
              <div className="hidden sm:flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      selectedAssignments.length > 0 ? 'bg-teal-500 animate-pulse' : 'bg-gray-300'
                    }`} />
                    <span className="text-lg font-semibold text-gray-900">
                      {selectedAssignments.length} Assignment{selectedAssignments.length !== 1 ? 's' : ''} Selected
                    </span>
                  </div>
                  
                  {selectedAssignments.length > 0 && (
                    <div className="flex items-center text-sm text-gray-600 space-x-2">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span>Ready to apply</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-3">
                  {selectedAssignments.length > 0 && (
                    <button 
                      onClick={() => setSelectedAssignments([])}
                      className="text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors px-3 py-1 rounded-lg hover:bg-gray-100"
                    >
                      Clear Selection
                    </button>
                  )}
                  
                  <button 
                    onClick={handleApplyClick}
                    disabled={selectedAssignments.length === 0}
                    className={`relative overflow-hidden font-medium py-3 px-6 rounded-xl transition-all duration-300 transform ${
                      selectedAssignments.length === 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
                    }`}
                  >
                    {selectedAssignments.length === 0 ? (
                      <span className="flex items-center">
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Select Assignments
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                        Apply for Selected ({selectedAssignments.length})
                      </span>
                    )}
                  </button>
                </div>
              </div>
              
              {/* Progress indicator - only on desktop */}
              {selectedAssignments.length > 0 && (
                <div className="hidden sm:flex mt-3 items-center justify-center">
                  <div className="flex space-x-1">
                    {Array.from({ length: Math.min(selectedAssignments.length, 5) }).map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                    {selectedAssignments.length > 5 && (
                      <div className="flex items-center ml-2 text-xs text-teal-600 font-medium">
                        +{selectedAssignments.length - 5} more
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
        
        {/* Add CSS animations */}
        <style jsx global>{`
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </>
  );
}