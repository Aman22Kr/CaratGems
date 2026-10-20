import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  MapPin,
  Home,
  Store,
  Truck,
  Settings,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  PhoneCall,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CATEGORIES_NAV, PRODUCTS } from '../data/mockData';

interface HeaderProps {
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  const {
    cartTotals,
    wishlist,
    tryAtHomeQueue,
    userPincode,
    setIsPincodeModalOpen,
    setIsCartDrawerOpen,
    searchHistory,
    addSearchTerm,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState<string | null>(null);

  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Search filtered products
  const matchingProducts = searchQuery.trim()
    ? PRODUCTS.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      addSearchTerm(searchQuery.trim());
      setIsSearchFocused(false);
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSelectSearchItem = (slug: string, title: string) => {
    addSearchTerm(title);
    setIsSearchFocused(false);
    setSearchQuery('');
    navigate(`/product/${slug}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs">
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#3D2153] text-white text-[11px] py-1.5 px-4 border-b border-[#4F3267]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-medium tracking-wide flex items-center gap-1.5 text-purple-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              CaratGems · A Titan & Tanishq Legacy · 100% Certified Diamonds
            </span>
          </div>

          <div className="hidden md:flex items-center gap-5 text-purple-200">
            <button
              onClick={() => setIsPincodeModalOpen(true)}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <MapPin className="w-3 h-3 text-amber-300" />
              <span>Deliver to: <strong className="text-white font-semibold">{userPincode}</strong></span>
            </button>
            <span>·</span>
            <Link to="/try-at-home" className="hover:text-white transition-colors flex items-center gap-1">
              <Home className="w-3 h-3" />
              <span>Book Free Try at Home</span>
            </Link>
            <span>·</span>
            <Link to="/stores" className="hover:text-white transition-colors flex items-center gap-1">
              <Store className="w-3 h-3" />
              <span>Find Stores (270+)</span>
            </Link>
            <span>·</span>
            <Link to="/order-tracking" className="hover:text-white transition-colors flex items-center gap-1">
              <Truck className="w-3 h-3" />
              <span>Track Order</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Brand Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">
        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:text-[#4F3267] rounded-lg"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#3D2153] to-[#8863FB] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-serif font-bold tracking-tight text-[#3D2153] leading-none">
              CaratGems
            </span>
            <span className="text-[9px] tracking-widest uppercase text-gray-400 font-medium">
              Fine Diamond Jewellery
            </span>
          </div>
        </Link>

        {/* Global Search Bar */}
        <div ref={searchRef} className="relative flex-1 max-w-xl hidden md:block">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for Diamond Rings, Solitaires, Mangalsutras, Pendants..."
                className="w-full pl-10 pr-10 py-2 text-xs bg-[#FAF7FC] border border-purple-100 rounded-full focus:outline-none focus:border-[#8863FB] focus:bg-white focus:ring-2 focus:ring-[#8863FB]/20 transition-all text-gray-800 placeholder:text-gray-400"
              />
              <Search className="absolute left-3.5 w-4 h-4 text-purple-400 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </form>

          {/* Autocomplete Dropdown */}
          {isSearchFocused && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-purple-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              {searchQuery.trim() ? (
                <div>
                  <div className="px-4 py-2 bg-purple-50/50 text-[11px] font-semibold text-[#4F3267]">
                    Suggested Products ({matchingProducts.length})
                  </div>
                  {matchingProducts.length > 0 ? (
                    <div className="divide-y divide-gray-50">
                      {matchingProducts.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => handleSelectSearchItem(p.id, p.title)}
                          className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-purple-50/40 text-left transition-colors"
                        >
                          <img
                            src={p.images[0]}
                            alt={p.title}
                            className="w-9 h-9 rounded object-cover border border-gray-100 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-medium text-gray-800 line-clamp-1">
                              {p.title}
                            </span>
                            <span className="text-[11px] text-[#4F3267] font-semibold">
                              ₹{p.basePrice.toLocaleString('en-IN')} · {p.category}
                            </span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-gray-300" />
                        </button>
                      ))}
                      <Link
                        to={`/products?q=${encodeURIComponent(searchQuery)}`}
                        onClick={() => setIsSearchFocused(false)}
                        className="block py-2 text-center text-xs font-semibold text-[#4F3267] bg-purple-50/30 hover:bg-purple-50"
                      >
                        View all search results for "{searchQuery}"
                      </Link>
                    </div>
                  ) : (
                    <div className="p-6 text-center text-xs text-gray-500">
                      No matching fine jewellery found for "{searchQuery}".
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                      Recent Searches
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {searchHistory.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setSearchQuery(item);
                            navigate(`/products?q=${encodeURIComponent(item)}`);
                            setIsSearchFocused(false);
                          }}
                          className="text-xs px-2.5 py-1 bg-gray-100 hover:bg-purple-50 hover:text-[#4F3267] rounded-md text-gray-700 transition-colors"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                      Trending Collections
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <Link
                        to="/category/rings"
                        onClick={() => setIsSearchFocused(false)}
                        className="p-2 rounded bg-purple-50/50 hover:bg-purple-50 text-[#3D2153] font-medium"
                      >
                        💍 Engagement Solitaires
                      </Link>
                      <Link
                        to="/category/mangalsutras"
                        onClick={() => setIsSearchFocused(false)}
                        className="p-2 rounded bg-purple-50/50 hover:bg-purple-50 text-[#3D2153] font-medium"
                      >
                        ✨ Modern Mangalsutras
                      </Link>
                      <Link
                        to="/category/earrings"
                        onClick={() => setIsSearchFocused(false)}
                        className="p-2 rounded bg-purple-50/50 hover:bg-purple-50 text-[#3D2153] font-medium"
                      >
                        💎 Daily Diamond Studs
                      </Link>
                      <Link
                        to="/category/bracelets"
                        onClick={() => setIsSearchFocused(false)}
                        className="p-2 rounded bg-purple-50/50 hover:bg-purple-50 text-[#3D2153] font-medium"
                      >
                        🌟 Tennis Bracelets
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Try at Home bag badge button */}
          <Link
            to="/try-at-home"
            className="relative p-2 text-gray-700 hover:text-[#4F3267] hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-1.5"
            title="Try at Home Selection"
          >
            <Home className="w-5 h-5 text-[#4F3267]" />
            <span className="hidden xl:inline text-xs font-semibold text-gray-800">
              Try at Home
            </span>
            {tryAtHomeQueue.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {tryAtHomeQueue.length}
              </span>
            )}
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative p-2 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Wishlist"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Bag */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="relative p-2 text-gray-700 hover:text-[#4F3267] hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-1.5"
            aria-label="Open Cart Drawer"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="hidden sm:inline text-xs font-bold text-[#3D2153]">
              Bag
            </span>
            {cartTotals.itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8863FB] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartTotals.itemCount}
              </span>
            )}
          </button>

          {/* Settings / Config Modal Trigger */}
          <button
            onClick={onOpenSettings}
            className="p-2 text-gray-400 hover:text-[#4F3267] hover:bg-purple-50 rounded-lg transition-colors"
            title="Quick Settings & Deploy Guide"
            aria-label="Quick Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Category Navigation Bar (Desktop) */}
      <nav aria-label="Main Navigation" className="border-t border-purple-100 hidden lg:block bg-white">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Link
              to="/products"
              className="py-3 px-3.5 text-xs font-semibold text-gray-800 hover:text-[#4F3267] transition-colors border-b-2 border-transparent hover:border-[#4F3267]"
            >
              All Jewellery
            </Link>

            {CATEGORIES_NAV.map((cat) => (
              <div
                key={cat.id}
                className="relative"
                onMouseEnter={() => setActiveMegaCategory(cat.id)}
                onMouseLeave={() => setActiveMegaCategory(null)}
              >
                <Link
                  to={`/category/${cat.id}`}
                  className={`py-3 px-3 text-xs font-semibold flex items-center gap-1 transition-colors border-b-2 ${
                    activeMegaCategory === cat.id
                      ? 'border-[#4F3267] text-[#4F3267]'
                      : 'border-transparent text-gray-700 hover:text-[#4F3267]'
                  }`}
                >
                  {cat.name}
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </Link>

                {/* Mega-menu dropdown */}
                {activeMegaCategory === cat.id && (
                  <div className="absolute top-full left-0 w-72 bg-white rounded-b-xl shadow-xl border border-purple-100 p-4 z-50 animate-in fade-in duration-150">
                    <div className="text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-2">
                      Popular {cat.name} Styles
                    </div>
                    <ul className="space-y-1.5 text-xs">
                      {cat.subcategories.map((sub) => (
                        <li key={sub}>
                          <Link
                            to={`/category/${cat.id}?sub=${encodeURIComponent(sub)}`}
                            onClick={() => setActiveMegaCategory(null)}
                            className="block p-1.5 rounded hover:bg-purple-50 text-gray-700 hover:text-[#4F3267] transition-colors"
                          >
                            {sub}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px]">
                      <span className="text-gray-500">{cat.count}+ Designs</span>
                      <Link
                        to={`/category/${cat.id}`}
                        onClick={() => setActiveMegaCategory(null)}
                        className="text-[#4F3267] font-semibold hover:underline flex items-center gap-1"
                      >
                        View All <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link
              to="/try-at-home"
              className="py-3 px-3 text-xs font-bold text-[#8863FB] hover:text-[#4F3267] transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              Try at Home (Free)
            </Link>

            <Link
              to="/stores"
              className="py-3 px-3 text-xs font-semibold text-gray-700 hover:text-[#4F3267] transition-colors"
            >
              Stores
            </Link>
          </div>

          {/* Quick contact / support stub */}
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-[#4F3267]" />
              <strong>1800-102-0103</strong>
            </span>
            <span>·</span>
            <span className="text-[11px]">Mon-Sun 10am-9pm</span>
          </div>
        </div>
      </nav>

      {/* 4. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col p-5 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <span className="font-serif text-xl font-bold text-[#3D2153]">CaratGems</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile search */}
            <div className="my-4">
              <form onSubmit={(e) => { handleSearchSubmit(e); setMobileMenuOpen(false); }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search rings, earrings..."
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg bg-gray-50"
                />
              </form>
            </div>

            {/* Mobile Categories */}
            <div className="space-y-1 text-xs">
              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded-lg font-semibold text-gray-800 hover:bg-purple-50"
              >
                All Jewellery
              </Link>
              {CATEGORIES_NAV.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 px-3 rounded-lg text-gray-700 hover:bg-purple-50 font-medium"
                >
                  {cat.name} ({cat.count})
                </Link>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 space-y-2 text-xs">
              <Link
                to="/try-at-home"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-[#4F3267] font-bold"
              >
                ✨ Book Free Try at Home
              </Link>
              <Link
                to="/stores"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-gray-700 font-medium"
              >
                📍 Find a Store (270+)
              </Link>
              <Link
                to="/order-tracking"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-gray-700 font-medium"
              >
                📦 Track Active Order
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-gray-700 font-medium"
              >
                👑 About CaratGems & Heritage
              </Link>
              <Link
                to="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-gray-700 font-medium"
              >
                ❓ FAQs & Ring Sizing Guide
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
