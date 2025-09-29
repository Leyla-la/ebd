import { cn } from "@/lib/utils"


function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "liquid-glass-card animate-pulse rounded-md",
        className
      )}
      {...props}
    >
      <span className="liquid-glass-shine" aria-hidden="true" />
    </div>
  )
}

export { Skeleton }
