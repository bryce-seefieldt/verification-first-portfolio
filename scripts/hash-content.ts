import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

const roots = ['content/casestudies/incident-copilot.mdx', 'content/casestudies/eval-first-rag.mdx']

function main() {
  const files = roots.map((p) => path.join(process.cwd(), p)).filter((p) => fs.existsSync(p))

  const entries = files.map((f) => {
    const buf = fs.readFileSync(f)
    const sha256 = createHash('sha256').update(buf).digest('hex')
    return { path: path.relative(process.cwd(), f).replace(/\\/g, '/'), sha256 }
  })

  const outDir = path.join(process.cwd(), 'public', 'provenance')
  fs.mkdirSync(outDir, { recursive: true })
  const outPath = path.join(outDir, 'index.json')

  const payload = {
    generatedAt: new Date().toISOString(),
    entries,
  }

  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2))
  console.log('Provenance index written at', outPath)
}

main()
