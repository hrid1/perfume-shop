'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { BANGLADESH_DIVISIONS } from '@/data/locations';
import { PaymentMethod, Order } from '@/types';
import { useCoupons } from '@/context/CouponContext';
import { useAuth } from '@/context/AuthContext';
import { calcOrderTotals, getDeliveryZone, getEstimatedDelivery } from '@/lib/pricing';
import { generateOrderNumber, saveOrder } from '@/lib/orders';
import { ShoppingBag } from 'lucide-react';
import { Button, EmptyState } from '@/components/ui';
import {
  CheckoutHeader,
  CheckoutEmptyState,
  CheckoutContactForm,
  CheckoutShippingAddress,
  CheckoutPaymentSelection,
  CheckoutOrderSummary,
} from './_components';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    selectedItems,
    subtotal,
    discount,
    couponCode,
    couponError,
    completeCheckout,
    openCart,
  } = useCart();
  const { markCouponUsed } = useCoupons();
  const { user } = useAuth();

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [division, setDivision] = useState('Dhaka');
  const [district, setDistrict] = useState('Dhaka');
  const [area, setArea] = useState('Gulshan');
  const [customArea, setCustomArea] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bkash');
  const [phoneError, setPhoneError] = useState('');

  // Order Placement State
  const [isSubmitting, setIsSubmitting] = useState(false);

  const districtsForDivision = BANGLADESH_DIVISIONS[division] || [];
  const deliveryZone = getDeliveryZone(division, district);
  const isDhakaCity = deliveryZone === 'insideDhaka';

  const { deliveryFee, total: grandTotal } = calcOrderTotals({
    subtotal,
    discount,
    itemCount: selectedItems.length,
    zone: deliveryZone,
  });

  const handleDivisionChange = (newDivision: string) => {
    setDivision(newDivision);
    const availableDistricts = BANGLADESH_DIVISIONS[newDivision] || [];
    setDistrict(availableDistricts[0] || '');
  };

  const validatePhone = (num: string): boolean => {
    const cleaned = num.replace(/[\s-]/g, '');
    const regex = /^01[3-9]\d{8}$/;
    if (!regex.test(cleaned)) {
      setPhoneError('Please enter a valid 11-digit Bangladeshi mobile number (e.g. 017XXXXXXXX)');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(phone)) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedOrderNumber = generateOrderNumber();
      // Only record a coupon that actually gave a discount on this order.
      const usedCoupon = couponCode && !couponError && discount > 0 ? couponCode : undefined;

      const completedOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: generatedOrderNumber,
        userId: user?.id,
        customer: {
          name: fullName,
          phone,
          email: email || undefined,
        },
        items: selectedItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          image: item.image,
          size: item.size,
          price: item.price,
          quantity: item.quantity,
        })),
        address: {
          fullName,
          phone,
          division,
          district,
          // Dhaka city picks from a list; everywhere else the customer types the area.
          area: isDhakaCity ? area : customArea.trim(),
          fullAddress,
          instructions: notes || undefined,
        },
        paymentMethod,
        // No payment gateway is connected yet, so nothing has been charged. Only mark an
        // order "paid" once a real gateway confirms it (server-side webhook).
        paymentStatus: 'pending',
        subtotal,
        deliveryFee,
        discount,
        total: grandTotal,
        couponCode: usedCoupon,
        status: 'placed',
        estimatedDelivery: getEstimatedDelivery(deliveryZone),
        createdAt: new Date().toISOString(),
      };

      saveOrder(completedOrder);

      if (usedCoupon) markCouponUsed(usedCoupon);
      completeCheckout();
      setIsSubmitting(false);
      router.push(`/order-confirmed?orderNumber=${generatedOrderNumber}`);
    }, 1200);
  };

  if (items.length === 0) {
    return <CheckoutEmptyState />;
  }

  if (selectedItems.length === 0) {
    return (
      <EmptyState
        className="container-lux py-20"
        icon={ShoppingBag}
        title="No products selected"
        description="Select at least one product from your scent bag to continue checkout."
        actions={<Button onClick={openCart}>Review Your Scent Bag</Button>}
      />
    );
  }

  return (
    <div className="container-lux py-12 max-w-6xl">
      <CheckoutHeader />

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-8">
          <CheckoutContactForm
            fullName={fullName}
            onFullNameChange={setFullName}
            phone={phone}
            onPhoneChange={(val) => {
              setPhone(val);
              if (phoneError) validatePhone(val);
            }}
            phoneError={phoneError}
            email={email}
            onEmailChange={setEmail}
          />

          <CheckoutShippingAddress
            division={division}
            onDivisionChange={handleDivisionChange}
            district={district}
            onDistrictChange={setDistrict}
            districtsForDivision={districtsForDivision}
            area={area}
            onAreaChange={setArea}
            customArea={customArea}
            onCustomAreaChange={setCustomArea}
            fullAddress={fullAddress}
            onFullAddressChange={setFullAddress}
            notes={notes}
            onNotesChange={setNotes}
            isDhakaCity={isDhakaCity}
          />

          <CheckoutPaymentSelection
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
          />
        </div>

        <div className="lg:col-span-5">
          <CheckoutOrderSummary
            items={selectedItems}
            subtotal={subtotal}
            discount={discount}
            couponCode={couponCode}
            deliveryFee={deliveryFee}
            grandTotal={grandTotal}
            isSubmitting={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
}
