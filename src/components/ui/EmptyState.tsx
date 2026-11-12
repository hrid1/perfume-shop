import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: React.ReactNode;
  eyebrow?: string;
  /** Buttons / links rendered under the description. */
  actions?: React.ReactNode;
  className?: string;
}

/** Centered "nothing here yet" block: icon, optional eyebrow, title, text and actions. */
export function EmptyState({
  icon: Icon,
  title,
  description,
  eyebrow,
  actions,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('py-16 text-center max-w-md mx-auto', className)}>
      <div className="w-16 h-16 rounded-full bg-noir-900 border border-noir-800 flex items-center justify-center mx-auto mb-5 text-gold-400/80">
        <Icon className="w-7 h-7 stroke-[1.5]" />
      </div>
      {eyebrow && (
        <span className="text-xs uppercase tracking-[0.2em] text-gold-400 font-medium mb-2 block">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-2xl md:text-3xl text-noir-50 font-medium mb-2">{title}</h2>
      {description && (
        <p className="text-sm text-noir-400 leading-relaxed mb-7">{description}</p>
      )}
      {actions && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">{actions}</div>
      )}
    </div>
  );
}
