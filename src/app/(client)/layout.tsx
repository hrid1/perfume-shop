import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <React.Suspense fallback={<header className="sticky top-0 z-50 h-16 bg-noir-950 border-b border-noir-800" />}>
        <Navbar />
      </React.Suspense>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
