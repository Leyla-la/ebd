
// Admin Dashboard Page for Employee Behavior Detection System (EBD)
// HR Insight-inspired UI, MVP features, ready for backend integration
"use client";

import LiveMonitoringPanel from "./components/live-monitoring-panel";
import EmployeePerformanceOverview from "./components/employee-performance-overview";
import HRPayrollInsights from "./components/hr-payroll-insights";
import CompanyTrendsAnalytics from "./components/company-trends-analytics";
import PredictiveAdvancedInsights from "./components/predictive-advanced-insights";
import AdminPolicyControlPanel from "./components/admin-policy-control-panel";

export default function AdminDashboardPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-6">
			<div className="max-w-7xl mx-auto space-y-8">
				<header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
					<div>
						<h1 className="text-3xl font-bold text-green-700">Admin Dashboard</h1>
						<p className="text-muted-foreground mt-1">Employee Behavior Detection System (EBD)</p>
					</div>
					<div className="flex gap-2">
						{/* Export buttons placeholder */}
						<button className="border rounded px-4 py-2">Export CSV</button>
						<button className="border rounded px-4 py-2">Export PDF</button>
					</div>
				</header>
				<LiveMonitoringPanel />
				<EmployeePerformanceOverview />
				<HRPayrollInsights />
				<CompanyTrendsAnalytics />
				<PredictiveAdvancedInsights />
				<AdminPolicyControlPanel />
			</div>
		</div>
	);
}
