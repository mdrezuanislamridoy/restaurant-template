'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { MENU_ITEMS, CATEGORIES } from '@/data/menu';
import { Star, Users, Clock, ArrowRight, Utensils, MessageSquare, Tag, Calendar, CheckCircle } from 'lucide-react';

export default function Home() {
  const { openMenuItemModal } = useCart();
  const [activeSlide, setActiveSlide] = useState(0);
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [isAlertSubscribed, setIsAlertSubscribed] = useState(false);

  const heroSlides = [
    'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=1200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504973960431-1c467e159aa4?w=1200&auto=format&fit=crop&q=80',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const chefSpecials = MENU_ITEMS.filter((item) => item.isChefSpecial);

  const handleAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsappPhone || whatsappPhone.length < 11) return;
    setIsAlertSubscribed(true);
    setWhatsappPhone('');
  };

  return (
    <div className="bg-[#051413] text-[#FAF6F0] overflow-hidden">
      
      {/* ========== SECTION 1: HERO (Deep Emerald) ========== */}
      <section className="relative py-24 lg:py-36 bg-[#051413] border-b border-[#D5B875]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left side: Editorial Typography */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center gap-2 border-b border-[#D5B875]/30 pb-2">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#D5B875]">
                  The Woodhouse Grill • Gulshan-2
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-light leading-tight tracking-wide text-white">
                Bespoke <br />
                <span className="italic font-normal text-[#D5B875]">Dry-Aged</span> Cuts
              </h1>
              
              <p className="text-sm sm:text-base text-[#FAF6F0]/65 max-w-xl font-light leading-relaxed">
                Experience the culinary refinement of prime Angus and Wagyu steaks, dry-aged for 28 days and flame-grilled over seasoned hickory wood parillas. Located opposite Gulshan Club.
              </p>
              
              {/* Luxury Outline Actions */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/menu"
                  className="border border-[#D5B875] text-[#D5B875] hover:bg-[#D5B875] hover:text-[#051413] font-bold px-8 py-4 tracking-widest uppercase text-xs transition-all duration-300 rounded-none cursor-pointer"
                >
                  Explore Menu
                </Link>
                <Link
                  href="/offers"
                  className="border border-[#FAF6F0]/20 text-[#FAF6F0]/80 hover:border-[#D5B875] hover:text-[#D5B875] font-bold px-8 py-4 tracking-widest uppercase text-xs transition-all duration-300 rounded-none cursor-pointer"
                >
                  Time Offers
                </Link>
              </div>

              {/* Spaced trust grid */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#D5B875]/15 max-w-lg">
                <div>
                  <span className="font-serif text-lg text-[#D5B875] block">5.0 ★</span>
                  <span className="text-[9px] uppercase tracking-wider text-[#FAF6F0]/50 font-bold">Google Rating</span>
                </div>
                <div className="border-l border-[#D5B875]/15 pl-4">
                  <span className="font-serif text-lg text-[#D5B875] block">28 Days</span>
                  <span className="text-[9px] uppercase tracking-wider text-[#FAF6F0]/50 font-bold">Dry Aged beef</span>
                </div>
                <div className="border-l border-[#D5B875]/15 pl-4">
                  <span className="font-serif text-lg text-[#D5B875] block">12 - 11 PM</span>
                  <span className="text-[9px] uppercase tracking-wider text-[#FAF6F0]/50 font-bold">Daily service</span>
                </div>
              </div>
            </div>

            {/* Right side: Single Elegant Offset Image */}
            <div className="hidden lg:block lg:col-span-5 relative">
              <div className="offset-border-frame w-full max-w-sm ml-auto">
                <div className="h-[460px] bg-[#0C2522]">
                  <img
                    src={heroSlides[activeSlide]}
                    alt="Michelin steakhouse grill"
                    className="w-full h-full object-cover grayscale-25 contrast-110"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========== SECTION 2: CHEF'S SPECIALS (Deep Emerald) ========== */}
      <section className="bg-[#051413] text-[#FAF6F0] py-24 px-4 sm:px-6 lg:px-8 border-b border-[#D5B875]/15">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16 fade-up">
            <span className="text-[#D5B875] font-bold text-[10px] tracking-[0.4em] uppercase">Chef's Signature Selection</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light tracking-wide text-white mt-2">
              Featured Plates
            </h2>
            <div className="w-12 h-[1px] bg-[#D5B875] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 fade-up">
            {chefSpecials.map((item) => (
              <div
                key={item.id}
                onClick={() => openMenuItemModal(item)}
                className="bg-[#0C2522] border border-[#D5B875]/15 p-6 flex flex-col justify-between hover:border-[#D5B875] transition-all duration-300 cursor-pointer text-left group"
              >
                <div>
                  <div className="h-56 overflow-hidden bg-black/20 mb-6 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-[#D5B875] text-[#051413] text-[9px] font-black uppercase tracking-wider px-2 py-0.5">
                      Signature
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-light text-white group-hover:text-[#D5B875] transition-colors leading-tight mb-2 uppercase tracking-wide">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#FAF6F0]/65 leading-relaxed font-light mb-6">
                    {item.desc}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#D5B875]/10 mt-auto">
                  <span className="text-[#D5B875] font-serif text-lg font-semibold">৳{item.price}</span>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-[#FAF6F0]/70 group-hover:text-[#D5B875] transition-colors flex items-center gap-1">
                    Add to Platter <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========== SECTION 3: CATEGORIES (Deep Emerald) ========== */}
      <section className="bg-[#051413] py-24 px-4 sm:px-6 lg:px-8 border-b border-[#D5B875]/15">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16 fade-up">
            <span className="text-[#D5B875] font-bold text-[10px] tracking-[0.4em] uppercase">Browse Collections</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light tracking-wide text-white mt-2">
              Our Culinary Categories
            </h2>
            <div className="w-12 h-[1px] bg-[#D5B875] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto fade-up">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/menu?category=${cat.id}`}
                className="bg-[#0C2522] border border-[#D5B875]/15 p-8 text-center hover:border-[#D5B875] transition-all duration-300 group cursor-pointer block relative"
              >
                <span className="text-3xl block mb-3 group-hover:scale-105 transition-transform duration-300">{cat.icon}</span>
                <span className="font-serif text-base font-light tracking-wider text-white group-hover:text-[#D5B875] transition-colors block uppercase">
                  {cat.name}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#FAF6F0]/40 font-bold block mt-1">
                  {cat.count} selections
                </span>
                <span className="absolute bottom-4 right-4 text-[#D5B875] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ========== SECTION 4: CLUB FLAME ALERTS (Deep Emerald) ========== */}
      <section className="bg-[#051413] text-[#FAF6F0] py-20 px-4 sm:px-6 lg:px-8 border-b border-[#D5B875]/15">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
            
            <div className="lg:col-span-7 space-y-4 fade-up">
              <span className="text-[#D5B875] font-bold text-[10px] tracking-[0.4em] uppercase">Woodhouse Club</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-wide text-white leading-tight">
                Dry-Aged Restocks & VIP Invitations
              </h2>
              <p className="text-xs sm:text-sm text-[#FAF6F0]/65 font-light leading-relaxed max-w-xl">
                Join our members WhatsApp list. Receive instant notifications the minute our head chef unseals a new batch of dry-aged Wagyu ribeyes, and secure priority booking windows.
              </p>
            </div>
            
            <div className="lg:col-span-5 fade-up">
              <div className="bg-[#0C2522] border border-[#D5B875]/15 p-6 shadow-sm">
                <h4 className="font-serif text-xs font-semibold tracking-[0.2em] text-[#FAF6F0] uppercase mb-4 text-center">
                  Request Access
                </h4>
                {isAlertSubscribed ? (
                  <div className="flex items-center gap-2.5 text-[#2ECC71] bg-[#2ECC71]/5 border border-[#2ECC71]/20 p-4">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-xs font-bold tracking-wider uppercase">Subscription Confirmed</span>
                  </div>
                ) : (
                  <form onSubmit={handleAlertSubmit} className="space-y-4">
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{11}"
                      placeholder="WhatsApp Mobile Number"
                      value={whatsappPhone}
                      onChange={(e) => setWhatsappPhone(e.target.value)}
                      className="w-full bg-transparent border-b border-[#D5B875]/25 text-white px-2 py-3 outline-none focus:border-[#D5B875] transition text-xs text-center rounded-none placeholder-[#FAF6F0]/30"
                    />
                    <button
                      type="submit"
                      className="w-full bg-[#D5B875] hover:bg-[#B99D5C] hover:text-[#051413] text-[#051413] py-3.5 font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer rounded-none"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========== SECTION 5: EVENTS & BANQUETS (Deep Emerald) ========== */}
      <section className="bg-[#051413] py-24 px-4 sm:px-6 lg:px-8 border-b border-[#D5B875]/15">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16 fade-up">
            <span className="text-[#D5B875] font-bold text-[10px] tracking-[0.4em] uppercase">Private Catering</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light tracking-wide text-white mt-2">
              Exclusive Banquet Spaces
            </h2>
            <div className="w-12 h-[1px] bg-[#D5B875] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto fade-up">
            {/* Event Card */}
            <div className="bg-[#0C2522] border border-[#D5B875]/15 flex flex-col justify-between group hover:border-[#D5B875] transition-all duration-300 text-left">
              <div className="h-56 overflow-hidden bg-white/5 relative">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80"
                  alt="Wagyu slider platter"
                  className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-4">
                <span className="text-[9px] uppercase tracking-widest text-[#D5B875] font-bold">Slider Banquet Package</span>
                <h3 className="font-serif text-lg font-light text-white uppercase tracking-wider">
                  Wagyu Sliders Rush - Buy 2 Get 1 Free
                </h3>
                <p className="text-xs text-[#FAF6F0]/65 font-light leading-relaxed">
                  Celebrate Monday slider nights with our premium Wagyu mini cheeseburgers, seasoned truffle fries, and custom mocktails.
                </p>
                <div className="pt-4 border-t border-[#D5B875]/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#FAF6F0]/50">
                  <span>Capacity: 5 - 30 guests</span>
                  <Link href="/events" className="text-[#D5B875] hover:underline flex items-center gap-1">
                    Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Event 2 */}
            <div className="bg-[#0C2522] border border-[#D5B875]/15 flex flex-col justify-between group hover:border-[#D5B875] transition-all duration-300 text-left">
              <div className="h-56 overflow-hidden bg-white/5 relative">
                <img
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=80"
                  alt="Steakhouse private dinner"
                  className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-4">
                <span className="text-[9px] uppercase tracking-widest text-[#D5B875] font-bold">Chef's VIP Tasting</span>
                <h3 className="font-serif text-lg font-light text-white uppercase tracking-wider">
                  5-Course dry-aged beef feast
                </h3>
                <p className="text-xs text-[#FAF6F0]/65 font-light leading-relaxed">
                  An exclusive steak dinner featuring aged Tomahawks, Wagyu ribeyes, custom chef pairings, and dedicated butler service.
                </p>
                <div className="pt-4 border-t border-[#D5B875]/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#FAF6F0]/50">
                  <span>Capacity: 10 - 25 guests</span>
                  <Link href="/events" className="text-[#D5B875] hover:underline flex items-center gap-1">
                    Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Custom Event Call-To-Action */}
          <div className="mt-16 text-center max-w-2xl mx-auto bg-[#0C2522] border border-[#D5B875]/15 p-8 relative fade-up">
            <div className="absolute inset-1 border border-[#D5B875]/10 pointer-events-none" />
            <h3 className="font-serif text-xl font-light text-white uppercase tracking-wider mb-3">
              Custom Banquet Curation
            </h3>
            <p className="text-xs text-[#FAF6F0]/60 font-light leading-relaxed mb-6">
              Celebrate your milestone corporate summits, private birthday dinners, or anniversary banquets with customizable parilla grills and dedicated VIP butler teams.
            </p>
            <Link
              href="/events"
              className="inline-block bg-[#D5B875] hover:bg-[#B99D5C] text-[#051413] px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition duration-200 rounded-none"
            >
              Plan Your Event
            </Link>
          </div>

        </div>
      </section>

      {/* ========== SECTION 6: EDITORIAL BLOG (Deep Emerald) ========== */}
      <section className="bg-[#051413] text-[#FAF6F0] py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16 fade-up">
            <span className="text-[#D5B875] font-bold text-[10px] tracking-[0.4em] uppercase">Culinary Editorial</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light tracking-wide text-white mt-2">
              Grill Chronicles
            </h2>
            <div className="w-12 h-[1px] bg-[#D5B875] mx-auto mt-4" />
          </div>

          <div className="max-w-xl mx-auto fade-up">
            <Link
              href="/blog/why-woodhouse-grill-has-redefined-dining-in-gulshan"
              className="bg-[#0C2522] border border-[#D5B875]/15 overflow-hidden flex flex-col hover:border-[#D5B875] transition-all duration-300 group text-left shadow-sm"
            >
              <div className="h-60 overflow-hidden bg-black/20">
                <img
                  src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop&q=80"
                  alt="Steakhouse culinary review"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-3.5">
                <span className="text-[9px] uppercase tracking-widest text-[#D5B875] font-bold">Restaurant Review</span>
                <h3 className="font-serif text-lg sm:text-xl font-light text-white group-hover:text-[#D5B875] transition-colors uppercase tracking-wider leading-tight">
                  Why The Woodhouse Grill Has Redefined Culinary Luxury in Gulshan
                </h3>
                <p className="text-xs text-[#FAF6F0]/65 leading-relaxed font-light">
                  An in-depth review exploring the custom dry-aging chambers, wood-fire parilla grill zones, and premium Wagyu selections.
                </p>
                <div className="pt-4 border-t border-[#D5B875]/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#FAF6F0]/50">
                  <span>5 Min read</span>
                  <span>Read Article →</span>
                </div>
              </div>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
