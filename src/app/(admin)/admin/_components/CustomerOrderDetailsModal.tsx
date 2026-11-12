'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Modal } from '@/components/Modal';
import { formatPrice } from '@/config/app';
import { MockOrder } from './DashboardOverviewSection';

interface CustomerOrderDetailsModalProps {
  open: boolean;
  onClose: () => void;
  customerName: string;
  customerPhone: string;
  orders: MockOrder[];
}

export function CustomerOrderDetailsModal({
  open,
  onClose,
  customerName,
  customerPhone,
  orders,
}: CustomerOrderDetailsModalProps) {
  return (
    <Modal open={open} onClose={onClose} className="max-h-[85vh] overflow-y-auto">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-cream-50">Order Details</h2>
          <p className="mt-1 text-xs text-noir-400">
            {customerName} · {customerPhone}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close order details"
          className="rounded-full p-1.5 text-noir-400 transition-colors hover:bg-noir-800 hover:text-cream-50"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {orders.length === 0 ? (
        <p className="py-6 text-center text-sm text-noir-400">
          No order details are available for this customer.
        </p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <section
              key={order.id}
              className="rounded-xl border border-noir-800 bg-noir-950/60 p-4"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-noir-800 pb-3">
                <div>
                  <p className="text-sm font-semibold text-cream-50">{order.orderNumber}</p>
                  <p className="mt-0.5 text-xs text-noir-400">{order.date}</p>
                </div>
                <p className="font-mono text-sm font-semibold text-gold-300">
                  {formatPrice(order.total)}
                </p>
              </div>
              <ul className="space-y-2">
                {order.items.map((item, index) => (
                  <li
                    key={`${order.id}-${index}`}
                    className="flex items-start justify-between gap-3 text-xs"
                  >
                    <span className="text-noir-200">
                      {item.productName}
                      {item.size !== '—' && (
                        <span className="ml-1 text-noir-500">({item.size})</span>
                      )}
                    </span>
                    <span className="shrink-0 text-noir-400">Qty: {item.quantity}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </Modal>
  );
}
