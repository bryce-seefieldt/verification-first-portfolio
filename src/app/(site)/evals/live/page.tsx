import fs from 'node:fs'
import path from 'node:path'
import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, XCircle, Clock, AlertTriangle } from 'lucide-react'

export const metadata = {
  title: 'Live Evaluations',
  description: 'Real-time evaluation results from automated test suites',
}

type EvalResult = {
  id: string
  pass: boolean
  output: string
  latency?: number
  tokenCount?: number
}

type EvalSuiteResults = {
  ts: number
  suite: string
  results: EvalResult[]
  summary?: {
    total: number
    passed: number
    failed: number
    passRate: number
  }
}

function getEvalResults(): EvalSuiteResults[] {
  try {
    const resultsPath = path.join(process.cwd(), 'public', 'evals-results.json')
    if (!fs.existsSync(resultsPath)) {
      return []
    }
    const data = fs.readFileSync(resultsPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading eval results:', error)
    return []
  }
}

export default function LiveEvalsPage() {
  const suites = getEvalResults()

  if (suites.length === 0) {
    return (
      <>
        <PageHeader
          title="Live Evaluations"
          description="Real-time evaluation results from automated test suites"
        />
        <Section>
          <Card className="border-yellow-200 dark:border-yellow-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                No Evaluation Results Available
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-600 dark:text-zinc-400">
                Run{' '}
                <code className="rounded bg-zinc-100 px-2 py-1 dark:bg-zinc-800">
                  pnpm tsx evals/run.ts
                </code>{' '}
                to generate evaluation results.
              </p>
            </CardContent>
          </Card>
        </Section>
      </>
    )
  }

  const totalTests = suites.reduce((sum, suite) => sum + (suite.summary?.total || 0), 0)
  const totalPassed = suites.reduce((sum, suite) => sum + (suite.summary?.passed || 0), 0)
  const _totalFailed = suites.reduce((sum, suite) => sum + (suite.summary?.failed || 0), 0)
  const overallPassRate = totalTests > 0 ? ((totalPassed / totalTests) * 100).toFixed(1) : '0.0'

  return (
    <>
      <PageHeader
        title="Live Evaluations"
        description="Real-time evaluation results from automated test suites. Updated on every build."
      />

      <Section>
        {/* Summary Stats */}
        <div className="mb-12 grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{suites.length}</div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Test Suites</p>
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
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Passed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{overallPassRate}%</div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Pass Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Evaluation Suites */}
        <div className="space-y-8">
          {suites.map((suite) => {
            const passRate = suite.summary?.passRate || 0
            const lastRun = new Date(suite.ts).toLocaleString()

            return (
              <Card key={suite.suite} className="border-zinc-200 dark:border-zinc-800">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <CardTitle className="text-xl capitalize">
                        {suite.suite.replace(/-/g, ' ')}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <Clock className="h-4 w-4" />
                        Last run: {lastRun}
                      </div>
                    </div>
                    <Badge
                      className={
                        passRate === 100
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                          : passRate >= 80
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                            : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                      }
                    >
                      {passRate.toFixed(1)}% Pass Rate
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Summary */}
                  {suite.summary && (
                    <div className="grid gap-4 md:grid-cols-4">
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
                        <div className="text-lg font-bold">
                          {suite.results
                            .filter((r) => r.latency)
                            .reduce((sum, r) => sum + (r.latency || 0), 0) /
                            suite.results.filter((r) => r.latency).length || 0}
                          ms
                        </div>
                        <div className="text-xs text-zinc-600 dark:text-zinc-400">Avg Latency</div>
                      </div>
                    </div>
                  )}

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-600 dark:text-zinc-400">Test Results</span>
                      <span className="font-semibold">
                        {suite.summary?.passed || 0}/{suite.summary?.total || 0}
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                      <div
                        className="h-full bg-green-600 transition-all duration-500 dark:bg-green-400"
                        style={{ width: `${passRate}%` }}
                      />
                    </div>
                  </div>

                  {/* Individual Test Results */}
                  <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
                    <h4 className="mb-3 font-semibold">Test Cases</h4>
                    <div className="space-y-2">
                      {suite.results.map((result) => (
                        <div
                          key={result.id}
                          className="flex items-start gap-3 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900"
                        >
                          {result.pass ? (
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                          ) : (
                            <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <code className="text-sm font-medium">{result.id}</code>
                              {result.latency && (
                                <Badge variant="outline" className="text-xs">
                                  {result.latency}ms
                                </Badge>
                              )}
                            </div>
                            <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                              {result.output.slice(0, 100)}
                              {result.output.length > 100 && '...'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Download Button */}
                  <div className="flex justify-end border-t border-zinc-200 pt-4 dark:border-zinc-800">
                    <Button asChild variant="outline" size="sm">
                      <a href="/evals-results.json" download>
                        Download Raw JSON
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Info Card */}
        <Card className="border-brand-200 dark:border-brand-800 mt-12 border-2">
          <CardHeader>
            <CardTitle>About Live Evaluations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
            <p>
              These evaluation results are automatically generated during the build process. Each
              test suite validates specific capabilities and outputs deterministic results.
            </p>
            <div className="space-y-1">
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">How it works:</p>
              <ul className="ml-4 list-disc space-y-1">
                <li>
                  Test cases are defined in JSONL format in <code>/evals/datasets/</code>
                </li>
                <li>The eval runner executes tests and validates outputs</li>
                <li>
                  Results are written to <code>public/evals-results.json</code>
                </li>
                <li>This page reads and displays the results server-side</li>
                <li>CI/CD pipeline runs evals on every build</li>
              </ul>
            </div>
            <p className="pt-2">
              View the source code in the{' '}
              <a
                href="https://github.com/bryce-seefieldt/verification-first-portfolio/tree/main/evals"
                className="text-brand-600 dark:text-brand-400 hover:underline"
              >
                /evals directory
              </a>
              .
            </p>
          </CardContent>
        </Card>
      </Section>
    </>
  )
}
