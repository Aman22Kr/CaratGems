import React from 'react';
import { ExternalLink, Sparkles, Shield, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdBanner: React.FC = () => {
  return (
    <aside aria-label="Featured Partner Advertisement" className="border-t border-purple-100 bg-[#F4EEF7] py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Ad tag & Promo */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-semibold tracking-wider uppercase bg-purple-900/10 text-purple-950 px-2 py-0.5 rounded">
            Partner Offer
          </span>
          <div className="flex items-center gap-2 text-sm text-[#3D2153]">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="font-medium">
              CaratGems Privé Club: Complimentary Ultrasonic Diamond Care Kit & Annual Spa Polish on orders above ₹25,000
            </span>
          </div>
        </div>

        {/* Right: Action & Benefits */}
        <div className="flex items-center gap-4 text-xs text-[#5D3D77] shrink-0">
          <div className="hidden lg:flex items-center gap-3">
            <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Transit Insured</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Gift className="w-3.5 h-3.5" /> Gift Ready Box</span>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1 text-xs font-semibold text-purple-900 hover:text-purple-700 bg-white border border-purple-200 px-3 py-1.5 rounded hover:shadow-xs transition-colors"
          >
            Claim Offer
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </aside>
  );
};
