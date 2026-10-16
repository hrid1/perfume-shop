'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { formatPrice } from '@/config/app';
import { MockOrder } from './DashboardOverviewSection';

interface OrdersManagementSectionProps {
  orders: MockOrder[];
  orderSearch: string;
  onSearchChange: (value: string) => void;
  onUpdateStatus: (
    orderId: string,
    newStatus: 'processing' | 'shipped' | 'delivered'
  ) => void;
}

export function OrdersManagementSection({
  orders,
  orderSearch,
  onSearchChange,
  onUpdateStatus,
}: OrdersManagementSectionProps) {
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-3xl font-normal text-cream-50">
            Orders Management
          </h1>
          <p className="text-xs text-noir-400 mt-1">
            Track and update nationwide customer deliveries.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-noir-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search orders..."
            value={orderSearch}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-noir-900 border border-noir-800 rounded-xl text-sm text-noir-100 placeholder:text-noir-500 outline-none focus:border-gold-400"
          />
        </div>
      </div>

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
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-noir-800/40 transition-colors">
                  <td className="py-4 px-6">
                    <p className="font-semibold text-cream-50">{o.orderNumber}</p>
                    <p className="text-xs text-noir-400">{o.date}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-medium text-cream-50">{o.customerName}</p>
                    <p className="text-xs text-noir-400">{o.location} &bull; {o.phone}</p>
                  </td>
                  <td className="py-4 px-6 text-xs text-noir-300 max-w-xs">{o.itemsSummary}</td>
                  <td className="py-4 px-6 font-serif font-bold text-gold-300">
                    {formatPrice(o.total)}
                  </td>
                  <td className="py-4 px-6 text-xs font-mono uppercase text-noir-400">
                    {o.paymentMethod}
                  </td>
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
                  <td className="py-4 px-6 text-right">
                    <select
                      value={o.status}
                      onChange={(e) =>
                        onUpdateStatus(
                          o.id,
                          e.target.value as 'processing' | 'shipped' | 'delivered'
                        )
                      }
                      className="text-xs border border-noir-700 rounded-lg px-2.5 py-1.5 bg-noir-950 text-noir-200 outline-none cursor-pointer focus:border-gold-400"
                    >
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
