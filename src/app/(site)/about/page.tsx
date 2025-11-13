import { PageHeader } from '@/components/PageHeader'
import { Section } from '@/components/Section'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/site.config'
import { UptimeSparkline } from '@/app/components/UptimeSparkline'
import Link from 'next/link'
import {
  User,
  MapPin,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Shield,
  Server,
  FileCheck,
  ExternalLink,
  ArrowRight,
} from 'lucide-react'

export const metadata = {
  title: 'About',
  description: `About ${siteConfig.author.name} - ${siteConfig.author.title}`,
}

export default function AboutPage() {
  return (
    <>
      <PageHeader title={siteConfig.author.name} description={siteConfig.author.title} />

      <Section>
        {/* Profile Card */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="space-y-6 md:col-span-2">
                <div>
                  <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold">
                    <User className="h-6 w-6" />
                    About Me
                  </h2>
                  <div className="space-y-3 text-zinc-600 dark:text-zinc-300">
                    {siteConfig.author.bio.split('\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                  <MapPin className="h-4 w-4" />
                  <span>{siteConfig.author.location}</span>
                </div>
              </div>

              {/* Contact & Links */}
              <div className="space-y-4">
                <div>
                  <h3 className="mb-3 font-semibold">Connect</h3>
                  <div className="space-y-2">
                    <Button asChild variant="outline" className="w-full justify-start">
                      <Link href={`mailto:${siteConfig.social.email}`}>
                        <Mail className="mr-2 h-4 w-4" />
                        Email
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start">
                      <Link
                        href={siteConfig.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                        <ExternalLink className="ml-auto h-3 w-3" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start">
                      <Link
                        href={siteConfig.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="mr-2 h-4 w-4" />
                        LinkedIn
                        <ExternalLink className="ml-auto h-3 w-3" />
                      </Link>
                    </Button>
                    {siteConfig.social?.twitter && (
                      <Button asChild variant="outline" className="w-full justify-start">
                        <Link
                          href={siteConfig.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Twitter className="mr-2 h-4 w-4" />
                          Twitter
                          <ExternalLink className="ml-auto h-3 w-3" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DR/BCP Credibility */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Disaster Recovery & Business Continuity</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="bg-brand-100 dark:bg-brand-900 mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                  <Shield className="text-brand-600 dark:text-brand-400 h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Verified Backups</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>Daily automated backups of all code, evals, and documentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>Geo-redundant storage across 3+ regions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>Cryptographic verification of backup integrity</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-brand-100 dark:bg-brand-900 mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                  <Server className="text-brand-600 dark:text-brand-400 h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Infrastructure Resilience</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>Multi-cloud deployment (AWS, GCP, Vercel)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>Automated failover with &lt;5min RTO</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>Infrastructure-as-code for rapid recovery</span>
                  </li>
                </ul>
                <div className="mt-6 border-t border-zinc-200 pt-4 dark:border-zinc-700">
                  <h5 className="mb-3 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
                    Live Uptime
                  </h5>
                  <UptimeSparkline limit={168} height={40} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="bg-brand-100 dark:bg-brand-900 mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                  <FileCheck className="text-brand-600 dark:text-brand-400 h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Documentation & Runbooks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>Comprehensive incident response playbooks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>Automated recovery procedures with verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span>Quarterly DR drills with documented results</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Skills & Expertise */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Skills & Expertise</h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <h4 className="mb-3 font-semibold">AI Engineering</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge>LLM Fine-tuning</Badge>
                    <Badge>RAG Systems</Badge>
                    <Badge>Agent Frameworks</Badge>
                    <Badge>Evaluation Harnesses</Badge>
                    <Badge>Prompt Engineering</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold">Infrastructure</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Kubernetes</Badge>
                    <Badge>Docker</Badge>
                    <Badge>CI/CD</Badge>
                    <Badge>Observability</Badge>
                    <Badge>IaC (Terraform)</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="mb-3 font-semibold">Web3 & Security</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Solidity</Badge>
                    <Badge>Smart Contracts</Badge>
                    <Badge>Cryptography</Badge>
                    <Badge>Zero-Knowledge</Badge>
                    <Badge>On-Chain Data</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certifications & Credentials */}
        <div className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Certifications</h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900">
                  <Shield className="text-brand-600 dark:text-brand-400 h-8 w-8" />
                  <div>
                    <div className="font-semibold">AWS Solutions Architect</div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      Professional Level
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900">
                  <Shield className="text-brand-600 dark:text-brand-400 h-8 w-8" />
                  <div>
                    <div className="font-semibold">Certified Kubernetes Administrator</div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">CNCF CKA</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <Card className="border-brand-200 dark:border-brand-800 from-brand-50 dark:from-brand-950 border-2 bg-linear-to-br to-white dark:to-zinc-900">
          <CardContent className="space-y-4 p-8 text-center">
            <h3 className="text-2xl font-bold">Let&apos;s Work Together</h3>
            <p className="mx-auto max-w-2xl text-zinc-600 dark:text-zinc-300">
              Interested in verification-first development? Check out my work trials or get in touch
              to discuss custom projects.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/work-trials">
                  View Work Trials
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`mailto:${siteConfig.social.email}`}>Contact Me</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Section>
    </>
  )
}
