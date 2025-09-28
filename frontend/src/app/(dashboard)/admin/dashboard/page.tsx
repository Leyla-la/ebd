
// Admin Dashboard Page for Employee Behavior Detection System (EBD)
// HR Insight-inspired UI, MVP features, ready for backend integration
"use client";


import LiveMonitoringPanel from "./components/live-monitoring-panel";
import EmployeePerformanceOverview from "./components/employee-performance-overview";
import HRPayrollInsights from "./components/hr-payroll-insights";
import CompanyTrendsAnalytics from "./components/company-trends-analytics";
import PredictiveAdvancedInsights from "./components/predictive-advanced-insights";
import AdminPolicyControlPanel from "./components/admin-policy-control-panel";
import DashboardTabs, { DashboardTabKey } from "./components/DashboardTabs";
import { FaUsers, FaChartLine, FaExclamationTriangle, FaMoneyBillWave, FaBell, FaCogs } from "react-icons/fa";
import { useState } from "react";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTabKey>("overview");
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-0 md:p-6" style={{ paddingTop: '60px' }}>
      <main className="max-w-[1600px] mx-auto px-2 md:px-8 py-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-green-700 tracking-tight drop-shadow-sm">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2 text-lg">Employee Behavior Detection System (EBD)</p>
          </div>
          <div className="flex gap-2">
            <button className="border border-green-600 text-green-700 hover:bg-green-50 transition rounded px-4 py-2 font-semibold shadow-sm">Export CSV</button>
            <button className="border border-blue-600 text-blue-700 hover:bg-blue-50 transition rounded px-4 py-2 font-semibold shadow-sm">Export PDF</button>
          </div>
        </header>

        <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "overview" && (
          <>
            {/* Horizontal Scrollable KPI Cards */}
            <section className="flex gap-6 overflow-x-auto pb-4 mb-8 hide-scrollbar">
              <div className="min-w-[220px] bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4 hover:scale-105 hover:shadow-2xl transition-transform cursor-pointer animate-fadein">
                <FaUsers className="text-green-600 text-3xl" />
                <div>
                  <div className="text-2xl font-extrabold">1,250</div>
                  <div className="text-xs text-gray-500">Total Employees</div>
                </div>
              </div>
              <div className="min-w-[220px] bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4 hover:scale-105 hover:shadow-2xl transition-transform cursor-pointer animate-fadein">
                <FaChartLine className="text-blue-600 text-3xl" />
                <div>
                  <div className="text-2xl font-extrabold">92%</div>
                  <div className="text-xs text-gray-500">Avg. Attendance Rate</div>
                </div>
              </div>
              <div className="min-w-[220px] bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4 hover:scale-105 hover:shadow-2xl transition-transform cursor-pointer animate-fadein">
                <FaExclamationTriangle className="text-yellow-600 text-3xl" />
                <div>
                  <div className="text-2xl font-extrabold">7</div>
                  <div className="text-xs text-gray-500">Active Alerts</div>
                </div>
              </div>
              <div className="min-w-[220px] bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4 hover:scale-105 hover:shadow-2xl transition-transform cursor-pointer animate-fadein">
                <FaMoneyBillWave className="text-green-700 text-3xl" />
                <div>
                  <div className="text-2xl font-extrabold">$1.2M</div>
                  <div className="text-xs text-gray-500">Payroll This Month</div>
                </div>
              </div>
            </section>

            {/* Feed/Announcement Panel - only one at the top */}
            <section className="mb-8 animate-fadein">
              <div className="bg-blue-50 rounded-2xl p-6 space-y-3 shadow border border-blue-100">
                <h2 className="text-xl font-bold mb-3 tracking-tight">Company Feed & Announcements</h2>
                <div className="text-base flex items-center gap-2">🔔 <b>Policy Update:</b> <span className="font-medium">New attendance policy effective next week.</span></div>
                <div className="text-base flex items-center gap-2">🏆 <b>Achievement:</b> <span className="font-medium">Sales team exceeded Q3 targets!</span></div>
                <div className="text-base flex items-center gap-2">⚠️ <b>Alert:</b> <span className="font-medium text-yellow-700">2 employees flagged for repeated late check-ins.</span></div>
              </div>
            </section>

            {/* Live Monitoring Panel - full component */}
            <section className="mb-12 animate-fadein">
              <LiveMonitoringPanel />
            </section>

            {/* True 3-column dashboard grid for all other widgets, distributed fairly */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 items-start mt-4">
              <section className="space-y-8 animate-fadein">
                <EmployeePerformanceOverview />
                <HRPayrollInsights />
              </section>
              <section className="space-y-8 animate-fadein">
                <CompanyTrendsAnalytics />
                <AdminPolicyControlPanel />
              </section>
              <section className="space-y-8 animate-fadein">
                <PredictiveAdvancedInsights />
              </section>
            </div>
          </>
        )}
        {activeTab === "trends" && (
          <div className="animate-fadein">
            <h2 className="text-2xl font-bold mb-6 text-blue-700 flex items-center gap-2"><FaChartLine /> Trends & Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 items-start">
              <section className="space-y-8">
                <CompanyTrendsAnalytics />
              </section>
              <section className="space-y-8">
                <EmployeePerformanceOverview />
              </section>
              <section className="space-y-8">
                <PredictiveAdvancedInsights />
              </section>
            </div>
          </div>
        )}
        {activeTab === "monitoring" && (
          <div className="animate-fadein">
            <h2 className="text-2xl font-bold mb-6 text-yellow-700 flex items-center gap-2"><FaBell /> Monitoring & Alerts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <section className="space-y-8">
                <LiveMonitoringPanel />
              </section>
              <section className="space-y-8">
                {/* Placeholder for event log, alert details, privacy notice */}
                <div className="bg-white rounded-2xl shadow p-6">
                  <h3 className="font-bold text-lg mb-2">Privacy & Compliance</h3>
                  <div className="text-green-700 font-semibold mb-1">GDPR Compliant: Data anonymized</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  <div className="text-xs text-gray-500">95% GDPR compliance</div>
                </div>
              </section>
            </div>
          </div>
        )}
        {activeTab === "hr" && (
          <div className="animate-fadein">
            <h2 className="text-2xl font-bold mb-6 text-green-700 flex items-center gap-2"><FaMoneyBillWave /> HR Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 items-start">
              <section className="space-y-8">
                <HRPayrollInsights />
              </section>
              <section className="space-y-8">
                {/* Placeholder for Satisfaction, Diversity, Training, Cost per Hire */}
                <div className="bg-white rounded-2xl shadow p-6">
                  <h3 className="font-bold text-lg mb-2">Employee Satisfaction</h3>
                  <div className="text-3xl font-extrabold text-green-600 mb-1">8.7/10</div>
                  <div className="text-xs text-gray-500">Based on latest survey</div>
                </div>
                <div className="bg-white rounded-2xl shadow p-6">
                  <h3 className="font-bold text-lg mb-2">Diversity Metrics</h3>
                  <div className="text-3xl font-extrabold text-blue-600 mb-1">42% Female, 58% Male</div>
                  <div className="text-xs text-gray-500">Company-wide</div>
                </div>
              </section>
              <section className="space-y-8">
                {/* Placeholder for Training Completion, Cost per Hire */}
                <div className="bg-white rounded-2xl shadow p-6">
                  <h3 className="font-bold text-lg mb-2">Training Completion</h3>
                  <div className="text-3xl font-extrabold text-purple-600 mb-1">93%</div>
                  <div className="text-xs text-gray-500">YTD</div>
                </div>
                <div className="bg-white rounded-2xl shadow p-6">
                  <h3 className="font-bold text-lg mb-2">Cost per Hire</h3>
                  <div className="text-3xl font-extrabold text-orange-600 mb-1">$2,300</div>
                  <div className="text-xs text-gray-500">Avg. last 12 months</div>
                </div>
              </section>
            </div>
          </div>
        )}
        {activeTab === "admin" && (
          <div className="animate-fadein">
            <h2 className="text-2xl font-bold mb-6 text-gray-700 flex items-center gap-2"><FaCogs /> Admin Controls</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <section className="space-y-8">
                <AdminPolicyControlPanel />
              </section>
              <section className="space-y-8">
                {/* Placeholder for export/share/report features */}
                <div className="bg-white rounded-2xl shadow p-6">
                  <h3 className="font-bold text-lg mb-2">Export & Share</h3>
                  <button className="border border-green-600 text-green-700 hover:bg-green-50 transition rounded px-4 py-2 font-semibold shadow-sm mr-2">Export CSV</button>
                  <button className="border border-blue-600 text-blue-700 hover:bg-blue-50 transition rounded px-4 py-2 font-semibold shadow-sm">Export PDF</button>
                  <div className="mt-2 text-xs text-gray-500">Custom reports and sharing options</div>
                </div>
              </section>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
