'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import type { MockOrder, MockOrderStatus, OrderActionStatus } from './DashboardOverviewSection';
import { AdminOrderRow } from './orders/AdminOrderRow';
import { CancelOrderModal } from './orders/CancelOrderModal';
import { OrderFilterTabs, type OrderTabFilter } from './orders/OrderFilterTabs';

interface OrdersManagementSectionProps {
  orders: MockOrder[];
  orderSearch: string;
  onSearchChange: (value: string) => void;
  onUpdateStatus: (orderId: string, newStatus: MockOrderStatus, reason?: string) => void;
  onUpdateActionStatus: (orderId: string, newActionStatus: OrderActionStatus) => void;
}

const actionOf = (order: MockOrder) => order.actionStatus || 'new';

function matchesTab(order: MockOrder, tab: OrderTabFilter): boolean {
  if (tab === 'all') return true;
  if (tab === 'cancelled') return order.status === 'cancelled';
  // Cancelled orders only appear under "All" and "Cancelled".
  return order.status !== 'cancelled' && actionOf(order) === tab;
}

const TABLE_COLUMNS = ['Order', 'Customer', 'Items', 'Total', 'Payment', 'Status'];

export function OrdersManagementSection({
  orders,
  orderSearch,
  onSearchChange,
  onUpdateStatus,
  onUpdateActionStatus,
}: OrdersManagementSectionProps) {
  const [tabFilter, setTabFilter] = useState<OrderTabFilter>('all');
  const [orderToCancel, setOrderToCancel] = useState<MockOrder | null>(null);

  const counts: Record<OrderTabFilter, number> = {
    all: orders.length,
    new: orders.filter((o) => matchesTab(o, 'new')).length,
    action_taken: orders.filter((o) => matchesTab(o, 'action_taken')).length,
    cancelled: orders.filter((o) => matchesTab(o, 'cancelled')).length,
  };
  const displayedOrders = orders.filter((o) => matchesTab(o, tabFilter));

  // Cancelling needs a reason, so it goes through the confirmation modal.
  const handleStatusChange = (order: MockOrder, newStatus: MockOrderStatus) => {
    if (newStatus === 'cancelled') setOrderToCancel(order);
    else onUpdateStatus(order.id, newStatus);
  };

  return (
    <div className="animate-fade-in relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-3xl font-normal text-cream-50">Orders Management</h1>
          <p className="text-xs text-noir-400 mt-1">
            Track customer orders, verify details, and manage cancellations & fulfillment.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-noir-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search orders..."
            aria-label="Search orders"
            value={orderSearch}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-noir-900 border border-noir-800 rounded-xl text-sm text-noir-100 placeholder:text-noir-500 outline-none focus:border-gold-400 transition-colors"
          />
        </div>
      </div>

      <OrderFilterTabs value={tabFilter} onChange={setTabFilter} counts={counts} />

      <div className="bg-noir-900/80 text-cream-50 rounded-2xl shadow-lg border border-noir-800 overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-noir-950/80 border-b border-noir-800 text-xs uppercase tracking-wider text-noir-400">
              <tr>
                {TABLE_COLUMNS.map((column) => (
                  <th key={column} className="py-3.5 px-6">
                    {column}
                  </th>
                ))}
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-noir-800">
              {displayedOrders.map((order) => (
                <AdminOrderRow
                  key={order.id}
                  order={order}
                  onStatusChange={handleStatusChange}
                  onActionStatusChange={onUpdateActionStatus}
                />
              ))}

              {displayedOrders.length === 0 && (
                <tr>
                  <td colSpan={TABLE_COLUMNS.length + 1} className="py-12 text-center text-noir-400">
                    <p className="text-sm">No orders found matching this filter.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CancelOrderModal
        order={orderToCancel}
        onClose={() => setOrderToCancel(null)}
        onConfirm={(orderId, reason) => onUpdateStatus(orderId, 'cancelled', reason)}
      />
    </div>
  );
}
