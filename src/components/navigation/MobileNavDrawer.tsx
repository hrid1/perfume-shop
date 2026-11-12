'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Drawer } from '@/components/Modal';
import { cn } from '@/lib/cn';
import { BrandLogo } from './BrandLogo';
import { NAV_LINKS, SECONDARY_NAV_LINKS, useIsNavLinkActive } from './navLinks';

interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
}

function DrawerLink({
  href,
  label,
  active = false,
  muted = false,
  onClick,
}: {
  href: string;
  label: string;
  active?: boolean;
  muted?: boolean;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center justify-between py-3 px-3 rounded-lg transition-colors',
        active
          ? 'bg-gold-500/10 text-gold-400 font-semibold border-l-2 border-gold-400'
          : 'text-cream-200 hover:text-gold-400 hover:bg-noir-900'
      )}
    >
      <span className={cn('font-medium', muted && 'text-muted')}>{label}</span>
      <ChevronRight className={cn('w-4 h-4', active ? 'text-gold-400' : 'text-muted')} />
    </Link>
  );
}

export function MobileNavDrawer({ open, onClose }: MobileNavDrawerProps) {
  const { isAuthenticated } = useAuth();
  const isActive = useIsNavLinkActive();

  return (
    <Drawer open={open} onClose={onClose} side="left" width="320px" ariaLabel="Main menu">
      <div className="p-4 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <BrandLogo className="text-2xl" />
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-cream-200 hover:text-cream-50"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-1 overflow-y-auto flex-1">
          {NAV_LINKS.map((link) => (
            <DrawerLink key={link.href} {...link} active={isActive(link.href)} onClick={onClose} />
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-lux space-y-1 shrink-0">
          {SECONDARY_NAV_LINKS.map((link) => (
            <DrawerLink key={link.href} {...link} onClick={onClose} />
          ))}
          <DrawerLink
            href="/account"
            label={isAuthenticated ? 'My Account' : 'Login / Register'}
            onClick={onClose}
          />        </div>
      </div>
    </Drawer>
  );
}
