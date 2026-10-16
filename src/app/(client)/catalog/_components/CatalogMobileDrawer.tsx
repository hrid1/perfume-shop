'use client';

import React from 'react';
import { X } from 'lucide-react';
import { FragranceFamily } from '@/types';
import { formatPrice } from '@/config/app';
import { Drawer } from '@/components/Modal';

interface CatalogMobileDrawerProps {
  open: boolean;
  onClose: () => void;
  allFamilies: FragranceFamily[];
  selectedFamily: string;
  onFamilyChange: (family: string) => void;
  priceMax: number;
  onPriceChange: (val: number) => void;
  filteredCount: number;
  onResetFilters: () => void;
}

export function CatalogMobileDrawer({
  open,
  onClose,
  allFamilies,
  selectedFamily,
  onFamilyChange,
  priceMax,
  onPriceChange,
  filteredCount,
  onResetFilters,
}: CatalogMobileDrawerProps) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      side="left"
      width="320px"
    >
      <div className="p-6 flex flex-col h-full overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-noir-800 mb-6">
          <span className="font-serif text-xl font-medium text-noir-100">Filters</span>
          <button
            onClick={onClose}
            className="p-1.5 text-noir-400 hover:text-noir-100 rounded-lg hover:bg-noir-900 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fragrance Families in Drawer */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-noir-300 uppercase tracking-wider mb-3">
            Olfactory Family
          </h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onFamilyChange('all')}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                selectedFamily === 'all'
                  ? 'bg-gold-400/20 text-gold-300 border border-gold-400/40 font-medium'
                  : 'bg-noir-900 text-noir-400 border border-noir-800'
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
                    : 'bg-noir-900 text-noir-400 border border-noir-800'
                }`}
              >
                {family}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range in Drawer */}
        <div className="mb-8 pt-4 border-t border-noir-800">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-noir-300 uppercase tracking-wider">
              Max Budget
            </span>
            <span className="font-mono text-gold-300 font-bold">{formatPrice(priceMax)}</span>
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
          <div className="flex justify-between text-[10px] font-mono text-noir-500 mt-1">
            <span>৳1,500</span>
            <span>৳7,000</span>
          </div>
        </div>

        {/* Drawer Actions */}
        <div className="mt-auto pt-6 border-t border-noir-800 flex gap-3">
          <button
            onClick={() => {
              onResetFilters();
              onClose();
            }}
            className="flex-1 py-2.5 px-3 rounded-lg border border-noir-800 text-xs font-medium text-noir-300 hover:text-noir-100 text-center cursor-pointer"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="flex-1 btn-gold py-2.5 px-3 text-xs font-medium text-center cursor-pointer"
          >
            Apply ({filteredCount})
          </button>
        </div>
      </div>
    </Drawer>
  );
}
