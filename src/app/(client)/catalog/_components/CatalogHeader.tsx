'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export interface TabItem {
  id: string;
  label: string;
  type: 'category' | 'filter';
}

export const CATALOG_TABS: TabItem[] = [
  { id: 'all', label: 'All Creations', type: 'category' },
  { id: 'men', label: 'Men', type: 'category' },
  { id: 'women', label: 'Women', type: 'category' },
  { id: 'unisex', label: 'Unisex', type: 'category' },
  { id: 'attar', label: 'Attar & Oils', type: 'category' },
  { id: 'discovery-sets', label: 'Discovery Sets', type: 'category' },
  { id: 'new', label: 'New Arrivals', type: 'filter' },
  { id: 'bestseller', label: 'Best Sellers', type: 'filter' },
];

interface CatalogHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
  totalCreations: number;
  filteredCount: number;
  selectedCategory: string;
  selectedFilter: string;
  onTabClick: (tab: TabItem) => void;
}

export function CatalogHeader({
  badge,
  title,
  subtitle,
  totalCreations,
  filteredCount,
  selectedCategory,
  selectedFilter,
  onTabClick,
}: CatalogHeaderProps) {
  const isTabActive = (tab: TabItem) => {
    if (tab.id === 'all') {
      return selectedCategory === 'all' && selectedFilter === 'all';
    }
    if (tab.id === 'new') {
      return selectedFilter === 'new' || selectedCategory === 'new-arrivals';
    }
    if (tab.id === 'bestseller') {
      return selectedFilter === 'bestseller' || selectedCategory === 'best-sellers';
    }
    if (tab.type === 'category') {
      return selectedCategory === tab.id && selectedFilter === 'all';
    }
    return selectedFilter === tab.id;
  };

  return (
    <div className="border-b border-noir-800 pb-8 mb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-gold-400 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{badge}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-noir-50 tracking-tight">
            {title}
          </h1>
          <p className="text-sm text-noir-400 mt-2 max-w-xl">
            {subtitle}
          </p>
        </div>

        <div className="text-xs font-mono text-noir-400">
          Showing <strong className="text-gold-300 font-bold">{filteredCount}</strong> of{' '}
          {totalCreations} creations
        </div>
      </div>

      {/* Category & Collection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-6 mt-2">
        {CATALOG_TABS.map((tab) => {
          const active = isTabActive(tab);
          return (
            <button
              key={tab.id}
              onClick={() => onTabClick(tab)}
              className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                active
                  ? 'bg-gold-400 text-noir-950 shadow-md font-semibold'
                  : 'bg-noir-900 border border-noir-800 text-noir-300 hover:text-gold-300 hover:border-gold-400/40'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
