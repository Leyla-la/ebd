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
  const { setFilter, filters } = usePayrollStore();

  return (
    <div className="liquid-glass-card flex flex-col gap-3 md:flex-row md:items-center p-3 rounded-2xl">
      <div className="relative w-full md:w-auto">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Tìm nhân viên..." 
          className="w-full pl-8 md:w-[250px]" 
          onChange={(e) => setFilter({ searchTerm: e.target.value })}
        />
      </div>
      <Select onValueChange={(value) => setFilter({ month: Number(value) })}>
        <SelectTrigger className="w-full md:w-[140px]">
          <SelectValue placeholder={`Tháng ${filters.month}`} />
        </SelectTrigger>
        <SelectContent className="liquid-glass-card">
          {Array.from({ length: 12 }).map((_, i) => (
            <SelectItem key={i+1} value={`${i+1}`}>Tháng {i+1}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => setFilter({ year: Number(value) })}>
        <SelectTrigger className="w-full md:w-[120px]">
          <SelectValue placeholder={`${filters.year}`} />
        </SelectTrigger>
        <SelectContent className="liquid-glass-card">
          {Array.from({ length: 5 }).map((_, i) => {
            const y = new Date().getFullYear() - 2 + i;
            return (
              <SelectItem key={y} value={`${y}`}>{y}</SelectItem>
            )
          })}
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => setFilter({ department: value === 'all' ? '' : value })}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Tất cả phòng ban" />
        </SelectTrigger>
        <SelectContent className="liquid-glass-card">
          <SelectItem value="all">Tất cả phòng ban</SelectItem>
          <SelectItem value="Engineering">Engineering</SelectItem>
          <SelectItem value="Design">Design</SelectItem>
          <SelectItem value="Human Resources">Human Resources</SelectItem>
          <SelectItem value="Sales">Sales</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={(value) => setFilter({ status: value === 'all' ? '' : value })}>
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Trạng thái" />
        </SelectTrigger>
        <SelectContent className="liquid-glass-card">
          <SelectItem value="all">Tất cả trạng thái</SelectItem>
          <SelectItem value="PAID">Đã trả</SelectItem>
          <SelectItem value="PENDING">Chờ xử lý</SelectItem>
          <SelectItem value="FAILED">Thất bại</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
