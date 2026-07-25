'use client';

import React, { useState } from 'react';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { ItemModal } from '@/components/ItemModal';
import { OtpModal } from '@/components/OtpModal';
import { useCart } from '@/context/CartContext';
import { MessageSquare } from 'lucide-react';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

const CartAndModalManager: React.FC = () => {
  const { isCartOpen, setIsCartOpen, getWhatsappLink } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const [userName, setUserName] = useState<string | null>(null);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [otpActionType, setOtpActionType] = useState<'login' | 'checkout'>('login');

  const handleLoginClick = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setUserPhone('');
      setUserName(null);
    } else {
      setOtpActionType('login');
      setIsOtpOpen(true);
    }
  };

  const handleCheckoutClick = () => {
    if (isLoggedIn && userPhone) {
      processCheckout(userPhone);
    } else {
      setOtpActionType('checkout');
      setIsOtpOpen(true);
    }
  };

  const processCheckout = (phone: string) => {
    let address = '';
    const orderType = localStorage.getItem('kashmira_order_type') || 'delivery';
    
    if (orderType === 'delivery') {
      const input = prompt('Please enter your delivery address:');
      if (input === null) return;
      if (!input.trim()) {
        alert('Address is required for delivery!');
        return;
      }
      address = input.trim();
    }

    const waLink = getWhatsappLink(phone, address);
    console.log('Redirecting to WhatsApp:', waLink);
    window.open(waLink, '_blank');
  };

  const handleOtpSuccess = (phone: string, name: string) => {
    setIsLoggedIn(true);
    setUserPhone(phone);
    setUserName(name);
    setIsOtpOpen(false);

    if (otpActionType === 'checkout') {
      setIsCartOpen(false);
      setTimeout(() => {
        processCheckout(phone);
      }, 300);
    }
  };

  return (
    <>
      <Navbar
        onLoginClick={handleLoginClick}
        isLoggedIn={isLoggedIn}
        username={userName}
      />
      
      <CartDrawer
        isLoggedIn={isLoggedIn}
        onCheckout={handleCheckoutClick}
      />
      
      <ItemModal />
      
      <OtpModal
        isOpen={isOtpOpen}
        onClose={() => setIsOtpOpen(false)}
        onSuccess={handleOtpSuccess}
      />

      {/* Floating WhatsApp FAB - Redesigned matching Luxury Emerald/Gold */}
      <a
        href="https://wa.me/8801700000000?text=Hello+The+Woodhouse+Grill%21+I+am+browsing+your+website+and+would+like+some+assistance."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-30 bg-[#D5B875] text-[#051413] p-4 rounded-none shadow-[0_4px_20px_rgba(213,184,117,0.3)] hover:scale-105 hover:bg-[#B99D5C] transition-all duration-300 border border-[#FAF6F0]/25"
        title="Chat on WhatsApp"
      >
        <MessageSquare className="w-5 h-5 fill-current" />
      </a>
    </>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full scroll-smooth`}>
      <head>
        <title>The Woodhouse Grill — Luxury Steakhouse in Gulshan-2, Dhaka</title>
        <meta name="description" content="The Woodhouse Grill Gulshan. Experience certified dry-aged Angus cuts and Wagyu steaks cooked over wood fire. Opposite Gulshan Club." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body bg-[#051413] text-[#FAF6F0] min-h-full flex flex-col pt-16">
        <CartProvider>
          <CartAndModalManager />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
