"use client";

import { useEffect } from "react";
import { usePayrollStore } from "@/state/payrollStore";
import { DollarSign, Users, TrendingUp, TrendingDown } from "lucide-react";
import PayrollSummaryCard from "./PayrollSummaryCard";
import { Skeleton } from "@/components/ui/skeleton";

const PayrollSummary = () => {
  const { summary, fetchSummary, filters } = usePayrollStore();
  const { totalSalary, totalEmployees, totalBonus, totalDeductions } = summary;

  useEffect(() => {
    fetchSummary(filters.month, filters.year);
  }, [fetchSummary, filters.month, filters.year]);

  const isLoading = !totalSalary && !totalEmployees && !totalBonus && !totalDeductions;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <PayrollSummaryCard
        title="Tổng Lương Cơ Bản"
        value={`₫${totalSalary.toLocaleString()}`}
        icon={DollarSign}
        description="Tổng lương cơ bản của tất cả nhân viên"
      />
      <PayrollSummaryCard
        title="Tổng Nhân Viên"
        value={`${totalEmployees} nhân viên`}
        icon={Users}
        description="Số lượng nhân viên trong kỳ lương"
      />
      <PayrollSummaryCard
        title="Tổng Thưởng"
        value={`₫${totalBonus.toLocaleString()}`}
        icon={TrendingUp}
        description="Tổng các khoản thưởng và hoa hồng"
      />
      <PayrollSummaryCard
        title="Tổng Khấu Trừ"
        value={`₫${totalDeductions.toLocaleString()}`}
        icon={TrendingDown}
        description="Tổng các khoản khấu trừ và vi phạm"
        variant="destructive"
      />
    </div>
  );
};

export default PayrollSummary;

