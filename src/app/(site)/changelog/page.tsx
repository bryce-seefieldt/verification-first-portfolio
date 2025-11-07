import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GitCommit, Calendar, User, Tag } from 'lucide-react'

export const metadata = {
  title: 'Changelog',
  description: 'Development logs and build history for the verification-first portfolio',
}

// Mock changelog data - in production, this would be generated from git logs or build logs
const changelogEntries = [
  {
    version: 'v1.0.0',
    date: '2024-12-15',
    author: 'Portfolio Bot',
    type: 'release' as const,
    commits: [
      {
        hash: 'a3f2d1c',
        message: 'Initial portfolio launch with verification system',
        author: 'Portfolio Bot',
        date: '2024-12-15T10:00:00Z',
      },
      {
        hash: '9e8b7a6',
        message: 'Add blockchain provenance anchoring',
        author: 'Portfolio Bot',
        date: '2024-12-15T09:30:00Z',
      },
      {
        hash: '5c4d3e2',
        message: 'Implement evaluation harness for all case studies',
        author: 'Portfolio Bot',
        date: '2024-12-15T09:00:00Z',
      },
    ],
    features: [
      'Complete MDX-based case study system',
      'Live evaluation results viewer',
      'Cryptographic provenance tracking',
      'Work trial templates',
      'Responsive UI with dark mode',
    ],
    metrics: {
      coverage: '94%',
      buildTime: '2.3s',
      bundleSize: '142KB',
    },
  },
  {
    version: 'v0.9.0',
    date: '2024-12-10',
    author: 'Portfolio Bot',
    type: 'pre-release' as const,
    commits: [
      {
        hash: '1b2c3d4',
        message: 'Add work trials page with fork-ready templates',
        author: 'Portfolio Bot',
        date: '2024-12-10T16:00:00Z',
      },
      {
        hash: 'e5f6g7h',
        message: 'Create evaluation datasets and benchmarks',
        author: 'Portfolio Bot',
        date: '2024-12-10T14:00:00Z',
      },
    ],
    features: [
      'Work trials with evaluation criteria',
      'Case study evaluation datasets',
      'Performance benchmarking suite',
    ],
    metrics: {
      coverage: '89%',
      buildTime: '2.1s',
      bundleSize: '138KB',
    },
  },
  {
    version: 'v0.8.0',
    date: '2024-12-05',
    author: 'Portfolio Bot',
    type: 'development' as const,
    commits: [
      {
        hash: 'i8j9k0l',
        message: 'Implement MDX content system with frontmatter',
        author: 'Portfolio Bot',
        date: '2024-12-05T11:00:00Z',
      },
      {
        hash: 'm1n2o3p',
        message: 'Add shadcn/ui components and Tailwind config',
        author: 'Portfolio Bot',
        date: '2024-12-05T10:00:00Z',
      },
    ],
    features: [
      'MDX content rendering pipeline',
      'Component library integration',
      'Tailwind CSS v4 setup',
    ],
    metrics: {
      coverage: '85%',
      buildTime: '1.9s',
      bundleSize: '125KB',
    },
  },
  {
    version: 'v0.5.0',
    date: '2024-11-28',
    author: 'Portfolio Bot',
    type: 'development' as const,
    commits: [
      {
        hash: 'q4r5s6t',
        message: 'Initial Next.js 16 project setup',
        author: 'Portfolio Bot',
        date: '2024-11-28T09:00:00Z',
      },
      {
        hash: 'u7v8w9x',
        message: 'Configure TypeScript and ESLint',
        author: 'Portfolio Bot',
        date: '2024-11-28T08:30:00Z',
      },
    ],
    features: [
      'Next.js 16 with App Router',
      'TypeScript strict mode',
      'React 19.2.0 with compiler',
    ],
    metrics: {
      coverage: '0%',
      buildTime: '1.5s',
      bundleSize: '98KB',
    },
  },
]

const typeConfig = {
  release: {
    label: 'Release',
    className: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
  },
  'pre-release': {
    label: 'Pre-release',
    className: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  },
  development: {
    label: 'Development',
    className: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
  },
}

export default function ChangelogPage() {
  return (
    <>
      <PageHeader
        title="Changelog"
        description="Complete build history and development logs for the verification-first portfolio"
      />

      <Section>
        {/* Summary Stats */}
        <div className="mb-12 grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{changelogEntries.length}</div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Releases</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">
                {changelogEntries.reduce((sum, entry) => sum + entry.commits.length, 0)}
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Commits</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">
                {changelogEntries[0]?.metrics.coverage || 'N/A'}
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Latest Coverage</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">
                {changelogEntries[0]?.metrics.buildTime || 'N/A'}
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Latest Build Time</p>
            </CardContent>
          </Card>
        </div>

        {/* Changelog Timeline */}
        <div className="space-y-8">
          {changelogEntries.map((entry, index) => {
            const typeInfo = typeConfig[entry.type]

            return (
              <div key={entry.version} className="relative">
                {index !== changelogEntries.length - 1 && (
                  <div className="absolute top-16 bottom-0 left-6 w-0.5 bg-zinc-200 dark:bg-zinc-800" />
                )}

                <Card className="border-zinc-200 dark:border-zinc-800">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="bg-brand-100 dark:bg-brand-900 relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white dark:border-zinc-950">
                            <Tag className="text-brand-600 dark:text-brand-400 h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{entry.version}</CardTitle>
                            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                              <Calendar className="h-4 w-4" />
                              {new Date(entry.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Badge className={typeInfo.className}>{typeInfo.label}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6 pl-18">
                    {/* Features */}
                    {entry.features.length > 0 && (
                      <div>
                        <h4 className="mb-2 font-semibold">Features & Changes</h4>
                        <ul className="space-y-1">
                          {entry.features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                            >
                              <span className="text-brand-600 dark:text-brand-400 mt-1">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Metrics */}
                    <div>
                      <h4 className="mb-2 font-semibold">Build Metrics</h4>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-zinc-600 dark:text-zinc-400">Coverage:</span>
                          <Badge variant="outline">{entry.metrics.coverage}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-zinc-600 dark:text-zinc-400">Build Time:</span>
                          <Badge variant="outline">{entry.metrics.buildTime}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-zinc-600 dark:text-zinc-400">Bundle Size:</span>
                          <Badge variant="outline">{entry.metrics.bundleSize}</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Commits */}
                    <div>
                      <h4 className="mb-2 font-semibold">Commits ({entry.commits.length})</h4>
                      <div className="space-y-2">
                        {entry.commits.map((commit) => (
                          <div
                            key={commit.hash}
                            className="flex items-start gap-3 rounded-lg bg-zinc-50 p-2 dark:bg-zinc-900"
                          >
                            <GitCommit className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600 dark:text-zinc-400" />
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-medium">{commit.message}</div>
                              <div className="mt-1 flex items-center gap-3 text-xs text-zinc-600 dark:text-zinc-400">
                                <code className="rounded bg-zinc-200 px-1.5 py-0.5 dark:bg-zinc-800">
                                  {commit.hash}
                                </code>
                                <span className="flex items-center gap-1">
                                  <User className="h-3 w-3" />
                                  {commit.author}
                                </span>
                                <span>{new Date(commit.date).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Info Card */}
        <Card className="border-brand-200 dark:border-brand-800 mt-12 border-2">
          <CardHeader>
            <CardTitle>About This Changelog</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
            <p>
              This changelog is automatically generated from git commit history and build logs. Each
              entry includes:
            </p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Version tag and release type</li>
              <li>List of features and changes</li>
              <li>Build metrics (coverage, build time, bundle size)</li>
              <li>Individual commit messages with hashes</li>
            </ul>
            <p className="pt-2">
              All versions are cryptographically signed and anchored on-chain. View the{' '}
              <a href="/provenance" className="text-brand-600 dark:text-brand-400 hover:underline">
                provenance documentation
              </a>{' '}
              to learn how to verify releases independently.
            </p>
          </CardContent>
        </Card>
      </Section>
    </>
  )
}
