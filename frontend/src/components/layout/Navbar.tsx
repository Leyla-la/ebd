import React from "react";
import { Bell, UserCircle } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
      <div>
        {/* Can be used for breadcrumbs or page title */}
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
          <Bell className="w-6 h-6" />
        </button>
        <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
          <UserCircle className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
