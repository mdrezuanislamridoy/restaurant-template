'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { MENU_ITEMS, CATEGORIES, MenuItem } from '@/data/menu';
import { Search, ChevronLeft, ChevronRight, ShoppingBag, Settings2 } from 'lucide-react';

const MenuContent: React.FC = () => {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  
  const { openMenuItemModal } = useCart();
  const [activeCategory, setActiveCategory] = useState('steaks');
  const activeCategoryRef = useRef('steaks');
  const [searchQuery, setSearchQuery] = useState('');
  
  const pillsTrackRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const categoryObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const catId = entry.target.getAttribute('data-section');
            if (catId && catId !== activeCategoryRef.current) {
              activeCategoryRef.current = catId;
              setActiveCategory(catId);
              const pillEl = document.getElementById(`pill-${catId}`);
              if (pillEl && pillsTrackRef.current) {
                const track = pillsTrackRef.current;
                const pillLeft = pillEl.offsetLeft;
                const pillWidth = pillEl.offsetWidth;
                const trackScroll = track.scrollLeft;
                const trackWidth = track.offsetWidth;

                if (pillLeft < trackScroll) {
                  track.scrollTo({ left: pillLeft - 20, behavior: 'smooth' });
                } else if (pillLeft + pillWidth > trackScroll + trackWidth) {
                  track.scrollTo({ left: pillLeft - trackWidth + pillWidth + 20, behavior: 'smooth' });
                }
              }
            }
          }
        });
      },
      { rootMargin: '-130px 0px -60% 0px' }
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) categoryObserver.observe(section);
    });

    if (initialCategory) {
      setTimeout(() => {
        scrollToSection(initialCategory);
      }, 300);
    }

    return () => {
      categoryObserver.disconnect();
    };
  }, [initialCategory]);

  const scrollToSection = (catId: string) => {
    if (activeCategoryRef.current !== catId) {
      activeCategoryRef.current = catId;
      setActiveCategory(catId);
    }
    const section = sectionRefs.current[catId];
    if (section) {
      const yOffset = -140;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handlePillsScroll = (direction: 'left' | 'right') => {
    if (pillsTrackRef.current) {
      const track = pillsTrackRef.current;
      const scrollAmount = 180;
      track.scrollTo({
        left: direction === 'left' ? track.scrollLeft - scrollAmount : track.scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const filteredItems = MENU_ITEMS.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.desc && item.desc.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const itemsByCategory = CATEGORIES.reduce((acc, cat) => {
    const items = filteredItems.filter((item) => item.category === cat.id);
    if (items.length > 0) {
      acc[cat.id] = items;
    }
    return acc;
  }, {} as { [catId: string]: MenuItem[] });

  return (
    <div className="bg-[#051413] min-h-screen text-[#FAF6F0] overflow-x-hidden">
      
      {/* ===== STICKY CATEGORY & SEARCH BAR ===== */}
      <div className="sticky top-14 z-30 bg-[#051413]/95 backdrop-blur-md border-b border-[#D5B875]/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between h-auto md:h-14 py-2.5 md:py-0 gap-3 md:gap-0">
            
            {/* Search Input */}
            <div className="relative flex-shrink-0 md:border-r border-[#D5B875]/15 md:pr-6 py-1 flex items-center">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FAF6F0]/40" />
                <input
                  type="text"
                  placeholder="Filter gourmet selections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-56 bg-[#0C2522] border border-[#D5B875]/20 text-xs rounded-none py-2.5 pl-10 pr-4 outline-none transition-all duration-200 text-white focus:border-[#D5B875] placeholder-[#FAF6F0]/30"
                />
              </div>
            </div>

            {/* Category horizontal scroll pills */}
            <div className="relative flex-1 min-w-0 flex items-center px-1 sm:px-2">
              <button
                onClick={() => handlePillsScroll('left')}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-none border border-[#D5B875]/20 flex items-center justify-center text-[#D5B875] hover:bg-[#D5B875] hover:text-[#051413] transition flex-shrink-0 mr-1.5 sm:mr-2.5 cursor-pointer bg-transparent"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <div
                ref={pillsTrackRef}
                className="flex-1 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-2 h-full scroll-smooth touch-pan-x"
                style={{ scrollbarWidth: 'none' }}
              >
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  const count = MENU_ITEMS.filter((item) => item.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      id={`pill-${cat.id}`}
                      onClick={() => scrollToSection(cat.id)}
                      className={`whitespace-nowrap px-3 sm:px-4 py-1.5 sm:py-2 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'text-[#051413] bg-[#D5B875] border border-[#D5B875]'
                          : 'text-[#FAF6F0]/50 hover:text-[#D5B875] border border-transparent'
                      }`}
                    >
                      {cat.name} ({count})
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePillsScroll('right')}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-none border border-[#D5B875]/20 flex items-center justify-center text-[#D5B875] hover:bg-[#D5B875] hover:text-[#051413] transition flex-shrink-0 ml-1.5 sm:ml-2.5 cursor-pointer bg-transparent"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MENU BODY (Ivory Printed Card Contrast) ===== */}
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 sm:py-20 bg-[#0C2522] border border-[#D5B875]/20 shadow-lg rounded-none px-4">
            <Search className="w-10 h-10 text-[#FAF6F0]/25 mx-auto mb-4" />
            <h3 className="text-lg font-serif font-light text-white mb-2 uppercase tracking-wider">No selections found</h3>
            <p className="text-xs text-[#FAF6F0]/50 font-light">
              We couldn't find any match for "{searchQuery}". Try filtering other categories.
            </p>
          </div>
        ) : (
          <div className="bg-[#0C2522] text-[#FAF6F0] border border-[#D5B875]/15 p-4 sm:p-10 md:p-16 shadow-2xl relative">
            
            {/* Fine border inside printed menu */}
            <div className="absolute inset-1.5 sm:inset-2 border border-[#D5B875]/10 pointer-events-none" />

            {/* Menu Header Ornament */}
            <div className="text-center mb-10 sm:mb-16 relative z-10">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#D5B875] block mb-1">
                La Carte
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-light tracking-widest text-white uppercase">
                The Woodhouse Menu
              </h2>
              <div className="w-16 sm:w-20 h-[1px] bg-[#D5B875] mx-auto mt-3 sm:mt-4" />
            </div>

            {/* Categories and Dotted Items */}
            <div className="space-y-12 sm:space-y-16 relative z-10">
              {CATEGORIES.map((cat) => {
                const categoryItems = itemsByCategory[cat.id];
                if (!categoryItems) return null;

                return (
                  <div
                    key={cat.id}
                    ref={(el) => {
                      sectionRefs.current[cat.id] = el;
                    }}
                    data-section={cat.id}
                    className="space-y-6 sm:space-y-8 scroll-mt-36"
                  >
                    {/* Category Title Header */}
                    <div className="text-center">
                      <h3 className="font-serif text-base sm:text-lg font-normal text-[#D5B875] tracking-[0.3em] uppercase mb-1">
                        {cat.name}
                      </h3>
                      <div className="w-8 h-[1px] bg-[#D5B875]/40 mx-auto" />
                    </div>

                    {/* Dotted Lines Items */}
                    <div className="space-y-4 sm:space-y-6">
                      {categoryItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => openMenuItemModal(item)}
                          className="group cursor-pointer text-left flex flex-row gap-3 sm:gap-4 items-start py-2.5 sm:py-3 hover:bg-[#D5B875]/5 px-1.5 sm:px-2 transition-colors duration-200 border-b border-[#D5B875]/5 last:border-b-0"
                        >
                          {/* Image Thumbnail */}
                          {item.image && (
                            <div className="w-14 h-14 sm:w-20 sm:h-20 bg-black/20 border border-[#D5B875]/25 flex-shrink-0 overflow-hidden rounded-none">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                                loading="lazy"
                              />
                            </div>
                          )}

                          {/* Details Content */}
                          <div className="flex-1 min-w-0">
                            <div className="dotted-leader-row mb-1 flex justify-between items-baseline">
                              <div className="dotted-leader-text min-w-0 pr-2">
                                <h4 className="font-serif text-xs sm:text-base font-semibold text-white uppercase tracking-wide group-hover:text-[#D5B875] transition-colors line-clamp-1 sm:line-clamp-none">
                                  {item.name}
                                </h4>
                              </div>
                              <span className="font-serif font-bold text-xs sm:text-base text-[#D5B875] flex-shrink-0 ml-1 sm:ml-2">
                                ৳{item.price}
                              </span>
                            </div>

                            {/* Description and Action button inline */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mt-1">
                              <p className="text-[10px] sm:text-xs text-[#FAF6F0]/60 font-light leading-relaxed max-w-xl line-clamp-2 sm:line-clamp-none">
                                {item.desc || 'Prepared fresh by our culinary experts using handpicked imports.'}
                              </p>
                              
                              <div className="flex items-center gap-2 flex-shrink-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity mt-1 sm:mt-0">
                                {item.variationGroups && item.variationGroups.length > 0 ? (
                                  <span className="text-[9px] uppercase tracking-wider font-bold text-[#D5B875] border border-[#D5B875]/30 px-2 py-0.5 bg-[#051413] flex items-center gap-1.5">
                                    <Settings2 className="w-3.5 h-3.5" /> Config
                                  </span>
                                ) : (
                                  <span className="text-[9px] uppercase tracking-wider font-bold text-[#2ECC71] border border-[#2ECC71]/30 px-2 py-0.5 bg-[#051413] flex items-center gap-1.5">
                                    + Platter
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Menu Footer Dot */}
            <div className="text-center mt-20 relative z-10">
              <span className="text-sm text-[#D5B875]/60">•</span>
            </div>

          </div>
        )}
      </div>

    </div>
  );
};

export default function MenuPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#051413] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-[#D5B875] border-t-transparent rounded-none animate-spin mx-auto" />
          <p className="text-xs font-bold uppercase tracking-widest text-[#D5B875]">Fetching Woodhouse Menu...</p>
        </div>
      </div>
    }>
      <MenuContent />
    </Suspense>
  );
}
