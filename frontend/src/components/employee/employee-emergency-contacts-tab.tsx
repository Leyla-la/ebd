import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Phone, Mail, MapPin, Heart } from "lucide-react";

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

const relationshipConfig: Record<string, { label: string; color: string; icon: string }> = {
  SPOUSE: { label: "Vợ/Chồng", color: "bg-pink-500/20 text-pink-700", icon: "💑" },
  PARENT: { label: "Cha/Mẹ", color: "bg-blue-500/20 text-blue-700", icon: "👨‍👩‍👦" },
  SIBLING: { label: "Anh/Chị/Em", color: "bg-purple-500/20 text-purple-700", icon: "👫" },
  CHILD: { label: "Con", color: "bg-green-500/20 text-green-700", icon: "👶" },
  FRIEND: { label: "Bạn bè", color: "bg-yellow-500/20 text-yellow-700", icon: "🤝" },
  OTHER: { label: "Khác", color: "bg-gray-500/20 text-gray-700", icon: "👤" },
};

const EmployeeEmergencyContactsTab: React.FC<EmployeeEmergencyContactsTabProps> = ({ emergencyContacts, isAdmin }) => {
  if (!emergencyContacts || emergencyContacts.length === 0) {
    return (
      <Card className="backdrop-blur-xl bg-gradient-to-br from-white/60 via-white/40 to-white/30 border-white/20 shadow-2xl">
        <CardContent className="py-16 text-center">
          <Heart className="mx-auto h-16 w-16 text-muted-foreground/30 mb-4" />
          <p className="text-lg font-medium text-muted-foreground">Chưa có liên hệ khẩn cấp</p>
          <p className="text-sm text-muted-foreground/70 mt-2">Thêm người liên hệ khẩn cấp để đảm bảo an toàn</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {emergencyContacts.map((contact, index) => {
          const relationshipInfo = relationshipConfig[contact.relationship?.toUpperCase()] || relationshipConfig.OTHER;

          return (
            <Card 
              key={contact.id}
              className="backdrop-blur-xl bg-gradient-to-br from-white/60 via-white/40 to-white/30 border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              <CardHeader className="pb-3 border-b border-white/10">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 flex items-center justify-center text-lg">
                        {relationshipInfo.icon}
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold text-foreground">
                          {contact.name}
                        </CardTitle>
                        <Badge className={`${relationshipInfo.color} border-0 px-2 py-0.5 text-xs font-medium mt-1`}>
                          {relationshipInfo.label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {index === 0 && (
                    <Badge className="bg-red-500/20 text-red-700 border-red-500/30 border px-2 py-1 text-xs font-medium">
                      Liên hệ chính
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">Số điện thoại</p>
                    <a 
                      href={`tel:${contact.phoneNumber}`}
                      className="font-semibold text-sm text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      {contact.phoneNumber}
                    </a>
                  </div>
                </div>

                {contact.email && (
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-0.5">Email</p>
                      <a 
                        href={`mailto:${contact.email}`}
                        className="font-medium text-sm text-purple-600 hover:text-purple-700 hover:underline break-all"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                )}

                {contact.address && (
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-0.5">Địa chỉ</p>
                      <p className="font-medium text-sm text-foreground leading-relaxed">
                        {contact.address}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {isAdmin && (
        <Card className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent border-blue-500/20">
          <CardContent className="py-4">
            <p className="text-sm text-muted-foreground">
              💡 <span className="font-medium">Admin:</span> Bạn có thể chỉnh sửa thông tin liên hệ khẩn cấp từ trang Quản lý nhân viên
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmployeeEmergencyContactsTab;
