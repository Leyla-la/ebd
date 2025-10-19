import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, DollarSign, Briefcase, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react";

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

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  ACTIVE: { label: "Đang hiệu lực", color: "bg-green-500/20 text-green-700 border-green-500/30", icon: CheckCircle },
  EXPIRED: { label: "Hết hạn", color: "bg-gray-500/20 text-gray-700 border-gray-500/30", icon: Clock },
  TERMINATED: { label: "Đã chấm dứt", color: "bg-red-500/20 text-red-700 border-red-500/30", icon: XCircle },
  PENDING: { label: "Chờ duyệt", color: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30", icon: AlertCircle },
};

const typeConfig: Record<string, { label: string; color: string }> = {
  FULL_TIME: { label: "Toàn thời gian", color: "bg-blue-500/20 text-blue-700" },
  PART_TIME: { label: "Bán thời gian", color: "bg-purple-500/20 text-purple-700" },
  CONTRACT: { label: "Hợp đồng", color: "bg-orange-500/20 text-orange-700" },
  INTERNSHIP: { label: "Thực tập", color: "bg-pink-500/20 text-pink-700" },
};

const EmployeeContractsTab: React.FC<EmployeeContractsTabProps> = ({ contracts, isAdmin }) => {
  if (!contracts || contracts.length === 0) {
    return (
      <Card className="backdrop-blur-xl bg-gradient-to-br from-white/60 via-white/40 to-white/30 border-white/20 shadow-2xl">
        <CardContent className="py-16 text-center">
          <FileText className="mx-auto h-16 w-16 text-muted-foreground/30 mb-4" />
          <p className="text-lg font-medium text-muted-foreground">Chưa có hợp đồng</p>
          <p className="text-sm text-muted-foreground/70 mt-2">Thông tin hợp đồng sẽ được cập nhật sau</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {contracts.map((contract) => {
          const statusInfo = statusConfig[contract.status] || statusConfig.PENDING;
          const typeInfo = typeConfig[contract.contractType] || { label: contract.contractType, color: "bg-gray-500/20 text-gray-700" };
          const StatusIcon = statusInfo.icon;

          return (
            <Card 
              key={contract.id}
              className="backdrop-blur-xl bg-gradient-to-br from-white/60 via-white/40 to-white/30 border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              <CardHeader className="pb-3 border-b border-white/10">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-lg font-bold text-foreground">
                      {contract.contractNumber}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={`${typeInfo.color} border-0 px-2.5 py-1 text-xs font-medium`}>
                        {typeInfo.label}
                      </Badge>
                      <Badge className={`${statusInfo.color} border px-2.5 py-1 text-xs font-medium`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusInfo.label}
                      </Badge>
                    </div>
                  </div>
                  {contract.filePath && (
                    <a 
                      href={contract.filePath} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                      title="Xem hợp đồng"
                    >
                      <FileText className="w-5 h-5 text-blue-600" />
                    </a>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="flex items-start gap-3">
                  <Briefcase className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">Vị trí công việc</p>
                    <p className="font-semibold text-sm text-foreground truncate">{contract.jobTitle}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <DollarSign className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-0.5">Mức lương</p>
                    <p className="font-bold text-base text-green-600">
                      {(contract.salary ?? 0).toLocaleString('vi-VN')} {contract.salaryCurrency || 'VND'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Ngày bắt đầu</p>
                      <p className="font-medium text-sm text-foreground">
                        {new Date(contract.startDate).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">Ngày kết thúc</p>
                      <p className="font-medium text-sm text-foreground">
                        {contract.endDate ? new Date(contract.endDate).toLocaleDateString('vi-VN') : 'Không xác định'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {isAdmin && (
        <Card className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent border-blue-500/20">
          <CardContent className="py-4">
            <p className="text-sm text-muted-foreground">
              💡 <span className="font-medium">Admin:</span> Bạn có thể upload và chỉnh sửa hợp đồng từ trang Quản lý hợp đồng
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmployeeContractsTab;
