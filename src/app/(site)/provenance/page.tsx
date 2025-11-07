import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/site.config'
import { Shield, Hash, Lock, CheckCircle2, ExternalLink, FileCheck, GitBranch } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Provenance',
  description: 'How cryptographic verification and on-chain anchoring ensure immutable proof of work',
}

export default function ProvenancePage() {
  return (
    <>
      <PageHeader
        title="Cryptographic Provenance"
        description="Every artifact in this portfolio is cryptographically signed and anchored on-chain for immutable verification"
      />

      <Section>
        {/* Network Info */}
        <Card className="mb-12 border-2 border-brand-200 dark:border-brand-800 bg-linear-to-br from-brand-50 to-white dark:from-brand-950 dark:to-zinc-900">
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
            <div className="grid gap-4 md:grid-cols-3 text-sm">
              <div>
                <div className="text-zinc-600 dark:text-zinc-400 mb-1">Network</div>
                <div className="font-mono">Ethereum Sepolia</div>
              </div>
              <div>
                <div className="text-zinc-600 dark:text-zinc-400 mb-1">Avg Gas Cost</div>
                <div className="font-mono">~$0.12 / anchor</div>
              </div>
              <div>
                <div className="text-zinc-600 dark:text-zinc-400 mb-1">Verification Time</div>
                <div className="font-mono">~3-5 seconds</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">How Verification Works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900 mb-3">
                  <Hash className="h-6 w-6 text-brand-600 dark:text-brand-400" />
                </div>
                <CardTitle className="text-lg">1. Hash Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Every build artifact (code, evals, documentation) is hashed using SHA-256. The hash
                  serves as a cryptographic fingerprint of the content.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900 mb-3">
                  <Lock className="h-6 w-6 text-brand-600 dark:text-brand-400" />
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
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900 mb-3">
                  <CheckCircle2 className="h-6 w-6 text-brand-600 dark:text-brand-400" />
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
          <h2 className="text-2xl font-bold mb-6">What Gets Anchored</h2>
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
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">Git Commits</div>
                    <div>Every commit hash is anchored with metadata</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">Release Tags</div>
                    <div>Production releases are individually verified</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">Build Artifacts</div>
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
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">Test Results</div>
                    <div>Pass/fail status with full test logs</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">Coverage Reports</div>
                    <div>Line and branch coverage metrics</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-zinc-900 dark:text-zinc-100">Performance Benchmarks</div>
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
              <h4 className="font-semibold mb-2">Hashing Algorithm</h4>
              <div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg font-mono text-sm">
                SHA-256 (Secure Hash Algorithm 256-bit)
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                Produces a unique 256-bit (32-byte) hash for any input. Collision-resistant and
                cryptographically secure.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Smart Contract</h4>
              <div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg font-mono text-sm overflow-x-auto">
                <div className="text-purple-600 dark:text-purple-400">contract</div> ProvenanceAnchor
                {'{'}
                <br />
                &nbsp;&nbsp;<div className="inline text-blue-600 dark:text-blue-400">function</div>{' '}
                anchor(bytes32 hash, string metadata) <div className="inline text-blue-600 dark:text-blue-400">public</div>
                <br />
                &nbsp;&nbsp;<div className="inline text-blue-600 dark:text-blue-400">function</div>{' '}
                verify(bytes32 hash) <div className="inline text-blue-600 dark:text-blue-400">public</div>{' '}
                <div className="inline text-purple-600 dark:text-purple-400">view</div>{' '}
                <div className="inline text-blue-600 dark:text-blue-400">returns</div> (AnchorRecord)
                <br />
                {'}'}
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                Minimal gas-optimized contract for storing hashes with timestamps and metadata.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Verification Process</h4>
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
                    <code className="bg-zinc-100 dark:bg-zinc-900 px-1 rounded">
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
        <Card className="border-2 border-brand-200 dark:border-brand-800 bg-linear-to-br from-brand-50 to-white dark:from-brand-950 dark:to-zinc-900">
          <CardContent className="p-8 text-center space-y-4">
            <h3 className="text-2xl font-bold">Try It Yourself</h3>
            <p className="text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
              All source code, evaluation results, and verification scripts are open source. Clone the
              repo and verify the artifacts independently.
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
