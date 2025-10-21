import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PayrollSummaryCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  className?: string;
  variant?: "default" | "destructive";
}

export default function PayrollSummaryCard({
  title,
  value,
  icon: Icon,
  className,
  variant = "default",
}: PayrollSummaryCardProps) {
  return (
    <Card className={cn("relative overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon
          className={cn(
            "h-5 w-5",
            variant === "destructive"
              ? "text-red-400"
              : "text-blue-300"
          )}
        />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
