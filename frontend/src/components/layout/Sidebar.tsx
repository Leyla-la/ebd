import Link from "next/link";
import React from "react";
import { Home, Users, DollarSign, Shield, Camera, Briefcase, BarChart2 } from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/employees", label: "Employees", icon: Users },
    { href: "/payroll", label: "Payroll", icon: DollarSign },
    { href: "/shifts", label: "Shifts", icon: Briefcase },
    { href: "/cameras", label: "Cameras", icon: Camera },
    { href: "/reports", label: "Reports", icon: BarChart2 },
    { href: "/policies", label: "Policies", icon: Shield },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-4 border-r border-gray-200 dark:border-gray-700">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center">EBD Corp</h2>
      </div>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.label} className="mb-2">
              <Link
                href={item.href}
                className="flex items-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
