import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  Star,
  ShieldCheck,
  Award,
  Truck,
  RefreshCw,
  Home,
  Check,
  ChevronRight,
  Info,
  Rotate3d,
  Share2,
  Calendar,
  Sparkles,
  MapPin
} from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { GoldKarat, MetalColor, DiamondClarity } from '../types';
import { calculateProductPrice, formatINR } from '../utils/pricing';
import { PriceBreakupModal } from '../components/PriceBreakupModal';
import { RingSizeModal } from '../components/RingSizeModal';
import { AdBanner } from '../components/AdBanner';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.id === id || p.slug === id) || PRODUCTS[0];

  const {
    addToCart,
    isInWishlist,
    toggleWishlist,
    isQueuedForTryAtHome,
    toggleTryAtHomeQueue,
    userPincode,
    setIsPincodeModalOpen,
    showToast,
  } = useApp();

  // Customization state
  const [selectedKarat, setSelectedKarat] = useState<GoldKarat>(product.defaultKarat);
  const [selectedColor, setSelectedColor] = useState<MetalColor>(product.defaultColor);
  const [selectedClarity, setSelectedClarity] = useState<DiamondClarity>(product.defaultClarity);
  const [selectedRingSize, setSelectedRingSize] = useState<number>(12);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [is360Mode, setIs360Mode] = useState<boolean>(false);
  const [rotationAngle, setRotationAngle] = useState<number>(0);

  // Modals
  const [isPriceBreakupOpen, setIsPriceBreakupOpen] = useState(false);
  const [isRingSizeGuideOpen, setIsRingSizeGuideOpen] = useState(false);

  // Dynamic pricing
  const pricing = useMemo(() => {
    return calculateProductPrice(product, selectedKarat, selectedClarity);
  }, [product, selectedKarat, selectedClarity]);

  const isFavorited = isInWishlist(product.id);
  const isTahSelected = isQueuedForTryAtHome(product.id);

  const handleAddToCart = () => {
    addToCart(
      product,
      selectedKarat,
      selectedColor,
      selectedClarity,
      product.category === 'rings' ? selectedRingSize : undefined,
      1
    );
  };

  const handleBuyNow = () => {
    addToCart(
      product,
      selectedKarat,
      selectedColor,
      selectedClarity,
      product.category === 'rings' ? selectedRingSize : undefined,
      1
    );
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7FC]">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-purple-100 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <Link to="/" className="hover:text-[#4F3267]">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/category/${product.category}`} className="capitalize hover:text-[#4F3267]">
              {product.category}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium truncate max-w-xs">{product.title}</span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1 hover:text-[#4F3267] text-gray-500 font-medium"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8 w-full flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image Gallery & 360 viewer */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-square bg-white rounded-2xl border border-purple-100 overflow-hidden shadow-xs flex items-center justify-center">
            {is360Mode ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none bg-radial from-purple-50 to-white">
                <div
                  className="w-72 h-72 transition-transform duration-75 cursor-grab active:cursor-grabbing flex items-center justify-center"
                  style={{ transform: `rotate(${rotationAngle}deg)` }}
                  onMouseDown={(e) => {
                    const startX = e.clientX;
                    const onMove = (me: MouseEvent) => {
                      const delta = me.clientX - startX;
                      setRotationAngle((prev) => (prev + delta * 0.5) % 360);
                    };
                    const onUp = () => {
                      window.removeEventListener('mousemove', onMove);
                      window.removeEventListener('mouseup', onUp);
                    };
                    window.addEventListener('mousemove', onMove);
                    window.addEventListener('mouseup', onUp);
                  }}
                >
                  <img
                    src={product.images[activeImageIndex] || product.images[0]}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain pointer-events-none drop-shadow-md"
                  />
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#4F3267] bg-purple-50 px-3 py-1.5 rounded-full border border-purple-200">
                  <Rotate3d className="w-4 h-4" />
                  <span>Drag left or right to rotate 360°</span>
                </div>
              </div>
            ) : (
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            )}

            {/* Badges overlay */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              <span className="text-[10px] font-bold tracking-wider uppercase bg-[#4F3267] text-white px-2.5 py-1 rounded shadow-xs">
                BIS 750 Hallmarked
              </span>
              <span className="text-[10px] font-semibold bg-white/95 text-gray-800 px-2 py-0.5 rounded border border-gray-200 backdrop-blur-xs">
                {product.dispatchTime}
              </span>
            </div>

            {/* 360 view switch toggle */}
            <button
              onClick={() => setIs360Mode(!is360Mode)}
              className={`absolute bottom-4 right-4 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all ${
                is360Mode
                  ? 'bg-[#4F3267] text-white'
                  : 'bg-white/90 text-gray-800 hover:bg-white border border-gray-200'
              }`}
            >
              <Rotate3d className="w-4 h-4 text-purple-600" />
              <span>{is360Mode ? 'Static View' : 'Interactive 360°'}</span>
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveImageIndex(idx);
                  setIs360Mode(false);
                }}
                className={`w-18 h-18 rounded-xl overflow-hidden bg-white border-2 transition-all shrink-0 ${
                  activeImageIndex === idx && !is360Mode
                    ? 'border-[#4F3267] ring-2 ring-[#4F3267]/20'
                    : 'border-transparent hover:border-purple-200'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Blank square video space required: "If there is an area for a YouTube video link or thumbnail that takes you to YouTube, just put a blank square space there." */}
          <div className="p-4 bg-white rounded-xl border border-purple-100 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-gray-900 block">Expert Product Review & Video</span>
              <span className="text-[11px] text-gray-500">Styling guide & close-up inspection on hand</span>
            </div>
            {/* Blank square space per requirement */}
            <div
              className="w-20 h-20 bg-[#FAF7FC] border border-purple-200 rounded-lg flex items-center justify-center shrink-0"
              aria-label="Video presentation space"
            >
              <Sparkles className="w-5 h-5 text-purple-300" />
            </div>
          </div>
        </div>

        {/* Right Column: Customization & Purchase Module */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-purple-100 shadow-xs space-y-6">
          {/* Header & Rating */}
          <div>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>CaratGems Signature · {product.subCategory}</span>
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{product.rating}</span>
                <span className="text-gray-400 font-normal">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-xl md:text-2xl font-serif font-bold text-gray-900 leading-snug">
              {product.title}
            </h1>
          </div>

          {/* Pricing Row */}
          <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-bold text-gray-900 tabular-nums">
                {formatINR(pricing.total)}
              </span>
              <span className="text-xs text-gray-400 line-through tabular-nums">
                {formatINR(pricing.originalTotal)}
              </span>
              <span className="text-xs font-bold text-emerald-600">
                Save {product.discountPercent}%
              </span>
            </div>
            <div className="flex items-center justify-between mt-2 text-[11px] text-gray-500">
              <span>(Price includes 3% GST & Insured Transit)</span>
              <button
                onClick={() => setIsPriceBreakupOpen(true)}
                className="font-semibold text-[#4F3267] hover:underline flex items-center gap-1"
              >
                <Info className="w-3.5 h-3.5" />
                Price Breakup
              </button>
            </div>
          </div>

          {/* Customization Options */}
          <div className="space-y-4 pt-1">
            {/* 1. Metal Color */}
            <div>
              <div className="flex justify-between text-xs font-bold text-gray-800 mb-2">
                <span>Metal Tone</span>
                <span className="font-normal text-gray-500">{selectedColor} Gold</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'Yellow', name: 'Yellow Gold', colorClass: 'bg-[#F4D068]' },
                  { id: 'Rose', name: 'Rose Gold', colorClass: 'bg-[#E5A898]' },
                  { id: 'White', name: 'White Gold', colorClass: 'bg-[#E5E7EB]' },
                ].map((col) => (
                  <button
                    key={col.id}
                    onClick={() => setSelectedColor(col.id as MetalColor)}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      selectedColor === col.id
                        ? 'border-[#4F3267] bg-purple-50/60 text-[#4F3267]'
                        : 'border-gray-200 hover:border-purple-200 text-gray-700'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full ${col.colorClass} border border-black/10`} />
                    <span>{col.id}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Gold Karat Purity */}
            <div>
              <div className="flex justify-between text-xs font-bold text-gray-800 mb-2">
                <span>Gold Purity</span>
                <span className="font-normal text-gray-500">{selectedKarat} (BIS Certified)</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(['14KT', '18KT'] as GoldKarat[]).map((karat) => (
                  <button
                    key={karat}
                    onClick={() => setSelectedKarat(karat)}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                      selectedKarat === karat
                        ? 'border-[#4F3267] bg-purple-50/60 text-[#4F3267]'
                        : 'border-gray-200 hover:border-purple-200 text-gray-700'
                    }`}
                  >
                    {karat} Gold
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Diamond Clarity */}
            <div>
              <div className="flex justify-between text-xs font-bold text-gray-800 mb-2">
                <span>Diamond Quality</span>
                <span className="font-normal text-gray-500">{selectedClarity} (Certified)</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['IJ-SI', 'GH-VS', 'VVS-EF'] as DiamondClarity[]).map((clarity) => (
                  <button
                    key={clarity}
                    onClick={() => setSelectedClarity(clarity)}
                    className={`py-2 px-2.5 rounded-lg border text-xs font-semibold transition-all ${
                      selectedClarity === clarity
                        ? 'border-[#4F3267] bg-purple-50/60 text-[#4F3267]'
                        : 'border-gray-200 hover:border-purple-200 text-gray-700'
                    }`}
                  >
                    {clarity}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Ring Size (if category is rings) */}
            {product.category === 'rings' && (
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-gray-800 mb-2">
                  <span>Select Ring Size</span>
                  <button
                    onClick={() => setIsRingSizeGuideOpen(true)}
                    className="font-normal text-[#4F3267] hover:underline"
                  >
                    Interactive Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[8, 10, 12, 14, 16, 18, 20].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedRingSize(size)}
                      className={`w-9 h-9 rounded-lg border text-xs font-semibold transition-all tabular-nums ${
                        selectedRingSize === size
                          ? 'border-[#4F3267] bg-[#4F3267] text-white shadow-xs'
                          : 'border-gray-200 hover:border-purple-200 text-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pincode & Delivery Estimator */}
          <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/50 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#4F3267]" />
              <div>
                <span className="text-gray-500">Delivering to </span>
                <strong className="text-gray-900 font-semibold">{userPincode}</strong>
                <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
                  Est. Delivery by Tomorrow, 4:00 PM
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsPincodeModalOpen(true)}
              className="text-xs font-semibold text-[#4F3267] hover:underline"
            >
              Change
            </button>
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="py-3 px-4 bg-white border border-[#4F3267] text-[#4F3267] hover:bg-purple-50 text-xs font-bold rounded-xl transition-all"
              >
                Add to Bag
              </button>
              <button
                onClick={handleBuyNow}
                className="py-3 px-4 bg-[#4F3267] hover:bg-[#3D2153] text-white text-xs font-bold rounded-xl transition-all shadow-md"
              >
                Buy Now
              </button>
            </div>

            {/* Try at home button */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const res = toggleTryAtHomeQueue(product.id);
                  showToast(res.message);
                }}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                  isTahSelected
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-purple-50 text-[#4F3267] border-purple-200 hover:bg-purple-100'
                }`}
              >
                {isTahSelected ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Home Trial</span>
                  </>
                ) : (
                  <>
                    <Home className="w-4 h-4" />
                    <span>Book Free Try at Home</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-2.5 rounded-xl border transition-all ${
                  isFavorited
                    ? 'bg-rose-50 border-rose-200 text-rose-500'
                    : 'border-gray-200 hover:border-purple-200 text-gray-500'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Trust points */}
          <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-3 text-[11px] text-gray-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Certified Lab Diamond</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-600" />
              <span>BIS Hallmarked Pure Gold</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-blue-600" />
              <span>15-Day Money-Back Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-600" />
              <span>Free Insured Transit Courier</span>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Product Story */}
      <section className="max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-purple-100 space-y-6">
          <div>
            <h2 className="text-xl font-serif font-bold text-gray-900">
              Product Specifications & Details
            </h2>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-[#FAF7FC] rounded-lg">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Metal Weight</span>
              <span className="font-semibold text-gray-900 tabular-nums">~{product.goldWeightGrams} Grams</span>
            </div>
            <div className="p-3 bg-[#FAF7FC] rounded-lg">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Total Diamond Carat</span>
              <span className="font-semibold text-gray-900 tabular-nums">{product.diamondCarat} ct</span>
            </div>
            <div className="p-3 bg-[#FAF7FC] rounded-lg">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Diamond Count</span>
              <span className="font-semibold text-gray-900 tabular-nums">{product.diamondCount} Stones</span>
            </div>
            <div className="p-3 bg-[#FAF7FC] rounded-lg">
              <span className="text-gray-400 block text-[10px] uppercase font-bold">Gemological Lab</span>
              <span className="font-semibold text-gray-900">SGL / IGI Certified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <PriceBreakupModal
        isOpen={isPriceBreakupOpen}
        onClose={() => setIsPriceBreakupOpen(false)}
        product={product}
        selectedKarat={selectedKarat}
        selectedClarity={selectedClarity}
      />

      <RingSizeModal
        isOpen={isRingSizeGuideOpen}
        onClose={() => setIsRingSizeGuideOpen(false)}
        onSelectSize={(s) => setSelectedRingSize(s)}
        currentSize={selectedRingSize}
      />

      {/* Bottom Ad Section (As requested) */}
      <AdBanner />
    </div>
  );
};
