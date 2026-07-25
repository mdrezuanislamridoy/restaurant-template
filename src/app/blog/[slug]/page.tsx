'use client';

import React, { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, MessageSquare, Check, User, Share2 } from 'lucide-react';
import { FaFacebookF } from 'react-icons/fa';

interface PostDetail {
  title: string;
  category: string;
  image: string;
  readTime: string;
  date: string;
  contentHtml: string;
}

export default function BlogPostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const slug = resolvedParams.slug;
  const [copied, setCopied] = useState(false);

  const postsData: { [key: string]: PostDetail } = {
    'why-woodhouse-grill-has-redefined-dining-in-gulshan': {
      title: 'Why Woodhouse Grill Has Redefined the Dining Scene in Gulshan',
      category: 'Fine Dining Reviews',
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1200&auto=format&fit=crop&q=80',
      readTime: '5 min read',
      date: 'Jul 25, 2026',
      contentHtml: `
        <p>If you've driven down Road 53 in Gulshan-2 recently, you've likely noticed the elegant, industrial-chic entrance of <strong>Woodhouse Grill</strong>. Located directly opposite the Gulshan Club, this dining spot has quickly built a reputation as the premier steakhouse in Dhaka. But what exactly sets it apart from other high-end grills?</p>
        
        <h3>1. The Art of Dry-Aging in House</h3>
        <p>Unlike standard restaurants that cook imported meat straight out of the freezer, Woodhouse Grill features custom dry-aging cellars right inside the dining room. Here, prime Angus beef cuts and massive Tomahawk slabs are aged under strict temperature and humidity controls for 21 to 28 days. This process breaks down muscle fibers and concentrates flavor, producing steaks that are incredibly tender and rich.</p>
        
        <h3>2. Unbeatable Sizzle: Flame-Grilling Over Hickory Wood</h3>
        <p>True grill lovers know that gas grills cannot match the smokiness of real wood coals. Woodhouse Grill uses a custom Argentine-style parilla grill fueled by seasoned hickory wood. This infuses every Ribeye, T-Bone, and Tenderloin with a distinctive woody aroma and a perfectly charred crust.</p>
        
        <h3>3. Customized Dining: Precision Doneness Selection</h3>
        <p>At Woodhouse, the details matter. Our online ordering system and waitstaff ensure you select the precise doneness (Medium-Rare, Medium, Well-Done) and choice of sauce (Hickory Smoked Pepper, Forest Mushroom, Garlic Butter) before adding items to your platter. We believe every cut is unique and should be grilled to your exact preferences.</p>
        
        <h3>4. VIP Treatment in Gulshan-2</h3>
        <p>From casual dining to Monday slider specials and private steak tasting events, the hospitality team at Woodhouse ensures that every meal feels like a celebration. Our private banquet packages include custom multi-course menus and dedicated VIP service staffs.</p>
        
        <blockquote>
          "We wanted to build a place in Gulshan where customers could enjoy dry-aged, high-quality steaks grilled over real wood coals. No gas, no shortcuts." <br/>
          <span style="font-size: 11px; color: #D4AF37;">— Woodhouse Culinary Director</span>
        </blockquote>

        <p>Visit us today at Plot 12, Road 53, Gulshan-2 (Opposite Gulshan Club), Dhaka, or browse our online platter builder to order delivery right to your door!</p>
      `,
    },
    'art-of-grilling-ribeye': {
      title: 'The Art of Grilling Ribeye: A Masterclass',
      category: 'Grill Guides',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop&q=80',
      readTime: '4 min read',
      date: 'Jun 18, 2026',
      contentHtml: `
        <p>Grilling a Ribeye requires precision. Our head chef shares the key steps to achieving the perfect crust and tender center.</p>
        
        <h3>1. Temper the Meat</h3>
        <p>Never place a cold steak directly onto a hot grill. Let it rest at room temperature for 30 minutes before cooking. This ensures even heat distribution.</p>
        
        <h3>2. Generous Salt Crust</h3>
        <p>We use coarse kosher salt and cracked black pepper to form a thick crust on the outside. This locks in the juices during searing.</p>
        
        <h3>3. Fire Zones</h3>
        <p>Set up two fire zones: a high-heat zone for direct searing (2 minutes per side) and a medium-heat zone for indirect cooking to reach internal doneness.</p>
      `,
    },
    'wagyu-vs-angus-beef': {
      title: 'Wagyu vs. Angus Beef: Understanding Marbling',
      category: 'Steak Secrets',
      image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=1200&auto=format&fit=crop&q=80',
      readTime: '3 min read',
      date: 'May 12, 2026',
      contentHtml: `
        <p>Marbling refers to the white flecks of intramuscular fat running through the meat. This fat melts during cooking, providing juiciness and flavor.</p>
        
        <h3>Angus Beef</h3>
        <p>Certified Angus Beef has excellent marbling, producing a hearty, rich beef flavor. It is the classic steakhouse standard.</p>
        
        <h3>Wagyu Beef</h3>
        <p>Australian Wagyu (Grade 6+) has much finer, denser marbling. This creates an incredibly soft, buttery texture that literally melts in your mouth.</p>
      `,
    },
  };

  const post = postsData[slug];

  useEffect(() => {
    // Scroll reveal handled in CSS
  }, [slug]);

  if (!post) {
    return (
      <div className="bg-[#0F0F0F] min-h-screen py-24 px-4 text-center text-white">
        <div className="max-w-md mx-auto space-y-4">
          <h2 className="text-2xl font-serif font-bold text-[#D4AF37]">Article Not Found</h2>
          <p className="text-sm text-white/50">
            The article you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 bg-[#D4AF37] hover:bg-[#AA820A] text-[#0F0F0F] px-5 py-2.5 rounded-xl text-xs font-bold transition shadow"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0F0F0F] min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Breadcrumbs */}
        <div className="flex items-center justify-between text-xs text-white/50 fade-up">
          <button
            onClick={() => router.push('/blog')}
            className="inline-flex items-center gap-1.5 hover:text-[#D4AF37] font-bold transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </button>
          <span>
            <Link href="/" className="hover:text-[#D4AF37]">Home</Link> &gt;{' '}
            <Link href="/blog" className="hover:text-[#D4AF37]">Blog</Link> &gt;{' '}
            <span className="text-[#D4AF37] font-bold truncate max-w-[150px] inline-block align-bottom">
              {post.title}
            </span>
          </span>
        </div>

        {/* Cover Image */}
        <div className="w-full h-64 sm:h-96 rounded-3xl overflow-hidden border border-[#282828] shadow-lg relative bg-white/5 fade-up">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white text-left">
            <span className="text-[10px] uppercase font-black text-[#0F0F0F] bg-[#D4AF37] px-2.5 py-0.5 rounded-md inline-block mb-3 tracking-wider">
              {post.category}
            </span>
            <h1 className="text-xl sm:text-3xl font-serif font-black leading-tight">
              {post.title}
            </h1>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-6 text-xs text-white/50 border-b border-[#282828] pb-4 fade-up justify-start">
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-[#D4AF37]" />
            <span>Woodhouse Editorial</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#D4AF37]" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#D4AF37]" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-9 bg-[#1A1A1A] border border-[#282828] p-6 sm:p-8 rounded-3xl shadow-lg text-left fade-up">
            <article
              className="prose prose-sm prose-invert max-w-none text-white/80 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-4 fade-up lg:sticky lg:top-36">
            <div className="bg-[#1A1A1A] border border-[#282828] p-5 rounded-3xl shadow-lg text-center space-y-4">
              <h4 className="font-serif font-extrabold text-sm text-white uppercase tracking-wider flex items-center justify-center gap-1.5">
                Share Article
              </h4>
              
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    typeof window !== 'undefined' ? window.location.href : ''
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#3B5998] hover:bg-[#2d4373] text-white py-2 rounded-xl flex items-center justify-center transition cursor-pointer"
                >
                  <FaFacebookF className="w-4.5 h-4.5" />
                </a>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    post.title + ' ' + (typeof window !== 'undefined' ? window.location.href : '')
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#1ebd59] text-white py-2 rounded-xl flex items-center justify-center transition cursor-pointer"
                >
                  <MessageSquare className="w-4.5 h-4.5 fill-current" />
                </a>

                <button
                  onClick={handleCopyLink}
                  className="bg-[#121212] border border-[#282828] hover:bg-white/5 text-[#D4AF37] py-2 rounded-xl flex items-center justify-center transition cursor-pointer"
                >
                  {copied ? <Check className="w-4.5 h-4.5 text-[#2ECC71]" /> : <Share2 className="w-4.5 h-4.5" />}
                </button>
              </div>

              {copied && <span className="text-[10px] text-[#2ECC71] font-semibold block">Link copied!</span>}
            </div>

            <div className="bg-[#FFF0C2]/5 border border-[#D4AF37]/20 p-5 rounded-3xl shadow-sm text-center">
              <h4 className="font-serif font-extrabold text-xs text-[#D4AF37] uppercase tracking-wider mb-2">
                Hungry for Steak?
              </h4>
              <p className="text-[11px] text-white/70 mb-4 leading-normal">
                Explore our fire-grilled Ribeyes and custom burgers!
              </p>
              <Link
                href="/menu"
                className="w-full bg-[#D4AF37] hover:bg-[#AA820A] text-[#0F0F0F] py-2.5 rounded-xl font-bold text-xs cursor-pointer shadow-md transition block"
              >
                Browse Menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
