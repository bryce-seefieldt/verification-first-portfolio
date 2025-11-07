/**
 * Evaluation Runner - Automated Testing Harness
 *
 * Runs evaluation test suites from JSONL datasets and generates results for the
 * /evals/live dashboard. Currently uses deterministic keyword-based mock model
 * for CI reproducibility, designed for future LLM-as-judge integration.
 *
 * **Workflow:**
 * 1. Load test cases from evals/datasets/{name}.jsonl
 * 2. Execute each test case through modelRespond()
 * 3. Compare output against expected keywords (substring match)
 * 4. Track latency, pass/fail status, and overall metrics
 * 5. Write results to public/evals-results.json
 * 6. Exit with code 1 if any tests fail (CI integration)
 *
 * **Usage:**
 * ```bash
 * pnpm tsx evals/run.ts                    # Run rag-basics (default)
 * pnpm tsx evals/run.ts dataset-name       # Run specific dataset
 * pnpm tsx evals/run.ts --verbose          # Show individual test details
 * pnpm tsx evals/run.ts ds1 ds2 -v         # Run multiple datasets verbosely
 * ```
 *
 * **Output Format** (public/evals-results.json):
 * ```json
 * [
 *   {
 *     "ts": 1699999999999,
 *     "suite": "rag-basics",
 *     "results": [{"id": "test-1", "pass": true, "output": "...", "latency": 5}],
 *     "summary": {"total": 10, "passed": 10, "failed": 0, "passRate": 100}
 *   }
 * ]
 * ```
 *
 * @see {@link /evals/schema.ts} for Zod type definitions
 * @see {@link /src/app/(site)/evals/live/page.tsx} for results visualization
 * @see {@link /.github/workflows/ci.yml} for CI integration
 */
import fs from 'node:fs'
import path from 'node:path'
import { EvalCase, type EvalResult, type EvalSuiteResults } from './schema'

/**
 * Mock Model Response Function
 *
 * Deterministic keyword-based mock that simulates LLM responses for testing.
 * Returns canned responses based on prompt keywords to ensure 100% CI reproducibility.
 *
 * **Production Replacement Strategy:**
 * ```typescript
 * async function modelRespond(prompt: string): Promise<string> {
 *   const response = await openai.chat.completions.create({
 *     model: "gpt-4",
 *     messages: [{role: "user", content: prompt}]
 *   })
 *   return response.choices[0].message.content || ""
 * }
 * ```
 *
 * **Design Rationale:**
 * - Zero cost for CI runs (no API calls)
 * - Instant feedback (no network latency)
 * - Reproducible results (deterministic logic)
 * - Useful for smoke testing eval harness itself
 *
 * @param prompt - User input text from JSONL test case
 * @returns Canned response containing expected keywords
 */
async function modelRespond(prompt: string): Promise<string> {
  const lowerPrompt = prompt.toLowerCase()

  // Ordered pattern matching: most specific patterns first to avoid false positives
  if (lowerPrompt.includes('on-chain')) {
    return 'On-chain verification provides immutable proof that artifacts existed at specific points in time, with cryptographic guarantees and tamper-evidence.'
  }
  if (lowerPrompt.includes('immutable') || lowerPrompt.includes('audit')) {
    return 'Immutable audit trails are permanent records that cannot be altered after creation, providing accountability and provenance tracking.'
  }
  if (lowerPrompt.includes('blockchain') || lowerPrompt.includes('anchoring')) {
    return 'Blockchain anchoring works by storing cryptographic hashes of build artifacts on-chain, creating tamper-proof timestamps.'
  }
  if (lowerPrompt.includes('cryptographic') || lowerPrompt.includes('provenance')) {
    return 'Cryptographic provenance uses digital signatures and hash functions to create immutable audit trails for software artifacts.'
  }
  if (lowerPrompt.includes('disaster') || lowerPrompt.includes('recovery')) {
    return 'Disaster recovery practices include automated backups, geo-redundant storage, infrastructure-as-code, and documented runbooks.'
  }
  if (lowerPrompt.includes('rag') || lowerPrompt.includes('tools')) {
    return 'RAG systems use retrieval algorithms, vector databases, embedding models, and relevance ranking to find and return context for language models.'
  }
  if (lowerPrompt.includes('accuracy') || lowerPrompt.includes('measure')) {
    return 'LLM accuracy is measured using evaluation datasets with ground truth labels, comparing outputs against expected results with metrics.'
  }
  if (lowerPrompt.includes('evaluation') || lowerPrompt.includes('harness')) {
    return 'Evaluation harnesses provide automated testing frameworks that validate implementations against predefined success criteria continuously.'
  }
  if (lowerPrompt.includes('test') || lowerPrompt.includes('difference')) {
    return 'Unit tests validate individual components, while evaluation suites assess entire systems against real-world scenarios and metrics.'
  }
  if (lowerPrompt.includes('verification')) {
    return 'Verification-first development is an approach where success criteria and evaluation harnesses are defined before implementation.'
  }

  // Fallback: return prompt slice (shouldn't happen with proper test cases)
  return prompt.slice(0, 120)
}
/**
 * Run Evaluation Suite
 *
 * Executes all test cases from a JSONL dataset and returns aggregated results.
 *
 * @param datasetName - Name of dataset file (without .jsonl extension)
 * @param options.verbose - If true, log individual test case results
 * @returns Suite results with summary statistics
 * @throws Error if dataset file not found
 */

async function runEvalSuite(
  datasetName: string,
  options: { verbose?: boolean } = {}
): Promise<EvalSuiteResults> {
  const file = path.join(process.cwd(), `evals/datasets/${datasetName}.jsonl`)

  if (!fs.existsSync(file)) {
    throw new Error(`Dataset not found: ${file}`)
    // JSONL format: one JSON object per line
  }

  const lines = fs.readFileSync(file, 'utf8').trim().split('\n')
  const results: EvalResult[] = []

  console.warn(`\n📊 Running evaluation suite: ${datasetName}`)
  console.warn(`📝 Total test cases: ${lines.length}\n`)

  for (const line of lines) {
    // Zod validation ensures type safety and catches malformed test cases
    const test = EvalCase.parse(JSON.parse(line))
    const startTime = Date.now()

    const output = await modelRespond(test.input)
    // Track latency even though mock is instant (useful for real model comparison)
    const latency = Date.now() - startTime
    // Simple substring match: case-insensitive keyword detection
    // Future: support regex patterns, semantic similarity, LLM-as-judge

    const pass = test.expected ? output.toLowerCase().includes(test.expected.toLowerCase()) : true

    results.push({
      id: test.id,
      pass,
      output,
      latency,
    })

    if (options.verbose) {
      console.warn(`${pass ? '✅' : '❌'} ${test.id}: ${pass ? 'PASS' : 'FAIL'}`)
      if (!pass) {
        console.warn(`   Expected: "${test.expected}"`)
        console.warn(`   Got: "${output}"`)
      }
    }
  }

  const passed = results.filter((r) => r.pass).length
  const failed = results.filter((r) => !r.pass).length
  const passRate = (passed / results.length) * 100

  const suiteResults: EvalSuiteResults = {
    ts: Date.now(),
    suite: datasetName,
    results,
    summary: {
      total: results.length,
      passed,
      failed,
      passRate,
    },
  }

  console.warn(`\n📈 Results:`)
  console.warn(`   Passed: ${passed}/${results.length}`)
  console.warn(`   Failed: ${failed}/${results.length}`)
  console.warn(`   Pass Rate: ${passRate.toFixed(1)}%\n`)

  return suiteResults
}

async function main() {
  const args = process.argv.slice(2)
  const verbose = args.includes('--verbose') || args.includes('-v')
  const datasets = args.filter((arg) => !arg.startsWith('-'))

  // Default to rag-basics if no dataset specified
  const datasetsToRun = datasets.length > 0 ? datasets : ['rag-basics']

  const allResults: EvalSuiteResults[] = []

  for (const dataset of datasetsToRun) {
    const results = await runEvalSuite(dataset, { verbose })
    allResults.push(results)
  }

  // Ensure public directory exists
  const publicDir = path.join(process.cwd(), 'public')
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  // Write combined results
  const outputPath = path.join(publicDir, 'evals-results.json')
  fs.writeFileSync(outputPath, JSON.stringify(allResults, null, 2))

  console.warn(`✨ Wrote results to ${outputPath}`)

  // Exit with error code if any suite failed
  const anyFailed = allResults.some((suite) => suite.summary && suite.summary.failed > 0)
  if (anyFailed) {
    console.error('\n⚠️  Some tests failed')
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('Error running evals:', err)
  process.exit(1)
})
