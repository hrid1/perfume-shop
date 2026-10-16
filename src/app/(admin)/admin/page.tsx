'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS, CATEGORIES, COUPONS } from '@/data/mockData';
import {
  DashboardOverviewSection,
  ProductsManagementSection,
  OrdersManagementSection,
  CustomersSection,
  CouponsSection,
  CategoriesSection,
  type MockOrder,
  type CustomerItem,
} from './_components';

const INITIAL_ORDERS: MockOrder[] = [
  {
    id: 'ord-101',
    orderNumber: 'NR-2025-0842',
    customerName: 'Arif Hossain',
    phone: '01711234567',
    location: 'Gulshan 2, Dhaka',
    itemsSummary: 'Onyx Noir (100ml) × 1, White Musk Attar × 1',
    total: 6960,
    paymentMethod: 'bKash',
    status: 'delivered',
    date: 'Oct 16, 2025',
  },
  {
    id: 'ord-102',
    orderNumber: 'NR-2025-0734',
    customerName: 'Arif Hossain',
    phone: '01711234567',
    location: 'Banani, Dhaka',
    itemsSummary: 'Discovery Set (5×2ml) × 1',
    total: 3300,
    paymentMethod: 'COD',
    status: 'delivered',
    date: 'Oct 15, 2025',
  },
  {
    id: 'ord-103',
    orderNumber: 'NR-2025-0848',
    customerName: 'Zubair Al-Mamun',
    phone: '01933456789',
    location: 'Chattogram',
    itemsSummary: 'Amber Oud Royale (100ml) × 1',
    total: 6700,
    paymentMethod: 'Card',
    status: 'shipped',
    date: 'Oct 14, 2025',
  },
  {
    id: 'ord-104',
    orderNumber: 'NR-2025-0845',
    customerName: 'Tasnim Rahman',
    phone: '01755123987',
    location: 'Sylhet',
    itemsSummary: 'Rose Velvet (50ml) × 1',
    total: 4200,
    paymentMethod: 'Nagad',
    status: 'processing',
    date: 'Oct 13, 2025',
  },
];

const SALES_DATA = [
  { month: 'Mar', amount: 84000, label: '৳84,000' },
  { month: 'Apr', amount: 98000, label: '৳98,000' },
  { month: 'May', amount: 128000, label: '৳128,000' },
  { month: 'Jun', amount: 156000, label: '৳156,000' },
  { month: 'Jul', amount: 184000, label: '৳184,000' },
  { month: 'Aug', amount: 215000, label: '৳215,000' },
];

const CUSTOMERS: CustomerItem[] = [
  { id: 'c-1', name: 'Arif Hossain', phone: '01711234567', city: 'Dhaka', orders: 4, totalSpent: 24500 },
  { id: 'c-2', name: 'Samira Akter', phone: '01822987654', city: 'Dhaka', orders: 2, totalSpent: 12000 },
  { id: 'c-3', name: 'Zubair Al-Mamun', phone: '01933456789', city: 'Chattogram', orders: 1, totalSpent: 6700 },
  { id: 'c-4', name: 'Tasnim Rahman', phone: '01755123987', city: 'Sylhet', orders: 1, totalSpent: 4200 },
  { id: 'c-5', name: 'Naveed Karim', phone: '01711889900', city: 'Dhaka', orders: 3, totalSpent: 18900 },
  { id: 'c-6', name: 'Mahira Chowdhury', phone: '01677334455', city: 'Uttara, Dhaka', orders: 2, totalSpent: 9600 },
];

function AdminContent() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'dashboard';

  const [orders, setOrders] = useState<MockOrder[]>(INITIAL_ORDERS);
  const [orderSearch, setOrderSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');

  const updateOrderStatus = (
    orderId: string,
    newStatus: 'processing' | 'shipped' | 'delivered'
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.orderNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.location.toLowerCase().includes(orderSearch.toLowerCase())
  );

  const filteredProducts = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.fragranceFamily.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      {currentTab === 'dashboard' && (
        <DashboardOverviewSection
          orders={orders}
          salesData={SALES_DATA}
        />
      )}

      {currentTab === 'products' && (
        <ProductsManagementSection
          products={filteredProducts}
          totalProductsCount={PRODUCTS.length}
          productSearch={productSearch}
          onSearchChange={setProductSearch}
        />
      )}

      {currentTab === 'orders' && (
        <OrdersManagementSection
          orders={filteredOrders}
          orderSearch={orderSearch}
          onSearchChange={setOrderSearch}
          onUpdateStatus={updateOrderStatus}
        />
      )}

      {currentTab === 'customers' && (
        <CustomersSection customers={CUSTOMERS} />
      )}

      {currentTab === 'coupons' && (
        <CouponsSection coupons={COUPONS} />
      )}

      {currentTab === 'categories' && (
        <CategoriesSection
          categories={CATEGORIES}
          products={PRODUCTS}
        />
      )}
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="p-8 text-noir-400">Loading Dashboard...</div>}>
      <AdminContent />
    </Suspense>
  );
}
