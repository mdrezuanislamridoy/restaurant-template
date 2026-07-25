'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Search, ArrowRight, MessageSquare, CheckCircle } from 'lucide-react';

export interface BlogPost {
  title: string;
  slug: string;
  category: string;
  image: string;
  excerpt: string;
  readTime: string;
  date: string;
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [subPhone, setSubPhone] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const posts: BlogPost[] = [
    {
      title: 'Why The Woodhouse Grill Has Redefined Culinary Luxury in Gulshan',
      slug: 'why-woodhouse-grill-has-redefined-dining-in-gulshan',
      category: 'reviews',
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop&q=80',
      excerpt: 'Looking for the best steakhouse in Gulshan? Read our first-hand review of Woodhouse Grill — the cuts, doneness, and cocktails that keep foodies coming back.',
      readTime: '5 min read',
      date: 'Jul 25, 2026',
    },
    {
      title: 'The Art of Grilling Ribeye: A Masterclass by Head Chef',
      slug: 'art-of-grilling-ribeye',
      category: 'guides',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
      excerpt: 'What makes a perfect medium-rare steak? Our head chef shares the secrets of charcoal heat management, seasoning crusts, and butter basting.',
      readTime: '4 min read',
      date: 'Jun 18, 2026',
    },
    {
      title: 'Wagyu vs. Angus Beef: Understanding Marbling and Cuts',
      slug: 'wagyu-vs-angus-beef',
      category: 'secrets',
      image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&auto=format&fit=crop&q=80',
      excerpt: 'Struggling to choose between Australian Wagyu Grade 6+ and Certified Angus Beef? Here\'s a guide to beef marbling scores and tenderness.',
      readTime: '3 min read',
      date: 'May 12, 2026',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'reviews', name: 'Editorial Reviews' },
    { id: 'guides', name: 'Grill Guides' },
    { id: 'secrets', name: 'Steak Secrets' },
  ];

  useEffect(() => {
    // Scroll reveal handled in CSS
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subPhone || subPhone.length < 11) return;
    setIsSubscribed(true);
    setSubPhone('');
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#051413] min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-[#FAF6F0]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 fade-up">
          <div className="inline-flex items-center gap-1.5 border-b border-[#D5B875]/25 pb-2 mb-4">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#D5B875]">
              Woodhouse Editorial
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-light text-white mb-3 uppercase tracking-wide">
            Grill Chronicles
          </h1>
          <p className="text-xs sm:text-sm text-[#FAF6F0]/50 max-w-md mx-auto font-light leading-relaxed">
            Discover recipes, steakhouse reviews, and marbling guides compiled by our culinary directors.
          </p>
          <div className="w-16 h-[1px] bg-[#D5B875] mx-auto mt-5" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Posts Lists (Split editorial frames) */}
          <div className="lg:col-span-8 space-y-8 fade-up">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-20 bg-[#0C2522] border border-[#D5B875]/15">
                <h3 className="text-sm font-serif font-light text-white mb-1 uppercase tracking-widest">No articles found</h3>
                <p className="text-xs text-[#FAF6F0]/50">Adjust your search parameters or category filter.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredPosts.map((post) => (
                  <div
                    key={post.slug}
                    className="bg-[#0C2522] border border-[#D5B875]/15 flex flex-col md:flex-row h-auto md:h-64 group hover:border-[#D5B875] transition-all duration-300 rounded-none overflow-hidden"
                  >
                    {/* Image */}
                    <div className="w-full md:w-72 h-48 md:h-full relative overflow-hidden bg-white/5 flex-shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
                      />
                    </div>

                    {/* Details */}
                    <div className="p-6 flex-1 flex flex-col justify-between text-left">
                      <div>
                        <div className="flex items-center gap-3 mb-2.5">
                          <span className="text-[8px] uppercase font-bold text-[#D5B875] tracking-widest bg-[#D5B875]/5 px-2.5 py-0.5 rounded-none border border-[#D5B875]/20">
                            {post.category}
                          </span>
                          <span className="text-[9px] text-[#FAF6F0]/40 font-bold uppercase tracking-wider">{post.date}</span>
                        </div>
                        <Link href={`/blog/${post.slug}`} className="block group-hover:text-[#D5B875] transition-colors">
                          <h3 className="font-serif font-light text-base sm:text-lg text-white leading-snug uppercase tracking-wider">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="text-xs text-[#FAF6F0]/55 font-light mt-3 leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-[#D5B875]/10 mt-4 text-[10px] uppercase tracking-wider font-bold">
                        <span className="text-[#FAF6F0]/40 font-semibold">{post.readTime}</span>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-[#D5B875] hover:text-[#B99D5C] flex items-center gap-1.5 transition"
                        >
                          Read Article <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6 fade-up lg:sticky lg:top-36 text-left">
            
            {/* Search */}
            <div className="bg-[#0C2522] border border-[#D5B875]/15 p-6 rounded-none space-y-4">
              <h4 className="font-serif font-light text-xs text-white uppercase tracking-[0.2em] border-b border-[#D5B875]/10 pb-2">Filter Articles</h4>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FAF6F0]/30" />
                <input
                  type="text"
                  placeholder="Keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#051413] border border-[#D5B875]/25 text-xs pl-10 pr-4 py-3 rounded-none focus:border-[#D5B875] focus:outline-none transition text-white placeholder-[#FAF6F0]/25"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-[#0C2522] border border-[#D5B875]/15 p-6 rounded-none space-y-4">
              <h4 className="font-serif font-light text-xs text-white uppercase tracking-[0.2em] border-b border-[#D5B875]/10 pb-2">Chronicle Categories</h4>
              <div className="flex flex-col gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-left px-3 py-2 text-[10px] uppercase font-bold tracking-widest transition flex items-center justify-between cursor-pointer rounded-none bg-transparent ${
                      selectedCategory === cat.id
                        ? 'text-[#D5B875] border-b border-[#D5B875]/40'
                        : 'text-[#FAF6F0]/60 hover:text-white border-b border-transparent'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[8px] bg-[#051413] border border-[#D5B875]/15 px-2 py-0.5 font-bold text-[#FAF6F0]/50">
                      {cat.id === 'all'
                        ? posts.length
                        : posts.filter((p) => p.category === cat.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter VIP */}
            <div className="bg-[#051413] border border-[#D5B875]/25 p-6 rounded-none space-y-4 shadow-xl">
              <h4 className="font-serif font-light text-sm text-[#D5B875] uppercase tracking-widest flex items-center gap-1.5 justify-center lg:justify-start">
                <span>🔥</span> Chronicle Club
              </h4>
              <p className="text-[#FAF6F0]/50 text-xs font-light leading-relaxed">
                Unlock recipes and discount codes delivered directly to WhatsApp.
              </p>

              {isSubscribed ? (
                <div className="flex items-center gap-2 text-[#2ECC71] bg-[#2ECC71]/5 border border-[#2ECC71]/20 p-3.5">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="text-[9px] uppercase font-bold tracking-widest">Active Alerts</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{11}"
                    placeholder="WhatsApp Phone Number"
                    value={subPhone}
                    onChange={(e) => setSubPhone(e.target.value)}
                    className="w-full bg-[#0C2522] border border-[#D5B875]/25 text-xs text-white px-4 py-3 rounded-none outline-none focus:border-[#D5B875] transition text-center placeholder-[#FAF6F0]/25"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#D5B875] hover:bg-[#B99D5C] text-[#051413] py-3.5 font-bold text-[10px] uppercase tracking-widest cursor-pointer transition"
                  >
                    Subscribe Alerts
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
