import React from 'react';
import { X, ShieldCheck, Info } from 'lucide-react';
import { Product, GoldKarat, DiamondClarity } from '../types';
import { calculateProductPrice, formatINR } from '../utils/pricing';

interface PriceBreakupModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  selectedKarat: GoldKarat;
  selectedClarity: DiamondClarity;
}

export const PriceBreakupModal: React.FC<PriceBreakupModalProps> = ({
  isOpen,
  onClose,
  product,
  selectedKarat,
  selectedClarity,
}) => {
  if (!isOpen) return null;

  const breakdown = calculateProductPrice(product, selectedKarat, selectedClarity);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-purple-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="price-breakup-title"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-purple-50/50">
          <div>
            <h3 id="price-breakup-title" className="text-base font-semibold text-gray-900">
              Transparent Price Breakup
            </h3>
            <p className="text-xs text-gray-500">Zero hidden costs · Complete bullion & gem integrity</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          {/* Product brief */}
          <div className="pb-3 border-b border-gray-100">
            <span className="font-semibold text-gray-900 text-sm">{product.title}</span>
            <div className="text-gray-500 mt-0.5">
              Configured: {selectedKarat} Gold · {selectedClarity} Diamond Quality
            </div>
          </div>

          {/* Breakdown table */}
          <div className="space-y-3">
            {/* Gold component */}
            <div className="flex items-start justify-between p-3 rounded-lg bg-gray-50/70 border border-gray-100">
              <div>
                <span className="font-semibold text-gray-800">Gold Component ({selectedKarat})</span>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Approx. Gross Weight: {product.goldWeightGrams}g
                </p>
              </div>
              <span className="font-semibold text-gray-900 tabular-nums">
                {formatINR(breakdown.goldPrice)}
              </span>
            </div>

            {/* Diamond component */}
            <div className="flex items-start justify-between p-3 rounded-lg bg-gray-50/70 border border-gray-100">
              <div>
                <span className="font-semibold text-gray-800">Diamond Component ({selectedClarity})</span>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {product.diamondCarat} ct · {product.diamondCount} stones · Micro-Pavé / Prong
                </p>
              </div>
              <span className="font-semibold text-gray-900 tabular-nums">
                {formatINR(breakdown.diamondPrice)}
              </span>
            </div>

            {/* Making charges */}
            <div className="flex items-start justify-between p-3 rounded-lg bg-gray-50/70 border border-gray-100">
              <div>
                <span className="font-semibold text-gray-800">Making Charges</span>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Precision casting, stone setting, microscopic polish & hallmark stamping
                </p>
              </div>
              <span className="font-semibold text-gray-900 tabular-nums">
                {formatINR(breakdown.makingCharges)}
              </span>
            </div>

            {/* Subtotal */}
            <div className="flex justify-between py-1 px-3 text-gray-600">
              <span>Net Value</span>
              <span className="font-medium tabular-nums">{formatINR(breakdown.subtotal)}</span>
            </div>

            {/* GST */}
            <div className="flex justify-between py-1 px-3 text-gray-600">
              <span>GST (3% Indian Standard Fine Jewellery Tax)</span>
              <span className="font-medium tabular-nums">{formatINR(breakdown.gst)}</span>
            </div>

            {/* Final Total */}
            <div className="flex justify-between p-3 rounded-lg bg-purple-50 text-purple-950 font-bold border border-purple-200 text-sm">
              <span>Total Payable Amount</span>
              <span className="tabular-nums">{formatINR(breakdown.total)}</span>
            </div>
          </div>

          {/* Guarantee stamp */}
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2 text-emerald-800 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Backed by 100% BIS Hallmarking certificate & certified diamond authenticity card.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
