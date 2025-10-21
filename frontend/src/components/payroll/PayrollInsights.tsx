"use client";

import { useMemo } from "react";
import { usePayrollStore } from "@/state/payrollStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as ReTooltip, BarChart, Bar, XAxis, YAxis, LineChart, Line, Legend } from "recharts";

const STATUS_COLORS: Record<string, string> = {
  PAID: "#22c55e",
  PENDING: "#eab308",
  FAILED: "#ef4444",
};

export default function PayrollInsights() {
  const { filteredPayrolls } = usePayrollStore();

  // 1) Status distribution
  const statusData = useMemo(() => {
    const map: Record<string, number> = { PAID: 0, PENDING: 0, FAILED: 0 } as any;
    filteredPayrolls.forEach((p) => {
      map[p.status] = (map[p.status] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [filteredPayrolls]);

  // 2) Top 8 net pay by employee (bar chart)
  const topNetPay = useMemo(() => {
    const rows = filteredPayrolls
      .map((p) => ({ name: p.employee.name.split(" ").slice(-1)[0], net: p.netPay }))
      .sort((a, b) => b.net - a.net)
      .slice(0, 8);
    return rows;
  }, [filteredPayrolls]);

  // 3) Bonus vs Deductions per employee (line chart) — fall back to 0 if missing
  const bonusVsDeduction = useMemo(() => {
    return filteredPayrolls.slice(0, 10).map((p) => ({
      name: p.employee.employeeCode,
      bonus: (p as any).totalRewards || 0,
      deduction: (p as any).totalDeductions || 0,
    }));
  }, [filteredPayrolls]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <Card className="liquid-glass-card rounded-2xl">
        <CardHeader>
          <CardTitle>Phân bố trạng thái thanh toán</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90}>
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || "#8884d8"} />
                ))}
              </Pie>
              <ReTooltip formatter={(v: any) => `${v}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="liquid-glass-card rounded-2xl">
        <CardHeader>
          <CardTitle>Top lương thực nhận</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topNetPay}>
              <XAxis dataKey="name" />
              <YAxis />
              <ReTooltip formatter={(v: any) => `₫${Number(v).toLocaleString()}`} />
              <Bar dataKey="net" fill="#60a5fa" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="liquid-glass-card rounded-2xl">
        <CardHeader>
          <CardTitle>Thưởng vs Khấu trừ</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={bonusVsDeduction}>
              <XAxis dataKey="name" />
              <YAxis />
              <ReTooltip formatter={(v: any) => `₫${Number(v).toLocaleString()}`} />
              <Legend />
              <Line type="monotone" dataKey="bonus" stroke="#22c55e" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="deduction" stroke="#ef4444" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
