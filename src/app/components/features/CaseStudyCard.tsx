import { CaseStudy } from '@/app/lib/types'
import { Card } from '@/app/components/ui/Card'
import { Button } from '@/app/components/ui/Button'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
  onViewDetails?: (id: string) => void
}

export function CaseStudyCard({ caseStudy, onViewDetails }: CaseStudyCardProps) {
  const passedCriteria = caseStudy.results.filter(result => result.passed).length
  const totalCriteria = caseStudy.results.length
  const successRate = totalCriteria > 0 ? (passedCriteria / totalCriteria) * 100 : 0
  
  return (
    <Card
      title={caseStudy.title}
      description={caseStudy.description}
    >
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {caseStudy.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            Evaluation Results
          </h4>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${successRate}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {passedCriteria}/{totalCriteria} passed
            </span>
          </div>
        </div>
        
        {onViewDetails && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(caseStudy.id)}
          >
            View Details
          </Button>
        )}
      </div>
    </Card>
  )
}