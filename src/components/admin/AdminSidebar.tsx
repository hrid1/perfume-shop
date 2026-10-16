'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  FolderTree,
  X,
  Menu,
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'coupons', label: 'Coupons', icon: Tag },
  { id: 'categories', label: 'Categories', icon: FolderTree },
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'dashboard';

  return (
    <div className="flex flex-col h-full justify-between p-4 sm:p-5">
      <div>
        {/* Brand Header */}
        <div className="px-3 py-4 mb-4 flex items-center justify-between">
          <div>
            <div className="font-serif text-2xl font-bold tracking-widest text-cream-50">
              NOIR<span className="text-gold-400">É</span>
            </div>
            <p className="text-xs text-noir-400 tracking-wider mt-0.5 font-sans">
              Admin Panel
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-noir-400 hover:text-cream-50"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <Link
                key={item.id}
                href={item.id === 'dashboard' ? '/admin' : `/admin?tab=${item.id}`}
                onClick={onClose}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#d4a84e] text-noir-950 font-semibold shadow-md'
                    : 'text-noir-300 hover:text-cream-50 hover:bg-noir-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-noir-950' : 'text-noir-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Exit Admin */}
      <div className="pt-6 border-t border-noir-800/80">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-noir-400 hover:text-cream-50 hover:bg-noir-900/60 transition-colors"
        >
          <X className="w-4 h-4 text-noir-400" />
          <span>Exit Admin</span>
        </Link>
      </div>
    </div>
  );
}

export function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-noir-950 border-b border-noir-800 px-4 py-3 flex items-center justify-between">
        <div>
          <span className="font-serif text-xl font-bold tracking-widest text-cream-50">
            NOIR<span className="text-gold-400">É</span>
          </span>
          <span className="text-[11px] text-noir-400 ml-2 font-mono">Admin</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-noir-200 hover:text-gold-400"
          aria-label="Toggle navigation"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-64 max-w-[80vw] bg-noir-950 border-r border-noir-800 h-full z-10">
            <Suspense fallback={<div className="p-4 text-noir-400 text-sm">Loading...</div>}>
              <SidebarContent onClose={() => setMobileOpen(false)} />
            </Suspense>
          </div>
        </div>
      )}

      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 bg-[#06060a] border-r border-noir-800/80 min-h-screen sticky top-0 h-screen flex-col">
        <Suspense fallback={<div className="p-4 text-noir-400 text-sm">Loading...</div>}>
          <SidebarContent />
        </Suspense>
      </aside>
    </>
  );
}
