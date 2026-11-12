'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, Printer, ShoppingBag } from 'lucide-react';
import type { Order } from '@/types';
import { findOrder } from '@/lib/orders';
import { Button, ButtonLink, Card, EmptyState, PageLoader, SectionLabel, WhatsAppLink } from '@/components/ui';
import { OrderProgress } from '@/components/order';
import {
  ConciergeCard,
  DeliveryDestinationCard,
  OrderConfirmedHero,
  OrderItemsCard,
  PaymentDetailsCard,
} from './_components';

const LOADING_MESSAGE = 'Loading order receipt...';

function OrderConfirmedContent() {
  const searchParams = useSearchParams();
  const orderNumberParam = searchParams.get('orderNumber');
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Orders live in localStorage, so they can only be read after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrder(findOrder(orderNumberParam));
    setIsLoaded(true);
  }, [orderNumberParam]);

  if (!isLoaded) return <PageLoader message={LOADING_MESSAGE} />;

  if (!order) {
    return (
      <div className="container-lux py-24 max-w-xl animate-fade-in">
        <Card className="px-10">
          <EmptyState
            icon={ShoppingBag}
            eyebrow="No Recent Order"
            title="No Active Order Found"
            description="We couldn't locate the requested order details. If you recently placed an order, please check your confirmation SMS or contact our concierge."
            actions={
              <>
                <ButtonLink href="/catalog" size="lg" className="w-full sm:w-auto">
                  <span>Explore Fragrances</span>
                  <ArrowRight className="w-4 h-4" />
                </ButtonLink>
                <WhatsAppLink
                  variant="outline"
                  className="w-full sm:w-auto"
                  message="Hello Amros Perfumes, I have an inquiry about my recent order."
                >
                  Contact Concierge
                </WhatsAppLink>
              </>
            }
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="container-lux py-12 md:py-16 max-w-4xl animate-fade-in print:py-4">
      <OrderConfirmedHero orderNumber={order.orderNumber} customerName={order.customer.name} />

      <Card className="p-6 md:p-8 mb-8 print:hidden">
        <SectionLabel className="mb-6" aside={`Est. ${order.estimatedDelivery}`}>
          Delivery Progress
        </SectionLabel>
        <OrderProgress status={order.status} variant="detailed" />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        <div className="lg:col-span-7 space-y-6">
          <OrderItemsCard order={order} />
        </div>
        <div className="lg:col-span-5 space-y-6">
          <DeliveryDestinationCard order={order} />
          <PaymentDetailsCard order={order} />
          <ConciergeCard order={order} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-noir-800 print:hidden">
        <ButtonLink href="/catalog" size="lg" className="w-full sm:w-auto">
          <span>Continue Discovering Fragrances</span>
          <ArrowRight className="w-4 h-4" />
        </ButtonLink>
        <Button variant="subtle" onClick={() => window.print()} className="w-full sm:w-auto">
          <Printer className="w-4 h-4 text-gold-400" />
          <span>Print Receipt</span>
        </Button>
      </div>
    </div>
  );
}

export default function OrderConfirmedPage() {
  return (
    <Suspense fallback={<PageLoader message={LOADING_MESSAGE} />}>
      <OrderConfirmedContent />
    </Suspense>
  );
}
