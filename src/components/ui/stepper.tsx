import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "cn"

export interface StepperStep {
  title: string
  description?: string
}

function Stepper({
  steps,
  current,
  className,
  ...props
}: React.ComponentProps<"ol"> & {
  steps: StepperStep[]
  current: number
}) {
  return (
    <ol
      data-slot="stepper"
      className={cn("flex items-center gap-4 border-b px-4 py-3", className)}
      {...props}
    >
      {steps.map((step, index) => {
        const isComplete = index < current
        const isActive = index === current
        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <li
                aria-hidden
                data-slot="stepper-connector"
                className="h-px flex-1 bg-border"
              />
            )}
            <li data-slot="stepper-item" className="flex items-center gap-3">
              <span
                data-slot="stepper-indicator"
                data-state={
                  isComplete ? "complete" : isActive ? "active" : "inactive"
                }
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full",
                  isComplete || isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground ring-1 ring-border"
                )}
              >
                {isComplete ? (
                  <Check data-slot="stepper-check" className="size-4" />
                ) : (
                  <span
                    data-slot="stepper-number"
                    className={cn("leading-none", isActive && "text-base")}
                  >
                    {index + 1}
                  </span>
                )}
              </span>
              <span data-slot="stepper-label" className="flex flex-col">
                <span
                  data-slot="stepper-title"
                  className="text-sm leading-tight"
                >
                  {step.title}
                </span>
                {step.description && (
                  <span
                    data-slot="stepper-description"
                    className="text-xs leading-tight text-muted-foreground"
                  >
                    {step.description}
                  </span>
                )}
              </span>
            </li>
          </React.Fragment>
        )
      })}
    </ol>
  )
}

export { Stepper }