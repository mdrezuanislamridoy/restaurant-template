import React from 'react';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Footer } from '@/components/Footer';
import { CartAndModalManager } from '@/components/CartAndModalManager';

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
