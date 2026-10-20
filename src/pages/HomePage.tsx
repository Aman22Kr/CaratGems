import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Truck,
  RefreshCw,
  Star,
  CheckCircle2,
  Calendar,
  Home,
  ChevronRight,
  Heart
} from 'lucide-react';
import { PRODUCTS, ASSETS, CATEGORIES_NAV, TRUST_PILLARS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { AdBanner } from '../components/AdBanner';
import { formatINR } from '../utils/pricing';

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'rings' | 'earrings' | 'solitaires'>('all');

  const filteredProducts = activeTab === 'all'
    ? PRODUCTS.slice(0, 8)
    : PRODUCTS.filter((p) => p.category === activeTab).slice(0, 8);

  const reviews = [
    {
      id: 'h1',
      name: 'Priyanka Sen',
      city: 'Mumbai',
      jewellery: 'Aura Bloom Solitaire Ring',
      rating: 5,
      date: 'Verified Buyer · October 2026',
      quote: 'The Try at Home service is a game changer! The consultant brought 5 rings to my apartment, measured my size accurately, and there was zero pressure to buy. Ordered the next morning!'
    },
    {
      id: 'h2',
      name: 'Aditya & Neha Singhal',
      city: 'Delhi NCR',
      jewellery: 'Eternity Sparkle Tennis Bracelet',
      rating: 5,
      date: 'Verified Buyer · September 2026',
      quote: 'Exceptional craftsmanship. The IGI certificate was verifiable immediately online and the BIS hallmark is clear on the clasp. Sparkles like nothing else!'
    },
    {
      id: 'h3',
      name: 'Ananya Sharma',
      city: 'Bengaluru',
      jewellery: 'Nitya Modern Mangalsutra',
      rating: 5,
      date: 'Verified Buyer · October 2026',
      quote: 'I wanted a mangalsutra that feels modern with shirts and blazers. CaratGems nailed the design. Beautiful packaging with warranty card included.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7FC]">
      {/* 1. Hero Campaign Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#3D2153] to-[#4F3267] text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-purple-200 text-xs font-semibold border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Festive & Wedding Season 2026 Preview</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
              Everyday Diamonds, <br />
              <span className="italic font-normal text-amber-200">Extraordinary Elegance.</span>
            </h1>

            <p className="text-sm md:text-base text-purple-100/90 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Crafted in 100% BIS hallmarked gold and certified conflict-free diamonds. Experience luxury that transitions effortlessly from morning boardroom to evening celebrations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                to="/products"
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#3D2153] hover:bg-amber-100 text-xs font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                Explore Collection
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/try-at-home"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#8863FB]/30 hover:bg-[#8863FB]/50 text-white border border-white/20 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 backdrop-blur-xs"
              >
                <Home className="w-4 h-4 text-amber-300" />
                Book Free Try at Home
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/15 text-center lg:text-left">
              <div>
                <span className="text-xl md:text-2xl font-serif font-bold text-white tabular-nums">270+</span>
                <p className="text-[11px] text-purple-200">Retail Stores</p>
              </div>
              <div>
                <span className="text-xl md:text-2xl font-serif font-bold text-white tabular-nums">100%</span>
                <p className="text-[11px] text-purple-200">Certified Diamonds</p>
              </div>
              <div>
                <span className="text-xl md:text-2xl font-serif font-bold text-white tabular-nums">15-Day</span>
                <p className="text-[11px] text-purple-200">Money Back Policy</p>
              </div>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 aspect-video lg:aspect-[4/3] bg-purple-950/40">
              <img
                src={ASSETS.heroBanner}
                alt="CaratGems Fine Diamond Jewellery Collection"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-xl p-3 border border-white/40 flex items-center justify-between text-gray-900">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#4F3267]">Featured Collection</span>
                  <p className="text-xs font-bold font-serif">Aura Bloom Solitaire & Pavé Collection</p>
                </div>
                <Link
                  to="/product/cg-ring-01"
                  className="px-3 py-1.5 bg-[#4F3267] text-white text-[11px] font-semibold rounded-lg hover:bg-[#3D2153] transition-colors"
                >
                  View Design
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Shop By Category Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#4F3267]">
            Curated Categories
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-1">
            Shop By Signature Categories
          </h2>
          <p className="text-xs text-gray-500 mt-1.5">
            Discover thousands of bespoke designs handcrafted in 14KT, 18KT, and 22KT certified gold.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {CATEGORIES_NAV.map((cat) => {
            const categoryImages: Record<string, string> = {
              rings: ASSETS.ringDiamond,
              earrings: ASSETS.earrings,
              solitaires: ASSETS.solitaireRing,
              mangalsutras: ASSETS.mangalsutra,
              necklaces: ASSETS.necklace,
              bracelets: ASSETS.bracelet,
            };

            return (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="group relative bg-white rounded-xl p-3 border border-purple-100 hover:border-[#8863FB] hover:shadow-md transition-all text-center flex flex-col items-center"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-purple-50/50 mb-3 border border-purple-100 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={categoryImages[cat.id] || ASSETS.ringDiamond}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xs font-bold text-gray-900 group-hover:text-[#4F3267] transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[10px] text-gray-500 mt-0.5">
                  {cat.count}+ Designs
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Try At Home Feature Banner */}
      <section className="bg-gradient-to-r from-[#FAF7FC] via-[#F4EEF7] to-[#FAF7FC] py-12 border-y border-purple-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Visual */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-purple-200 aspect-video bg-white">
              <img
                src={ASSETS.tryAtHome}
                alt="CaratGems Try Jewellery at Home"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 hidden sm:flex items-center gap-2 bg-[#3D2153] text-white px-4 py-2 rounded-xl shadow-md text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Available in 40+ Indian Cities</span>
            </div>
          </div>

          {/* Right Information */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#3D2153] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>India’s Most Loved Jewellery Trial</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-serif font-bold text-gray-900 leading-tight">
              Try Jewellery at Home for Free. <br />
              <span className="text-[#4F3267] italic font-normal">No Deposit. No Obligation.</span>
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Why guess sizes online when our certified jewellery experts can bring your dream pieces to your living room?
            </p>

            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#4F3267] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Pick up to 5 Designs</h4>
                  <p className="text-[11px] text-gray-500">Select rings, earrings, pendants, or mangalsutras you wish to try.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#4F3267] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Choose Date & Time Slot</h4>
                  <p className="text-[11px] text-gray-500">Pick a convenient morning, afternoon, or evening slot at your residence.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#4F3267] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Try with Zero Pressure</h4>
                  <p className="text-[11px] text-gray-500">Our consultant carries diamond loupes and ring sizers. Buy only if you love it!</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/try-at-home"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#4F3267] hover:bg-[#3D2153] text-white text-xs font-bold rounded-xl transition-all shadow-md"
              >
                Schedule Free Home Trial
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Best Sellers & Trending Designs */}
      <section className="max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#4F3267]">
              Customer Favourites
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-1">
              Best Sellers & Trending Now
            </h2>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-purple-100 shadow-xs self-start md:self-auto overflow-x-auto">
            {(['all', 'rings', 'earrings', 'solitaires'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${
                  activeTab === tab
                    ? 'bg-[#4F3267] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab === 'all' ? 'All Pieces' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-purple-200 text-[#4F3267] hover:bg-purple-50 text-xs font-bold rounded-xl transition-colors shadow-xs"
          >
            Explore All 500+ Fine Jewellery Designs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 5. Craftsmanship & Video Requirement Section */}
      {/* Requirement: "If there is an area for a YouTube video link or thumbnail that takes you to YouTube, just put a blank square space there." */}
      <section className="bg-white py-12 border-y border-purple-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4F3267]">
              Handcrafted Precision
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-gray-900 leading-tight">
              Watch The Master Jeweller’s Journey
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Every CaratGems ring undergoes 28 quality checks. From 3D CAD modeling to microscopic pavé stone-setting and laser hallmarking, see how our artisans bring diamond brilliance to life.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-3 rounded-lg bg-[#FAF7FC] border border-purple-100">
                <span className="font-bold text-[#4F3267] block">Microscopic Prong Setting</span>
                <span className="text-gray-500 text-[11px]">Ensures stones remain locked forever without snags.</span>
              </div>
              <div className="p-3 rounded-lg bg-[#FAF7FC] border border-purple-100">
                <span className="font-bold text-[#4F3267] block">Mirror Polish Finish</span>
                <span className="text-gray-500 text-[11px]">High-grade rhodium and gold lustrous sheen.</span>
              </div>
            </div>
          </div>

          {/* Blank square space for YouTube video as required */}
          <div className="lg:col-span-6 flex justify-center">
            {/* Blank square space per instruction: "If there is an area for a YouTube video link or thumbnail that takes you to YouTube, just put a blank square space there." */}
            <div
              className="w-full max-w-md aspect-square bg-[#FAF7FC] border border-purple-200 rounded-xl flex flex-col items-center justify-center p-6 text-center shadow-inner"
              aria-label="Video presentation area"
            >
              <div className="w-12 h-12 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-400 mb-2">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-gray-500">Video Presentation Space</span>
              <span className="text-[10px] text-gray-400 mt-0.5">Craftsmanship documentary and customer showcase</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Customer Reviews & Testimonials */}
      <section className="max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#4F3267]">
            Real Customer Voices
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-1">
            Loved By Over 500,000+ Patrons Across India
          </h2>
          <div className="flex items-center justify-center gap-1.5 mt-2 text-amber-500 text-xs font-bold">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
              ))}
            </div>
            <span className="text-gray-800">4.9 / 5 Overall Satisfaction Rating</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-purple-100 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Verified Buyer
                  </span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed italic mb-4">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-gray-900 block">{rev.name}</span>
                  <span className="text-[11px] text-gray-500">{rev.city} · {rev.jewellery}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Assurance Strip */}
      <section className="bg-white border-t border-purple-100 py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          {TRUST_PILLARS.map((tp) => (
            <div key={tp.title} className="p-3">
              <h4 className="text-xs font-bold text-gray-900">{tp.title}</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">{tp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Bottom Ad Section (As requested) */}
      <AdBanner />
    </div>
  );
};
