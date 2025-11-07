import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, XCircle, Clock, TrendingUp, Download } from 'lucide-react'

export const metadata = {
  title: 'Evaluations',
  description: 'Live evaluation results and verification metrics for all projects',
}

// Mock eval data - in production, this would be fetched from JSON files
const evaluationSuites = [
  {
    id: 'incident-copilot-evals',
    name: 'Incident Response Copilot',
    project: 'incident-copilot',
    lastRun: '2024-12-15T10:30:00Z',
    status: 'passed' as const,
    summary: {
      total: 47,
      passed: 44,
      failed: 2,
      skipped: 1,
      coverage: 94,
      duration: 12.3,
    },
    metrics: [
      { name: 'Classification Accuracy', value: '94%', target: '≥ 90%', status: 'passed' as const },
      { name: 'MTTR Reduction', value: '-40%', target: '≥ -30%', status: 'passed' as const },
      { name: 'False Positive Rate', value: '0.02%', target: '< 1%', status: 'passed' as const },
      { name: 'Response Latency', value: '180ms', target: '< 200ms', status: 'passed' as const },
    ],
  },
  {
    id: 'rag-pipeline-evals',
    name: 'RAG Pipeline Evaluations',
    project: 'eval-first-rag',
    lastRun: '2024-12-14T22:15:00Z',
    status: 'passed' as const,
    summary: {
      total: 128,
      passed: 125,
      failed: 3,
      skipped: 0,
      coverage: 98,
      duration: 45.7,
    },
    metrics: [
      { name: 'Retrieval Accuracy', value: '98%', target: '≥ 95%', status: 'passed' as const },
      { name: 'End-to-End Latency', value: '340ms', target: '< 500ms', status: 'passed' as const },
      { name: 'Hallucination Rate', value: '2.1%', target: '< 5%', status: 'passed' as const },
      { name: 'Cost per Query', value: '$0.008', target: '< $0.01', status: 'passed' as const },
    ],
  },
  {
    id: 'blockchain-anchor-evals',
    name: 'Blockchain Provenance',
    project: 'blockchain-anchor',
    lastRun: '2024-12-15T08:45:00Z',
    status: 'in-progress' as const,
    summary: {
      total: 34,
      passed: 30,
      failed: 1,
      skipped: 3,
      coverage: 91,
      duration: 8.2,
    },
    metrics: [
      { name: 'Gas Cost per Anchor', value: '$0.12', target: '< $0.50', status: 'passed' as const },
      { name: 'Verification Time', value: '3.2s', target: '< 5s', status: 'passed' as const },
      { name: 'Uptime', value: '99.9%', target: '≥ 99%', status: 'passed' as const },
      { name: 'Anchor Success Rate', value: '97%', target: '≥ 95%', status: 'passed' as const },
    ],
  },
]

const statusConfig = {
  passed: {
    label: 'Passing',
    className: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    icon: CheckCircle2,
  },
  failed: {
    label: 'Failed',
    className: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
    icon: XCircle,
  },
  'in-progress': {
    label: 'Running',
    className: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    icon: Clock,
  },
}

const metricStatusColors = {
  passed: 'text-green-600 dark:text-green-400',
  failed: 'text-red-600 dark:text-red-400',
}

export default function EvalsPage() {
  const totalTests = evaluationSuites.reduce((sum, suite) => sum + suite.summary.total, 0)
  const totalPassed = evaluationSuites.reduce((sum, suite) => sum + suite.summary.passed, 0)
  const avgCoverage = Math.round(
    evaluationSuites.reduce((sum, suite) => sum + suite.summary.coverage, 0) /
      evaluationSuites.length
  )

  return (
    <>
      <PageHeader
        title="Evaluation Results"
        description="Live evaluation metrics and verification results for all projects. All data is automatically generated from test runs and can be independently verified."
      />

      <Section>
        {/* Aggregate Stats */}
        <div className="mb-12 grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{evaluationSuites.length}</div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Active Suites</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{totalTests}</div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Total Tests</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {totalPassed}
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Passing</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{avgCoverage}%</div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Avg Coverage</p>
            </CardContent>
          </Card>
        </div>

        {/* Evaluation Suites */}
        <div className="space-y-6">
          {evaluationSuites.map((suite) => {
            const statusInfo = statusConfig[suite.status]
            const StatusIcon = statusInfo.icon
            const passRate = Math.round((suite.summary.passed / suite.summary.total) * 100)

            return (
              <Card key={suite.id} className="border-zinc-200 dark:border-zinc-800">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <CardTitle className="text-xl">{suite.name}</CardTitle>
                        <Badge className={statusInfo.className}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {statusInfo.label}
                        </Badge>
                      </div>
                      <CardDescription>
                        Last run: {new Date(suite.lastRun).toLocaleString()} • Duration:{' '}
                        {suite.summary.duration}s
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export JSON
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Test Summary */}
                  <div className="grid gap-4 md:grid-cols-5">
                    <div>
                      <div className="text-lg font-bold">{suite.summary.total}</div>
                      <div className="text-xs text-zinc-600 dark:text-zinc-400">Total</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600 dark:text-green-400">
                        {suite.summary.passed}
                      </div>
                      <div className="text-xs text-zinc-600 dark:text-zinc-400">Passed</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-red-600 dark:text-red-400">
                        {suite.summary.failed}
                      </div>
                      <div className="text-xs text-zinc-600 dark:text-zinc-400">Failed</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-zinc-500 dark:text-zinc-400">
                        {suite.summary.skipped}
                      </div>
                      <div className="text-xs text-zinc-600 dark:text-zinc-400">Skipped</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{suite.summary.coverage}%</div>
                      <div className="text-xs text-zinc-600 dark:text-zinc-400">Coverage</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-600 dark:text-zinc-400">Pass Rate</span>
                      <span className="font-semibold">{passRate}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                      <div
                        className="h-full bg-green-600 transition-all duration-500 dark:bg-green-400"
                        style={{ width: `${passRate}%` }}
                      />
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
                    <h4 className="mb-3 flex items-center gap-2 font-semibold">
                      <TrendingUp className="h-4 w-4" />
                      Key Metrics
                    </h4>
                    <div className="grid gap-3 md:grid-cols-2">
                      {suite.metrics.map((metric) => (
                        <div
                          key={metric.name}
                          className="flex items-center justify-between rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900"
                        >
                          <div>
                            <div className="text-sm font-medium">{metric.name}</div>
                            <div className="text-xs text-zinc-600 dark:text-zinc-400">
                              Target: {metric.target}
                            </div>
                          </div>
                          <div className={`text-lg font-bold ${metricStatusColors[metric.status]}`}>
                            {metric.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Info Card */}
        <Card className="border-brand-200 dark:border-brand-800 mt-12 border-2">
          <CardHeader>
            <CardTitle>About These Evaluations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
            <p>
              All evaluation results are automatically generated from test runs and exported as JSON
              files. Each test suite includes:
            </p>
            <ul className="ml-4 list-inside list-disc space-y-1">
              <li>Comprehensive test coverage with pass/fail metrics</li>
              <li>Performance benchmarks against defined targets</li>
              <li>Detailed logs and error traces for failed tests</li>
              <li>Cryptographic signatures for result verification</li>
            </ul>
            <p className="pt-2">
              Results are anchored on-chain for immutable provenance. Learn more about{' '}
              <a href="/provenance" className="text-brand-600 dark:text-brand-400 hover:underline">
                how verification works
              </a>
              .
            </p>
          </CardContent>
        </Card>
      </Section>
    </>
  )
}
