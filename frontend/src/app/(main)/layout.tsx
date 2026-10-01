import React from 'react';
import { Header } from '../../components/layout/header';
import { Footer } from '../../components/layout/footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
