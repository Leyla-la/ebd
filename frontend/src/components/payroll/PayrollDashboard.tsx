"use client";

import { useEffect } from "react";
import { PayrollWithDetails } from "@/lib/actions/payroll";
import { usePayrollStore } from "@/state/payrollStore";

import { PayrollDetailDrawer } from "./PayrollDetailDrawer";
import { DollarSign, Users, AlertTriangle, CheckCircle } from "lucide-react";
import PayrollActionBar from "./PayrollActionBar";
import PayrollFilterBar from "./PayrollFilterBar";
import PayrollSummaryCard from "./PayrollSummaryCard";
import PayrollTable from "./PayrollTable";

interface PayrollDashboardProps {
  initialPayrolls: PayrollWithDetails[];
}

export default function PayrollDashboard({ initialPayrolls }: PayrollDashboardProps) {
  const { 
    initializePayrolls, 
    filteredPayrolls, 
    selectedPayroll, 
    setSelectedPayroll 
  } = usePayrollStore();

  // Initialize the store with server-fetched data
  useEffect(() => {
    initializePayrolls(initialPayrolls);
  }, [initialPayrolls, initializePayrolls]);

  const summary = {
    totalPayroll: filteredPayrolls.reduce((sum, p) => sum + p.netPay, 0),
    employeesPaid: filteredPayrolls.filter(p => p.status === 'PAID').length,
    pending: filteredPayrolls.filter(p => p.status === 'PENDING').length,
    failed: filteredPayrolls.filter(p => p.status === 'FAILED').length,
  };

  return (
    <>
      <div className="space-y-6 p-4 md:p-6">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Payroll Automation</h1>
          <p className="text-muted-foreground">
            Manage, automate, and track employee payroll seamlessly.
          </p>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <PayrollSummaryCard
            title="Tổng lương tháng"
            value={`₫${summary.totalPayroll.toLocaleString()}`}
            icon={DollarSign}
            className="glass-card"
          />
          <PayrollSummaryCard
            title="Đã thanh toán"
            value={`${summary.employeesPaid} nhân viên`}
            icon={CheckCircle}
            className="glass-card"
          />
          <PayrollSummaryCard
            title="Chờ xử lý"
            value={`${summary.pending} nhân viên`}
            icon={Users}
            className="glass-card"
          />
          <PayrollSummaryCard
            title="Thanh toán lỗi"
            value={`${summary.failed} nhân viên`}
            icon={AlertTriangle}
            variant="destructive"
            className="glass-card"
          />
        </div>

        {/* Action & Filter Bar */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <PayrollFilterBar />
          <PayrollActionBar />
        </div>

        {/* Payroll Table */}
        <div className="glass-card overflow-hidden">
          <PayrollTable payrolls={filteredPayrolls} onViewDetails={setSelectedPayroll} />
        </div>
      </div>
      <PayrollDetailDrawer 
        isOpen={!!selectedPayroll}
        onClose={() => setSelectedPayroll(null)}
        payrollId={selectedPayroll?.id || null}
      />
    </>
  );
}
