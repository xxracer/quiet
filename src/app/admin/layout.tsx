"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [user, loading, router, isLoginPage]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafaf9]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#292524] border-t-transparent" />
      </div>
    );
  }

  if (!user && !isLoginPage) {
    return null;
  }

  if (!user && isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <header className="bg-white border-b border-[#e7e5e4] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <span className="text-[#78716c]">Admin Panel</span>
              <span className="text-[#d6d3d1]">|</span>
              <span className="font-medium">{user?.email}</span>
            </div>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
