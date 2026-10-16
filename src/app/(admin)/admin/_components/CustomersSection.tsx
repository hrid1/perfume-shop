'use client';

import React from 'react';
import { formatPrice } from '@/config/app';

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
}

export function CustomersSection({ customers }: CustomersSectionProps) {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-normal text-cream-50">
          Customer Directory ({customers.length})
        </h1>
        <p className="text-xs text-noir-400 mt-1">
          Registered luxury fragrance patrons across Bangladesh.
        </p>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
