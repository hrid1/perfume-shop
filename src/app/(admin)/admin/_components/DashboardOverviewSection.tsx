'use client';

import React from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  ShoppingCart,
  Users,
  Package,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { formatPrice } from '@/config/app';

export interface MockOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  location: string;
  itemsSummary: string;
  total: number;
  paymentMethod: string;
  status: 'processing' | 'shipped' | 'delivered';
  date: string;
}

interface DashboardOverviewSectionProps {
  orders: MockOrder[];
  salesData: { month: string; amount: number; label: string }[];
}

export function DashboardOverviewSection({
  orders,
  salesData,
}: DashboardOverviewSectionProps) {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <h1 className="font-serif text-3xl md:text-4xl font-normal text-cream-50 tracking-wide mb-8">
        Dashboard Overview
      </h1>

      {/* 5 Dark Luxury Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {/* 1. Total Revenue */}
        <div className="bg-noir-900/80 text-cream-50 rounded-2xl p-5 shadow-lg border border-noir-800 hover:border-gold-500/30 transition-all flex flex-col justify-between backdrop-blur-sm">
          <div className="w-9 h-9 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-base">
            $
          </div>
          <div className="mt-4">
            <p className="text-xs text-noir-400 font-medium tracking-wide">Total Revenue</p>
            <p className="font-serif text-2xl md:text-3xl font-bold text-cream-50 mt-0.5 tracking-tight">
              ৳863,000
            </p>
          </div>
        </div>

        {/* 2. Total Orders */}
        <div className="bg-noir-900/80 text-cream-50 rounded-2xl p-5 shadow-lg border border-noir-800 hover:border-gold-500/30 transition-all flex flex-col justify-between backdrop-blur-sm">
          <div className="w-9 h-9 rounded-full bg-blue-500/15 border border-blue-500/20 text-blue-400 flex items-center justify-center">
            <ShoppingCart className="w-4 h-4" />
          </div>
          <div className="mt-4">
            <p className="text-xs text-noir-400 font-medium tracking-wide">Total Orders</p>
            <p className="font-serif text-2xl md:text-3xl font-bold text-cream-50 mt-0.5 tracking-tight">
              291
            </p>
          </div>
        </div>

        {/* 3. Total Customers */}
        <div className="bg-noir-900/80 text-cream-50 rounded-2xl p-5 shadow-lg border border-noir-800 hover:border-gold-500/30 transition-all flex flex-col justify-between backdrop-blur-sm">
          <div className="w-9 h-9 rounded-full bg-amber-500/15 border border-amber-500/20 text-gold-400 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <div className="mt-4">
            <p className="text-xs text-noir-400 font-medium tracking-wide">Total Customers</p>
            <p className="font-serif text-2xl md:text-3xl font-bold text-cream-50 mt-0.5 tracking-tight">
              6
            </p>
          </div>
        </div>

        {/* 4. Products Sold */}
        <div className="bg-noir-900/80 text-cream-50 rounded-2xl p-5 shadow-lg border border-noir-800 hover:border-gold-500/30 transition-all flex flex-col justify-between backdrop-blur-sm">
          <div className="w-9 h-9 rounded-full bg-purple-500/15 border border-purple-500/20 text-purple-400 flex items-center justify-center">
            <Package className="w-4 h-4" />
          </div>
          <div className="mt-4">
            <p className="text-xs text-noir-400 font-medium tracking-wide">Products Sold</p>
            <p className="font-serif text-2xl md:text-3xl font-bold text-cream-50 mt-0.5 tracking-tight">
              20
            </p>
          </div>
        </div>

        {/* 5. Pending Orders */}
        <div className="bg-noir-900/80 text-cream-50 rounded-2xl p-5 shadow-lg border border-noir-800 hover:border-gold-500/30 transition-all flex flex-col justify-between backdrop-blur-sm">
          <div className="w-9 h-9 rounded-full bg-orange-500/15 border border-orange-500/20 text-orange-400 flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
          <div className="mt-4">
            <p className="text-xs text-noir-400 font-medium tracking-wide">Pending Orders</p>
            <p className="font-serif text-2xl md:text-3xl font-bold text-cream-50 mt-0.5 tracking-tight">
              0
            </p>
          </div>
        </div>
      </div>

      {/* Sales Overview Card */}
      <div className="bg-noir-900/80 text-cream-50 rounded-2xl p-6 md:p-8 shadow-lg border border-noir-800 mb-8 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp className="w-5 h-5 text-gold-400" />
          <h2 className="font-serif text-xl font-bold text-cream-50">
            Sales Overview
          </h2>
        </div>

        {/* Monthly Trend Visualizer */}
        <div className="relative pt-6 pb-2">
          <div className="grid grid-cols-6 gap-2 text-center items-end h-48">
            {salesData.map((item, idx) => {
              const maxAmount = 250000;
              const heightPercent = Math.round((item.amount / maxAmount) * 100);

              return (
                <div key={item.month} className="flex flex-col items-center justify-end h-full group">
                  <span className="text-xs font-serif font-semibold text-gold-300 mb-2 transition-transform group-hover:-translate-y-1">
                    {item.label}
                  </span>
                  <div className="w-full max-w-[48px] bg-noir-800/80 border border-noir-700/40 rounded-t-lg relative flex items-end justify-center overflow-hidden h-36">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        idx === salesData.length - 1
                          ? 'bg-gradient-to-t from-gold-500 to-gold-400 shadow-md shadow-gold-500/20'
                          : 'bg-noir-700 group-hover:bg-gold-500/60'
                      }`}
                    />
                  </div>
                  <span className="text-xs font-medium text-noir-400 mt-3">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Orders Card */}
      <div className="bg-noir-900/80 text-cream-50 rounded-2xl p-6 md:p-8 shadow-lg border border-noir-800 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl font-bold text-cream-50">
            Recent Orders
          </h2>
          <Link
            href="/admin?tab=orders"
            className="text-xs font-medium text-gold-400 hover:text-gold-300 flex items-center gap-1 transition-colors"
          >
            <span>View all orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-noir-800">
          {orders.slice(0, 3).map((order) => (
            <div
              key={order.id}
              className="py-4 flex items-center justify-between hover:bg-noir-800/40 px-3 rounded-xl transition-colors"
            >
              <div>
                <p className="font-semibold text-sm text-cream-50 tracking-tight">
                  {order.orderNumber}
                </p>
                <p className="text-xs text-noir-400 mt-0.5">
                  {order.customerName}
                </p>
              </div>
              <div className="text-right">
                <span className="font-serif font-bold text-base text-gold-300">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
