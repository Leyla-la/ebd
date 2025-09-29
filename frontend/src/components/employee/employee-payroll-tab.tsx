import React from "react";

// Types for payroll data (mock or real)
export interface PayrollItem {
  id: string;
  month: string;
  year: number;
  baseSalary: number;
  allowance: number;
  bonus: number;
  deduction: number;
  tax: number;
  kpiAttendance: number;
  kpiBehaviour: number;
  kpiPerformance: number;
  kpiTotal: number;
  bonusByKPI: number;
  penaltyByBehaviour: number;
  netSalary: number;
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "PROCESSING";
  paymentDate?: string;
  autoDeducted: boolean;
  payrollFileUrl?: string;
}

interface EmployeePayrollTabProps {
  payrolls: PayrollItem[];
  isAdmin?: boolean;
}

const EmployeePayrollTab: React.FC<EmployeePayrollTabProps> = ({ payrolls, isAdmin }) => {
  return (
    <div className="liquid-glass-card overflow-x-auto p-4 relative">
      <span className="liquid-glass-shine" aria-hidden="true" />
      <table className="min-w-full border text-sm bg-white/10 rounded-xl overflow-hidden relative z-10">
        <thead>
          <tr className="bg-white/20">
            <th>Month</th>
            <th>Base Salary</th>
            <th>Allowance</th>
            <th>Bonus</th>
            <th>Deduction</th>
            <th>Tax</th>
            <th>KPI Att.</th>
            <th>KPI Beh.</th>
            <th>KPI Perf.</th>
            <th>KPI Total</th>
            <th>Bonus KPI</th>
            <th>Penalty</th>
            <th>Net Salary</th>
            <th>Status</th>
            <th>Pay Date</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          {payrolls.map((p) => (
            <tr key={p.id} className="border-b border-white/20">
              <td>{p.month}/{p.year}</td>
              <td>{p.baseSalary.toLocaleString()}</td>
              <td>{p.allowance.toLocaleString()}</td>
              <td>{p.bonus.toLocaleString()}</td>
              <td>{p.deduction.toLocaleString()}</td>
              <td>{p.tax.toLocaleString()}</td>
              <td>{p.kpiAttendance}%</td>
              <td>{p.kpiBehaviour}%</td>
              <td>{p.kpiPerformance}%</td>
              <td>{p.kpiTotal}%</td>
              <td>{p.bonusByKPI.toLocaleString()}</td>
              <td>{p.penaltyByBehaviour.toLocaleString()}</td>
              <td className="font-bold">{p.netSalary.toLocaleString()}</td>
              <td>{p.paymentStatus}</td>
              <td>{p.paymentDate ? new Date(p.paymentDate).toLocaleDateString() : "-"}</td>
              <td>
                {p.payrollFileUrl ? (
                  <a href={p.payrollFileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">PDF</a>
                ) : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isAdmin && (
        <div className="mt-4 text-xs text-gray-500 relative z-10">* Admin có thể xuất, xác nhận, gửi phiếu lương tại đây (tùy UI thực tế).</div>
      )}
    </div>
  );
};

export default EmployeePayrollTab;
