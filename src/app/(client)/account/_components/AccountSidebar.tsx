'use client';

import React from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  Heart,
  LogOut,
  MapPin,
  MessageCircle,
  Package,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { useAuth, type UserProfile } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';

export type AccountTab = 'profile' | 'orders' | 'addresses';

interface AccountSidebarProps {
  user: UserProfile;
  activeTab: AccountTab;
  onTabChange: (tab: AccountTab) => void;
  orderCount: number;
  totalSpent: number;
}

export function AccountSidebar({
  activeTab,
  onTabChange,
  orderCount,
}: AccountSidebarProps) {
  const { logout } = useAuth();
  const { count: wishlistCount } = useWishlist();

  const navItems: { id: AccountTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'profile', label: 'Profile Details', icon: <UserRound className="w-4 h-4" /> },
    { id: 'orders', label: 'My Orders', icon: <Package className="w-4 h-4" />, badge: orderCount },
    { id: 'addresses', label: 'Saved Addresses', icon: <MapPin className="w-4 h-4" /> },
  ];

  return (
    <aside className="hidden lg:block lg:col-span-4 space-y-5">
      {/* Navigation Sections */}
      <nav className="card-lux p-2.5 border border-noir-800 bg-noir-900/80 space-y-1" aria-label="Account sections">
        <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-noir-500">
          Account Menu
        </p>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm transition-all cursor-pointer ${
                isActive
                  ? 'bg-gold-400/10 text-gold-300 border border-gold-400/30 shadow-sm'
                  : 'text-noir-300 border border-transparent hover:text-cream-50 hover:bg-noir-800/60'
              }`}
            >
              <span className={isActive ? 'text-gold-400' : 'text-noir-400'}>{item.icon}</span>
              <span className="flex-1 text-left font-medium">{item.label}</span>
              {typeof item.badge === 'number' && item.badge > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-noir-950 border border-noir-700 text-[10px] font-mono text-noir-300 font-bold">
                  {item.badge}
                </span>
              )}
              <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-gold-400' : 'text-noir-600'}`} />
            </button>
          );
        })}
      </nav>

      {/* Quick Shortcuts */}
      <div className="card-lux p-2.5 border border-noir-800 bg-noir-900/80 space-y-1">
        <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-noir-500">
          Quick Links
        </p>
        <Link
          href="/wishlist"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-noir-300 hover:text-gold-300 hover:bg-noir-800/60 transition-colors"
        >
          <Heart className="w-4 h-4 text-rose-400" />
          <span className="flex-1 font-medium">My Wishlist</span>
          {wishlistCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-noir-950 border border-noir-700 text-[10px] font-mono text-noir-300">
              {wishlistCount}
            </span>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-noir-600" />
        </Link>
        <Link
          href="/catalog"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-noir-300 hover:text-gold-300 hover:bg-noir-800/60 transition-colors"
        >
          <Package className="w-4 h-4 text-gold-400" />
          <span className="flex-1 font-medium">Browse All Fragrances</span>
          <ChevronRight className="w-3.5 h-3.5 text-noir-600" />
        </Link>
        <Link
          href="/quiz"
          className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-noir-300 hover:text-gold-300 hover:bg-noir-800/60 transition-colors"
        >
          <Sparkles className="w-4 h-4 text-gold-400" />
          <span className="flex-1 font-medium">Scent Finder Quiz</span>
          <ChevronRight className="w-3.5 h-3.5 text-noir-600" />
        </Link>
      </div>

      {/* Concierge Card */}
      <div className="card-lux p-5 border border-gold-400/20 bg-gradient-to-br from-noir-900 to-noir-950 text-xs">
        <div className="flex items-center gap-2 text-gold-400 font-medium mb-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-[11px] uppercase tracking-wider">Client Concierge</span>
        </div>
        <p className="text-noir-300 font-serif text-sm font-semibold mb-1">
          Dhaka Boutique Assistance
        </p>
        <p className="text-noir-400 leading-relaxed mb-4 text-[11px] font-light">
          Need guidance on maceration, batch allocations, or an active delivery?
        </p>
        <a
          href={`https://wa.me/8801700000000?text=${encodeURIComponent(
            'Hello Amros Perfumes, I would like assistance with my account and orders.'
          )}`}
          target="_blank"
          rel="noreferrer"
          className="w-full py-2.5 px-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-colors flex items-center justify-center gap-2 font-medium cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>Message on WhatsApp</span>
        </a>
      </div>

      {/* Sign Out Card */}
      <div className="card-lux p-2 border border-noir-800 bg-noir-900/80">
        <button
          type="button"
          onClick={logout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-rose-300/80 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span className="flex-1 text-left font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
