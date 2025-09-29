"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"


const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "liquid-glass-progress relative h-4 w-full overflow-hidden rounded-full shadow-inner",
      className
    )}
    {...props}
  >
    <span className="liquid-glass-shine" aria-hidden="true" />
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-blue-400/80 transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
