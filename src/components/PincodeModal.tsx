import React, { useState } from 'react';
import { X, MapPin, Check, Truck, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PincodeModal: React.FC = () => {
  const { isPincodeModalOpen, setIsPincodeModalOpen, userPincode, setUserPincode } = useApp();
  const [inputCode, setInputCode] = useState(userPincode);
  const [error, setError] = useState('');

  if (!isPincodeModalOpen) return null;

  const popularMetros = [
    { city: 'Delhi NCR', code: '110001', est: 'Delivery by Tomorrow' },
    { city: 'Mumbai', code: '400050', est: 'Delivery in 24-48 Hours' },
    { city: 'Bengaluru', code: '560038', est: 'Delivery by Tomorrow' },
    { city: 'Hyderabad', code: '500033', est: 'Delivery in 2-3 Days' },
    { city: 'Chennai', code: '600017', est: 'Delivery in 2-3 Days' },
    { city: 'Kolkata', code: '700016', est: 'Delivery in 2-3 Days' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputCode.trim();
    if (!/^\d{6}$/.test(clean)) {
      setError('Please enter a valid 6-digit Indian PIN code');
      return;
    }
    setError('');
    setUserPincode(clean);
    setIsPincodeModalOpen(false);
  };

  const selectMetro = (code: string) => {
    setUserPincode(code);
    setIsPincodeModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-purple-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pincode-modal-title"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-purple-50/50">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#4F3267]" />
            <h3 id="pincode-modal-title" className="text-base font-semibold text-gray-900">
              Select Delivery Location
            </h3>
          </div>
          <button
            onClick={() => setIsPincodeModalOpen(false)}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-xs text-gray-600 mb-4">
            Enter your PIN code to see exact delivery dates, Try at Home availability, and nearby store pickup options.
          </p>

          <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <input
                type="text"
                maxLength={6}
                value={inputCode}
                onChange={(e) => {
                  setInputCode(e.target.value.replace(/\D/g, ''));
                  setError('');
                }}
                placeholder="Enter 6-digit PIN code"
                className="w-full px-4 py-2.5 text-sm border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8863FB] focus:border-transparent tabular-nums"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#4F3267] text-white text-sm font-semibold rounded-lg hover:bg-[#3D2153] transition-colors"
            >
              Verify
            </button>
          </form>

          {error && <p className="text-xs text-red-600 mb-3">{error}</p>}

          <div className="space-y-2 mt-4">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
              Popular Delivery Hubs
            </span>
            <div className="grid grid-cols-2 gap-2">
              {popularMetros.map((metro) => (
                <button
                  key={metro.code}
                  type="button"
                  onClick={() => selectMetro(metro.code)}
                  className={`text-left p-2.5 rounded-lg border text-xs transition-all ${
                    userPincode === metro.code
                      ? 'border-[#8863FB] bg-purple-50 text-purple-950 font-semibold'
                      : 'border-gray-200 hover:border-purple-300 bg-white text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{metro.city}</span>
                    {userPincode === metro.code && <Check className="w-3.5 h-3.5 text-[#4F3267]" />}
                  </div>
                  <div className="text-[11px] text-gray-500 mt-0.5">{metro.code} · {metro.est}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>100% Insured Transit</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-purple-600" />
              <span>Express 24-hr Dispatch</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
