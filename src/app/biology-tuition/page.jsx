import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: 'Best Biology Tuition Singapore | Secondary, JC H1/H2, IGCSE, IB Biology Tutors | Lion City Tutors',
  description: 'Top Biology tuition in Singapore. Improve your grades with our experienced tutors and proven methods.',
  keywords: ["biology tuition Singapore", "JC H2 biology tutor", "secondary biology tuition", "IGCSE biology tutor", "IB biology tuition", "cell biology tutor", "genetics Singapore", "A level biology tuition", "private biology tutor Singapore", "human physiology", "ecology", "molecular biology"],
  openGraph: {
    title: 'Best Biology Tuition Singapore | Secondary, JC H1/H2, IGCSE, IB Biology Tutors | Lion City Tutors',
    description: 'Top Biology tuition in Singapore. Improve your grades with our experienced tutors and proven methods.',
    url: 'https://www.lioncitytutors.com/biology-tuition',
    images: [
      {
        url: '/biology.webp',
        width: 800,
        height: 600,
        alt: 'Biology Tuition',
      },
    ],
    type: 'article',
  },
};

export default function BiologyTuition() {
  return (
    <>
      <div className="p-6 max-w-5xl mx-auto space-y-12">
        {/* Section 1: Hero with Image */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-green-800">Master Biology: Expert Tutors for Every Level in Singapore</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            From Secondary Pure/Combined Biology to JC H1/H2, IGCSE and IB Biology – our specialized tutors transform complex biological concepts including cell biology, genetics, human physiology, and ecology into clear, understandable knowledge.
          </p>
          
          <div className="my-8">
            <Image 
              src="/biology.webp" 
              alt="Biology tuition in Singapore - Students learning cell biology, genetics, and laboratory experiments"
              fill
              className="object-cover"
              sizes="100vw"
              placeholder="blur"
              blurDataURL="/biology.webp"
              priority
            />
          </div>
          
          <a href="/request-tutor">
            <Button className="text-lg px-8 py-4 mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
              Request a Biology Tutor
            </Button>
          </a>
        </section>

        {/* Section 2: Detailed Biology Levels and Syllabus Coverage */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 text-green-700 text-center">Complete Biology Tuition Coverage Across All Levels</h2>
          <p className="text-gray-700 mb-8 text-center max-w-3xl mx-auto">
            Our biology tutors are experts in Singapore's MOE curriculum and international programs, providing comprehensive coverage of all biology topics from cell structure to advanced molecular biology and biotechnology.
          </p>
          
          {/* Secondary Biology Detailed Section */}
          <div className="mb-12">
            <Card className="border-t-4 border-t-green-500 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl text-green-700 mb-4 flex items-center">
                  🌱 Secondary Biology (Pure & Combined)
                </h3>
                <p className="text-gray-600 mb-6">
                  Comprehensive coverage of O-Level and N-Level Biology syllabus with focus on living systems, biological processes, and practical skills essential for understanding life sciences.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-700 mb-2">Cell Biology & Organization</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Cell Structure & Function</li>
                      <li>• Cell Division & Growth</li>
                      <li>• Biological Molecules</li>
                      <li>• Enzymes & Metabolism</li>
                      <li>• Cell Membrane Transport</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-2">Human Systems</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Digestive System</li>
                      <li>• Respiratory System</li>
                      <li>• Circulatory System</li>
                      <li>• Excretory System</li>
                      <li>• Nervous & Endocrine Systems</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-700 mb-2">Genetics & Environment</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Reproduction & Development</li>
                      <li>• Heredity & Variation</li>
                      <li>• Photosynthesis & Respiration</li>
                      <li>• Ecology & Environment</li>
                      <li>• Organism Responses</li>
                    </ul>
                  </div>
                </div>
                
                <Link href="/o-level-biology" className="inline-block">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded-lg text-sm sm:text-base">
                    View O-Level Biology Guide
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* IGCSE Biology Detailed Section */}
          <div className="mb-12">
            <Card className="border-t-4 border-t-blue-500 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl text-blue-700 mb-4 flex items-center">
                  🌍 IGCSE Biology
                </h3>
                <p className="text-gray-600 mb-6">
                  International curriculum coverage with emphasis on practical skills, scientific inquiry, and comprehensive understanding of biological principles across cellular, organismal, and ecological levels.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-2">Living Organisms</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Characteristics & Classification</li>
                      <li>• Cells & Cell Processes</li>
                      <li>• Biological Molecules</li>
                      <li>• Enzymes & Their Functions</li>
                      <li>• Plant & Animal Nutrition</li>
                    </ul>
                  </div>
                  
                  <div className="bg-teal-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-teal-700 mb-2">Life Processes</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Transport in Plants & Animals</li>
                      <li>• Respiration & Gas Exchange</li>
                      <li>• Coordination & Response</li>
                      <li>• Reproduction & Development</li>
                      <li>• Inheritance & Selection</li>
                    </ul>
                  </div>
                  
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-indigo-700 mb-2">Environment & Evolution</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Organisms & Environment</li>
                      <li>• Feeding Relationships</li>
                      <li>• Cycles in Nature</li>
                      <li>• Human Impact on Environment</li>
                      <li>• Biotechnology & Genetic Engineering</li>
                    </ul>
                  </div>
                </div>
                
                <Link href="/igcse-biology" className="inline-block">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg text-sm sm:text-base">
                    View IGCSE Biology Guide
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* JC Biology Detailed Section */}
          <div className="mb-12">
            <Card className="border-t-4 border-t-purple-500 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl text-purple-700 mb-4 flex items-center">
                  🎓 JC H1/H2 Biology
                </h3>
                <p className="text-gray-600 mb-6">
                  Advanced level biology covering molecular mechanisms, complex physiological processes, and cutting-edge biotechnology applications with university-preparation depth and research methodology training.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-700 mb-2">Molecular & Cell Biology</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Biological Molecules & Enzymes</li>
                      <li>• Cell Structure & Function</li>
                      <li>• Cell Membrane & Transport</li>
                      <li>• Cell Division & Cell Cycle</li>
                      <li>• Cellular Respiration</li>
                    </ul>
                  </div>
                  
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-pink-700 mb-2">Genetics & Molecular Biology</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• DNA Structure & Replication</li>
                      <li>• Gene Expression & Regulation</li>
                      <li>• Classical & Molecular Genetics</li>
                      <li>• Genetic Engineering</li>
                      <li>• Gene Technology Applications</li>
                    </ul>
                  </div>
                  
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-indigo-700 mb-2">Advanced Topics (H2)</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Plant Biology & Photosynthesis</li>
                      <li>• Animal Physiology</li>
                      <li>• Ecology & Evolution</li>
                      <li>• Applications of Biology</li>
                      <li>• Immunology & Disease</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-700 italic">
                    <strong>Additional H2 Topics:</strong> Advanced Molecular Biology techniques, Bioinformatics applications, Population Biology, Conservation Biology, Bioethics, and Laboratory Research Skills.
                  </p>
                </div>
                
                <Link href="/a-level-biology" className="inline-block">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg text-sm sm:text-base">
                    View A-Level Biology Guide
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* IBDP Biology Detailed Section */}
          <div className="mb-12">
            <Card className="border-t-4 border-t-teal-500 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardContent className="p-8">
                <h3 className="font-bold text-2xl text-teal-700 mb-4 flex items-center">
                  🌐 IB Diploma Programme Biology (HL/SL)
                </h3>
                <p className="text-gray-600 mb-6">
                  International Baccalaureate biology with inquiry-based learning, internal assessments, extended essay support, and connections to current biological research and global challenges.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="bg-teal-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-teal-700 mb-2">Core Topics</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Cell Biology & Cell Theory</li>
                      <li>• Molecular Biology</li>
                      <li>• Genetics & Heredity</li>
                      <li>• Ecology & Conservation</li>
                      <li>• Evolution & Biodiversity</li>
                    </ul>
                  </div>
                  
                  <div className="bg-cyan-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-cyan-700 mb-2">Advanced Concepts</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Human Physiology</li>
                      <li>• Nucleic Acids & Proteins</li>
                      <li>• Cell Respiration & Photosynthesis</li>
                      <li>• Plant Biology (HL Only)</li>
                      <li>• Animal Physiology (HL Only)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-emerald-700 mb-2">Option Topics & IA</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Neurobiology & Behavior</li>
                      <li>• Biotechnology & Bioinformatics</li>
                      <li>• Ecology & Conservation</li>
                      <li>• Human Physiology</li>
                      <li>• Internal Assessment Support</li>
                    </ul>
                  </div>
                </div>
                
                <Link href="/ibdp-biology" className="inline-block">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg text-sm sm:text-base">
                    View IBDP Biology Guide
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 3: Biology Topics We Specialize In */}
        <section className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl">
          <h2 className="text-3xl font-semibold mb-6 text-green-700 text-center">Biology Topics Our Expert Tutors Master</h2>
          <p className="text-gray-700 mb-8 text-center max-w-3xl mx-auto">
            Our tutors specialize in breaking down complex biological concepts into manageable, understandable segments with practical examples, visual demonstrations, and exam-focused problem-solving strategies.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-green-700 mb-3">🧬 Cell Biology & Genetics</h3>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>• Cell Structure & Organelles</li>
                <li>• Cell Division & Mitosis</li>
                <li>• DNA Structure & Replication</li>
                <li>• Gene Expression & Regulation</li>
                <li>• Inheritance Patterns</li>
                <li>• Genetic Engineering</li>
                <li>• Molecular Biology Techniques</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-blue-700 mb-3">🫀 Human Physiology</h3>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>• Digestive System Function</li>
                <li>• Respiratory & Gas Exchange</li>
                <li>• Circulatory System</li>
                <li>• Nervous System & Brain</li>
                <li>• Endocrine System & Hormones</li>
                <li>• Immune System & Disease</li>
                <li>• Homeostasis & Regulation</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-purple-700 mb-3">🌿 Ecology & Evolution</h3>
              <ul className="text-gray-700 space-y-1 text-sm">
                <li>• Ecosystem Structure & Function</li>
                <li>• Food Chains & Energy Flow</li>
                <li>• Population Dynamics</li>
                <li>• Evolution & Natural Selection</li>
                <li>• Biodiversity & Conservation</li>
                <li>• Environmental Impact</li>
                <li>• Climate Change Biology</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: What Makes Our Biology Tutors Different */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 text-green-700 text-center">Why LionCity's Biology Tutors Excel in Singapore</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-green-700 mb-3">🔬 Laboratory Skills Mastery</h3>
              <p className="text-gray-700 mb-4">
                Our tutors excel at teaching essential laboratory techniques including microscopy, experimental design, data collection, and analysis. Students learn proper scientific methodology, safety procedures, and how to draw valid conclusions from experimental observations.
              </p>
              
              <h3 className="text-xl font-bold text-blue-700 mb-3">🧠 Conceptual Understanding First</h3>
              <p className="text-gray-700 mb-4">
                Rather than memorizing biological facts, our approach focuses on understanding underlying principles and processes. Students learn to connect molecular mechanisms to cellular functions, physiological processes, and ecological interactions.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-purple-700 mb-3">🌟 Real-World Biology Applications</h3>
              <p className="text-gray-700 mb-4">
                We connect biological concepts to current research, medical applications, and environmental challenges. This approach helps students understand the relevance of biology in fields like medicine, biotechnology, conservation, and public health.
              </p>
              
              <h3 className="text-xl font-bold text-green-700 mb-3">🎯 Exam Strategy Specialization</h3>
              <p className="text-gray-700">
                Our tutors are experts in Singapore's biology examination formats, teaching students effective strategies for essay questions, data analysis problems, practical assessments, and application questions that appear in MOE, Cambridge, and IB biology papers.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Outstanding Results */}
        <section className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl">
          <h2 className="text-3xl font-semibold mb-4 text-green-700 text-center">Proven Biology Tuition Results in Singapore</h2>
          <p className="text-gray-700 mb-6 text-center max-w-3xl mx-auto">
            Our biology tutors have helped hundreds of Singapore students achieve remarkable grade improvements across all levels and curricula:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🏆</span>
                <div>
                  <strong className="text-green-700">Rachel (JC2 - VJC):</strong> Improved from C grade to A in H2 Biology in 5 months with intensive molecular biology focus and genetics problem-solving mastery
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🧬</span>
                <div>
                  <strong className="text-blue-700">Kevin (Sec 4 - ACS):</strong> Jumped from E8 to B3 in O Level Biology after mastering cell biology, human systems, and practical skills through systematic approach
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🌟</span>
                <div>
                  <strong className="text-purple-700">Priya (IB Year 2 - ACS International):</strong> Achieved 7/7 in IB Biology HL with mastery of ecology, genetics, and successful completion of Internal Assessment investigation
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <strong className="text-green-700">James (IGCSE - ISS):</strong> Scored A* in IGCSE Biology after overcoming difficulties with plant biology, inheritance patterns, and ecological concepts
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Why Choose Us */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 text-green-700 text-center">Why Singapore Families Choose Us for Biology Tuition</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-l-green-500 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-green-700">Biology Degree Specialists</h3>
                <p className="text-gray-600 mt-2">All our biology tutors hold relevant degrees in Biology, Life Sciences, Biomedical Sciences, or related fields with extensive teaching experience in Singapore's MOE and international curricula.</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-blue-500 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-blue-700">Practical Skills Focused Approach</h3>
                <p className="text-gray-600 mt-2">We emphasize hands-on learning, laboratory techniques, and scientific methodology rather than rote memorization, ensuring students can conduct experiments and analyze biological data with confidence.</p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-purple-500 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-purple-700">Multi-Curriculum Expertise</h3>
                <p className="text-gray-600 mt-2">Whether your child is in local MOE schools, international schools, or private institutions, our tutors are well-versed in different biology curricula and examination requirements.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 7: Teaching Methods */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 text-green-700 text-center">Our Proven Biology Teaching Methods</h2>
          
          {/* ANOTHER IMAGE PLACEHOLDER 
          <div className="my-6">
            <img 
              src="/biology-teaching-methods.webp" 
              alt="Interactive biology teaching methods with microscopes, diagrams, and laboratory demonstrations for better understanding"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
              loading="lazy"
            />
          </div>
          */}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-green-700 mb-3">🔬 Laboratory Skills & Techniques</h3>
                <p className="text-gray-700">
                  Biology success requires practical laboratory skills. Our tutors ensure students are comfortable with microscopy, experimental design, data collection, statistical analysis, and drawing valid conclusions from biological investigations.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-blue-700 mb-3">📊 Data Analysis & Graph Interpretation</h3>
                <p className="text-gray-700">
                  Students learn to analyze biological data, interpret graphs and charts, calculate statistical measures, and understand experimental variables. These skills are crucial for both practical assessments and theory examinations.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-purple-700 mb-3">🎯 Visual Learning & Models</h3>
                <p className="text-gray-700">
                  Complex biological processes become clearer through visual aids, 3D models, and interactive diagrams. We use molecular models, anatomical charts, and digital simulations to help students visualize cellular processes, physiological systems, and ecological relationships.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-green-700 mb-3">💡 Case Studies & Real Examples</h3>
                <p className="text-gray-700">
                  We use current medical cases, environmental issues, and biological research to make abstract concepts relatable and memorable. This approach helps students understand the practical applications of biological knowledge in healthcare, research, and conservation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Testimonials */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-green-700">Success Stories from Biology Students</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <blockquote className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl border-l-4 border-l-green-500 shadow-md">
              <p className="italic mb-3">"My son was struggling with genetics and molecular biology until he met his biology tutor. The clear explanations and practical examples made everything click. He improved from D to A in H2 Biology!"</p>
              <cite className="text-green-700 font-semibold">– Mrs Lim, Tampines</cite>
            </blockquote>
            <blockquote className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-xl border-l-4 border-l-blue-500 shadow-md">
              <p className="italic mb-3">"The biology tutor explained cell biology and human physiology so clearly. My daughter finally understood complex concepts and her O-Level Biology grades improved from E8 to B3!"</p>
              <cite className="text-blue-700 font-semibold">– Mr Tan</cite>
            </blockquote>
          </div>
        </section>

        {/* Section 9: Service Areas */}
        <section className="bg-gray-50 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">Biology Tuition Available Island-Wide</h2>
          <p className="text-gray-700 mb-4">
            Our experienced biology tutors serve families across Singapore with specialized expertise in cell biology, genetics, human physiology, and ecology:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <span className="bg-white px-3 py-2 rounded-lg shadow-sm border-l-2 border-l-green-400">• Ang Mo Kio</span>
            <span className="bg-white px-3 py-2 rounded-lg shadow-sm border-l-2 border-l-blue-400">• Bedok</span>
            <span className="bg-white px-3 py-2 rounded-lg shadow-sm border-l-2 border-l-green-400">• Bishan</span>
            <span className="bg-white px-3 py-2 rounded-lg shadow-sm border-l-2 border-l-blue-400">• Bukit Timah</span>
            <span className="bg-white px-3 py-2 rounded-lg shadow-sm border-l-2 border-l-green-400">• Clementi</span>
            <span className="bg-white px-3 py-2 rounded-lg shadow-sm border-l-2 border-l-blue-400">• Hougang</span>
            <span className="bg-white px-3 py-2 rounded-lg shadow-sm border-l-2 border-l-green-400">• Jurong West</span>
            <span className="bg-white px-3 py-2 rounded-lg shadow-sm border-l-2 border-l-blue-400">• Marine Parade</span>
            <span className="bg-white px-3 py-2 rounded-lg shadow-sm border-l-2 border-l-green-400">• Pasir Ris</span>
            <span className="bg-white px-3 py-2 rounded-lg shadow-sm border-l-2 border-l-blue-400">• Punggol</span>
            <span className="bg-white px-3 py-2 rounded-lg shadow-sm border-l-2 border-l-green-400">• Sembawang</span>
            <span className="bg-white px-3 py-2 rounded-lg shadow-sm border-l-2 border-l-blue-400">• Tampines</span>
            <span className="bg-white px-3 py-2 rounded-lg shadow-sm border-l-2 border-l-green-400">• Toa Payoh</span>
            <span className="bg-white px-3 py-2 rounded-lg shadow-sm border-l-2 border-l-blue-400">• Woodlands</span>
            <span className="bg-white px-3 py-2 rounded-lg shadow-sm border-l-2 border-l-green-400">• Yishun</span>
            <span className="bg-white px-3 py-2 rounded-lg shadow-sm border-l-2 border-l-blue-400">• Serangoon</span>
          </div>
        </section>

        {/* Section 10: Biology Tuition FAQ */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-green-700 text-center">Frequently Asked Questions About Biology Tuition</h2>
          <div className="space-y-4">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-green-700 mb-2">What makes biology tuition different from other subjects?</h3>
                <p className="text-gray-700">Biology requires a unique combination of conceptual understanding, memorization, and practical skills. Our tutors focus on building strong foundations in cell biology, genetics, and human physiology while developing laboratory skills and scientific methodology essential for success.</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-blue-700 mb-2">How do you help students with biology practical assessments?</h3>
                <p className="text-gray-700">Our tutors provide comprehensive training in experimental skills, microscopy techniques, data analysis, and scientific drawing. Students learn proper laboratory procedures, safety protocols, and how to draw valid conclusions from biological investigations required for MOE, IGCSE, and IB biology practicals.</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg text-green-700 mb-2">Can biology tutors help with both JC H1 and H2 Biology?</h3>
                <p className="text-gray-700">Yes, our tutors are qualified to teach both H1 and H2 Biology levels. H2 Biology covers more advanced topics like molecular genetics, biotechnology, and immunology, while H1 focuses on core concepts. We customize our approach based on your syllabus requirements.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Section 11: Final CTA */}
        <section className="bg-gradient-to-br from-green-600 to-blue-600 text-white p-6 sm:p-8 rounded-xl text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Ready to Excel in Biology?</h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto">
            Connect with our specialized biology tutors who make complex concepts clear and help you achieve your academic goals.
          </p>
          <Link 
            href="/request-tutor" 
            className="inline-block bg-white text-green-600 hover:bg-gray-100 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition duration-300"
          >
            Request a Biology Tutor
          </Link>
          <p className="text-xs sm:text-sm text-green-100 mt-2">Free matching service • Biology specialists • Proven grade improvements</p>
        </section>
      </div>

    </>
  );
}