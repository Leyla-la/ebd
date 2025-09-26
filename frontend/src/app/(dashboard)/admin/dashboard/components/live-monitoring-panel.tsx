import React from "react";
import { FaVideo, FaBell, FaTable } from "react-icons/fa";

// Dummy data for presence heatmap and events
const heatmapData = [
  { name: "9AM", Desk1: 2, Desk2: 1, Desk3: 0 },
  { name: "10AM", Desk1: 3, Desk2: 1, Desk3: 1 },
  { name: "11AM", Desk1: 2, Desk2: 2, Desk3: 1 },
  { name: "12PM", Desk1: 1, Desk2: 1, Desk3: 0 },
];
const alerts = [
  { time: "09:15", message: "Employee #2 left desk for 35min (violation)", type: "warning" },
  { time: "10:02", message: "Employee #1 returned to desk", type: "info" },
  { time: "10:30", message: "Camera 2: Unrecognized face detected", type: "alert" },
];
const events = [
  { time: "09:00", event: "All employees present" },
  { time: "09:15", event: "Employee #2 left desk" },
  { time: "09:50", event: "Employee #2 returned" },
  { time: "10:30", event: "Unrecognized face detected" },
];

const LiveMonitoringPanel = () => {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2"><FaVideo /> Live Monitoring Panel</h2>
      {/* Live Camera Feed Frame */}
      <div className="bg-black text-white rounded-lg p-4 mb-4 flex flex-col items-center justify-center min-h-[180px]">
        <div className="mb-2">Live Camera Feed</div>
        <div className="w-full h-32 bg-gray-800 rounded flex items-center justify-center">[Camera Stream Here]</div>
        <div className="flex gap-2 mt-2">
          <button className="bg-gray-700 text-white px-3 py-1 rounded">Cam 1</button>
          <button className="bg-gray-700 text-white px-3 py-1 rounded">Cam 2</button>
          <button className="bg-gray-700 text-white px-3 py-1 rounded">Cam 3</button>
        </div>
      </div>

      {/* Real-Time Alerts Feed */}
      <div className="bg-yellow-50 rounded-lg p-4 mb-4">
        <div className="font-semibold mb-2 flex items-center gap-2"><FaBell className="text-yellow-500" /> Real-Time Alerts</div>
        <ul className="space-y-1">
          {alerts.map((a, i) => (
            <li key={i} className={`text-sm ${a.type === "alert" ? "text-red-600" : a.type === "warning" ? "text-yellow-700" : "text-gray-700"}`}>
              <span className="font-mono mr-2">[{a.time}]</span> {a.message}
            </li>
          ))}
        </ul>
      </div>

      {/* Presence Heatmap (mocked as table for now) */}
      <div className="bg-green-50 rounded-lg p-4 mb-4">
        <div className="font-semibold mb-2">Presence Heatmap</div>
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="text-left">Time</th>
              <th>Desk 1</th>
              <th>Desk 2</th>
              <th>Desk 3</th>
            </tr>
          </thead>
          <tbody>
            {heatmapData.map((row, i) => (
              <tr key={i}>
                <td>{row.name}</td>
                <td className={`bg-green-${row.Desk1 * 100}`}>{row.Desk1}</td>
                <td className={`bg-green-${row.Desk2 * 100}`}>{row.Desk2}</td>
                <td className={`bg-green-${row.Desk3 * 100}`}>{row.Desk3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Events Table */}
      <div className="bg-gray-100 rounded-lg p-4">
        <div className="font-semibold mb-2 flex items-center gap-2"><FaTable /> Recent Events</div>
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="text-left">Time</th>
              <th className="text-left">Event</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e, i) => (
              <tr key={i}>
                <td>{e.time}</td>
                <td>{e.event}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LiveMonitoringPanel;
