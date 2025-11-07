import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/site.config'
import {
  Shield,
  Hash,
  Lock,
  CheckCircle2,
  ExternalLink,
  FileCheck,
  GitBranch,
  Clipboard,
} from 'lucide-react'
import Link from 'next/link'
import fs from 'node:fs'
import path from 'node:path'
import { CopyButton } from '@/app/components/CopyButton'

interface ProvenanceEntry {
  path: string
  sha256: string
}

interface ProvenanceIndex {
  generatedAt: string
  entries: ProvenanceEntry[]
}

function getProvenanceIndex(): ProvenanceIndex | null {
  try {
    const p = path.join(process.cwd(), 'public', 'provenance', 'index.json')
    if (!fs.existsSync(p)) return null
    const raw = fs.readFileSync(p, 'utf-8')
    return JSON.parse(raw) as ProvenanceIndex
  } catch (e) {
    console.error('Failed reading provenance index', e)
    return null
  }
}

export const metadata = {
  title: 'Provenance',
  description:
    'How cryptographic verification and on-chain anchoring ensure immutable proof of work',
}

export default function ProvenancePage() {
  const provenance = getProvenanceIndex()
  return (
    <>
      <PageHeader
        title="Cryptographic Provenance"
        description="Every artifact in this portfolio is cryptographically signed and anchored on-chain for immutable verification"
      />

      <Section>
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clipboard className="h-5 w-5" />
              Hashed Artifacts
            </CardTitle>
            <CardDescription>
              Build-time content hashed with SHA-256. Regenerated on each CI run.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {provenance && provenance.entries.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                  <div>Generated: {new Date(provenance.generatedAt).toLocaleString()}</div>
                  <div className="font-mono">
                    {provenance.entries.length} file{provenance.entries.length === 1 ? '' : 's'}
                  </div>
                </div>
                <div className="overflow-x-auto rounded-md border border-zinc-200 dark:border-zinc-700">
                  <table className="w-full text-sm">
                    <thead className="bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                      <tr>
                        <th className="p-2 text-left font-medium">Path</th>
                        <th className="p-2 text-left font-medium">SHA-256</th>
                        <th className="p-2 text-left font-medium" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                      {provenance.entries.map((e) => (
                        <tr key={e.path} className="align-top">
                          <td className="max-w-[220px] truncate p-2 font-mono text-[11px] whitespace-nowrap">
                            {e.path}
                          </td>
                          <td className="p-2 font-mono text-[11px] break-all">{e.sha256}</td>
                          <td className="p-2">
                            <CopyButton value={e.sha256} label="Copy" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                No provenance index found. Generate locally with{' '}
                <code className="rounded bg-zinc-100 px-1 py-0.5 text-[11px] dark:bg-zinc-900">
                  pnpm tsx scripts/hash-content.ts
                </code>
                .
              </p>
            )}
          </CardContent>
        </Card>
      </Section>

      <Section>
        {/* Network Info */}
        <Card className="border-brand-200 dark:border-brand-800 from-brand-50 dark:from-brand-950 mb-12 border-2 bg-linear-to-br to-white dark:to-zinc-900">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  {siteConfig.network.label}
                </CardTitle>
                <CardDescription>Chain ID: {siteConfig.network.chainId}</CardDescription>
              </div>
              <Button asChild variant="outline">
                <Link href={siteConfig.network.explorer} target="_blank" rel="noopener noreferrer">
                  View Explorer
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 text-sm md:grid-cols-3">
              <div>
                <div className="mb-1 text-zinc-600 dark:text-zinc-400">Network</div>
                <div className="font-mono">Ethereum Sepolia</div>
              </div>
              <div>
                <div className="mb-1 text-zinc-600 dark:text-zinc-400">Avg Gas Cost</div>
                <div className="font-mono">~$0.12 / anchor</div>
              </div>
              <div>
                <div className="mb-1 text-zinc-600 dark:text-zinc-400">Verification Time</div>
                <div className="font-mono">~3-5 seconds</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">How Verification Works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="bg-brand-100 dark:bg-brand-900 mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                  <Hash className="text-brand-600 dark:text-brand-400 h-6 w-6" />
                </div>
                <CardTitle className="text-lg">1. Hash Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Every build artifact (code, evals, documentation) is hashed using SHA-256. The
                  hash serves as a cryptographic fingerprint of the content.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-brand-100 dark:bg-brand-900 mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                  <Lock className="text-brand-600 dark:text-brand-400 h-6 w-6" />
                </div>
                <CardTitle className="text-lg">2. On-Chain Anchoring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  The hash is written to a smart contract on {siteConfig.network.label}, creating an
                  immutable timestamp and proof of existence.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-brand-100 dark:bg-brand-900 mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                  <CheckCircle2 className="text-brand-600 dark:text-brand-400 h-6 w-6" />
                </div>
                <CardTitle className="text-lg">3. Independent Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Anyone can verify the authenticity by hashing the artifact and comparing it to the
                  on-chain record. Any tampering would change the hash.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* What Gets Anchored */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">What Gets Anchored</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <GitBranch className="h-5 w-5" />
                  Source Code
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">Git Commits</div>
                    <div>Every commit hash is anchored with metadata</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">Release Tags</div>
                    <div>Production releases are individually verified</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">
                      Build Artifacts
                    </div>
                    <div>Compiled output and dependencies tracked</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileCheck className="h-5 w-5" />
                  Evaluation Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">Test Results</div>
                    <div>Pass/fail status with full test logs</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">
                      Coverage Reports
                    </div>
                    <div>Line and branch coverage metrics</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">
                      Performance Benchmarks
                    </div>
                    <div>Latency, throughput, and resource usage</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technical Details */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Technical Implementation</CardTitle>
            <CardDescription>Deep dive into the provenance system architecture</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="mb-2 font-semibold">Hashing Algorithm</h4>
              <div className="rounded-lg bg-zinc-100 p-3 font-mono text-sm dark:bg-zinc-900">
                SHA-256 (Secure Hash Algorithm 256-bit)
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Produces a unique 256-bit (32-byte) hash for any input. Collision-resistant and
                cryptographically secure.
              </p>
            </div>

            <div>
              <h4 className="mb-2 font-semibold">Smart Contract</h4>
              <div className="overflow-x-auto rounded-lg bg-zinc-100 p-3 font-mono text-sm dark:bg-zinc-900">
                <div className="text-purple-600 dark:text-purple-400">contract</div>{' '}
                ProvenanceAnchor
                {'{'}
                <br />
                &nbsp;&nbsp;<div className="inline text-blue-600 dark:text-blue-400">
                  function
                </div>{' '}
                anchor(bytes32 hash, string metadata){' '}
                <div className="inline text-blue-600 dark:text-blue-400">public</div>
                <br />
                &nbsp;&nbsp;<div className="inline text-blue-600 dark:text-blue-400">
                  function
                </div>{' '}
                verify(bytes32 hash){' '}
                <div className="inline text-blue-600 dark:text-blue-400">public</div>{' '}
                <div className="inline text-purple-600 dark:text-purple-400">view</div>{' '}
                <div className="inline text-blue-600 dark:text-blue-400">returns</div>{' '}
                (AnchorRecord)
                <br />
                {'}'}
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Minimal gas-optimized contract for storing hashes with timestamps and metadata.
              </p>
            </div>

            <div>
              <h4 className="mb-2 font-semibold">Verification Process</h4>
              <ol className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">
                    1
                  </Badge>
                  <div>Download the artifact from GitHub or this site</div>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">
                    2
                  </Badge>
                  <div>
                    Compute SHA-256 hash:{' '}
                    <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-900">
                      sha256sum artifact.json
                    </code>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">
                    3
                  </Badge>
                  <div>Query the smart contract with the hash</div>
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="mt-0.5">
                    4
                  </Badge>
                  <div>Compare timestamps and verify authenticity</div>
                </li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="border-brand-200 dark:border-brand-800 from-brand-50 dark:from-brand-950 border-2 bg-linear-to-br to-white dark:to-zinc-900">
          <CardContent className="space-y-4 p-8 text-center">
            <h3 className="text-2xl font-bold">Try It Yourself</h3>
            <p className="mx-auto max-w-2xl text-zinc-600 dark:text-zinc-300">
              All source code, evaluation results, and verification scripts are open source. Clone
              the repo and verify the artifacts independently.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href={siteConfig.repo.url} target="_blank" rel="noopener noreferrer">
                  <GitBranch className="mr-2 h-4 w-4" />
                  View on GitHub
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/evals">View Live Evals</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Section>
    </>
  )
}
