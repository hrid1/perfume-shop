'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { BANGLADESH_DIVISIONS } from '@/data/mockData';
import { PaymentMethod, Order } from '@/types';
import { useCoupons } from '@/context/CouponContext';
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
    completeCheckout,
    freeDeliveryThreshold,
    openCart,
  } = useCart();
  const { markCouponUsed } = useCoupons();

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
  const isDhakaCity = division === 'Dhaka' && district === 'Dhaka';

  // Calculate delivery fee
  const netSubtotal = Math.max(0, subtotal - discount);
  const isFreeDelivery = netSubtotal >= freeDeliveryThreshold && netSubtotal > 0;
  const deliveryFee =
    selectedItems.length === 0 ? 0 : isFreeDelivery ? 0 : isDhakaCity ? 60 : 120;
  const grandTotal = Math.max(0, netSubtotal + deliveryFee);

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
      const generatedOrderNumber = `AMR-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      const completedOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: generatedOrderNumber,
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
          area: area === 'Other' && customArea ? customArea : area,
          fullAddress,
          instructions: notes || undefined,
        },
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        subtotal,
        deliveryFee,
        discount,
        total: grandTotal,
        couponCode: couponCode || undefined,
        status: 'placed',
        estimatedDelivery: isDhakaCity
          ? '2–3 business days (Dhaka Express)'
          : '3–5 business days (Nationwide)',
        createdAt: new Date().toISOString(),
      };

      try {
        localStorage.setItem('amros_last_order', JSON.stringify(completedOrder));
        const existingHistory = localStorage.getItem('amros_orders_history');
        const history: Order[] = existingHistory ? JSON.parse(existingHistory) : [];
        localStorage.setItem(
          'amros_orders_history',
          JSON.stringify([completedOrder, ...history])
        );
      } catch (err) {
        console.error('Failed to save order to localStorage', err);
      }

      if (couponCode) markCouponUsed(couponCode);
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
      <div className="container-lux py-20 text-center max-w-md mx-auto">
        <h2 className="font-serif text-2xl font-medium mb-2">No products selected</h2>
        <p className="text-xs text-noir-400 mb-6">
          Select at least one product from your scent bag to continue checkout.
        </p>
        <button type="button" onClick={openCart} className="btn-gold text-xs px-6 py-3">
          Review Your Scent Bag
        </button>
      </div>
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
