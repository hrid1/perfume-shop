'use client';

import React from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/config/app';

interface ProductsManagementSectionProps {
  products: Product[];
  totalProductsCount: number;
  productSearch: string;
  onSearchChange: (value: string) => void;
}

export function ProductsManagementSection({
  products,
  totalProductsCount,
  productSearch,
  onSearchChange,
}: ProductsManagementSectionProps) {
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-3xl font-normal text-cream-50">
            Products & Catalog ({totalProductsCount})
          </h1>
          <p className="text-xs text-noir-400 mt-1">
            Manage inventory, fragrance concentrations, and retail prices.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-noir-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search products..."
            value={productSearch}
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
                <th className="py-3.5 px-6">Product</th>
                <th className="py-3.5 px-6">Family</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Price</th>
                <th className="py-3.5 px-6">Stock</th>
                <th className="py-3.5 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-noir-800">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-noir-800/40 transition-colors">
                  <td className="py-4 px-6 flex items-center gap-3">
                    <Image
                      src={p.images[0]}
                      alt={p.name}
                      width={40}
                      height={48}
                      className="rounded object-cover bg-noir-950"
                    />
                    <div>
                      <p className="font-semibold text-cream-50">{p.name}</p>
                      <p className="text-xs text-noir-400">{p.brand} &bull; {p.concentration}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-noir-300">{p.fragranceFamily}</td>
                  <td className="py-4 px-6 uppercase text-xs font-mono text-noir-400">{p.category}</td>
                  <td className="py-4 px-6 font-serif font-bold text-gold-300">
                    {formatPrice(p.discountPrice ?? p.price)}
                  </td>
                  <td className="py-4 px-6 font-mono text-xs text-noir-300">{p.stock} units</td>
                  <td className="py-4 px-6 text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/15 border border-emerald-500/20 text-emerald-400">
                      Active
                    </span>
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
