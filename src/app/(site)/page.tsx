// app/(site)/page.tsx
import Link from 'next/link'
import { Section } from '@/components/Section'
import { FeaturedCaseStudyCard } from '@/app/components/features/FeaturedCaseStudyCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { siteConfig } from '@/site.config'
import { ArrowRight, CheckCircle2, Shield, BarChart3, FileText } from 'lucide-react'

const featuredCaseStudies = [
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
  },
]

export default function Home() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <Section className="pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <Badge variant="outline" className="w-fit">
                {siteConfig.author.name} | {siteConfig.author.title}
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Verification-First
                <span className="text-brand-600 dark:text-brand-400 block">
                  Development Portfolio
                </span>
              </h1>
              <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-300">
                {siteConfig.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/case-studies">
                  View Case Studies
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/provenance">How It Works</Link>
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>Verified Builds</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-600" />
                <span>On-Chain Provenance</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-end">
            <Card className="border-brand-200 dark:border-brand-800 w-full max-w-md border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="text-brand-600 dark:text-brand-400 h-5 w-5" />
                  Live Evaluation Status
                </CardTitle>
                <CardDescription>Real-time verification metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">Test Coverage</span>
                  <Badge variant="default">94%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">Eval Pass Rate</span>
                  <Badge variant="default">98%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">Build Status</span>
                  <Badge className="bg-green-600">Passing</Badge>
                </div>
                <Button asChild variant="link" className="mt-2 w-full p-0">
                  <Link href="/evals">View All Evaluations →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* Features Grid */}
      <Section>
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold">Why Verification-First?</h2>
          <p className="mx-auto max-w-2xl text-zinc-600 dark:text-zinc-300">
            Traditional development writes code first, then tests. Verification-first defines
            success criteria before implementation.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {siteConfig.features.map((feature) => (
            <Card key={feature.title} className="border-zinc-200 dark:border-zinc-800">
              <CardHeader>
                <div className="mb-3 text-4xl">{feature.icon}</div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Featured Case Studies */}
      <Section>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold">Featured Work</h2>
            <p className="text-zinc-600 dark:text-zinc-300">
              Real-world applications of verification-first development
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link href="/case-studies">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featuredCaseStudies.map((study) => (
            <FeaturedCaseStudyCard key={study.href} {...study} />
          ))}
        </div>
      </Section>

      {/* Verify Explainer */}
      <Section>
        <Card className="border-brand-200 dark:border-brand-800 from-brand-50 dark:from-brand-950 border-2 bg-linear-to-br to-white dark:to-zinc-900">
          <CardHeader className="pb-8 text-center">
            <CardTitle className="mb-3 text-3xl font-bold">How Verification Works</CardTitle>
            <CardDescription className="mx-auto max-w-2xl text-base">
              Every artifact in this portfolio is cryptographically signed and can be independently
              verified
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-8 grid gap-6 md:grid-cols-3">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-600 flex h-10 w-10 items-center justify-center rounded-full font-bold text-white">
                    1
                  </div>
                  <h3 className="font-semibold">Define Criteria</h3>
                </div>
                <p className="pl-13 text-sm text-zinc-600 dark:text-zinc-400">
                  Success metrics and evaluation harnesses are created before any implementation
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-600 flex h-10 w-10 items-center justify-center rounded-full font-bold text-white">
                    2
                  </div>
                  <h3 className="font-semibold">Build & Test</h3>
                </div>
                <p className="pl-13 text-sm text-zinc-600 dark:text-zinc-400">
                  Implementation is validated continuously against defined criteria with automated
                  evals
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-brand-600 flex h-10 w-10 items-center justify-center rounded-full font-bold text-white">
                    3
                  </div>
                  <h3 className="font-semibold">Prove & Deploy</h3>
                </div>
                <p className="pl-13 text-sm text-zinc-600 dark:text-zinc-400">
                  Results are cryptographically signed and anchored on-chain for immutable
                  provenance
                </p>
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link href="/provenance">
                  <FileText className="mr-2 h-4 w-4" />
                  Learn More
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/evals">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Live Evals
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* CTA Section */}
      <Section className="text-center">
        <div className="mx-auto max-w-2xl space-y-6">
          <h2 className="text-3xl font-bold">Ready to Work Together?</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-300">
            Explore work trial templates, review my evaluation results, or learn about my disaster
            recovery practices
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/work-trials">View Work Trials</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">About Me</Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  )
}
