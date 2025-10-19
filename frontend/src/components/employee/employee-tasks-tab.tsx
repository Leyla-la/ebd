import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle, AlertCircle, Briefcase, Calendar, User, History } from "lucide-react";

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

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  PENDING: { label: "Chờ xử lý", color: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30", icon: Clock },
  IN_PROGRESS: { label: "Đang thực hiện", color: "bg-blue-500/20 text-blue-700 border-blue-500/30", icon: AlertCircle },
  COMPLETED: { label: "Hoàn thành", color: "bg-green-500/20 text-green-700 border-green-500/30", icon: CheckCircle },
  REJECTED: { label: "Từ chối", color: "bg-red-500/20 text-red-700 border-red-500/30", icon: XCircle },
  NEEDS_REVISION: { label: "Cần sửa lại", color: "bg-orange-500/20 text-orange-700 border-orange-500/30", icon: AlertCircle },
};

const typeConfig: Record<string, { label: string; color: string }> = {
  BUSINESS: { label: "Công việc", color: "bg-blue-500/20 text-blue-700" },
  COMPLIANCE: { label: "Tuân thủ", color: "bg-green-500/20 text-green-700" },
  VIOLATION: { label: "Vi phạm", color: "bg-red-500/20 text-red-700" },
  OTHER: { label: "Khác", color: "bg-gray-500/20 text-gray-700" },
};

const EmployeeTasksTab: React.FC<EmployeeTasksTabProps> = ({ tasks, isAdmin }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <Card className="backdrop-blur-xl bg-gradient-to-br from-white/60 via-white/40 to-white/30 border-white/20 shadow-2xl">
        <CardContent className="py-16 text-center">
          <Briefcase className="mx-auto h-16 w-16 text-muted-foreground/30 mb-4" />
          <p className="text-lg font-medium text-muted-foreground">Chưa có công việc</p>
          <p className="text-sm text-muted-foreground/70 mt-2">Danh sách công việc sẽ được cập nhật sau</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => {
        const statusInfo = statusConfig[task.status] || statusConfig.PENDING;
        const typeInfo = typeConfig[task.type] || typeConfig.OTHER;
        const StatusIcon = statusInfo.icon;
        
        const isOverdue = task.deadline && new Date(task.deadline) < new Date() && task.status !== 'COMPLETED';

        return (
          <Card 
            key={task.id}
            className={`backdrop-blur-xl bg-gradient-to-br from-white/60 via-white/40 to-white/30 border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 ${
              isOverdue ? 'border-red-500/40 bg-red-50/20' : ''
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <CardTitle className="text-base font-bold text-foreground leading-tight">
                    {task.title}
                  </CardTitle>
                  {task.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {task.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    <Badge className={`${typeInfo.color} border-0 px-2.5 py-0.5 text-xs font-medium`}>
                      {typeInfo.label}
                    </Badge>
                    <Badge className={`${statusInfo.color} border px-2.5 py-0.5 text-xs font-medium`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusInfo.label}
                    </Badge>
                    {isOverdue && (
                      <Badge className="bg-red-500/20 text-red-700 border-red-500/30 border px-2.5 py-0.5 text-xs font-medium">
                        ⚠️ Quá hạn
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <User className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Giao bởi</p>
                    <p className="font-medium text-sm text-foreground">{task.assignedBy}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Ngày tạo</p>
                    <p className="font-medium text-sm text-foreground">
                      {new Date(task.createdAt).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                </div>

                {task.deadline && (
                  <div className="flex items-start gap-2">
                    <Clock className={`w-4 h-4 mt-0.5 ${isOverdue ? 'text-red-500' : 'text-muted-foreground'}`} />
                    <div>
                      <p className="text-xs text-muted-foreground">Hạn chót</p>
                      <p className={`font-medium text-sm ${isOverdue ? 'text-red-600 font-semibold' : 'text-foreground'}`}>
                        {new Date(task.deadline).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                )}

                {task.completedAt && (
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Hoàn thành</p>
                      <p className="font-medium text-sm text-green-600">
                        {new Date(task.completedAt).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Task History */}
              {task.history && task.history.length > 0 && (
                <details className="group mt-4 pt-4 border-t border-white/10">
                  <summary className="flex items-center gap-2 cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors list-none">
                    <History className="w-4 h-4" />
                    <span>Lịch sử thay đổi ({task.history.length})</span>
                    <span className="ml-auto group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="mt-3 space-y-2 pl-6">
                    {task.history.map((h, i) => (
                      <div key={i} className="flex gap-3 text-xs border-l-2 border-blue-500/30 pl-3 py-1">
                        <div className="flex-1">
                          <p className="font-medium text-foreground">
                            {h.status} <span className="text-muted-foreground">bởi {h.changedBy}</span>
                          </p>
                          <p className="text-muted-foreground">
                            {new Date(h.changedAt).toLocaleString('vi-VN')}
                          </p>
                          {h.note && (
                            <p className="text-muted-foreground italic mt-1">"{h.note}"</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </CardContent>
          </Card>
        );
      })}

      {isAdmin && (
        <Card className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent border-blue-500/20">
          <CardContent className="py-4">
            <p className="text-sm text-muted-foreground">
              💡 <span className="font-medium">Admin:</span> Bạn có thể giao, duyệt và chỉnh sửa công việc từ trang Quản lý công việc
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmployeeTasksTab;
