import React from 'react';
import Link from 'next/link';
import { Compass, Sparkles, MapPin, ShieldCheck } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-12 bg-stone-50">
      {/* Visual Showcase (Desktop) */}
      <div className="relative hidden lg:flex lg:col-span-6 xl:col-span-7 flex-col justify-between p-12 overflow-hidden bg-stone-900 text-white">
        {/* Background Image with Dark Vignette & Gradient */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1800&q=85')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-900/40" />

        {/* Top Header / Brand */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-900/40 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-6 h-6 text-white animate-spin-slow" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white block leading-none">
                SERISARA
              </span>
              <span className="text-[10px] tracking-[0.25em] text-emerald-400 font-semibold uppercase">
                Sri Lanka Tourism
              </span>
            </div>
          </Link>
        </div>

        {/* Hero Copy & Value Props */}
        <div className="relative z-10 max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium text-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Discover the Wonder of Sri Lanka</span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Curated journeys through ancient kingdoms and tropical shores.
          </h1>

          <p className="text-stone-300 text-base leading-relaxed">
            Join thousands of travelers exploring Sri Lanka’s UNESCO heritage sanctuaries, misty tea highlands, and secluded boutique ocean villas with Serisara.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">150+ Verified Spots</p>
                <p className="text-xs text-stone-400">Curated by local experts</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Seamless Bookings</p>
                <p className="text-xs text-stone-400">Encrypted Stripe payments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Quote */}
        <div className="relative z-10 text-xs text-stone-400 flex items-center justify-between border-t border-white/10 pt-6">
          <p>© {new Date().getFullYear()} Serisara Platform. All rights reserved.</p>
          <p className="italic">Ceylon • Sigiriya • Ella • Galle</p>
        </div>
      </div>

      {/* Auth Content Area (Right) */}
      <div className="col-span-12 lg:col-span-6 xl:col-span-5 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md">
          {/* Mobile Brand Header */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-md">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-stone-900">
                SERISARA
              </span>
            </Link>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
