import React from 'react';
import { Heart, Star, Sparkles, Check, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/pricing';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    isInWishlist,
    toggleWishlist,
    toggleTryAtHomeQueue,
    isQueuedForTryAtHome,
    addToCart,
    showToast,
  } = useApp();

  const isFavorited = isInWishlist(product.id);
  const isSelectedForTah = isQueuedForTryAtHome(product.id);

  const handleTahToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const res = toggleTryAtHomeQueue(product.id);
    showToast(res.message);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="group relative bg-white rounded-xl border border-purple-100/80 hover:border-purple-300 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">
      {/* Top Media Container */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square bg-[#FAF7FC] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          {product.isBestSeller && (
            <span className="text-[10px] font-bold tracking-wide uppercase bg-[#4F3267] text-white px-2 py-0.5 rounded shadow-xs">
              Bestseller
            </span>
          )}
          {product.isNew && !product.isBestSeller && (
            <span className="text-[10px] font-bold tracking-wide uppercase bg-emerald-700 text-white px-2 py-0.5 rounded shadow-xs">
              New
            </span>
          )}
          <span className="text-[10px] font-semibold bg-white/95 text-gray-700 px-1.5 py-0.5 rounded border border-gray-200 backdrop-blur-xs">
            {product.dispatchTime.includes('Express') ? '⚡ 24-48h Dispatch' : '5 Days Dispatch'}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isFavorited
              ? 'bg-rose-50 text-rose-500 shadow-sm'
              : 'bg-white/80 text-gray-500 hover:text-rose-500 hover:bg-white shadow-xs'
          }`}
          aria-label={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Try at home hover trigger button */}
        {product.isTryAtHome && (
          <button
            onClick={handleTahToggle}
            className={`absolute bottom-2.5 left-2.5 right-2.5 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all backdrop-blur-xs ${
              isSelectedForTah
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white/95 text-[#4F3267] hover:bg-white shadow-xs border border-purple-200'
            }`}
          >
            {isSelectedForTah ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Selected for Home Trial</span>
              </>
            ) : (
              <>
                <Home className="w-3.5 h-3.5" />
                <span>Try at Home for Free</span>
              </>
            )}
          </button>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Subtitle / Karat Info */}
          <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
            <span>{product.defaultKarat} {product.defaultColor} Gold</span>
            <div className="flex items-center gap-1 text-amber-600 font-semibold">
              <Star className="w-3 h-3 fill-current" />
              <span>{product.rating}</span>
              <span className="text-gray-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link
            to={`/product/${product.id}`}
            className="text-xs font-semibold text-gray-900 hover:text-[#4F3267] transition-colors line-clamp-1 block"
          >
            {product.title}
          </Link>
        </div>

        {/* Pricing and Action */}
        <div className="pt-3 mt-2 border-t border-gray-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-gray-900 tabular-nums">
                {formatINR(product.basePrice)}
              </span>
              {product.originalPrice > product.basePrice && (
                <span className="text-[11px] text-gray-400 line-through tabular-nums">
                  {formatINR(product.originalPrice)}
                </span>
              )}
            </div>
            {product.discountPercent > 0 && (
              <span className="text-[10px] font-semibold text-emerald-600 block">
                Save {product.discountPercent}%
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className="px-3 py-1.5 text-xs font-semibold text-[#4F3267] hover:text-white bg-purple-50 hover:bg-[#4F3267] rounded-lg transition-colors border border-purple-200"
            title="Quick add to shopping bag"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};
