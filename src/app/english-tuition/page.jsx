import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// --- SEO & CONTENT DATA ---

const pageMetadata = {
  title: 'Expert English Tuition Singapore | PSLE, O & A Level Tutors',
  description: 'Unlock your child\'s potential with Singapore\'s top English tutors for PSLE, O-Level, and A-Level. Lion City Tutors offers a free, 24-hour matching service for qualified home tutors.',
  keywords: [
    'English tuition Singapore', 'PSLE English tutor', 'O level English tuition', 'A level English tutor',
    'H1 GP tuition', 'JC English tutor', 'private English tutor Singapore', 'home tuition English',
    'secondary English tuition', 'primary English tuition', 'english tutor rates singapore'
  ],
  url: 'https://www.lioncitytutors.com/english-tuition',
  imageUrl: 'https://www.lioncitytutors.com/images/english-tuition-og.webp', // Use a dedicated OG image
};

const faqData = [
  {
    question: "How do you select your English tutors?",
    answer: "We have a stringent selection process. Our English tutors are typically MOE-trained teachers, full-time tutors with years of experience, or top university graduates. We verify their academic qualifications and tutoring experience to ensure they can deliver results based on the latest MOE syllabus."
  },
  {
    question: "How quickly can we start the first lesson?",
    answer: "Our matching service is fast and efficient. After you submit a request, we typically find a suitable and qualified English tutor for you to review within 24 hours. The first lesson can often be arranged within a few days, depending on your and the tutor's availability."
  },
  {
    question: "What are the typical rates for English tuition?",
    answer: "Tuition rates vary depending on the tutor's qualifications and experience, and the student's level. Generally, rates range from $30/hr for Primary School to $80/hr or more for experienced JC A-Level tutors. Our team will provide you with specific quotes based on your requirements."
  },
  {
    question: "Is there a trial lesson?",
    answer: "While we don't offer free trial lessons, you are not locked into any long-term contract. You can decide whether to continue with the tutor after the first paid lesson. Our goal is to ensure a perfect match, and we can rematch you if you're not satisfied."
  }
];

// --- JSON-LD SCHEMA ---

const JsonLdSchema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.lioncitytutors.com" },
            { "@type": "ListItem", "position": 2, "name": "English Tuition", "item": pageMetadata.url }
          ]
        },
        {
          "@type": "Service",
          "name": "English Tuition Matching Service",
          "serviceType": "Tutoring",
          "provider": {
            "@type": "Organization",
            "name": "Lion City Tutors",
            "url": "https://www.lioncitytutors.com",
            "logo": "https://www.lioncitytutors.com/images/logo.webp"
          },
          "areaServed": {
            "@type": "Country",
            "name": "Singapore"
          },
          "description": "A free matching service connecting students with qualified private English tutors in Singapore for PSLE, O-Level, A-Level, and IP/IB curriculums.",
          "broker": {
            "@type": "Organization",
            "name": "Lion City Tutors"
          }
        },
        {
          "@type": "FAQPage",
          "mainEntity": faqData.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
        }
      ]
    })}}
  />
);

export const metadata = {
  title: pageMetadata.title,
  description: pageMetadata.description,
  keywords: pageMetadata.keywords,
  alternates: { canonical: pageMetadata.url },
  openGraph: {
    title: pageMetadata.title,
    description: pageMetadata.description,
    url: pageMetadata.url,
    type: 'website',
    images: [{ url: pageMetadata.imageUrl, alt: 'A student receiving English tuition in Singapore' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageMetadata.title,
    description: pageMetadata.description,
    images: [pageMetadata.imageUrl],
  },
};


export default function EnglishTuitionPage() {
  return (
    <>
      <JsonLdSchema />
      <div className="p-6 max-w-5xl mx-auto space-y-16">

        {/* Section 1: Hero */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800">Expert English Tuition in Singapore for PSLE, O & A Levels</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Struggling with composition, comprehension, or GP essays? Lion City Tutors connects you with <strong className="text-blue-700">MOE-trained teachers and top-tier tutors</strong> who deliver results. Get your ideal tutor match in 24 hours—<strong className="text-emerald-600">it's fast and completely free.</strong>
          </p>
          <div className="my-8 relative w-full max-w-3xl mx-auto aspect-video overflow-hidden rounded-xl shadow-lg">
            <Image
              src="/english-tuition_optimized.webp"
              alt="Students engaged in an English tuition lesson in Singapore"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <Link href="/request-tutor">
            <Button size="lg" className="text-lg px-8 py-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              Request Your English Tutor Now
            </Button>
          </Link>
        </section>

        {/* Section 2: Comprehensive Guides (High-Value Content) */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold text-center text-blue-800">Your Complete Guides to Acing English Exams</h2>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
            We don't just find tutors; we empower students. Dive into our expert-written guides covering syllabus breakdowns, scoring techniques, and common pitfalls for each major English examination in Singapore.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GuideCard
              level="PSLE English"
              description="Navigate the PSLE English exam with confidence. Master continuous writing, comprehension, and oral components."
              link="/psle-english"
              borderColor="border-t-blue-500"
              buttonColor="bg-blue-600 hover:bg-blue-700"
            />
            <GuideCard
              level="O-Level English"
              description="From summary writing to situational writing, our guide covers every paper to help you secure that A1."
              link="/o-level-english"
              borderColor="border-t-emerald-500"
              buttonColor="bg-emerald-600 hover:bg-emerald-700"
            />
            <GuideCard
              level="A-Level GP"
              description="Tackle complex essay questions and comprehension passages for the General Paper with our advanced strategies."
              link="/a-level-general-paper"
              borderColor="border-t-purple-500"
              buttonColor="bg-purple-600 hover:bg-purple-700"
            />
          </div>
        </section>

        {/* Section 3: Tackling Common English Challenges */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 text-center text-blue-800">Tackling Common English Challenges Head-On</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChallengeCard
              title="Primary & PSLE English"
              points={[
                "Building a strong vocabulary and grammar foundation.",
                "Developing creative and structured composition writing.",
                "Mastering comprehension cloze and synthesis techniques.",
                "Preparing for oral communication and listening exams."
              ]}
              icon="✍️"
            />
            <ChallengeCard
              title="Secondary, O-Level & A-Level GP"
              points={[
                "Crafting persuasive essays and argumentative responses.",
                "Analyzing complex literary texts for English Literature.",
                "Advanced summary and critical analysis skills.",
                "Developing clarity and confidence in oral presentations."
              ]}
              icon="📚"
            />
          </div>
        </section>

        {/* Section 4: Tuition Rates */}
        <section className="bg-gray-50 p-8 rounded-xl">
          <h2 className="text-3xl font-semibold mb-4 text-center text-blue-800">Transparent English Tuition Rates</h2>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-6">
            No hidden costs. Find a qualified English tutor that fits your budget. Rates are based on tutor experience and academic level.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-4 border-b-2 border-blue-200 font-semibold text-blue-800">Level</th>
                  <th className="p-4 border-b-2 border-blue-200 font-semibold text-blue-800">Part-Time Tutors</th>
                  <th className="p-4 border-b-2 border-blue-200 font-semibold text-blue-800">Full-Time Tutors / MOE Teachers</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-blue-50">
                  <td className="p-4 border-b border-gray-200">Primary School</td>
                  <td className="p-4 border-b border-gray-200">$30 - $45 / hr</td>
                  <td className="p-4 border-b border-gray-200">$45 - $65 / hr</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="p-4 border-b border-gray-200">Secondary School</td>
                  <td className="p-4 border-b border-gray-200">$35 - $50 / hr</td>
                  <td className="p-4 border-b border-gray-200">$50 - $80 / hr</td>
                </tr>
                <tr className="hover:bg-blue-50">
                  <td className="p-4 border-b border-gray-200">Junior College (JC)</td>
                  <td className="p-4 border-b border-gray-200">$50 - $70 / hr</td>
                  <td className="p-4 border-b border-gray-200">$70 - $120 / hr</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Why Parents Trust Us */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 text-center text-blue-800">The Lion City Tutors Advantage</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <AdvantageCard
              icon="🎯"
              title="Precision Matching"
              description="We don't just find any tutor. We find the right tutor for your child's specific needs and learning style."
            />
            <AdvantageCard
              icon="✅"
              title="Verified Tutors"
              description="All our tutors undergo a strict verification process for their qualifications and teaching experience."
            />
            <AdvantageCard
              icon="🚀"
              title="Fast & Free Service"
              description="Our matching service is 100% free. You only pay for the lessons conducted, directly to the tutor."
            />
          </div>
        </section>

        {/* Section 6: FAQ */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 text-center text-blue-800">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            {faqData.map((item, index) => (
              <AccordionItem value={`item-${index + 1}`} key={index}>
                <AccordionTrigger className="text-lg text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-base text-gray-700">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Section 7: Final CTA */}
        <section className="text-center space-y-6 bg-gradient-to-r from-blue-700 to-emerald-600 text-white p-8 md:p-12 rounded-xl shadow-2xl">
          <h2 className="text-3xl font-bold">Ready to Boost Your Child's English Grades?</h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">Let's find the perfect English tutor to build confidence and achieve academic excellence. The process is simple, fast, and completely free.</p>
          <Link href="/request-tutor">
            <Button size="lg" className="w-full md:w-auto text-lg px-8 py-6 bg-white text-blue-700 hover:bg-gray-100 font-bold rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              Get a Free Tutor Match
            </Button>
          </Link>
          <p className="text-sm text-blue-200 mt-3">No obligations • Verified tutors • Match within 24 hours</p>
        </section>
      </div>
    </>
  );
}


// --- HELPER COMPONENTS (Place these in your components folder) ---

const GuideCard = ({ level, description, link, borderColor, buttonColor }) => (
  <Card className={`border-t-4 ${borderColor} shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col`}>
    <CardContent className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{level}</h3>
      <p className="text-gray-600 mb-4 flex-grow">{description}</p>
      <Link href={link} className="mt-auto">
        <Button className={`${buttonColor} text-white w-full`}>Read The Guide</Button>
      </Link>
    </CardContent>
  </Card>
);

const ChallengeCard = ({ title, points, icon }) => (
  <Card className="shadow-lg">
    <CardContent className="p-6">
      <h3 className="font-bold text-xl text-blue-700 mb-3 flex items-center">
        <span className="text-2xl mr-3">{icon}</span> {title}
      </h3>
      <ul className="text-gray-600 space-y-2">
        {points.map((point, index) => (
          <li key={index} className="flex items-start">
            <span className="text-emerald-500 mr-2 mt-1">✓</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const AdvantageCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
    <div className="text-4xl mb-3">{icon}</div>
    <h3 className="font-bold text-lg text-blue-800">{title}</h3>
    <p className="text-gray-600 mt-2">{description}</p>
  </div>
);