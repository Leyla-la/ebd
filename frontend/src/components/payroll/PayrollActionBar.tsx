"use client";

import { usePayrollStore } from "@/state/payrollStore";
import { Button } from "@/components/ui/button";
import { Download, Send, PlusCircle, Loader2 } from "lucide-react";

export default function PayrollActionBar() {
  const { isGenerating, runGeneration, filters } = usePayrollStore();

  return (
    <div className="liquid-glass-card flex items-center gap-2 p-2 rounded-2xl">
      <Button variant="outline" className="bg-transparent hover:bg-white/10 rounded-xl">
        <Download className="mr-2 h-4 w-4" />
        Export
      </Button>
      <Button variant="outline" className="bg-transparent hover:bg-white/10 rounded-xl">
        <Send className="mr-2 h-4 w-4" />
        Gửi thông báo
      </Button>
      <Button 
        className="bg-green-500 hover:bg-green-600 text-white rounded-xl"
        onClick={() => runGeneration(filters.month, filters.year)}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <PlusCircle className="mr-2 h-4 w-4" />
        )}
        {isGenerating ? "Đang xử lý..." : "Chạy bảng lương mới"}
      </Button>
    </div>
  );
}
