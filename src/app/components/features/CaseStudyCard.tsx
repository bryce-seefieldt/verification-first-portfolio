import { CaseStudy } from '@/app/lib/types'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
  onViewDetails?: (id: string) => void
}

export function CaseStudyCard({ caseStudy, onViewDetails }: CaseStudyCardProps) {
  const passedCriteria = caseStudy.results.filter((result) => result.passed).length
  const totalCriteria = caseStudy.results.length
  const successRate = totalCriteria > 0 ? (passedCriteria / totalCriteria) * 100 : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>{caseStudy.title}</CardTitle>
        {caseStudy.description && <CardDescription>{caseStudy.description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {caseStudy.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              Evaluation Results
            </h4>
            <div className="flex items-center space-x-2">
              <div className="h-2 flex-1 rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-2 rounded-full bg-green-500 transition-all duration-300"
                  style={{ width: `${successRate}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {passedCriteria}/{totalCriteria} passed
              </span>
            </div>
          </div>

          {onViewDetails && (
            <Button variant="outline" size="sm" onClick={() => onViewDetails(caseStudy.id)}>
              View Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
