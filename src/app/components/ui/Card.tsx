import { ComponentProps } from '@/app/lib/types'

interface CardProps extends ComponentProps {
  title?: string
  description?: string
}

export function Card({ children, className = '', title, description }: CardProps) {
  const classes = [
    'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm',
    className
  ].filter(Boolean).join(' ')
  
  return (
    <div className={classes}>
      {(title || description) && (
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
          )}
          {description && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}