// TypeScript type definitions for the application

export interface CaseStudy {
  id: string
  title: string
  description: string
  technologies: string[]
  evaluationCriteria: string[]
  results: EvaluationResult[]
  createdAt: Date
  updatedAt: Date
}

export interface EvaluationResult {
  criterion: string
  passed: boolean
  score?: number
  notes?: string
  timestamp: Date
}

export interface ADR {
  id: string
  title: string
  status: 'proposed' | 'accepted' | 'rejected' | 'deprecated' | 'superseded'
  date: Date
  deciders: string[]
  context: string
  decision: string
  consequences: string[]
  alternatives?: string[]
}

export interface NavigationItem {
  title: string
  href: string
  description?: string
  external?: boolean
}

export interface ComponentProps {
  className?: string
  children?: React.ReactNode
}