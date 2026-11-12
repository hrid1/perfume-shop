'use client';

import React from 'react';
import { useOverlay } from '@/hooks/useOverlay';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: 'left' | 'right';
  width?: string;
  className?: string;
  /** Accessible name announced by screen readers. */
  ariaLabel?: string;
}

export function Drawer({
  open,
  onClose,
  children,
  side = 'left',
  width = '320px',
  className = '',
  ariaLabel,
}: DrawerProps) {
  useOverlay(open, onClose);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className={`relative h-full bg-noir-950 border-r border-noir-800 text-cream-50 shadow-2xl z-10 overflow-y-auto flex flex-col ${
          side === 'left' ? 'mr-auto' : 'ml-auto border-l border-r-0'
        } ${className}`}
        style={{ width, maxWidth: '85vw' }}
      >
        {children}
      </div>
    </div>
  );
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  /** Accessible name announced by screen readers. */
  ariaLabel?: string;
  /** "danger" uses a red border and darker panel for destructive confirmations. */
  tone?: 'default' | 'danger';
}

const MODAL_TONES = {
  default: 'bg-noir-900 border-noir-700',
  danger: 'bg-noir-950 border-rose-500/30',
};

export function Modal({
  open,
  onClose,
  children,
  className = '',
  ariaLabel,
  tone = 'default',
}: ModalProps) {
  useOverlay(open, onClose);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 animate-fade-in">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className={`relative z-10 w-full max-w-lg border rounded-2xl shadow-2xl p-6 ${MODAL_TONES[tone]} ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
