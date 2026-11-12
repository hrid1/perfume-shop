'use client';

import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Check,
  RotateCcw,
  XCircle,
  AlertTriangle,
  X,
  Info,
} from 'lucide-react';
import { formatPrice } from '@/config/app';
import {
  MockOrder,
  MockOrderStatus,
  OrderActionStatus,
} from './DashboardOverviewSection';

interface OrdersManagementSectionProps {
  orders: MockOrder[];
  orderSearch: string;
  onSearchChange: (value: string) => void;
  onUpdateStatus: (
    orderId: string,
    newStatus: MockOrderStatus,
    reason?: string
  ) => void;
  onUpdateActionStatus: (
    orderId: string,
    newActionStatus: OrderActionStatus
  ) => void;
}

const COMMON_CANCELLATION_REASONS = [
  'Customer requested cancellation',
  'Customer unreachable on phone (COD verification failed)',
  'Fake / prank order',
  'Duplicate order',
  'Out of stock / batch unavailable',
  'Payment issue / bKash failed',
];

export function OrdersManagementSection({
  orders,
  orderSearch,
  onSearchChange,
  onUpdateStatus,
  onUpdateActionStatus,
}: OrdersManagementSectionProps) {
  const [tabFilter, setTabFilter] = useState<'all' | 'new' | 'action_taken' | 'cancelled'>('all');

  // Cancel Modal State
  const [cancelModalOrder, setCancelModalOrder] = useState<MockOrder | null>(null);
  const [selectedReason, setSelectedReason] = useState(COMMON_CANCELLATION_REASONS[0]);
  const [customReason, setCustomReason] = useState('');

  const newOrdersCount = orders.filter(
    (o) => o.status !== 'cancelled' && (o.actionStatus || 'new') === 'new'
  ).length;

  const actionTakenCount = orders.filter(
    (o) => o.status !== 'cancelled' && o.actionStatus === 'action_taken'
  ).length;

  const cancelledCount = orders.filter((o) => o.status === 'cancelled').length;

  const displayedOrders = orders.filter((o) => {
    if (tabFilter === 'all') return true;
    if (tabFilter === 'cancelled') return o.status === 'cancelled';
    if (o.status === 'cancelled') return false; // exclude cancelled from new/action_taken tabs
    const currentAction = o.actionStatus || 'new';
    return currentAction === tabFilter;
  });

  const handleStatusSelectChange = (order: MockOrder, newStatus: MockOrderStatus) => {
    if (newStatus === 'cancelled') {
      // Trigger confirmation modal
      setCancelModalOrder(order);
      setSelectedReason(COMMON_CANCELLATION_REASONS[0]);
      setCustomReason('');
    } else {
      onUpdateStatus(order.id, newStatus);
    }
  };

  const handleConfirmCancel = () => {
    if (!cancelModalOrder) return;
    const finalReason = customReason.trim() ? customReason.trim() : selectedReason;
    onUpdateStatus(cancelModalOrder.id, 'cancelled', finalReason);
    setCancelModalOrder(null);
  };

  return (
    <div className="animate-fade-in relative">
      {/* ── Top Header & Search ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-3xl font-normal text-cream-50">
            Orders Management
          </h1>
          <p className="text-xs text-noir-400 mt-1">
            Track customer orders, verify details, and manage cancellations & fulfillment.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-noir-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search orders..."
            value={orderSearch}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-noir-900 border border-noir-800 rounded-xl text-sm text-noir-100 placeholder:text-noir-500 outline-none focus:border-gold-400 transition-colors"
          />
        </div>
      </div>

      {/* ── Filter Tabs (Including Cancelled) ── */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <button
          onClick={() => setTabFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            tabFilter === 'all'
              ? 'bg-gold-400 text-noir-950 font-semibold shadow-sm'
              : 'bg-noir-900 border border-noir-800 text-noir-300 hover:text-cream-50 hover:border-noir-700'
          }`}
        >
          All Orders ({orders.length})
        </button>

        <button
          onClick={() => setTabFilter('new')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            tabFilter === 'new'
              ? 'bg-rose-500 text-white font-semibold shadow-sm shadow-rose-500/20'
              : 'bg-noir-900 border border-noir-800 text-noir-300 hover:text-rose-300 hover:border-rose-500/40'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              tabFilter === 'new' ? 'bg-white' : 'bg-rose-400 animate-pulse'
            }`}
          />
          <span>New Orders ({newOrdersCount})</span>
        </button>

        <button
          onClick={() => setTabFilter('action_taken')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            tabFilter === 'action_taken'
              ? 'bg-emerald-500 text-white font-semibold shadow-sm shadow-emerald-500/20'
              : 'bg-noir-900 border border-noir-800 text-noir-300 hover:text-emerald-300 hover:border-emerald-500/40'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Action Taken ({actionTakenCount})</span>
        </button>

        <button
          onClick={() => setTabFilter('cancelled')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            tabFilter === 'cancelled'
              ? 'bg-rose-600 text-white font-semibold shadow-sm shadow-rose-600/30'
              : 'bg-noir-900 border border-noir-800 text-noir-300 hover:text-rose-400 hover:border-rose-500/40'
          }`}
        >
          <XCircle className="w-3.5 h-3.5 text-rose-400" />
          <span>Cancelled ({cancelledCount})</span>
        </button>
      </div>

      {/* ── Table Container ── */}
      <div className="bg-noir-900/80 text-cream-50 rounded-2xl shadow-lg border border-noir-800 overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-noir-950/80 border-b border-noir-800 text-xs uppercase tracking-wider text-noir-400">
              <tr>
                <th className="py-3.5 px-6">Order</th>
                <th className="py-3.5 px-6">Customer</th>
                <th className="py-3.5 px-6">Items</th>
                <th className="py-3.5 px-6">Total</th>
                <th className="py-3.5 px-6">Payment</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-noir-800">
              {displayedOrders.map((o) => {
                const isCancelled = o.status === 'cancelled';
                const isNew = !isCancelled && (o.actionStatus || 'new') === 'new';

                return (
                  <tr
                    key={o.id}
                    className={`transition-colors ${
                      isCancelled
                        ? 'bg-rose-950/10 hover:bg-rose-950/20'
                        : isNew
                        ? 'bg-rose-950/5 hover:bg-rose-950/15'
                        : 'hover:bg-noir-800/40'
                    }`}
                  >
                    {/* Order Column */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <p
                          className={`font-semibold ${
                            isCancelled ? 'text-noir-300 line-through' : 'text-cream-50'
                          }`}
                        >
                          {o.orderNumber}
                        </p>
                        {isNew && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/15 border border-rose-500/30 text-rose-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                            New
                          </span>
                        )}
                        {isCancelled && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                            Void
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-noir-400 mt-0.5">{o.date}</p>
                    </td>

                    {/* Customer Column */}
                    <td className="py-4 px-6">
                      <p className="font-medium text-cream-50">{o.customerName}</p>
                      <p className="text-xs text-noir-400">
                        {o.location} &bull; {o.phone}
                      </p>
                    </td>

                    {/* Items Column */}
                    <td className="py-4 px-6 text-xs text-noir-300 max-w-xs">
                      {o.itemsSummary}
                    </td>

                    {/* Total Column */}
                    <td className="py-4 px-6 font-serif">
                      <span
                        className={
                          isCancelled
                            ? 'text-noir-500 line-through text-sm'
                            : 'font-bold text-gold-300'
                        }
                      >
                        {formatPrice(o.total)}
                      </span>
                      {isCancelled && (
                        <span className="text-[10px] text-rose-400/80 block font-sans">
                          Cancelled
                        </span>
                      )}
                    </td>

                    {/* Payment Column */}
                    <td className="py-4 px-6 text-xs font-mono uppercase text-noir-400">
                      {o.paymentMethod}
                    </td>

                    {/* Status Column */}
                    <td className="py-4 px-6">
                      {isCancelled ? (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border bg-rose-500/15 border-rose-500/30 text-rose-300">
                            <XCircle className="w-3.5 h-3.5 text-rose-400" />
                            <span>Cancelled</span>
                          </span>

                          {o.cancellationReason && (
                            <div className="relative inline-flex items-center group">
                              <button
                                type="button"
                                title={`Reason: ${o.cancellationReason}`}
                                className="p-1 rounded-full text-rose-400/90 hover:text-rose-200 hover:bg-rose-500/20 transition-all focus:outline-none cursor-pointer"
                                aria-label="View cancellation reason"
                              >
                                <Info className="w-3.5 h-3.5" />
                              </button>

                              {/* Tooltip on hover */}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 hidden group-hover:flex flex-col z-50 w-60 p-2.5 rounded-lg bg-noir-900 border border-rose-500/30 shadow-2xl shadow-black/90 backdrop-blur-md pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-400 mb-1">
                                  <AlertTriangle className="w-3 h-3 text-rose-400 shrink-0" />
                                  <span>Cancellation Reason</span>
                                </div>
                                <p className="text-xs text-noir-200 font-normal leading-relaxed break-words whitespace-normal">
                                  {o.cancellationReason}
                                </p>
                                {/* Tooltip top arrow */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-noir-900" />
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            o.status === 'delivered'
                              ? 'bg-emerald-500/15 border-emerald-500/20 text-emerald-400'
                              : o.status === 'shipped'
                              ? 'bg-blue-500/15 border-blue-500/20 text-blue-400'
                              : 'bg-amber-500/15 border-amber-500/20 text-amber-400'
                          }`}
                        >
                          {o.status}
                        </span>
                      )}
                    </td>

                    {/* Action Column */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {isCancelled ? (
                          <button
                            onClick={() => onUpdateStatus(o.id, 'processing')}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-noir-800 text-noir-300 border border-noir-700 hover:text-gold-300 hover:border-gold-400/30 transition-all cursor-pointer whitespace-nowrap"
                            title="Reopen order into processing"
                          >
                            <RotateCcw className="w-3 h-3 text-gold-400" />
                            <span>Reopen</span>
                          </button>
                        ) : isNew ? (
                          <button
                            onClick={() => onUpdateActionStatus(o.id, 'action_taken')}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 hover:border-emerald-500/50 transition-all cursor-pointer whitespace-nowrap"
                            title="Mark action taken"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Mark Taken</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => onUpdateActionStatus(o.id, 'new')}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-noir-800 hover:text-noir-300 transition-all cursor-pointer whitespace-nowrap group"
                            title="Click to reset to New Order"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 group-hover:hidden" />
                            <RotateCcw className="w-3.5 h-3.5 hidden group-hover:inline" />
                            <span className="group-hover:hidden">Action Taken</span>
                            <span className="hidden group-hover:inline">Reset</span>
                          </button>
                        )}

                        <select
                          value={o.status}
                          onChange={(e) =>
                            handleStatusSelectChange(
                              o,
                              e.target.value as MockOrderStatus
                            )
                          }
                          className={`text-xs border rounded-lg px-2.5 py-1.5 bg-noir-950 outline-none cursor-pointer transition-colors ${
                            isCancelled
                              ? 'border-rose-500/40 text-rose-300 focus:border-rose-400'
                              : 'border-noir-700 text-noir-200 focus:border-gold-400'
                          }`}
                          title="Update fulfillment or cancel order"
                        >
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {displayedOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-noir-400">
                    <p className="text-sm">No orders found matching this filter.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Cancel Order Reason Modal ── */}
      {cancelModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="card-lux w-full max-w-lg p-6 sm:p-8 border border-rose-500/30 bg-noir-950 shadow-2xl relative rounded-2xl">
            <button
              onClick={() => setCancelModalOrder(null)}
              className="absolute top-5 right-5 text-noir-400 hover:text-cream-50 transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-11 h-11 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-cream-50">
                  Cancel Order #{cancelModalOrder.orderNumber}
                </h3>
                <p className="text-xs text-noir-400">
                  Customer: {cancelModalOrder.customerName} ({cancelModalOrder.phone})
                </p>
              </div>
            </div>

            <p className="text-xs text-noir-300 leading-relaxed mb-6 font-light">
              Are you sure you want to mark this order as cancelled? This will void the order total ({formatPrice(cancelModalOrder.total)}) from active sales revenue and record the cancellation reason.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-noir-300 mb-2">
                  Select Cancellation Reason
                </label>
                <div className="space-y-2">
                  {COMMON_CANCELLATION_REASONS.map((reason) => (
                    <label
                      key={reason}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                        selectedReason === reason && !customReason
                          ? 'border-rose-500/40 bg-rose-500/10 text-rose-200'
                          : 'border-noir-800 bg-noir-900/60 text-noir-300 hover:border-noir-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="cancelReason"
                        checked={selectedReason === reason && !customReason}
                        onChange={() => {
                          setSelectedReason(reason);
                          setCustomReason('');
                        }}
                        className="accent-rose-500 cursor-pointer"
                      />
                      <span>{reason}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-noir-400 mb-1.5">
                  Or Custom Reason (Optional)
                </label>
                <input
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
                onClick={() => setCancelModalOrder(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-noir-700 text-xs font-medium text-noir-300 hover:text-cream-50 hover:bg-noir-900 transition-colors cursor-pointer"
              >
                Keep Order Active
              </button>

              <button
                type="button"
                onClick={handleConfirmCancel}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-600/30 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <XCircle className="w-4 h-4" />
                <span>Confirm Cancellation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
