import React from 'react';
import { AlertTriangle, Check, CheckCircle2, Info, RotateCcw, XCircle } from 'lucide-react';
import { formatPrice } from '@/config/app';
import { cn } from '@/lib/cn';
import type { MockOrder, MockOrderStatus, OrderActionStatus } from '../DashboardOverviewSection';

const STATUS_STYLES: Partial<Record<MockOrderStatus, string>> = {
  delivered: 'bg-emerald-500/15 border-emerald-500/20 text-emerald-400',
  shipped: 'bg-blue-500/15 border-blue-500/20 text-blue-400',
};
const DEFAULT_STATUS_STYLE = 'bg-amber-500/15 border-amber-500/20 text-amber-400';

const ACTION_BUTTON =
  'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer whitespace-nowrap';

interface AdminOrderRowProps {
  order: MockOrder;
  onStatusChange: (order: MockOrder, status: MockOrderStatus) => void;
  onActionStatusChange: (orderId: string, status: OrderActionStatus) => void;
}

export function AdminOrderRow({ order: o, onStatusChange, onActionStatusChange }: AdminOrderRowProps) {
  const isCancelled = o.status === 'cancelled';
  const isNew = !isCancelled && (o.actionStatus || 'new') === 'new';

  return (
    <tr
      className={cn(
        'transition-colors',
        isCancelled
          ? 'bg-rose-950/10 hover:bg-rose-950/20'
          : isNew
            ? 'bg-rose-950/5 hover:bg-rose-950/15'
            : 'hover:bg-noir-800/40'
      )}
    >
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          <p className={cn('font-semibold', isCancelled ? 'text-noir-300 line-through' : 'text-cream-50')}>
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

      <td className="py-4 px-6">
        <p className="font-medium text-cream-50">{o.customerName}</p>
        <p className="text-xs text-noir-400">
          {o.location} &bull; {o.phone}
        </p>
      </td>

      <td className="py-4 px-6 text-xs text-noir-300 max-w-xs">{o.itemsSummary}</td>

      <td className="py-4 px-6 font-serif">
        <span className={isCancelled ? 'text-noir-500 line-through text-sm' : 'font-bold text-gold-300'}>
          {formatPrice(o.total)}
        </span>
        {isCancelled && (
          <span className="text-[10px] text-rose-400/80 block font-sans">Cancelled</span>
        )}
      </td>

      <td className="py-4 px-6 text-xs font-mono uppercase text-noir-400">{o.paymentMethod}</td>

      <td className="py-4 px-6">
        {isCancelled ? (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border bg-rose-500/15 border-rose-500/30 text-rose-300">
              <XCircle className="w-3.5 h-3.5 text-rose-400" />
              <span>Cancelled</span>
            </span>
            {o.cancellationReason && <CancellationReasonTooltip reason={o.cancellationReason} />}
          </div>
        ) : (
          <span
            className={cn(
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
              STATUS_STYLES[o.status] ?? DEFAULT_STATUS_STYLE
            )}
          >
            {o.status}
          </span>
        )}
      </td>

      <td className="py-4 px-6 text-right">
        <div className="flex items-center justify-end gap-2">
          {isCancelled ? (
            <button
              type="button"
              onClick={() => onStatusChange(o, 'processing')}
              className={cn(ACTION_BUTTON, 'gap-1 bg-noir-800 text-noir-300 border-noir-700 hover:text-gold-300 hover:border-gold-400/30')}
              title="Reopen order into processing"
            >
              <RotateCcw className="w-3 h-3 text-gold-400" />
              <span>Reopen</span>
            </button>
          ) : isNew ? (
            <button
              type="button"
              onClick={() => onActionStatusChange(o.id, 'action_taken')}
              className={cn(ACTION_BUTTON, 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25 hover:border-emerald-500/50')}
              title="Mark action taken"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Mark Taken</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onActionStatusChange(o.id, 'new')}
              className={cn(ACTION_BUTTON, 'group bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-noir-800 hover:text-noir-300')}
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
            onChange={(e) => onStatusChange(o, e.target.value as MockOrderStatus)}
            className={cn(
              'text-xs border rounded-lg px-2.5 py-1.5 bg-noir-950 outline-none cursor-pointer transition-colors',
              isCancelled
                ? 'border-rose-500/40 text-rose-300 focus:border-rose-400'
                : 'border-noir-700 text-noir-200 focus:border-gold-400'
            )}
            title="Update fulfillment or cancel order"
            aria-label={`Status for order ${o.orderNumber}`}
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
}

function CancellationReasonTooltip({ reason }: { reason: string }) {
  return (
    <div className="relative inline-flex items-center group">
      <button
        type="button"
        title={`Reason: ${reason}`}
        className="p-1 rounded-full text-rose-400/90 hover:text-rose-200 hover:bg-rose-500/20 transition-all focus:outline-none cursor-pointer"
        aria-label="View cancellation reason"
      >
        <Info className="w-3.5 h-3.5" />
      </button>
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 hidden group-hover:flex group-focus-within:flex flex-col z-50 w-60 p-2.5 rounded-lg bg-noir-900 border border-rose-500/30 shadow-2xl shadow-black/90 backdrop-blur-md pointer-events-none">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-400 mb-1">
          <AlertTriangle className="w-3 h-3 text-rose-400 shrink-0" />
          <span>Cancellation Reason</span>
        </div>
        <p className="text-xs text-noir-200 font-normal leading-relaxed break-words whitespace-normal">
          {reason}
        </p>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-noir-900" />
      </div>
    </div>
  );
}
