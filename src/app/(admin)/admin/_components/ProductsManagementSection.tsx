'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Search } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/config/app';

const PRODUCT_TYPE_TABS = [
  { id: 'all', label: 'All products' },
  { id: 'perfume', label: 'Perfume' },
  { id: 'wax', label: 'Wax' },
  { id: 'attar', label: 'Attar' },
  { id: 'discovery-sets', label: 'Discovery sets' },
] as const;

const PERFUME_CATEGORIES = new Set(['men', 'women', 'unisex', 'perfume']);

function matchesProductType(product: Product, type: string) {
  if (type === 'all') return true;
  if (type === 'perfume') {
    return PERFUME_CATEGORIES.has(product.category) && product.category !== 'wax';
  }
  return product.category === type;
}

function formatTypeLabel(type: string) {
  if (type === 'discovery-sets') return 'Discovery sets';
  return type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, ' ');
}

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
  const [selectedType, setSelectedType] = useState<string>('all');
  const productTypes = useMemo(() => {
    const additionalTypes = [...new Set(products.map((product) => product.category))]
      .filter(
        (category) =>
          !PERFUME_CATEGORIES.has(category) &&
          !PRODUCT_TYPE_TABS.some((tab) => tab.id === category)
      )
      .sort();

    return [
      ...PRODUCT_TYPE_TABS,
      ...additionalTypes.map((type) => ({ id: type, label: formatTypeLabel(type) })),
    ];
  }, [products]);
  const visibleProducts = products.filter((product) =>
    matchesProductType(product, selectedType)
  );

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

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
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
          <Link
            href="/admin/products/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold-400 px-4 py-2 text-sm font-semibold text-noir-950 transition-colors hover:bg-gold-300"
          >
            <Plus className="h-4 w-4" />
            Add product
          </Link>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="Filter products by type"
        className="mb-5 flex gap-2 overflow-x-auto border-b border-noir-800 pb-2"
      >
        {productTypes.map((type) => {
          const count = products.filter((product) =>
            matchesProductType(product, type.id)
          ).length;
          const isSelected = selectedType === type.id;

          return (
            <button
              key={type.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedType(type.id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-colors ${
                isSelected
                  ? 'bg-gold-400/15 text-gold-300 ring-1 ring-inset ring-gold-400/30'
                  : 'text-noir-400 hover:bg-noir-900 hover:text-noir-100'
              }`}
            >
              {type.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                  isSelected ? 'bg-gold-400/15 text-gold-200' : 'bg-noir-800 text-noir-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
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
              {visibleProducts.map((p) => (
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
              {visibleProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sm text-noir-400">
                    No products in this type match your search.
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
