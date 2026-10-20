import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Package,
  QrCode,
  Banknote,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/pricing';
import { AdBanner } from '../components/AdBanner';
import { Order } from '../types';

export const CheckoutPage: React.FC = () => {
  const { cart, cartTotals, placeOrder, userPincode, showToast } = useApp();
  const navigate = useNavigate();

  // Form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('New Delhi');
  const [pincode, setPincode] = useState(userPincode);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod' | 'netbanking'>('upi');
  const [formError, setFormError] = useState('');
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim() || !pincode.trim()) {
      setFormError('Please enter all required shipping details.');
      return;
    }

    if (cart.length === 0 && !placedOrder) {
      setFormError('Your cart is empty. Please add items to checkout.');
      return;
    }

    const order = placeOrder({
      customerName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || 'shopper@caratgems.com',
      address: address.trim(),
      city: city.trim(),
      pincode: pincode.trim(),
      paymentMethod: paymentMethod.toUpperCase(),
    });

    setPlacedOrder(order);
    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch {}
    showToast(`Order #${order.orderId} placed successfully!`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7FC]">
      {/* Top Banner */}
      <div className="bg-white border-b border-purple-100 py-3.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Link to="/" className="hover:text-[#4F3267]">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/cart" className="hover:text-[#4F3267]">Cart</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-semibold">Secure Checkout</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit SSL Encryption</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 w-full flex-1">
        {placedOrder ? (
          /* Order Placed Success Confirmation */
          <div className="bg-white rounded-2xl p-8 md:p-12 border border-purple-100 shadow-sm max-w-2xl mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                Order Confirmed
              </span>
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mt-2">
                Thank You for Choosing CaratGems!
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Your order reference number is: <strong className="text-gray-900">{placedOrder.orderId}</strong>
              </p>
            </div>

            <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-100 text-left text-xs space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-500">Recipient:</span>
                <span className="font-semibold text-gray-900">{placedOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping Address:</span>
                <span className="font-semibold text-gray-900 text-right max-w-xs">{placedOrder.address}, {placedOrder.city} - {placedOrder.pincode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Selected:</span>
                <span className="font-semibold text-gray-900">{placedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Estimated Delivery:</span>
                <span className="font-semibold text-emerald-700">Within 48 Hours via Insured Express Courier</span>
              </div>
              <div className="pt-2 border-t border-purple-200 flex justify-between font-bold text-gray-900 text-sm">
                <span>Total Amount Paid:</span>
                <span className="text-[#4F3267] tabular-nums">{formatINR(placedOrder.total)}</span>
              </div>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              * Note: As this is a front-end simulation, no real monetary transaction or payment gateway deduction occurred. Your simulated order details have been saved to local browser storage.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to={`/order-tracking?id=${placedOrder.orderId}`}
                className="flex-1 py-3 bg-[#4F3267] text-white text-xs font-bold rounded-xl hover:bg-[#3D2153] transition-colors flex items-center justify-center gap-2"
              >
                Track Live Order Status
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products"
                className="flex-1 py-3 bg-white border border-gray-200 text-gray-700 text-xs font-semibold rounded-xl hover:bg-gray-50 text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Shipping & Payment */}
            <div className="lg:col-span-7 space-y-6">
              {formError && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                  {formError}
                </div>
              )}

              {/* 1. Shipping Details */}
              <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                  <Truck className="w-5 h-5 text-[#4F3267]" />
                  <h2 className="text-base font-serif font-bold text-gray-900">
                    1. Shipping & Contact Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Radhika Sharma"
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3267]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Mobile Number (for delivery OTP) *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3267]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Email Address (for invoice)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. radhika@example.com"
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3267]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Postal PIN Code *</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3267] tabular-nums"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="font-semibold text-gray-700 block mb-1">Full Delivery Address *</label>
                    <textarea
                      required
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Flat, Apartment / House No, Street name & Landmark"
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4F3267]"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Payment Method */}
              <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                  <CreditCard className="w-5 h-5 text-[#4F3267]" />
                  <h2 className="text-base font-serif font-bold text-gray-900">
                    2. Select Payment Method
                  </h2>
                </div>

                <div className="space-y-2.5 text-xs">
                  {/* UPI */}
                  <label
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-[#4F3267] bg-purple-50/60 ring-1 ring-[#4F3267]'
                        : 'border-gray-200 hover:border-purple-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                        className="accent-[#4F3267]"
                      />
                      <div>
                        <span className="font-bold text-gray-900 block">Instant UPI (Google Pay, PhonePe, Paytm, BHIM)</span>
                        <span className="text-[11px] text-gray-500">Fastest checkout with 100% verified status</span>
                      </div>
                    </div>
                    <QrCode className="w-5 h-5 text-[#4F3267]" />
                  </label>

                  {/* Cards */}
                  <label
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#4F3267] bg-purple-50/60 ring-1 ring-[#4F3267]'
                        : 'border-gray-200 hover:border-purple-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="accent-[#4F3267]"
                      />
                      <div>
                        <span className="font-bold text-gray-900 block">Credit / Debit Card (Visa, Mastercard, RuPay, Amex)</span>
                        <span className="text-[11px] text-gray-500">Zero-cost EMI available on major Indian bank cards</span>
                      </div>
                    </div>
                    <CreditCard className="w-5 h-5 text-gray-400" />
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#4F3267] bg-purple-50/60 ring-1 ring-[#4F3267]'
                        : 'border-gray-200 hover:border-purple-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="accent-[#4F3267]"
                      />
                      <div>
                        <span className="font-bold text-gray-900 block">Cash on Delivery (Armoured Agent Verification)</span>
                        <span className="text-[11px] text-gray-500">Inspect hallmark stamp upon delivery before hand-off</span>
                      </div>
                    </div>
                    <Banknote className="w-5 h-5 text-gray-400" />
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Summary */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-xs space-y-4">
                <h3 className="text-sm font-serif font-bold text-gray-900 pb-3 border-b border-gray-100">
                  Order Summary ({cart.length} items)
                </h3>

                <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <img src={item.product.images[0]} alt={item.product.title} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-800 truncate">{item.product.title}</p>
                          <span className="text-[11px] text-gray-500">{item.selectedKarat} · Qty {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-bold text-gray-900 tabular-nums shrink-0">
                        {formatINR(item.finalPrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-gray-100 space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900 tabular-nums">{formatINR(cartTotals.subtotal)}</span>
                  </div>
                  {cartTotals.discount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Promo Savings</span>
                      <span className="tabular-nums">- {formatINR(cartTotals.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>GST (3% Indian Bullion Tax)</span>
                    <span className="font-semibold text-gray-900 tabular-nums">{formatINR(cartTotals.gst)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Insured Delivery</span>
                    <span className="text-emerald-700 font-bold uppercase text-[10px]">FREE</span>
                  </div>
                  <div className="pt-2 border-t border-purple-200 flex justify-between text-base font-bold text-gray-900">
                    <span>Grand Total</span>
                    <span className="text-[#4F3267] tabular-nums">{formatINR(cartTotals.total)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#4F3267] hover:bg-[#3D2153] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  Confirm & Place Order ({formatINR(cartTotals.total)})
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-[11px] text-gray-400 text-center flex items-center justify-center gap-1.5 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>15-Day Money-Back Guarantee & Lifetime Exchange</span>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Bottom Ad Section (As requested) */}
      <AdBanner />
    </div>
  );
};
