import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface RingSizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize: (size: number) => void;
  currentSize?: number;
}

export const RingSizeModal: React.FC<RingSizeModalProps> = ({
  isOpen,
  onClose,
  onSelectSize,
  currentSize = 12
}) => {
  const [activeTab, setActiveTab] = useState<'chart' | 'diameter'>('chart');
  const [sliderMm, setSliderMm] = useState<number>(16.5);

  if (!isOpen) return null;

  const sizeChart = [
    { inSize: 6, usSize: 3.5, diameterMm: 14.5, circumferenceMm: 45.5 },
    { inSize: 8, usSize: 4.5, diameterMm: 15.1, circumferenceMm: 47.4 },
    { inSize: 10, usSize: 5.5, diameterMm: 15.7, circumferenceMm: 49.3 },
    { inSize: 12, usSize: 6.0, diameterMm: 16.5, circumferenceMm: 51.8 },
    { inSize: 14, usSize: 7.0, diameterMm: 17.2, circumferenceMm: 54.0 },
    { inSize: 16, usSize: 8.0, diameterMm: 17.8, circumferenceMm: 55.9 },
    { inSize: 18, usSize: 8.5, diameterMm: 18.5, circumferenceMm: 58.1 },
    { inSize: 20, usSize: 9.5, diameterMm: 19.1, circumferenceMm: 60.0 },
    { inSize: 22, usSize: 10.5, diameterMm: 19.8, circumferenceMm: 62.2 },
  ];

  // Map slider mm to closest ring size
  const closestSize = sizeChart.reduce((prev, curr) =>
    Math.abs(curr.diameterMm - sliderMm) < Math.abs(prev.diameterMm - sliderMm) ? curr : prev
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-xl w-full overflow-hidden border border-purple-100 max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ring-size-modal-title"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-purple-50/50 shrink-0">
          <div>
            <h3 id="ring-size-modal-title" className="text-base font-semibold text-gray-900">
              Interactive Ring Size Guide
            </h3>
            <p className="text-xs text-gray-500">Standard Indian (BIS) & International Measurement</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-6 pt-4 flex gap-2 border-b border-gray-100 shrink-0">
          <button
            onClick={() => setActiveTab('chart')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'chart'
                ? 'border-[#4F3267] text-[#4F3267]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Standard Size Chart
          </button>
          <button
            onClick={() => setActiveTab('diameter')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'diameter'
                ? 'border-[#4F3267] text-[#4F3267]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Measure Existing Ring (Interactive)
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {activeTab === 'chart' ? (
            <div className="space-y-4">
              <p className="text-xs text-gray-600">
                Indian ring sizing directly corresponds to the inner circumference in millimeters. Tap your size to apply:
              </p>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                    <tr>
                      <th className="py-2 px-3 font-semibold">Indian Size</th>
                      <th className="py-2 px-3 font-semibold">Diameter (mm)</th>
                      <th className="py-2 px-3 font-semibold">Circumference (mm)</th>
                      <th className="py-2 px-3 font-semibold">US Size</th>
                      <th className="py-2 px-3 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 tabular-nums">
                    {sizeChart.map((row) => (
                      <tr
                        key={row.inSize}
                        className={`hover:bg-purple-50/50 transition-colors ${
                          currentSize === row.inSize ? 'bg-purple-50 font-semibold text-[#4F3267]' : 'text-gray-700'
                        }`}
                      >
                        <td className="py-2 px-3">Size {row.inSize}</td>
                        <td className="py-2 px-3">{row.diameterMm} mm</td>
                        <td className="py-2 px-3">{row.circumferenceMm} mm</td>
                        <td className="py-2 px-3">{row.usSize}</td>
                        <td className="py-2 px-3 text-right">
                          <button
                            onClick={() => {
                              onSelectSize(row.inSize);
                              onClose();
                            }}
                            className="px-2.5 py-1 text-[11px] bg-[#4F3267] text-white rounded hover:bg-[#3D2153]"
                          >
                            Select
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-center">
              <p className="text-xs text-gray-600">
                Place an existing fitting ring flat against your screen. Adjust the slider until the circle below matches the <strong>inner edge</strong> of your ring.
              </p>

              {/* Interactive Sizing Circle */}
              <div className="flex flex-col items-center justify-center p-6 bg-purple-50/30 rounded-xl border border-purple-100">
                <div
                  className="rounded-full border-2 border-[#4F3267] bg-white/80 shadow-inner flex items-center justify-center transition-all duration-150"
                  style={{
                    width: `${sliderMm * 6.5}px`,
                    height: `${sliderMm * 6.5}px`,
                    maxWidth: '220px',
                    maxHeight: '220px',
                  }}
                >
                  <span className="text-xs font-semibold text-[#4F3267] tabular-nums">
                    {sliderMm.toFixed(1)} mm
                  </span>
                </div>

                <div className="mt-4 text-xs font-medium text-gray-700">
                  Matches: <span className="font-bold text-[#4F3267]">Size {closestSize.inSize}</span> (US {closestSize.usSize})
                </div>
              </div>

              {/* Slider */}
              <div className="max-w-xs mx-auto">
                <input
                  type="range"
                  min={14.0}
                  max={21.0}
                  step={0.1}
                  value={sliderMm}
                  onChange={(e) => setSliderMm(parseFloat(e.target.value))}
                  className="w-full accent-[#4F3267]"
                />
                <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                  <span>14.0 mm (Size 5)</span>
                  <span>21.0 mm (Size 24)</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectSize(closestSize.inSize);
                  onClose();
                }}
                className="w-full py-2.5 bg-[#4F3267] text-white text-xs font-semibold rounded-lg hover:bg-[#3D2153] flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                Apply Size {closestSize.inSize} ({closestSize.diameterMm} mm)
              </button>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-gray-100 text-[11px] text-gray-500 space-y-1">
            <p>• <strong>Free Resizing Guarantee:</strong> We offer 1 complimentary ring resizing within 30 days of purchase.</p>
            <p>• Average woman ring size in India is 11-13; average man ring size is 17-19.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
