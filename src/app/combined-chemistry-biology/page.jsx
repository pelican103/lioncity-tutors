import Link from 'next/link';
import Image from 'next/image';
import chembioImage from "../../../public/combined-chemistry-biology.webp";

export const metadata = {
  title:
    'Combined Chemistry + Biology: Master N Level Combined Science (N(A)) — Matter & Life Integrated | LionCity Tutors',
  description:
    'Comprehensive N(A) Combined Chemistry–Biology guide for Secondary 4 students in Singapore. Accurate syllabi, integration strategies, sample questions, practical tips, and exam-focused techniques to secure strong O-Level results.',
  keywords: [
    'Combined Chemistry Biology Singapore',
    'N Level Chemistry Biology integration',
    'Combined Science N(A) Chemistry Biology',
    'Sec 4 N(A) Combined Science guide',
    'Singapore O Level chemistry biology tips',
    'LionCity Tutors chemistry biology'
  ],
  openGraph: {
    title: 'Combined Chemistry + Biology (N(A)) — Matter & Life Integrated',
    description:
      'Master Chemical reactions and Biological processes for N(A) Combined Science. Practical examples, exam strategies, and Singapore contexts.',
    url: 'https://www.lioncitytutors.com/combined-chemistry-biology',
    type: 'article'
  },
  alternates: {
    canonical: 'https://www.lioncitytutors.com/combined-chemistry-biology'
  }
};

export default function CombinedChemBioNA() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="px-4 py-12 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-800 mb-4">Combined Chemistry/Biology N(A): Matter & Life — Integrated Mastery</h1>

        <div className="flex items-center space-x-4 mb-8">
          <div>
            <p className="font-semibold text-gray-800">By Victor, Combined Chemistry/Biology Tutor</p>
            <p className="text-sm text-gray-500">Updated August 26, 2025 • N(A) Combined Science • 20+ min read</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl mb-8 border-l-4 border-indigo-400">
          <h3 className="text-lg font-bold text-indigo-800 mb-2">🔬 Matter & Life — Why this pairing works</h3>
          <p className="text-indigo-700">
            Combined Chemistry–Biology is all about <span className="font-bold">how chemical reactions power life</span>. In Sec 4 N(A), you will link chemical equations, reaction energy and rates, and the chemistry of molecules to biological processes like respiration,
            digestion and photosynthesis. This guide focuses on exactly what's tested in N(A) — accurate topics, clear examples, and exam-winning structures.
          </p>
        </div>

         <div className="my-8 relative w-full max-w-4xl mx-auto overflow-hidden rounded-xl shadow-lg"> 
               <Image 
                 src={chembioImage}
                 alt="Singapore students conducting integrated science experiments in Combined Science laboratory"
                 width={1400} 
                 height={933}
                 className="w-full h-auto rounded-xl shadow-lg"
                 sizes="(max-width: 768px) 100vw, 1024px" 
                 placeholder="blur"
                 priority
               />
        </div>

        <article className="space-y-8 text-gray-700 leading-relaxed">

          <section className="bg-emerald-50 p-6 rounded-lg border-l-4 border-emerald-400">
            <h2 className="text-2xl font-semibold text-emerald-800 mb-3">🎯 Who benefits most from Combined Chemistry + Biology?</h2>
            <p className="mb-4">
              This combination is ideal for students curious about healthcare, nutrition, environmental science, forensic science and laboratory-based careers. It emphasizes the chemistry of molecules together with biological function — a practical pathway to polytechnic diplomas and technical health careers.
            </p>
            <div className="bg-white p-5 rounded-lg">
              <h4 className="font-semibold text-emerald-700 mb-3">Typical pathways this supports:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Bullet>Biomedical & allied health foundations</Bullet>
                  <Bullet>Food science & nutrition</Bullet>
                  <Bullet>Environmental monitoring roles</Bullet>
                </div>
                <div className="space-y-2">
                  <Bullet>Laboratory technician basics</Bullet>
                  <Bullet>Pharmacy support roles</Bullet>
                  <Bullet>Agricultural tech & plant science</Bullet>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">📚 Syllabus-Aligned Topics (Sec 4 N(A))</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-5 rounded-lg border-l-4 border-blue-400">
                <h3 className="font-semibold text-blue-800 mb-3">Chemistry Topics (N(A))</h3>
                <ul className="text-sm space-y-1 list-inside list-disc">
                  <li>Kinetic Particle Theory</li>
                  <li>Atomic Structure</li>
                  <li>Chemical Bonding (Ionic, Covalent, Metallic basics)</li>
                  <li>Chemical Formulae & Equations</li>
                  <li>Acids, Bases & Salts — properties and neutralisation</li>
                  <li>The Periodic Table — trends and group properties</li>
                  <li>Chemical Reactions: Rates & Energy changes (exothermic/endothermic)</li>
                  <li>Air & Atmosphere basics (pollutants & composition)</li>
                  <li>Simple Organic Chemistry: alkanes, alkenes, alcohols (basic reactions)</li>
                </ul>
              </div>

              <div className="bg-green-50 p-5 rounded-lg border-l-4 border-green-400">
                <h3 className="font-semibold text-green-800 mb-3">Biology Topics (N(A))</h3>
                <ul className="text-sm space-y-1 list-inside list-disc">
                  <li>Cell Structure and Organisation</li>
                  <li>Movement of Substances (diffusion, osmosis, active transport)</li>
                  <li>Biological Molecules (carbohydrates, proteins, lipids)</li>
                  <li>Nutrition in Humans (digestive system, balanced diet)</li>
                  <li>Transport in Humans (blood, heart and circulation)</li>
                  <li>Respiration in Humans (aerobic & anaerobic)</li>
                  <li>Infectious Diseases in Humans (pathogens and immunity basics)</li>
                  <li>Nutrition and Transport in Flowering Plants (photosynthesis, transpiration)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">🧪 Assessment Overview & Exam Rhythm</h2>

            <div className="bg-indigo-50 p-5 rounded-lg mb-4">
              <h3 className="font-semibold text-indigo-800 mb-3">Paper Structure (general guide)</h3>
              <div className="bg-white p-4 rounded-lg text-sm">
                <ul className="space-y-2">
                  <li>• Each subject typically has a multiple-choice (MCQ) paper and a structured paper.</li>
                  <li>• MCQs test recall and quick application (definitions, simple computations, data interpretation).</li>
                  <li>• Structured questions assess explanation, experimental design, data handling, and integration across chemistry and biology.</li>
                </ul>
                <p className="text-xs text-gray-500 mt-3">Tip: check your school’s exam paper layout — marks and timings can vary. Practise both content recall and extended answers.</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg border-l-4 border-yellow-400">
              <h4 className="font-semibold text-yellow-700 mb-3">⏱️ Session Management (Suggested)</h4>
              <div className="bg-yellow-50 p-3 rounded text-sm">
                <p className="mb-2"><strong>Order:</strong> Begin with your stronger subject’s MCQ → its Structured paper → then the other subject’s MCQ and Structured.</p>
                <p className="mb-2"><strong>MCQ pacing:</strong> target 1–1.5 minutes per question, flag and return if unsure.</p>
                <p className="mb-0"><strong>Structured answers:</strong> Always define key terms, show simple calculations with units, and link chemistry and biology when required.</p>
              </div>
            </div>
          </section>

          <section className="bg-violet-50 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold text-violet-800 mb-4">⚡ Integration Patterns: Where Chemistry Meets Biology</h2>
            <p className="mb-4">High-scoring integrated answers explain the chemical basis of biological processes. Use the following short patterns for exam-ready links.</p>

            <div className="space-y-6">
              <div className="bg-white p-5 rounded-lg border-l-4 border-pink-400">
                <h3 className="text-xl font-semibold text-pink-700 mb-3">🔗 Core Integration Patterns</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-pink-600 mb-2">Respiration & Energy (Chemistry of Life)</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Aerobic respiration: C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6O<sub>2</sub> → 6CO<sub>2</sub> + 6H<sub>2</sub>O + energy.</li>
                      <li>• Link energy release to muscular activity, temperature regulation, and ATP production (conceptually).</li>
                      <li>• Differentiate between aerobic (more ATP) and anaerobic (less ATP, lactic acid/ethanol) pathways at the N(A) level.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-pink-600 mb-2">Enzymes & Rates of Reaction</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Enzymes are biological catalysts — they lower activation energy and speed up reactions without being used up.</li>
                      <li>• Chemistry: factors affecting rate (temperature, concentration, surface area, catalysts) map to biological factors (enzyme denaturation, substrate availability).</li>
                      <li>• Practical tip: Use collision theory language in exams—more collisions = faster reaction.</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-pink-600 mb-2">Acids, Digestion & pH</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Stomach acid (HCl) creates an acidic environment for pepsin to work—acid chemistry matters for enzyme activity.</li>
                      <li>• pH changes affect enzyme shape and rate; explain using acid/base definitions and conjugate pairs at a conceptual level.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-pink-600 mb-2">Photosynthesis & Chemical Transformations</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Photosynthesis: 6CO<sub>2</sub> + 6H<sub>2</sub>O → C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6O<sub>2</sub> (light energy ↔ chemical energy).</li>
                      <li>• Chemistry of light absorption, chlorophyll as pigment, and role of wavelength (visible light) link to energy capture.</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-pink-600 mb-2">Organic Molecules & Cell Structure</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Lipids in membranes (hydrophobic tails) and proteins as structural/functional molecules — connect chemical structure to biological role.</li>
                      <li>• Carbohydrates as energy sources; relate chemical formulae to biological use.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-pink-600 mb-2">Atmosphere & Human Health</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Air pollutants (SO<sub>2</sub>, NO<sub>x</sub>, PM) chemistry links to respiratory disease and public health concerns.</li>
                      <li>• Use local Singapore examples (PSI/NEA alerts) to strengthen answers.</li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </section>

          <section className="bg-teal-50 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold text-teal-800 mb-4">🇸🇬 Singapore Contexts & Applications</h2>
            <p className="mb-4">Exam questions reward localised examples. Use Singapore-relevant cases to demonstrate understanding.</p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-teal-700 mb-2">Healthcare & Public Health</h4>
                <div className="space-y-3">
                  <Context title="Hospital Sterilisation">
                    Chemical disinfectants and sterilisation procedures (chlorine, alcohols) and how they prevent infection in clinical settings.
                  </Context>
                  <Context title="Air Quality (NEA)">
                    Chemistry of pollutants and biological impact on asthma and respiratory illnesses; discuss basic preventive measures.
                  </Context>
                  <Context title="Food & Nutrition">
                    Understanding food labels (macronutrients, energy values) and how chemistry affects digestion and nutrient absorption.
                  </Context>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-teal-700 mb-2">Environment & Agriculture</h4>
                <div className="space-y-3">
                  <Context title="Vertical Farming">
                    Light wavelength selection, nutrient solutions chemistry, and plant transport under controlled environments.
                  </Context>
                  <Context title="Water Treatment">
                    Chemical coagulation, filtration, and biological safety in NEWater and municipal systems — high-level connections only.
                  </Context>
                  <Context title="Vector Control (Dengue)">
                    How breeding site chemistry and environmental management reduces mosquito populations and disease spread.
                  </Context>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-red-700 mb-4">📈 Mastery Map: What to prioritise</h2>

            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                <h3 className="font-bold text-red-700 mb-2">🧪 Chemistry Priorities</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-red-600">Foundation</h4>
                    <ul className="space-y-1">
                      <li>• Units, particle model, atomic structure</li>
                      <li>• Formula writing & balancing equations</li>
                      <li>• Periodic table element groups</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600">Core</h4>
                    <ul className="space-y-1">
                      <li>• Acids & bases concepts</li>
                      <li>• Reaction energetics (exo/endo)</li>
                      <li>• Rates of reaction factors</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600">Applied</h4>
                    <ul className="space-y-1">
                      <li>• Air pollutant chemistry</li>
                      <li>• Organic basics (identification & simple reactions)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                <h3 className="font-bold text-green-700 mb-2">🌿 Biology Priorities</h3>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-green-600">Cell & Molecules</h4>
                    <ul className="space-y-1">
                      <li>• Organelles & their functions</li>
                      <li>• Biological molecules properties</li>
                      <li>• Membrane transport mechanisms</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-600">Human Systems</h4>
                    <ul className="space-y-1">
                      <li>• Nutrition, digestion & enzymes</li>
                      <li>• Circulatory & respiratory interactions</li>
                      <li>• Infectious disease basics & prevention</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-600">Plants & Ecology</h4>
                    <ul className="space-y-1">
                      <li>• Photosynthesis & transpiration</li>
                      <li>• Plant transport & adaptations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-orange-50 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold text-orange-800 mb-4">🎯 A1 Strategies & Examiner-Focused Tips</h2>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border-l-3 border-green-400">
                <h3 className="font-semibold text-green-700 mb-2">🥇 Integration Answer Structure</h3>
                <ul className="text-sm space-y-2">
                  <li><strong>1) State the chemistry:</strong> Name the chemical reaction or molecule (e.g., hydrolysis, HCl, ATP).</li>
                  <li><strong>2) Link to biology:</strong> Explain how that chemistry affects the biological function (e.g., enzyme activity, nutrient absorption).</li>
                  <li><strong>3) Apply locally:</strong> Give a short local example when relevant (e.g., NEA air quality impact on asthma).</li>
                  <li><strong>4) Conclude:</strong> One final sentence tying chemistry to biological outcome.</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-3 border-blue-400">
                <h3 className="font-semibold text-blue-700 mb-2">🥈 Practical & Data Handling</h3>
                <ul className="text-sm space-y-1">
                  <li>• Always list variables and controls in experiments.</li>
                  <li>• Use correct units for chemistry calculations and label graph axes in biology practicals.</li>
                  <li>• When discussing errors, link them to chemical/biological causes (e.g., contamination, incomplete reaction, evaporation).</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg border-l-3 border-purple-400">
                <h3 className="font-semibold text-purple-700 mb-2">🥉 Common Examiner Traps</h3>
                <ul className="text-sm space-y-1">
                  <li>• Vague answers: say ‘diffusion’ not just ‘movement’.</li>
                  <li>• Missing units: chemistry marks are often lost for unit mistakes.</li>
                  <li>• Incorrect pH reasoning: link pH changes to enzyme activity explicitly.</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">✏️ Sample Questions & Model Answers</h2>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">Q1 (Structured): Explain how temperature affects the rate of enzyme-catalysed digestion in the human small intestine. (4 marks)</h4>
                <div className="text-sm text-gray-700">
                  <p><strong>Model answer:</strong></p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Enzymes are proteins that catalyse digestion by lowering activation energy.</li>
                    <li>As temperature rises, particles have more kinetic energy so collisions between enzyme and substrate increase, increasing rate (1–2 marks).</li>
                    <li>At high temperatures, enzymes denature (change shape) and active site is lost, decreasing rate (1 mark).</li>
                    <li>Conclusion: rate increases with temperature until optimum, then falls due to denaturation (1 mark).</li>
                  </ol>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">Q2 (Integration): Using chemical equations, explain the roles of glucose and oxygen in aerobic respiration and why vigorous exercise increases breathing rate. (6 marks)</h4>
                <div className="text-sm text-gray-700">
                  <p><strong>Model answer:</strong></p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Aerobic respiration: C<sub>6</sub>H<sub>12</sub>O<sub>6</sub> + 6O<sub>2</sub> → 6CO<sub>2</sub> + 6H<sub>2</sub>O + energy. Glucose is oxidised and oxygen acts as the final electron acceptor.</li>
                    <li>Energy released (in form of ATP) is used by muscles during exercise; more ATP required → higher respiration rate.</li>
                    <li>To supply oxygen and remove CO<sub>2</sub>, breathing and heart rate increase, increasing gas exchange at alveoli and oxygen delivery to muscles.</li>
                    <li>Conclusion linking chemistry to biology: chemical breakdown of glucose provides energy which drives increased physiological activity, hence increased breathing.</li>
                  </ol>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">Q3 (MCQ style practice)</h4>
                <p className="text-sm">Which of the following statements is correct?</p>
                <ol className="list-decimal list-inside text-sm space-y-1">
                  <li>(A) Enzymes are used up in reactions. (B) Increasing substrate concentration always increases enzyme rate indefinitely. (C) Photosynthesis stores light energy in chemical bonds. (D) Acidic conditions speed up all enzyme reactions.</li>
                </ol>
                <p className="text-sm mt-2"><strong>Answer:</strong> (C) — photosynthesis stores light energy in chemical bonds. (A false; enzymes are not used up. B false; plateau occurs. D false; enzyme activity depends on specific pH.)</p>
              </div>

            </div>
          </section>

          <section className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-xl text-center">
            <h2 className="text-3xl font-bold text-indigo-800 mb-4">🚀 Your Chemistry–Biology Mastery Plan</h2>
            <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
              Combine clear chemical explanations with accurate biological terms. Practise integrated questions weekly, simulate timed papers, and use local examples to score higher in your N(A) Combined Science papers.
            </p>

            <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
              <h3 className="font-semibold text-indigo-700 mb-4">Quick revision checklist</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <ul className="space-y-1 text-left">
                    <li>• Balanced equations for respiration & photosynthesis</li>
                    <li>• Key organic groups: alcohols, alkenes</li>
                    <li>• pH effects on enzymes</li>
                    <li>• Particle model and diffusion basics</li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-1 text-left">
                    <li>• Identify variables in practicals</li>
                    <li>• Units and conversions for chemistry calculations</li>
                    <li>• Common pathogens and prevention methods</li>
                    <li>• Photosynthesis factors and leaf adaptations</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">❓ Frequently Asked Questions</h2>
            <div className="space-y-4">
              <FAQ q="Should I memorise chemical equations?" a="Yes: memorise the core equations (photosynthesis, respiration, neutralisation). But focus on being able to explain what each part of the equation means." />
              <FAQ q="How can I improve in practical skills?" a="Practice by writing step-by-step methods, listing variables and controls, and explaining likely sources of error and improvements." />
              <FAQ q="How to link chemistry in biology answers?" a="Always name the chemical (or reaction), explain its role in the biological process, and finish with the biological consequence." />
            </div>
          </section>

          <section className="bg-emerald-800 text-white p-6 rounded-xl mt-8">
            <h3 className="text-lg font-semibold mb-2">🔬 Check out similar N-Level resources</h3>
            <p className="text-sm">Explore our curated guides to deepen your understanding and excel in your studies.</p>
            <div className="mt-4 pt-4 border-t border-emerald-700">
                <div className="grid grid-cols-3 gap-6 text-center">
                <Link
                    href="/combined-science-overview"
                    className="px-3 py-2 bg-emerald-700 rounded text-sm hover:bg-emerald-600 transition-colors"
                >
                    Overview Guide
                </Link>
                <Link
                    href="/combined-physics-biology"
                    className="px-3 py-2 bg-emerald-700 rounded text-sm hover:bg-emerald-600 transition-colors"
                >
                    Combined Physics–Biology
                </Link>
                <Link
                    href="/combined-chemistry-physics"
                    className="px-3 py-2 bg-emerald-700 rounded text-sm hover:bg-emerald-600 transition-colors"
                >
                    Combined Chemistry–Physics
                </Link>
                </div>
            </div>
          </section>
            <section className="bg-gradient-to-br from-green-600 to-blue-600 text-white p-6 sm:p-8 rounded-xl text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold">Ready to Excel in Combined Chemistry/Biology?</h2>
            <p className="text-base sm:text-lg max-w-2xl mx-auto">
                Connect with our specialized combined chemistry/biology tutors who make complex concepts clear and help you achieve your academic goals.
            </p>
            <Link 
                href="/request-tutor" 
                className="inline-block bg-white text-green-600 hover:bg-gray-100 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition duration-300"
            >
                Request a Combined Chemistry/Biology Tutor
            </Link>
            <p className="text-xs sm:text-sm text-green-100 mt-2">Free matching service • Combined Chemistry/Biology specialists • Proven grade improvements</p>
            </section>
        </article>
      </main>
    </>
  );
}

// --- Small UI helpers ---
function Bullet({ children }) {
  return (
    <div className="flex items-center space-x-2">
      <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
      <span className="text-sm">{children}</span>
    </div>
  );
}

function Context({ title, children }) {
  return (
    <div className="border-l-4 border-teal-300 pl-3">
      <h5 className="font-semibold text-teal-600">{title}</h5>
      <p className="text-sm text-gray-600">{children}</p>
    </div>
  );
}

function FAQ({ q, a }) {
  return (
    <div className="bg-white p-4 rounded-lg">
      <h4 className="font-semibold text-gray-700 mb-2">Q: {q}</h4>
      <p className="text-sm">{a}</p>
    </div>
  );
}

// Schema for SEO
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    'Combined Chemistry + Biology (N(A)): Master N Level Combined Science — Matter & Life Integrated',
  description:
    'Comprehensive N(A) Combined Chemistry–Biology guide for Secondary 4 students in Singapore. Accurate syllabi, integration strategies, sample questions, practical tips, and exam-focused techniques to secure strong O-Level results.',
  author: {
    "@type": "Person",
    name: 'Victor',
    jobTitle: 'Chemistry–Biology Tutor',
    worksFor: { "@type": "Organization", name: 'LionCity Tutors' }
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: 'Should I memorise chemical equations?',
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Yes: memorise the core equations (photosynthesis, respiration, neutralisation). But focus on being able to explain what each part of the equation means.'
      }
    },
    {
      "@type": "Question",
      name: 'How can I improve in practical skills?',
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Practice by writing step-by-step methods, listing variables and controls, and explaining likely sources of error and improvements.'
      }
    }
  ]
};
