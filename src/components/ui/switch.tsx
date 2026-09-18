import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cn } from "cn"

function Switch({ className, ...props }: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "flex h-5 w-9 shrink-0 items-center rounded-full border border-transparent bg-muted p-0.5 transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-checked:bg-primary",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none size-4 rounded-full bg-background shadow-sm ring-1 ring-black/5 transition-[translate,background-color] duration-150 data-checked:translate-x-4 data-checked:bg-primary-foreground dark:bg-foreground dark:text-background"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }