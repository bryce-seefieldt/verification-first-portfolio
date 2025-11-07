import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  container?: "default" | "lg"
}

export function Section({
  title,
  description,
  className,
  container = "default",
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-10", className)} {...props}>
      <div className={container === "lg" ? "container-lg" : "container"}>
        {(title || description) && (
          <header className="mb-6">
            {title && (
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
