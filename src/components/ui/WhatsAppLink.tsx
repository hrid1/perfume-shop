import React from 'react';
import { MessageCircle } from 'lucide-react';
import { config } from '@/config/app';
import { cn } from '@/lib/cn';

/** wa.me deep link to the store's WhatsApp with a prefilled message. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

const VARIANTS = {
  /** Soft green block button, used inside concierge cards. */
  soft: 'w-full py-2.5 px-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 font-medium',
  /** Neutral pill, sits next to a primary button. */
  outline:
    'px-6 py-3.5 rounded-full border border-noir-700 text-xs font-medium text-noir-300 hover:text-gold-300 hover:border-gold-400/40',
} as const;

interface WhatsAppLinkProps {
  message: string;
  children: React.ReactNode;
  variant?: keyof typeof VARIANTS;
  className?: string;
}

export function WhatsAppLink({ message, children, variant = 'soft', className }: WhatsAppLinkProps) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'flex items-center justify-center gap-2 transition-colors cursor-pointer',
        VARIANTS[variant],
        className
      )}
    >
      <MessageCircle className="w-4 h-4 text-emerald-400" />
      <span>{children}</span>
    </a>
  );
}
