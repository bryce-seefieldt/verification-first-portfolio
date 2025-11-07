import { getCaseStudySlugs } from '@/lib/mdx'
import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { FeaturedCaseStudyCard } from '@/app/components/features/FeaturedCaseStudyCard'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { BarChart3, CheckCircle2, Clock } from 'lucide-react'

export const metadata = {
  title: 'Case Studies',
  description: 'Verified AI engineering projects with measurable outcomes and cryptographic provenance',
}

// Mock data - in production, this would come from MDX frontmatter
const caseStudiesData = [
  {
    title: 'Incident Response Copilot',
    summary:
      'Built an AI-powered incident response system with verification at every step. Reduced MTTR by 40%.',
    date: '2024-10-15',
    status: 'verified' as const,
    href: '/case-studies/incident-copilot',
    metrics: {
      coverage: '94%',
      mttr: '-40%',
    },
    tags: ['AI', 'DevOps', 'Testing'],
  },
  {
    title: 'Evaluation-First RAG Pipeline',
    summary:
      'Designed retrieval system with evaluation harness before writing code. Achieved 98% accuracy.',
    date: '2024-09-20',
    status: 'verified' as const,
    href: '/case-studies/eval-first-rag',
    metrics: {
      accuracy: '98%',
      latency: '120ms',
    },
    tags: ['RAG', 'Evaluation', 'LLMs'],
  },
  {
    title: 'Blockchain Provenance Anchor',
    summary:
      'Implemented on-chain verification system for build artifacts. 100% tamper-proof audit trail.',
    date: '2024-08-12',
    status: 'verified' as const,
    href: '/case-studies/blockchain-anchor',
    metrics: {
      uptime: '99.9%',
      cost: '$0.12/tx',
    },
    tags: ['Blockchain', 'Security', 'Web3'],
  },
  {
    title: 'Agent Observability Platform',
    summary:
      'Created real-time monitoring system for LLM agents. Detected anomalies 3x faster than baseline.',
    date: '2024-07-08',
    status: 'in-progress' as const,
    href: '/case-studies/agent-observability',
    metrics: {
      latency: '50ms',
      alerts: '+300%',
    },
    tags: ['Observability', 'AI', 'Monitoring'],
  },
]

// Calculate aggregate stats
const totalProjects = caseStudiesData.length
const verifiedProjects = caseStudiesData.filter((cs) => cs.status === 'verified').length
const avgCoverage = '94%' // Would calculate from real data

export default async function CaseStudiesPage() {
  // In production: const slugs = await getCaseStudySlugs()
  // Then fetch frontmatter for each slug

  return (
    <>
      <PageHeader
        title="Case Studies"
        description="Verified AI engineering projects with measurable outcomes and cryptographic provenance"
      />

      {/* Stats Overview */}
      <Section>
        <div className="grid gap-4 md:grid-cols-3 mb-12">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900">
                <BarChart3 className="h-6 w-6 text-brand-600 dark:text-brand-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalProjects}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Projects</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{verifiedProjects}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Verified</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">{avgCoverage}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Avg Coverage</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge variant="default">All</Badge>
          <Badge variant="outline">AI</Badge>
          <Badge variant="outline">RAG</Badge>
          <Badge variant="outline">Blockchain</Badge>
          <Badge variant="outline">DevOps</Badge>
          <Badge variant="outline">Security</Badge>
        </div>

        {/* Case Studies Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {caseStudiesData.map((study) => (
            <FeaturedCaseStudyCard key={study.href} {...study} />
          ))}
        </div>
      </Section>
    </>
  )
}
