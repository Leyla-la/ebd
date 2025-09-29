"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const workHours = [
  { name: "Alice", hours: 40 },
  { name: "Bob", hours: 38 },
  { name: "Carol", hours: 42 },
];
const violations = [
  { name: "Late", count: 2 },
  { name: "Absent", count: 1 },
  { name: "Phone", count: 3 },
];
const payrollAdjustment = 94;

const HRPayrollInsights = () => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-2">HR & Payroll Insights</h2>

      {/* Work Hours Summary Table */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="font-semibold mb-2">Work Hours Summary</div>
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Hours</th>
            </tr>
          </thead>
          <tbody>
            {workHours.map((w, i) => (
              <tr key={i}>
                <td>{w.name}</td>
                <td>{w.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Policy Violations Bar Chart */}
      <div className="bg-red-50 rounded-lg p-4 mb-4">
        <div className="font-semibold mb-2">Policy Violations</div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart
            data={violations}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Payroll Adjustment Progress Bar */}
      <div className="bg-yellow-100 rounded-lg p-4 mb-4">
        <div className="font-semibold mb-2">
          Auto Payroll Adjustment Preview
        </div>
        <div className="w-full bg-yellow-200 rounded-full h-5">
          <div
            className="bg-yellow-500 h-5 rounded-full flex items-center justify-center text-xs text-white font-bold"
            style={{ width: `${payrollAdjustment}%` }}
          >
            {payrollAdjustment}%
          </div>
        </div>
      </div>

      {/* Export Payroll Reports Button */}
      <div className="bg-blue-100 rounded-lg p-4 flex items-center justify-between">
        <div className="font-semibold">Export Payroll Reports</div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Export PDF
        </button>
      </div>
    </section>
  );
};

export default HRPayrollInsights;
