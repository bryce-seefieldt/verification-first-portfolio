import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getCaseStudyBySlug, getCaseStudySlugs, mdxComponents } from '@/lib/mdx'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

// Placeholder Verify Badge
function VerifyBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900 dark:text-green-200">
      ✅ Verified (stub)
    </span>
  )
}

export async function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }))
}

interface CaseStudyPageProps {
  params: { slug: string }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const file = getCaseStudySlugs().includes(slug) ? getCaseStudyBySlug(slug) : null
  if (!file) return notFound()

  const { frontmatter, content, readingTime } = file

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
      <article className="prose max-w-none">
        <header className="mb-8 space-y-3">
          <h1 className="text-foreground text-4xl font-bold tracking-tight">{frontmatter.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
            <time dateTime={frontmatter.date}>
              {new Date(frontmatter.date).toLocaleDateString()}
            </time>
            <span>• {readingTime.text}</span>
            {frontmatter.status && <Badge variant="secondary">{frontmatter.status}</Badge>}
            <VerifyBadge />
          </div>
          {frontmatter.summary && (
            <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-300">{frontmatter.summary}</p>
          )}
          {frontmatter.tags && (
            <div className="flex flex-wrap gap-2 pt-2">
              {frontmatter.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>
        <MDXRemote source={content} components={mdxComponents as any} />
      </article>

      <aside className="space-y-6">
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div>
              <h3 className="mb-2 text-sm font-semibold tracking-wide text-zinc-500 uppercase">
                Repository
              </h3>
              {frontmatter.repo ? (
                <a
                  className="text-brand-600 text-sm break-all underline"
                  href={`https://github.com/${frontmatter.repo}`}
                >
                  {frontmatter.repo}
                </a>
              ) : (
                <p className="text-sm text-zinc-500">—</p>
              )}
            </div>
            <Separator />
            <div>
              <h3 className="mb-2 text-sm font-semibold tracking-wide text-zinc-500 uppercase">
                Metrics
              </h3>
              <div className="grid grid-cols-1 gap-2 text-sm">
                {frontmatter.metrics ? (
                  Object.entries(frontmatter.metrics).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between gap-4">
                      <span className="text-zinc-500">{k}</span>
                      <span className="text-foreground font-medium">{v as any}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-zinc-500">No metrics</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  )
}
