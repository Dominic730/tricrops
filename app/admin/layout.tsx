"use client";

import AdminSidebar from "@/components/adminsidebar";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="flex">
            <AdminSidebar />
            <div className="flex flex-col w-full">
                {children}
            </div>
        </div>
    );
}
