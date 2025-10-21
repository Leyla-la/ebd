"use client";

import { useEffect } from "react";
import { PayrollWithDetails } from "@/lib/actions/payroll";
import { usePayrollStore } from "@/state/payrollStore";
import PayrollSummary from "./PayrollSummary";
import PayrollTable from "./PayrollTable";
import PayrollActionBar from "./PayrollActionBar";
import PayrollFilterBar from "./PayrollFilterBar";
import { PayrollDetailDrawer } from "./PayrollDetailDrawer";
import PayrollInsights from "./PayrollInsights";

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

  return (
    <>
      <div className="space-y-6 p-4 md:p-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Payroll Automation</h1>
            <p className="text-muted-foreground">
              Manage, automate, and track employee payroll seamlessly.
            </p>
          </div>
          <PayrollActionBar />
        </header>

        {/* Summary Cards */}
        <PayrollSummary />

  {/* Insights & Charts */}
  <PayrollInsights />

        {/* Filter Bar */}
        <PayrollFilterBar />

        {/* Payroll Table */}
        <div className="liquid-glass-card overflow-hidden rounded-2xl">
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
