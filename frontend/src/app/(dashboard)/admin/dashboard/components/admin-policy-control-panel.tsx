"use client";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const policyStatus = [
  { policy: "Attendance", status: "Active" },
  { policy: "Break", status: "Active" },
  { policy: "Phone", status: "Inactive" },
];
const userRoles = [
  { name: "Manager", value: 2 },
  { name: "Employee", value: 8 },
];
const COLORS = ["#2563eb", "#34d399"];
const securityLogs = [
  { time: "09:00", action: "Login", user: "Alice" },
  { time: "09:15", action: "Policy Update", user: "Bob" },
  { time: "10:00", action: "Export Data", user: "Carol" },
];
const gdprCompliance = 95;

const AdminPolicyControlPanel = () => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-2">Admin & Policy Control Panel</h2>

      {/* Policy Dashboard Table */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="font-semibold mb-2">Policy Dashboard</div>
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="text-left">Policy</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {policyStatus.map((p, i) => (
              <tr key={i}>
                <td>{p.policy}</td>
                <td>{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* User Role Access Pie Chart */}
      <div className="bg-blue-50 rounded-lg p-4 mb-4">
        <div className="font-semibold mb-2">User Role Access</div>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={userRoles}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={60}
              label
            >
              {userRoles.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Security & Privacy Logs Table */}
      <div className="bg-yellow-100 rounded-lg p-4 mb-4">
        <div className="font-semibold mb-2">Security & Privacy Logs</div>
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="text-left">Time</th>
              <th className="text-left">Action</th>
              <th className="text-left">User</th>
            </tr>
          </thead>
          <tbody>
            {securityLogs.map((log, i) => (
              <tr key={i}>
                <td>{log.time}</td>
                <td>{log.action}</td>
                <td>{log.user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* GDPR/PDPA Compliance Progress Bar */}
      <div className="bg-green-100 rounded-lg p-4">
        <div className="font-semibold mb-2">GDPR/PDPA Compliance Status</div>
        <div className="w-full bg-green-200 rounded-full h-5">
          <div
            className="bg-green-500 h-5 rounded-full flex items-center justify-center text-xs text-white font-bold"
            style={{ width: `${gdprCompliance}%` }}
          >
            {gdprCompliance}%
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPolicyControlPanel;
