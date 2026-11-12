'use client';

import React, { useState } from 'react';
import { AlertTriangle, X, XCircle } from 'lucide-react';
import { formatPrice } from '@/config/app';
import { Modal } from '@/components/Modal';
import { cn } from '@/lib/cn';
import type { MockOrder } from '../DashboardOverviewSection';

const COMMON_CANCELLATION_REASONS = [
  'Customer requested cancellation',
  'Customer unreachable on phone (COD verification failed)',
  'Fake / prank order',
  'Duplicate order',
  'Out of stock / batch unavailable',
  'Payment issue / bKash failed',
];

interface CancelOrderModalProps {
  /** Order to cancel; the modal is closed when null. */
  order: MockOrder | null;
  onClose: () => void;
  onConfirm: (orderId: string, reason: string) => void;
}

export function CancelOrderModal({ order, onClose, onConfirm }: CancelOrderModalProps) {
  return (
    <Modal open={!!order} onClose={onClose} tone="danger" className="sm:p-8" ariaLabel="Cancel order">
      {/* Keyed so the reason picker resets for every order. */}
      {order && <CancelOrderForm key={order.id} order={order} onClose={onClose} onConfirm={onConfirm} />}
    </Modal>
  );
}

function CancelOrderForm({
  order,
  onClose,
  onConfirm,
}: {
  order: MockOrder;
  onClose: () => void;
  onConfirm: (orderId: string, reason: string) => void;
}) {
  const [selectedReason, setSelectedReason] = useState(COMMON_CANCELLATION_REASONS[0]);
  const [customReason, setCustomReason] = useState('');

  const handleConfirm = () => {
    onConfirm(order.id, customReason.trim() || selectedReason);
    onClose();
  };

  return (
    <>
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 text-noir-400 hover:text-cream-50 transition-colors p-1"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-3.5 mb-4">
        <div className="w-11 h-11 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-semibold text-cream-50">
            Cancel Order #{order.orderNumber}
          </h3>
          <p className="text-xs text-noir-400">
            Customer: {order.customerName} ({order.phone})
          </p>
        </div>
      </div>

      <p className="text-xs text-noir-300 leading-relaxed mb-6 font-light">
        Are you sure you want to mark this order as cancelled? This will void the order total (
        {formatPrice(order.total)}) from active sales revenue and record the cancellation reason.
      </p>

      <div className="space-y-4 mb-6">
        <fieldset>
          <legend className="block text-xs font-semibold uppercase tracking-wider text-noir-300 mb-2">
            Select Cancellation Reason
          </legend>
          <div className="space-y-2">
            {COMMON_CANCELLATION_REASONS.map((reason) => {
              const checked = selectedReason === reason && !customReason;
              return (
                <label
                  key={reason}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-colors',
                    checked
                      ? 'border-rose-500/40 bg-rose-500/10 text-rose-200'
                      : 'border-noir-800 bg-noir-900/60 text-noir-300 hover:border-noir-700'
                  )}
                >
                  <input
                    type="radio"
                    name="cancelReason"
                    checked={checked}
                    onChange={() => {
                      setSelectedReason(reason);
                      setCustomReason('');
                    }}
                    className="accent-rose-500 cursor-pointer"
                  />
                  <span>{reason}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div>
          <label
            htmlFor="custom-cancel-reason"
            className="block text-xs font-semibold uppercase tracking-wider text-noir-400 mb-1.5"
          >
            Or Custom Reason (Optional)
          </label>
          <input
            id="custom-cancel-reason"
            type="text"
            placeholder="e.g. Customer changed mind after courier dispatched..."
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-noir-900 border border-noir-800 rounded-xl text-xs text-noir-100 placeholder:text-noir-500 outline-none focus:border-rose-500"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-noir-800">
        <button
          type="button"
          onClick={onClose}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-noir-700 text-xs font-medium text-noir-300 hover:text-cream-50 hover:bg-noir-900 transition-colors cursor-pointer"
        >
          Keep Order Active
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-600/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <XCircle className="w-4 h-4" />
          <span>Confirm Cancellation</span>
        </button>
      </div>
    </>
  );
}
