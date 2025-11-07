import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, CheckCircle2, Clock } from 'lucide-react'

interface FeaturedCaseStudyCardProps {
  title: string
  summary: string
  date: string
  status: 'verified' | 'in-progress' | 'draft'
  href: string
  metrics?: Record<string, string | undefined>
  tags?: string[]
}

const statusConfig = {
  verified: {
    label: 'Verified',
    className: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    icon: CheckCircle2,
  },
  'in-progress': {
    label: 'In Progress',
    className: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    icon: Clock,
  },
  draft: {
    label: 'Draft',
    className: 'bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300',
    icon: Clock,
  },
}

export function FeaturedCaseStudyCard({
  title,
  summary,
  date,
  status,
  href,
  metrics,
  tags,
}: FeaturedCaseStudyCardProps) {
  const statusInfo = statusConfig[status]
  const StatusIcon = statusInfo.icon

  return (
    <Link href={href} className="block group">
      <Card className="h-full transition-all hover:shadow-lg hover:border-brand-300 dark:hover:border-brand-700">
        <CardHeader>
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge className={statusInfo.className}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {statusInfo.label}
            </Badge>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">{date}</span>
          </div>
          <CardTitle className="group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {title}
          </CardTitle>
          <CardDescription>{summary}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Metrics */}
          {metrics && Object.keys(metrics).length > 0 && (
            <div className="flex flex-wrap gap-4">
              {Object.entries(metrics)
                .filter(([_, value]) => value !== undefined)
                .map(([key, value]) => (
                  <div key={key}>
                    <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">
                      {value}
                    </div>
                    <div className="text-xs text-zinc-600 dark:text-zinc-400 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* View Link */}
          <div className="flex items-center text-sm text-brand-600 dark:text-brand-400 font-medium pt-2">
            View Case Study
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
