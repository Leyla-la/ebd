import * as React from "react"

// Glassmorphism Badge using glass CSS if no direct Liquid Glass UI badge
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

function Badge({ className, ...props }: BadgeProps) {
  return (
    <div
      className={
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-[16px] bg-white/20 border border-white/30 shadow-md text-black/80 dark:text-white/80" +
        (className ? ` ${className}` : "")
      }
      style={{ WebkitBackdropFilter: "blur(16px) saturate(180%)" }}
      {...props}
    />
  )
}

export { Badge }
