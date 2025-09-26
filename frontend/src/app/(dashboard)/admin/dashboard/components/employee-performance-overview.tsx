import React from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from "recharts";

const attendanceData = [
  { name: "Present", value: 92 },
  { name: "Absent", value: 8 },
];
const COLORS = ["#2563eb", "#f87171"];
const activeAwayData = [
  { name: "Active", value: 7 },
  { name: "Away", value: 1 },
];
const behaviorPie = [
  { name: "Working", value: 70 },
  { name: "Break", value: 20 },
  { name: "Phone", value: 10 },
];
const overtimeData = [
  { day: "Mon", hours: 1 },
  { day: "Tue", hours: 0.5 },
  { day: "Wed", hours: 2 },
  { day: "Thu", hours: 1.5 },
  { day: "Fri", hours: 0 },
];
const leaderboard = [
  { name: "Alice", score: 98 },
  { name: "Bob", score: 95 },
  { name: "Carol", score: 90 },
];

const EmployeePerformanceOverview = () => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-2">Employee Performance Overview</h2>

      {/* Attendance & Presence Pie Chart */}
      <div className="bg-blue-50 rounded-lg p-4 mb-4">
        <div className="font-semibold mb-2">Attendance & Presence %</div>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={attendanceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
              {attendanceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Active vs Away Time Bar Chart */}
      <div className="bg-purple-50 rounded-lg p-4 mb-4">
        <div className="font-semibold mb-2">Active vs Away Time</div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={activeAwayData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#a78bfa" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Behavior Breakdown Pie Chart */}
      <div className="bg-pink-50 rounded-lg p-4 mb-4">
        <div className="font-semibold mb-2">Behavior Breakdown</div>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={behaviorPie} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
              <Cell fill="#34d399" />
              <Cell fill="#fbbf24" />
              <Cell fill="#f472b6" />
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Overtime Tracker Line Chart */}
      <div className="bg-orange-50 rounded-lg p-4 mb-4">
        <div className="font-semibold mb-2">Overtime Tracker</div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={overtimeData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="hours" stroke="#fb923c" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-green-100 rounded-lg p-4">
        <div className="font-semibold mb-2">Leaderboard</div>
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((l, i) => (
              <tr key={i}>
                <td>{l.name}</td>
                <td>{l.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default EmployeePerformanceOverview;
