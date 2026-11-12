import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

interface SectionLabelProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  /** Extra content pushed to the right after a divider line. */
  aside?: React.ReactNode;
  className?: string;
}

/** Small gold uppercase heading used at the top of cards ("Delivery Destination", "Payment Details"…). */
export function SectionLabel({ children, icon: Icon, aside, className }: SectionLabelProps) {
  return (
    <h3
      className={cn(
        'text-xs uppercase tracking-[0.18em] text-gold-400 font-semibold mb-4 flex items-center gap-2',
        className
      )}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{children}</span>
      {aside && (
        <>
          <span className="h-px bg-noir-800 flex-1" />
          <span className="text-noir-400 font-mono text-[11px] normal-case tracking-normal font-normal">
            {aside}
          </span>
        </>
      )}
    </h3>
  );
}
