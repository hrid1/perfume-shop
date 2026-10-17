'use client';

import React from 'react';
import { FragranceFamily } from '@/types';
import { formatPrice } from '@/config/app';

interface CatalogFilterSidebarProps {
  allFamilies: FragranceFamily[];
  selectedFamily: string;
  onFamilyChange: (family: string) => void;
  priceMax: number;
  onPriceChange: (val: number) => void;
  activeFiltersCount: number;
  onResetFilters: () => void;
}

export function CatalogFilterSidebar({
  allFamilies,
  selectedFamily,
  onFamilyChange,
  priceMax,
  onPriceChange,
  activeFiltersCount,
  onResetFilters,
}: CatalogFilterSidebarProps) {
  return (
    <aside className="hidden lg:block space-y-6 bg-noir-900/40 p-6 rounded-2xl border border-noir-800/80 h-fit sticky top-28">
      <div className="flex items-center justify-between pb-3 border-b border-noir-800">
        <span className="font-serif text-lg font-medium text-noir-100">Filters</span>
        {activeFiltersCount > 0 && (
          <button
            onClick={onResetFilters}
            className="text-xs text-noir-400 hover:text-gold-400 font-medium transition-colors cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Fragrance Family Chips */}
      <div>
        <h4 className="text-xs font-semibold text-noir-300 uppercase tracking-wider mb-3">
          Fragrance Family
        </h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onFamilyChange('all')}
            className={`text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
              selectedFamily === 'all'
                ? 'bg-gold-400/20 text-gold-300 border border-gold-400/40 font-medium'
                : 'bg-noir-900 text-noir-400 border border-noir-800 hover:text-noir-200'
            }`}
          >
            All Families
          </button>
          {allFamilies.map((family) => (
            <button
              key={family}
              onClick={() => onFamilyChange(family)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                selectedFamily === family
                  ? 'bg-gold-400/20 text-gold-300 border border-gold-400/40 font-medium'
                  : 'bg-noir-900 text-noir-400 border border-noir-800 hover:text-noir-200'
              }`}
            >
              {family}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="pt-4 border-t border-noir-800">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-semibold text-noir-300 uppercase tracking-wider">
            Price Range
          </span>
          <span className="text-gold-300 font-semibold">{formatPrice(priceMax)}</span>
        </div>
        <input
          type="range"
          min="1500"
          max="7000"
          step="200"
          value={priceMax}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full accent-gold-400 cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-noir-500 mt-1">
          <span>৳1,500</span>
          <span>৳7,000</span>
        </div>
      </div>
    </aside>
  );
}
