'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Users, Clock, MessageSquare, CheckCircle, Sparkles, Phone, Award, Shield } from 'lucide-react';

interface EventBooking {
  id: string;
  name: string;
  phone: string;
  occasion: string;
  guests: number;
  date: string;
  timeSlot: string;
  notes: string;
  status: 'Inquiry Sent';
  createdAt: string;
}

export default function EventsPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [occasion, setOccasion] = useState('Corporate Event');
  const [guests, setGuests] = useState(15);
  const [eventDate, setEventDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('6:00 PM - 9:00 PM');
  const [notes, setNotes] = useState('');
  const [savedInquiries, setSavedInquiries] = useState<EventBooking[]>([]);
  const [successMsg, setSuccessMsg] = useState(false);

  // Load inquiries from localStorage safely
  useEffect(() => {
    try {
      const stored = localStorage.getItem('woodhouse_banquet_inquiries');
      if (stored) {
        setSavedInquiries(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error loading stored inquiries', e);
    }
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !eventDate) {
      alert('Please fill out Name, Phone, and Event Date.');
      return;
    }

    const newInquiry: EventBooking = {
      id: 'WH-EVT-' + Math.floor(Math.random() * 90000 + 10000),
      name,
      phone,
      occasion,
      guests,
      date: eventDate,
      timeSlot,
      notes,
      status: 'Inquiry Sent',
      createdAt: new Date().toLocaleDateString(),
    };

    const updated = [newInquiry, ...savedInquiries];
    setSavedInquiries(updated);
    try {
      localStorage.setItem('woodhouse_banquet_inquiries', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    // Format WhatsApp message
    let text = `Hello The Woodhouse Grill! I want to request a Banquet/Event booking.\n\n`;
    text += `*Occasion:* ${newInquiry.occasion}\n`;
    text += `*Host:* ${newInquiry.name}\n`;
    text += `*Phone:* ${newInquiry.phone}\n`;
    text += `*Guests:* ${newInquiry.guests} persons\n`;
    text += `*Preferred Date:* ${newInquiry.date}\n`;
    text += `*Time Slot:* ${newInquiry.timeSlot}\n`;
    if (newInquiry.notes) {
      text += `*Special Requests:* ${newInquiry.notes}\n`;
    }
    text += `\nPlease check availability and confirm my inquiry. Thank you!`;

    const waUrl = `https://wa.me/8801700000000?text=${encodeURIComponent(text)}`;
    
    setSuccessMsg(true);
    setName('');
    setPhone('');
    setNotes('');

    // Open WhatsApp link in new tab
    setTimeout(() => {
      window.open(waUrl, '_blank');
      setSuccessMsg(false);
    }, 1200);
  };

  const handleDeleteInquiry = (id: string) => {
    const filtered = savedInquiries.filter((inq) => inq.id !== id);
    setSavedInquiries(filtered);
    try {
      localStorage.setItem('woodhouse_banquet_inquiries', JSON.stringify(filtered));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-[#051413] min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-[#FAF6F0]">
      <div className="max-w-7xl mx-auto">
        
        {/* Intro Header */}
        <div className="text-center mb-16 fade-up">
          <div className="inline-flex items-center gap-1.5 border-b border-[#D5B875]/25 pb-2 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D5B875]" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#D5B875]">
              Private Dining & Banquets
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-light text-white mb-4 uppercase tracking-wider">
            Host Your Event With Us
          </h1>
          <p className="text-xs sm:text-sm text-[#FAF6F0]/60 max-w-xl mx-auto font-light leading-relaxed">
            From intimate corporate dinners to celebratory birthday feasts, configure your booking request below. Our reservations desk will get in touch instantly.
          </p>
          <div className="w-16 h-[1px] bg-[#D5B875] mx-auto mt-6" />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto text-left">
          <div className="bg-[#0C2522] border border-[#D5B875]/15 p-6 space-y-3">
            <Users className="w-6 h-6 text-[#D5B875]" />
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-white">Capacity</h3>
            <p className="text-xs text-[#FAF6F0]/50 font-light leading-relaxed">
              Our dining room opposite Gulshan Club easily accommodates banquets from 10 up to 60 guests.
            </p>
          </div>
          <div className="bg-[#0C2522] border border-[#D5B875]/15 p-6 space-y-3">
            <Award className="w-6 h-6 text-[#D5B875]" />
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-white">Curated Catering</h3>
            <p className="text-xs text-[#FAF6F0]/50 font-light leading-relaxed">
              Curate a custom parilla steak menu including starters, prime cuts, sides, and signature mocktails.
            </p>
          </div>
          <div className="bg-[#0C2522] border border-[#D5B875]/15 p-6 space-y-3">
            <Shield className="w-6 h-6 text-[#D5B875]" />
            <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-white">VIP Treatment</h3>
            <p className="text-xs text-[#FAF6F0]/50 font-light leading-relaxed">
              Includes table styling, floral decors, acoustic sound setup, and a dedicated butler team.
            </p>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto text-left">
          
          {/* Booking Form Card */}
          <div className="lg:col-span-7 bg-[#0C2522] border border-[#D5B875]/15 p-6 sm:p-8 rounded-none">
            <h3 className="font-serif text-lg font-light text-white uppercase tracking-wider border-b border-[#D5B875]/15 pb-4 mb-6">
              Banquet Booking Request
            </h3>

            {successMsg ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-12 h-12 bg-[#2ECC71]/15 text-[#2ECC71] flex items-center justify-center mx-auto border border-[#2ECC71]/30 rounded-none">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-base font-semibold uppercase tracking-wider text-white">Inquiry Created</h4>
                <p className="text-xs text-[#FAF6F0]/50 max-w-xs mx-auto leading-relaxed">
                  Redirecting to WhatsApp to send booking parameters to the reservations team...
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                
                {/* Host Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-[#D5B875] uppercase tracking-widest block">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent border-b border-[#D5B875]/25 text-xs text-white py-2 focus:border-[#D5B875] focus:outline-none transition rounded-none placeholder-[#FAF6F0]/25"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-[#D5B875] uppercase tracking-widest block">WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 01712345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-transparent border-b border-[#D5B875]/25 text-xs text-white py-2 focus:border-[#D5B875] focus:outline-none transition rounded-none placeholder-[#FAF6F0]/25"
                    />
                  </div>
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-[#D5B875] uppercase tracking-widest block">Occasion</label>
                    <select
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full bg-transparent border-b border-[#D5B875]/25 text-xs text-white py-2 focus:border-[#D5B875] focus:outline-none transition rounded-none cursor-pointer"
                    >
                      <option value="Corporate Event" className="bg-[#0C2522]">Corporate Dinner</option>
                      <option value="Birthday Celebration" className="bg-[#0C2522]">Birthday Dinner</option>
                      <option value="Anniversary Dinner" className="bg-[#0C2522]">Anniversary Dinner</option>
                      <option value="Family Gathering" className="bg-[#0C2522]">Family Gathering</option>
                      <option value="Private Steak Tasting" className="bg-[#0C2522]">VIP Steak Tasting</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-[#D5B875] uppercase tracking-widest block">Guests (Min 10)</label>
                    <input
                      type="number"
                      required
                      min={10}
                      max={150}
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value) || 10)}
                      className="w-full bg-transparent border-b border-[#D5B875]/25 text-xs text-white py-2 focus:border-[#D5B875] focus:outline-none transition rounded-none"
                    />
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-[#D5B875] uppercase tracking-widest block">Date</label>
                    <input
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full bg-transparent border-b border-[#D5B875]/25 text-xs text-white py-2 focus:border-[#D5B875] focus:outline-none transition rounded-none font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-[#D5B875] uppercase tracking-widest block">Preferred Time</label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full bg-transparent border-b border-[#D5B875]/25 text-xs text-white py-2 focus:border-[#D5B875] focus:outline-none transition rounded-none cursor-pointer"
                    >
                      <option value="12:00 PM - 3:00 PM" className="bg-[#0C2522]">Lunch slot (12PM - 3PM)</option>
                      <option value="3:00 PM - 6:00 PM" className="bg-[#0C2522]">Afternoon slot (3PM - 6PM)</option>
                      <option value="6:00 PM - 9:00 PM" className="bg-[#0C2522]">Dinner slot (6PM - 9PM)</option>
                      <option value="9:00 PM - 11:00 PM" className="bg-[#0C2522]">Late night slot (9PM - 11PM)</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-[#D5B875] uppercase tracking-widest block">Special Menu Requests / Notes</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Please arrange medium-rare Ribeye tasting cuts for 15 guests..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-transparent border-b border-[#D5B875]/25 text-xs text-white py-2 focus:border-[#D5B875] focus:outline-none transition rounded-none placeholder-[#FAF6F0]/20 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#D5B875] hover:bg-[#B99D5C] text-[#051413] py-4 text-xs font-bold uppercase tracking-widest transition duration-200 cursor-pointer rounded-none"
                >
                  Send Booking Request via WhatsApp
                </button>

              </form>
            )}
          </div>

          {/* Sidebar: Submitted inquiries list */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0C2522] border border-[#D5B875]/15 p-6 rounded-none">
              <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-white border-b border-[#D5B875]/10 pb-3 mb-4">
                My Booking Inquiries ({savedInquiries.length})
              </h3>

              {savedInquiries.length === 0 ? (
                <p className="text-xs text-[#FAF6F0]/40 font-light leading-relaxed py-6 text-center">
                  No inquiries submitted from this browser yet. Use the booking request form to plan your events.
                </p>
              ) : (
                <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
                  {savedInquiries.map((inq) => (
                    <div key={inq.id} className="bg-[#051413] border border-[#D5B875]/10 p-4 relative group">
                      <button
                        onClick={() => handleDeleteInquiry(inq.id)}
                        className="absolute top-4 right-4 text-[#E74C3C]/50 hover:text-[#E74C3C] text-[10px] uppercase font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        Remove
                      </button>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] text-[#D5B875] font-bold uppercase tracking-widest">{inq.id}</span>
                          <span className="text-[9px] text-[#2ECC71] font-bold uppercase tracking-wider">Inquiry Sent</span>
                        </div>
                        <h4 className="font-serif text-sm font-semibold text-white uppercase">{inq.occasion}</h4>
                        <div className="text-[10px] text-[#FAF6F0]/65 space-y-0.5">
                          <p>Guests: {inq.guests} persons</p>
                          <p>Date: {inq.date} ({inq.timeSlot})</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Contact info */}
            <div className="bg-[#0C2522] border border-[#D5B875]/15 p-6 rounded-none text-xs space-y-3">
              <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-wider">Direct Desk</h4>
              <p className="text-[#FAF6F0]/60 font-light leading-relaxed">
                If you prefer planning directly over a phone call with our banquet manager:
              </p>
              <div className="flex items-center gap-2 font-bold text-[#D5B875] mt-2">
                <Phone className="w-4 h-4" />
                <span>+880 1700 000000</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
