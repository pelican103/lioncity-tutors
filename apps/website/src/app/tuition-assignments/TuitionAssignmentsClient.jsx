'use client';

import {
  useState,
  useEffect,
  useMemo,
  memo,
  useCallback,
} from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { AnimatePresence, motion } from 'framer-motion';

// Import from shared package
import {
  EDUCATION_LEVELS,
  SUBJECTS,
  LEVEL_SUBJECT_MAPPINGS
} from '@lioncity/shared/client-exports.js';

// --- Custom Hooks ---
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

// --- Premium Icons (using Lucide-React for consistency) ---
import {
  MapPin,
  Calendar,
  Search,
  Book,
  X,
  CheckCircle,
  AlertCircle,
  Info,
  Loader2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';


// --- Verification Modal Component ---
const VerificationModal = ({ isOpen, onClose, onSubmit, selectedAssignments }) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('Please provide your contact number or email address.');
      return;
    }

    setError('');
    setIsVerifying(true);

    try {
      const result = await onSubmit(identifier);
      if (result === 'redirect') {
        onClose();
      } else if (Array.isArray(result)) {
        setAppliedAssignments(result);
        setIsSuccess(true);
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    exit: { opacity: 0, scale: 0.9, y: -20, transition: { duration: 0.2 } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-2xl max-w-lg w-full shadow-2xl transform transition-all max-h-[90vh] overflow-y-auto flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-t-2xl">
              <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10" aria-label="Close modal">
                <X className="h-5 w-5" />
              </button>
              <div className="text-center">
                {isSuccess ? (
                  <>
                    <div className="mx-auto w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 border-2 border-emerald-500">
                      <CheckCircle className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h2 id="modal-title" className="text-2xl font-bold tracking-tight">Application Sent!</h2>
                  </>
                ) : (
                  <>
                    <div className="mx-auto w-16 h-16 bg-slate-500/20 rounded-full flex items-center justify-center mb-4 border-2 border-slate-500">
                      <ArrowRight className="h-8 w-8 text-slate-400" />
                    </div>
                    <h2 id="modal-title" className="text-2xl font-bold tracking-tight">Final Step: Verify & Apply</h2>
                  </>
                )}
              </div>
            </div>
            <div className="px-8 py-6 flex-grow">
              {isSuccess ? (
                <div className="space-y-6">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                    <p className="text-emerald-800 font-medium">You've successfully applied for {appliedAssignments.length} assignment{appliedAssignments.length !== 1 ? 's' : ''}.</p>
                    <p className="text-emerald-700 text-sm mt-1">We will notify you via WhatsApp or email shortly.</p>
                  </div>
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                     {appliedAssignments.map((assignment) => (
                      <div key={assignment._id} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                         <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-slate-800 text-sm truncate">{assignment.title}</h4>
                            <p className="text-xs text-slate-500">{assignment.level} • {assignment.subject}</p>
                          </div>
                          <div className="text-right ml-3">
                            <span className="text-sm font-bold text-emerald-600">{assignment.rate && assignment.rate !== 'Tutor to propose' ? `${assignment.rate}/hr` : 'Propose'}</span>
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                   <div className="pt-4 border-t border-slate-200">
                     <button onClick={onClose} className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:shadow-lg hover:-translate-y-0.5">
                       Continue Browsing
                     </button>
                   </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                      <div>You are applying for <span className="font-bold">{selectedAssignments.length}</span> assignment{selectedAssignments.length !== 1 ? 's' : ''}. We require a quick verification of your tutor profile.</div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="identifier" className="block text-sm font-semibold text-slate-700 mb-2">Registered Contact Number or Email</label>
                    <input id="identifier" type="text" required value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="e.g., 81234567 or tutor@email.com" className="w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"/>
                  </div>
                  {error && (<div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center text-sm" role="alert"><AlertCircle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0" /><p className="text-red-700 font-medium">{error}</p></div>)}
                  <button type="submit" disabled={isVerifying} className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:shadow-lg hover:-translate-y-0.5 disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center">
                    {isVerifying && <Loader2 className="animate-spin h-5 w-5 mr-3" />}
                    {isVerifying ? 'Verifying Profile...' : `Verify & Submit Application (${selectedAssignments.length})`}
                  </button>
                  <div className="text-center text-sm text-slate-500 pt-4 border-t border-slate-200">Don't have a tutor profile yet? <a href="/register-tutor" className="font-semibold text-teal-600 hover:text-teal-700 hover:underline ml-1">Register Now</a></div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};


// --- Assignment Card Component ---
const AssignmentCard = memo(({ assignment, isSelected, isExpanded, onSelect, onToggleExpand }) => {
    const isNew = new Date() - new Date(assignment.createdAt) < 7 * 24 * 60 * 60 * 1000;

    return (
        <article
          role="listitem"
          className={`relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-md border transition-all duration-300 cursor-pointer overflow-hidden mb-4 ${
            isSelected
              ? 'border-teal-400 ring-2 ring-teal-300 ring-offset-2 shadow-teal-100'
              : 'border-slate-200 hover:border-teal-300 hover:shadow-lg'
          }`}
          onClick={() => onSelect(assignment._id)}
        >
          <div className={`absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-300 ${isSelected ? 'bg-gradient-to-b from-teal-500 to-emerald-500' : 'bg-transparent'}`} />
          <div className="p-5">
            <div className="flex items-start gap-4">
              <div className="relative mt-1 flex-shrink-0">
                <input type="checkbox" className="sr-only" checked={isSelected} readOnly />
                <div className={`h-6 w-6 border-2 rounded-lg transition-all duration-200 flex items-center justify-center ${isSelected ? 'bg-teal-600 border-teal-600 scale-105' : 'border-slate-300 group-hover:border-teal-500'}`}>
                  {isSelected && <CheckCircle className="h-4 w-4 text-white" />}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 mb-3 sm:mb-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-slate-800">{assignment.title}</h3>
                      {isNew && (<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-md">NEW</span>)}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">{assignment.level}</span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">{assignment.subject}</span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right flex-shrink-0 sm:ml-4">
                    <div className="text-xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{assignment.rate && assignment.rate !== 'Tutor to propose' ? `${assignment.rate}/hr` : 'Propose Rate'}</div>
                    <span className="text-xs text-slate-400">ID: #{assignment._id.slice(-6)}</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 mt-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-600"><MapPin className="h-4 w-4 text-emerald-500 flex-shrink-0" /><span>{assignment.location}</span></div>
                  <div className="flex items-center gap-2 text-slate-600"><Calendar className="h-4 w-4 text-blue-500 flex-shrink-0" /><span>{assignment.frequency}</span></div>
                </div>
                {assignment.description && (
                  <div className="mt-4">
                    <motion.div initial={false} animate={{ height: isExpanded ? 'auto' : '40px' }} transition={{ duration: 0.4, ease: "easeInOut" }} className="overflow-hidden relative">
                      <p className="text-sm text-slate-600 leading-relaxed pr-4">{assignment.description}</p>
                      {!isExpanded && <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />}
                    </motion.div>
                    {assignment.description.length > 100 && (<button onClick={(e) => { e.stopPropagation(); onToggleExpand(assignment._id); }} className="text-teal-600 hover:text-teal-700 font-semibold text-sm mt-2 flex items-center">{isExpanded ? 'Show Less' : 'Show More'}{isExpanded ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}</button>)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>
    );
});
AssignmentCard.displayName = 'AssignmentCard';

// --- Pagination Controls Component ---
const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    // Logic to create page numbers with ellipsis
    const createPagination = () => {
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            pageNumbers.push(1);
            if (currentPage > 3) {
                pageNumbers.push('...');
            }
            if (currentPage > 2) {
                pageNumbers.push(currentPage - 1);
            }
            if (currentPage !== 1 && currentPage !== totalPages) {
                pageNumbers.push(currentPage);
            }
            if (currentPage < totalPages - 1) {
                pageNumbers.push(currentPage + 1);
            }
            if (currentPage < totalPages - 2) {
                pageNumbers.push('...');
            }
            pageNumbers.push(totalPages);
        }
        return [...new Set(pageNumbers)]; // Remove duplicates
    };

    return (
      <nav className="flex items-center justify-between mt-8" aria-label="Pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>
        <div className="hidden sm:flex items-center gap-2">
            {createPagination().map((page, index) =>
                typeof page === 'number' ? (
                    <button
                        key={index}
                        onClick={() => onPageChange(page)}
                        className={`w-10 h-10 flex items-center justify-center text-sm font-semibold rounded-lg transition ${
                            currentPage === page
                            ? 'bg-teal-600 text-white shadow-md'
                            : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50'
                        }`}
                    >
                        {page}
                    </button>
                ) : (
                    <span key={index} className="px-2 text-slate-500">...</span>
                )
            )}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </nav>
    );
  };


// --- Main Client Component ---
export default function TuitionAssignmentsClient({ initialAssignments }) {
  const router = useRouter();

  // --- State Management ---
  const [allAssignments, setAllAssignments] = useState(initialAssignments || []);
  const [selectedAssignments, setSelectedAssignments] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [levelFilter, setLevelFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [expandedAssignments, setExpandedAssignments] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const ASSIGNMENTS_PER_PAGE = 12;

  const debouncedSearchKeyword = useDebounce(searchKeyword, 300);

  // --- Filtering Logic ---
  const filteredAssignments = useMemo(() => {
    const keyword = debouncedSearchKeyword.toLowerCase();
    return allAssignments
      .filter(assignment => levelFilter ? assignment.level === levelFilter : true)
      .filter(assignment => subjectFilter ? assignment.subject === subjectFilter : true)
      .filter(assignment => keyword ? (assignment.title.toLowerCase().includes(keyword) || assignment.location.toLowerCase().includes(keyword)) : true);
  }, [allAssignments, levelFilter, subjectFilter, debouncedSearchKeyword]);

  // --- Reset to page 1 when filters change ---
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredAssignments]);

  // --- Pagination Logic ---
  const indexOfLastAssignment = currentPage * ASSIGNMENTS_PER_PAGE;
  const indexOfFirstAssignment = indexOfLastAssignment - ASSIGNMENTS_PER_PAGE;
  const currentAssignments = filteredAssignments.slice(indexOfFirstAssignment, indexOfLastAssignment);
  const totalPages = Math.ceil(filteredAssignments.length / ASSIGNMENTS_PER_PAGE);

  // --- Dynamic Subject List ---
  const availableSubjects = useMemo(() => {
    if (!levelFilter || !LEVEL_SUBJECT_MAPPINGS[levelFilter]) return SUBJECTS;
    return [...LEVEL_SUBJECT_MAPPINGS[levelFilter], 'Multiple Subjects', 'All Subjects'];
  }, [levelFilter]);

  useEffect(() => {
    if (levelFilter && subjectFilter && !availableSubjects.includes(subjectFilter)) {
      setSubjectFilter('');
    }
  }, [levelFilter, availableSubjects, subjectFilter]);

  // --- Event Handlers ---
  const handleAssignmentSelect = useCallback((assignmentId) => {
    setSelectedAssignments(prev => prev.includes(assignmentId) ? prev.filter(id => id !== assignmentId) : [...prev, assignmentId]);
  }, []);

  const handleToggleExpand = useCallback((assignmentId) => {
    setExpandedAssignments(prev => {
        const newSet = new Set(prev);
        newSet.has(assignmentId) ? newSet.delete(assignmentId) : newSet.add(assignmentId);
        return newSet;
    });
  }, []);

  const handleSelectAllVisible = () => {
    const visibleIds = currentAssignments.map(a => a._id);
    const allVisibleSelected = visibleIds.every(id => selectedAssignments.includes(id));
    if (allVisibleSelected) {
        setSelectedAssignments(prev => prev.filter(id => !visibleIds.includes(id)));
    } else {
        setSelectedAssignments(prev => [...new Set([...prev, ...visibleIds])]);
    }
  };

  const handleApplyClick = () => selectedAssignments.length > 0 && setShowModal(true);

  const handleVerifyAndSubmit = async (identifier) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';
    try {
      const verifyResponse = await fetch(`${backendUrl}/api/tutors/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier }),
      });
      if (!verifyResponse.ok) throw new Error('Verification failed. Check your details.');
      const verificationData = await verifyResponse.json();
      if (verificationData.exists) {
        const applyResponse = await fetch(`${backendUrl}/api/assignments/apply`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ assignmentIds: selectedAssignments, tutorId: verificationData.tutor.id }),
        });
        if (!applyResponse.ok) throw new Error('Application submission failed.');
        const appliedAssignmentsData = allAssignments.filter(a => selectedAssignments.includes(a._id));
        setSelectedAssignments([]);
        return appliedAssignmentsData;
      } else {
        alert('Tutor profile not found. Redirecting to registration...');
        router.push('/register-tutor');
        return 'redirect';
      }
    } catch (error) {
      console.error('Application error:', error);
      throw error;
    }
  };

  const closeModal = () => setShowModal(false);
  const resetFilters = () => {
    setLevelFilter('');
    setSubjectFilter('');
    setSearchKeyword('');
  };

  return (
    <>
      <Head>
        <title>Premium Tuition Assignments in Singapore | LionCity Tutors</title>
        <meta name="description" content={`Browse ${allAssignments.length}+ high-quality tuition assignments. Find your next tutoring opportunity in Singapore.`} />
      </Head>
      <div className="min-h-screen bg-slate-50 font-sans">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <header className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tighter mb-3">Find Your Next Tutoring Opportunity</h1>
            <p className="text-lg text-slate-500 max-w-3xl mx-auto">Browse our curated list of premium tuition assignments across Singapore. New opportunities added daily.</p>
            <div className="mt-6 flex items-center justify-center space-x-2 text-slate-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold">{filteredAssignments.length}</span>
                <span>of</span>
                <span className="font-semibold">{allAssignments.length}</span>
                <span>verified assignments available</span>
            </div>
          </header>
          <section className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label htmlFor="level-filter" className="block text-sm font-semibold text-slate-700 mb-2">Education Level</label>
                <select id="level-filter" value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition">
                  <option value="">All Levels</option>
                  {EDUCATION_LEVELS.map(level => <option key={level} value={level}>{level}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="subject-filter" className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                <select id="subject-filter" value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)} className="w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition">
                  <option value="">All Subjects</option>
                  {availableSubjects.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="search-input" className="block text-sm font-semibold text-slate-700 mb-2">Search by Title or Location</label>
                <div className="relative">
                  <input id="search-input" type="text" placeholder="e.g., 'JC H2 Math' or 'Tampines'..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition" />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><Search className="h-5 w-5 text-slate-400" /></div>
                </div>
              </div>
            </div>
             <div className="h-px bg-slate-200 my-6"></div>
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {(levelFilter || subjectFilter || searchKeyword) && (<button onClick={resetFilters} className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition flex items-center"><X className="h-4 w-4 mr-1"/> Clear Filters</button>)}
                </div>
                 <button onClick={handleSelectAllVisible} className="text-sm font-semibold text-teal-600 hover:text-teal-800 transition flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1.5"/>Select All on Page
                </button>
             </div>
          </section>
          <section className="pb-32">
            {currentAssignments.length > 0 ? (
                <div>
                    {currentAssignments.map(assignment => (
                        <AssignmentCard
                            key={assignment._id}
                            assignment={assignment}
                            isSelected={selectedAssignments.includes(assignment._id)}
                            isExpanded={expandedAssignments.has(assignment._id)}
                            onSelect={handleAssignmentSelect}
                            onToggleExpand={handleToggleExpand}
                        />
                    ))}
                    <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
            ) : (
              <div className="text-center bg-white rounded-2xl shadow-lg py-20 px-8">
                <Book className="mx-auto h-16 w-16 text-slate-300 mb-6" strokeWidth={1} />
                <h3 className="text-xl font-semibold text-slate-800 mb-2">No Assignments Found</h3>
                <p className="text-slate-500 max-w-md mx-auto">Your search and filter combination did not match any assignments. Try adjusting your criteria.</p>
                <button onClick={resetFilters} className="mt-6 inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-lg transition-transform transform hover:scale-105">Clear All Filters</button>
              </div>
            )}
          </section>
          <VerificationModal isOpen={showModal} onClose={closeModal} onSubmit={handleVerifyAndSubmit} selectedAssignments={selectedAssignments}/>
          <AnimatePresence>
            {!showModal && selectedAssignments.length > 0 && (
                <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} transition={{ type: "spring", stiffness: 200, damping: 25 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-800/90 backdrop-blur-lg border border-slate-700 shadow-2xl z-50 rounded-2xl overflow-hidden w-[95%] max-w-2xl">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center space-x-4">
                            <span className="text-lg font-bold text-white">{selectedAssignments.length} Assignment{selectedAssignments.length !== 1 ? 's' : ''} Selected</span>
                            <button onClick={() => setSelectedAssignments([])} className="text-sm text-slate-400 hover:text-white transition">Clear</button>
                        </div>
                        <button onClick={handleApplyClick} className="font-bold py-3 px-6 rounded-xl transition-all duration-300 transform bg-gradient-to-r from-teal-500 to-emerald-500 hover:shadow-xl hover:scale-105 text-white flex items-center gap-2">
                            Apply Now <ArrowRight className="h-5 w-5"/>
                        </button>
                    </div>
                </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}