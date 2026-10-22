'use client';

import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  MessageSquare,
} from 'lucide-react';

export default function ContactPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [topic, setTopic] = useState('consignment_inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName && email && message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-velora-gold-50 border border-velora-gold-200 text-xs font-semibold tracking-widest text-velora-gold-700 uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Client Concierge</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-velora-black">
          We Are At Your Disposal
        </h1>
        <p className="text-sm sm:text-base text-neutral-500 leading-relaxed">
          Whether you require sizing guidance from a personal stylist, custom engraving, or real-time international courier assistance, our advisors are here 24 hours a day.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Direct Contact Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-velora-noir text-white p-8 rounded-2xl border border-velora-darkborder space-y-6">
            <h2 className="font-serif text-xl font-bold">VIP Private Channels</h2>

            <div className="space-y-4 text-xs text-neutral-300">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-velora-gold-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white font-semibold">Priority Concierge Email</strong>
                  <span>concierge@velora-international.com</span>
                  <div className="text-[11px] text-neutral-400 mt-0.5">Average response: 15 minutes</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-velora-gold-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white font-semibold">Global Toll-Free Hotlines</strong>
                  <span>Americas: +1 (800) 835-6721</span><br />
                  <span>Europe / UK: +44 20 7946 0912</span><br />
                  <span>Asia Pacific: +81 3 5555 0198</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-velora-gold-400">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white font-semibold">WhatsApp Encrypted VIP Line</strong>
                  <span>+41 22 555 0144 (Geneva Desk)</span>
                  <div className="text-[11px] text-neutral-400 mt-0.5">Available 24 hours daily</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-velora-gold-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-white font-semibold">Concierge Operating Hours</strong>
                  <span>Continuous 24/7 International Desk</span>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Hubs */}
          <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-200 space-y-4">
            <h3 className="font-serif text-base font-bold text-velora-black">Global Salons & Hubs</h3>
            <div className="grid grid-cols-2 gap-4 text-xs text-neutral-600">
              <div>
                <strong className="block text-velora-black">New York</strong>
                <span>740 Park Avenue</span><br />
                <span>New York, NY 10021</span>
              </div>
              <div>
                <strong className="block text-velora-black">London</strong>
                <span>14 Berkeley Square</span><br />
                <span>Mayfair, W1J 5AW</span>
              </div>
              <div>
                <strong className="block text-velora-black">Geneva</strong>
                <span>Rue du Rhône 42</span><br />
                <span>1204 Genève</span>
              </div>
              <div>
                <strong className="block text-velora-black">Tokyo</strong>
                <span>Ginza 6-Chome</span><br />
                <span>Chuo-ku, Tokyo 104-0061</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-neutral-200 shadow-card">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-velora-black">
                Inquiry Dispatched to Concierge
              </h3>
              <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
                Thank you, {fullName}. A dedicated luxury advisor has received your message and will reply to <strong className="text-velora-black">{email}</strong> within 15 minutes.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-velora-black text-white text-xs font-semibold uppercase tracking-wider rounded-md"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <h2 className="font-serif text-xl font-bold text-velora-black mb-2">
                Send a Confidential Message
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Lord / Lady / Alexander Wright"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-velora-black focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="patron@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-velora-black focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-700 font-medium mb-1">
                    Order / Consignment ID (If applicable)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. VEL-982140"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-velora-black focus:bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-neutral-700 font-medium mb-1">Inquiry Department</label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-velora-black font-medium"
                  >
                    <option value="consignment_inquiry">Consignment & Tracking Status</option>
                    <option value="product_advisory">Bespoke Styling & Sizing Advisory</option>
                    <option value="returns_exchange">30-Day Doorstep Return / Exchange</option>
                    <option value="customs_duty">International Duties & Import Query</option>
                    <option value="press_partnership">Private Press & Atelier Partnerships</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 font-medium mb-1">Your Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="How may our concierge assist your requirements today?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:border-velora-black focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-velora-black hover:bg-neutral-800 text-white font-semibold uppercase tracking-widest text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-3.5 h-3.5 text-velora-gold-400" />
                <span>Submit to VIP Concierge</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
