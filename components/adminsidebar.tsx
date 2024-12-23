"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut } from "@/lib/firebase/auth";
import { BarChart, Home, LogOut, Menu, Quote, Settings, Users, X } from 'lucide-react';

interface SidebarLinkProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  showText: boolean;
}

const SidebarLink = ({ href, icon: Icon, label, showText }: SidebarLinkProps) => (
  <Link href={href} className={`flex justify-start items-center rounded-lg hover:bg-gray-400 ${showText ? "p-3 gap-3" : "p-3"}`}>
    <Icon className={`w-5 h-5`} />
    {showText && <span className="text-sm font-medium">{label}</span>}
  </Link>
);

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = async () => {
    await signOut();
  }

  return (
    <div className="bg-gray-100 mt-1 border-r border-black" style={{ height: "calc(100vh - 100px)" }}>
      
      {/* Sidebar */}
      <div className={`bg-gray-100 transition-transform transform ${isSidebarOpen ? "w-64" : "w-fit"} h-full flex flex-col`}>
        
        {/* Sidebar Header */}
        <div className="p-2 mt-auto flex justify-start items-center h-20 border-b border-gray-700">
          <button onClick={toggleSidebar} className={`flex justify-start items-center rounded-lg hover:bg-gray-400 ${isSidebarOpen ? "p-3 mr-3" : "p-3"}`}>
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          {isSidebarOpen && <span className="text-xl font-semibold">Admin Panel</span>}
        </div>

        {/* Navigation Links */}
        <div className="p-2 flex flex-col flex-grow">
          <div>
            <SidebarLink href="/admin" icon={Home} label="Dashboard" showText={isSidebarOpen} />
            <SidebarLink href="#" icon={Users} label="Users" showText={isSidebarOpen} />
            <SidebarLink href="/admin/products" icon={BarChart} label="Products" showText={isSidebarOpen} />
            <SidebarLink href="/admin/quote" icon={Quote} label="Quotes" showText={isSidebarOpen} />
            <SidebarLink href="#" icon={Settings} label="Settings" showText={isSidebarOpen} />
          </div>
        </div>
        
        {/* Log Out button */}
        <div className="p-2 mt-auto">
          <button onClick={handleLogout} className={`flex justify-start items-center rounded-lg hover:bg-gray-400 ${isSidebarOpen ? "p-3 gap-3" : "p-3"}`}>
            <LogOut className={`w-5 h-5`} />
            {isSidebarOpen && <span className="text-sm font-medium">Log Out</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
