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
    <div className="liquid-glass-card overflow-x-auto p-4 relative">
      <span className="liquid-glass-shine" aria-hidden="true" />
      <table className="min-w-full border text-sm bg-white/10 rounded-xl overflow-hidden relative z-10">
        <thead>
          <tr className="bg-white/20">
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
            <tr key={c.id} className="border-b border-white/20">
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
        <div className="mt-4 text-xs text-gray-500 relative z-10">* Admin có thể upload, chỉnh sửa hợp đồng tại đây (tùy UI thực tế).</div>
      )}
    </div>
  );
};

export default EmployeeContractsTab;
