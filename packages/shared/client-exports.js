// Updated Singapore Education System with proper level-subject mappings
export const EDUCATION_LEVELS = [
  // Pre-School
  'Pre-School',
  
  // Primary
  'Primary 1',
  'Primary 2', 
  'Primary 3',
  'Primary 4',
  'Primary 5',
  'Primary 6',
  
  // Secondary (Updated for Full SBB system)
  'Secondary 1',
  'Secondary 2',
  'Secondary 3',
  'Secondary 4',
  'Secondary 5',
  
  // Post-Secondary
  'Junior College 1',
  'Junior College 2',
  'Polytechnic Year 1',
  'Polytechnic Year 2',
  'Polytechnic Year 3',
  'International Baccalaureate Year 1',
  'International Baccalaureate Year 2',
  
  // Higher Education
  'University Year 1',
  'University Year 2',
  'University Year 3',
  'University Year 4',
  'Graduate Studies',
  
  // Others
  'Music Academy',
  'Professional Development'
];

// Subject mappings by education level - aligned with Tutor.js structure
export const LEVEL_SUBJECT_MAPPINGS = {
  'Pre-School': [
    'English Language',
    'Chinese',
    'Malay',
    'Tamil',
    'Mathematics',
    'Phonics',
    'Art',
    'Music',
    'Physical Education'
  ],

  'Primary 1': [
    'English Language',
    'Chinese',
    'Malay', 
    'Tamil',
    'Mathematics',
    'Art',
    'Music',
    'Physical Education',
    'Character and Citizenship Education'
  ],
  
  'Primary 2': [
    'English Language',
    'Chinese',
    'Malay', 
    'Tamil',
    'Mathematics',
    'Art',
    'Music',
    'Physical Education',
    'Character and Citizenship Education'
  ],
  
  'Primary 3': [
    'English Language',
    'Chinese',
    'Malay', 
    'Tamil',
    'Mathematics',
    'Science',
    'Art',
    'Music',
    'Physical Education',
    'Social Studies',
    'Character and Citizenship Education'
  ],
  
  'Primary 4': [
    'English Language',
    'Chinese',
    'Malay', 
    'Tamil',
    'Mathematics',
    'Science',
    'Art',
    'Music',
    'Physical Education',
    'Social Studies',
    'Character and Citizenship Education'
  ],
  
  'Primary 5': [
    'English Language',
    'Chinese',
    'Malay', 
    'Tamil',
    'Mathematics',
    'Science',
    'Art',
    'Music',
    'Physical Education',
    'Social Studies',
    'Character and Citizenship Education'
  ],
  
  'Primary 6': [
    'English Language',
    'Chinese',
    'Malay', 
    'Tamil',
    'Mathematics',
    'Science',
    'Art',
    'Music',
    'Physical Education',
    'Social Studies',
    'Character and Citizenship Education'
  ],

  'Secondary 1': [
    'English Language',
    'Chinese',
    'Malay', 
    'Tamil',
    'Mathematics',
    'Science',
    'Computing',
    'History',
    'Geography',
    'Art',
    'Music',
    'Design and Technology',
    'Food and Consumer Education',
    'Physical Education',
    'Character and Citizenship Education'
  ],
  
  'Secondary 2': [
    'English Language',
    'Chinese',
    'Malay', 
    'Tamil',
    'Mathematics',
    'Science',
    'Computing',
    'History',
    'Geography',
    'Literature in English',
    'Art',
    'Music',
    'Design and Technology',
    'Food and Consumer Education',
    'Physical Education',
    'Character and Citizenship Education'
  ],
  
  'Secondary 3': [
    'English Language',
    'Chinese',
    'Malay', 
    'Tamil',
    'Mathematics',
    'Elementary Mathematics',
    'Additional Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Combined Science (Physics/Chemistry)',
    'Combined Science (Chemistry/Biology)',
    'Computing',
    'History',
    'Geography',
    'Social Studies',
    'Literature in English',
    'Art',
    'Music',
    'Design and Technology',
    'Nutrition and Food Science',
    'Principles of Accounts',
    'Physical Education',
    'Character and Citizenship Education'
  ],
  
  'Secondary 4': [
    'English Language',
    'Chinese',
    'Malay', 
    'Tamil',
    'Mathematics',
    'Elementary Mathematics',
    'Additional Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Combined Science (Physics/Chemistry)',
    'Combined Science (Chemistry/Biology)',
    'Computing',
    'History',
    'Geography',
    'Social Studies',
    'Literature in English',
    'Art',
    'Music',
    'Design and Technology',
    'Nutrition and Food Science',
    'Principles of Accounts',
    'Physical Education',
    'Character and Citizenship Education'
  ],
  
  'Secondary 5': [
    'English Language',
    'Chinese',
    'Malay', 
    'Tamil',
    'Mathematics',
    'Elementary Mathematics',
    'Additional Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'History',
    'Geography',
    'Literature in English',
    'Principles of Accounts'
  ],

  'Junior College 1': [
    'General Paper',
    'Project Work',
    'Chinese Language',
    'Malay Language',
    'Tamil Language',
    'Knowledge and Inquiry',
    'H1 Mathematics',
    'H1 Physics',
    'H1 Chemistry',
    'H1 Biology',
    'H1 Economics',
    'H1 History',
    'H1 Geography',
    'H1 Literature in English',
    'H1 Chinese Language and Literature',
    'H1 Malay Language and Literature',
    'H1 Tamil Language and Literature',
    'H2 Mathematics',
    'H2 Physics',
    'H2 Chemistry',
    'H2 Biology',
    'H2 Computing',
    'H2 Economics',
    'H2 History',
    'H2 Geography',
    'H2 Literature in English',
    'H2 Art',
    'H2 Music',
    'H2 Chinese Language and Literature',
    'H2 Malay Language and Literature',
    'H2 Tamil Language and Literature',
    'H3 Mathematics',
    'H3 Physics',
    'H3 Chemistry',
    'H3 Biology',
    'H3 Economics',
    'H3 History',
    'H3 Geography',
    'H3 Literature in English',
    'H3 Art'
  ],
  
  'Junior College 2': [
    'General Paper',
    'Chinese Language',
    'Malay Language',
    'Tamil Language',
    'Knowledge and Inquiry',
    'H1 Mathematics',
    'H1 Physics',
    'H1 Chemistry',
    'H1 Biology',
    'H1 Economics',
    'H1 History',
    'H1 Geography',
    'H1 Literature in English',
    'H1 Chinese Language and Literature',
    'H1 Malay Language and Literature',
    'H1 Tamil Language and Literature',
    'H2 Mathematics',
    'H2 Physics',
    'H2 Chemistry',
    'H2 Biology',
    'H2 Computing',
    'H2 Economics',
    'H2 History',
    'H2 Geography',
    'H2 Literature in English',
    'H2 Art',
    'H2 Music',
    'H2 Chinese Language and Literature',
    'H2 Malay Language and Literature',
    'H2 Tamil Language and Literature',
    'H3 Mathematics',
    'H3 Physics',
    'H3 Chemistry',
    'H3 Biology',
    'H3 Economics',
    'H3 History',
    'H3 Geography',
    'H3 Literature in English',
    'H3 Art'
  ],

  'International Baccalaureate Year 1': [
    'IB English Language and Literature',
    'IB Chinese',
    'IB Malay',
    'IB Tamil',
    'IB Mathematics',
    'IB Physics',
    'IB Chemistry',
    'IB Biology',
    'IB Business Management',
    'IB Economics',
    'IB Geography',
    'IB History',
    'IB Visual Arts',
    'IB Music',
    'IB Theatre',
    'IB Theory of Knowledge',
    'IB Extended Essay'
  ],
  
  'International Baccalaureate Year 2': [
    'IB English Language and Literature',
    'IB Chinese',
    'IB Malay',
    'IB Tamil',
    'IB Mathematics',
    'IB Physics',
    'IB Chemistry',
    'IB Biology',
    'IB Business Management',
    'IB Economics',
    'IB Geography',
    'IB History',
    'IB Visual Arts',
    'IB Music',
    'IB Theatre',
    'IB Theory of Knowledge',
    'IB Extended Essay'
  ],

  'Polytechnic Year 1': [
    'English',
    'Mathematics',
    'Engineering Mathematics',
    'Communication Skills',
    'Computer Applications',
    'Business Studies',
    'Accounting',
    'Science',
    'Statistics',
    'Project Management',
    'Major Subjects'
  ],
  
  'Polytechnic Year 2': [
    'English',
    'Mathematics',
    'Engineering Mathematics',
    'Communication Skills',
    'Computer Applications',
    'Business Studies',
    'Accounting',
    'Science',
    'Statistics',
    'Project Management',
    'Major Subjects'
  ],
  
  'Polytechnic Year 3': [
    'English',
    'Mathematics',
    'Engineering Mathematics',
    'Communication Skills',
    'Computer Applications',
    'Business Studies',
    'Accounting',
    'Science',
    'Statistics',
    'Project Management',
    'Major Subjects'
  ],

  'University Year 1': [
    'Engineering Mathematics',
    'Calculus',
    'Linear Algebra',
    'Statistics',
    'University Physics',
    'Chemistry',
    'Biology',
    'Economics',
    'Psychology',
    'Computer Science',
    'Programming',
    'Accounting',
    'Business Studies',
    'Law',
    'Medicine',
    'Research Methods',
    'Major Specific Subjects'
  ],
  
  'University Year 2': [
    'Engineering Mathematics',
    'Calculus',
    'Linear Algebra',
    'Statistics',
    'University Physics',
    'Chemistry',
    'Biology',
    'Economics',
    'Psychology',
    'Computer Science',
    'Programming',
    'Accounting',
    'Business Studies',
    'Law',
    'Medicine',
    'Research Methods',
    'Major Specific Subjects'
  ],
  
  'University Year 3': [
    'Engineering Mathematics',
    'Calculus',
    'Linear Algebra',
    'Statistics',
    'University Physics',
    'Chemistry',
    'Biology',
    'Economics',
    'Psychology',
    'Computer Science',
    'Programming',
    'Accounting',
    'Business Studies',
    'Law',
    'Medicine',
    'Research Methods',
    'Major Specific Subjects'
  ],
  
  'University Year 4': [
    'Engineering Mathematics',
    'Calculus',
    'Linear Algebra',
    'Statistics',
    'University Physics',
    'Chemistry',
    'Biology',
    'Economics',
    'Psychology',
    'Computer Science',
    'Programming',
    'Accounting',
    'Business Studies',
    'Law',
    'Medicine',
    'Research Methods',
    'Major Specific Subjects'
  ],
  
  'Graduate Studies': [
    'Engineering Mathematics',
    'Calculus',
    'Linear Algebra',
    'Statistics',
    'University Physics',
    'Chemistry',
    'Biology',
    'Economics',
    'Psychology',
    'Computer Science',
    'Programming',
    'Accounting',
    'Business Studies',
    'Law',
    'Medicine',
    'Research Methods',
    'Major Specific Subjects'
  ],

  'Music Academy': [
    'Music Theory',
    'Piano',
    'Violin',
    'Guitar',
    'Drums',
    'Clarinet',
    'Flute',
    'Saxophone',
    'Trumpet',
    'Cello',
    'Ukulele',
    'Voice/Singing',
    'Music Composition',
    'Ensemble Playing'
  ],
  
  'Professional Development': [
    // Test Preparation
    'IELTS',
    'TOEFL',
    'SAT',
    'GMAT',
    'GRE',
    
    // Programming & Technology
    'Python Programming',
    'Java Programming',
    'C++ Programming',
    'C# Programming',
    'Web Development',
    'Data Science',
    'AI and Machine Learning',
    'Mobile App Development',
    'Photoshop',
    'Video Editing',
    
    // Soft Skills
    'Public Speaking',
    'Creative Writing',
    'Essay Writing',
    'Critical Thinking',
    'Study Skills',
    
    // Languages
    'French',
    'German',
    'Spanish',
    'Japanese',
    'Korean',
    
    // Business & Professional
    'Leadership',
    'Project Management',
    'Digital Marketing',
    'Business Writing'
  ]
};

// Generate all unique subjects from mappings
const getAllSubjects = () => {
  const allSubjects = new Set();
  Object.values(LEVEL_SUBJECT_MAPPINGS).forEach(subjects => {
    subjects.forEach(subject => allSubjects.add(subject));
  });
  
  // Add special categories
  allSubjects.add('Multiple Subjects');
  allSubjects.add('All Subjects');
  allSubjects.add('Exam Preparation');
  allSubjects.add('Homework Support');
  allSubjects.add('Other');
  
  return Array.from(allSubjects).sort();
};

export const SUBJECTS = getAllSubjects();

// Validation function
export const isValidLevelSubjectCombination = (level, subject) => {
  // Allow special categories for all levels
  const specialCategories = ['Multiple Subjects', 'All Subjects', 'Exam Preparation', 'Homework Support', 'Other'];
  if (specialCategories.includes(subject)) {
    return true;
  }
  
  const subjects = LEVEL_SUBJECT_MAPPINGS[level];
  return subjects ? subjects.includes(subject) : false;
};

// Helper function to get subjects for a level
export const getSubjectsForLevel = (level) => {
  const subjects = LEVEL_SUBJECT_MAPPINGS[level] || [];
  const specialCategories = ['Multiple Subjects', 'All Subjects', 'Exam Preparation', 'Homework Support', 'Other'];
  return [...subjects, ...specialCategories];
};


// Rate mapping for each education level
export const RATE_MAPPINGS = {
  // Pre-School
  'Pre-School': {
    'PT (Part-Time)': '$25-40/hr',
    'FT (Full-Time)': '$40-65/hr',
    'MOE (Ex-MOE)': '$55-90/hr'
  },
  
  // Primary
  'Primary 1': {
    'PT (Part-Time)': '$30-45/hr',
    'FT (Full-Time)': '$45-70/hr',
    'MOE (Ex-MOE)': '$60-100/hr'
  },
  'Primary 2': {
    'PT (Part-Time)': '$30-45/hr',
    'FT (Full-Time)': '$45-70/hr',
    'MOE (Ex-MOE)': '$60-100/hr'
  },
  'Primary 3': {
    'PT (Part-Time)': '$30-45/hr',
    'FT (Full-Time)': '$45-70/hr',
    'MOE (Ex-MOE)': '$60-100/hr'
  },
  'Primary 4': {
    'PT (Part-Time)': '$30-50/hr',
    'FT (Full-Time)': '$50-75/hr',
    'MOE (Ex-MOE)': '$65-110/hr'
  },
  'Primary 5': {
    'PT (Part-Time)': '$30-50/hr',
    'FT (Full-Time)': '$50-75/hr',
    'MOE (Ex-MOE)': '$65-110/hr'
  },
  'Primary 6': {
    'PT (Part-Time)': '$30-50/hr',
    'FT (Full-Time)': '$50-75/hr',
    'MOE (Ex-MOE)': '$65-110/hr'
  },
  
  // Secondary
  'Secondary 1': {
    'PT (Part-Time)': '$35-55/hr',
    'FT (Full-Time)': '$55-85/hr',
    'MOE (Ex-MOE)': '$70-120/hr'
  },
  'Secondary 2': {
    'PT (Part-Time)': '$35-55/hr',
    'FT (Full-Time)': '$55-85/hr',
    'MOE (Ex-MOE)': '$70-120/hr'
  },
  'Secondary 3': {
    'PT (Part-Time)': '$40-60/hr',
    'FT (Full-Time)': '$60-90/hr',
    'MOE (Ex-MOE)': '$75-130/hr'
  },
  'Secondary 4': {
    'PT (Part-Time)': '$40-60/hr',
    'FT (Full-Time)': '$60-90/hr',
    'MOE (Ex-MOE)': '$75-130/hr'
  },
  'Secondary 5': {
    'PT (Part-Time)': '$40-60/hr',
    'FT (Full-Time)': '$60-90/hr',
    'MOE (Ex-MOE)': '$75-130/hr'
  },
  
  // Post-Secondary
  'Junior College 1': {
    'PT (Part-Time)': '$45-70/hr',
    'FT (Full-Time)': '$70-100/hr',
    'MOE (Ex-MOE)': '$85-150/hr'
  },
  'Junior College 2': {
    'PT (Part-Time)': '$45-70/hr',
    'FT (Full-Time)': '$70-100/hr',
    'MOE (Ex-MOE)': '$85-150/hr'
  },
  'Polytechnic Year 1': {
    'PT (Part-Time)': '$40-65/hr',
    'FT (Full-Time)': '$65-95/hr',
    'MOE (Ex-MOE)': '$80-140/hr'
  },
  'Polytechnic Year 2': {
    'PT (Part-Time)': '$40-65/hr',
    'FT (Full-Time)': '$65-95/hr',
    'MOE (Ex-MOE)': '$80-140/hr'
  },
  'Polytechnic Year 3': {
    'PT (Part-Time)': '$40-65/hr',
    'FT (Full-Time)': '$65-95/hr',
    'MOE (Ex-MOE)': '$80-140/hr'
  },
  'International Baccalaureate Year 1': {
    'PT (Part-Time)': '$50-80/hr',
    'FT (Full-Time)': '$80-120/hr',
    'MOE (Ex-MOE)': '$100-180/hr'
  },
  'International Baccalaureate Year 2': {
    'PT (Part-Time)': '$50-80/hr',
    'FT (Full-Time)': '$80-120/hr',
    'MOE (Ex-MOE)': '$100-180/hr'
  },
  
  // Higher Education
  'University Year 1': {
    'PT (Part-Time)': '$50-80/hr',
    'FT (Full-Time)': '$80-120/hr',
    'MOE (Ex-MOE)': '$100-180/hr'
  },
  'University Year 2': {
    'PT (Part-Time)': '$50-80/hr',
    'FT (Full-Time)': '$80-120/hr',
    'MOE (Ex-MOE)': '$100-180/hr'
  },
  'University Year 3': {
    'PT (Part-Time)': '$55-85/hr',
    'FT (Full-Time)': '$85-130/hr',
    'MOE (Ex-MOE)': '$110-200/hr'
  },
  'University Year 4': {
    'PT (Part-Time)': '$55-85/hr',
    'FT (Full-Time)': '$85-130/hr',
    'MOE (Ex-MOE)': '$110-200/hr'
  },
  'Graduate Studies': {
    'PT (Part-Time)': '$60-100/hr',
    'FT (Full-Time)': '$100-150/hr',
    'MOE (Ex-MOE)': '$130-250/hr'
  },
  
  // Others
  'Music Academy': {
    'PT (Part-Time)': '$40-70/hr',
    'FT (Full-Time)': '$70-110/hr',
    'MOE (Ex-MOE)': '$90-160/hr'
  },
  'Professional Development': {
    'PT (Part-Time)': '$60-100/hr',
    'FT (Full-Time)': '$100-150/hr',
    'MOE (Ex-MOE)': '$130-250/hr'
  }
};

