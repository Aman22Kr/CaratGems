import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Home,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AVAILABLE_COUPONS } from '../data/mockData';
import { formatINR } from '../utils/pricing';
import { AdBanner } from '../components/AdBanner';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotals,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useApp();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const navigate = useNavigate();

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setInputCoupon('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7FC]">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-purple-100 py-3.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs text-gray-500">
          <Link to="/" className="hover:text-[#4F3267]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-900 font-medium">Shopping Bag ({cartTotals.itemCount})</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 w-full flex-1">
        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-purple-100 shadow-xs max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center text-purple-400 mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-serif font-bold text-gray-900">
              Your Shopping Bag is Empty
            </h2>
            <p className="text-xs text-gray-500">
              Explore our latest curated fine diamond jewellery and add timeless pieces to your bag.
            </p>
            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#4F3267] text-white text-xs font-bold rounded-xl hover:bg-[#3D2153] transition-colors shadow-sm"
              >
                Browse Collections
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Bag Items */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <h1 className="text-lg font-serif font-bold text-gray-900">
                    Shopping Bag Items ({cartTotals.itemCount})
                  </h1>
                  <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded">
                    100% Insured Delivery Included
                  </span>
                </div>

                <div className="divide-y divide-gray-100">
                  {cart.map((item) => (
                    <div key={item.id} className="py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <Link
                        to={`/product/${item.product.id}`}
                        className="w-20 h-20 rounded-xl overflow-hidden bg-[#FAF7FC] shrink-0 border border-gray-100"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.product.id}`}
                          className="text-sm font-semibold text-gray-900 hover:text-[#4F3267] transition-colors"
                        >
                          {item.product.title}
                        </Link>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-gray-500">
                          <span>{item.selectedKarat} {item.selectedColor} Gold</span>
                          <span>·</span>
                          <span>{item.selectedClarity} Diamond</span>
                          {item.selectedRingSize && (
                            <>
                              <span>·</span>
                              <span>Ring Size {item.selectedRingSize}</span>
                            </>
                          )}
                        </div>
                        <span className="text-[11px] text-gray-400 mt-0.5 block">
                          SKU: {item.product.id.toUpperCase()} · Certified BIS
                        </span>
                      </div>

                      {/* Controls and Price */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                        <span className="text-sm font-bold text-gray-900 tabular-nums">
                          {formatINR(item.finalPrice * item.quantity)}
                        </span>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-gray-200 rounded-md bg-white">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-100 text-gray-600 rounded-l"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-semibold tabular-nums text-gray-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100 text-gray-600 rounded-r"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 p-1"
                            title="Remove"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Try at home promotion block */}
              <div className="bg-gradient-to-r from-purple-50 to-white rounded-2xl p-5 border border-purple-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-[#4F3267] shrink-0">
                    <Home className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900">Want to try designs in person first?</h3>
                    <p className="text-[11px] text-gray-500">Book our free Try at Home consultation before making payment.</p>
                  </div>
                </div>
                <Link
                  to="/try-at-home"
                  className="px-4 py-2 bg-white border border-[#4F3267] text-[#4F3267] text-xs font-semibold rounded-lg hover:bg-purple-50 transition-colors shrink-0"
                >
                  Book Free Trial
                </Link>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-4 space-y-4">
              {/* Promo coupons */}
              <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-xs space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900">
                  <Tag className="w-4 h-4 text-[#4F3267]" />
                  <span>Coupons & Offers</span>
                </div>

                {appliedCoupon ? (
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-emerald-800">{appliedCoupon.code}</span>
                      <p className="text-[11px] text-emerald-700">{appliedCoupon.description}</p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-semibold text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputCoupon}
                        onChange={(e) => {
                          setInputCoupon(e.target.value.toUpperCase());
                          setCouponError('');
                        }}
                        placeholder="Enter Promo Code"
                        className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-lg uppercase tracking-wide focus:outline-none focus:ring-1 focus:ring-[#4F3267]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#4F3267] text-white text-xs font-bold rounded-lg hover:bg-[#3D2153]"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}

                    {/* Quick suggestion tags */}
                    <div className="pt-2">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">
                        Applicable Deals
                      </span>
                      <div className="space-y-1 text-xs">
                        {AVAILABLE_COUPONS.map((c) => (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => applyCoupon(c.code)}
                            className="w-full text-left p-2 rounded-lg bg-gray-50 hover:bg-purple-50 transition-colors flex items-center justify-between"
                          >
                            <span className="font-bold text-[#4F3267]">{c.code}</span>
                            <span className="text-[11px] text-gray-500">{c.description}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </form>
                )}
              </div>

              {/* Price Details */}
              <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-gray-900 pb-3 border-b border-gray-100">
                  Payment Summary
                </h3>

                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Cart Subtotal</span>
                    <span className="font-semibold text-gray-900 tabular-nums">
                      {formatINR(cartTotals.subtotal)}
                    </span>
                  </div>

                  {cartTotals.discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Coupon Discount</span>
                      <span className="tabular-nums">- {formatINR(cartTotals.discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Applicable GST (3%)</span>
                    <span className="font-semibold text-gray-900 tabular-nums">
                      {formatINR(cartTotals.gst)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Armoured Express Delivery</span>
                    <span className="text-emerald-700 font-bold uppercase text-[10px]">FREE</span>
                  </div>

                  <div className="pt-3 border-t border-purple-200 flex justify-between text-base font-bold text-gray-900">
                    <span>Grand Total</span>
                    <span className="text-[#4F3267] tabular-nums">
                      {formatINR(cartTotals.total)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-3.5 bg-[#4F3267] text-white text-xs font-bold rounded-xl hover:bg-[#3D2153] transition-all shadow-md flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="pt-2 text-center text-[11px] text-gray-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Secure SSL 256-bit Encrypted Checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Ad Section (As requested) */}
      <AdBanner />
    </div>
  );
};
