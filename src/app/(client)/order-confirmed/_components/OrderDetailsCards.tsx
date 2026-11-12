import React from 'react';
import { CreditCard, MapPin, Phone, ShieldCheck } from 'lucide-react';
import type { Order } from '@/types';
import { formatPrice } from '@/config/app';
import { paymentMethodLabel } from '@/lib/orders';
import { Card, SectionLabel, WhatsAppLink } from '@/components/ui';

export function DeliveryDestinationCard({ order }: { order: Order }) {
  const { address, customer } = order;
  return (
    <Card className="p-6">
      <SectionLabel icon={MapPin}>Delivery Destination</SectionLabel>
      <div className="space-y-3 text-xs">
        <div>
          <p className="text-noir-400 text-[11px]">Recipient Name:</p>
          <p className="font-semibold text-cream-50 text-sm mt-0.5">
            {address.fullName || customer.name}
          </p>
        </div>
        <div>
          <p className="text-noir-400 text-[11px]">Contact Phone:</p>
          <p className="font-mono font-medium text-cream-100 mt-0.5 flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-gold-400" />
            <span>{address.phone || customer.phone}</span>
          </p>
        </div>
        <div>
          <p className="text-noir-400 text-[11px]">Shipping Address:</p>
          <p className="text-noir-200 mt-0.5 leading-relaxed">{address.fullAddress}</p>
          <p className="text-noir-400 text-[11px] mt-0.5">
            {address.area}, {address.district}, {address.division}
          </p>
        </div>
        {address.instructions && (
          <div className="pt-2 border-t border-noir-800">
            <p className="text-noir-400 text-[11px]">Special Instructions:</p>
            <p className="text-noir-300 italic mt-0.5 font-light">
              &ldquo;{address.instructions}&rdquo;
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

export function PaymentDetailsCard({ order }: { order: Order }) {
  const isCod = order.paymentMethod === 'cod';
  return (
    <Card className="p-6">
      <SectionLabel icon={CreditCard}>Payment Details</SectionLabel>
      <div className="space-y-3 text-xs">
        <div className="flex justify-between items-center">
          <span className="text-noir-400">Method:</span>
          <span className="px-2.5 py-1 rounded-full font-mono text-[11px] font-semibold border bg-noir-950 border-noir-700 text-gold-300">
            {paymentMethodLabel(order.paymentMethod)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-noir-400">Payment Status:</span>
          <span className="text-emerald-400 font-medium">
            {isCod ? 'Due upon Delivery' : 'Paid / Verified'}
          </span>
        </div>
        <div className="pt-3 border-t border-noir-800 text-[11px] text-noir-400 leading-relaxed flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            {isCod
              ? 'Please keep the exact amount ready in cash when the delivery agent arrives.'
              : 'Your transaction has been securely processed and confirmed with our concierge.'}
          </span>
        </div>
      </div>
    </Card>
  );
}

export function ConciergeCard({ order }: { order: Order }) {
  const message = `Hello Amros Perfumes Concierge! I have placed order #${order.orderNumber} for ${formatPrice(
    order.total
  )}. Recipient: ${order.customer.name} (${order.customer.phone}). Please confirm delivery timing.`;

  return (
    <Card tone="highlight" className="p-6 text-xs">
      <p className="text-gold-300 font-serif text-sm font-semibold mb-1">Dhaka Concierge Service</p>
      <p className="text-noir-400 mb-4 font-light leading-relaxed">
        Have questions about batch codes or need express delivery adjustment?
      </p>
      <WhatsAppLink message={message}>WhatsApp Concierge</WhatsAppLink>
    </Card>
  );
}
