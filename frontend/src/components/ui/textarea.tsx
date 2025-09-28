import * as React from "react"

import { cn } from "@/lib/utils"


const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-white/30 bg-white/20 px-3 py-2 text-base ring-offset-background placeholder:text-black/50 dark:placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm backdrop-blur-[12px] shadow-md",
        className
      )}
      style={{ WebkitBackdropFilter: "blur(12px) saturate(180%)" }}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
