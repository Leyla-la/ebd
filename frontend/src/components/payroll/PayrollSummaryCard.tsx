import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PayrollSummaryCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  description?: string;
  className?: string;
  variant?: "default" | "destructive";
}

export default function PayrollSummaryCard({
  title,
  value,
  icon: Icon,
  description,
  className,
  variant = "default",
}: PayrollSummaryCardProps) {
  return (
    <Card className={cn("liquid-glass-card relative overflow-hidden transition-all hover:shadow-2xl rounded-2xl", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon
          className={cn(
            "h-5 w-5",
            variant === "destructive"
              ? "text-red-500"
              : "text-blue-500"
          )}
        />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground pt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
