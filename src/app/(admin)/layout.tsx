import React from 'react';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#07070a] text-noir-50 flex flex-col lg:flex-row font-sans">
      {/* Left Sidebar */}
      <AdminSidebar />

      {/* Main Administrative Content */}
      <main className="flex-1 min-h-screen bg-[#07070a] overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
