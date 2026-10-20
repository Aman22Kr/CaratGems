import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Award, RefreshCw, Heart, Truck, CheckCircle2, ArrowRight } from 'lucide-react';
import { ASSETS } from '../data/mockData';
import { AdBanner } from '../components/AdBanner';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7FC]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#3D2153] to-[#4F3267] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>The Titan & Tanishq Partnership Heritage</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight">
            Democratising Fine Jewellery for Modern India
          </h1>

          <p className="text-xs md:text-sm text-purple-100 font-light leading-relaxed">
            We believe precious diamond jewellery belongs in your daily life, your milestones, and your quiet everyday joys — not locked away in bank vaults.
          </p>
        </div>
      </section>

      {/* Story Sections */}
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12 flex-1">
        {/* Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-8 rounded-3xl border border-purple-100 shadow-xs">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4F3267]">Our Origin</span>
            <h2 className="text-2xl font-serif font-bold text-gray-900">
              Jewellery Crafted to be Lived In
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              Founded on the premise that diamond jewellery should be approachable, accessible, and completely honest, CaratGems blends heritage goldsmithing with contemporary design.
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              From delicate solitaires you can wear to work to modern mangalsutras that suit western silhouettes, our collections are created for effortless elegance.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden aspect-square border border-purple-100">
            <img src={ASSETS.heroBanner} alt="Fine Jewellery Crafting" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Section 2: Four Pillars */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-gray-900">
              The Four Pillars of CaratGems Integrity
            </h2>
            <p className="text-xs text-gray-500 mt-1">Every gram of gold and point of diamond verified.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-purple-100 space-y-2">
              <Award className="w-6 h-6 text-[#4F3267]" />
              <h3 className="text-sm font-bold text-gray-900">100% BIS Hallmarked Gold</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Every jewellery piece bears the official 6-digit HUID and BIS triangular hallmark verifying exact karat purity (14KT, 18KT, 22KT).
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-purple-100 space-y-2">
              <Shield className="w-6 h-6 text-[#4F3267]" />
              <h3 className="text-sm font-bold text-gray-900">Independent Lab Certification</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                All diamonds are graded by renowned independent laboratories like SGL, IGI, or GIA. Each shipment arrives with its physical authenticity certificate card.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-purple-100 space-y-2">
              <RefreshCw className="w-6 h-6 text-[#4F3267]" />
              <h3 className="text-sm font-bold text-gray-900">Lifetime Exchange & Buyback</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Upgrade or exchange your jewellery anytime. We offer 100% value on gold and 90% on diamonds at current market prices across all stores nationwide.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-purple-100 space-y-2">
              <Heart className="w-6 h-6 text-[#4F3267]" />
              <h3 className="text-sm font-bold text-gray-900">Transparent Bullion Pricing</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                No hidden margins or arbitrary markups. We disclose the exact gold weight, diamond carat, making charge, and 3% GST on every single product page.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: CTA */}
        <div className="bg-[#3D2153] text-white p-8 rounded-3xl text-center space-y-4">
          <h2 className="text-2xl font-serif font-bold">Experience CaratGems First Hand</h2>
          <p className="text-xs text-purple-200 max-w-md mx-auto">
            Book our free Try at Home service or visit one of our 270+ experiential boutiques across India.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <Link
              to="/try-at-home"
              className="px-6 py-3 bg-white text-[#3D2153] hover:bg-amber-100 text-xs font-bold rounded-xl transition-all"
            >
              Book Free Try at Home
            </Link>
            <Link
              to="/stores"
              className="px-6 py-3 bg-purple-900/50 border border-purple-400/40 text-white hover:bg-purple-900 text-xs font-semibold rounded-xl transition-all"
            >
              Locate Nearest Store
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Ad Section (As requested) */}
      <AdBanner />
    </div>
  );
};
