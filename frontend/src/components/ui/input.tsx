import * as React from "react"

import { cn } from "@/lib/utils"


const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-white/30 bg-white/20 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-black/80 dark:file:text-white/80 placeholder:text-black/50 dark:placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm backdrop-blur-[12px] shadow-md",
          className
        )}
        style={{ WebkitBackdropFilter: "blur(12px) saturate(180%)" }}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
