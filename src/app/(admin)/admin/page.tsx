import { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { AdminContent } from './_components/AdminContent';

interface AdminPageProps {
  searchParams: Promise<{ tab?: string | string[] }>;
}

async function AdminRouteContent({ searchParams }: AdminPageProps) {
  const { tab } = await searchParams;
  const legacyRoutes: Record<string, string> = {
    products: '/admin/products',
    orders: '/admin/orders',
    customers: '/admin/customers',
    coupons: '/admin/coupons',
    categories: '/admin/categories',
  };

  const requestedTab = Array.isArray(tab) ? tab[0] : tab;
  if (requestedTab && legacyRoutes[requestedTab]) {
    redirect(legacyRoutes[requestedTab]);
  }

  return <AdminContent view="dashboard" />;
}

export default function AdminPage({ searchParams }: AdminPageProps) {
  return (
    <Suspense fallback={<div className="p-8 text-noir-400">Loading dashboard...</div>}>
      <AdminRouteContent searchParams={searchParams} />
    </Suspense>
  );
}
