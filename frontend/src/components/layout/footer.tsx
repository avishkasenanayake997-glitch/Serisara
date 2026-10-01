import React from 'react';
import Link from 'next/link';
import { Compass, PhoneCall, ShieldCheck, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      {/* Top Banner / Tourist Helpline Support */}
      <div className="border-b border-stone-800 bg-stone-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-400">
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>Sri Lanka Tourist Police & 24/7 Emergency Assistance Hotline:</span>
            <span className="font-bold text-emerald-400">Dial 1912 (Toll-Free)</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Sri Lanka Tourism Partner</span>
            </div>
            <span>•</span>
            <span>Currency: USD / LKR</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-950/40">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white block leading-none">
                  SERISARA
                </span>
                <span className="text-[9px] tracking-[0.2em] text-emerald-400 font-bold uppercase">
                  Sri Lanka Tourism
                </span>
              </div>
            </Link>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Serisara is your comprehensive travel companion for Sri Lanka. Discover ancient UNESCO citadel ruins, private ocean villas, and ethical wildlife safaris across Ceylon.
            </p>

            <div className="pt-2 text-xs text-stone-500 flex items-center gap-1">
              <span>Crafted with</span>
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />
              <span>for global explorers and Sri Lanka lovers.</span>
            </div>
          </div>

          {/* Destinations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Destinations</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/destinations?category=cultural" className="hover:text-emerald-400 transition-colors">
                  Cultural Triangle
                </Link>
              </li>
              <li>
                <Link href="/destinations?region=southern-province" className="hover:text-emerald-400 transition-colors">
                  Southern Coast & Beaches
                </Link>
              </li>
              <li>
                <Link href="/destinations?region=central-province" className="hover:text-emerald-400 transition-colors">
                  Tea Country & Highlands
                </Link>
              </li>
              <li>
                <Link href="/destinations?category=wildlife" className="hover:text-emerald-400 transition-colors">
                  Yala & Safari Reserves
                </Link>
              </li>
              <li>
                <Link href="/destinations" className="text-emerald-400 font-medium hover:underline">
                  All 150+ Places →
                </Link>
              </li>
            </ul>
          </div>

          {/* Stays & Activities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Bookings</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/accommodations?type=villa" className="hover:text-emerald-400 transition-colors">
                  Private Beach Villas
                </Link>
              </li>
              <li>
                <Link href="/accommodations?type=hotel" className="hover:text-emerald-400 transition-colors">
                  Heritage Luxury Hotels
                </Link>
              </li>
              <li>
                <Link href="/experiences?category=safari" className="hover:text-emerald-400 transition-colors">
                  Leopard & Elephant Safaris
                </Link>
              </li>
              <li>
                <Link href="/experiences?category=whale-watching" className="hover:text-emerald-400 transition-colors">
                  Mirissa Whale Watching
                </Link>
              </li>
              <li>
                <Link href="/trips" className="hover:text-emerald-400 transition-colors">
                  Trip Planner & Itinerary
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact Concierge
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-emerald-400 transition-colors">
                  Interactive Map Explorer
                </Link>
              </li>
              <li>
                <span className="text-stone-500">Travel Advice & Seasons</span>
              </li>
              <li>
                <span className="text-stone-500">Payment & Cancellation Policy</span>
              </li>
              <li>
                <span className="text-stone-500">Privacy & Terms</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Serisara Tourism Platform. All rights reserved.</p>
          <p className="italic">Sigiriya • Galle • Ella • Mirissa • Colombo • Nuwara Eliya</p>
        </div>
      </div>
    </footer>
  );
}
