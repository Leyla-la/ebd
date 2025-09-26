import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, Radar, PolarRadiusAxis } from "recharts";

const heatmapData = [
  { week: "W1", Mon: 3, Tue: 2, Wed: 3, Thu: 2, Fri: 1 },
  { week: "W2", Mon: 2, Tue: 3, Wed: 2, Thu: 3, Fri: 2 },
];
const deptData = [
  { dept: "Sales", present: 95, absent: 5 },
  { dept: "HR", present: 90, absent: 10 },
  { dept: "IT", present: 85, absent: 15 },
];
const violationTrend = [
  { month: "Jan", violations: 2 },
  { month: "Feb", violations: 3 },
  { month: "Mar", violations: 1 },
  { month: "Apr", violations: 4 },
  { month: "May", violations: 2 },
];
const turnoverRisk = 18;
const engagementIndex = [
  { subject: "Engagement", A: 80, fullMark: 100 },
  { subject: "Satisfaction", A: 70, fullMark: 100 },
  { subject: "Loyalty", A: 85, fullMark: 100 },
  { subject: "Growth", A: 75, fullMark: 100 },
];

const CompanyTrendsAnalytics = () => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-2">Company-Wide Trends & Analytics</h2>

      {/* Monthly Attendance Heatmap (mocked as table) */}
      <div className="bg-green-50 rounded-lg p-4 mb-4">
        <div className="font-semibold mb-2">Monthly Attendance Heatmap</div>
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th>Week</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
            </tr>
          </thead>
          <tbody>
            {heatmapData.map((row, i) => (
              <tr key={i}>
                <td>{row.week}</td>
                <td className={`bg-green-${row.Mon * 100}`}>{row.Mon}</td>
                <td className={`bg-green-${row.Tue * 100}`}>{row.Tue}</td>
                <td className={`bg-green-${row.Wed * 100}`}>{row.Wed}</td>
                <td className={`bg-green-${row.Thu * 100}`}>{row.Thu}</td>
                <td className={`bg-green-${row.Fri * 100}`}>{row.Fri}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Department Comparison Grouped Bar Chart */}
      <div className="bg-blue-50 rounded-lg p-4 mb-4">
        <div className="font-semibold mb-2">Department Comparison</div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={deptData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dept" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="present" fill="#2563eb" name="Present" />
            <Bar dataKey="absent" fill="#f87171" name="Absent" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Violation Trend Line Chart */}
      <div className="bg-yellow-50 rounded-lg p-4 mb-4">
        <div className="font-semibold mb-2">Violation Trend Over Time</div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={violationTrend} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="violations" stroke="#facc15" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Turnover Risk Progress Bar */}
      <div className="bg-red-100 rounded-lg p-4 mb-4">
        <div className="font-semibold mb-2">Turnover Risk Prediction</div>
        <div className="w-full bg-red-200 rounded-full h-5">
          <div
            className="bg-red-500 h-5 rounded-full flex items-center justify-center text-xs text-white font-bold"
            style={{ width: `${turnoverRisk}%` }}
          >
            {turnoverRisk}%
          </div>
        </div>
      </div>

      {/* Engagement Index Radar Chart */}
      <div className="bg-purple-100 rounded-lg p-4">
        <div className="font-semibold mb-2">Engagement Index</div>
        <ResponsiveContainer width="100%" height={220}>
          <RadarChart cx="50%" cy="50%" outerRadius={80} data={engagementIndex}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="Index" dataKey="A" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.6} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default CompanyTrendsAnalytics;
