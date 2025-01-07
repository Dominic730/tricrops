"use client";

import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase/firebase";
import AdminSidebar from "@/components/adminsidebar";
import { onAuthStateChanged, User } from "firebase/auth";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const authenticatedEmails = ["adithyakb93@gmail.com", "abrahul02@gmail.com", "tripcrops@gmail.com"];
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if ( currentUser && currentUser.email && authenticatedEmails.includes(currentUser.email) ) {
        setUser(currentUser);
      } else {
        router.push("/");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-gray-100" style={{ height: "calc(100vh - 100px)" }}>
        <Loader className="animate-spin h-16 w-16 text-green-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center" style={{ height: "calc(100vh - 100px)" }}>
        Not Authenticated
      </div>
    );
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex flex-col w-full">{children}</div>
    </div>
  );
}
