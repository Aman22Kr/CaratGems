import React from 'react';
import { X, Sliders, Zap, RotateCcw, Github, CheckCircle2, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface QuickSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickSettingsModal: React.FC<QuickSettingsModalProps> = ({ isOpen, onClose }) => {
  const { animationSpeed, setAnimationSpeed, clearCart, clearTryAtHomeQueue, showToast } = useApp();

  if (!isOpen) return null;

  const handleResetData = () => {
    localStorage.clear();
    clearCart();
    clearTryAtHomeQueue();
    showToast('Reset local browser storage successfully! Page refreshing...');
    setTimeout(() => {
      window.location.reload();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-purple-100 max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-settings-title"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-[#FAF7FC]">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#4F3267]" />
            <h3 id="quick-settings-title" className="text-base font-semibold text-gray-900">
              CaratGems Preferences & Setup
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-xs text-gray-700">
          {/* Animation Speed Selector */}
          <div>
            <div className="flex items-center gap-1.5 font-bold text-gray-900 mb-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Animation Speed (Selected: {animationSpeed})</span>
            </div>
            <p className="text-gray-500 text-[11px] mb-3">
              Configured with NORMAL speed and STRONG intensity as requested. Adjust here anytime:
            </p>
            <div className="grid grid-cols-4 gap-2">
              {(['SLOW', 'NORMAL', 'FAST', 'OFF'] as const).map((speed) => (
                <button
                  key={speed}
                  onClick={() => setAnimationSpeed(speed)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                    animationSpeed === speed
                      ? 'border-[#4F3267] bg-[#4F3267] text-white shadow-xs'
                      : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-purple-300'
                  }`}
                >
                  {speed}
                </button>
              ))}
            </div>
          </div>

          {/* GitHub Pages & Static Deployment info */}
          <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-100 space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#3D2153]">
              <Github className="w-4 h-4" />
              <span>GitHub Pages Deployment Guide</span>
            </div>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Target Username: <strong className="text-[#3D2153]">Aman22kr</strong>. This project uses <strong>React HashRouter</strong> ensuring all direct subpage links and refreshes work flawlessly on GitHub Pages without server rewrite 404s.
            </p>
            <div className="bg-white p-2.5 rounded border border-purple-200 font-mono text-[10px] text-purple-950 overflow-x-auto">
              npm run build<br />
              npx gh-pages -d dist
            </div>
          </div>

          {/* Data Persistence */}
          <div>
            <div className="flex items-center gap-1.5 font-bold text-gray-900 mb-1.5">
              <RotateCcw className="w-4 h-4 text-purple-600" />
              <span>Browser LocalStorage State</span>
            </div>
            <p className="text-[11px] text-gray-500 mb-3">
              Your bag items, saved wishlists, Home Trial appointments, and simulated orders are safely preserved in your browser's localStorage.
            </p>
            <button
              onClick={handleResetData}
              className="py-2 px-4 rounded-lg bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All Saved Local Storage Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
