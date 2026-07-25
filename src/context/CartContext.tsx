'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from '@/data/menu';

export interface CartItem {
  id: string; // unique identifier (food_id + options hash or timestamp)
  food_id: number;
  name: string;
  price: number; // calculated unit price (base + variation + addons + fbt)
  orig_price?: number;
  image: string;
  note?: string;
  qty: number;
  optionsDescription?: string; // string summarizing selected size/addons
}

interface CartContextType {
  cart: CartItem[];
  orderType: 'delivery' | 'pickup';
  setOrderType: (type: 'delivery' | 'pickup') => void;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  activeMenuItem: MenuItem | null;
  openMenuItemModal: (item: MenuItem) => void;
  closeMenuItemModal: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  getWhatsappLink: (phone: string, address?: string) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = 'kashmira_cart';
const ORDER_TYPE_KEY = 'kashmira_order_type';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderType, setOrderTypeState] = useState<'delivery' | 'pickup'>('delivery');
  const [activeMenuItem, setActiveMenuItem] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_KEY);
      if (storedCart) setCart(JSON.parse(storedCart));
      const storedType = localStorage.getItem(ORDER_TYPE_KEY);
      if (storedType === 'pickup' || storedType === 'delivery') {
        setOrderTypeState(storedType);
      }
    } catch (e) {
      console.error('Error loading cart data', e);
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart data', e);
    }
  }, [cart, isLoaded]);

  const setOrderType = (type: 'delivery' | 'pickup') => {
    setOrderTypeState(type);
    try {
      localStorage.setItem(ORDER_TYPE_KEY, type);
    } catch (e) {
      console.error('Error saving order type', e);
    }
  };

  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    setCart((prevCart) => {
      // Find if an item with the same food_id AND same custom options already exists
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.food_id === newItem.food_id &&
          item.optionsDescription === newItem.optionsDescription &&
          item.note === newItem.note
      );

      if (existingIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].qty += newItem.qty;
        return updatedCart;
      } else {
        const uniqueId = `${newItem.food_id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        return [...prevCart, { ...newItem, id: uniqueId }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return { ...item, qty: newQty };
          }
          return item;
        })
        .filter((item) => item.qty > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const openMenuItemModal = (item: MenuItem) => {
    setActiveMenuItem(item);
  };

  const closeMenuItemModal = () => {
    setActiveMenuItem(null);
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const originalSubtotal = cart.reduce((sum, item) => sum + (item.orig_price ?? item.price) * item.qty, 0);
  const discount = Math.max(0, originalSubtotal - subtotal);
  
  const deliveryFee = orderType === 'delivery' ? 50 : 0;
  const serviceFee = cart.length > 0 ? 10 : 0; // nominal online checkout convenience fee
  const total = subtotal + deliveryFee + serviceFee;

  const getWhatsappLink = (phone: string, address?: string) => {
    const waNumber = '8801700000000';
    
    let text = `Hello The Woodhouse Grill! I would like to place an order.\n\n`;
    text += `*Customer Details:*\n`;
    text += `Phone: ${phone}\n`;
    if (orderType === 'delivery' && address) {
      text += `Address: ${address}\n`;
    }
    text += `Order Type: ${orderType === 'delivery' ? 'Delivery' : 'Pick-up'}\n\n`;
    
    text += `*Items Ordered:*\n`;
    cart.forEach((item, index) => {
      text += `${index + 1}. ${item.qty}x ${item.name}`;
      if (item.optionsDescription) {
        text += ` (${item.optionsDescription})`;
      }
      text += ` - ৳${item.price * item.qty}\n`;
      if (item.note) {
        text += `   _Note: ${item.note}_\n`;
      }
    });
    
    text += `\n*Summary:*\n`;
    text += `Subtotal: ৳${subtotal}\n`;
    if (discount > 0) {
      text += `Discount: -৳${discount}\n`;
    }
    if (orderType === 'delivery') {
      text += `Delivery Fee: ৳${deliveryFee}\n`;
    }
    text += `Service Fee: ৳${serviceFee}\n`;
    text += `*Grand Total: ৳${total}*\n\n`;
    text += `Thank you!`;

    const encodedText = encodeURIComponent(text);
    return `https://wa.me/${waNumber}?text=${encodedText}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orderType,
        setOrderType,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        discount,
        deliveryFee,
        serviceFee,
        total,
        activeMenuItem,
        openMenuItemModal,
        closeMenuItemModal,
        isCartOpen,
        setIsCartOpen,
        getWhatsappLink,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
