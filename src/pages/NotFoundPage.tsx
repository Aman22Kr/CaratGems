import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Home } from 'lucide-react';
import { AdBanner } from '../components/AdBanner';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7FC]">
      <div className="max-w-xl mx-auto px-4 py-20 text-center flex-1 flex flex-col items-center justify-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-[#4F3267] mx-auto">
          <Sparkles className="w-8 h-8" />
        </div>

        <span className="text-[11px] font-bold uppercase tracking-widest text-[#4F3267]">
          404 · Page Not Found
        </span>

        <h1 className="text-3xl font-serif font-bold text-gray-900">
          This Design Seems to Have Sparkled Away
        </h1>

        <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
          The fine jewellery page you are looking for has been moved or does not exist. Browse our signature collections below.
        </p>

        <div className="flex flex-wrap justify-center gap-2 pt-2 text-xs">
          <Link
            to="/category/rings"
            className="px-3.5 py-1.5 bg-white border border-purple-200 text-[#4F3267] rounded-lg hover:bg-purple-50 font-semibold"
          >
            Diamond Rings
          </Link>
          <Link
            to="/category/solitaires"
            className="px-3.5 py-1.5 bg-white border border-purple-200 text-[#4F3267] rounded-lg hover:bg-purple-50 font-semibold"
          >
            Solitaires
          </Link>
          <Link
            to="/category/earrings"
            className="px-3.5 py-1.5 bg-white border border-purple-200 text-[#4F3267] rounded-lg hover:bg-purple-50 font-semibold"
          >
            Earrings
          </Link>
          <Link
            to="/category/mangalsutras"
            className="px-3.5 py-1.5 bg-white border border-purple-200 text-[#4F3267] rounded-lg hover:bg-purple-50 font-semibold"
          >
            Mangalsutras
          </Link>
        </div>

        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#4F3267] text-white text-xs font-bold rounded-xl hover:bg-[#3D2153] transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            Return to Homepage
          </Link>
        </div>
      </div>

      {/* Bottom Ad Section (As requested) */}
      <AdBanner />
    </div>
  );
};
