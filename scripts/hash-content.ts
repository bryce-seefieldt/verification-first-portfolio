/**
 * Content Hashing Script - Cryptographic Provenance Generator
 *
 * Generates SHA-256 hashes of MDX case studies to create an immutable audit trail.
 * Outputs a JSON index to public/provenance/index.json that powers the /provenance
 * page UI and prepares for future on-chain anchoring.
 *
 * **Workflow:**
 * 1. Reads specified MDX files from content/casestudies/
 * 2. Generates SHA-256 hash for each file's raw content
 * 3. Creates JSON index with relative paths and hashes
 * 4. Writes to public/provenance/index.json with timestamp
 *
 * **CI Integration:**
 * - Runs in .github/workflows/ci.yml after evals, before build
 * - Ensures provenance index is fresh on every deployment
 *
 * **Future Enhancement:**
 * - Add smart contract integration for Sepolia testnet anchoring
 * - Recursive directory scanning instead of hardcoded roots
 * - Support multiple content types (ADRs, logs, etc.)
 *
 * @see {@link /src/app/(site)/provenance/page.tsx} for UI consumption
 * @see {@link /.github/workflows/ci.yml} for CI integration
 */
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
// Hardcoded list of files to hash (future: make recursive)

const roots = ['content/casestudies/incident-copilot.mdx', 'content/casestudies/eval-first-rag.mdx']

function main() {
  // Resolve absolute paths and filter out non-existent files
  const files = roots.map((p) => path.join(process.cwd(), p)).filter((p) => fs.existsSync(p))
  // Generate SHA-256 hash for each file

  const entries = files.map((f) => {
    const buf = fs.readFileSync(f)
    // Use SHA-256 (industry standard for content integrity)
    const sha256 = createHash('sha256').update(buf).digest('hex')
    // Store relative paths for portability across environments
    return { path: path.relative(process.cwd(), f).replace(/\\/g, '/'), sha256 }
  })
  // Ensure output directory exists

  const outDir = path.join(process.cwd(), 'public', 'provenance')
  fs.mkdirSync(outDir, { recursive: true })
  const outPath = path.join(outDir, 'index.json')
  // Create JSON payload with ISO timestamp

  const payload = {
    generatedAt: new Date().toISOString(),
    entries,
  }

  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2))
  console.log('Provenance index written at', outPath)
}
// Write formatted JSON (pretty-print for readability)

main()
