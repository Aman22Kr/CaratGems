import { Product, StoreLocation, Coupon } from '../types';

import heroImg from '../assets/images/hero_caratgems_luxury_1792488921441.jpg';
import ringDiamondImg from '../assets/images/category_rings_diamond_1792488921829.jpg';
import earringsImg from '../assets/images/category_earrings_studs_1792488921962.jpg';
import necklaceImg from '../assets/images/category_necklace_pendant_1792488922571.jpg';
import tryAtHomeImg from '../assets/images/try_at_home_experience_1792488924112.jpg';
import braceletImg from '../assets/images/category_bracelet_tennis_1792488988204.jpg';
import mangalsutraImg from '../assets/images/category_mangalsutra_diamond_1792488988524.jpg';
import solitaireRingImg from '../assets/images/collection_solitaire_luxe_1792488988735.jpg';

export const ASSETS = {
  heroBanner: heroImg,
  ringDiamond: ringDiamondImg,
  earrings: earringsImg,
  necklace: necklaceImg,
  tryAtHome: tryAtHomeImg,
  bracelet: braceletImg,
  mangalsutra: mangalsutraImg,
  solitaireRing: solitaireRingImg,
};

export const CATEGORIES_NAV = [
  { id: 'rings', name: 'Rings', icon: 'Sparkles', count: 184, subcategories: ['Solitaire Rings', 'Daily Wear Rings', 'Engagement Rings', 'Couple Bands', 'Cocktail Rings'] },
  { id: 'earrings', name: 'Earrings', icon: 'Gem', count: 240, subcategories: ['Studs', 'Drops & Danglers', 'Hoops & Huggies', 'Jhumkas', 'Suidhaga'] },
  { id: 'solitaires', name: 'Solitaires', icon: 'Diamond', count: 96, subcategories: ['Solitaire Rings', 'Solitaire Pendants', 'Solitaire Studs', 'Customize Solitaire'] },
  { id: 'mangalsutras', name: 'Mangalsutras', icon: 'Heart', count: 72, subcategories: ['Modern Mangalsutras', 'Infinity Designs', 'Bracelet Mangalsutras', 'Traditional Diamond'] },
  { id: 'necklaces', name: 'Necklaces', icon: 'Flame', count: 120, subcategories: ['Chains & Collars', 'Diamond Pendants', 'Lariat Necklaces', 'Layered Sets'] },
  { id: 'bracelets', name: 'Bracelets', icon: 'CircleDot', count: 85, subcategories: ['Tennis Bracelets', 'Charm Bracelets', 'Flexible Bangles', 'Daily Cuffs'] },
];

export const PRODUCTS: Product[] = [
  {
    id: 'cg-ring-01',
    title: 'Aura Bloom Solitaire Diamond Ring',
    slug: 'aura-bloom-solitaire-diamond-ring',
    category: 'rings',
    subCategory: 'Solitaire Rings',
    basePrice: 38500,
    originalPrice: 43900,
    discountPercent: 12,
    rating: 4.9,
    reviewCount: 142,
    images: [ringDiamondImg, solitaireRingImg],
    isBestSeller: true,
    isNew: true,
    isTryAtHome: true,
    dispatchTime: 'Express 24-48 Hours',
    defaultKarat: '18KT',
    defaultColor: 'Rose',
    defaultClarity: 'GH-VS',
    diamondCarat: 0.35,
    diamondCount: 21,
    goldWeightGrams: 2.85,
    makingCharges: 4200,
    description: 'A signature CaratGems masterpiece featuring a scintillating round brilliant centre diamond held in a petal prong setting, adorned with micro-pavé diamonds along the contoured shank.',
    certifications: ['SGL Diamond Certificate', 'BIS 750 Hallmarked Gold', 'Zero-Conflict Sourcing'],
    tags: ['Engagement', 'Gift For Her', 'Bestseller', 'Solitaire'],
    reviews: [
      { id: 'r1', userName: 'Ananya Sharma', rating: 5, date: '14 Oct 2026', comment: 'The rose gold finish is ethereal! Ordered for my engagement and it looks identical to the photos. Packaging was luxurious.', city: 'Bengaluru', verifiedPurchase: true },
      { id: 'r2', userName: 'Rohan Mehra', rating: 5, date: '02 Oct 2026', comment: 'Surprised my fiancé with this ring. Sizing was exact (Size 12) and delivery arrived in 48 hours!', city: 'Mumbai', verifiedPurchase: true },
      { id: 'r3', userName: 'Pooja Iyer', rating: 4, date: '21 Sep 2026', comment: 'Sparkles brilliantly under direct light. Very comfortable for everyday wear.', city: 'Chennai', verifiedPurchase: true }
    ]
  },
  {
    id: 'cg-earring-01',
    title: 'Dewdrop Celestial Diamond Drop Earrings',
    slug: 'dewdrop-celestial-diamond-drop-earrings',
    category: 'earrings',
    subCategory: 'Drops & Danglers',
    basePrice: 29800,
    originalPrice: 34500,
    discountPercent: 14,
    rating: 4.8,
    reviewCount: 98,
    images: [earringsImg, heroImg],
    isBestSeller: true,
    isTryAtHome: true,
    dispatchTime: 'Express 24-48 Hours',
    defaultKarat: '18KT',
    defaultColor: 'White',
    defaultClarity: 'GH-VS',
    diamondCarat: 0.42,
    diamondCount: 36,
    goldWeightGrams: 3.4,
    makingCharges: 4600,
    description: 'Suspended in graceful movement, these luminous pear-cut diamond drops with halo accents reflect light with high drama. Crafted in nickel-safe 18KT white gold with secure friction push backs.',
    certifications: ['IGI Diamond Certificate', 'BIS 750 Hallmarked Gold'],
    tags: ['Wedding', 'Cocktail', 'Earrings', 'White Gold'],
    reviews: [
      { id: 're1', userName: 'Meera Kapoor', rating: 5, date: '08 Oct 2026', comment: 'Wore these for my sister’s reception and received endless compliments! Lightweight on ears.', city: 'Delhi NCR', verifiedPurchase: true }
    ]
  },
  {
    id: 'cg-solitaire-01',
    title: 'The Sovereign Cushion Solitaire Ring',
    slug: 'the-sovereign-cushion-solitaire-ring',
    category: 'solitaires',
    subCategory: 'Solitaire Rings',
    basePrice: 72400,
    originalPrice: 85000,
    discountPercent: 15,
    rating: 5.0,
    reviewCount: 64,
    images: [solitaireRingImg, ringDiamondImg],
    isBestSeller: true,
    isNew: false,
    isTryAtHome: true,
    dispatchTime: 'Made to Order - 5 Days',
    defaultKarat: '18KT',
    defaultColor: 'Yellow',
    defaultClarity: 'VVS-EF',
    diamondCarat: 0.75,
    diamondCount: 1,
    goldWeightGrams: 3.9,
    makingCharges: 6800,
    description: 'An investment-grade cushion cut solitaire diamond set on a regal 18KT gold comfort-fit band. Laser inscribed with unique diamond certification number on the girdle.',
    certifications: ['GIA Diamond Inscription', 'BIS 750 Hallmarked Gold', 'Lifetime Exchange'],
    tags: ['Solitaire', 'Luxury', 'Engagement', 'Anniversary'],
    reviews: [
      { id: 'rs1', userName: 'Vikram Singhania', rating: 5, date: '18 Sep 2026', comment: 'Unmatched clarity and fire. The GIA certificate gave total confidence.', city: 'Hyderabad', verifiedPurchase: true }
    ]
  },
  {
    id: 'cg-neck-01',
    title: 'Petite Radiance Solitaire Diamond Pendant',
    slug: 'petite-radiance-solitaire-diamond-pendant',
    category: 'necklaces',
    subCategory: 'Diamond Pendants',
    basePrice: 21900,
    originalPrice: 25500,
    discountPercent: 14,
    rating: 4.9,
    reviewCount: 210,
    images: [necklaceImg, heroImg],
    isBestSeller: true,
    isTryAtHome: true,
    dispatchTime: 'Express 24-48 Hours',
    defaultKarat: '18KT',
    defaultColor: 'Yellow',
    defaultClarity: 'GH-VS',
    diamondCarat: 0.22,
    diamondCount: 8,
    goldWeightGrams: 2.1,
    makingCharges: 3100,
    description: 'Designed for daily understated elegance, a floral cluster of round cut diamonds suspended on an adjustable 16-18 inch delicate gold cable chain.',
    certifications: ['SGL Certificate', 'BIS 750 Hallmarked'],
    tags: ['Everyday Luxe', 'Gift For Her', 'Daily Wear'],
    reviews: [
      { id: 'rn1', userName: 'Kavita Nair', rating: 5, date: '12 Oct 2026', comment: 'Wear this to office every single day. Dainty, durable, and so chic.', city: 'Kochi', verifiedPurchase: true }
    ]
  },
  {
    id: 'cg-mang-01',
    title: 'Nitya Modern Diamond Floral Mangalsutra',
    slug: 'nitya-modern-diamond-floral-mangalsutra',
    category: 'mangalsutras',
    subCategory: 'Modern Mangalsutras',
    basePrice: 34200,
    originalPrice: 39900,
    discountPercent: 14,
    rating: 4.9,
    reviewCount: 87,
    images: [mangalsutraImg, necklaceImg],
    isBestSeller: true,
    isTryAtHome: true,
    dispatchTime: 'Express 24-48 Hours',
    defaultKarat: '18KT',
    defaultColor: 'Yellow',
    defaultClarity: 'GH-VS',
    diamondCarat: 0.38,
    diamondCount: 7,
    goldWeightGrams: 3.65,
    makingCharges: 4500,
    description: 'Reimagining sacred tradition for the modern woman. Features a sparkling diamond flower pendant flanked by dual auspicious black bead rows on 18KT gold.',
    certifications: ['BIS 750 Hallmarked', 'SGL Diamond Certificate'],
    tags: ['Modern Mangalsutra', 'Wedding', 'Auspicious'],
    reviews: [
      { id: 'rm1', userName: 'Divya Reddy', rating: 5, date: '05 Oct 2026', comment: 'Exactly what I wanted for western office wear! Very lightweight yet meaningful.', city: 'Hyderabad', verifiedPurchase: true }
    ]
  },
  {
    id: 'cg-brace-01',
    title: 'Eternity Sparkle Diamond Tennis Bracelet',
    slug: 'eternity-sparkle-diamond-tennis-bracelet',
    category: 'bracelets',
    subCategory: 'Tennis Bracelets',
    basePrice: 89500,
    originalPrice: 105000,
    discountPercent: 15,
    rating: 5.0,
    reviewCount: 43,
    images: [braceletImg, heroImg],
    isBestSeller: true,
    isTryAtHome: true,
    dispatchTime: 'Express 24-48 Hours',
    defaultKarat: '18KT',
    defaultColor: 'White',
    defaultClarity: 'GH-VS',
    diamondCarat: 1.15,
    diamondCount: 52,
    goldWeightGrams: 7.2,
    makingCharges: 9800,
    description: 'An iconic symbol of timeless glamour. A continuous line of individually hand-set brilliant cut diamonds in a flexible four-prong 18KT white gold link with double safety lock.',
    certifications: ['IGI Diamond Certificate', 'BIS 750 Hallmarked Gold', 'Lifetime Polish Guarantee'],
    tags: ['Tennis Bracelet', 'Luxury', 'Diamond Classic'],
    reviews: [
      { id: 'rb1', userName: 'Sneha Deshmukh', rating: 5, date: '28 Sep 2026', comment: 'The clasp is extremely secure and the sparkle is unmatched. A dream piece!', city: 'Pune', verifiedPurchase: true }
    ]
  },
  {
    id: 'cg-ring-02',
    title: 'Entwined Eternity Diamond Band',
    slug: 'entwined-eternity-diamond-band',
    category: 'rings',
    subCategory: 'Couple Bands',
    basePrice: 26400,
    originalPrice: 31000,
    discountPercent: 15,
    rating: 4.7,
    reviewCount: 76,
    images: [ringDiamondImg, solitaireRingImg],
    isBestSeller: false,
    isTryAtHome: true,
    dispatchTime: 'Express 24-48 Hours',
    defaultKarat: '14KT',
    defaultColor: 'Rose',
    defaultClarity: 'IJ-SI',
    diamondCarat: 0.18,
    diamondCount: 16,
    goldWeightGrams: 2.4,
    makingCharges: 3200,
    description: 'Two interlocking ribbons of lustrous rose gold and pavé diamonds, symbolising infinite love and intertwined journeys.',
    certifications: ['BIS Hallmarked', 'SGL Certified'],
    tags: ['Bands', 'Anniversary', 'Daily Wear'],
    reviews: []
  },
  {
    id: 'cg-earring-02',
    title: 'Lumina Diamond Huggie Hoop Earrings',
    slug: 'lumina-diamond-huggie-hoop-earrings',
    category: 'earrings',
    subCategory: 'Hoops & Huggies',
    basePrice: 19500,
    originalPrice: 22800,
    discountPercent: 14,
    rating: 4.8,
    reviewCount: 112,
    images: [earringsImg, heroImg],
    isBestSeller: true,
    isTryAtHome: true,
    dispatchTime: 'Express 24-48 Hours',
    defaultKarat: '14KT',
    defaultColor: 'Yellow',
    defaultClarity: 'IJ-SI',
    diamondCarat: 0.15,
    diamondCount: 14,
    goldWeightGrams: 1.95,
    makingCharges: 2800,
    description: 'Hugs the earlobe with subtle sparkle. Click-lock hinge for effortless daily wear that never snags on clothing or hair.',
    certifications: ['BIS Hallmarked', 'SGL Certified'],
    tags: ['Huggies', 'Office Wear', 'Under 20k'],
    reviews: []
  },
  {
    id: 'cg-solitaire-02',
    title: 'Classic 6-Prong Tiffany Solitaire Ring',
    slug: 'classic-6-prong-tiffany-solitaire-ring',
    category: 'solitaires',
    subCategory: 'Solitaire Rings',
    basePrice: 58900,
    originalPrice: 67000,
    discountPercent: 12,
    rating: 4.9,
    reviewCount: 51,
    images: [solitaireRingImg, ringDiamondImg],
    isBestSeller: false,
    isTryAtHome: true,
    dispatchTime: 'Made to Order - 5 Days',
    defaultKarat: '18KT',
    defaultColor: 'White',
    defaultClarity: 'GH-VS',
    diamondCarat: 0.50,
    diamondCount: 1,
    goldWeightGrams: 3.2,
    makingCharges: 5200,
    description: 'The definitive solitaire silhouette. Elevates the central diamond into the light with knife-edge shoulders in pure 18KT white gold.',
    certifications: ['IGI Certificate', 'BIS 750 Hallmarked'],
    tags: ['Solitaire', 'Engagement', 'Classic'],
    reviews: []
  },
  {
    id: 'cg-neck-02',
    title: 'Infinity Halo Diamond Lariat Necklace',
    slug: 'infinity-halo-diamond-lariat-necklace',
    category: 'necklaces',
    subCategory: 'Lariat Necklaces',
    basePrice: 41200,
    originalPrice: 47900,
    discountPercent: 14,
    rating: 4.8,
    reviewCount: 38,
    images: [necklaceImg, heroImg],
    isBestSeller: false,
    isTryAtHome: true,
    dispatchTime: 'Express 24-48 Hours',
    defaultKarat: '18KT',
    defaultColor: 'Rose',
    defaultClarity: 'GH-VS',
    diamondCarat: 0.32,
    diamondCount: 24,
    goldWeightGrams: 3.8,
    makingCharges: 4800,
    description: 'An elongated Y-drop silhouette with pavé-set diamond rings that glide along an 18KT rose gold cable chain for an alluring neckline accent.',
    certifications: ['BIS Hallmarked', 'SGL Certified'],
    tags: ['Statement', 'Cocktail', 'Rose Gold'],
    reviews: []
  },
  {
    id: 'cg-brace-02',
    title: 'Aarohi Diamond Mangalsutra Bracelet',
    slug: 'aarohi-diamond-mangalsutra-bracelet',
    category: 'bracelets',
    subCategory: 'Charm Bracelets',
    basePrice: 27800,
    originalPrice: 32000,
    discountPercent: 13,
    rating: 4.9,
    reviewCount: 62,
    images: [mangalsutraImg, braceletImg],
    isBestSeller: true,
    isTryAtHome: true,
    dispatchTime: 'Express 24-48 Hours',
    defaultKarat: '18KT',
    defaultColor: 'Yellow',
    defaultClarity: 'GH-VS',
    diamondCarat: 0.20,
    diamondCount: 12,
    goldWeightGrams: 2.9,
    makingCharges: 3600,
    description: 'Adorn your wrist with the auspicious black beads and a brilliant diamond infinity motif. Features an adjustable sliding ball closure for all wrist sizes.',
    certifications: ['BIS Hallmarked', 'SGL Certified'],
    tags: ['Mangalsutra Bracelet', 'Modern Bride', 'Auspicious'],
    reviews: []
  },
  {
    id: 'cg-ring-03',
    title: 'Noor Emerald & Diamond Cocktail Ring',
    slug: 'noor-emerald-and-diamond-cocktail-ring',
    category: 'rings',
    subCategory: 'Cocktail Rings',
    basePrice: 48600,
    originalPrice: 56000,
    discountPercent: 13,
    rating: 4.9,
    reviewCount: 39,
    images: [ringDiamondImg, solitaireRingImg],
    isBestSeller: false,
    isTryAtHome: true,
    dispatchTime: 'Express 24-48 Hours',
    defaultKarat: '18KT',
    defaultColor: 'Yellow',
    defaultClarity: 'GH-VS',
    diamondCarat: 0.38,
    diamondCount: 28,
    goldWeightGrams: 4.1,
    makingCharges: 5800,
    description: 'A vivid natural Zambian green emerald framed by brilliant cut diamond halo in royal yellow gold.',
    certifications: ['IGI Certificate', 'BIS 750 Hallmarked'],
    tags: ['Gemstone', 'Cocktail', 'Statement'],
    reviews: []
  }
];

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: 'store-delhi-01',
    name: 'CaratGems South Extension I',
    city: 'New Delhi',
    state: 'Delhi',
    address: 'G-14, Main Market, South Extension Part 1',
    pincode: '110049',
    phone: '+91 11 4102 8820',
    timings: '11:00 AM - 8:30 PM (Open All 7 Days)',
    featuredServices: ['Try at Home Hub', 'Solitaire Lounge', 'Gold Exchange', 'Complimentary Cleaning'],
    image: tryAtHomeImg
  },
  {
    id: 'store-mumbai-01',
    name: 'CaratGems Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'Hill Road, Near Mehboob Studio, Bandra West',
    pincode: '400050',
    phone: '+91 22 2640 4490',
    timings: '11:00 AM - 9:00 PM (Open All 7 Days)',
    featuredServices: ['VIP Styling Studio', 'Custom Engagement Ring Design', 'Certified Diamond Grading', 'Quick Ring Resizing'],
    image: tryAtHomeImg
  },
  {
    id: 'store-blr-01',
    name: 'CaratGems Indiranagar 100ft Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    address: '#754, 100 Feet Rd, HAL 2nd Stage, Indiranagar',
    pincode: '560038',
    phone: '+91 80 4120 7733',
    timings: '10:30 AM - 8:30 PM (Open All 7 Days)',
    featuredServices: ['Try at Home Base', 'Everyday Luxe Bar', 'Gold Karat Testing', 'Same-day Pickup'],
    image: tryAtHomeImg
  },
  {
    id: 'store-hyd-01',
    name: 'CaratGems Jubilee Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    address: 'Road No. 36, Beside Peddamma Temple Metro, Jubilee Hills',
    pincode: '500033',
    phone: '+91 40 2355 8812',
    timings: '11:00 AM - 9:00 PM (Open All 7 Days)',
    featuredServices: ['Solitaire Specialist', 'Bridal Consultation', 'Jewellery Insurance Claim Desk'],
    image: tryAtHomeImg
  },
  {
    id: 'store-chn-01',
    name: 'CaratGems T. Nagar',
    city: 'Chennai',
    state: 'Tamil Nadu',
    address: 'Usman Road, Opp Panagal Park, T. Nagar',
    pincode: '600017',
    phone: '+91 44 2815 1190',
    timings: '10:00 AM - 8:30 PM (Open All 7 Days)',
    featuredServices: ['Traditional Mangalsutra Bar', 'Exchange Old Gold for Diamonds', 'Instant Hallmarking Verification'],
    image: tryAtHomeImg
  },
  {
    id: 'store-pun-01',
    name: 'CaratGems Phoenix Marketcity',
    city: 'Pune',
    state: 'Maharashtra',
    address: 'Ground Floor, Phoenix Marketcity, Viman Nagar',
    pincode: '411014',
    phone: '+91 20 6689 3320',
    timings: '11:00 AM - 9:30 PM (Open All 7 Days)',
    featuredServices: ['Try at Home Service', 'Stylist On Demand', 'Gift Packaging Station'],
    image: tryAtHomeImg
  }
];

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'SPARKLE10',
    discountType: 'percentage',
    value: 10,
    minSpend: 25000,
    description: 'Get 10% OFF on fine diamond value across all collections'
  },
  {
    code: 'FIRSTGIFT',
    discountType: 'flat',
    value: 1500,
    minSpend: 15000,
    description: 'Flat ₹1,500 OFF on your first fine jewellery purchase'
  },
  {
    code: 'CARATGEMS',
    discountType: 'percentage',
    value: 5,
    description: 'Extra 5% OFF on prepaid online orders'
  }
];

export const FAQS = [
  {
    category: 'Try at Home',
    question: 'How does the free CaratGems Try at Home service work?',
    answer: 'Select up to 5 jewellery designs you love on the website and pick your preferred date and time slot. Our certified jewellery consultant brings the trial kit directly to your doorstep in an insured presentation box. You can try the pieces in person with zero purchase obligation!'
  },
  {
    category: 'Try at Home',
    question: 'Is there any service charge or hidden fee for Home Trial?',
    answer: 'None at all! The Try at Home service is 100% free with no deposit and no obligation to buy. We serve over 40+ major Indian cities.'
  },
  {
    category: 'Quality & Gold',
    question: 'Are CaratGems diamonds and gold certified?',
    answer: 'Yes, 100%. All our gold jewellery carries the official BIS Hallmark stamp verifying exact karat purity (14KT, 18KT, or 22KT). Every diamond is graded by independent premier gemmological labs such as SGL, IGI, or GIA and includes a certificate card.'
  },
  {
    category: 'Shipping & Delivery',
    question: 'How fast will my order be dispatched?',
    answer: 'Designs marked with "Express 24-48 Hours" are in stock in our regional fulfillment hubs and dispatch within 2 business days. Personalized or made-to-order solitaires ship in 5-7 business days via fully insured courier partners with real-time tracking.'
  },
  {
    category: 'Returns & Exchange',
    question: 'What is your return and lifetime exchange policy?',
    answer: 'We offer a hassle-free 15-day 100% money-back guarantee with doorstep pickup. Furthermore, all CaratGems jewellery comes with Lifetime Exchange: receive 100% of gold value at prevailing rates and 90% of diamond value anytime in the future.'
  },
  {
    category: 'Ring Sizing',
    question: 'How do I know my correct ring size?',
    answer: 'Use our online Interactive Ring Size Guide on any ring product page. You can measure an existing ring against the screen scale or use a thread/strip measurement in mm. If the size does not fit, we provide 1 complimentary resizing within 30 days of purchase.'
  }
];

export const TRUST_PILLARS = [
  {
    title: '100% Certified Diamonds',
    desc: 'Independently certified by SGL, IGI, & GIA laboratories.',
    icon: 'ShieldCheck'
  },
  {
    title: 'BIS Hallmarked Gold',
    desc: 'Government stamped hallmarked purity on every gram.',
    icon: 'Award'
  },
  {
    title: 'Free Insured Delivery',
    desc: 'Transit insurance coverage until it reaches your hands.',
    icon: 'Truck'
  },
  {
    title: '15-Day Money Back',
    desc: 'Zero-question returns with 100% refund guarantee.',
    icon: 'RefreshCw'
  },
  {
    title: 'Lifetime Exchange',
    desc: 'Trade in or upgrade your jewellery anytime at store or home.',
    icon: 'Repeat'
  }
];
