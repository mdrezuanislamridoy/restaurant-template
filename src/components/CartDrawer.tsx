'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';

interface CartDrawerProps {
  isLoggedIn: boolean;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isLoggedIn, onCheckout }) => {
  const {
    cart,
    orderType,
    setOrderType,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    deliveryFee,
    serviceFee,
    total,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#051413] border-l border-[#D5B875]/25 shadow-2xl flex flex-col text-[#FAF6F0]">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#D5B875]/15 flex items-center justify-between">
            <h2 className="text-base font-serif font-light tracking-[0.2em] uppercase flex items-center gap-2">
              <ShoppingBag className="w-4.5 h-4.5 text-[#D5B875]" />
              Your Selection
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 hover:text-[#D5B875] transition cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[1.5px]" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 border border-[#D5B875]/20 flex items-center justify-center text-[#D5B875] mb-4">
                  <ShoppingBag className="w-6 h-6 stroke-[1.5px]" />
                </div>
                <h3 className="font-serif text-lg font-light tracking-widest uppercase mb-1">Your cart is empty</h3>
                <p className="text-xs text-[#FAF6F0]/50 max-w-[240px] mb-6 leading-relaxed">
                  Add some sizzling steaks or gourmet burgers to start your order!
                </p>
                <Link
                  href="/menu"
                  onClick={() => setIsCartOpen(false)}
                  className="border border-[#D5B875] text-[#D5B875] hover:bg-[#D5B875] hover:text-[#051413] font-bold px-6 py-3 rounded-none transition text-xs tracking-widest uppercase cursor-pointer"
                >
                  Browse Menu
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Order Type Toggle */}
                <div className="border border-[#D5B875]/20 p-1.5 rounded-none grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setOrderType('delivery')}
                    className={`py-2 text-[10px] font-bold tracking-widest uppercase rounded-none transition-all duration-200 cursor-pointer ${
                      orderType === 'delivery'
                        ? 'bg-[#D5B875] text-[#051413]'
                        : 'text-[#FAF6F0]/60 hover:bg-[#FAF6F0]/5'
                    }`}
                  >
                    🚀 Delivery
                  </button>
                  <button
                    onClick={() => setOrderType('pickup')}
                    className={`py-2 text-[10px] font-bold tracking-widest uppercase rounded-none transition-all duration-200 cursor-pointer ${
                      orderType === 'pickup'
                        ? 'bg-[#D5B875] text-[#051413]'
                        : 'text-[#FAF6F0]/60 hover:bg-[#FAF6F0]/5'
                    }`}
                  >
                    🏪 Pick-up
                  </button>
                </div>

                {/* Items List */}
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="p-4 bg-[#0C2522] border border-[#D5B875]/15 flex gap-4">
                      {/* Thumbnail */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-none object-cover border border-[#D5B875]/10 flex-shrink-0 bg-white/5"
                      />

                      {/* Details */}
                      <div className="flex-1 flex flex-col text-left">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-xs font-bold text-[#FAF6F0] leading-snug tracking-wide">{item.name}</h4>
                          <span className="text-xs font-bold text-[#D5B875] ml-2">
                            ৳{item.price * item.qty}
                          </span>
                        </div>
                        {item.optionsDescription && (
                          <p className="text-[10px] text-[#FAF6F0]/50 mb-2 leading-relaxed">
                            {item.optionsDescription}
                          </p>
                        )}
                        {item.note && (
                          <p className="text-[10px] italic text-[#C87A4B] mb-2 leading-relaxed">
                            Note: "{item.note}"
                          </p>
                        )}

                        {/* Controls */}
                        <div className="flex justify-between items-center mt-auto pt-2 border-t border-[#D5B875]/10">
                          <div className="flex items-center gap-2 border border-[#D5B875]/25 rounded-none bg-[#051413] p-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 text-[#D5B875] disabled:opacity-40 rounded-none cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-[#FAF6F0] min-w-[16px] text-center">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 text-[#D5B875] rounded-none cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-[#FAF6F0]/40 hover:text-[#E74C3C] transition cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4 stroke-[1.5px]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Summary */}
          {cart.length > 0 && (
            <div className="bg-[#051413] border-t border-[#D5B875]/15 px-6 py-6 space-y-4">
              <div className="space-y-2.5 text-xs text-[#FAF6F0]/80 text-left font-medium">
                <div className="flex justify-between">
                  <span className="text-[#FAF6F0]/50">Subtotal</span>
                  <span className="text-white">৳{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#2ECC71]">
                    <span>Saving Discount</span>
                    <span>-৳{discount}</span>
                  </div>
                )}
                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span className="text-[#FAF6F0]/50">Delivery Fee</span>
                    <span className="text-white">৳{deliveryFee}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-[#FAF6F0]/50">Online Convenience Fee</span>
                  <span className="text-white">৳{serviceFee}</span>
                </div>
                <div className="border-t border-[#D5B875]/15 pt-3.5 flex justify-between text-base font-serif font-light text-[#D5B875] tracking-widest uppercase">
                  <span>Grand Total</span>
                  <span>৳{total}</span>
                </div>
              </div>

              {/* Place Order */}
              <button
                onClick={onCheckout}
                className="w-full bg-[#D5B875] hover:bg-[#B99D5C] text-[#051413] py-3.5 rounded-none font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all duration-200 mt-2"
              >
                <ShoppingBag className="w-4 h-4" />
                {isLoggedIn ? 'Complete Order via WhatsApp' : 'Verify Phone to Continue'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
