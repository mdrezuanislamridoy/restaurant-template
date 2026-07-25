'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { MENU_ITEMS, MenuItem } from '@/data/menu';
import { Check, ArrowRight, ArrowLeft, ShoppingBag, Sparkles } from 'lucide-react';

interface SelectedItems {
  appetizer: MenuItem | null;
  main: MenuItem | null;
  side: MenuItem | null;
  drink: MenuItem | null;
}

export default function BuildYourMealPage() {
  const { addToCart, setIsCartOpen } = useCart();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  
  const [selections, setSelections] = useState<SelectedItems>({
    appetizer: null,
    main: null,
    side: null,
    drink: null,
  });

  // Pull items for each category
  const appetizers = MENU_ITEMS.filter((item) => item.category === 'grill-sides' && item.slug !== 'truffle-fries').slice(0, 3);
  const cuts = MENU_ITEMS.filter((item) => item.category === 'steaks').slice(0, 4);
  const sides = MENU_ITEMS.filter((item) => item.slug === 'truffle-fries' || item.slug === 'grilled-asparagus' || item.category === 'grill-sides');
  const drinks = MENU_ITEMS.filter((item) => item.category === 'beverages');

  // Presets mapping
  const presets = [
    {
      name: 'Couple Combo Platter',
      icon: '🥩',
      price: 1550,
      description: 'Ribeye & mocktail combination',
      config: {
        appetizer: MENU_ITEMS.find((i) => i.id === 302) || appetizers[0], // Smoked Wings
        main: MENU_ITEMS.find((i) => i.id === 101) || cuts[0], // Premium Ribeye
        side: MENU_ITEMS.find((i) => i.id === 301) || sides[0], // Truffle Fries
        drink: MENU_ITEMS.find((i) => i.id === 402) || drinks[0], // Minty Mojito
      },
    },
    {
      name: 'Friends Grill Feast',
      icon: '🔥',
      price: 1990,
      description: 'T-bone cut with smoked wings',
      config: {
        appetizer: MENU_ITEMS.find((i) => i.id === 303) || appetizers[1], // Calamari
        main: MENU_ITEMS.find((i) => i.id === 102) || cuts[1], // T-Bone
        side: MENU_ITEMS.find((i) => i.id === 301) || sides[0], // Truffle Fries
        drink: MENU_ITEMS.find((i) => i.id === 401) || drinks[1], // Smoke Oak Mocktail
      },
    },
    {
      name: 'Luxury Wagyu Experience',
      icon: '👑',
      price: 3200,
      description: 'Australian Wagyu with truffle sides',
      config: {
        appetizer: MENU_ITEMS.find((i) => i.id === 302) || appetizers[0], // Smoked Wings
        main: MENU_ITEMS.find((i) => i.id === 103) || cuts[2], // Wagyu Ribeye
        side: MENU_ITEMS.find((i) => i.id === 301) || sides[0], // Truffle Fries
        drink: MENU_ITEMS.find((i) => i.id === 402) || drinks[0], // Minty Mojito
      },
    },
  ];

  useEffect(() => {
    // No JS reveal observer needed; handled via CSS keyframes
  }, []);

  const handleApplyPreset = (config: SelectedItems) => {
    setSelections(config);
    setCurrentStep(4);
  };

  const handleSelect = (category: keyof SelectedItems, item: MenuItem) => {
    setSelections((prev) => ({ ...prev, [category]: item }));
  };

  const calculateTotal = () => {
    let sum = 0;
    Object.values(selections).forEach((item) => {
      if (item) sum += item.price;
    });
    return sum;
  };

  const handleAddPlatterToCart = () => {
    const totalVal = calculateTotal();
    
    if (!selections.appetizer || !selections.main) {
      alert('Please select at least a Starter and a Steak Cut to build your custom platter.');
      return;
    }

    const descriptionParts = [
      selections.appetizer.name,
      selections.main.name,
      selections.side?.name,
      selections.drink?.name,
    ].filter(Boolean);

    addToCart({
      food_id: 2000 + Date.now() % 1000000,
      name: 'Custom Steak Platter',
      price: totalVal,
      image: selections.main.image,
      qty: 1,
      optionsDescription: descriptionParts.join(' + '),
    });

    setIsCartOpen(true);
  };

  const stepItems = {
    1: { title: 'Select Starter', category: 'appetizer' as keyof SelectedItems, items: appetizers },
    2: { title: 'Select Steak Cut', category: 'main' as keyof SelectedItems, items: cuts },
    3: { title: 'Select Gourmet Side', category: 'side' as keyof SelectedItems, items: sides },
    4: { title: 'Select Beverage', category: 'drink' as keyof SelectedItems, items: drinks },
  };

  const currentStepData = stepItems[currentStep];

  return (
    <div className="bg-[#051413] min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-[#FAF6F0]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 fade-up">
          <div className="inline-flex items-center gap-1.5 border-b border-[#D5B875]/25 pb-2 mb-4">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#D5B875]">
              Gastronomic Assembly
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-light text-white mb-3 uppercase tracking-wide">
            Design Your Platter
          </h1>
          <p className="text-xs sm:text-sm text-[#FAF6F0]/50 max-w-md mx-auto font-light leading-relaxed">
            Construct your custom multi-course steak platter tailored to your exact tastes.
          </p>
          <div className="w-16 h-[1px] bg-[#D5B875] mx-auto mt-5" />
        </div>

        {/* Quick Presets Grid (Deep Emerald Contrast) */}
        <div className="mb-16 fade-up bg-[#0C2522] text-[#FAF6F0] border border-[#D5B875]/15 p-8 rounded-none relative">
          <div className="absolute inset-1.5 border border-[#D5B875]/10 pointer-events-none" />
          
          <h3 className="text-center text-[10px] font-bold text-[#FAF6F0]/50 uppercase tracking-[0.3em] mb-6">
            Apply Culinary Presets
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto relative z-10">
            {presets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => handleApplyPreset(preset.config)}
                className="bg-[#051413] border border-[#D5B875]/15 hover:border-[#D5B875] p-5 rounded-none text-left cursor-pointer transition-all duration-200 group flex items-start justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xl">{preset.icon}</span>
                    <h4 className="font-serif text-sm font-semibold tracking-wide text-white uppercase group-hover:text-[#D5B875] transition-colors">
                      {preset.name}
                    </h4>
                  </div>
                  <p className="text-[10px] text-[#FAF6F0]/65 font-light leading-normal mb-4">
                    {preset.description}
                  </p>
                  <span className="text-[9px] uppercase tracking-widest font-bold border border-[#FAF6F0]/20 px-2 py-0.5 group-hover:bg-[#D5B875] group-hover:text-[#051413] group-hover:border-[#D5B875] transition-all">
                    Load Preset
                  </span>
                </div>
                <span className="text-[#D5B875] font-serif text-base font-bold whitespace-nowrap ml-2">
                  ৳{preset.price}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Step Wizard Assembly */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Steps selector columns */}
          <div className="lg:col-span-8 space-y-6 fade-up">
            <div className="bg-[#0C2522] border border-[#D5B875]/15 p-6 sm:p-8 rounded-none">
              
              {/* Step indicator header */}
              <div className="flex justify-between items-center mb-8 border-b border-[#D5B875]/15 pb-6">
                {[1, 2, 3, 4].map((stepVal) => {
                  const stepNum = stepVal as 1 | 2 | 3 | 4;
                  const isCurrent = currentStep === stepNum;
                  const isCompleted = selections[stepItems[stepNum].category] !== null;
                  
                  return (
                    <button
                      key={stepNum}
                      onClick={() => setCurrentStep(stepNum)}
                      className={`flex flex-col items-center flex-1 transition-all cursor-pointer text-center relative focus:outline-none`}
                    >
                      <span className={`text-[10px] font-bold tracking-widest uppercase mb-1 block ${isCurrent ? 'text-[#D5B875]' : 'text-[#FAF6F0]/40'}`}>
                        Step 0{stepNum}
                      </span>
                      <span className={`w-full h-[2px] transition-all ${isCurrent ? 'bg-[#D5B875]' : isCompleted ? 'bg-[#2ECC71]' : 'bg-[#FAF6F0]/10'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Title */}
              <div className="mb-6 text-left">
                <h3 className="font-serif text-lg font-light text-white uppercase tracking-wider">
                  0{currentStep}. {currentStepData.title}
                </h3>
                <p className="text-[10px] text-[#FAF6F0]/50 uppercase tracking-wider mt-0.5">Select a gourmet option below</p>
              </div>

              {/* Options lists */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentStepData.items.map((item) => {
                  const isSelected = selections[currentStepData.category]?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(currentStepData.category, item)}
                      className={`border p-3.5 flex gap-3.5 items-center justify-between cursor-pointer transition-all duration-200 bg-[#051413] rounded-none ${
                        isSelected
                          ? 'border-[#D5B875] bg-[#D5B875]/5'
                          : 'border-[#D5B875]/10 hover:border-[#D5B875]/25'
                      }`}
                    >
                      <div className="flex gap-3 items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 rounded-none object-cover border border-[#D5B875]/10 bg-white/5 flex-shrink-0"
                        />
                        <div className="text-left">
                          <h4 className="text-xs font-bold text-white tracking-wide line-clamp-1">
                            {item.name}
                          </h4>
                          <span className="text-xs font-extrabold text-[#D5B875] mt-1 block">
                            ৳{item.price}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-none border flex items-center justify-center ${
                          isSelected ? 'border-[#D5B875] bg-[#D5B875] text-[#051413]' : 'border-[#FAF6F0]/30 bg-[#051413]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3px]" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center mt-10 pt-6 border-t border-[#D5B875]/15">
                <button
                  type="button"
                  onClick={() => setCurrentStep((s) => Math.max(1, s - 1) as 1 | 2 | 3 | 4)}
                  disabled={currentStep === 1}
                  className="px-6 py-3 border border-[#D5B875]/20 text-white hover:bg-[#051413] font-bold text-[10px] uppercase tracking-widest disabled:opacity-30 disabled:hover:bg-transparent flex items-center gap-1.5 cursor-pointer transition rounded-none bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((s) => Math.min(4, s + 1) as 1 | 2 | 3 | 4)}
                    disabled={selections[currentStepData.category] === null}
                    className="px-6 py-3 bg-[#D5B875] hover:bg-[#B99D5C] text-[#051413] font-bold text-[10px] uppercase tracking-widest disabled:opacity-35 flex items-center gap-1.5 cursor-pointer transition rounded-none"
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleAddPlatterToCart}
                    disabled={!selections.appetizer || !selections.main}
                    className="px-6 py-3 bg-[#D5B875] hover:bg-[#B99D5C] text-[#051413] font-bold text-[10px] uppercase tracking-widest disabled:opacity-35 flex items-center gap-1.5 cursor-pointer transition rounded-none"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add Platter
                  </button>
                )}
              </div>

            </div>
          </div>

          {/* Right Column: Printed Order Slip Summary */}
          <div className="lg:col-span-4 fade-up lg:sticky lg:top-36 text-left">
            <div className="bg-[#0C2522] text-[#FAF6F0] border border-[#D5B875]/15 p-6 relative">
              <div className="absolute inset-1 border border-[#D5B875]/10 pointer-events-none" />
              
              <h3 className="font-serif text-sm font-semibold tracking-[0.25em] text-[#D5B875] border-b border-[#D5B875]/15 pb-3 text-center uppercase relative z-10">
                Order Slip
              </h3>

              <div className="space-y-4 pt-6 text-xs relative z-10 font-medium">
                {/* Starter */}
                <div className="flex justify-between items-baseline gap-2">
                  <span className="text-[#FAF6F0]/50 uppercase tracking-widest text-[9px] flex-shrink-0">01. Starter</span>
                  <span className="flex-1 border-b border-dotted border-[#D5B875]/10 mx-1" />
                  <span className="text-white font-bold max-w-[120px] truncate text-right">
                    {selections.appetizer ? selections.appetizer.name : '—'}
                  </span>
                </div>

                {/* Main */}
                <div className="flex justify-between items-baseline gap-2">
                  <span className="text-[#FAF6F0]/50 uppercase tracking-widest text-[9px] flex-shrink-0">02. Main Cut</span>
                  <span className="flex-1 border-b border-dotted border-[#D5B875]/10 mx-1" />
                  <span className="text-white font-bold max-w-[120px] truncate text-right">
                    {selections.main ? selections.main.name : '—'}
                  </span>
                </div>

                {/* Side */}
                <div className="flex justify-between items-baseline gap-2">
                  <span className="text-[#FAF6F0]/50 uppercase tracking-widest text-[9px] flex-shrink-0">03. Side</span>
                  <span className="flex-1 border-b border-dotted border-[#D5B875]/10 mx-1" />
                  <span className="text-white font-bold max-w-[120px] truncate text-right">
                    {selections.side ? selections.side.name : '—'}
                  </span>
                </div>

                {/* Drink */}
                <div className="flex justify-between items-baseline gap-2">
                  <span className="text-[#FAF6F0]/50 uppercase tracking-widest text-[9px] flex-shrink-0">04. Drink</span>
                  <span className="flex-1 border-b border-dotted border-[#D5B875]/10 mx-1" />
                  <span className="text-white font-bold max-w-[120px] truncate text-right">
                    {selections.drink ? selections.drink.name : '—'}
                  </span>
                </div>
              </div>

              {/* Totals */}
              <div className="border-t border-[#D5B875]/15 pt-6 mt-6 space-y-4 relative z-10">
                <div className="flex justify-between items-baseline text-base font-serif font-bold text-white uppercase tracking-wide">
                  <span>Platter Total</span>
                  <span className="text-[#D5B875]">৳{calculateTotal()}</span>
                </div>

                <button
                  type="button"
                  onClick={handleAddPlatterToCart}
                  disabled={!selections.appetizer || !selections.main}
                  className="w-full bg-[#D5B875] hover:bg-[#B99D5C] text-[#051413] py-3.5 font-bold text-[10px] uppercase tracking-widest disabled:opacity-30 cursor-pointer transition-colors rounded-none"
                >
                  Confirm Platter
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
