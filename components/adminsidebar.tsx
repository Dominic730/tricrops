import { Home, Users, BarChart, Settings, LogOut } from "lucide-react";
import Link from "next/link";

const AdminSidebar = () => {
  return (
    <div className="hidden md:flex h-screen bg-gray-800 text-white flex-col w-64 pt-32">
      <div className="flex items-center px-10 h-20 border-b border-gray-700">
        <h1 className="text-2xl font-semibold">Panel</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-4">
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
      <div className="px-4 py-4 border-t border-gray-700">
        <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-left rounded-lg hover:bg-gray-700">
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
