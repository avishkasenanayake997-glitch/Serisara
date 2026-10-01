import type { Metadata } from 'next';
import { AuthProvider } from '../providers/auth-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Serisara — Sri Lanka Tourism & Travel Platform',
  description:
    'Discover breathtaking destinations, boutique stays, and unforgettable island experiences across Sri Lanka.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-stone-50 text-stone-900 selection:bg-emerald-500 selection:text-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
