import React from "react";

export interface EmergencyContactItem {
  id: string;
  name: string;
  relationship: string;
  phoneNumber: string;
  email?: string;
  address?: string;
}

interface EmployeeEmergencyContactsTabProps {
  emergencyContacts: EmergencyContactItem[];
  isAdmin?: boolean;
}

const EmployeeEmergencyContactsTab: React.FC<EmployeeEmergencyContactsTabProps> = ({ emergencyContacts, isAdmin }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th>Name</th>
            <th>Relationship</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {emergencyContacts.map((c) => (
            <tr key={c.id} className="border-b">
              <td>{c.name}</td>
              <td>{c.relationship}</td>
              <td>{c.phoneNumber}</td>
              <td>{c.email ?? "-"}</td>
              <td>{c.address ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isAdmin && (
        <div className="mt-4 text-xs text-gray-500">* Admin có thể chỉnh sửa liên hệ khẩn cấp tại đây (tùy UI thực tế).</div>
      )}
    </div>
  );
};

export default EmployeeEmergencyContactsTab;
