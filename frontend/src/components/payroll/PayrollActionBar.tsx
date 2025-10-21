"use client";

import { usePayrollStore } from "@/state/payrollStore";
import { Button } from "@/components/ui/button";
import { Download, Send, PlusCircle, Loader2 } from "lucide-react";

export default function PayrollActionBar() {
  const { isGenerating, runGeneration } = usePayrollStore();

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" className="bg-transparent hover:bg-white/10">
        <Download className="mr-2 h-4 w-4" />
        Export
      </Button>
      <Button variant="outline" className="bg-transparent hover:bg-white/10">
        <Send className="mr-2 h-4 w-4" />
        Gửi thông báo
      </Button>
      <Button 
        className="bg-green-500 hover:bg-green-600 text-white"
        onClick={runGeneration}
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
