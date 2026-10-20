import { Product, GoldKarat, DiamondClarity } from '../types';

// Benchmark Indian bullion rates for realism
export const GOLD_RATE_18KT = 5620; // per gram
export const GOLD_RATE_14KT = 4380;
export const GOLD_RATE_22KT = 6850;

export const DIAMOND_RATE_GH_VS = 68000; // per carat
export const DIAMOND_RATE_IJ_SI = 52000;
export const DIAMOND_RATE_VVS_EF = 86000;

export function calculateProductPrice(
  product: Product,
  karat: GoldKarat,
  clarity: DiamondClarity
): {
  goldPrice: number;
  diamondPrice: number;
  makingCharges: number;
  subtotal: number;
  gst: number;
  total: number;
  originalTotal: number;
} {
  // Gold price
  let goldRate = GOLD_RATE_18KT;
  if (karat === '14KT') goldRate = GOLD_RATE_14KT;
  if (karat === '22KT') goldRate = GOLD_RATE_22KT;

  const goldPrice = Math.round(product.goldWeightGrams * goldRate);

  // Diamond price
  let diamondRate = DIAMOND_RATE_GH_VS;
  if (clarity === 'IJ-SI') diamondRate = DIAMOND_RATE_IJ_SI;
  if (clarity === 'VVS-EF') diamondRate = DIAMOND_RATE_VVS_EF;

  const diamondPrice = Math.round(product.diamondCarat * diamondRate);
  const makingCharges = product.makingCharges;

  const subtotal = goldPrice + diamondPrice + makingCharges;
  const gst = Math.round(subtotal * 0.03); // 3% Indian GST on fine jewelry
  const total = subtotal + gst;

  // Original total for discount display
  const markupMultiplier = 1 + product.discountPercent / 100;
  const originalTotal = Math.round(total * markupMultiplier);

  return {
    goldPrice,
    diamondPrice,
    makingCharges,
    subtotal,
    gst,
    total,
    originalTotal
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}
