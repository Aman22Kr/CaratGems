import React, { useState, useMemo } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Sparkles, ChevronRight, Check } from 'lucide-react';
import { PRODUCTS, CATEGORIES_NAV } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { AdBanner } from '../components/AdBanner';
import { CategoryType, GoldKarat, MetalColor, DiamondClarity } from '../types';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categorySlug } = useParams<{ categorySlug?: string }>();

  // Filter state
  const searchQuery = searchParams.get('q') || '';
  const subCategoryQuery = searchParams.get('sub') || '';

  const activeCategory: string = categorySlug || searchParams.get('category') || 'all';

  const [selectedKarat, setSelectedKarat] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedClarity, setSelectedClarity] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [onlyExpress, setOnlyExpress] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Filter logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Search keyword
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesSub = product.subCategory.toLowerCase().includes(q);
        const matchesTag = product.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCategory && !matchesSub && !matchesTag) {
          return false;
        }
      }

      // 2. Category
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }

      // 3. Subcategory
      if (subCategoryQuery && product.subCategory.toLowerCase() !== subCategoryQuery.toLowerCase()) {
        return false;
      }

      // 4. Karat
      if (selectedKarat !== 'all' && product.defaultKarat !== selectedKarat) {
        return false;
      }

      // 5. Metal color
      if (selectedColor !== 'all' && product.defaultColor !== selectedColor) {
        return false;
      }

      // 6. Diamond clarity
      if (selectedClarity !== 'all' && product.defaultClarity !== selectedClarity) {
        return false;
      }

      // 7. Express dispatch
      if (onlyExpress && !product.dispatchTime.includes('Express')) {
        return false;
      }

      // 8. Price range
      if (selectedPriceRange === 'under-25k' && product.basePrice >= 25000) return false;
      if (selectedPriceRange === '25k-50k' && (product.basePrice < 25000 || product.basePrice > 50000)) return false;
      if (selectedPriceRange === 'above-50k' && product.basePrice <= 50000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.basePrice - b.basePrice;
      if (sortBy === 'price-high') return b.basePrice - a.basePrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      return 0; // default featured
    });
  }, [
    searchQuery,
    activeCategory,
    subCategoryQuery,
    selectedKarat,
    selectedColor,
    selectedClarity,
    onlyExpress,
    selectedPriceRange,
    sortBy,
  ]);

  const clearAllFilters = () => {
    setSelectedKarat('all');
    setSelectedColor('all');
    setSelectedClarity('all');
    setSelectedPriceRange('all');
    setOnlyExpress(false);
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedKarat !== 'all' ||
    selectedColor !== 'all' ||
    selectedClarity !== 'all' ||
    selectedPriceRange !== 'all' ||
    onlyExpress ||
    !!searchQuery ||
    !!subCategoryQuery;

  // Header Title
  const pageTitle = activeCategory !== 'all'
    ? `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Collection`
    : searchQuery
    ? `Search Results for "${searchQuery}"`
    : 'All Fine Diamond Jewellery';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7FC]">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-purple-100 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mb-1">
              <Link to="/" className="hover:text-[#4F3267]">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/products" className="hover:text-[#4F3267]">Jewellery</Link>
              {activeCategory !== 'all' && (
                <>
                  <ChevronRight className="w-3 h-3" />
                  <span className="capitalize text-gray-800 font-medium">{activeCategory}</span>
                </>
              )}
            </div>
            <h1 className="text-xl md:text-2xl font-serif font-bold text-gray-900">
              {pageTitle}
            </h1>
            <span className="text-xs text-gray-500">
              Showing {filteredProducts.length} verified fine jewellery designs
            </span>
          </div>

          {/* Sort & Mobile filter trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden px-3.5 py-2 bg-purple-50 text-[#4F3267] rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-purple-200"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 hidden sm:inline">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-semibold px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3267]"
              >
                <option value="featured">Featured Designs</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Biggest Savings</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Split */}
      <div className="max-w-7xl mx-auto px-4 py-8 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Filters (Desktop) */}
        <aside
          className={`lg:col-span-3 bg-white p-5 rounded-2xl border border-purple-100 shadow-xs space-y-6 ${
            mobileFilterOpen
              ? 'fixed inset-y-0 left-0 z-50 w-4/5 max-w-xs overflow-y-auto block'
              : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-900">
              <SlidersHorizontal className="w-4 h-4 text-[#4F3267]" />
              <span>Filter Designs</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-[11px] text-[#4F3267] font-semibold hover:underline"
              >
                Clear All
              </button>
            )}
            {mobileFilterOpen && (
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="lg:hidden p-1 text-gray-400"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
              Category
            </span>
            <div className="space-y-1 text-xs">
              <Link
                to="/products"
                className={`block px-2.5 py-1.5 rounded-md transition-colors ${
                  activeCategory === 'all'
                    ? 'bg-purple-50 text-[#4F3267] font-bold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                All Categories
              </Link>
              {CATEGORIES_NAV.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  className={`block px-2.5 py-1.5 rounded-md transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-purple-50 text-[#4F3267] font-bold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
              Price Range
            </span>
            <div className="space-y-1.5 text-xs text-gray-700">
              {[
                { label: 'All Prices', val: 'all' },
                { label: 'Under ₹25,000', val: 'under-25k' },
                { label: '₹25,000 - ₹50,000', val: '25k-50k' },
                { label: 'Above ₹50,000', val: 'above-50k' },
              ].map((p) => (
                <label key={p.val} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={selectedPriceRange === p.val}
                    onChange={() => setSelectedPriceRange(p.val)}
                    className="accent-[#4F3267]"
                  />
                  <span>{p.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Gold Karat Filter */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
              Gold Purity
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['all', '14KT', '18KT', '22KT'].map((karat) => (
                <button
                  key={karat}
                  onClick={() => setSelectedKarat(karat)}
                  className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                    selectedKarat === karat
                      ? 'bg-[#4F3267] text-white border-[#4F3267]'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300'
                  }`}
                >
                  {karat === 'all' ? 'All' : karat}
                </button>
              ))}
            </div>
          </div>

          {/* Metal Color Filter */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
              Metal Tone
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'All Tones' },
                { id: 'Yellow', label: 'Yellow Gold' },
                { id: 'Rose', label: 'Rose Gold' },
                { id: 'White', label: 'White Gold' },
              ].map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color.id)}
                  className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
                    selectedColor === color.id
                      ? 'bg-[#4F3267] text-white border-[#4F3267]'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300'
                  }`}
                >
                  {color.label}
                </button>
              ))}
            </div>
          </div>

          {/* Diamond Clarity Filter */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
              Diamond Clarity
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['all', 'IJ-SI', 'GH-VS', 'VVS-EF'].map((clarity) => (
                <button
                  key={clarity}
                  onClick={() => setSelectedClarity(clarity)}
                  className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
                    selectedClarity === clarity
                      ? 'bg-[#4F3267] text-white border-[#4F3267]'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300'
                  }`}
                >
                  {clarity === 'all' ? 'All Clarities' : clarity}
                </button>
              ))}
            </div>
          </div>

          {/* Express delivery switch */}
          <div className="pt-2 border-t border-gray-100">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-800">
              <input
                type="checkbox"
                checked={onlyExpress}
                onChange={(e) => setOnlyExpress(e.target.checked)}
                className="rounded text-[#4F3267] accent-[#4F3267]"
              />
              <span>⚡ Express 24-48h Dispatch Only</span>
            </label>
          </div>
        </aside>

        {/* Product Listing Grid */}
        <main className="lg:col-span-9">
          {/* Active filter chips */}
          {hasActiveFilters && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-500">Active filters:</span>
              {selectedKarat !== 'all' && (
                <span className="inline-flex items-center gap-1 text-xs bg-purple-50 text-[#4F3267] px-2 py-0.5 rounded-md border border-purple-200">
                  {selectedKarat}
                  <button onClick={() => setSelectedKarat('all')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedColor !== 'all' && (
                <span className="inline-flex items-center gap-1 text-xs bg-purple-50 text-[#4F3267] px-2 py-0.5 rounded-md border border-purple-200">
                  {selectedColor} Gold
                  <button onClick={() => setSelectedColor('all')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedClarity !== 'all' && (
                <span className="inline-flex items-center gap-1 text-xs bg-purple-50 text-[#4F3267] px-2 py-0.5 rounded-md border border-purple-200">
                  {selectedClarity}
                  <button onClick={() => setSelectedClarity('all')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {onlyExpress && (
                <span className="inline-flex items-center gap-1 text-xs bg-purple-50 text-[#4F3267] px-2 py-0.5 rounded-md border border-purple-200">
                  Express 24-48h
                  <button onClick={() => setOnlyExpress(false)}><X className="w-3 h-3" /></button>
                </span>
              )}
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-purple-100 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-purple-50 flex items-center justify-center text-purple-400">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">
                No matching jewellery found
              </h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Try widening your price range, choosing different gold purities, or clearing your active filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="px-5 py-2.5 bg-[#4F3267] text-white text-xs font-semibold rounded-lg hover:bg-[#3D2153]"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Bottom Ad Section (As requested) */}
      <AdBanner />
    </div>
  );
};
