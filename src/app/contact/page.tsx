'use client';

import React, { useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, ExternalLink } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-[#051413] min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-[#FAF6F0]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 fade-up">
          <div className="inline-flex items-center gap-1.5 border-b border-[#D5B875]/25 pb-2 mb-4">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#D5B875]">
              Contact Coordinates
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-light text-white mb-3 uppercase tracking-wide">
            Find Woodhouse
          </h1>
          <p className="text-xs sm:text-sm text-[#FAF6F0]/55 max-w-md mx-auto font-light leading-relaxed">
            Reserve a table, enquire about private banquets, or find directions opposite the Gulshan Club.
          </p>
          <div className="w-16 h-[1px] bg-[#D5B875] mx-auto mt-5" />
        </div>

        {/* Contact Coordinates & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
          
          {/* Coordinates Grid */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between fade-up">
            
            {/* Address */}
            <div className="bg-[#0C2522] border border-[#D5B875]/15 p-6 rounded-none flex gap-4 items-start shadow-md text-left">
              <div className="w-10 h-10 rounded-none bg-[#051413] border border-[#D5B875]/25 text-[#D5B875] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4.5 h-4.5 stroke-[1.5px]" />
              </div>
              <div>
                <h3 className="font-serif text-xs font-semibold tracking-wider uppercase text-white mb-1">Our Address</h3>
                <p className="text-xs text-[#FAF6F0]/55 font-light leading-relaxed">
                  Plot 12, Road 53, Gulshan-2 (Opposite Gulshan Club), Dhaka - 1212, Bangladesh
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-[#0C2522] border border-[#D5B875]/15 p-6 rounded-none flex gap-4 items-start shadow-md text-left">
              <div className="w-10 h-10 rounded-none bg-[#051413] border border-[#D5B875]/25 text-[#D5B875] flex items-center justify-center flex-shrink-0">
                <Phone className="w-4.5 h-4.5 stroke-[1.5px]" />
              </div>
              <div>
                <h3 className="font-serif text-xs font-semibold tracking-wider uppercase text-white mb-1">Reservations</h3>
                <a href="tel:+8801700000000" className="text-xs text-[#FAF6F0]/55 hover:text-[#D5B875] transition block mt-1 font-semibold tracking-wider">
                  01700-000000
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="bg-[#0C2522] border border-[#D5B875]/15 p-6 rounded-none flex gap-4 items-start shadow-md text-left">
              <div className="w-10 h-10 rounded-none bg-[#051413] border border-[#D5B875]/25 text-[#D5B875] flex items-center justify-center flex-shrink-0">
                <Mail className="w-4.5 h-4.5 stroke-[1.5px]" />
              </div>
              <div>
                <h3 className="font-serif text-xs font-semibold tracking-wider uppercase text-white mb-1">Inquiries</h3>
                <a href="mailto:info@woodhousegrill.com" className="text-xs text-[#FAF6F0]/55 hover:text-[#D5B875] transition block mt-1 font-light">
                  info@woodhousegrill.com
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-[#0C2522] border border-[#D5B875]/15 p-6 rounded-none flex gap-4 items-start shadow-md text-left">
              <div className="w-10 h-10 rounded-none bg-[#051413] border border-[#D5B875]/25 text-[#D5B875] flex items-center justify-center flex-shrink-0">
                <Clock className="w-4.5 h-4.5 stroke-[1.5px]" />
              </div>
              <div>
                <h3 className="font-serif text-xs font-semibold tracking-wider uppercase text-white mb-1">Service Hours</h3>
                <p className="text-xs text-[#FAF6F0]/55 font-light leading-normal mt-1">
                  12:00 PM – 11:00 PM Daily
                </p>
              </div>
            </div>

          </div>

          {/* Map Frame (Offset borders) */}
          <div className="lg:col-span-7 relative h-96 lg:h-auto min-h-[350px] fade-up">
            <div className="offset-border-frame w-full h-full">
              <div className="w-full h-full border border-[#D5B875]/20 bg-white/5 relative z-10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.603348602695!2d90.4144445!3d23.7972222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7a3f3a6cf31%3A0x67db23e0ec2d9735!2sGulshan%20Club!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Woodhouse Grill location map"
                  className="grayscale invert-[80%] contrast-[130%]"
                ></iframe>
              </div>
            </div>
          </div>

        </div>

        {/* WhatsApp Reservation Box (Deep Emerald Contrast) */}
        <div className="max-w-3xl mx-auto fade-up">
          <div className="bg-[#0C2522] text-[#FAF6F0] border border-[#D5B875]/15 p-8 sm:p-12 text-center shadow-2xl relative">
            <div className="absolute inset-1.5 border border-[#D5B875]/10 pointer-events-none" />
            
            <div className="w-14 h-14 rounded-none bg-[#051413] border border-[#D5B875]/25 text-[#D5B875] flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-6 h-6 stroke-[1.5px] fill-current" />
            </div>

            <div className="space-y-3.5 relative z-10">
              <h2 className="font-serif text-xl sm:text-2xl uppercase tracking-wider text-white">Book a Table Online</h2>
              <p className="text-[#FAF6F0]/65 text-xs sm:text-sm font-light max-w-lg mx-auto leading-relaxed">
                Connect with our front-of-house team instantly. Message us on WhatsApp to confirm table availability, banquet menus, or valet bookings.
              </p>
            </div>

            <a
              href="https://wa.me/8801700000000?text=Hello+The+Woodhouse+Grill%21+I+am+browsing+your+website+and+would+like+to+reserve+a+table."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#D5B875] hover:bg-[#B99D5C] hover:text-[#051413] text-[#051413] px-8 py-4 font-bold text-xs uppercase tracking-widest transition-all duration-300 rounded-none mt-8 relative z-10 shadow-md"
            >
              Reserve via WhatsApp <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
