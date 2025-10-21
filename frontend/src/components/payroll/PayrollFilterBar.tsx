"use client";

import { usePayrollStore } from "@/state/payrollStore";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function PayrollFilterBar() {
  const { setFilter } = usePayrollStore();

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center">
      <div className="relative w-full md:w-auto">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Tìm nhân viên..." 
          className="w-full pl-8 md:w-[250px]" 
          onChange={(e) => setFilter({ searchTerm: e.target.value })}
        />
      </div>
      <Select onValueChange={(value) => setFilter({ department: value === 'all' ? '' : value })}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Tất cả phòng ban" />
        </SelectTrigger>
        <SelectContent className="glass-card">
          <SelectItem value="all">Tất cả phòng ban</SelectItem>
          <SelectItem value="Engineering">Engineering</SelectItem>
          <SelectItem value="Design">Design</SelectItem>
          <SelectItem value="Human Resources">Human Resources</SelectItem>
          <SelectItem value="Sales">Sales</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => setFilter({ status: value === 'all' ? '' : value })}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Trạng thái" />
        </SelectTrigger>
        <SelectContent className="glass-card">
          <SelectItem value="all">Tất cả trạng thái</SelectItem>
          <SelectItem value="PAID">Đã trả</SelectItem>
          <SelectItem value="PENDING">Chờ xử lý</SelectItem>
          <SelectItem value="FAILED">Thất bại</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
