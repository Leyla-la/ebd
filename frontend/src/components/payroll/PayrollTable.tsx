"use client";

import { PayrollWithDetails } from "@/lib/actions/payroll";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, FileText, RefreshCw } from "lucide-react";
import TransferStatusBadge from "./TransferStatusBadge";
import { formatCurrency } from "@/lib/utils";

interface PayrollTableProps {
  payrolls: PayrollWithDetails[];
  onViewDetails: (payroll: PayrollWithDetails) => void;
}

export default function PayrollTable({ payrolls, onViewDetails }: PayrollTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b-white/20 hover:bg-transparent">
          <TableHead>Nhân viên</TableHead>
          <TableHead>Phòng ban</TableHead>
          <TableHead>Thưởng/Phạt</TableHead>
          <TableHead className="text-right">Lương thực nhận</TableHead>
          <TableHead className="text-center">Trạng thái</TableHead>
          <TableHead>Ngày trả</TableHead>
          <TableHead className="text-right">Hành động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payrolls.map((payroll) => (
          <TableRow key={payroll.id} className="border-b-white/10 hover:bg-white/5">
            <TableCell>
              <div className="font-medium">{payroll.employee.name}</div>
              <div className="text-sm text-muted-foreground">
                #{payroll.employee.employeeCode}
              </div>
            </TableCell>
            <TableCell>{payroll.employee.department?.name || 'N/A'}</TableCell>
            <TableCell>
              <div className="flex flex-col items-start">
                <span className="text-green-400 font-mono">+ {formatCurrency((payroll as any).totalRewards || 0)}</span>
                <span className="text-red-400 font-mono">- {formatCurrency((payroll as any).totalDeductions || 0)}</span>
              </div>
            </TableCell>
            <TableCell className="text-right font-mono">
              ₫{payroll.netPay.toLocaleString()}
            </TableCell>
            <TableCell className="text-center">
              <TransferStatusBadge status={payroll.status} />
            </TableCell>
            <TableCell>{payroll.payDate ? new Date(payroll.payDate).toLocaleDateString() : 'N/A'}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-white/10">
                    <span className="sr-only">Mở menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-card">
                  <DropdownMenuItem onClick={() => onViewDetails(payroll)}>
                    Xem chi tiết
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4" />
                    Xuất phiếu lương
                  </DropdownMenuItem>
                  {payroll.status === "FAILED" && (
                    <DropdownMenuItem className="text-yellow-400 focus:text-yellow-300">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Thử lại thanh toán
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
