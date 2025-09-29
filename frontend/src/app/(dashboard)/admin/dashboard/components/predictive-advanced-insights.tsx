"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const productivityData = [
  { month: "Jan", score: 70 },
  { month: "Feb", score: 75 },
  { month: "Mar", score: 80 },
  { month: "Apr", score: 78 },
  { month: "May", score: 85 },
  { month: "Jun", score: 90 },
];
const behaviorData = [
  { name: "Active", value: 60 },
  { name: "Break", value: 20 },
  { name: "Phone", value: 10 },
  { name: "Away", value: 10 },
];
const gamification = [
  { name: "Alice", points: 120 },
  { name: "Bob", points: 110 },
  { name: "Carol", points: 95 },
];
const policyEffectiveness = 82;

const PredictiveAdvancedInsights = () => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-2">Predictive & Advanced Insights</h2>

      {/* Productivity Forecast Line Chart */}
      <div className="bg-blue-50 rounded-lg p-4 mb-4">
        <div className="font-semibold mb-2">Productivity Forecast</div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart
            data={productivityData}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Behavioral Shift Bar Chart */}
      <div className="bg-yellow-50 rounded-lg p-4 mb-4">
        <div className="font-semibold mb-2">Behavioral Shift Detection</div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart
            data={behaviorData}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#facc15" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Policy Effectiveness Progress Bar */}
      <div className="bg-green-100 rounded-lg p-4 mb-4">
        <div className="font-semibold mb-2">HR Policy Effectiveness</div>
        <div className="w-full bg-green-200 rounded-full h-5">
          <div
            className="bg-green-500 h-5 rounded-full flex items-center justify-center text-xs text-white font-bold"
            style={{ width: `${policyEffectiveness}%` }}
          >
            {policyEffectiveness}%
          </div>
        </div>
      </div>

      {/* Gamification Leaderboard Table */}
      <div className="bg-pink-100 rounded-lg p-4">
        <div className="font-semibold mb-2">Gamification Leaderboard</div>
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Points</th>
            </tr>
          </thead>
          <tbody>
            {gamification.map((g, i) => (
              <tr key={i}>
                <td>{g.name}</td>
                <td>{g.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PredictiveAdvancedInsights;
