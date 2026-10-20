import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product, CartItem, GoldKarat, MetalColor, DiamondClarity, TryAtHomeBooking, Order, Coupon } from '../types';
import { calculateProductPrice } from '../utils/pricing';
import { AVAILABLE_COUPONS } from '../data/mockData';

interface CartTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  gst: number;
  total: number;
  itemCount: number;
}

interface AppContextType {
  // Cart
  cart: CartItem[];
  addToCart: (
    product: Product,
    karat?: GoldKarat,
    color?: MetalColor,
    clarity?: DiamondClarity,
    ringSize?: number,
    quantity?: number
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  cartTotals: CartTotals;

  // Coupon
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Try At Home
  tryAtHomeQueue: string[];
  toggleTryAtHomeQueue: (productId: string) => { success: boolean; message: string };
  isQueuedForTryAtHome: (productId: string) => boolean;
  clearTryAtHomeQueue: () => void;
  tryAtHomeBookings: TryAtHomeBooking[];
  addTryAtHomeBooking: (booking: Omit<TryAtHomeBooking, 'bookingId' | 'createdAt' | 'status'>) => string;

  // Orders
  orders: Order[];
  placeOrder: (orderData: {
    customerName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    pincode: string;
    paymentMethod: string;
  }) => Order;
  getOrderById: (orderId: string) => Order | undefined;

  // Location / Pincode
  userPincode: string;
  setUserPincode: (pincode: string) => void;
  isPincodeModalOpen: boolean;
  setIsPincodeModalOpen: (open: boolean) => void;

  // Animation settings
  animationSpeed: 'SLOW' | 'NORMAL' | 'FAST' | 'OFF';
  setAnimationSpeed: (speed: 'SLOW' | 'NORMAL' | 'FAST' | 'OFF') => void;

  // Search History
  searchHistory: string[];
  addSearchTerm: (term: string) => void;
  clearSearchHistory: () => void;

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'caratgems_cart_v1',
  WISHLIST: 'caratgems_wishlist_v1',
  TRY_AT_HOME: 'caratgems_tah_queue_v1',
  TAH_BOOKINGS: 'caratgems_tah_bookings_v1',
  ORDERS: 'caratgems_orders_v1',
  PINCODE: 'caratgems_pincode_v1',
  ANIMATION: 'caratgems_anim_speed_v1',
  SEARCH_HISTORY: 'caratgems_search_hist_v1',
  COUPON: 'caratgems_coupon_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state with safe localStorage read
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CART);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [tryAtHomeQueue, setTryAtHomeQueue] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TRY_AT_HOME);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [tryAtHomeBookings, setTryAtHomeBookings] = useState<TryAtHomeBooking[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TAH_BOOKINGS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [userPincode, setUserPincodeState] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.PINCODE) || '110001'; // Default New Delhi Connaught Place
    } catch {
      return '110001';
    }
  });

  const [animationSpeed, setAnimationSpeedState] = useState<'SLOW' | 'NORMAL' | 'FAST' | 'OFF'>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ANIMATION);
      if (stored === 'SLOW' || stored === 'FAST' || stored === 'OFF') return stored;
      return 'NORMAL';
    } catch {
      return 'NORMAL';
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.COUPON);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
      return stored ? JSON.parse(stored) : ['Diamond Solitaire', '18KT Rings', 'Mangalsutra', 'Tennis Bracelet'];
    } catch {
      return ['Diamond Solitaire', '18KT Rings'];
    }
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isPincodeModalOpen, setIsPincodeModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Sync state changes with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TRY_AT_HOME, JSON.stringify(tryAtHomeQueue));
    } catch {}
  }, [tryAtHomeQueue]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TAH_BOOKINGS, JSON.stringify(tryAtHomeBookings));
    } catch {}
  }, [tryAtHomeBookings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PINCODE, userPincode);
    } catch {}
  }, [userPincode]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ANIMATION, animationSpeed);
    } catch {}
  }, [animationSpeed]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(STORAGE_KEYS.COUPON, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(STORAGE_KEYS.COUPON);
      }
    } catch {}
  }, [appliedCoupon]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(searchHistory));
    } catch {}
  }, [searchHistory]);

  const setUserPincode = (code: string) => {
    setUserPincodeState(code);
    showToast(`Delivery location set to ${code}`);
  };

  const setAnimationSpeed = (speed: 'SLOW' | 'NORMAL' | 'FAST' | 'OFF') => {
    setAnimationSpeedState(speed);
    showToast(`Animation speed set to ${speed}`);
  };

  // Cart operations
  const addToCart = (
    product: Product,
    karat: GoldKarat = product.defaultKarat,
    color: MetalColor = product.defaultColor,
    clarity: DiamondClarity = product.defaultClarity,
    ringSize?: number,
    quantity: number = 1
  ) => {
    const calculated = calculateProductPrice(product, karat, clarity);
    const cartItemId = `${product.id}-${karat}-${color}-${clarity}${ringSize ? `-${ringSize}` : ''}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          selectedKarat: karat,
          selectedColor: color,
          selectedClarity: clarity,
          selectedRingSize: ringSize,
          quantity,
          finalPrice: calculated.total,
        },
      ];
    });

    showToast(`Added "${product.title}" to your cart`);
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart');
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Coupons
  const applyCoupon = (code: string) => {
    const found = AVAILABLE_COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      return { success: false, message: 'Invalid coupon code. Try SPARKLE10 or FIRSTGIFT' };
    }
    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied successfully!`);
    return { success: true, message: `Applied ${found.code}!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Try At Home Queue
  const toggleTryAtHomeQueue = (productId: string) => {
    if (tryAtHomeQueue.includes(productId)) {
      setTryAtHomeQueue((prev) => prev.filter((id) => id !== productId));
      return { success: true, message: 'Removed from Home Trial selection' };
    } else {
      if (tryAtHomeQueue.length >= 5) {
        return { success: false, message: 'You can select up to 5 designs for a free Home Trial session.' };
      }
      setTryAtHomeQueue((prev) => [...prev, productId]);
      return { success: true, message: 'Added to your Home Trial selection!' };
    }
  };

  const isQueuedForTryAtHome = (productId: string) => tryAtHomeQueue.includes(productId);

  const clearTryAtHomeQueue = () => setTryAtHomeQueue([]);

  const addTryAtHomeBooking = (booking: Omit<TryAtHomeBooking, 'bookingId' | 'createdAt' | 'status'>) => {
    const bookingId = `CG-TAH-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking: TryAtHomeBooking = {
      ...booking,
      bookingId,
      createdAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Confirmed',
    };
    setTryAtHomeBookings((prev) => [newBooking, ...prev]);
    clearTryAtHomeQueue();
    return bookingId;
  };

  // Orders
  const placeOrder = (orderData: {
    customerName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    pincode: string;
    paymentMethod: string;
  }) => {
    const orderId = `CG-${Date.now().toString().slice(-6)}`;
    const newOrder: Order = {
      orderId,
      items: [...cart],
      subtotal: cartTotals.subtotal,
      discount: cartTotals.discount,
      gst: cartTotals.gst,
      shipping: 0,
      total: cartTotals.total,
      ...orderData,
      stages: [
        { title: 'Order Confirmed', subtitle: 'Payment verified & diamond allocated', completed: true, timestamp: 'Today' },
        { title: 'Diamond & Gold Verification', subtitle: 'Gemological QA & weight inspection', completed: true, timestamp: 'In progress' },
        { title: 'BIS Hallmarking', subtitle: 'Government certified stamp & certificate card', completed: false },
        { title: 'Insured Dispatch', subtitle: 'Handover to secure armoured express partner', completed: false },
        { title: 'Delivered', subtitle: 'OTP verified handover to customer', completed: false }
      ],
      createdAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.orderId.toUpperCase() === orderId.trim().toUpperCase());
  };

  // Search history
  const addSearchTerm = (term: string) => {
    if (!term.trim()) return;
    setSearchHistory((prev) => {
      const filtered = prev.filter((t) => t.toLowerCase() !== term.toLowerCase());
      return [term.trim(), ...filtered].slice(0, 8);
    });
  };

  const clearSearchHistory = () => setSearchHistory([]);

  // Calculate cart totals
  const cartTotals: CartTotals = useMemo(() => {
    let subtotal = 0;
    let itemCount = 0;

    cart.forEach((item) => {
      subtotal += item.finalPrice * item.quantity;
      itemCount += item.quantity;
    });

    let discount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.discountType === 'percentage') {
        discount = Math.round((subtotal * appliedCoupon.value) / 100);
      } else {
        discount = appliedCoupon.value;
      }
    }

    const discountedSubtotal = Math.max(0, subtotal - discount);
    // GST 3% included in fine jewellery pricing or computed
    const gst = Math.round(discountedSubtotal * 0.03);
    const shipping = 0; // Free Insured Shipping nationwide
    const total = discountedSubtotal + gst;

    return {
      subtotal,
      discount,
      shipping,
      gst,
      total,
      itemCount,
    };
  }, [cart, appliedCoupon]);

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        cartTotals,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        tryAtHomeQueue,
        toggleTryAtHomeQueue,
        isQueuedForTryAtHome,
        clearTryAtHomeQueue,
        tryAtHomeBookings,
        addTryAtHomeBooking,
        orders,
        placeOrder,
        getOrderById,
        userPincode,
        setUserPincode,
        isPincodeModalOpen,
        setIsPincodeModalOpen,
        animationSpeed,
        setAnimationSpeed,
        searchHistory,
        addSearchTerm,
        clearSearchHistory,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
