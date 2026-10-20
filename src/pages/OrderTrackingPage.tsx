import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Package,
  Search,
  CheckCircle2,
  Clock,
  Shield,
  Truck,
  ArrowRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatINR } from '../utils/pricing';
import { AdBanner } from '../components/AdBanner';
import { Order } from '../types';

export const OrderTrackingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('id') || '';
  const { orders, getOrderById } = useApp();

  const [inputOrderId, setInputOrderId] = useState(initialId);
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialId) {
      const found = getOrderById(initialId);
      if (found) {
        setSearchedOrder(found);
        setHasSearched(true);
      }
    } else if (orders.length > 0) {
      setSearchedOrder(orders[0]);
      setInputOrderId(orders[0].orderId);
      setHasSearched(true);
    }
  }, [initialId, orders]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputOrderId.trim()) return;
    const found = getOrderById(inputOrderId);
    setSearchedOrder(found || null);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7FC]">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#3D2153] to-[#4F3267] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-semibold">
            <Truck className="w-3.5 h-3.5 text-amber-300" />
            <span>Real-Time Armoured Logistics Tracking</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
            Track Your Jewellery Order
          </h1>

          <p className="text-xs text-purple-100 font-light">
            Check the live gemological inspection, hallmarking, and armored transit progress of your CaratGems parcel.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto px-4 -mt-6 z-10 w-full">
        <form onSubmit={handleSearch} className="bg-white p-2 rounded-2xl shadow-lg border border-purple-100 flex gap-2">
          <input
            type="text"
            value={inputOrderId}
            onChange={(e) => setInputOrderId(e.target.value)}
            placeholder="Enter Order ID (e.g. CG-123456)"
            className="flex-1 px-4 py-2.5 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none uppercase tracking-wide"
          />
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#4F3267] text-white text-xs font-bold rounded-xl hover:bg-[#3D2153] transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>Track</span>
          </button>
        </form>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-10 w-full flex-1">
        {searchedOrder ? (
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-purple-100 shadow-xs space-y-8">
            {/* Order header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                  Insured Armoured Transit
                </span>
                <h2 className="text-xl font-serif font-bold text-gray-900 mt-1">
                  Order #{searchedOrder.orderId}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Placed on {searchedOrder.createdAt} · Destination: {searchedOrder.city} ({searchedOrder.pincode})
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-gray-500">Order Value</span>
                <p className="text-lg font-bold text-[#4F3267] tabular-nums">
                  {formatINR(searchedOrder.total)}
                </p>
              </div>
            </div>

            {/* Stages */}
            <div className="space-y-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Fulfillment & Dispatch Milestones
              </h3>

              <div className="relative pl-6 sm:pl-8 space-y-8 border-l-2 border-purple-200">
                {searchedOrder.stages.map((stage, idx) => (
                  <div key={stage.title} className="relative">
                    {/* Bullet marker */}
                    <div
                      className={`absolute -left-[31px] sm:-left-[39px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-white ${
                        stage.completed
                          ? 'bg-[#4F3267]'
                          : idx === 2
                          ? 'bg-amber-500 animate-pulse'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {stage.completed ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Clock className="w-3.5 h-3.5" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-baseline gap-2">
                        <h4 className={`text-xs font-bold ${stage.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {stage.title}
                        </h4>
                        {stage.timestamp && (
                          <span className="text-[11px] text-purple-600 font-medium">({stage.timestamp})</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{stage.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Itemized package contents */}
            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Items in this Consignment
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {searchedOrder.items.map((item) => (
                  <div key={item.id} className="p-3 rounded-xl border border-purple-100 bg-[#FAF7FC] flex items-center gap-3">
                    <img src={item.product.images[0]} alt={item.product.title} className="w-12 h-12 rounded-lg object-cover bg-white" />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-gray-800 truncate">{item.product.title}</h4>
                      <p className="text-[11px] text-gray-500">
                        {item.selectedKarat} · {item.selectedClarity} · Qty {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assistance stub */}
            <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 flex items-center justify-between text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#4F3267]" />
                <span>Need expedited delivery assistance? Call Priority Desk: <strong>1800-102-0103</strong></span>
              </div>
              <Link to="/contact" className="text-[#4F3267] font-semibold hover:underline">
                Contact Care
              </Link>
            </div>
          </div>
        ) : hasSearched ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-purple-100 max-w-md mx-auto space-y-3">
            <Package className="w-12 h-12 text-gray-400 mx-auto" />
            <h3 className="text-base font-serif font-bold text-gray-900">
              No order found for "{inputOrderId}"
            </h3>
            <p className="text-xs text-gray-500">
              Check the order reference received in your booking confirmation or browse fine jewellery to place a new test order.
            </p>
            <div className="pt-2">
              <Link
                to="/products"
                className="px-5 py-2.5 bg-[#4F3267] text-white text-xs font-bold rounded-lg hover:bg-[#3D2153] inline-block"
              >
                Browse Jewellery
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 text-center border border-purple-100 max-w-md mx-auto space-y-3">
            <Package className="w-12 h-12 text-purple-400 mx-auto" />
            <h3 className="text-base font-serif font-bold text-gray-900">
              Enter Your Order Reference
            </h3>
            <p className="text-xs text-gray-500">
              Input your 6-digit CaratGems Order ID above to see live armoring, hallmarking, and delivery milestones.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Ad Section (As requested) */}
      <AdBanner />
    </div>
  );
};
