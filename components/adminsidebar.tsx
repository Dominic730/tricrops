"use client";

import Link from "next/link";
import { useState } from "react";
import { Home, Users, BarChart, Menu, Settings } from "lucide-react";

interface SidebarLinkProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => (
  <Link href={href} className="flex items-center px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-400">
    <Icon className="w-5 h-5 mr-3" /> {label}
  </Link>
);

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative md:w-64 bg-gray-100">
        {/* Header */}
        <div className="flex items-center px-10 h-20 border-b border-gray-700">
          <h1 className="text-2xl font-semibold">Panel</h1>
        </div>

        {/* Navigation Links */}
        <nav className="px-4 py-6 space-y-4">
          <SidebarLink href="#" icon={Home} label="Dashboard" />
          <SidebarLink href="#" icon={Users} label="Users" />
          <SidebarLink href="/admin/products" icon={BarChart} label="Products" />
          <SidebarLink href="#" icon={Settings} label="Settings" />
        </nav>
    </div>
  );
};

export default AdminSidebar;
