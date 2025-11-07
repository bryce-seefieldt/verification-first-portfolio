import Link from 'next/link'
import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { siteConfig } from '@/site.config'
import { GitFork, Clock, FileText, CheckCircle2, ExternalLink, Download } from 'lucide-react'

export const metadata = {
  title: 'Work Trials',
  description: 'Fork-ready project proposals with evaluation criteria and success metrics',
}

const workTrials = [
  {
    title: 'AI Agent Evaluation Harness',
    description:
      'Build a comprehensive evaluation framework for LLM agents with custom metrics, datasets, and reporting.',
    duration: '5-7 days',
    difficulty: 'intermediate' as const,
    deliverables: [
      'Evaluation harness with 3+ metric types',
      'Dataset generation utilities',
      'Interactive results dashboard',
      'Documentation with examples',
    ],
    criteria: [
      'Test coverage ≥ 90%',
      'Response time < 200ms',
      'Clear metric definitions',
      'Reproducible results',
    ],
    githubTemplate: `${siteConfig.repo.url}/tree/main/templates/eval-harness`,
    tags: ['AI', 'Testing', 'TypeScript'],
  },
  {
    title: 'Blockchain Provenance Anchoring',
    description:
      'Implement a system to anchor build artifacts on-chain with cryptographic verification and explorer integration.',
    duration: '7-10 days',
    difficulty: 'advanced' as const,
    deliverables: [
      'Smart contract for artifact hashing',
      'CLI tool for anchoring builds',
      'Verification API endpoint',
      'Explorer UI for provenance lookup',
    ],
    criteria: [
      'Gas cost < $0.50 per anchor',
      'Verification time < 5s',
      'Support for 3+ artifact types',
      'Tamper-proof audit trail',
    ],
    githubTemplate: `${siteConfig.repo.url}/tree/main/templates/provenance-anchor`,
    tags: ['Blockchain', 'Security', 'Solidity'],
  },
  {
    title: 'RAG Pipeline with Evals',
    description:
      'Design a retrieval-augmented generation system with evaluation-first approach and comprehensive testing.',
    duration: '4-6 days',
    difficulty: 'intermediate' as const,
    deliverables: [
      'RAG pipeline with vector search',
      'Evaluation dataset (100+ examples)',
      'Accuracy/latency benchmarks',
      'A/B testing framework',
    ],
    criteria: [
      'Retrieval accuracy ≥ 95%',
      'End-to-end latency < 500ms',
      'Hallucination rate < 5%',
      'Cost per query < $0.01',
    ],
    githubTemplate: `${siteConfig.repo.url}/tree/main/templates/rag-pipeline`,
    tags: ['RAG', 'LLMs', 'Python'],
  },
  {
    title: 'Incident Response Automation',
    description:
      'Create an AI-powered incident triage and response system with runbook automation and verification.',
    duration: '6-8 days',
    difficulty: 'advanced' as const,
    deliverables: [
      'Incident classification model',
      'Automated runbook executor',
      'Verification checkpoints',
      'MTTR metrics dashboard',
    ],
    criteria: [
      'Classification accuracy ≥ 92%',
      'MTTR reduction ≥ 30%',
      'Zero false positives in production',
      'Audit trail for all actions',
    ],
    githubTemplate: `${siteConfig.repo.url}/tree/main/templates/incident-automation`,
    tags: ['DevOps', 'AI', 'Automation'],
  },
]

const difficultyColors = {
  beginner: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  intermediate: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  advanced: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
}

export default function WorkTrialsPage() {
  return (
    <>
      <PageHeader
        title="Work Trials"
        description="Fork-ready project proposals with evaluation criteria and success metrics. Each template includes pre-defined evals, deliverables, and verification checkpoints."
      />

      <Section>
        {/* Introduction */}
        <Card className="border-brand-200 dark:border-brand-800 mb-12 border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitFork className="h-5 w-5" />
              How Work Trials Work
            </CardTitle>
            <CardDescription>
              Each trial is a real-world project scenario with clear success criteria
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h4 className="mb-2 flex items-center gap-2 font-semibold">
                  <span className="bg-brand-600 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                    1
                  </span>
                  Fork Template
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Start with a GitHub template that includes evaluation harness and success criteria
                </p>
              </div>
              <div>
                <h4 className="mb-2 flex items-center gap-2 font-semibold">
                  <span className="bg-brand-600 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                    2
                  </span>
                  Build & Verify
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Implement the solution while continuously running evals to validate progress
                </p>
              </div>
              <div>
                <h4 className="mb-2 flex items-center gap-2 font-semibold">
                  <span className="bg-brand-600 flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white">
                    3
                  </span>
                  Submit Results
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Share your implementation with evaluation results and provenance proof
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Proposal Template */}
        <Card className="mb-12 border-zinc-200 dark:border-zinc-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Work Trial Proposal Template
            </CardTitle>
            <CardDescription>
              Download a structured one-pager template for work trial proposals
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              This template includes sections for scope definition, acceptance tests, data
              requirements, SLA commitments, fee structure, and NDA terms. Use it to create clear,
              actionable proposals for custom work trials.
            </p>
            <div className="flex items-center gap-3">
              <Button asChild>
                <Link
                  href={`${siteConfig.repo.url}/blob/main/content/work-trials/_proposal-template.mdx`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2 h-4 w-4" />
                  View Template
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link
                  href={`${siteConfig.repo.url}/raw/main/content/work-trials/_proposal-template.mdx`}
                  download
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download MDX
                </Link>
              </Button>
            </div>
            <div className="rounded-md border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-900">
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                <strong>Includes:</strong> Scope, Acceptance Tests, Data Needs, SLA, Fee Structure,
                NDA Terms, Timeline
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Work Trials Grid */}
        <div className="space-y-6">
          {workTrials.map((trial) => (
            <Card key={trial.title} className="border-zinc-200 dark:border-zinc-800">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{trial.title}</CardTitle>
                    <CardDescription>{trial.description}</CardDescription>
                  </div>
                  <Badge className={difficultyColors[trial.difficulty]}>{trial.difficulty}</Badge>
                </div>
                <div className="flex items-center gap-4 pt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {trial.duration}
                  </div>
                  <div className="flex gap-2">
                    {trial.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Deliverables */}
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 font-semibold">
                      <FileText className="h-4 w-4" />
                      Deliverables
                    </h4>
                    <ul className="space-y-2">
                      {trial.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                        >
                          <span className="text-brand-600 dark:text-brand-400 mt-0.5">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Success Criteria */}
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 font-semibold">
                      <CheckCircle2 className="h-4 w-4" />
                      Success Criteria
                    </h4>
                    <ul className="space-y-2">
                      {trial.criteria.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
                  <Button asChild>
                    <Link href={trial.githubTemplate} target="_blank" rel="noopener noreferrer">
                      <GitFork className="mr-2 h-4 w-4" />
                      Fork Template
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link
                      href={`mailto:${siteConfig.social.email}?subject=Work Trial: ${trial.title}`}
                    >
                      Discuss Project
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <Card className="border-brand-200 dark:border-brand-800 from-brand-50 dark:from-brand-950 mt-12 border-2 bg-linear-to-br to-white dark:to-zinc-900">
          <CardContent className="space-y-4 p-8 text-center">
            <h3 className="text-2xl font-bold">Custom Work Trial</h3>
            <p className="mx-auto max-w-2xl text-zinc-600 dark:text-zinc-300">
              Have a specific project in mind? Let&apos;s design a custom work trial with evaluation
              criteria tailored to your needs.
            </p>
            <Button asChild size="lg">
              <Link href={`mailto:${siteConfig.social.email}?subject=Custom Work Trial`}>
                Propose Custom Trial
              </Link>
            </Button>
          </CardContent>
        </Card>
      </Section>
    </>
  )
}
