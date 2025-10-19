import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertTriangle, AlertCircle, Info, Clock } from "lucide-react";

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

const severityConfig: Record<string, { label: string; color: string; bgColor: string; icon: any }> = {
  LOW: { 
    label: "Thấp", 
    color: "text-blue-700", 
    bgColor: "bg-blue-500/20 border-blue-500/30",
    icon: Info 
  },
  MEDIUM: { 
    label: "Trung bình", 
    color: "text-yellow-700", 
    bgColor: "bg-yellow-500/20 border-yellow-500/30",
    icon: AlertCircle 
  },
  HIGH: { 
    label: "Cao", 
    color: "text-orange-700", 
    bgColor: "bg-orange-500/20 border-orange-500/30",
    icon: AlertTriangle 
  },
  CRITICAL: { 
    label: "Nghiêm trọng", 
    color: "text-red-700", 
    bgColor: "bg-red-500/20 border-red-500/30",
    icon: AlertTriangle 
  },
};

const EmployeeEbdLogsTab: React.FC<EmployeeEbdLogsTabProps> = ({ ebdLogs, isAdmin }) => {
  if (!ebdLogs || ebdLogs.length === 0) {
    return (
      <Card className="backdrop-blur-xl bg-gradient-to-br from-white/60 via-white/40 to-white/30 border-white/20 shadow-2xl">
        <CardContent className="py-16 text-center">
          <Activity className="mx-auto h-16 w-16 text-muted-foreground/30 mb-4" />
          <p className="text-lg font-medium text-muted-foreground">Chưa có log hành vi</p>
          <p className="text-sm text-muted-foreground/70 mt-2">Hệ thống sẽ tự động ghi nhận các hành vi bất thường</p>
        </CardContent>
      </Card>
    );
  }

  // Sort by timestamp descending (newest first)
  const sortedLogs = [...ebdLogs].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {Object.entries(severityConfig).map(([severity, config]) => {
          const count = ebdLogs.filter(log => log.severity === severity).length;
          const Icon = config.icon;
          return (
            <Card 
              key={severity}
              className="backdrop-blur-xl bg-gradient-to-br from-white/60 via-white/40 to-white/30 border-white/20"
            >
              <CardContent className="pt-6 pb-4 text-center">
                <Icon className={`w-6 h-6 mx-auto mb-2 ${config.color}`} />
                <p className="text-2xl font-bold text-foreground">{count}</p>
                <p className="text-xs text-muted-foreground mt-1">{config.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Log Timeline */}
      <div className="space-y-3">
        {sortedLogs.map((log) => {
          const severityInfo = severityConfig[log.severity] || severityConfig.LOW;
          const SeverityIcon = severityInfo.icon;

          return (
            <Card 
              key={log.id}
              className={`backdrop-blur-xl bg-gradient-to-br from-white/60 via-white/40 to-white/30 border-white/20 shadow-lg hover:shadow-xl transition-all duration-200 ${
                log.severity === 'CRITICAL' ? 'border-red-500/40' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Severity Indicator */}
                  <div className={`shrink-0 w-10 h-10 rounded-full ${severityInfo.bgColor} border flex items-center justify-center`}>
                    <SeverityIcon className={`w-5 h-5 ${severityInfo.color}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={`${severityInfo.bgColor} border ${severityInfo.color} px-2 py-0.5 text-xs font-semibold`}>
                            {severityInfo.label}
                          </Badge>
                          <span className="text-sm font-semibold text-foreground">{log.eventType}</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {log.description}
                        </p>
                      </div>
                      
                      {/* Value Display */}
                      <div className="text-right shrink-0">
                        <p className="text-xs text-muted-foreground mb-0.5">Giá trị</p>
                        <p className={`text-lg font-bold ${
                          log.value > 75 ? 'text-red-600' : 
                          log.value > 50 ? 'text-orange-600' : 
                          log.value > 25 ? 'text-yellow-600' : 
                          'text-blue-600'
                        }`}>
                          {log.value}
                        </p>
                      </div>
                    </div>

                    {/* Timestamp */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      <time dateTime={log.timestamp}>
                        {new Date(log.timestamp).toLocaleString('vi-VN', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit'
                        })}
                      </time>
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
              💡 <span className="font-medium">Admin:</span> Bạn có thể xem chi tiết và xuất báo cáo hành vi từ trang Quản lý EBD Logs
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmployeeEbdLogsTab;
