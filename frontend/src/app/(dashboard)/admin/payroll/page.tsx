import PayrollDashboard from "@/components/payroll/PayrollDashboard";
import { getPayrolls } from "@/lib/actions/payroll";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default async function PayrollPage() {
  // Fetch initial data on the server
  const initialPayrolls = await getPayrolls();

  return (
    <div className="h-full w-full">
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center bg-background">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }
      >
        <PayrollDashboard initialPayrolls={initialPayrolls} />
      </Suspense>
    </div>
  );
}
        