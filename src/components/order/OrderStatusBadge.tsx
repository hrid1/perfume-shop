import React from 'react';
import type { OrderStatus } from '@/types';
import { statusMeta } from '@/lib/orders';
import { cn } from '@/lib/cn';

export function OrderStatusBadge({ status, className }: { status: OrderStatus; className?: string }) {
  const meta = statusMeta(status);
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border',
        meta.className,
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', meta.dot)} />
      {meta.label}
    </span>
  );
}
