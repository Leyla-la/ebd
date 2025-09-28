import { cn } from "@/lib/utils"


function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-white/30 backdrop-blur-[8px] border border-white/30 shadow-inner",
        className
      )}
      style={{ WebkitBackdropFilter: "blur(8px) saturate(180%)" }}
      {...props}
    />
  )
}

export { Skeleton }
