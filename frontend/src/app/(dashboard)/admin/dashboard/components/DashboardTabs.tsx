"use client";
import React, { useState } from "react";
import { FaChartLine, FaBell, FaUsers, FaCogs, FaMoneyBillWave } from "react-icons/fa";

const TABS = [
  { key: "overview", label: "Overview", icon: <FaUsers /> },
  { key: "trends", label: "Trends & Analytics", icon: <FaChartLine /> },
  { key: "monitoring", label: "Monitoring & Alerts", icon: <FaBell /> },
  { key: "hr", label: "HR Insights", icon: <FaMoneyBillWave /> },
  { key: "admin", label: "Admin Controls", icon: <FaCogs /> },
];

export type DashboardTabKey = typeof TABS[number]["key"];

interface DashboardTabsProps {
  activeTab: DashboardTabKey;
  onTabChange: (tab: DashboardTabKey) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ activeTab, onTabChange }) => (
  <nav className="flex gap-2 border-b mb-6 overflow-x-auto hide-scrollbar">
    {TABS.map((tab) => (
      <button
        key={tab.key}
        className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-semibold transition-colors ${
          activeTab === tab.key
            ? "bg-white text-green-700 border-b-2 border-green-600"
            : "bg-green-50 text-gray-500 hover:bg-green-100"
        }`}
        onClick={() => onTabChange(tab.key as DashboardTabKey)}
        aria-current={activeTab === tab.key ? "page" : undefined}
      >
        {tab.icon}
        {tab.label}
      </button>
    ))}
  </nav>
);

export default DashboardTabs;
