'use client';

import React from 'react';
import { SlidersHorizontal, ArrowUpDown, X, Search, RotateCcw } from 'lucide-react';

interface CatalogControlsBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeFiltersCount: number;
  onOpenMobileFilters: () => void;
  onResetFilters: () => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export function CatalogControlsBar({
  searchQuery,
  onSearchChange,
  activeFiltersCount,
  onOpenMobileFilters,
  onResetFilters,
  sortBy,
  onSortChange,
}: CatalogControlsBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3 px-4 rounded-xl bg-noir-900/80 border border-noir-800 backdrop-blur-md mb-8">
      <div className="flex items-center gap-3">
        {/* Mobile Filter Button */}
        <button
          onClick={onOpenMobileFilters}
          className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-noir-200 hover:text-gold-300 transition-colors lg:hidden cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4 text-gold-400" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-gold-400 text-noir-950 text-[10px] font-bold flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Quick Search inside catalog */}
        <div className="relative flex-1 sm:w-64">
          <Search className="w-3.5 h-3.5 text-noir-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search fragrances..."
            className="w-full bg-noir-950/80 border border-noir-800 rounded-lg pl-8 pr-7 py-1.5 text-xs text-noir-200 placeholder:text-noir-500 focus:outline-none focus:border-gold-400/70"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-noir-500 hover:text-noir-300 cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Sort & Filter Controls */}
      <div className="flex items-center justify-between sm:justify-end gap-4 text-xs">
        {activeFiltersCount > 0 && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 text-xs text-noir-400 hover:text-gold-400 transition-colors font-medium cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear filters</span>
          </button>
        )}

        <div className="flex items-center gap-2">
          <span className="text-noir-400 text-xs font-medium hidden sm:inline">Sort by</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-noir-950 border border-noir-800 hover:border-noir-700 rounded-lg pl-3 pr-8 py-1.5 text-xs text-noir-200 focus:outline-none focus:border-gold-400 font-sans cursor-pointer transition-colors"
            >
              <option value="featured">Featured</option>
              <option value="bestseller">Best Sellers</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
            <ArrowUpDown className="w-3 h-3 text-noir-400 pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}
