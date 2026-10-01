'use client';

import React, { useState } from 'react';
import { Button, Input, Card } from '../../../components/ui';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Travel Inquiry');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="bg-stone-50 min-h-screen pb-24">
      {/* Hero Section */}
      <section className="bg-stone-900 text-white pt-20 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block mb-2">
            24/7 Island Assistance
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            We&apos;re Here to Help Your Sri Lanka Journey
          </h1>
          <p className="mt-4 text-stone-300 text-base sm:text-lg max-w-2xl mx-auto">
            Whether you need customized travel itineraries, emergency tourist support, or partnership inquiries.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        {/* Tourist Police Emergency Banner */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-5 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-200 block">
                Official Government Helpline
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Sri Lanka Tourist Police 24/7 Assistance
              </h2>
              <p className="text-xs text-amber-100 mt-1">
                Toll-free emergency dispatch, lost property recovery, and traveler safety advisory nationwide.
              </p>
            </div>
          </div>
          <div className="bg-white text-stone-950 px-8 py-4 rounded-2xl text-center shadow-lg shrink-0">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              Call Hotline
            </span>
            <span className="text-3xl font-black text-amber-700 tracking-wider">1912</span>
          </div>
        </div>

        {/* Contact Form & Office Locations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm">
            <h3 className="text-2xl font-black text-stone-900 mb-2">Send Us an Inquiry</h3>
            <p className="text-xs text-stone-500 mb-8">
              Our Colombo travel concierge team typically responds within 2 business hours.
            </p>

            {formSubmitted ? (
              <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-950">Message Successfully Sent!</h4>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  Thank you, {name || 'traveler'}. Our local concierge has received your request and will reach out to {email || 'your email'} shortly.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 rounded-full text-xs"
                >
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Kasun Fernando"
                      className="w-full p-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. kasun@example.com"
                      className="w-full p-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option>General Travel Inquiry</option>
                    <option>Custom Multi-Day Itinerary</option>
                    <option>Accommodation Reservation Assistance</option>
                    <option>Experience Booking Question</option>
                    <option>Partnership & Listing Host</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your upcoming Sri Lanka travel plans, dates, party size, or specific requirements..."
                    className="w-full p-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-900/10 text-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </Button>
              </form>
            )}
          </div>

          {/* Right Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Info */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm space-y-5">
              <h4 className="text-base font-bold text-stone-900">Direct Contact Channels</h4>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">Phone & WhatsApp</span>
                  <p className="text-sm font-bold text-stone-900">+94 11 234 5678</p>
                  <p className="text-xs text-stone-500">+94 77 987 6543 (Concierge WhatsApp)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">Email Inquiries</span>
                  <p className="text-sm font-bold text-stone-900">support@serisara.lk</p>
                  <p className="text-xs text-stone-500">concierge@serisara.lk</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">Operating Hours</span>
                  <p className="text-sm font-bold text-stone-900">Monday – Sunday: 8:00 AM – 10:00 PM</p>
                  <p className="text-xs text-stone-500">Emergency support: 24/7</p>
                </div>
              </div>
            </div>

            {/* Regional Offices */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm space-y-4">
              <h4 className="text-base font-bold text-stone-900">Regional Assistance Desks</h4>

              <div className="border-b border-stone-100 pb-3">
                <span className="text-xs font-bold text-emerald-800 block">Colombo HQ</span>
                <p className="text-xs text-stone-600">Galle Face Terrace, Colombo 03, Western Province</p>
              </div>

              <div className="border-b border-stone-100 pb-3">
                <span className="text-xs font-bold text-emerald-800 block">Kandy Heritage Desk</span>
                <p className="text-xs text-stone-600">Dalada Veediya, Kandy Central Province</p>
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-800 block">Galle Coastal Center</span>
                <p className="text-xs text-stone-600">Church Street, Galle Fort, Southern Province</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
