import React from "react";

export interface EbdLogItem {
  id: string;
  timestamp: string;
  eventType: string;
  value: number;
  description: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}

interface EmployeeEbdLogsTabProps {
  ebdLogs: EbdLogItem[];
  isAdmin?: boolean;
}

const EmployeeEbdLogsTab: React.FC<EmployeeEbdLogsTabProps> = ({ ebdLogs, isAdmin }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th>Time</th>
            <th>Event</th>
            <th>Value</th>
            <th>Description</th>
            <th>Severity</th>
          </tr>
        </thead>
        <tbody>
          {ebdLogs.map((log) => (
            <tr key={log.id} className="border-b">
              <td>{new Date(log.timestamp).toLocaleString()}</td>
              <td>{log.eventType}</td>
              <td>{log.value}</td>
              <td>{log.description}</td>
              <td>{log.severity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isAdmin && (
        <div className="mt-4 text-xs text-gray-500">* Admin có thể xem/sửa log hành vi tại đây (tùy UI thực tế).</div>
      )}
    </div>
  );
};

export default EmployeeEbdLogsTab;
