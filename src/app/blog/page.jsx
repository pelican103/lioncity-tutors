"use client";

import Link from 'next/link';
import { useState } from 'react';

const blogPosts = [
  {
    slug: 'psle-english',
    title: 'PSLE English Guide',
    description: 'Master PSLE English with our comprehensive guide. Learn essential skills, exam strategies, and proven techniques for success.',
    date: 'June 14, 2025',
    directUrl: '/psle-english',
    categories: ['PSLE', 'English'],
  },
  {
    slug: 'psle-math',
    title: 'PSLE Math Guide',
    description: 'Master PSLE Mathematics with our comprehensive guide. Learn essential concepts, problem-solving strategies, and exam techniques.',
    date: 'June 14, 2025',
    directUrl: '/psle-math',
    categories: ['PSLE', 'Math'],
  },
  {
    slug: 'psle-science',
    title: 'PSLE Science Guide',
    description: 'Master PSLE Science with our comprehensive guide. Learn essential concepts, practical skills, and exam strategies for success.',
    date: 'June 14, 2025',
    directUrl: '/psle-science',
    categories: ['PSLE', 'Science'],
  },
  {
    slug: 'psle-chinese',
    title: 'PSLE Chinese Guide',
    description: 'Master PSLE Chinese with our comprehensive guide. Learn essential language skills, exam strategies, and proven techniques for success.',
    date: 'June 14, 2025',
    directUrl: '/psle-chinese',
    categories: ['PSLE', 'Chinese'],
  },
  {
    slug: 'what-to-look-for-in-a-tutor',
    title: 'What to Look for in a Tutor',
    description: "Tips for choosing the right tutor for your child's needs.",
    date: 'May 25, 2025',
    directUrl: '/blog/what-to-look-for-in-a-tutor',
    categories: ['General'],
  },
  {
    slug: 'benefits-of-private-tuition',
    title: 'Benefits of Private Tuition in Singapore',
    description: 'Explore how one-on-one tutoring can improve academic results and confidence.',
    date: 'May 20, 2025',
    directUrl: '/blog/benefits-of-private-tuition',
    categories: ['General'],
  },
  {
    slug: 'psle-preparation',
    title: 'PSLE Preparation Guide 2025',
    description: 'Complete PSLE preparation guide for Singapore parents. Proven strategies, study schedules, and expert tips to help your child excel in PSLE 2025.',
    directUrl: '/blog/psle-preparation-guide',
    date: 'May 24, 2025',
    categories: ['PSLE'],
  },
  {
    slug: 'o-level-english',
    title: 'O-Level English Guide',
    description: 'Comprehensive guide to O-Level English. Expert strategies, language skills, and proven tips to score A1 in O Level English.',
    date: 'July 7, 2025',
    directUrl: '/o-level-english',
    categories: ['O-Level', 'English'],
  },
  {
    slug: 'o-level-chemistry',
    title: 'O-Level Chemistry Guide',
    description: 'Comprehensive guide to O-Level Chemistry. Master key concepts, practical skills, and exam strategies.',
    date: 'May 27, 2025',
    directUrl: '/o-level-chemistry',
    categories: ['O-Level', 'Chemistry'],
  },
  {
    slug: 'o-level-physics',
    title: 'O-Level Physics Guide',
    description: 'Master O-Level Physics with our comprehensive guide. Learn essential concepts, practical skills, and exam strategies for success.',
    date: 'June 15, 2025',
    directUrl: '/o-level-physics',
    categories: ['O-Level', 'Physics'],
  },
  {
    slug: 'o-level-biology',
    title: 'O-Level Biology Guide',
    description: 'Comprehensive guide to O-Level Biology. Master key concepts, practical skills, and exam strategies for life sciences.',
    date: 'June 16, 2025',
    directUrl: '/o-level-biology',
    categories: ['O-Level', 'Biology'],
  },
  {
    slug: 'a-level-preparation',
    title: 'A-Level Preparation Guide 2025',
    description: 'Complete A-Level preparation guide for Singapore JC students. Expert strategies, study schedules, and proven tips to excel in GCE A-Level examinations.',
    date: 'June 10, 2025',
    directUrl: '/blog/a-level-preparation-guide',
    categories: ['A-Level'],
  },
  {
    slug: 'o-level-preparation',
    title: 'O-Level Preparation Guide 2025',
    description: 'Comprehensive O-Level preparation guide for Singapore students. Master all GCE O-Level subjects with expert strategies and proven study techniques.',
    date: 'June 11, 2025',
    directUrl: '/blog/o-level-preparation-guide',
    categories: ['O-Level'],
  },
  {
    slug: 'o-level-math',
    title: 'O-Level Math Guide',
    description: 'Master O-Level Mathematics with our comprehensive guide. Learn essential concepts, problem-solving strategies, and exam techniques.',
    date: 'June 12, 2025',
    directUrl: '/o-level-math',
    categories: ['O-Level', 'Math'],
  },
  {
    slug: 'a-level-general-paper',
    title: 'A-Level General Paper Guide',
    description: 'Comprehensive A Level General Paper guide with proven strategies to help Singapore JC students achieve A grades in GP essays and comprehension.',
    date: 'July 7, 2025',
    directUrl: '/a-level-general-paper',
    categories: ['A-Level', 'English'],
  },
  {
    slug: 'a-level-chemistry',
    title: 'A-Level Chemistry Guide',
    description: 'Comprehensive guide to A-Level Chemistry. Master key concepts, practical skills, and exam strategies.',
    date: 'June 13, 2025',
    directUrl: '/a-level-chemistry',
    categories: ['A-Level', 'Chemistry'],
  },
  {
    slug: 'a-level-math',
    title: 'A-Level Math Guide',
    description: 'Master A-Level Mathematics with our comprehensive guide. Learn essential concepts, problem-solving strategies, and exam techniques.',
    date: 'June 14, 2025',
    directUrl: '/a-level-math',
    categories: ['A-Level', 'Math'],
  },
  {
    slug: 'a-level-physics',
    title: 'A-Level Physics Guide',
    description: 'Master A-Level Physics with our comprehensive guide. Learn advanced concepts, practical skills, and exam strategies for success.',
    date: 'June 14, 2025',
    directUrl: '/a-level-physics',
    categories: ['A-Level', 'Physics'],
  },
  {
    slug: 'a-level-biology',
    title: 'A-Level Biology Guide',
    description: 'Comprehensive guide to A-Level Biology. Master advanced concepts, practical skills, and exam strategies for life sciences.',
    date: 'June 15, 2025',
    directUrl: '/a-level-biology',
    categories: ['A-Level', 'Biology'],
  },
  {
    slug: 'igcse-physics',
    title: 'IGCSE Physics Guide 2025',
    description: 'Master IGCSE Physics with our comprehensive guide. Learn essential concepts, practical skills, and exam strategies for success.',
    date: 'June 14, 2025',
    directUrl: '/igcse-physics',
    categories: ['IGCSE', 'Physics'],
  },
  {
    slug: 'igcse-chemistry',
    title: 'IGCSE Chemistry Guide 2025',
    description: 'Comprehensive guide to IGCSE Chemistry. Master key concepts, practical skills, and exam strategies.',
    date: 'June 14, 2025',
    directUrl: '/igcse-chemistry',
    categories: ['IGCSE', 'Chemistry'],
  },
  {
    slug: 'igcse-biology',
    title: 'IGCSE Biology Guide 2025',
    description: 'Master IGCSE Biology with our comprehensive guide. Learn essential concepts, practical skills, and exam strategies for life sciences.',
    date: 'June 14, 2025',
    directUrl: '/igcse-biology',
    categories: ['IGCSE', 'Biology'],
  },
  {
    slug: 'ibdp-physics',
    title: 'IBDP Physics Guide 2025',
    description: 'Master IBDP Physics with our comprehensive guide. Learn advanced concepts, practical skills, and exam strategies for success.',
    date: 'June 14, 2025',
    directUrl: '/ibdp-physics',
    categories: ['IBDP', 'Physics'],
  },
  {
    slug: 'ibdp-chemistry',
    title: 'IBDP Chemistry Guide 2025',
    description: 'Comprehensive guide to IBDP Chemistry. Master advanced concepts, practical skills, and exam strategies.',
    date: 'June 14, 2025',
    directUrl: '/ibdp-chemistry',
    categories: ['IBDP', 'Chemistry'],
  },
  {
    slug: 'ibdp-biology',
    title: 'IBDP Biology Guide 2025',
    description: 'Master IBDP Biology with our comprehensive guide. Learn advanced concepts, practical skills, and exam strategies for life sciences.',
    date: 'June 14, 2025',
    directUrl: '/ibdp-biology',
    categories: ['IBDP', 'Biology'],
  },
];

const categories = ['All', 'English', 'Math', 'Physics', 'Chemistry', 'Biology', 'Science', 'PSLE', 'O-Level', 'A-Level', 'IGCSE', 'IBDP', 'General'];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = (selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.categories.includes(selectedCategory)))
    .filter(post => !!post.directUrl);

  return (
    <>
    <main className="px-4 sm:px-6 py-8 sm:py-12 max-w-5xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-blue-800">LionCity Tutors Blog</h1>

      {/* Filter Bar */}
      <div className="mb-6 sm:mb-8 overflow-x-auto">
        <div className="flex space-x-2 min-w-max pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors
                ${selectedCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredPosts.map((post) => (
          <Link 
            key={post.slug} 
            href={post.directUrl}
            className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-3">
                {post.description}
              </p>
              <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                <span>{post.date}</span>
                <span>{post.categories.join(', ')}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
    </>
  );
}
