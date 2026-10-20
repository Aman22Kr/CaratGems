import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/pricing';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartTotals,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponErr, setCouponErr] = useState('');
  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponErr(res.message);
    } else {
      setCouponErr('');
      setCouponInput('');
    }
  };

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-drawer-title"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-[#FAF7FC] border-b border-purple-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#4F3267]" />
              <h2 id="cart-drawer-title" className="text-base font-semibold text-gray-900">
                Your Shopping Bag ({cartTotals.itemCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-purple-50 flex items-center justify-center text-purple-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">Your bag is empty</h3>
                  <p className="text-xs text-gray-500 mt-1">Discover sparkling fine jewellery crafted for everyday elegance.</p>
                </div>
                <Link
                  to="/products"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="inline-block px-6 py-2.5 bg-[#4F3267] text-white text-xs font-semibold rounded-lg hover:bg-[#3D2153] transition-colors"
                >
                  Explore All Jewellery
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3.5 rounded-xl border border-purple-100 bg-[#FAF7FC]/50 hover:bg-[#FAF7FC] transition-colors"
                  >
                    <Link
                      to={`/product/${item.product.id}`}
                      onClick={() => setIsCartDrawerOpen(false)}
                      className="w-20 h-20 rounded-lg overflow-hidden bg-white shrink-0 border border-gray-100"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            to={`/product/${item.product.id}`}
                            onClick={() => setIsCartDrawerOpen(false)}
                            className="text-xs font-semibold text-gray-900 hover:text-[#4F3267] line-clamp-1"
                          >
                            {item.product.title}
                          </Link>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 p-0.5"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Variant chips */}
                        <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[11px] text-gray-500">
                          <span>{item.selectedKarat} {item.selectedColor} Gold</span>
                          <span>·</span>
                          <span>{item.selectedClarity}</span>
                          {item.selectedRingSize && (
                            <>
                              <span>·</span>
                              <span>Size {item.selectedRingSize}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity adjuster */}
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

                        <span className="text-xs font-bold text-gray-900 tabular-nums">
                          {formatINR(item.finalPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Promo Code box */}
                <div className="mt-4 pt-3 border-t border-gray-100">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs">
                      <div className="flex items-center gap-1.5 text-emerald-800">
                        <Tag className="w-4 h-4 text-emerald-600" />
                        <div>
                          <span className="font-bold">{appliedCoupon.code}</span> applied: {appliedCoupon.description}
                        </div>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-red-600 font-semibold hover:underline ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-1">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => {
                            setCouponInput(e.target.value.toUpperCase());
                            setCouponErr('');
                          }}
                          placeholder="Coupon Code (e.g. SPARKLE10)"
                          className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-lg uppercase tracking-wide focus:outline-none focus:ring-1 focus:ring-[#4F3267]"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-gray-900 text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {couponErr && <p className="text-[11px] text-red-600">{couponErr}</p>}
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer with totals */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#FAF7FC] border-t border-purple-100 space-y-3 shrink-0">
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-medium text-gray-900">
                    {formatINR(cartTotals.subtotal)}
                  </span>
                </div>
                {cartTotals.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount Savings</span>
                    <span className="tabular-nums">- {formatINR(cartTotals.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated 3% GST</span>
                  <span className="tabular-nums font-medium text-gray-900">
                    {formatINR(cartTotals.gst)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Insured Delivery</span>
                  <span className="text-emerald-700 font-medium uppercase text-[10px]">FREE</span>
                </div>
                <div className="pt-2 border-t border-purple-200 flex justify-between text-sm font-bold text-gray-900">
                  <span>Total Amount</span>
                  <span className="tabular-nums text-[#4F3267]">
                    {formatINR(cartTotals.total)}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-[#4F3267] text-white text-xs font-bold rounded-lg hover:bg-[#3D2153] transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  Proceed to Secure Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex justify-between gap-2">
                  <Link
                    to="/cart"
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="flex-1 py-2 text-center text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    View Full Cart
                  </Link>
                  <Link
                    to="/try-at-home"
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="flex-1 py-2 text-center text-xs font-semibold text-[#4F3267] bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100"
                  >
                    Try at Home
                  </Link>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-center gap-2 text-[10px] text-gray-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Certified · 15-Day Money-Back Guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
