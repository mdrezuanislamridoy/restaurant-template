'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Plus, Minus, Check } from 'lucide-react';
import { MenuItem } from '@/data/menu';

export const ItemModal: React.FC = () => {
  const { activeMenuItem, closeMenuItemModal, addToCart } = useCart();
  
  const [selectedVarIds, setSelectedVarIds] = useState<{ [groupId: number]: number }>({});
  const [addonQtys, setAddonQtys] = useState<{ [addonId: number]: number }>({});
  const [fbtSelections, setFbtSelections] = useState<{ [fbtId: number]: boolean }>({});
  const [specialNote, setSpecialNote] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unitPrices, setUnitPrices] = useState({ current: 0, original: 0 });

  useEffect(() => {
    if (!activeMenuItem) return;

    // Set default variations (select first option of each group by default)
    const initialVars: { [groupId: number]: number } = {};
    if (activeMenuItem.variationGroups) {
      activeMenuItem.variationGroups.forEach((group) => {
        if (group.options.length > 0) {
          initialVars[group.id] = group.options[0].id;
        }
      });
    }
    setSelectedVarIds(initialVars);

    // Reset addons
    const initialAddons: { [addonId: number]: number } = {};
    if (activeMenuItem.addons) {
      activeMenuItem.addons.forEach((addon) => {
        initialAddons[addon.id] = 0;
      });
    }
    setAddonQtys(initialAddons);

    // Reset FBT
    const initialFbt: { [fbtId: number]: boolean } = {};
    if (activeMenuItem.fbt) {
      activeMenuItem.fbt.forEach((f) => {
        initialFbt[f.id] = false;
      });
    }
    setFbtSelections(initialFbt);

    setSpecialNote('');
    setQuantity(1);
  }, [activeMenuItem]);

  // Recalculate price when configurations change
  useEffect(() => {
    if (!activeMenuItem) return;

    const basePrice = activeMenuItem.price;
    const baseOrigPrice = activeMenuItem.origPrice ?? basePrice;
    const threshold = Math.max((activeMenuItem.rawPrice ?? basePrice) * 0.5, 50);
    
    let currentBase = basePrice;
    let originalBase = baseOrigPrice;
    let currentAdditionals = 0;
    let originalAdditionals = 0;

    // Apply variations
    if (activeMenuItem.variationGroups) {
      activeMenuItem.variationGroups.forEach((g) => {
        const selectedOptId = selectedVarIds[g.id];
        const opt = g.options.find((o) => o.id === selectedOptId);
        if (!opt) return;

        const vp = opt.price;
        const vop = opt.orig_price ?? opt.price;
        const raw = opt.raw ?? 0;

        if (raw >= threshold) {
          currentBase = Math.max(currentBase, vp);
          originalBase = Math.max(originalBase, vop);
        } else {
          currentAdditionals += vp;
          originalAdditionals += vop;
        }
      });
    }

    // Addons cost
    if (activeMenuItem.addons) {
      activeMenuItem.addons.forEach((a) => {
        const q = addonQtys[a.id] || 0;
        if (q > 0) {
          currentAdditionals += a.price * q;
          originalAdditionals += (a.orig_price ?? a.price) * q;
        }
      });
    }

    // FBT cost
    if (activeMenuItem.fbt) {
      activeMenuItem.fbt.forEach((f) => {
        const isSelected = fbtSelections[f.id];
        if (isSelected) {
          currentAdditionals += f.price;
          originalAdditionals += (f.orig_price ?? f.price);
        }
      });
    }

    setUnitPrices({
      current: currentBase + currentAdditionals,
      original: originalBase + originalAdditionals,
    });
  }, [activeMenuItem, selectedVarIds, addonQtys, fbtSelections]);

  if (!activeMenuItem) return null;

  const handleVariationChange = (groupId: number, optionId: number) => {
    setSelectedVarIds((prev) => ({ ...prev, [groupId]: optionId }));
  };

  const handleAddonQtyChange = (addonId: number, delta: number, maxQty: number) => {
    setAddonQtys((prev) => {
      const currentQty = prev[addonId] || 0;
      const newQty = Math.max(0, Math.min(maxQty, currentQty + delta));
      return { ...prev, [addonId]: newQty };
    });
  };

  const toggleFbt = (fbtId: number) => {
    setFbtSelections((prev) => ({ ...prev, [fbtId]: !prev[fbtId] }));
  };

  const handleAddToCart = () => {
    if (!activeMenuItem) return;

    const selectedOptionsList: string[] = [];

    if (activeMenuItem.variationGroups) {
      activeMenuItem.variationGroups.forEach((g) => {
        const selId = selectedVarIds[g.id];
        const opt = g.options.find((o) => o.id === selId);
        if (opt) selectedOptionsList.push(opt.name);
      });
    }

    if (activeMenuItem.addons) {
      activeMenuItem.addons.forEach((a) => {
        const q = addonQtys[a.id] || 0;
        if (q > 0) selectedOptionsList.push(`+${q} ${a.name}`);
      });
    }

    addToCart({
      food_id: activeMenuItem.id,
      name: activeMenuItem.name,
      price: unitPrices.current,
      orig_price: unitPrices.original > unitPrices.current ? unitPrices.original : undefined,
      image: activeMenuItem.image,
      note: specialNote.trim() ? specialNote : undefined,
      qty: quantity,
      optionsDescription: selectedOptionsList.join(', '),
    });

    if (activeMenuItem.fbt) {
      activeMenuItem.fbt.forEach((f) => {
        if (fbtSelections[f.id]) {
          addToCart({
            food_id: f.id,
            name: f.name,
            price: f.price,
            orig_price: f.orig_price,
            image: f.image ?? activeMenuItem.image,
            qty: 1,
          });
        }
      });
    }

    closeMenuItemModal();
  };

  const discountPercent =
    unitPrices.original > unitPrices.current
      ? Math.round((1 - unitPrices.current / unitPrices.original) * 100)
      : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-sm" onClick={closeMenuItemModal} />

      {/* Modal Box */}
      <div className="relative bg-[#051413] border border-[#D5B875]/25 text-[#FAF6F0] w-full max-w-lg rounded-none overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={closeMenuItemModal}
          className="absolute top-4 right-4 z-10 w-8.5 h-8.5 bg-black/75 hover:bg-black text-[#D5B875] border border-[#D5B875]/20 flex items-center justify-center transition-colors cursor-pointer rounded-none"
        >
          <X className="w-4 h-4 stroke-[1.5px]" />
        </button>

        {/* Hero image */}
        {activeMenuItem.image && (
          <div className="relative h-44 w-full bg-[#0C2522]">
            <img
              src={activeMenuItem.image_large ?? activeMenuItem.image}
              alt={activeMenuItem.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#051413] via-transparent to-transparent" />
          </div>
        )}

        {/* Content Body (Scrollable) */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 text-left">
          {/* Title and Prices */}
          <div>
            <div className="flex items-baseline gap-2.5 mb-1.5 flex-wrap">
              <span className="text-2xl font-bold text-[#D5B875] font-serif tracking-wider">৳{unitPrices.current}</span>
              {unitPrices.original > unitPrices.current && (
                <>
                  <span className="text-xs line-through text-[#FAF6F0]/40">৳{unitPrices.original}</span>
                  <span className="text-[9px] font-bold text-[#051413] bg-[#D5B875] px-2 py-0.5 uppercase tracking-wider">
                    {discountPercent}% off
                  </span>
                </>
              )}
            </div>
            <h3 className="text-xl font-serif font-light text-white uppercase tracking-wider mb-2">{activeMenuItem.name}</h3>
            <div className="flex gap-2 text-[9px] font-bold uppercase tracking-wider text-[#FAF6F0]/70">
              <span className="bg-[#0C2522] border border-[#D5B875]/15 px-2.5 py-1">20 min prep</span>
              <span className="bg-[#0C2522] border border-[#D5B875]/15 px-2.5 py-1 text-[#2ECC71]">Fine Selection</span>
            </div>
            {activeMenuItem.desc && (
              <p className="text-xs text-[#FAF6F0]/65 mt-3 leading-relaxed font-light">{activeMenuItem.desc}</p>
            )}
          </div>

          {/* Variation Groups */}
          {activeMenuItem.variationGroups?.map((g) => (
            <div key={g.id} className="bg-[#0C2522] border border-[#D5B875]/15 p-4 rounded-none space-y-3">
              <div className="flex justify-between items-center border-b border-[#D5B875]/10 pb-2">
                <div>
                  <h4 className="text-[10px] font-bold text-[#D5B875] uppercase tracking-widest">{g.name}</h4>
                  <p className="text-[9px] text-[#FAF6F0]/40 uppercase tracking-wider">
                    {g.required ? 'Select 1 (Required)' : 'Optional'}
                  </p>
                </div>
                {g.required && (
                  <span className="text-[8px] uppercase font-bold text-[#051413] bg-[#D5B875] px-2 py-0.5 tracking-widest">
                    Required
                  </span>
                )}
              </div>
              <div className="space-y-2">
                {g.options.map((opt) => {
                  const isSelected = selectedVarIds[g.id] === opt.id;
                  return (
                    <label
                      key={opt.id}
                      onClick={() => handleVariationChange(g.id, opt.id)}
                      className={`flex items-center justify-between p-3 rounded-none border text-xs cursor-pointer transition-all duration-200 ${
                        isSelected
                          ? 'border-[#D5B875] bg-[#D5B875]/5'
                          : 'border-[#D5B875]/10 bg-[#051413] hover:border-[#D5B875]/25'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-3.5 h-3.5 rounded-none border flex items-center justify-center ${
                            isSelected ? 'border-[#D5B875] bg-[#D5B875]' : 'border-[#FAF6F0]/30 bg-[#051413]'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 bg-[#051413]" />}
                        </div>
                        <span className="font-medium text-[#FAF6F0]/90">{opt.name}</span>
                      </div>
                      <span className="font-bold text-[#D5B875]">
                        {opt.price > 0 ? `+৳${opt.price}` : 'Free'}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Add-ons */}
          {activeMenuItem.addons && activeMenuItem.addons.length > 0 && (
            <div className="bg-[#0C2522] border border-[#D5B875]/15 p-4 rounded-none space-y-3">
              <div>
                <h4 className="text-[10px] font-bold text-[#D5B875] uppercase tracking-widest">Gourmet Additions</h4>
                <p className="text-[9px] text-[#FAF6F0]/40 uppercase tracking-wider">Add extras & details</p>
              </div>
              <div className="divide-y divide-[#D5B875]/10">
                {activeMenuItem.addons.map((a) => {
                  const qty = addonQtys[a.id] || 0;
                  return (
                    <div key={a.id} className="py-2.5 flex items-center justify-between first:pt-0 last:pb-0">
                      <div>
                        <span className="text-xs font-medium text-[#FAF6F0]/90">{a.name}</span>
                        <p className="text-[10px] text-[#D5B875] font-semibold mt-0.5">
                          +৳{a.price}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 border border-[#D5B875]/20 rounded-none bg-[#051413] p-0.5">
                        <button
                          type="button"
                          onClick={() => handleAddonQtyChange(a.id, -1, a.max_qty)}
                          disabled={qty <= 0}
                          className="p-1 text-[#D5B875] disabled:opacity-30 rounded-none cursor-pointer"
                        >
                          <Minus className="w-3" />
                        </button>
                        <span className="text-xs font-bold text-[#FAF6F0] min-w-[16px] text-center">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAddonQtyChange(a.id, 1, a.max_qty)}
                          disabled={qty >= a.max_qty}
                          className="p-1 text-[#D5B875] disabled:opacity-30 rounded-none cursor-pointer"
                        >
                          <Plus className="w-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Frequently Bought Together */}
          {activeMenuItem.fbt && activeMenuItem.fbt.length > 0 && (
            <div className="bg-[#0C2522] border border-[#D5B875]/15 p-4 rounded-none space-y-3">
              <div>
                <h4 className="text-[10px] font-bold text-[#D5B875] uppercase tracking-widest">Recommended Pairings</h4>
                <p className="text-[9px] text-[#FAF6F0]/40 uppercase tracking-wider">Complete your dining layout</p>
              </div>
              <div className="space-y-2">
                {activeMenuItem.fbt.map((f) => {
                  const isChecked = fbtSelections[f.id] || false;
                  return (
                    <div
                      key={f.id}
                      onClick={() => toggleFbt(f.id)}
                      className={`flex items-center justify-between p-3 rounded-none border text-xs cursor-pointer transition-all duration-200 ${
                        isChecked
                          ? 'border-[#2ECC71] bg-[#2ECC71]/5'
                          : 'border-[#D5B875]/10 bg-[#051413] hover:border-[#D5B875]/25'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4.5 h-4.5 border rounded-none flex items-center justify-center transition-all ${
                            isChecked ? 'border-[#2ECC71] bg-[#2ECC71] text-white' : 'border-[#FAF6F0]/30 bg-[#051413]'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3px]" />}
                        </div>
                        <span className="font-medium text-[#FAF6F0]/90">{f.name}</span>
                      </div>
                      <span className="font-bold text-[#2ECC71]">+৳{f.price}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-2">
            <label className="text-[9px] font-bold text-[#D5B875] uppercase tracking-widest block">
              Culinary instructions
            </label>
            <textarea
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              rows={2}
              placeholder="e.g. Medium doneness, extra sauce, garlic butter on side..."
              className="w-full bg-[#0C2522] border border-[#D5B875]/20 text-xs text-white p-3 rounded-none focus:border-[#D5B875] focus:outline-none transition leading-normal placeholder-white/20"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-[#D5B875]/15 px-6 py-4 flex items-center justify-between bg-[#051413] gap-4">
          <div className="flex items-center gap-3 border border-[#D5B875]/20 rounded-none bg-[#0C2522] p-0.5">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="p-2 text-[#D5B875] disabled:opacity-30 rounded-none cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-extrabold text-white text-xs min-w-[20px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="p-2 text-[#D5B875] rounded-none cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex-1 bg-[#D5B875] hover:bg-[#B99D5C] text-[#051413] py-3.5 rounded-none font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all duration-200"
          >
            Add to Platter
            <span className="font-bold text-xs border-l border-[#051413]/20 pl-2 ml-1">
              ৳{unitPrices.current * quantity}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
