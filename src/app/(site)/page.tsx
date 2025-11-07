import { CaseStudy } from "@/app/lib/types";
import { CaseStudyCard } from "@/app/components/features/CaseStudyCard";

const mockCaseStudies: CaseStudy[] = [
  {
    id: "cs-1",
    title: "Portfolio Architecture",
    description: "Building a verification-first portfolio with Next.js and Tailwind v4",
    technologies: ["Next.js", "TypeScript", "Tailwind v4"],
    evaluationCriteria: ["Structure", "DX", "Performance"],
    results: [
      { criterion: "Structure", passed: true, timestamp: new Date(), score: 1 },
      { criterion: "DX", passed: true, timestamp: new Date(), score: 1 },
      { criterion: "Performance", passed: false, timestamp: new Date(), score: 0 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "cs-2",
    title: "Content Pipeline",
    description: "MDX-driven content strategy with ADRs and logs",
    technologies: ["MDX", "Contentlayer (future)", "Utilities"],
    evaluationCriteria: ["MDX", "Automation", "Docs"],
    results: [
      { criterion: "MDX", passed: true, timestamp: new Date(), score: 1 },
      { criterion: "Automation", passed: false, timestamp: new Date(), score: 0 },
      { criterion: "Docs", passed: true, timestamp: new Date(), score: 1 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "cs-3",
    title: "Evaluation Harness",
    description: "Automated verification and reporting of functionality",
    technologies: ["Node", "TypeScript", "Harness"],
    evaluationCriteria: ["Coverage", "Reporting", "Ease of Use"],
    results: [
      { criterion: "Coverage", passed: false, timestamp: new Date(), score: 0 },
      { criterion: "Reporting", passed: true, timestamp: new Date(), score: 1 },
      { criterion: "Ease of Use", passed: true, timestamp: new Date(), score: 1 },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Verification-First <span className="text-brand-600">Portfolio</span>
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Rigorous development with testing, evaluation, and transparent docs.
        </p>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Case Studies</h2>
          <a href="#" className="text-sm text-brand-600 hover:underline">
            View all
          </a>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockCaseStudies.map(cs => (
            <CaseStudyCard key={cs.id} caseStudy={cs} />
          ))}
        </div>
      </section>

      <section className="prose max-w-none">
        <h2>Why verification-first?</h2>
        <p>
          This portfolio uses evaluation-driven development to ensure changes are measurable
          and decisions are documented through ADRs. The goal is clarity, confidence, and speed.
        </p>
      </section>
    </div>
  );
}
