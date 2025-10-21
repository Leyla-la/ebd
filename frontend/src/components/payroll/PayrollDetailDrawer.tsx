"use client";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  getPayrollFullDetails,
  PayrollFullDetails,
} from "@/lib/actions/payroll";
import { useEffect, useState } from "react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Receipt,
  User,
  Briefcase,
  Hash,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";

interface PayrollDetailDrawerProps {
  payrollId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const LoadingSkeleton = () => (
  <div className="p-6">
    <div className="flex items-center space-x-4 mb-6">
      <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
      <div>
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
    <div className="space-y-4">
      <div className="h-24 w-full bg-gray-200 rounded-lg animate-pulse"></div>
      <div className="h-48 w-full bg-gray-200 rounded-lg animate-pulse"></div>
    </div>
  </div>
);

export function PayrollDetailDrawer({
  payrollId,
  isOpen,
  onClose,
}: PayrollDetailDrawerProps) {
  const [details, setDetails] = useState<PayrollFullDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (payrollId && isOpen) {
      const fetchDetails = async () => {
        setLoading(true);
        const data = await getPayrollFullDetails(payrollId);
        setDetails(data);
        setLoading(false);
      };
      fetchDetails();
    }
  }, [payrollId, isOpen]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Paid":
        return <CheckCircle className="text-green-500" />;
      case "Failed":
        return <XCircle className="text-red-500" />;
      default:
        return <Clock className="text-yellow-500" />;
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <ScrollArea>
          <div className="p-4 md:p-6">
            {loading ? (
              <LoadingSkeleton />
            ) : !details ? (
              <div className="text-center p-8">
                <p>Không tìm thấy dữ liệu chi tiết lương.</p>
              </div>
            ) : (
              <>
                <DrawerHeader className="text-left px-0">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={details.employee.avatarUrl || ""}
                        alt={details.employee.name}
                      />
                      <AvatarFallback>
                        {details.employee.name ? details.employee.name.charAt(0) : "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <DrawerTitle className="text-2xl font-bold">
                        {details.employee.name}
                      </DrawerTitle>
                      <DrawerDescription className="text-base text-gray-500">
                        <span className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-2" />
                          {details.employee.position}
                          <Hash className="w-4 h-4 mr-2 ml-4" />
                          {details.employee.employeeCode}
                        </span>
                      </DrawerDescription>
                    </div>
                  </div>
                </DrawerHeader>

                <Tabs defaultValue="overview" className="mt-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">
                      <DollarSign className="w-4 h-4 mr-2" /> Tổng Quan
                    </TabsTrigger>
                    <TabsTrigger value="income">
                      <TrendingUp className="w-4 h-4 mr-2" /> Chi Tiết Thu Nhập
                    </TabsTrigger>
                    <TabsTrigger value="deductions">
                      <TrendingDown className="w-4 h-4 mr-2" /> Chi Tiết Khấu Trừ
                    </TabsTrigger>
                    <TabsTrigger value="history">
                      <Receipt className="w-4 h-4 mr-2" /> Lịch Sử Giao Dịch
                    </TabsTrigger>
                  </TabsList>

                  {/* Overview Tab */}
                  <TabsContent value="overview" className="mt-4">
                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100">
                      <CardHeader>
                        <CardTitle className="text-lg font-medium text-gray-600">
                          Lương Thực Nhận (Tháng {details.month}/{details.year})
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-5xl font-bold text-blue-600">
                          {formatCurrency(details.netSalary)}
                        </p>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Lương & Phụ Cấp
                          </CardTitle>
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-green-600">
                            {formatCurrency(details.baseSalary + details.totalAllowances)}
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Tổng Thưởng
                          </CardTitle>
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-green-600">
                            + {formatCurrency(details.totalRewards)}
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            Tổng Khấu Trừ
                          </CardTitle>
                          <TrendingDown className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-red-600">
                            - {formatCurrency(details.totalDeductions)}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                     <Card className="mt-4">
                        <CardHeader>
                            <CardTitle className="text-md font-medium">Thông tin thêm</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-gray-600">
                            <p>Số ngày nghỉ phép: {details.paidLeaveDays}</p>
                            <p>Số ngày nghỉ không lương: {details.unpaidLeaveDays}</p>
                        </CardContent>
                     </Card>
                  </TabsContent>

                  {/* Income Details Tab */}
                  <TabsContent value="income" className="mt-4 space-y-3">
                     <Card>
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-center">
                                <p className="font-semibold">Lương cơ bản</p>
                                <p className="font-bold text-lg">{formatCurrency(details.baseSalary)}</p>
                            </div>
                        </CardContent>
                     </Card>
                    {details.incomeItems.map((item, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold">{item.name}</p>
                              <Badge className={cn(item.type === "reward" ? "text-green-700" : "text-blue-700")}> 
                                {item.type === "reward" ? "Thưởng" : "Phụ cấp"}
                              </Badge>
                            </div>
                            <p className="font-bold text-lg text-green-600">
                              + {formatCurrency(item.amount)}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  {/* Deductions Details Tab */}
                  <TabsContent value="deductions" className="mt-4 space-y-3">
                    {details.deductionItems.map((item, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-semibold">{item.name}</p>
                              <Badge className={cn(
                                  item.type === "deduction" ? "text-red-700" : "",
                                  item.type === "tax" ? "text-orange-700" : "",
                                  item.type === "insurance" ? "text-purple-700" : ""
                                )}
                              >
                                {item.type === 'deduction' ? 'Phạt' : item.type === 'tax' ? 'Thuế' : 'Bảo hiểm'}
                              </Badge>
                            </div>
                            <p className="font-bold text-lg text-red-600">
                              - {formatCurrency(item.amount)}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  {/* Transaction History Tab */}
                  <TabsContent value="history" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Chi Tiết Thanh Toán</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Trạng thái</span>
                          <Badge className={cn(
                              details.status === "PAID" ? "bg-green-100 text-green-800" : "",
                              details.status === "FAILED" ? "bg-red-100 text-red-800" : "",
                              details.status === "PENDING" ? "bg-yellow-100 text-yellow-800" : ""
                            )}
                          >
                            <div className="flex items-center">
                                {getStatusIcon(details.status)}
                                <span className="ml-2">{details.status}</span>
                            </div>
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Ngày thanh toán</span>
                          <span>{details.paymentDate ? new Date(details.paymentDate).toLocaleDateString('vi-VN') : 'N/A'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Mã giao dịch</span>
                          <span className="font-mono">{details.transactionId ?? 'N/A'}</span>
                        </div>
                         <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Cổng thanh toán</span>
                          <span>AppotaPay (mock)</span>
                        </div>
                        {details.status === 'FAILED' && (
                            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                                Thử lại thanh toán
                            </button>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
