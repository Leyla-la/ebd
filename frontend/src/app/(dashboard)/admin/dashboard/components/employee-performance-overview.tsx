import React from "react";

const EmployeePerformanceOverview = () => {
  // TODO: Integrate attendance, active/away time, behavior pie, overtime, leaderboard
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-2">Employee Performance Overview</h2>
      <div className="bg-blue-50 rounded-lg p-4 mb-4">[Attendance & Presence % Chart]</div>
      <div className="bg-purple-50 rounded-lg p-4 mb-4">[Active vs Away Time Chart]</div>
      <div className="bg-pink-50 rounded-lg p-4 mb-4">[Behavior Breakdown Pie]</div>
      <div className="bg-orange-50 rounded-lg p-4 mb-4">[Overtime Tracker]</div>
      <div className="bg-green-100 rounded-lg p-4">[Leaderboard]</div>
    </section>
  );
};

export default EmployeePerformanceOverview;
