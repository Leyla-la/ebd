import * as React from "react"

// Glassmorphism Badge using glass CSS if no direct Liquid Glass UI badge
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

function Badge({ className, ...props }: BadgeProps) {
  return (
    <div
      className={
        `liquid-glass-badge inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-black/80 dark:text-white/80 ${className || ''}`
      }
      {...props}
    >
      <span className="liquid-glass-shine" aria-hidden="true" />
      {props.children}
    </div>
  )
}

export { Badge }
