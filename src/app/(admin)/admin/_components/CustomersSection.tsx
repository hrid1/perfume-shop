'use client';

import React, { useState } from 'react';
import { Download, Eye } from 'lucide-react';
import { formatPrice } from '@/config/app';
import { MockOrder } from './DashboardOverviewSection';
import { CustomerOrderDetailsModal } from './CustomerOrderDetailsModal';
import { exportCustomersToExcel } from './exportCustomersExcel';

export interface CustomerItem {
  id: string;
  name: string;
  phone: string;
  city: string;
  orders: number;
  totalSpent: number;
}

interface CustomersSectionProps {
  customers: CustomerItem[];
  orders: MockOrder[];
}

export function CustomersSection({ customers, orders }: CustomersSectionProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerItem | null>(null);

  const customerOrders = selectedCustomer
    ? orders.filter((order) => order.phone === selectedCustomer.phone)
    : [];

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-3xl font-normal text-cream-50">
            Customer Directory ({customers.length})
          </h1>
          <p className="text-xs text-noir-400 mt-1">
            Registered luxury fragrance patrons across Bangladesh.
          </p>
        </div>

        <button
          type="button"
          onClick={() => exportCustomersToExcel(customers)}
          disabled={customers.length === 0}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold-400 px-4 py-2 text-sm font-semibold text-noir-950 transition-colors hover:bg-gold-300 disabled:opacity-50 w-full sm:w-auto shrink-0 cursor-pointer disabled:cursor-not-allowed"
        >
          <Download className="h-4 w-4" />
          Export Excel
        </button>
      </div>

      <div className="bg-noir-900/80 text-cream-50 rounded-2xl shadow-lg border border-noir-800 overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-noir-950/80 border-b border-noir-800 text-xs uppercase tracking-wider text-noir-400">
              <tr>
                <th className="py-3.5 px-6">Customer</th>
                <th className="py-3.5 px-6">Phone</th>
                <th className="py-3.5 px-6">City</th>
                <th className="py-3.5 px-6">Total Orders</th>
                <th className="py-3.5 px-6 text-right">Lifetime Spend</th>
                <th className="py-3.5 px-6 text-right">View Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-noir-800">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-noir-800/40 transition-colors">
                  <td className="py-4 px-6 font-semibold text-cream-50">{c.name}</td>
                  <td className="py-4 px-6 font-mono text-xs text-noir-300">{c.phone}</td>
                  <td className="py-4 px-6 text-noir-400">{c.city}</td>
                  <td className="py-4 px-6 font-mono text-noir-300">{c.orders} orders</td>
                  <td className="py-4 px-6 text-right font-serif font-bold text-gold-300">
                    {formatPrice(c.totalSpent)}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedCustomer(c)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-noir-700 px-3 py-1.5 text-xs text-noir-200 transition-colors hover:border-gold-400/50 hover:text-gold-300"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CustomerOrderDetailsModal
        open={selectedCustomer !== null}
        onClose={() => setSelectedCustomer(null)}
        customerName={selectedCustomer?.name ?? ''}
        customerPhone={selectedCustomer?.phone ?? ''}
        orders={customerOrders}
      />
    </div>
  );
}
