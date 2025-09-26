import React from "react";

export interface TaskHistoryItem {
  status: string;
  changedBy: string;
  changedAt: string;
  note?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  type: "BUSINESS" | "COMPLIANCE" | "VIOLATION" | "OTHER";
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "REJECTED" | "NEEDS_REVISION";
  deadline?: string;
  completedAt?: string;
  assignedBy: string;
  createdAt: string;
  updatedAt: string;
  history: TaskHistoryItem[];
}

interface EmployeeTasksTabProps {
  tasks: TaskItem[];
  isAdmin?: boolean;
}

const EmployeeTasksTab: React.FC<EmployeeTasksTabProps> = ({ tasks, isAdmin }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th>Title</th>
            <th>Type</th>
            <th>Status</th>
            <th>Deadline</th>
            <th>Assigned By</th>
            <th>Created</th>
            <th>Completed</th>
            <th>History</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => (
            <tr key={t.id} className="border-b">
              <td>{t.title}</td>
              <td>{t.type}</td>
              <td>{t.status}</td>
              <td>{t.deadline ? new Date(t.deadline).toLocaleDateString() : "-"}</td>
              <td>{t.assignedBy}</td>
              <td>{new Date(t.createdAt).toLocaleDateString()}</td>
              <td>{t.completedAt ? new Date(t.completedAt).toLocaleDateString() : "-"}</td>
              <td>
                <details>
                  <summary>Lịch sử</summary>
                  <ul className="text-xs">
                    {t.history.map((h, i) => (
                      <li key={i}>
                        {h.status} bởi {h.changedBy} lúc {new Date(h.changedAt).toLocaleString()} {h.note && `- ${h.note}`}
                      </li>
                    ))}
                  </ul>
                </details>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isAdmin && (
        <div className="mt-4 text-xs text-gray-500">* Admin có thể giao, duyệt, chỉnh sửa task tại đây (tùy UI thực tế).</div>
      )}
    </div>
  );
};

export default EmployeeTasksTab;
