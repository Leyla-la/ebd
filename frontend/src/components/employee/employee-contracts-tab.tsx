import React from "react";

export interface ContractItem {
  id: string;
  contractNumber: string;
  contractType: string;
  status: string;
  startDate: string;
  endDate?: string;
  jobTitle: string;
  salary: number;
  salaryCurrency: string;
  filePath?: string;
}

interface EmployeeContractsTabProps {
  contracts: ContractItem[];
  isAdmin?: boolean;
}

const EmployeeContractsTab: React.FC<EmployeeContractsTabProps> = ({ contracts, isAdmin }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th>Contract #</th>
            <th>Type</th>
            <th>Status</th>
            <th>Start</th>
            <th>End</th>
            <th>Job Title</th>
            <th>Salary</th>
            <th>File</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((c) => (
            <tr key={c.id} className="border-b">
              <td>{c.contractNumber}</td>
              <td>{c.contractType}</td>
              <td>{c.status}</td>
              <td>{new Date(c.startDate).toLocaleDateString()}</td>
              <td>{c.endDate ? new Date(c.endDate).toLocaleDateString() : "-"}</td>
              <td>{c.jobTitle}</td>
              <td>{c.salary.toLocaleString()} {c.salaryCurrency}</td>
              <td>
                {c.filePath ? (
                  <a href={c.filePath} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">PDF</a>
                ) : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isAdmin && (
        <div className="mt-4 text-xs text-gray-500">* Admin có thể upload, chỉnh sửa hợp đồng tại đây (tùy UI thực tế).</div>
      )}
    </div>
  );
};

export default EmployeeContractsTab;
