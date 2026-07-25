'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, User, LogOut, Menu, X } from 'lucide-react';

interface NavbarProps {
  onLoginClick: () => void;
  isLoggedIn: boolean;
  username: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick, isLoggedIn, username }) => {
  const pathname = usePathname();
  const { cart, setIsCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((count, item) => count + item.qty, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Flame Deals', path: '/offers' },
    { name: 'Platter Builder', path: '/build-your-meal' },
    { name: 'Banquets', path: '/events' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-[#051413]/90 backdrop-blur-md py-3.5 border-[#D5B875]/20 shadow-lg'
          : 'bg-transparent py-5 border-[#D5B875]/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <Link href="/" className="text-left flex flex-col group">
            <span className="font-serif text-xl sm:text-2xl font-light text-[#FAF6F0] tracking-[0.2em] group-hover:text-[#D5B875] transition-colors leading-none uppercase">
              Woodhouse
            </span>
            <span className="text-[9px] text-[#D5B875] tracking-[0.4em] uppercase font-bold mt-1 block leading-none pl-0.5">
              Grill • Est. 2026
            </span>
          </Link>

          {/* Centered Navigation (Desktop) */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`font-body text-[10px] font-bold tracking-[0.2em] uppercase transition-colors relative py-1 hover:text-[#D5B875] ${
                    isActive ? 'text-[#D5B875]' : 'text-[#FAF6F0]/70'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#D5B875]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action Buttons (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#FAF6F0]/80 hover:text-[#D5B875] border border-[#D5B875]/25 hover:border-[#D5B875] transition-all duration-200 cursor-pointer rounded-none"
              aria-label="Open Platter Cart"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.5px]" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#D5B875] text-[#051413] text-[9px] font-black w-4.5 h-4.5 flex items-center justify-center border border-[#051413]">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Login / Profile Button */}
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <span className="text-[10px] tracking-[0.1em] font-semibold text-[#FAF6F0]/65 uppercase">
                  {username?.split(' ')[0] || 'Guest'}
                </span>
                <button
                  onClick={onLoginClick}
                  className="p-2 text-[#FAF6F0]/85 hover:text-[#E74C3C] border border-[#D5B875]/25 hover:border-[#E74C3C]/40 transition rounded-none cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4 stroke-[1.5px]" />
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="inline-flex items-center gap-1.5 border border-[#D5B875]/30 hover:border-[#D5B875] text-[#FAF6F0]/90 hover:text-[#D5B875] px-4.5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all cursor-pointer rounded-none bg-transparent"
              >
                <User className="w-3.5 h-3.5" />
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex items-center gap-3.5 lg:hidden">
            {/* Cart icon mobile */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#FAF6F0]/80 hover:text-[#D5B875] border border-[#D5B875]/20 transition rounded-none"
            >
              <ShoppingBag className="w-4.5 h-4.5 stroke-[1.5px]" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#D5B875] text-[#051413] text-[9px] font-black w-4.5 h-4.5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#FAF6F0]/80 hover:text-[#D5B875] border border-[#D5B875]/20 rounded-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation side menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#051413] border-b border-[#D5B875]/20 py-6 px-6 space-y-5 animate-fade-in shadow-2xl">
          <div className="flex flex-col gap-4 text-left">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-body text-xs font-bold tracking-[0.2em] uppercase py-1 border-b border-[#D5B875]/5 ${
                  pathname === link.path ? 'text-[#D5B875]' : 'text-[#FAF6F0]/70'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-[#D5B875]/10 pt-4 flex flex-col gap-3">
            {isLoggedIn ? (
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#FAF6F0]/60 uppercase">
                  {username || 'Guest'}
                </span>
                <button
                  onClick={() => {
                    onLoginClick();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs font-bold text-[#E74C3C] flex items-center gap-1.5"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onLoginClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full border border-[#D5B875]/40 text-[#FAF6F0] py-3 text-xs font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-2 rounded-none"
              >
                <User className="w-4 h-4" /> Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
