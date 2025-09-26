import React from "react";

export interface NotificationItem {
  id: string;
  type: string;
  title: string;
  content: string;
  sentAt: string;
  read: boolean;
}

interface EmployeeNotificationsTabProps {
  notifications: NotificationItem[];
  isAdmin?: boolean;
}

const EmployeeNotificationsTab: React.FC<EmployeeNotificationsTabProps> = ({ notifications, isAdmin }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th>Type</th>
            <th>Title</th>
            <th>Content</th>
            <th>Sent At</th>
            <th>Read</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((n) => (
            <tr key={n.id} className="border-b">
              <td>{n.type}</td>
              <td>{n.title}</td>
              <td>{n.content}</td>
              <td>{new Date(n.sentAt).toLocaleString()}</td>
              <td>{n.read ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isAdmin && (
        <div className="mt-4 text-xs text-gray-500">* Admin có thể gửi notification cho nhân viên tại đây (tùy UI thực tế).</div>
      )}
    </div>
  );
};

export default EmployeeNotificationsTab;
