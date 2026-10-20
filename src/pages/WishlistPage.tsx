import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight, Home, Sparkles, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/mockData';
import { formatINR } from '../utils/pricing';
import { AdBanner } from '../components/AdBanner';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart, toggleTryAtHomeQueue, isQueuedForTryAtHome, showToast } = useApp();

  const favoritedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7FC]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-purple-100 py-3.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs text-gray-500">
          <Link to="/" className="hover:text-[#4F3267]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-900 font-semibold">My Saved Wishlist ({favoritedProducts.length})</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 w-full flex-1">
        {favoritedProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-purple-100 shadow-xs max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-400 mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-serif font-bold text-gray-900">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs text-gray-500">
              Save your dream solitaire rings, diamond necklaces, and modern mangalsutras here for easy access.
            </p>
            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#4F3267] text-white text-xs font-bold rounded-xl hover:bg-[#3D2153] transition-colors"
              >
                Discover Collections
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-serif font-bold text-gray-900">
                  Saved Jewellery ({favoritedProducts.length})
                </h1>
                <p className="text-xs text-gray-500">All prices backed by CaratGems 15-day price protection.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favoritedProducts.map((product) => {
                const isTah = isQueuedForTryAtHome(product.id);

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-purple-100 overflow-hidden shadow-xs flex flex-col justify-between hover:border-purple-300 transition-all"
                  >
                    <div className="relative aspect-square bg-[#FAF7FC]">
                      <Link to={`/product/${product.id}`} className="block w-full h-full">
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-rose-500 hover:bg-white shadow-xs"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[11px] text-gray-500 mb-0.5">
                          {product.defaultKarat} {product.defaultColor} Gold · {product.defaultClarity}
                        </div>
                        <Link
                          to={`/product/${product.id}`}
                          className="text-xs font-semibold text-gray-900 hover:text-[#4F3267] line-clamp-1 block"
                        >
                          {product.title}
                        </Link>
                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="text-sm font-bold text-gray-900 tabular-nums">
                            {formatINR(product.basePrice)}
                          </span>
                          <span className="text-xs text-emerald-600 font-semibold">
                            {product.discountPercent}% Off
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-gray-100">
                        <button
                          onClick={() => addToCart(product)}
                          className="w-full py-2 bg-[#4F3267] text-white text-xs font-semibold rounded-lg hover:bg-[#3D2153] transition-colors flex items-center justify-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          Move to Bag
                        </button>

                        <button
                          onClick={() => {
                            const res = toggleTryAtHomeQueue(product.id);
                            showToast(res.message);
                          }}
                          className={`w-full py-2 text-xs font-semibold rounded-lg border transition-colors flex items-center justify-center gap-1.5 ${
                            isTah
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : 'bg-purple-50 text-[#4F3267] border-purple-200 hover:bg-purple-100'
                          }`}
                        >
                          <Home className="w-3.5 h-3.5" />
                          <span>{isTah ? 'Added to Home Trial' : 'Try at Home for Free'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Ad Section (As requested) */}
      <AdBanner />
    </div>
  );
};
