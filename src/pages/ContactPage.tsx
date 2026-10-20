import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, MapPin, Clock, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AdBanner } from '../components/AdBanner';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Product Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your request has been received! Our stylist will call you shortly.');
    setTimeout(() => {
      setName('');
      setPhone('');
      setMessage('');
      setSubmitted(false);
    }, 3500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7FC]">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#3D2153] to-[#4F3267] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold">
            <Phone className="w-3.5 h-3.5 text-amber-300" />
            <span>Dedicated Customer Care</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
            We’re Here to Help You Sparkle
          </h1>
          <p className="text-xs text-purple-100 font-light">
            Whether you need diamond advice, sizing help, or custom solitaire guidance, connect with our master stylists.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-purple-100 shadow-xs space-y-4">
            <h2 className="text-lg font-serif font-bold text-gray-900">
              Direct Contact Channels
            </h2>

            <div className="space-y-4 text-xs text-gray-700">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-[#4F3267] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Toll-Free Helpline</span>
                  <strong className="text-sm text-gray-900 font-bold block mt-0.5">1800-102-0103</strong>
                  <span className="text-[11px] text-gray-500">10:00 AM - 9:00 PM (All 7 Days)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">WhatsApp Assistance</span>
                  <strong className="text-sm text-gray-900 font-bold block mt-0.5">+91 91520 22000</strong>
                  <span className="text-[11px] text-gray-500">Instant chat & diamond video consultations</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-[#4F3267] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Email Inquiries</span>
                  <span className="text-sm font-semibold text-gray-900 block mt-0.5">contact@caratgems.com</span>
                  <span className="text-[11px] text-gray-500">Response within 2 hours</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-[#4F3267] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Corporate Headquarters</span>
                  <p className="text-gray-800 font-medium mt-0.5">
                    CaratGems House, Titan & Tanishq Complex, Electronic City Phase 1, Bengaluru, Karnataka 560100
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Request a Callback Form */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-2xl border border-purple-100 shadow-xs">
          <div className="pb-4 border-b border-gray-100 mb-6">
            <h2 className="text-lg font-serif font-bold text-gray-900">
              Request a Priority Stylist Callback
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Leave your details below and our jewellery consultant will call you at your preferred time.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Message Received!</h3>
              <p className="text-xs text-gray-500">
                A CaratGems certified jewellery consultant will connect with you via phone shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Shruti Rao"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3267]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Contact Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3267]"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Inquiry Topic</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3267]"
                >
                  <option>Engagement Ring Consultation</option>
                  <option>Free Try at Home Booking Help</option>
                  <option>Custom Solitaire Diamond Grading</option>
                  <option>Ring Sizing Guidance</option>
                  <option>Corporate & Bulk Gifting</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Your Question or Message</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you're looking for, budget, or preferred diamond carat..."
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3267]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#4F3267] text-white font-bold rounded-xl hover:bg-[#3D2153] transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Send className="w-4 h-4" />
                Submit Callback Request
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Ad Section (As requested) */}
      <AdBanner />
    </div>
  );
};
