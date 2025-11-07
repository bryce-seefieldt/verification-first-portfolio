// Evaluation harness for testing and validating implementations
import { EvaluationResult } from '@/app/lib/types'

export interface TestCase {
  id: string
  name: string
  description: string
  expectedOutcome: string
  execute: () => Promise<boolean>
}

export interface EvaluationSuite {
  name: string
  testCases: TestCase[]
  setup?: () => Promise<void>
  teardown?: () => Promise<void>
}

export class EvaluationHarness {
  private suites: EvaluationSuite[] = []

  addSuite(suite: EvaluationSuite) {
    this.suites.push(suite)
  }

  async runSuite(suiteName: string): Promise<EvaluationResult[]> {
    const suite = this.suites.find((s) => s.name === suiteName)
    if (!suite) {
      throw new Error(`Suite "${suiteName}" not found`)
    }

    const results: EvaluationResult[] = []

    try {
      // Setup
      if (suite.setup) {
        await suite.setup()
      }

      // Run test cases
      for (const testCase of suite.testCases) {
        const startTime = Date.now()
        try {
          const passed = await testCase.execute()
          const duration = Date.now() - startTime

          results.push({
            criterion: testCase.name,
            passed,
            notes: passed ? 'Test passed' : 'Test failed',
            timestamp: new Date(),
            score: passed ? 1 : 0,
          })

          console.log(`✓ ${testCase.name}: ${passed ? 'PASS' : 'FAIL'} (${duration}ms)`)
        } catch (error) {
          results.push({
            criterion: testCase.name,
            passed: false,
            notes: `Test error: ${error instanceof Error ? error.message : 'Unknown error'}`,
            timestamp: new Date(),
            score: 0,
          })

          console.log(`✗ ${testCase.name}: ERROR - ${error}`)
        }
      }

      // Teardown
      if (suite.teardown) {
        await suite.teardown()
      }
    } catch (error) {
      console.error(`Suite setup/teardown error: ${error}`)
    }

    return results
  }

  async runAllSuites(): Promise<Record<string, EvaluationResult[]>> {
    const results: Record<string, EvaluationResult[]> = {}

    for (const suite of this.suites) {
      console.log(`\nRunning suite: ${suite.name}`)
      results[suite.name] = await this.runSuite(suite.name)
    }

    return results
  }

  generateReport(results: Record<string, EvaluationResult[]>): string {
    let report = '# Evaluation Report\n\n'
    report += `Generated at: ${new Date().toISOString()}\n\n`

    for (const [suiteName, suiteResults] of Object.entries(results)) {
      const passed = suiteResults.filter((r) => r.passed).length
      const total = suiteResults.length
      const successRate = total > 0 ? (passed / total) * 100 : 0

      report += `## ${suiteName}\n`
      report += `- **Results**: ${passed}/${total} passed (${successRate.toFixed(1)}%)\n\n`

      for (const result of suiteResults) {
        const status = result.passed ? '✅' : '❌'
        report += `- ${status} **${result.criterion}**\n`
        if (result.notes) {
          report += `  - ${result.notes}\n`
        }
        report += '\n'
      }
    }

    return report
  }
}
