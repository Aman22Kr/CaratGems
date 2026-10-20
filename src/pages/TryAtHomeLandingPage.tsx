import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Trash2,
  Plus,
  ArrowRight,
  Shield,
  Sparkles,
  Phone,
  User,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { PRODUCTS, ASSETS } from '../data/mockData';
import { AdBanner } from '../components/AdBanner';
import { formatINR } from '../utils/pricing';

export const TryAtHomeLandingPage: React.FC = () => {
  const {
    tryAtHomeQueue,
    toggleTryAtHomeQueue,
    addTryAtHomeBooking,
    tryAtHomeBookings,
    userPincode,
    showToast,
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow, 11:00 AM');
  const [selectedSlot, setSelectedSlot] = useState<string>('Morning (10:00 AM - 1:00 PM)');
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  // Form fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('New Delhi');
  const [pincode, setPincode] = useState(userPincode);
  const [formError, setFormError] = useState('');

  // Get selected products
  const selectedProducts = PRODUCTS.filter((p) => tryAtHomeQueue.includes(p.id));

  // Date options
  const dateOptions = [
    'Tomorrow, 21 Oct 2026',
    'Thursday, 22 Oct 2026',
    'Friday, 23 Oct 2026',
    'Saturday, 24 Oct 2026',
    'Sunday, 25 Oct 2026',
  ];

  const slotOptions = [
    'Morning (10:00 AM - 1:00 PM)',
    'Afternoon (2:00 PM - 5:00 PM)',
    'Evening (6:00 PM - 8:30 PM)',
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim() || !pincode.trim()) {
      setFormError('Please complete all required fields.');
      return;
    }
    if (selectedProducts.length === 0) {
      setFormError('Please select at least 1 jewellery piece to try at home.');
      setStep(1);
      return;
    }

    const bookingId = addTryAtHomeBooking({
      productIds: selectedProducts.map((p) => p.id),
      customerName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || 'guest@caratgems.com',
      address: address.trim(),
      city: city.trim(),
      pincode: pincode.trim(),
      date: selectedDate,
      slot: selectedSlot,
    });

    setConfirmedBookingId(bookingId);
    try {
      confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
    } catch {}
    showToast(`Home Trial confirmed! Booking ID: ${bookingId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7FC]">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#3D2153] to-[#4F3267] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Zero Deposit · 100% Free · Doorstep Service</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">
            Try Before You Buy at Home
          </h1>

          <p className="text-xs md:text-sm text-purple-100 font-light leading-relaxed">
            Select up to 5 favorite fine jewellery designs. Our certified jewellery consultant brings them in an insured presentation kit to your living room. Try them in natural light, inspect diamond clarity, and decide in total comfort.
          </p>
        </div>
      </section>

      {/* Main Flow */}
      <div className="max-w-5xl mx-auto px-4 py-10 w-full flex-1">
        {confirmedBookingId ? (
          /* Confirmation State */
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-purple-100 shadow-sm text-center max-w-xl mx-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                Appointment Confirmed
              </span>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mt-2">
                Your Home Trial is Scheduled!
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Booking Reference: <strong className="text-gray-900">{confirmedBookingId}</strong>
              </p>
            </div>

            <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-100 text-left text-xs space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-500">Scheduled Date:</span>
                <span className="font-semibold text-gray-900">{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Time Slot:</span>
                <span className="font-semibold text-gray-900">{selectedSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Destination:</span>
                <span className="font-semibold text-gray-900">{address}, {city} - {pincode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Designs to Try:</span>
                <span className="font-semibold text-[#4F3267]">{selectedProducts.length} items</span>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              Our consultant will call <strong className="text-gray-800">{phone}</strong> 30 minutes prior to arrival. No money or card details will be requested at trial.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to="/products"
                className="flex-1 py-3 bg-[#4F3267] text-white text-xs font-bold rounded-xl hover:bg-[#3D2153] transition-colors"
              >
                Continue Browsing
              </Link>
              <button
                onClick={() => {
                  setConfirmedBookingId(null);
                  setStep(1);
                }}
                className="flex-1 py-3 bg-white border border-gray-200 text-gray-700 text-xs font-semibold rounded-xl hover:bg-gray-50"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        ) : (
          /* Multi-step Booking Form */
          <div className="space-y-8">
            {/* Step Indicators */}
            <div className="flex items-center justify-center gap-4 text-xs font-semibold">
              <button
                onClick={() => setStep(1)}
                className={`flex items-center gap-2 pb-2 border-b-2 transition-all ${
                  step === 1 ? 'border-[#4F3267] text-[#4F3267]' : 'border-transparent text-gray-400'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-[11px]">1</span>
                <span>Select Designs ({tryAtHomeQueue.length}/5)</span>
              </button>

              <span className="text-gray-300">·</span>

              <button
                onClick={() => setStep(2)}
                className={`flex items-center gap-2 pb-2 border-b-2 transition-all ${
                  step === 2 ? 'border-[#4F3267] text-[#4F3267]' : 'border-transparent text-gray-400'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-[11px]">2</span>
                <span>Date & Time</span>
              </button>

              <span className="text-gray-300">·</span>

              <button
                onClick={() => setStep(3)}
                className={`flex items-center gap-2 pb-2 border-b-2 transition-all ${
                  step === 3 ? 'border-[#4F3267] text-[#4F3267]' : 'border-transparent text-gray-400'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-[11px]">3</span>
                <span>Address & Confirm</span>
              </button>
            </div>

            {/* Step 1: Design selection */}
            {step === 1 && (
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-purple-100 shadow-xs space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <h2 className="text-lg font-serif font-bold text-gray-900">
                      Your Selected Designs ({selectedProducts.length} of 5 max)
                    </h2>
                    <p className="text-xs text-gray-500">Pick any piece you wish our consultant to bring along.</p>
                  </div>
                  <Link
                    to="/products"
                    className="text-xs font-semibold text-[#4F3267] hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Browse More Designs
                  </Link>
                </div>

                {selectedProducts.length === 0 ? (
                  <div className="text-center py-10 space-y-4">
                    <p className="text-xs text-gray-600">
                      You haven't selected any designs yet. Here are recommended popular pieces:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                      {PRODUCTS.slice(0, 3).map((p) => (
                        <div key={p.id} className="p-3 border border-purple-100 rounded-xl flex items-center gap-3 bg-[#FAF7FC]">
                          <img src={p.images[0]} alt={p.title} className="w-14 h-14 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-gray-900 truncate">{p.title}</h4>
                            <span className="text-[11px] text-gray-500">{formatINR(p.basePrice)}</span>
                            <button
                              onClick={() => toggleTryAtHomeQueue(p.id)}
                              className="mt-1 text-[11px] font-bold text-[#4F3267] block hover:underline"
                            >
                              + Add to Trial
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedProducts.map((p) => (
                      <div
                        key={p.id}
                        className="p-3 rounded-xl border border-purple-100 bg-[#FAF7FC] flex items-center gap-3 relative"
                      >
                        <img src={p.images[0]} alt={p.title} className="w-16 h-16 rounded-lg object-cover bg-white" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-gray-900 truncate">{p.title}</h4>
                          <span className="text-xs font-semibold text-[#4F3267]">{formatINR(p.basePrice)}</span>
                          <span className="text-[10px] text-gray-500 block">{p.defaultKarat} Gold</span>
                        </div>
                        <button
                          onClick={() => toggleTryAtHomeQueue(p.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 rounded-full"
                          title="Remove from trial"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={() => {
                      if (selectedProducts.length === 0) {
                        // Automatically select top 2 so user can test seamlessly
                        toggleTryAtHomeQueue(PRODUCTS[0].id);
                        toggleTryAtHomeQueue(PRODUCTS[1].id);
                      }
                      setStep(2);
                    }}
                    className="px-6 py-3 bg-[#4F3267] text-white text-xs font-bold rounded-xl hover:bg-[#3D2153] flex items-center gap-2"
                  >
                    Proceed to Choose Slot
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Date & Slot */}
            {step === 2 && (
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-purple-100 shadow-xs space-y-6">
                <div>
                  <h2 className="text-lg font-serif font-bold text-gray-900">
                    Select Appointment Date & Time
                  </h2>
                  <p className="text-xs text-gray-500">Our consultant will visit you at the selected time slot.</p>
                </div>

                {/* Dates */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
                    Available Dates
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {dateOptions.map((date) => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                          selectedDate === date
                            ? 'border-[#4F3267] bg-purple-50 text-[#4F3267] ring-1 ring-[#4F3267]'
                            : 'border-gray-200 hover:border-purple-200 text-gray-700'
                        }`}
                      >
                        <Calendar className="w-4 h-4 mb-1 text-purple-600" />
                        <span>{date}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slots */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
                    Preferred Time Slot
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {slotOptions.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                          selectedSlot === slot
                            ? 'border-[#4F3267] bg-purple-50 text-[#4F3267] ring-1 ring-[#4F3267]'
                            : 'border-gray-200 hover:border-purple-200 text-gray-700'
                        }`}
                      >
                        <Clock className="w-4 h-4 mb-1 text-purple-600" />
                        <span>{slot}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-3 bg-[#4F3267] text-white text-xs font-bold rounded-xl hover:bg-[#3D2153] flex items-center gap-2"
                  >
                    Proceed to Delivery Address
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Address & Submission */}
            {step === 3 && (
              <form onSubmit={handleBookingSubmit} className="bg-white rounded-2xl p-6 md:p-8 border border-purple-100 shadow-xs space-y-6">
                <div>
                  <h2 className="text-lg font-serif font-bold text-gray-900">
                    Contact & Residence Information
                  </h2>
                  <p className="text-xs text-gray-500">Provide the address where our jewellery specialist should visit.</p>
                </div>

                {formError && (
                  <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs border border-red-200">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Radhika Sharma"
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3267]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Mobile Number (for SMS & OTP) *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3267]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. radhika@example.com"
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3267]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Delivery PIN Code *</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3267] tabular-nums"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-semibold text-gray-700 block mb-1">Full House / Flat / Street Address *</label>
                    <textarea
                      required
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Flat No, Building Name, Street Landmark"
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3267]"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-100 flex items-start gap-3 text-xs text-purple-950">
                  <Shield className="w-5 h-5 text-[#4F3267] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Zero-Cost Policy:</span> No deposit, booking fee, or purchase obligation. You will only pay if you decide to place an order after trying the jewellery.
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-[#4F3267] text-white text-xs font-bold rounded-xl hover:bg-[#3D2153] flex items-center gap-2 shadow-md"
                  >
                    Confirm Free Home Trial
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Bottom Ad Section (As requested) */}
      <AdBanner />
    </div>
  );
};
