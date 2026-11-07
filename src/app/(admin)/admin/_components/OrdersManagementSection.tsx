'use client';

import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Check,
  RotateCcw,
} from 'lucide-react';
import { formatPrice } from '@/config/app';
import { MockOrder, OrderActionStatus } from './DashboardOverviewSection';

interface OrdersManagementSectionProps {
  orders: MockOrder[];
  orderSearch: string;
  onSearchChange: (value: string) => void;
  onUpdateStatus: (
    orderId: string,
    newStatus: 'processing' | 'shipped' | 'delivered'
  ) => void;
  onUpdateActionStatus: (
    orderId: string,
    newActionStatus: OrderActionStatus
  ) => void;
}

export function OrdersManagementSection({
  orders,
  orderSearch,
  onSearchChange,
  onUpdateStatus,
  onUpdateActionStatus,
}: OrdersManagementSectionProps) {
  const [actionFilter, setActionFilter] = useState<'all' | 'new' | 'action_taken'>('all');

  const newOrdersCount = orders.filter(
    (o) => (o.actionStatus || 'new') === 'new'
  ).length;
  const actionTakenCount = orders.filter(
    (o) => o.actionStatus === 'action_taken'
  ).length;

  const displayedOrders = orders.filter((o) => {
    if (actionFilter === 'all') return true;
    const currentAction = o.actionStatus || 'new';
    return currentAction === actionFilter;
  });

  return (
    <div className="animate-fade-in">
      {/* Top Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-3xl font-normal text-cream-50">
            Orders Management
          </h1>
          <p className="text-xs text-noir-400 mt-1">
            Track customer orders, verify details, and monitor fulfillment actions.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-noir-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search orders..."
            value={orderSearch}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-noir-900 border border-noir-800 rounded-xl text-sm text-noir-100 placeholder:text-noir-500 outline-none focus:border-gold-400 transition-colors"
          />
        </div>
      </div>

      {/* Action Tracking Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <button
          onClick={() => setActionFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            actionFilter === 'all'
              ? 'bg-gold-400 text-noir-950 font-semibold shadow-sm'
              : 'bg-noir-900 border border-noir-800 text-noir-300 hover:text-cream-50 hover:border-noir-700'
          }`}
        >
          All Orders ({orders.length})
        </button>

        <button
          onClick={() => setActionFilter('new')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            actionFilter === 'new'
              ? 'bg-rose-500 text-white font-semibold shadow-sm shadow-rose-500/20'
              : 'bg-noir-900 border border-noir-800 text-noir-300 hover:text-rose-300 hover:border-rose-500/40'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              actionFilter === 'new' ? 'bg-white' : 'bg-rose-400 animate-pulse'
            }`}
          />
          <span>New Orders ({newOrdersCount})</span>
        </button>

        <button
          onClick={() => setActionFilter('action_taken')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            actionFilter === 'action_taken'
              ? 'bg-emerald-500 text-white font-semibold shadow-sm shadow-emerald-500/20'
              : 'bg-noir-900 border border-noir-800 text-noir-300 hover:text-emerald-300 hover:border-emerald-500/40'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Action Taken ({actionTakenCount})</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-noir-900/80 text-cream-50 rounded-2xl shadow-lg border border-noir-800 overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-noir-950/80 border-b border-noir-800 text-xs uppercase tracking-wider text-noir-400">
              <tr>
                <th className="py-3.5 px-6">Order</th>
                <th className="py-3.5 px-6">Customer</th>
                <th className="py-3.5 px-6">Items</th>
                <th className="py-3.5 px-6">Total</th>
                <th className="py-3.5 px-6">Payment</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-noir-800">
              {displayedOrders.map((o) => {
                const isNew = (o.actionStatus || 'new') === 'new';

                return (
                  <tr
                    key={o.id}
                    className={`transition-colors ${
                      isNew ? 'bg-rose-950/10 hover:bg-rose-950/20' : 'hover:bg-noir-800/40'
                    }`}
                  >
                    {/* Order Column */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-cream-50">{o.orderNumber}</p>
                        {isNew && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/15 border border-rose-500/30 text-rose-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-noir-400 mt-0.5">{o.date}</p>
                    </td>

                    {/* Customer Column */}
                    <td className="py-4 px-6">
                      <p className="font-medium text-cream-50">{o.customerName}</p>
                      <p className="text-xs text-noir-400">
                        {o.location} &bull; {o.phone}
                      </p>
                    </td>

                    {/* Items Column */}
                    <td className="py-4 px-6 text-xs text-noir-300 max-w-xs">
                      {o.itemsSummary}
                    </td>

                    {/* Total Column */}
                    <td className="py-4 px-6 font-serif font-bold text-gold-300">
                      {formatPrice(o.total)}
                    </td>

                    {/* Payment Column */}
                    <td className="py-4 px-6 text-xs font-mono uppercase text-noir-400">
                      {o.paymentMethod}
                    </td>

                    {/* Status Column */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          o.status === 'delivered'
                            ? 'bg-emerald-500/15 border-emerald-500/20 text-emerald-400'
                            : o.status === 'shipped'
                            ? 'bg-blue-500/15 border-blue-500/20 text-blue-400'
                            : 'bg-amber-500/15 border-amber-500/20 text-amber-400'
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>

                    {/* Action Column */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {isNew ? (
                          <button
                            onClick={() => onUpdateActionStatus(o.id, 'action_taken')}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 hover:border-emerald-500/50 transition-all cursor-pointer whitespace-nowrap"
                            title="Mark action taken"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Mark Taken</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => onUpdateActionStatus(o.id, 'new')}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-noir-800 hover:text-noir-300 transition-all cursor-pointer whitespace-nowrap group"
                            title="Click to reset to New Order"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 group-hover:hidden" />
                            <RotateCcw className="w-3.5 h-3.5 hidden group-hover:inline" />
                            <span className="group-hover:hidden">Action Taken</span>
                            <span className="hidden group-hover:inline">Reset</span>
                          </button>
                        )}

                        <select
                          value={o.status}
                          onChange={(e) =>
                            onUpdateStatus(
                              o.id,
                              e.target.value as 'processing' | 'shipped' | 'delivered'
                            )
                          }
                          className="text-xs border border-noir-700 rounded-lg px-2.5 py-1.5 bg-noir-950 text-noir-200 outline-none cursor-pointer focus:border-gold-400 transition-colors"
                          title="Update fulfillment status"
                        >
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {displayedOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-noir-400">
                    <p className="text-sm">No orders found matching this filter.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
