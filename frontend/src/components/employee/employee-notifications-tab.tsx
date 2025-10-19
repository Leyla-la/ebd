import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Mail, AlertCircle, Info, CheckCircle, Clock } from "lucide-react";

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

const typeConfig: Record<string, { label: string; color: string; icon: any }> = {
  EMAIL: { label: "Email", color: "bg-blue-500/20 text-blue-700", icon: Mail },
  SYSTEM: { label: "Hệ thống", color: "bg-purple-500/20 text-purple-700", icon: Bell },
  ALERT: { label: "Cảnh báo", color: "bg-red-500/20 text-red-700", icon: AlertCircle },
  INFO: { label: "Thông tin", color: "bg-gray-500/20 text-gray-700", icon: Info },
  SUCCESS: { label: "Thành công", color: "bg-green-500/20 text-green-700", icon: CheckCircle },
};

const EmployeeNotificationsTab: React.FC<EmployeeNotificationsTabProps> = ({ notifications, isAdmin }) => {
  if (!notifications || notifications.length === 0) {
    return (
      <Card className="backdrop-blur-xl bg-gradient-to-br from-white/60 via-white/40 to-white/30 border-white/20 shadow-2xl">
        <CardContent className="py-16 text-center">
          <Bell className="mx-auto h-16 w-16 text-muted-foreground/30 mb-4" />
          <p className="text-lg font-medium text-muted-foreground">Chưa có thông báo</p>
          <p className="text-sm text-muted-foreground/70 mt-2">Các thông báo mới sẽ xuất hiện tại đây</p>
        </CardContent>
      </Card>
    );
  }

  // Sort by sentAt descending (newest first)
  const sortedNotifications = [...notifications].sort((a, b) => 
    new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
  );

  // Separate unread and read
  const unreadNotifications = sortedNotifications.filter(n => !n.read);
  const readNotifications = sortedNotifications.filter(n => n.read);

  const NotificationCard = ({ notification }: { notification: NotificationItem }) => {
    const typeInfo = typeConfig[notification.type.toUpperCase()] || typeConfig.INFO;
    const TypeIcon = typeInfo.icon;

    return (
      <Card 
        className={`backdrop-blur-xl bg-gradient-to-br from-white/60 via-white/40 to-white/30 border-white/20 shadow-lg hover:shadow-xl transition-all duration-200 ${
          !notification.read ? 'border-blue-500/40 bg-blue-50/20' : ''
        }`}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className={`shrink-0 w-10 h-10 rounded-full ${typeInfo.color} border border-current/20 flex items-center justify-center`}>
              <TypeIcon className="w-5 h-5" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Badge className={`${typeInfo.color} border-0 px-2 py-0.5 text-xs font-medium`}>
                      {typeInfo.label}
                    </Badge>
                    {!notification.read && (
                      <Badge className="bg-blue-500 text-white border-0 px-2 py-0.5 text-xs font-medium">
                        Mới
                      </Badge>
                    )}
                  </div>
                  <h4 className={`text-sm font-semibold ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {notification.title}
                  </h4>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                {notification.content}
              </p>

              {/* Timestamp */}
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <time dateTime={notification.sentAt}>
                  {new Date(notification.sentAt).toLocaleString('vi-VN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </time>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent border-blue-500/20">
          <CardContent className="pt-6 pb-4 text-center">
            <p className="text-3xl font-bold text-blue-600">{unreadNotifications.length}</p>
            <p className="text-sm text-muted-foreground mt-1">Chưa đọc</p>
          </CardContent>
        </Card>
        <Card className="backdrop-blur-xl bg-gradient-to-br from-gray-500/10 via-gray-400/5 to-transparent border-gray-500/20">
          <CardContent className="pt-6 pb-4 text-center">
            <p className="text-3xl font-bold text-gray-600">{readNotifications.length}</p>
            <p className="text-sm text-muted-foreground mt-1">Đã đọc</p>
          </CardContent>
        </Card>
      </div>

      {/* Unread Notifications */}
      {unreadNotifications.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
            Chưa đọc ({unreadNotifications.length})
          </h3>
          {unreadNotifications.map(notification => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </div>
      )}

      {/* Read Notifications */}
      {readNotifications.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Đã đọc ({readNotifications.length})
          </h3>
          {readNotifications.map(notification => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </div>
      )}

      {isAdmin && (
        <Card className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent border-blue-500/20">
          <CardContent className="py-4">
            <p className="text-sm text-muted-foreground">
              💡 <span className="font-medium">Admin:</span> Bạn có thể gửi thông báo cho nhân viên từ trang Quản lý thông báo
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmployeeNotificationsTab;
