import * as React from "react"
import { cn } from "cn"

function Toast({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="toast"
      role="status"
      className={cn(
        "fixed right-4 bottom-4 z-[60] flex max-w-[calc(100vw-2rem)] items-center gap-2.5 rounded-lg border bg-popover p-4 text-sm font-medium text-popover-foreground shadow-lg animate-in fade-in-0 slide-in-from-bottom-3",
        className
      )}
      {...props}
    />
  )
}

export { Toast }