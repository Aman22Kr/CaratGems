import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Sparkles,
  Search,
  CheckCircle2,
  Calendar,
  X,
  Navigation,
  ArrowRight
} from 'lucide-react';
import { STORE_LOCATIONS } from '../data/mockData';
import { StoreLocation } from '../types';
import { AdBanner } from '../components/AdBanner';
import { useApp } from '../context/AppContext';

export const StoresPage: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [searchPincode, setSearchPincode] = useState<string>('');
  const [activeStoreForBooking, setActiveStoreForBooking] = useState<StoreLocation | null>(null);
  const [appointmentBooked, setAppointmentBooked] = useState<boolean>(false);
  const { showToast } = useApp();

  const cities = ['All', 'New Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Chennai', 'Pune'];

  const filteredStores = STORE_LOCATIONS.filter((store) => {
    if (selectedCity !== 'All' && store.city !== selectedCity) return false;
    if (searchPincode.trim() && !store.pincode.includes(searchPincode.trim())) return false;
    return true;
  });

  const handleBookVisit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppointmentBooked(true);
    showToast(`Store appointment confirmed at ${activeStoreForBooking?.name}!`);
    setTimeout(() => {
      setActiveStoreForBooking(null);
      setAppointmentBooked(false);
    }, 2400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7FC]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#3D2153] to-[#4F3267] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>270+ Experiential Retail Boutiques Across India</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">
            Find a CaratGems Store Near You
          </h1>

          <p className="text-xs md:text-sm text-purple-100 font-light leading-relaxed">
            Touch and feel our diamond jewelry in person. Enjoy complimentary gold purity ultrasonic cleaning, custom ring sizing, and private solitaire consultations.
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <div className="bg-white border-b border-purple-100 py-4 px-4 sticky top-14 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* City tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCity === city
                    ? 'bg-[#4F3267] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-purple-50 hover:text-[#4F3267]'
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          {/* Search by Pincode */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchPincode}
              onChange={(e) => setSearchPincode(e.target.value)}
              placeholder="Search by PIN code..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3267]"
            />
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>
      </div>

      {/* Store Listings */}
      <div className="max-w-7xl mx-auto px-4 py-8 w-full flex-1">
        <div className="mb-4 text-xs text-gray-500">
          Showing {filteredStores.length} stores in {selectedCity}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-2xl border border-purple-100 shadow-xs overflow-hidden flex flex-col justify-between hover:border-purple-300 transition-all"
            >
              <div className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#4F3267] bg-purple-50 px-2 py-0.5 rounded">
                      {store.city}
                    </span>
                    <h3 className="text-base font-serif font-bold text-gray-900 mt-1">
                      {store.name}
                    </h3>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#4F3267] shrink-0 mt-0.5" />
                    <span>{store.address}, {store.city} - {store.pincode}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#4F3267] shrink-0" />
                    <span className="font-semibold text-gray-800">{store.phone}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-500 shrink-0" />
                    <span>{store.timings}</span>
                  </div>
                </div>

                {/* Services */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
                    Available In-Store
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {store.featuredServices.map((srv) => (
                      <span
                        key={srv}
                        className="text-[10px] bg-gray-50 text-gray-700 px-2 py-0.5 rounded border border-gray-100"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50/50 border-t border-purple-100 flex items-center gap-2">
                <button
                  onClick={() => setActiveStoreForBooking(store)}
                  className="flex-1 py-2 bg-[#4F3267] text-white text-xs font-semibold rounded-lg hover:bg-[#3D2153] transition-colors text-center"
                >
                  Book In-Store Visit
                </button>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(store.address + ' ' + store.city)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 bg-white border border-gray-200 text-gray-700 hover:text-[#4F3267] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Map
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appointment Modal */}
      {activeStoreForBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-purple-100 relative">
            <button
              onClick={() => setActiveStoreForBooking(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            {appointmentBooked ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif font-bold text-gray-900">
                  Appointment Confirmed!
                </h3>
                <p className="text-xs text-gray-500">
                  We look forward to welcoming you to {activeStoreForBooking.name}. A confirmation SMS has been dispatched.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookVisit} className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#4F3267]">
                    Store Appointment
                  </span>
                  <h3 className="text-base font-serif font-bold text-gray-900 mt-0.5">
                    {activeStoreForBooking.name}
                  </h3>
                  <p className="text-xs text-gray-500">{activeStoreForBooking.address}</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Verma"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3267]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3267]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Preferred Date *</label>
                    <input
                      type="date"
                      required
                      defaultValue={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3267]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Purpose of Visit</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3267]">
                      <option>Engagement Ring Consultation</option>
                      <option>Solitaire Diamond Customization</option>
                      <option>Old Gold Exchange Assessment</option>
                      <option>Bridal Trousseau Viewing</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#4F3267] text-white text-xs font-bold rounded-lg hover:bg-[#3D2153] transition-colors mt-2"
                >
                  Schedule Store Consultation
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Bottom Ad Section (As requested) */}
      <AdBanner />
    </div>
  );
};
