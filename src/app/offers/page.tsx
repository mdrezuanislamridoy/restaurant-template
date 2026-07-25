'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Tag, Clock, Lock, Unlock, ShoppingBag, CheckCircle } from 'lucide-react';

interface OfferDeal {
  id: number;
  name: string;
  price: number;
  origPrice: number;
  image: string;
  desc: string;
  category: string;
}

interface TimeSlot {
  id: string;
  name: string;
  startHour: number;
  endHour: number;
  deals: OfferDeal[];
}

export default function OffersPage() {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('lunch');
  const [currentTime, setCurrentTime] = useState(new Date());

  const timeSlots: TimeSlot[] = [
    {
      id: 'lunch',
      name: 'Steak Lunch Hour',
      startHour: 12,
      endHour: 15,
      deals: [
        {
          id: 901,
          name: 'Premium Ribeye + Craft Mojito Platter',
          price: 1290,
          origPrice: 1440,
          image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
          desc: 'Our 250g grilled Ribeye steak paired with a refreshing Minty Gold Mojito for the perfect power lunch.',
          category: 'steaks',
        },
        {
          id: 902,
          name: 'Wagyu Burger + Truffle Fries Platter',
          price: 520,
          origPrice: 649,
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
          desc: 'Flame-grilled burger loaded with cheese, served with a side of white truffle fries.',
          category: 'burgers',
        },
      ],
    },
    {
      id: 'snack',
      name: 'Sunset Ribs Special',
      startHour: 15,
      endHour: 18,
      deals: [
        {
          id: 903,
          name: 'Smoked BBQ Wings + Caramel Milkshake Combo',
          price: 450,
          origPrice: 560,
          image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=600&auto=format&fit=crop&q=80',
          desc: '6 pieces of slow-smoked wings paired with our creamy Butterscotch Caramel Milkshake.',
          category: 'grill-sides',
        },
      ],
    },
    {
      id: 'dinner',
      name: 'Gourmet Grill Dinner',
      startHour: 18,
      endHour: 22,
      deals: [
        {
          id: 905,
          name: 'Dry-Aged Tomahawk sharing Platter for Two',
          price: 3999,
          origPrice: 4600,
          image: 'https://images.unsplash.com/photo-1504973960431-1c467e159aa4?w=600&auto=format&fit=crop&q=80',
          desc: 'Massive dry-aged Tomahawk steak, served with double fries, asparagus, and 2 craft mocktails.',
          category: 'steaks',
        },
      ],
    },
    {
      id: 'weekly',
      name: 'Weekly Specials',
      startHour: 0,
      endHour: 24,
      deals: [
        {
          id: 907,
          name: 'Wagyu Slider Platter: Buy 2 Get 1 FREE (Monday)',
          price: 1100,
          origPrice: 1650,
          image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
          desc: 'Order two Wagyu slider platters and get the third completely free. Available Mondays only.',
          category: 'burgers',
        },
      ],
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const getSlotStatus = (slot: TimeSlot) => {
    if (slot.id === 'weekly') return { isLive: true, countdown: '' };

    const currentHour = currentTime.getHours();
    const currentMin = currentTime.getMinutes();
    const currentSec = currentTime.getSeconds();
    
    const isLive = currentHour >= slot.startHour && currentHour < slot.endHour;

    if (isLive) {
      const diffHrs = slot.endHour - 1 - currentHour;
      const diffMins = 59 - currentMin;
      const diffSecs = 59 - currentSec;
      return {
        isLive: true,
        countdown: `${String(diffHrs).padStart(2, '0')}:${String(diffMins).padStart(2, '0')}:${String(diffSecs).padStart(2, '0')} remaining`,
      };
    } else {
      let diffHrs = slot.startHour - currentHour;
      let diffMins = 0 - currentMin;
      let diffSecs = 0 - currentSec;

      if (diffHrs < 0 || (diffHrs === 0 && diffMins < 0)) {
        diffHrs += 24;
      }

      if (diffSecs < 0) {
        diffSecs += 60;
        diffMins -= 1;
      }
      if (diffMins < 0) {
        diffMins += 60;
        diffHrs -= 1;
      }

      return {
        isLive: false,
        countdown: `Unlocks in ${String(diffHrs).padStart(2, '0')}:${String(diffMins).padStart(2, '0')}:${String(diffSecs).padStart(2, '0')}`,
      };
    }
  };

  const handleAddOffer = (deal: OfferDeal, isLive: boolean) => {
    if (!isLive) return;

    addToCart({
      food_id: deal.id,
      name: deal.name,
      price: deal.price,
      orig_price: deal.origPrice,
      image: deal.image,
      qty: 1,
      optionsDescription: 'Grill Offer Special',
    });
  };

  return (
    <div className="bg-[#051413] min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-[#FAF6F0]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 fade-up">
          <div className="inline-flex items-center gap-1.5 border-b border-[#D5B875]/25 pb-2 mb-4">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#D5B875]">
              Daily Flash Gastronomy
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-light text-white mb-3 uppercase tracking-wide">
            Today's Time Offers
          </h1>
          <p className="text-xs sm:text-sm text-[#FAF6F0]/50 max-w-md mx-auto font-light leading-relaxed">
            Configure your platter during specific service windows to unlock exclusive chef combinations.
          </p>
          <div className="w-16 h-[1px] bg-[#D5B875] mx-auto mt-5" />
        </div>

        {/* Timeline split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto items-start">
          
          {/* Left Column: Timeline list navigation */}
          <div className="lg:col-span-4 bg-[#0C2522] border border-[#D5B875]/15 p-6 space-y-4 fade-up">
            <h3 className="font-serif text-xs font-semibold tracking-[0.2em] uppercase border-b border-[#D5B875]/10 pb-3 text-left">
              Service Timeline
            </h3>
            <div className="relative border-l border-[#D5B875]/20 pl-4 py-2 space-y-6 text-left">
              {timeSlots.map((slot) => {
                const { isLive } = getSlotStatus(slot);
                const isSelected = activeTab === slot.id;
                
                return (
                  <button
                    key={slot.id}
                    onClick={() => setActiveTab(slot.id)}
                    className="group block relative w-full cursor-pointer focus:outline-none"
                  >
                    {/* Node Dot */}
                    <span
                      className={`absolute -left-[21.5px] top-1.5 w-2.5 h-2.5 transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#D5B875] scale-125 shadow-[0_0_8px_#D5B875]'
                          : isLive
                          ? 'bg-[#2ECC71]'
                          : 'bg-[#FAF6F0]/20'
                      }`}
                    />
                    
                    <span
                      className={`block font-serif text-sm uppercase tracking-wider transition-colors ${
                        isSelected ? 'text-[#D5B875]' : 'text-[#FAF6F0]/65 group-hover:text-white'
                      }`}
                    >
                      {slot.name}
                    </span>
                    {slot.id !== 'weekly' ? (
                      <span className="block text-[9px] text-[#FAF6F0]/40 font-semibold tracking-widest mt-0.5">
                        {slot.startHour}:00 - {slot.endHour}:00
                      </span>
                    ) : (
                      <span className="block text-[9px] text-[#FAF6F0]/40 font-semibold tracking-widest mt-0.5">
                        Monday Only
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Display deals */}
          <div className="lg:col-span-8 space-y-6 fade-up">
            {timeSlots.map((slot) => {
              if (activeTab !== slot.id) return null;
              const { isLive, countdown } = getSlotStatus(slot);

              return (
                <div key={slot.id} className="space-y-6">
                  {/* Status Banner */}
                  <div
                    className={`p-4.5 border text-left flex flex-col sm:flex-row items-center justify-between gap-4 ${
                      isLive
                        ? 'bg-[#2ECC71]/5 border-[#2ECC71]/20 text-[#2ECC71]'
                        : 'bg-[#C87A4B]/5 border-[#C87A4B]/20 text-[#C87A4B]'
                    }`}
                  >
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-widest text-[#FAF6F0]">
                        {isLive ? 'Service Slot Active' : 'Slot Locked'}
                      </h4>
                      <p className="text-[11px] text-[#FAF6F0]/50 mt-1 leading-normal font-light">
                        {isLive
                          ? 'These special rates will automatically apply at checkout.'
                          : 'You can browse these items, but additions require an active service window.'}
                      </p>
                    </div>
                    {slot.id !== 'weekly' && (
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-[#0C2522] border border-[#D5B875]/25 text-[#D5B875] px-4 py-2 flex items-center gap-1.5 whitespace-nowrap">
                        <Clock className="w-3.5 h-3.5" /> {countdown}
                      </span>
                    )}
                  </div>

                  {/* Deals cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {slot.deals.map((deal) => (
                      <div
                        key={deal.id}
                        className={`bg-[#0C2522] border border-[#D5B875]/15 flex flex-col justify-between group hover:border-[#D5B875] transition-all duration-300 text-left relative ${
                          !isLive && 'opacity-65'
                        }`}
                      >
                        {/* Image */}
                        <div className="h-44 overflow-hidden relative bg-white/5">
                          <img
                            src={deal.image}
                            alt={deal.name}
                            className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
                          />
                          <div className="absolute top-3 left-3 bg-[#D5B875] text-[#051413] text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5">
                            Save ৳{deal.origPrice - deal.price}
                          </div>
                          {!isLive && (
                            <div className="absolute inset-0 bg-[#051413]/70 backdrop-blur-[1px] flex flex-col items-center justify-center">
                              <Lock className="w-6 h-6 text-[#D5B875] stroke-[1.5px]" />
                              <span className="text-[9px] uppercase tracking-widest text-[#D5B875] mt-1.5 font-bold">Locked</span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-5 flex-grow flex flex-col justify-between">
                          <div>
                            <div className="flex items-baseline gap-2 mb-2">
                              <span className="font-serif text-lg font-bold text-[#D5B875]">৳{deal.price}</span>
                              <span className="text-xs line-through text-[#FAF6F0]/40">৳{deal.origPrice}</span>
                            </div>
                            <h3 className="font-serif text-base font-light text-white uppercase tracking-wider leading-snug line-clamp-1">
                              {deal.name}
                            </h3>
                            <p className="text-xs text-[#FAF6F0]/50 font-light leading-relaxed mt-2.5">
                              {deal.desc}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="mt-6 pt-4 border-t border-[#D5B875]/10 flex items-center justify-between">
                            <span className="text-[9px] text-[#FAF6F0]/40 font-bold uppercase tracking-widest flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-[#D5B875]" />
                              {slot.id === 'weekly' ? 'Mon only' : 'Slot window'}
                            </span>
                            <button
                              onClick={() => handleAddOffer(deal, isLive)}
                              disabled={!isLive}
                              className={`border px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                                isLive
                                  ? 'border-[#D5B875] text-[#D5B875] hover:bg-[#D5B875] hover:text-[#051413] cursor-pointer'
                                  : 'border-[#FAF6F0]/10 text-[#FAF6F0]/20 cursor-not-allowed'
                              }`}
                            >
                              Add Platter
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
