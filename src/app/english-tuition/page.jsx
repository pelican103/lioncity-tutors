import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: 'Best English Tuition Singapore | PSLE, O Level, A Level English Tutors | Lion City Tutors',
  description: 'Find the best English tutors in Singapore for PSLE, O Level, A Level & JC H1/H2 English. Free matching service with handpicked private tutors. Results guaranteed within 24 hours.',
  keywords: [
    'English tuition Singapore',
    'PSLE English tutor',
    'O level English tuition',
    'A level English tutor',
    'H1 English tuition',
    'JC English tutor',
    'private English tutor Singapore',
    'home tuition English',
    'secondary English tuition',
    'primary English tuition'
  ],
  openGraph: {
    title: 'Best English Tuition Singapore | Expert PSLE, O & A Level English Tutors',
    description: "Connect with Singapore's top English tutors for PSLE, O Level, A Level & H1/H2 English. Free matching service with proven results. Request your tutor today!",
    url: 'https://www.lioncitytutors.com/english-tuition',
    type: 'website',
    images: [
      {
        url: 'https://www.lioncitytutors.com/images/english-tuition_optimized.webp',
        alt: 'English Tuition Singapore',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best English Tuition Singapore | Expert English Tutors',
    description: 'Find qualified English tutors for PSLE, O Level & A Level. Free matching service with handpicked tutors. Results within 24 hours.',
  },
  alternates: {
    canonical: 'https://www.lioncitytutors.com/english-tuition',
  },
};

export default function EnglishTuition() {
  return (
    <>
      <div className="p-6 max-w-5xl mx-auto space-y-12">
        {/* Section 1: Headline */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-blue-800">Master English with Singapore's Top Tutors – Fast & Free</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            From PSLE to A-Levels, Lion City Tutors connects you with expert English tutors who excel in Singapore's education system – at no cost to you.
          </p>
          <div className="my-8 relative w-full max-w-3xl mx-auto aspect-video overflow-hidden rounded-xl shadow-lg"> 
            <Image
              src="/english-tuition_optimized.webp"
              alt="English tuition in Singapore - Students learning with experienced tutors"
              fill
              className="object-cover"
              sizes="100vw"
              placeholder="blur"
              blurDataURL="/english-tuition_optimized.webp"
              priority 
            />
          </div>
          <Link href="/request-tutor">
            <Button className="text-lg px-8 py-4 mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
              Request an English Tutor
            </Button>
          </Link>
        </section>

        {/* Section 2: Who We Help */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Comprehensive English Tuition for Every Level</h2>
          <p className="text-gray-700 mb-4">
            Our experienced English tutors specialize in Singapore's education system, helping students excel in all aspects of English language learning.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong className="text-blue-600">Primary School English</strong> (PSLE English preparation)</li>
            <li><strong className="text-blue-600">Secondary School English</strong> (O Level English)</li>
            <li><strong className="text-blue-600">Junior College English</strong> (H1 & H2 English)</li>
            <li><strong className="text-blue-600">International Curriculum</strong> (IB, IP, IGCSE English)</li>
            <li><strong className="text-blue-600">English Literature</strong> & Creative Writing</li>
          </ul>
        </section>

        {/* New Section: Comprehensive English Guides */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold mb-6 text-blue-700">Complete English Guides for Every Level</h2>
          <p className="text-lg text-gray-700 mb-8">
            Access our comprehensive guides for each English subject and level, designed to help students excel in their examinations. Each guide includes detailed exam formats, scoring strategies, and expert tips.
          </p>
          {/* PSLE English Guide */}
          <Card className="border-t-4 border-t-blue-500 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-blue-700 mb-4">PSLE English Guide</h3>
                  <p className="text-gray-700 mb-4">
                    Master PSLE English with our comprehensive guide covering essential skills, exam strategies, and proven techniques for success. Perfect for Primary 5 and 6 students preparing for their PSLE.
                  </p>
                  <ul className="text-gray-600 space-y-3 mb-6">
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Complete exam format breakdown</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Composition and comprehension strategies</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Common mistakes and how to avoid them</span>
                    </li>
                  </ul>
                  <Link href="/psle-english" className="inline-block">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Read PSLE English Guide
                    </Button>
                  </Link>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-700 mb-3">What You'll Learn:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Vocabulary and grammar mastery</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Oral and listening skills</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Exam preparation strategies</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* O Level English Guide */}
          <Card className="border-t-4 border-t-emerald-500 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-emerald-700 mb-4">O Level English Guide</h3>
                  <p className="text-gray-700 mb-4">
                    Comprehensive guide for O Level English. Learn how to master composition, comprehension, oral, and summary writing to achieve excellent results.
                  </p>
                  <ul className="text-gray-600 space-y-3 mb-6">
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>Paper-by-paper exam strategies</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>Model essays and comprehension answers</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-emerald-500 mt-1">•</span>
                      <span>Oral and listening exam tips</span>
                    </li>
                  </ul>
                  <Link href="/o-level-english" className="inline-block">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      Read O Level English Guide
                    </Button>
                  </Link>
                </div>
                <div className="bg-emerald-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-emerald-700 mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span>Comprehensive topic coverage</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span>Step-by-step writing techniques</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      <span>Exam technique workshops</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* A Level General Paper Guide */}
          <Card className="border-t-4 border-t-purple-500 shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-purple-700 mb-4">A Level General Paper Guide</h3>
                  <p className="text-gray-700 mb-4">
                    Advanced guide for A Level General Paper (GP). Learn how to craft powerful essays, master comprehension, and develop critical thinking for university success.
                  </p>
                  <ul className="text-gray-600 space-y-3 mb-6">
                    <li className="flex items-start space-x-2">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>Essay planning and argumentation</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>Comprehension and summary skills</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-purple-500 mt-1">•</span>
                      <span>Critical thinking and current affairs</span>
                    </li>
                  </ul>
                  <Link href="/a-level-general-paper" className="inline-block">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      Read A Level GP Guide
                    </Button>
                  </Link>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-purple-700 mb-3">Advanced Features:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <span>Advanced essay techniques</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <span>Real-world examples and analysis</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <span>University preparation guidance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 3: Why Parents Trust Us */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Why Singapore Parents Choose Lion City Tutors for English</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-l-emerald-500 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-emerald-700">Expert English Tutors</h3>
                <p className="text-gray-600 mt-2">Our tutors are not just academically qualified but also passionate about English language and literature, bringing real-world context to lessons.</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-blue-500 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-blue-700">Quick Matching (24h)</h3>
                <p className="text-gray-600 mt-2">Get matched with qualified English tutors within 24 hours, ensuring your child can start improving their language skills immediately.</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-purple-500 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-purple-700">Free Service</h3>
                <p className="text-gray-600 mt-2">No agency fees or hidden charges. You only pay for English tuition lessons directly to your chosen tutor.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 4: Student Success Stories */}
        <section className="bg-gradient-to-r from-blue-50 to-emerald-50 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Proven English Tuition Results</h2>
          <p className="text-gray-700 mb-4">
            Our English tutors have helped students achieve remarkable improvements:
          </p>
          <ul className="text-gray-700 space-y-3">
            <li className="flex items-start space-x-3">
              <span className="text-2xl">📈</span>
              <div>
                <strong className="text-emerald-700">Sarah (Sec 4):</strong> Improved from C6 to A2 in O Level English through focused composition and comprehension practice
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-2xl">🎯</span>
              <div>
                <strong className="text-blue-700">James (P6):</strong> Achieved AL1 in PSLE English with enhanced vocabulary and writing skills
              </div>
            </li>
            <li className="flex items-start space-x-3">
              <span className="text-2xl">🧠</span>
              <div>
                <strong className="text-purple-700">Mei Ling (JC2):</strong> Excelled in H2 English Literature, moving from average to distinction level
              </div>
            </li>
          </ul>
        </section>

        {/* Section 5: What We Cover */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Comprehensive English Tuition Coverage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-t-4 border-t-emerald-500 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-emerald-700">Primary English Tuition</h3>
                <ul className="text-gray-600 space-y-2 mt-3">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <span>PSLE English exam preparation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <span>Composition writing skills</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <span>Comprehension techniques</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <span>Grammar and vocabulary building</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-blue-500 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-blue-700">Secondary & JC English</h3>
                <ul className="text-gray-600 space-y-2 mt-3">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>O Level & A Level English</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Essay writing and analysis</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Literature appreciation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Oral communication skills</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 6: Our Approach */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">Beyond Grammar – We Build Confident Communicators</h2>
          <p className="text-gray-700">
            Our English tutors don't just teach the syllabus – they inspire a love for the language. We carefully select tutors who excel in both academic excellence and communication skills, ensuring they can make complex concepts accessible and engaging for students of all levels.
          </p>
        </section>

        {/* Section 7: Testimonials */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">What Parents Say About Our English Tuition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <blockquote className="bg-gradient-to-br from-blue-50 to-emerald-50 p-6 rounded-xl border-l-4 border-l-emerald-500 shadow-md">
              <p className="italic mb-3">"My daughter's composition writing has improved tremendously. The tutor's feedback is always detailed and constructive."</p>
              <cite className="text-emerald-700 font-semibold">– Mrs Chen, Bukit Timah</cite>
            </blockquote>
            <blockquote className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl border-l-4 border-l-blue-500 shadow-md">
              <p className="italic mb-3">"The tutor's approach to teaching English Literature has made my son actually enjoy reading and analyzing texts."</p>
              <cite className="text-blue-700 font-semibold">– Mr Wong, Tampines</cite>
            </blockquote>
          </div>
        </section>

        {/* Section 8: Areas We Serve */}
        <section className="bg-gray-50 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4 text-blue-700">English Tuition Available Across Singapore</h2>
          <p className="text-gray-700 mb-4">
            Our network of qualified English tutors serves families island-wide, including:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <span className="bg-white px-3 py-2 rounded-lg shadow-sm border-l-2 border-l-blue-400">• Ang Mo Kio</span>
            <span className="bg-white px-3 py-2 rounded-lg shadow-sm border-l-2 border-l-emerald-400">• Bedok</span>
            <span className="bg-white px-3 py-2 rounded-lg shadow-sm border-l-2 border-l-purple-400">• Bishan</span>
            <span className="bg-white px-3 py-2 rounded-lg shadow-sm border-l-2 border-l-blue-400">• Bukit Timah</span>
            <span className="bg-white px-3 py-2 rounded-lg shadow-sm border-l-2 border-l-emerald-400">• Clementi</span>
            <span className="bg-white px-3 py-2 rounded-lg shadow-sm border-l-2 border-l-purple-400">• Hougang</span>
            <span className="bg-white px-3 py-2 rounded-lg shadow-sm border-l-2 border-l-blue-400">• Jurong</span>
            <span className="bg-white px-3 py-2 rounded-lg shadow-sm border-l-2 border-l-emerald-400">• Pasir Ris</span>
            <span className="bg-white px-3 py-2 rounded-lg shadow-sm border-l-2 border-l-purple-400">• Punggol</span>
            <span className="bg-white px-3 py-2 rounded-lg shadow-sm border-l-2 border-l-blue-400">• Sembawang</span>
            <span className="bg-white px-3 py-2 rounded-lg shadow-sm border-l-2 border-l-emerald-400">• Tampines</span>
            <span className="bg-white px-3 py-2 rounded-lg shadow-sm border-l-2 border-l-purple-400">• Woodlands</span>
          </div>
        </section>

        {/* Section 9: Call to Action */}
        <section className="text-center space-y-6 bg-gradient-to-r from-blue-600 to-emerald-600 text-white p-8 rounded-xl shadow-xl">
          <h2 className="text-3xl font-bold">Help Your Child Excel in English with Singapore's Best Tutors</h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">Tell us about your child's English learning needs, and we'll match you with a qualified, caring tutor who can make a real difference.</p>
          <Link href="/request-tutor" className="block w-full md:w-auto">
            <Button className="w-full md:w-auto text-lg px-4 md:px-8 py-4 bg-white text-blue-700 hover:bg-gray-100 font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
              Request an English Tutor Today
            </Button>
          </Link>
          <p className="text-sm text-blue-100 mt-3">Free service • No obligations • Results within 24 hours</p>
        </section>
      </div>
    </>
  );
} 