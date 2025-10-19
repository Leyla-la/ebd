import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, TrendingUp, TrendingDown, Calendar, FileText, 
  CheckCircle, Clock, XCircle, CreditCard, Wallet, PiggyBank, 
  AlertCircle, BarChart3, Filter, ChevronDown
} from "lucide-react";

// Full Payroll interface matching Prisma schema
export interface PayrollItem {
  id: string;
  employeeId: string;
  payPeriodStart?: string;
  payPeriodEnd?: string;
  payDate?: string;
  paymentDate?: string;
  payRate?: number;
  payFrequency?: string;
  hoursWorked?: number;
  grossPay?: number;
  baseSalary?: number;
  netPay?: number;
  netSalary?: number;
  deductions?: Record<string, number>;
  bonuses?: Record<string, number>;
  allowance?: number;
  bonus?: number;
  deduction?: number;
  tax?: number;
  kpiAttendance?: number;
  kpiBehaviour?: number;
  kpiPerformance?: number;
  kpiTotal?: number;
  bonusByKPI?: number;
  penaltyByBehaviour?: number;
  status?: string;
  paymentStatus?: string;
  paymentMethod?: string;
  autoDeducted?: boolean;
  payrollFileUrl?: string;
  month?: string;
  year?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface EmployeePayrollTabProps {
  payrolls: PayrollItem[];
  isAdmin?: boolean;
}

const statusConfig = {
  PAID: { label: "Đã thanh toán", color: "bg-green-500/20 text-green-700 border-green-500/30", icon: CheckCircle },
  PENDING: { label: "Chờ xử lý", color: "bg-yellow-500/20 text-yellow-700 border-yellow-500/30", icon: Clock },
  PROCESSING: { label: "Đang xử lý", color: "bg-blue-500/20 text-blue-700 border-blue-500/30", icon: Clock },
  FAILED: { label: "Thất bại", color: "bg-red-500/20 text-red-700 border-red-500/30", icon: XCircle },
};

// Filter Bar Component
const PayrollFilterBar: React.FC<{
  months: string[];
  years: number[];
  selectedMonth: string;
  selectedYear: number;
  onMonthChange: (month: string) => void;
  onYearChange: (year: number) => void;
}> = ({ months, years, selectedMonth, selectedYear, onMonthChange, onYearChange }) => (
  <div className="flex flex-wrap gap-4 items-center justify-between mb-6 px-2 py-4 rounded-2xl bg-gradient-to-r from-green-100/60 via-white/40 to-green-50/30 border border-green-300/30 shadow-lg">
    <div className="flex items-center gap-2">
      <Filter className="w-5 h-5 text-green-600" />
      <span className="font-semibold text-green-700">Lọc theo tháng/năm</span>
    </div>
    <div className="flex gap-2 items-center">
      <select
        className="px-3 py-2 rounded-lg border border-green-300 bg-white/80 text-green-700 font-semibold shadow focus:outline-none"
        value={selectedMonth}
        onChange={e => onMonthChange(e.target.value)}
      >
        <option value="">Tất cả tháng</option>
        {months.map(m => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      <select
        className="px-3 py-2 rounded-lg border border-green-300 bg-white/80 text-green-700 font-semibold shadow focus:outline-none"
        value={selectedYear}
        onChange={e => onYearChange(Number(e.target.value))}
      >
        <option value="">Tất cả năm</option>
        {years.map(y => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  </div>
);

const EmployeePayrollTab: React.FC<EmployeePayrollTabProps> = ({ payrolls, isAdmin }) => {
  // Filter state
  const months = useMemo(() => Array.from(new Set(payrolls.map(p => p.month).filter(Boolean))) as string[], [payrolls]);
  const years = useMemo(() => Array.from(new Set(payrolls.map(p => p.year).filter(Boolean))) as number[], [payrolls]);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number>(years[0] || new Date().getFullYear());

  // Filtered payrolls
  const filteredPayrolls = useMemo(() => {
    return payrolls.filter(p => {
      const matchMonth = selectedMonth ? p.month === selectedMonth : true;
      const matchYear = selectedYear ? p.year === selectedYear : true;
      return matchMonth && matchYear;
    });
  }, [payrolls, selectedMonth, selectedYear]);

  // Summary
  const summary = useMemo(() => {
    let totalNet = 0, totalGross = 0, totalBonus = 0, totalDeduct = 0;
    filteredPayrolls.forEach(p => {
      totalNet += p.netSalary ?? p.netPay ?? 0;
      totalGross += p.grossPay ?? p.baseSalary ?? 0;
      totalBonus += (p.allowance ?? 0) + (p.bonus ?? 0) + (p.bonusByKPI ?? 0);
      totalDeduct += (p.tax ?? 0) + (p.deduction ?? 0) + (p.penaltyByBehaviour ?? 0);
    });
    return { totalNet, totalGross, totalBonus, totalDeduct };
  }, [filteredPayrolls]);

  if (!payrolls || payrolls.length === 0) {
    return (
      <Card className="backdrop-blur-xl bg-gradient-to-br from-white/60 via-white/40 to-white/30 border-white/20 shadow-2xl">
        <CardContent className="py-16 text-center">
          <DollarSign className="mx-auto h-16 w-16 text-muted-foreground/30 mb-4" />
          <p className="text-lg font-medium text-muted-foreground">Chưa có dữ liệu lương</p>
          <p className="text-sm text-muted-foreground/70 mt-2">Thông tin lương sẽ được cập nhật sau</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Filter Bar */}
      {isAdmin && (
        <PayrollFilterBar
          months={months}
          years={years}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={setSelectedMonth}
          onYearChange={setSelectedYear}
        />
      )}

      {/* Summary Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-100 to-green-50 border-green-300/60 shadow-md">
          <CardContent className="pt-5 pb-4 text-center">
            <PiggyBank className="w-10 h-10 mx-auto mb-3 text-green-600" />
            <p className="text-xs text-muted-foreground mb-1.5 font-medium">Tổng lương thực nhận</p>
            <p className="text-xl md:text-2xl font-bold text-green-700">{summary.totalNet.toLocaleString('vi-VN')}</p>
            <p className="text-xs text-green-600 font-semibold">₫</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-100 to-blue-50 border-blue-300/60 shadow-md">
          <CardContent className="pt-5 pb-4 text-center">
            <DollarSign className="w-10 h-10 mx-auto mb-3 text-blue-600" />
            <p className="text-xs text-muted-foreground mb-1.5 font-medium">Tổng thu nhập</p>
            <p className="text-xl md:text-2xl font-bold text-blue-700">{summary.totalGross.toLocaleString('vi-VN')}</p>
            <p className="text-xs text-blue-600 font-semibold">₫</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-emerald-300/60 shadow-md">
          <CardContent className="pt-5 pb-4 text-center">
            <TrendingUp className="w-10 h-10 mx-auto mb-3 text-emerald-600" />
            <p className="text-xs text-muted-foreground mb-1.5 font-medium">Tổng thưởng/phụ cấp</p>
            <p className="text-xl md:text-2xl font-bold text-emerald-700">{summary.totalBonus.toLocaleString('vi-VN')}</p>
            <p className="text-xs text-emerald-600 font-semibold">₫</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-300/60 shadow-md">
          <CardContent className="pt-5 pb-4 text-center">
            <TrendingDown className="w-10 h-10 mx-auto mb-3 text-red-600" />
            <p className="text-xs text-muted-foreground mb-1.5 font-medium">Tổng khấu trừ</p>
            <p className="text-xl md:text-2xl font-bold text-red-700">{summary.totalDeduct.toLocaleString('vi-VN')}</p>
            <p className="text-xs text-red-600 font-semibold">₫</p>
          </CardContent>
        </Card>
      </div>

      {/* Payroll List */}
      <div className="space-y-6">
        {filteredPayrolls.length === 0 ? (
          <Card className="backdrop-blur-xl bg-gradient-to-br from-white/60 via-white/40 to-white/30 border-white/20 shadow-2xl">
            <CardContent className="py-16 text-center">
              <DollarSign className="mx-auto h-16 w-16 text-muted-foreground/30 mb-4" />
              <p className="text-lg font-medium text-muted-foreground">Không có dữ liệu lương cho bộ lọc này</p>
            </CardContent>
          </Card>
        ) : filteredPayrolls.map((payroll) => {
          const paymentStatus = (payroll.paymentStatus || payroll.status || 'PENDING') as keyof typeof statusConfig;
          const StatusIcon = statusConfig[paymentStatus]?.icon || Clock;
          const statusStyle = statusConfig[paymentStatus]?.color || statusConfig.PENDING.color;
          const statusLabel = statusConfig[paymentStatus]?.label || paymentStatus;

          const finalNetSalary = payroll.netSalary ?? payroll.netPay ?? 0;
          const finalGrossPay = payroll.grossPay ?? payroll.baseSalary ?? 0;
          const totalAdditions = (payroll.allowance ?? 0) + (payroll.bonus ?? 0) + (payroll.bonusByKPI ?? 0);
          const totalDeductions = (payroll.tax ?? 0) + (payroll.deduction ?? 0) + (payroll.penaltyByBehaviour ?? 0);

          // Format bonuses/deductions as table
          const bonusDetails = payroll.bonuses && typeof payroll.bonuses === 'object' && Object.keys(payroll.bonuses).length > 0
            ? Object.entries(payroll.bonuses).map(([k, v]) => ({ label: k, value: v })) : [];
          const deductionDetails = payroll.deductions && typeof payroll.deductions === 'object' && Object.keys(payroll.deductions).length > 0
            ? Object.entries(payroll.deductions).map(([k, v]) => ({ label: k, value: v })) : [];

          return (
            <Card 
              key={payroll.id}
              className="backdrop-blur-xl bg-gradient-to-br from-white/90 via-white/70 to-white/50 border-white/40 shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              {/* Header Section */}
              <CardHeader className="border-b border-white/30 pb-6 bg-gradient-to-r from-green-50/70 via-blue-50/50 to-emerald-50/30">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                        <Wallet className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-900 via-green-700 to-green-600 bg-clip-text text-transparent">
                          {payroll.month && payroll.year ? `Bảng lương tháng ${payroll.month}/${payroll.year}` : 'Bảng lương'}
                        </CardTitle>
                        {(payroll.payPeriodStart && payroll.payPeriodEnd) && (
                          <CardDescription className="text-sm mt-1.5 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Kỳ lương: {new Date(payroll.payPeriodStart).toLocaleDateString('vi-VN')} → {new Date(payroll.payPeriodEnd).toLocaleDateString('vi-VN')}
                          </CardDescription>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className={`${statusStyle} border px-3 py-1.5 text-sm font-semibold shadow-sm`}>
                        <StatusIcon className="w-4 h-4 mr-1.5" />
                        {statusLabel}
                      </Badge>
                      {payroll.paymentMethod && (
                        <Badge className="bg-purple-500/20 text-purple-700 border-purple-500/30 border px-3 py-1.5 text-sm font-medium">
                          <CreditCard className="w-3.5 h-3.5 mr-1.5" />
                          {payroll.paymentMethod}
                        </Badge>
                      )}
                      {payroll.payFrequency && (
                        <Badge className="bg-indigo-500/20 text-indigo-700 border-indigo-500/30 border px-3 py-1.5 text-sm">
                          {payroll.payFrequency}
                        </Badge>
                      )}
                      {payroll.autoDeducted && (
                        <Badge className="bg-blue-500/15 text-blue-600 border-blue-400/30 border px-2.5 py-1 text-xs font-medium">
                          Auto-deducted
                        </Badge>
                      )}
                    </div>
                  </div>
                  {/* Net Salary Highlight */}
                  <div className="w-full lg:w-auto lg:min-w-[280px] text-center lg:text-right bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 rounded-2xl p-5 border-2 border-green-300/60 shadow-xl">
                    <p className="text-sm font-semibold text-green-700 mb-2 flex items-center justify-center lg:justify-end gap-2">
                      <PiggyBank className="w-5 h-5" />
                      Lương thực nhận
                    </p>
                    <p className="text-5xl lg:text-4xl font-black bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-1">
                      {finalNetSalary.toLocaleString('vi-VN')}
                    </p>
                    <p className="text-lg font-bold text-green-700">₫</p>
                    {(payroll.paymentDate || payroll.payDate) && (
                      <p className="text-xs text-green-600 mt-2 flex items-center justify-center lg:justify-end gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(payroll.paymentDate || payroll.payDate!).toLocaleDateString('vi-VN')}
                      </p>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-6 space-y-6">
                {/* Summary Cards - 4 Column Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200/60 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="pt-5 pb-4 text-center">
                      <DollarSign className="w-10 h-10 mx-auto mb-3 text-blue-600" />
                      <p className="text-xs text-muted-foreground mb-1.5 font-medium">Tổng thu nhập</p>
                      <p className="text-xl lg:text-2xl font-bold text-blue-700">
                        {finalGrossPay.toLocaleString('vi-VN')}
                      </p>
                      <p className="text-xs text-blue-600 font-semibold">₫</p>
                      {payroll.payRate && payroll.hoursWorked && (
                        <p className="text-xs text-muted-foreground mt-2 bg-blue-50 rounded px-2 py-1">
                          {payroll.payRate.toLocaleString('vi-VN')}₫/h × {payroll.hoursWorked}h
                        </p>
                      )}
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200/60 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="pt-5 pb-4 text-center">
                      <TrendingUp className="w-10 h-10 mx-auto mb-3 text-green-600" />
                      <p className="text-xs text-muted-foreground mb-1.5 font-medium">Tổng cộng thêm</p>
                      <p className="text-xl lg:text-2xl font-bold text-green-700">
                        {totalAdditions.toLocaleString('vi-VN')}
                      </p>
                      <p className="text-xs text-green-600 font-semibold">₫</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200/60 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="pt-5 pb-4 text-center">
                      <TrendingDown className="w-10 h-10 mx-auto mb-3 text-red-600" />
                      <p className="text-xs text-muted-foreground mb-1.5 font-medium">Tổng khấu trừ</p>
                      <p className="text-xl lg:text-2xl font-bold text-red-700">
                        {totalDeductions.toLocaleString('vi-VN')}
                      </p>
                      <p className="text-xs text-red-600 font-semibold">₫</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200/60 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="pt-5 pb-4 text-center">
                      <BarChart3 className="w-10 h-10 mx-auto mb-3 text-purple-600" />
                      <p className="text-xs text-muted-foreground mb-1.5 font-medium">KPI Tổng</p>
                      <p className="text-xl lg:text-2xl font-bold text-purple-700">
                        {payroll.kpiTotal ?? 0}%
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Detailed Breakdown - 2 Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Income Details */}
                  <Card className="bg-gradient-to-br from-white to-green-50/30 border-green-200/40 shadow-lg">
                    <CardHeader className="pb-4 bg-gradient-to-r from-green-100/60 to-emerald-50/40 border-b border-green-200/50">
                      <CardTitle className="text-lg font-bold flex items-center gap-2.5 text-green-800">
                        <div className="p-2 rounded-lg bg-green-500/20">
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        </div>
                        Chi tiết thu nhập
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-5">
                      {payroll.baseSalary !== undefined && (
                        <div className="flex justify-between items-center py-2.5 px-3 rounded-lg bg-white/60 border border-gray-100">
                          <span className="text-sm font-medium text-gray-700">Lương cơ bản</span>
                          <span className="font-bold text-sm">{(payroll.baseSalary ?? 0).toLocaleString('vi-VN')} ₫</span>
                        </div>
                      )}
                      {payroll.allowance !== undefined && payroll.allowance > 0 && (
                        <div className="flex justify-between items-center py-2.5 px-3 rounded-lg bg-blue-50/50 border border-blue-100">
                          <span className="text-sm font-medium text-gray-700">Phụ cấp</span>
                          <span className="font-bold text-sm text-blue-700">+{(payroll.allowance ?? 0).toLocaleString('vi-VN')} ₫</span>
                        </div>
                      )}
                      {payroll.bonus !== undefined && payroll.bonus > 0 && (
                        <div className="flex justify-between items-center py-2.5 px-3 rounded-lg bg-green-50/50 border border-green-100">
                          <span className="text-sm font-medium text-gray-700">Thưởng</span>
                          <span className="font-bold text-sm text-green-700">+{(payroll.bonus ?? 0).toLocaleString('vi-VN')} ₫</span>
                        </div>
                      )}
                      {payroll.bonusByKPI !== undefined && payroll.bonusByKPI > 0 && (
                        <div className="flex justify-between items-center py-2.5 px-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
                          <span className="text-sm font-medium text-gray-700">Thưởng KPI</span>
                          <span className="font-bold text-sm text-emerald-700">+{(payroll.bonusByKPI ?? 0).toLocaleString('vi-VN')} ₫</span>
                        </div>
                      )}
                      {/* Bonus details as table */}
                      {bonusDetails.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-green-200">
                          <div className="text-xs font-semibold text-gray-600 mb-2">Chi tiết thưởng</div>
                          <table className="w-full text-xs bg-white/80 rounded-lg overflow-hidden">
                            <tbody>
                              {bonusDetails.map(b => (
                                <tr key={b.label} className="border-b border-green-100">
                                  <td className="py-1 px-2 text-gray-700 font-medium">{b.label}</td>
                                  <td className="py-1 px-2 text-green-700 font-bold text-right">+{b.value.toLocaleString('vi-VN')} ₫</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                      {totalAdditions > 0 && (
                        <div className="flex justify-between items-center py-3 px-3 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 mt-3">
                          <span className="text-sm font-bold text-green-800">Tổng cộng</span>
                          <span className="font-black text-base text-green-800">+{totalAdditions.toLocaleString('vi-VN')} ₫</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  {/* Deduction Details */}
                  <Card className="bg-gradient-to-br from-white to-red-50/30 border-red-200/40 shadow-lg">
                    <CardHeader className="pb-4 bg-gradient-to-r from-red-100/60 to-rose-50/40 border-b border-red-200/50">
                      <CardTitle className="text-lg font-bold flex items-center gap-2.5 text-red-800">
                        <div className="p-2 rounded-lg bg-red-500/20">
                          <TrendingDown className="w-5 h-5 text-red-600" />
                        </div>
                        Chi tiết khấu trừ
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-5">
                      {payroll.tax !== undefined && payroll.tax > 0 && (
                        <div className="flex justify-between items-center py-2.5 px-3 rounded-lg bg-red-50/50 border border-red-100">
                          <span className="text-sm font-medium text-gray-700">Thuế TNCN</span>
                          <span className="font-bold text-sm text-red-700">-{(payroll.tax ?? 0).toLocaleString('vi-VN')} ₫</span>
                        </div>
                      )}
                      {payroll.deduction !== undefined && payroll.deduction > 0 && (
                        <div className="flex justify-between items-center py-2.5 px-3 rounded-lg bg-orange-50/50 border border-orange-100">
                          <span className="text-sm font-medium text-gray-700">Khấu trừ khác</span>
                          <span className="font-bold text-sm text-orange-700">-{(payroll.deduction ?? 0).toLocaleString('vi-VN')} ₫</span>
                        </div>
                      )}
                      {payroll.penaltyByBehaviour !== undefined && payroll.penaltyByBehaviour > 0 && (
                        <div className="flex justify-between items-center py-2.5 px-3 rounded-lg bg-red-100/60 border border-red-200">
                          <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                            <AlertCircle className="w-4 h-4 text-red-600" />
                            Phạt hành vi
                          </span>
                          <span className="font-bold text-sm text-red-800">-{(payroll.penaltyByBehaviour ?? 0).toLocaleString('vi-VN')} ₫</span>
                        </div>
                      )}
                      {/* Deduction details as table */}
                      {deductionDetails.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-red-200">
                          <div className="text-xs font-semibold text-gray-600 mb-2">Chi tiết khấu trừ</div>
                          <table className="w-full text-xs bg-white/80 rounded-lg overflow-hidden">
                            <tbody>
                              {deductionDetails.map(d => (
                                <tr key={d.label} className="border-b border-red-100">
                                  <td className="py-1 px-2 text-gray-700 font-medium">{d.label}</td>
                                  <td className="py-1 px-2 text-red-700 font-bold text-right">-{d.value.toLocaleString('vi-VN')} ₫</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                      {totalDeductions > 0 && (
                        <div className="flex justify-between items-center py-3 px-3 rounded-lg bg-gradient-to-r from-red-100 to-rose-100 border-2 border-red-300 mt-3">
                          <span className="text-sm font-bold text-red-800">Tổng cộng</span>
                          <span className="font-black text-base text-red-800">-{totalDeductions.toLocaleString('vi-VN')} ₫</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* KPI Section - Full Width */}
                {(payroll.kpiAttendance !== undefined || payroll.kpiBehaviour !== undefined || payroll.kpiPerformance !== undefined) && (
                  <Card className="bg-gradient-to-br from-purple-50/50 to-indigo-50/30 border-purple-200/50 shadow-lg">
                    <CardHeader className="pb-4 bg-gradient-to-r from-purple-100/60 to-indigo-50/40 border-b border-purple-200/50">
                      <CardTitle className="text-lg font-bold flex items-center gap-2.5 text-purple-800">
                        <div className="p-2 rounded-lg bg-purple-500/20">
                          <BarChart3 className="w-5 h-5 text-purple-600" />
                        </div>
                        Chỉ số KPI Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-5">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {payroll.kpiAttendance !== undefined && (
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-semibold text-gray-700">Chuyên cần</span>
                              <span className="font-bold text-sm text-blue-700">{payroll.kpiAttendance ?? 0}%</span>
                            </div>
                            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 shadow-sm"
                                style={{ width: `${payroll.kpiAttendance ?? 0}%` }}
                              />
                            </div>
                          </div>
                        )}
                        {payroll.kpiBehaviour !== undefined && (
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-semibold text-gray-700">Hành vi</span>
                              <span className="font-bold text-sm text-green-700">{payroll.kpiBehaviour ?? 0}%</span>
                            </div>
                            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                              <div 
                                className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500 shadow-sm"
                                style={{ width: `${payroll.kpiBehaviour ?? 0}%` }}
                              />
                            </div>
                          </div>
                        )}
                        {payroll.kpiPerformance !== undefined && (
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-semibold text-gray-700">Hiệu suất</span>
                              <span className="font-bold text-sm text-purple-700">{payroll.kpiPerformance ?? 0}%</span>
                            </div>
                            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                              <div 
                                className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-500 shadow-sm"
                                style={{ width: `${payroll.kpiPerformance ?? 0}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      {payroll.kpiTotal !== undefined && (
                        <div className="flex justify-between items-center py-4 px-4 rounded-xl bg-gradient-to-r from-purple-100 to-indigo-100 border-2 border-purple-300 mt-5">
                          <span className="text-base font-bold text-purple-900">Tổng KPI</span>
                          <span className="font-black text-xl text-purple-900">{payroll.kpiTotal ?? 0}%</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* File Download Section */}
                {payroll.payrollFileUrl && (
                  <div className="flex justify-center pt-2">
                    <a 
                      href={payroll.payrollFileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold text-base transform hover:scale-105"
                    >
                      <FileText className="w-5 h-5" />
                      Tải phiếu lương PDF
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {isAdmin && (
        <Card className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 via-indigo-400/5 to-purple-500/5 border-blue-500/20 shadow-lg">
          <CardContent className="py-5">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="text-2xl">💡</span>
              <span><span className="font-semibold text-foreground">Admin:</span> Bạn có thể xuất, xác nhận và gửi phiếu lương từ trang Quản lý lương</span>
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmployeePayrollTab;
