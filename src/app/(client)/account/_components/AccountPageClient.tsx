'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ChevronRight,
  UserRound,
  Package,
  MapPin,
  Heart,
  LogOut,
  ShoppingBag,
  Sparkles,
  Truck,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice } from '@/config/app';
import type { Order } from '@/types';
import { AccountLoginCard } from './AccountLoginCard';
import { AccountSidebar, type AccountTab } from './AccountSidebar';
import { AccountProfileSection } from './AccountProfileSection';
import { AccountOrdersSection } from './AccountOrdersSection';
import { AccountAddressesSection } from './AccountAddressesSection';
import { filterOrdersForUser, loadOrderHistory } from '@/lib/orders';

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'AP';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function formatMemberSince(value?: string): string {
  if (!value) return 'Valued Client';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Valued Client';
  return `Client since ${date.toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
  })}`;
}

export function AccountPageClient() {
  const { user, isLoaded, logout } = useAuth();
  const { count: wishlistCount } = useWishlist();
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialTab = (searchParams.get('tab') as AccountTab) || 'profile';
  const [activeTab, setActiveTab] = useState<AccountTab>(
    ['profile', 'orders', 'addresses'].includes(initialTab) ? initialTab : 'profile'
  );

  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoaded, setOrdersLoaded] = useState(false);

  // Sync tab with URL query param if user changes it
  const handleTabChange = (tab: AccountTab) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tab);
    router.replace(`/account?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    // Orders live in localStorage, so they can only be read after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrders(loadOrderHistory());
    setOrdersLoaded(true);
  }, [user?.id]);

  const userOrders = useMemo(
    () => (user ? filterOrdersForUser(orders, user) : []),
    [orders, user]
  );

  const totalSpent = useMemo(
    () =>
      userOrders
        .filter((order) => order.status !== 'cancelled' && order.status !== 'returned')
        .reduce((sum, order) => sum + order.total, 0),
    [userOrders]
  );

  // Identify latest in-progress order for the spotlight banner
  const activeOrder = useMemo(() => {
    return userOrders.find(
      (order) =>
        order.status === 'placed' ||
        order.status === 'confirmed' ||
        order.status === 'processing' ||
        order.status === 'shipped' ||
        order.status === 'out_for_delivery'
    );
  }, [userOrders]);

  const navTabs: { id: AccountTab; label: string; icon: React.ComponentType<{ className?: string }>; count?: number }[] = [
    { id: 'profile', label: 'Profile Details', icon: UserRound },
    { id: 'orders', label: 'My Orders', icon: Package, count: userOrders.length },
    { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
  ];

  return (
    <div className="w-full bg-noir-950 text-noir-50 min-h-[calc(100vh-140px)]">
      <div className="container-lux py-8 md:py-12">
        {/* ── Breadcrumb & Quick Actions Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <nav className="flex items-center gap-2 text-xs text-noir-400 font-sans">
            <Link href="/" className="hover:text-gold-400 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-noir-600" />
            <span className="text-gold-400 font-medium">My Account</span>
          </nav>

          {user && (
            <div className="flex items-center gap-2">
              <Link
                href="/wishlist"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-noir-900 border border-noir-800 text-noir-300 hover:text-gold-300 hover:border-gold-400/30 transition-colors"
              >
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>Wishlist ({wishlistCount})</span>
              </Link>
              <Link
                href="/catalog"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-noir-900 border border-noir-800 text-noir-300 hover:text-gold-300 hover:border-gold-400/30 transition-colors"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-gold-400" />
                <span>Shop</span>
              </Link>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-rose-300/80 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          )}
        </div>

        {!isLoaded ? (
          /* Luxury Loading Skeleton */
          <div className="space-y-6 animate-pulse">
            <div className="h-44 rounded-2xl bg-noir-900 border border-noir-800" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 h-72 rounded-2xl bg-noir-900 border border-noir-800" />
              <div className="lg:col-span-8 h-96 rounded-2xl bg-noir-900 border border-noir-800" />
            </div>
          </div>
        ) : !user ? (
          /* Login Card when not signed in */
          <AccountLoginCard />
        ) : (
          /* Logged In Dashboard */
          <>
            {/* ── User Welcome Hero Card ── */}
            <div className="card-lux p-6 sm:p-8 border border-gold-400/25 bg-gradient-to-r from-noir-900 via-noir-950 to-noir-900 shadow-xl relative overflow-hidden mb-6">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                {/* Avatar & User Details */}
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-gold-300 via-gold-400 to-gold-600 text-noir-950 flex items-center justify-center font-serif text-2xl sm:text-3xl font-bold shrink-0 shadow-lg shadow-gold-500/20 border-2 border-gold-300/40">
                    {getInitials(user.name)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-cream-50 leading-tight">
                        {user.name}
                      </h1>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-gold-400/15 border border-gold-400/30 text-gold-300">
                        <Sparkles className="w-3 h-3 text-gold-400" />
                        {user.role === 'admin'
                          ? 'Administrator'
                          : totalSpent >= 5000
                          ? 'VIP Connoisseur'
                          : 'Valued Client'}
                      </span>
                    </div>
                    <p className="text-xs text-noir-400 mt-1.5 flex items-center gap-2 flex-wrap">
                      <span>{user.email}</span>
                      <span className="text-noir-600">&bull;</span>
                      <span className="text-noir-500">{formatMemberSince(user.createdAt)}</span>
                    </p>
                  </div>
                </div>

                {/* Quick Stats Pill Counters */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3 shrink-0">
                  <div className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-noir-950 border border-noir-800 text-center min-w-[75px] sm:min-w-[85px]">
                    <p className="font-serif text-lg sm:text-xl font-bold text-gold-300">
                      {userOrders.length}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-noir-400 mt-0.5">
                      Orders
                    </p>
                  </div>
                  <div className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-noir-950 border border-noir-800 text-center min-w-[90px] sm:min-w-[100px]">
                    <p className="font-serif text-sm sm:text-base font-bold text-gold-300 leading-7 truncate">
                      {formatPrice(totalSpent)}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-noir-400 mt-0.5">
                      Total Spent
                    </p>
                  </div>
                  <div className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-noir-950 border border-noir-800 text-center min-w-[75px] sm:min-w-[85px]">
                    <p className="font-serif text-lg sm:text-xl font-bold text-gold-300">
                      {wishlistCount}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-noir-400 mt-0.5">
                      Wishlist
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Active Order Tracker Banner (If in progress) ── */}
            {activeOrder && (
              <div className="card-lux p-4 sm:p-5 border border-emerald-500/35 bg-emerald-950/20 rounded-2xl mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in shadow-lg shadow-emerald-950/20">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 relative">
                    <Truck className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                        Active Order:
                      </span>
                      <span className="font-mono text-xs font-bold text-cream-50">
                        {activeOrder.orderNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider bg-gold-400/15 border border-gold-400/30 text-gold-300 capitalize">
                        {activeOrder.status}
                      </span>
                    </div>
                    <p className="text-xs text-noir-300 mt-0.5">
                      Est. delivery: {activeOrder.estimatedDelivery} &bull; Total: {formatPrice(activeOrder.total)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href={`/order-confirmed?orderNumber=${activeOrder.orderNumber}`}
                    className="px-4 py-2 rounded-xl text-xs font-medium bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 hover:bg-emerald-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Receipt</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* ── Interactive Segmented Navigation Bar ── */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-noir-900 border border-noir-800 mb-8 overflow-x-auto scrollbar-none">
              {navTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex-1 min-w-[130px] sm:min-w-0 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-gold-400 text-noir-950 font-semibold shadow-md shadow-gold-500/20'
                        : 'text-noir-300 hover:text-cream-50 hover:bg-noir-800/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-noir-950' : 'text-noir-400'}`} />
                    <span>{tab.label}</span>
                    {typeof tab.count === 'number' && tab.count > 0 && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          isActive
                            ? 'bg-noir-950 text-gold-300'
                            : 'bg-noir-950 border border-noir-700 text-noir-300'
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* ── Dashboard Grid Content ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Quick Sidebar & Concierge Shortcuts (4 cols) */}
              <AccountSidebar
                user={user}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                orderCount={userOrders.length}
                totalSpent={totalSpent}
              />

              {/* Right Column: Tab View Panels (8 cols) */}
              <section className="lg:col-span-8">
                {activeTab === 'profile' && (
                  <AccountProfileSection user={user} orders={userOrders} />
                )}
                {activeTab === 'orders' && (
                  <AccountOrdersSection orders={userOrders} isLoaded={ordersLoaded} />
                )}
                {activeTab === 'addresses' && (
                  <AccountAddressesSection orders={userOrders} />
                )}
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
