"use client";

import { useState } from "react";
import { Home, Users, BarChart, Settings } from "lucide-react";
import Link from "next/link";

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative md:w-64">
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-6 left-4 md:hidden z-50 text-black text-xl p-2 mt-20"
        aria-label="Toggle Sidebar"
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gray-800 text-white flex-col w-64 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:flex transition-transform duration-300 z-40`}
      >
        <div className="flex flex-col h-screen pt-40">
          <div className="flex items-center px-10 h-20 border-b border-gray-700">
            <h1 className="text-2xl font-semibold">Panel</h1>
          </div>
          <nav className="px-4 py-6 space-y-4">
            <Link
              href="#"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-700"
            >
              <Home className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
            <Link
              href="#"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-700"
            >
              <Users className="w-5 h-5 mr-3" />
              Users
            </Link>
            <Link
              href="/admin/products"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-700"
            >
              <BarChart className="w-5 h-5 mr-3" />
              Products
            </Link>
            <Link
              href="#"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-700"
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </Link>
          </nav>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 md:hidden"
        ></div>
      )}
    </div>
  );
};

export default AdminSidebar;
