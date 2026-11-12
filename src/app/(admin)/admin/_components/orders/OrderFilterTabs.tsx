import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/cn';

export type OrderTabFilter = 'all' | 'new' | 'action_taken' | 'cancelled';

interface OrderFilterTabsProps {
  value: OrderTabFilter;
  onChange: (value: OrderTabFilter) => void;
  counts: Record<OrderTabFilter, number>;
}

const TAB_BASE = 'flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer';
const TAB_IDLE = 'bg-noir-900 border border-noir-800 text-noir-300';

const TABS: Array<{
  id: OrderTabFilter;
  label: string;
  active: string;
  idle: string;
  icon?: React.ReactNode;
}> = [
  {
    id: 'all',
    label: 'All Orders',
    active: 'bg-gold-400 text-noir-950 font-semibold shadow-sm',
    idle: 'hover:text-cream-50 hover:border-noir-700',
  },
  {
    id: 'new',
    label: 'New Orders',
    active: 'bg-rose-500 text-white font-semibold shadow-sm shadow-rose-500/20',
    idle: 'hover:text-rose-300 hover:border-rose-500/40',
  },
  {
    id: 'action_taken',
    label: 'Action Taken',
    active: 'bg-emerald-500 text-white font-semibold shadow-sm shadow-emerald-500/20',
    idle: 'hover:text-emerald-300 hover:border-emerald-500/40',
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
  },
  {
    id: 'cancelled',
    label: 'Cancelled',
    active: 'bg-rose-600 text-white font-semibold shadow-sm shadow-rose-600/30',
    idle: 'hover:text-rose-400 hover:border-rose-500/40',
    icon: <XCircle className="w-3.5 h-3.5 text-rose-400" />,
  },
];

export function OrderFilterTabs({ value, onChange, counts }: OrderFilterTabsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4" role="tablist" aria-label="Filter orders">
      {TABS.map((tab) => {
        const isActive = value === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(TAB_BASE, isActive ? tab.active : cn(TAB_IDLE, tab.idle))}
          >
            {tab.id === 'new' && (
              <span
                className={cn('w-1.5 h-1.5 rounded-full', isActive ? 'bg-white' : 'bg-rose-400 animate-pulse')}
              />
            )}
            {tab.icon}
            <span>
              {tab.label} ({counts[tab.id]})
            </span>
          </button>
        );
      })}
    </div>
  );
}
