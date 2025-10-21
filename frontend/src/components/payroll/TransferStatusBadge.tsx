"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PayrollStatus = "PAID" | "PENDING" | "FAILED" | "PROCESSING";

interface TransferStatusBadgeProps {
  status: PayrollStatus;
}

const statusMap: Record<
  PayrollStatus,
  { label: string; className: string }
> = {
  PAID: { label: "Đã trả", className: "bg-green-500/20 text-green-300 border-green-500/30" },
  PENDING: { label: "Chờ xử lý", className: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" },
  PROCESSING: { label: "Đang xử lý", className: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  FAILED: { label: "Thất bại", className: "bg-red-500/20 text-red-300 border-red-500/30" },
};

export default function TransferStatusBadge({ status }: TransferStatusBadgeProps) {
  const { label, className } = statusMap[status] || {
    label: "Unknown",
    className: "bg-gray-500/20 text-gray-300 border-gray-500/30",
  };

  return (
    <Badge
      className={cn("font-semibold border", className)}
    >
      {label}
    </Badge>
  );
}
