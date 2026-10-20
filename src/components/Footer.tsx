import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Award, RefreshCw, Truck, Heart, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1E1128] text-white pt-12 pb-8 border-t border-purple-950">
      {/* 1. Value Pillars Strip */}
      <div className="max-w-7xl mx-auto px-4 pb-12 border-b border-purple-900/40">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-purple-900/60 flex items-center justify-center text-amber-300">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-bold text-white tracking-wide uppercase">100% Certified Diamonds</h4>
            <p className="text-[11px] text-purple-200/70 max-w-xs">Independently lab-certified by SGL, IGI, or GIA</p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-purple-900/60 flex items-center justify-center text-amber-300">
              <Shield className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-bold text-white tracking-wide uppercase">BIS Hallmarked Gold</h4>
            <p className="text-[11px] text-purple-200/70 max-w-xs">Govt. stamped purity on every single piece</p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-purple-900/60 flex items-center justify-center text-amber-300">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-bold text-white tracking-wide uppercase">15-Day Money Back</h4>
            <p className="text-[11px] text-purple-200/70 max-w-xs">Zero-question returns & Lifetime exchange</p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-purple-900/60 flex items-center justify-center text-amber-300">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="text-xs font-bold text-white tracking-wide uppercase">Free Insured Shipping</h4>
            <p className="text-[11px] text-purple-200/70 max-w-xs">Armoured express courier transit to your hands</p>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Columns */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs">
        {/* Col 1: About CaratGems */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="font-serif text-lg font-bold text-white">CaratGems</span>
          </div>
          <p className="text-purple-200/70 leading-relaxed mb-4">
            Democratising fine diamond jewellery with accessible everyday designs, certified gemological transparency, and modern Indian craftsmanship.
          </p>
          <div className="space-y-2 text-purple-200/90 text-[11px]">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>Toll Free: 1800-102-0103</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>contact@caratgems.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>270+ Stores Nationwide</span>
            </div>
          </div>
        </div>

        {/* Col 2: Categories */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-3">
            Jewellery Categories
          </h4>
          <ul className="space-y-2 text-purple-200/80">
            <li><Link to="/category/rings" className="hover:text-white transition-colors">Diamond Rings & Solitaires</Link></li>
            <li><Link to="/category/earrings" className="hover:text-white transition-colors">Daily Wear & Drop Earrings</Link></li>
            <li><Link to="/category/solitaires" className="hover:text-white transition-colors">Solitaire Engagement Rings</Link></li>
            <li><Link to="/category/mangalsutras" className="hover:text-white transition-colors">Modern Diamond Mangalsutras</Link></li>
            <li><Link to="/category/necklaces" className="hover:text-white transition-colors">Pendants & Lariat Chains</Link></li>
            <li><Link to="/category/bracelets" className="hover:text-white transition-colors">Diamond Tennis Bracelets</Link></li>
          </ul>
        </div>

        {/* Col 3: Customer Care */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-3">
            Customer Services
          </h4>
          <ul className="space-y-2 text-purple-200/80">
            <li><Link to="/try-at-home" className="hover:text-white transition-colors">Book Free Try at Home</Link></li>
            <li><Link to="/stores" className="hover:text-white transition-colors">Find a Store Near You</Link></li>
            <li><Link to="/order-tracking" className="hover:text-white transition-colors">Track Your Order Status</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">Ring Size Measuring Guide</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">15-Day Money-Back Guarantee</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Request a Callback / WhatsApp</Link></li>
          </ul>
        </div>

        {/* Col 4: Heritage & Trust */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-3">
            Trust & Transparency
          </h4>
          <ul className="space-y-2 text-purple-200/80">
            <li><Link to="/about" className="hover:text-white transition-colors">The CaratGems Heritage</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">Zero-Conflict Diamond Policy</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">BIS Hallmarking Standards</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">Lifetime Exchange & Buyback</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Corporate Gifting Inquiries</Link></li>
          </ul>
        </div>
      </div>

      {/* 3. Bottom Legal & Demo Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-purple-900/30 text-[11px] text-purple-200/60 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          © {new Date().getFullYear()} CaratGems Jewellery Limited. All rights reserved. Recreated from CaratLane.
        </div>
        <div className="flex flex-wrap items-center gap-4 text-purple-200/50">
          <span>GitHub: Aman22kr</span>
          <span>·</span>
          <span>Client-side localStorage enabled</span>
          <span>·</span>
          <span>Static GitHub Pages ready</span>
        </div>
      </div>
    </footer>
  );
};
