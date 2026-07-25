'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, MapPin, Clock, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react';
import { FaFacebookF, FaYoutube } from 'react-icons/fa';

export const Footer: React.FC = () => {
  const [phoneAlert, setPhoneAlert] = useState('');
  const [isAlertSubscribed, setIsAlertSubscribed] = useState(false);

  const handleAlertSubmit = (e: React.FormEvent, source: string) => {
    e.preventDefault();
    if (!phoneAlert || phoneAlert.length < 11) return;
    
    setIsAlertSubscribed(true);
    setPhoneAlert('');
  };

  return (
    <footer className="bg-[#051413] text-[#FAF6F0]/70 pt-20 pb-10 border-t border-[#D5B875]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16 text-left">
          
          {/* Col 1: Editorial Description */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="font-serif text-3xl font-light text-[#FAF6F0] tracking-[0.2em] uppercase">Woodhouse</h3>
              <p className="text-[#D5B875] text-[10px] tracking-[0.4em] uppercase font-bold mt-1">Grill • Gulshan</p>
            </div>
            <p className="text-xs sm:text-sm text-[#FAF6F0]/50 font-light leading-relaxed max-w-md">
              A bespoke dining experience opposite the Gulshan Club. We specialize in dry-aged meats, wood-fired cuts of certified Angus beef, and signature craft mocktails tailored for the refined palate.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-[#D5B875]/20 text-[#FAF6F0]/60 hover:text-[#051413] hover:bg-[#D5B875] hover:border-[#D5B875] flex items-center justify-center transition-all duration-300"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-[#D5B875]/20 text-[#FAF6F0]/60 hover:text-[#051413] hover:bg-[#D5B875] hover:border-[#D5B875] flex items-center justify-center transition-all duration-300"
              >
                <FaYoutube className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://wa.me/8801700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-[#D5B875]/20 text-[#FAF6F0]/60 hover:text-[#25D366] hover:border-[#25D366] flex items-center justify-center transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="font-serif text-sm font-semibold tracking-[0.2em] text-[#FAF6F0] uppercase border-b border-[#D5B875]/20 pb-3">
              Sitemap
            </h4>
            <ul className="space-y-4 text-xs font-medium tracking-wider">
              <li>
                <Link href="/menu" className="hover:text-[#D5B875] transition-colors flex items-center justify-between group">
                  <span>Gourmet Menu</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-5px] group-hover:translate-x-0" />
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-[#D5B875] transition-colors flex items-center justify-between group">
                  <span>Exclusive Deals</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-5px] group-hover:translate-x-0" />
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#D5B875] transition-colors flex items-center justify-between group">
                  <span>Steak Banquets</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-5px] group-hover:translate-x-0" />
                </Link>
              </li>

              <li>
                <Link href="/blog" className="hover:text-[#D5B875] transition-colors flex items-center justify-between group">
                  <span>Grill Chronicles</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-5px] group-hover:translate-x-0" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Coordinates & Club */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="font-serif text-sm font-semibold tracking-[0.2em] text-[#FAF6F0] uppercase border-b border-[#D5B875]/20 pb-3">
              Contact & Hours
            </h4>
            
            <ul className="space-y-4 text-xs text-[#FAF6F0]/65 font-light">
              <li className="flex gap-3.5 items-start">
                <MapPin className="w-4 h-4 text-[#D5B875] flex-shrink-0 mt-0.5" />
                <span>Plot 12, Road 53, Gulshan-2 (Opposite Gulshan Club), Dhaka - 1212</span>
              </li>
              <li className="flex gap-3.5 items-center">
                <Phone className="w-4 h-4 text-[#D5B875]" />
                <a href="tel:+8801700000000" className="hover:text-[#D5B875] transition">01700-000000</a>
              </li>
              <li className="flex gap-3.5 items-center">
                <Clock className="w-4 h-4 text-[#D5B875]" />
                <span>12:00 PM – 11:00 PM Daily</span>
              </li>
            </ul>

            {/* Newsletter Line Sub */}
            <div className="pt-4">
              {isAlertSubscribed ? (
                <div className="flex items-center gap-2 text-[#2ECC71] text-xs font-semibold bg-[#2ECC71]/5 p-3.5 border border-[#2ECC71]/20">
                  <CheckCircle className="w-4 h-4" />
                  <span>Flame alerts active on WhatsApp.</span>
                </div>
              ) : (
                <form onSubmit={(e) => handleAlertSubmit(e, 'footer')} className="flex flex-col gap-3">
                  <span className="text-[9px] uppercase tracking-widest text-[#FAF6F0]/50 font-bold">VIP WhatsApp List</span>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{11}"
                      placeholder="Enter WhatsApp Number"
                      value={phoneAlert}
                      onChange={(e) => setPhoneAlert(e.target.value)}
                      className="bg-transparent border-b border-[#D5B875]/35 text-[#FAF6F0] px-1 py-2 text-xs outline-none focus:border-[#D5B875] transition w-full rounded-none"
                    />
                    <button
                      type="submit"
                      className="border border-[#D5B875] text-[#D5B875] hover:bg-[#D5B875] hover:text-[#051413] text-[10px] font-black uppercase tracking-widest px-4.5 py-2.5 transition whitespace-nowrap cursor-pointer rounded-none bg-transparent"
                    >
                      Join
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-[#D5B875]/10 pt-10 flex flex-col md:flex-row items-center justify-between text-[10px] text-[#FAF6F0]/40 font-bold uppercase tracking-wider">
          <p className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} The Woodhouse Grill. All Rights Reserved.
          </p>
          <p className="flex items-center gap-1">
            Bespoke design for Gulshan-2, Dhaka
          </p>
        </div>

      </div>
    </footer>
  );
};
