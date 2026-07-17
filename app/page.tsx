"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Sparkles, 
  Check, 
  ChevronRight, 
  ArrowRight, 
  Mail, 
  X, 
  Info,
  Package,
  Heart
} from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { products, Product } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function HomePage() {
  // Catalog filtering states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);
  
  // Lightbox gallery states
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);

  // Mounting state to prevent server/client URL hydration mismatches
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Dynamic WhatsApp ordering url generator
  const getWhatsAppLink = (productName: string, price: number, imagePath: string) => {
    const origin = isMounted && typeof window !== "undefined" ? window.location.origin : "https://poojabagcollection.com";
    const imageUrl = `${origin}${imagePath}`;
    const text = `Hello Pooja Bag Collection,\n\nI would like to order this bag.\n\nProduct:\n${productName}\n\nPrice:\n₹${price}\n\nProduct Image:\n${imageUrl}\n\nPlease share more details.`;
    return `https://wa.me/919828752253?text=${encodeURIComponent(text)}`;
  };

  const getBulkInquiryLink = () => {
    const text = `Hello,\n\nI want to enquire regarding wholesale/bulk bag orders.\n\nPlease share catalogue and pricing.`;
    return `https://wa.me/919828752253?text=${encodeURIComponent(text)}`;
  };

  // Filter products based on search term and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Extract categories
  const categories = ["All", "Personalized Totes", "Floral Embroidery", "Jeweled Handles", "Luxury Handbags"];

  // Featured bags for hero / callouts
  const heroFeaturedBag = products[2]; // Outstay Jeweled Canvas Handbag (WhatsApp Image 2026-07-17 at 4.51.17 PM.jpeg)
  const promoFeaturedBag = products[0]; // Aasha Custom Embroidered Tote (WhatsApp Image 2026-07-17 at 4.51.16 PM.jpeg)

  // Masonry gallery photos (using elements from assets)
  const galleryImages = products.slice(10, 22).map(p => p.image);

  return (
    <div className="relative min-h-screen bg-cream-bg text-charcoal selection:bg-maroon-primary selection:text-white overflow-x-hidden">
      {/* Top Banner */}
      <div className="bg-maroon-dark text-white/95 text-[10px] sm:text-xs tracking-[0.2em] font-sans font-medium uppercase py-2.5 px-4 text-center border-b border-gold-accent/20 relative z-50 flex items-center justify-between">
        <div className="hidden sm:block w-24"></div>
        <div className="flex-1 text-center font-semibold">
          ✨ FREE SHIPPING ON ALL PREPAID ORDERS ✨
        </div>
        <div className="hidden sm:flex items-center gap-3 w-24 justify-end text-white/80">
          <a href="https://instagram.com" className="hover:text-gold-accent transition-colors"><FaInstagram className="w-3.5 h-3.5" /></a>
          <a href="https://wa.me/919828752253" className="hover:text-gold-accent transition-colors"><FaWhatsapp className="w-3.5 h-3.5" /></a>
        </div>
      </div>

      <Navbar />

      {/* Hero Section */}
      <section id="home" className="pt-28 pb-16 sm:pb-24 lg:pt-36 lg:pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-cream-accent/30 via-cream-bg to-cream-bg">
        {/* Soft Background Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-maroon-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-accent/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Left Content */}
          <motion.div 
            className="lg:col-span-7 flex flex-col gap-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            suppressHydrationWarning
          >
            <span className="text-gold-accent font-sans text-xs sm:text-sm tracking-[0.3em] font-semibold uppercase">
              CARRY CONFIDENCE
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-maroon-primary leading-[1.1] font-bold tracking-tight">
              Elegance in <br className="hidden sm:block" />
              <span className="italic font-normal font-serif text-gold-accent">Every Detail</span>
            </h1>
            <p className="text-sm sm:text-base text-charcoal/80 max-w-xl font-sans leading-relaxed">
              Premium handcrafted custom bags designed with precision for every occasion. Experience the touch of luxurious embroidery, personalized detailing, and durable craftsmanship.
            </p>
            
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <a
                href={getWhatsAppLink(heroFeaturedBag.name, heroFeaturedBag.price, heroFeaturedBag.image)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-maroon-primary hover:bg-maroon-light text-white font-sans text-xs tracking-widest font-semibold uppercase rounded-full shadow-lg transition-luxury hover:scale-105"
              >
                <FaWhatsapp className="w-4 h-4 text-gold-accent" />
                BUY FROM WHATSAPP
              </a>
              
              <button 
                onClick={() => {
                  const element = document.getElementById("shop");
                  element?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="inline-flex items-center gap-1.5 px-6 py-3.5 border border-maroon-primary/20 text-maroon-primary hover:border-maroon-primary hover:bg-maroon-primary/5 font-sans text-xs tracking-widest font-semibold uppercase rounded-full transition-luxury"
              >
                Explore Catalog
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Dividers & Bullet benefits */}
            <div className="w-full h-[1px] bg-gold-accent/20 my-4" />
            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 sm:gap-x-12 text-xs text-maroon-primary font-medium tracking-wide font-sans">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-maroon-primary/5 flex items-center justify-center text-gold-accent">
                  <Check className="w-3 h-3" />
                </div>
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-maroon-primary/5 flex items-center justify-center text-gold-accent">
                  <Check className="w-3 h-3" />
                </div>
                <span>Trendy Designs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-maroon-primary/5 flex items-center justify-center text-gold-accent">
                  <Check className="w-3 h-3" />
                </div>
                <span>Limited Stock</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Right Featured Bag */}
          <motion.div 
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            suppressHydrationWarning
          >
            {/* Ambient Lighting Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold-accent/20 rounded-full blur-3xl pointer-events-none animate-pulse -z-10" />
            
            {/* Floating Price Badge */}
            <motion.div 
              className="absolute -top-4 -left-4 sm:left-4 z-20 w-24 h-24 sm:w-28 sm:h-28 bg-maroon-primary border-2 border-gold-accent text-white rounded-full flex flex-col items-center justify-center text-center shadow-2xl p-2 cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              onClick={() => {
                const element = document.getElementById("shop");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <div className="text-[9px] uppercase tracking-wider text-gold-accent font-medium leading-none">Starting</div>
              <div className="text-[9px] uppercase tracking-wider text-gold-accent font-medium mb-0.5">From</div>
              <div className="font-serif text-lg sm:text-xl font-bold text-white">₹499/-</div>
              <div className="text-[8px] uppercase tracking-widest text-white/70 font-sans">Only</div>
            </motion.div>

            {/* Frame for the Image */}
            <div className="relative w-full max-w-[380px] aspect-[3/4] bg-cream-card rounded-2xl p-3 shadow-2xl border border-gold-accent/15 group overflow-hidden">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-cream-accent/20">
                <Image
                  src={heroFeaturedBag.image}
                  alt={heroFeaturedBag.name}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-w-768px) 100vw, 400px"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Offers Section */}
      <section id="offers" className="py-20 px-4 sm:px-6 lg:px-8 bg-cream-card border-b border-gold-accent/15 relative overflow-hidden">
        {/* Soft background elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-maroon-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center flex flex-col items-center gap-3 mb-12">
            <span className="text-gold-accent font-sans text-xs tracking-[0.3em] font-semibold uppercase">
              EXCLUSIVE DEALS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-maroon-primary font-bold tracking-tight uppercase">
              Special Offers
            </h2>
            <div className="h-[1px] w-24 bg-gold-accent/40" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Box: Pricing Tier */}
            <div className="lg:col-span-7 bg-maroon-primary text-white border border-gold-accent/20 rounded-3xl p-6 sm:p-10 flex flex-col justify-between shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-accent/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-gold-accent text-maroon-dark text-[10px] tracking-wider uppercase font-bold rounded-full">
                    Best Value
                  </span>
                </div>
                
                <div className="space-y-4">
                  {/* Tier 1 */}
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="font-serif text-base sm:text-lg font-medium text-white/90">1 Bag Price</span>
                    <span className="font-serif text-xl sm:text-2xl font-bold text-gold-accent">₹499/-</span>
                  </div>
                  
                  {/* Tier 2 */}
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="font-serif text-base sm:text-lg font-medium text-white/90">2 Bags Price</span>
                    <span className="font-serif text-xl sm:text-2xl font-bold text-gold-accent">₹899/-</span>
                  </div>
                  
                  {/* Tier 3 */}
                  <div className="flex justify-between items-center py-3">
                    <div className="flex flex-col">
                      <span className="font-serif text-base sm:text-lg font-medium text-white/90">3 Bags (Buy 3 Get 1 Free)</span>
                      <span className="text-[10px] text-gold-accent/90 uppercase tracking-widest font-sans font-semibold">One Bag Absolutely Free!</span>
                    </div>
                    <span className="font-serif text-xl sm:text-2xl font-bold text-gold-accent">₹1199/-</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex flex-col text-left">
                  <span className="text-white/60 text-xs font-sans">For custom selections:</span>
                  <span className="text-gold-accent font-serif text-xs font-bold mt-0.5">Mix & Match Any Designs</span>
                </div>
                <a
                  href="https://wa.me/919828752253?text=Hello%20Pooja%20Bag%20Collection%2C%20I%20want%20to%20avail%20the%20Special%20Offer%20(3%20Bags%20%2B%201%20Free%20for%20%E2%82%B91199)."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-sans text-xs tracking-wider uppercase font-semibold inline-flex items-center gap-2 shadow-lg transition-transform hover:scale-105"
                >
                  <FaWhatsapp className="w-4 h-4 fill-current" />
                  CLAIM OFFER
                </a>
              </div>
            </div>

            {/* Right Box: Policy Details */}
            <div className="lg:col-span-5 bg-cream-bg border border-gold-accent/20 rounded-3xl p-6 sm:p-10 flex flex-col justify-center gap-6 shadow-md">
              <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-4 flex gap-3.5 items-start">
                <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shrink-0 text-sm">
                  ❌
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-maroon-primary mb-1">Prepaid Orders Only</h4>
                  <p className="text-xs text-charcoal/80 font-sans leading-relaxed">
                    Cash on delivery (COD) is not available. We accept secure UPI payments and bank transfers.
                  </p>
                </div>
              </div>

              <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4 flex gap-3.5 items-start">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0 text-sm">
                  ✅
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-maroon-primary mb-1">7 Days Returns & Exchange</h4>
                  <p className="text-xs text-charcoal/80 font-sans leading-relaxed">
                    Shop with confidence. 7 days return and exchange policy is fully available.
                  </p>
                </div>
              </div>
              
              <div className="bg-gold-accent/5 border border-gold-accent/15 rounded-2xl p-4 flex gap-3.5 items-start">
                <div className="w-8 h-8 rounded-full bg-gold-accent/10 flex items-center justify-center text-gold-accent shrink-0 text-sm">
                  🎁
                </div>
                <div>
                  <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-maroon-primary mb-1">Buy 3 Get 1 Free</h4>
                  <p className="text-xs text-charcoal/80 font-sans leading-relaxed">
                    Add any 4 bags to your inquiry, and pay only for 3! Get 1 bag free under our premium tier.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop & Catalog Section */}
      <section id="shop" className="bg-maroon-primary py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background illustration */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,#D4AF37_1px,transparent_1px)] bg-[size:20px_20px]" />
        
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center flex flex-col items-center gap-3 mb-16">
            <span className="text-gold-accent font-sans text-xs tracking-[0.3em] font-semibold uppercase">
              OUR COLLECTION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-bold tracking-tight">
              Stylish. Premium. You.
            </h2>
            
            {/* Elegant Divider */}
            <div className="flex items-center gap-4 w-40 my-2">
              <div className="h-[1px] bg-gold-accent/30 flex-grow" />
              <Sparkles className="w-4 h-4 text-gold-accent shrink-0" />
              <div className="h-[1px] bg-gold-accent/30 flex-grow" />
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="bg-maroon-dark/50 border border-gold-accent/15 rounded-2xl p-6 mb-12 flex flex-col md:flex-row gap-6 justify-between items-center relative z-10 backdrop-blur-md">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-accent/60" />
              <input
                type="text"
                placeholder="Search premium bags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-maroon-primary/45 border border-gold-accent/25 rounded-full py-2.5 pl-10 pr-4 text-white text-xs placeholder-white/40 focus:outline-none focus:border-gold-accent transition-colors font-sans"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setVisibleCount(8); // Reset pagination
                  }}
                  className={`px-4 py-2 rounded-full font-sans text-[10px] uppercase tracking-wider font-semibold border transition-all duration-300 ${
                    selectedCategory === cat
                      ? "bg-gold-accent text-maroon-dark border-gold-accent"
                      : "bg-transparent text-white/80 border-white/10 hover:border-gold-accent/30 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Catalog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            <AnimatePresence mode="popLayout">
              {filteredProducts.slice(0, visibleCount).map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => setActiveLightboxImage(product.image)}
                  className="group bg-maroon-dark/30 border border-gold-accent/10 rounded-2xl p-3 flex flex-col gap-4 hover:border-gold-accent/30 transition-all duration-300 cursor-pointer"
                  suppressHydrationWarning
                >
                  {/* Product Image Frame */}
                  <div className="relative aspect-[3/4] w-full bg-maroon-primary/20 rounded-xl overflow-hidden border border-white/5">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 250px"
                    />
                    
                    {/* Hover Order Overlay */}
                    <div className="absolute inset-0 bg-maroon-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      <a
                        href={getWhatsAppLink(product.name, product.price, product.image)}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-sans text-[10px] tracking-wider uppercase font-semibold inline-flex items-center gap-1.5 shadow-lg transition-transform duration-300 translate-y-4 group-hover:translate-y-0"
                      >
                        <FaWhatsapp className="w-3.5 h-3.5 fill-current" />
                        Quick Order
                      </a>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col gap-3 px-1.5 pb-2">
                    <div className="flex flex-col min-h-[44px]">
                      <span className="text-[10px] uppercase tracking-wider text-gold-accent/80 font-sans font-medium mb-1">
                        {product.category}
                      </span>
                      <h3 className="font-serif text-sm sm:text-base font-semibold text-white/95 leading-snug group-hover:text-gold-accent transition-colors duration-300">
                        {product.name}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between gap-2 mt-1">
                      {/* Price Tag Box */}
                      <div className="bg-maroon-dark border border-gold-accent/20 rounded-lg px-2.5 py-1 text-center">
                        <span className="font-serif text-sm font-bold text-gold-accent">
                          ₹{product.price}/-
                        </span>
                      </div>

                      {/* Buy WhatsApp Link */}
                      <a
                        href={getWhatsAppLink(product.name, product.price, product.image)}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] tracking-widest font-semibold uppercase text-white hover:text-gold-accent transition-colors duration-300 font-sans"
                      >
                        Buy on WhatsApp
                        <ChevronRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty Search Results state */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16 text-white/60 flex flex-col items-center gap-3">
              <Package className="w-12 h-12 text-gold-accent/40" />
              <p className="font-sans text-sm">No premium bags match your search query.</p>
              <button 
                onClick={() => { setSearchTerm(""); setSelectedCategory("All"); }}
                className="mt-2 text-xs text-gold-accent hover:underline uppercase tracking-widest font-semibold font-sans"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Load More Button */}
          {filteredProducts.length > visibleCount && (
            <div className="text-center mt-16 relative z-10">
              <button
                onClick={() => setVisibleCount((prev) => prev + 8)}
                className="px-8 py-3 border border-white/20 text-white hover:border-gold-accent hover:text-gold-accent transition-all duration-300 font-sans text-xs tracking-widest font-semibold uppercase rounded-full inline-flex items-center gap-2"
              >
                VIEW ALL COLLECTIONS
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Promotional Callout Banner */}
      <section id="collections" className="py-24 px-4 sm:px-6 lg:px-8 bg-cream-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="bg-cream-card border border-gold-accent/15 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-xl hover:shadow-2xl transition-shadow duration-500">
            {/* Promo text */}
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center gap-6">
              <span className="text-gold-accent font-sans text-xs tracking-[0.3em] font-semibold uppercase">
                EXQUISITE COLLECTION
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-maroon-primary font-bold leading-tight">
                Handcrafted with Love
              </h2>
              <p className="text-charcoal/80 text-sm font-sans leading-relaxed max-w-md">
                Each bag is meticulously hand stitched by master craftsmen, blending traditional techniques with modern style. Celebrate your unique identity with customized embroidered names and beautiful floral designs.
              </p>
              <div>
                <a
                  href={getWhatsAppLink(promoFeaturedBag.name, promoFeaturedBag.price, promoFeaturedBag.image)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-maroon-primary hover:bg-maroon-light text-white font-sans text-xs tracking-widest font-semibold uppercase rounded-full shadow-lg transition-luxury hover:scale-105"
                >
                  <FaWhatsapp className="w-4 h-4 text-gold-accent" />
                  BUY FROM WHATSAPP
                </a>
              </div>
            </div>

            {/* Promo Image */}
            <div className="relative min-h-[300px] lg:min-h-full aspect-[4/3] lg:aspect-auto overflow-hidden">
              <Image
                src={promoFeaturedBag.image}
                alt="Premium Handcrafted Bag Detail"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-w-1024px) 100vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-primary/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream-accent/20 border-t border-b border-gold-accent/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col gap-3 p-4 bg-cream-card border border-gold-accent/5 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-10 h-10 rounded-full bg-maroon-primary/5 flex items-center justify-center text-maroon-primary">
                <Sparkles className="w-5 h-5 text-gold-accent" />
              </div>
              <h3 className="font-serif text-sm font-semibold tracking-wide uppercase text-maroon-primary">
                Handcrafted
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed font-sans">
                Made with love and perfection by skilled Indian artisans.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col gap-3 p-4 bg-cream-card border border-gold-accent/5 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-10 h-10 rounded-full bg-maroon-primary/5 flex items-center justify-center text-maroon-primary">
                <Check className="w-5 h-5 text-gold-accent" />
              </div>
              <h3 className="font-serif text-sm font-semibold tracking-wide uppercase text-maroon-primary">
                Premium Quality
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed font-sans">
                Best quality canvas fabrics, embroidery threads, and durable hardware.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col gap-3 p-4 bg-cream-card border border-gold-accent/5 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-10 h-10 rounded-full bg-maroon-primary/5 flex items-center justify-center text-maroon-primary">
                <Heart className="w-5 h-5 text-gold-accent" />
              </div>
              <h3 className="font-serif text-sm font-semibold tracking-wide uppercase text-maroon-primary">
                Trendy Designs
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed font-sans">
                Custom letters and floral patterns curated for modern wardrobes.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col gap-3 p-4 bg-cream-card border border-gold-accent/5 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-10 h-10 rounded-full bg-maroon-primary/5 flex items-center justify-center text-maroon-primary">
                <Package className="w-5 h-5 text-gold-accent" />
              </div>
              <h3 className="font-serif text-sm font-semibold tracking-wide uppercase text-maroon-primary">
                Secure Ordering
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed font-sans">
                Direct shopping via WhatsApp with fast dispatch and secure tracing.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a
              href="https://wa.me/919828752253?text=Hello%20Pooja%20Bag%20Collection%2C%20I%20am%20interested%20in%20ordering%20premium%20handbags."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-maroon-primary hover:bg-maroon-light text-white font-sans text-xs tracking-widest font-semibold uppercase rounded-full shadow-lg transition-luxury hover:scale-105"
            >
              <FaWhatsapp className="w-4 h-4 text-gold-accent" />
              BUY FROM WHATSAPP
            </a>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-cream-bg">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center flex flex-col items-center gap-3 mb-16">
            <span className="text-gold-accent font-sans text-xs tracking-[0.3em] font-semibold uppercase">
              VISUAL INSPIRATION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-maroon-primary font-bold tracking-tight">
              Luxury Masonry Gallery
            </h2>
            <div className="h-[1px] w-24 bg-gold-accent/30 my-1" />
          </div>

          {/* Masonry Columns */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryImages.map((src, index) => (
              <motion.div
                key={index}
                className="break-inside-avoid relative overflow-hidden rounded-2xl border border-gold-accent/10 shadow-sm cursor-zoom-in group bg-cream-card p-1.5"
                whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(91, 6, 18, 0.08)" }}
                onClick={() => setActiveLightboxImage(src)}
              >
                <div className="relative rounded-xl overflow-hidden aspect-[3/4]">
                  <Image
                    src={src}
                    alt={`Pooja Bag Premium Design Showcase ${index + 1}`}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 350px"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-cream-card relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Details */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <span className="text-gold-accent font-sans text-xs tracking-[0.3em] font-semibold uppercase">
              OUR HERITAGE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-maroon-primary font-bold tracking-tight">
              About Pooja Bag Collection
            </h2>
            <div className="h-[1px] w-20 bg-gold-accent/30 my-0.5" />
            <div className="text-charcoal/80 text-sm font-sans leading-relaxed space-y-4">
              <p>
                Located in the heart of Mumbai at Kalbadevi, <strong>Pooja Bag Collection</strong> has been serving fashion-forward customers and business resellers with outstanding premium ladies handbags and handcrafted bags.
              </p>
              <p>
                Our collections showcase a wide variety of stylish bags, featuring customized name embroideries, floral stitch arts, and jeweled handle totes. We serve both retail shoppers looking for a unique touch, and wholesale sellers looking for bulk stock at highly competitive pricing.
              </p>
              <p>
                Trusted quality, attention to finishing details, and seamless shopping support directly through WhatsApp make us Mumbai&apos;s choice for premium custom bag creations.
              </p>
            </div>
          </div>

          {/* Right Showcase Box */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[450px] aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-gold-accent/25">
              <Image
                src={products[8].image} // Choose another premium bag
                alt="Pooja Bag Collection Crafting and Heritage"
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-w-768px) 100vw, 450px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-primary/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-center">
                <span className="text-gold-accent uppercase text-[10px] tracking-widest font-sans font-semibold">ESTABLISHED TRUST</span>
                <p className="font-serif text-sm font-medium mt-1">Wholesale & Retail Bag Creators Since Years</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bulk Inquiry Section */}
      <section id="bulk" className="bg-maroon-primary py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative subtle border rings */}
        <div className="absolute -bottom-48 -right-48 w-96 h-96 border border-gold-accent/15 rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6 relative z-10">
          <span className="text-gold-accent font-sans text-xs tracking-[0.3em] font-semibold uppercase">
            WHOLESALE & BULK ORDERS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-bold leading-tight">
            Grow Your Business With Us
          </h2>
          <p className="text-white/80 text-sm font-sans max-w-xl leading-relaxed">
            Are you a boutique store owner, reseller, or gifting business? We accept custom bulk orders and ship wholesale consignments across India. Enquire now for custom quotes and pricing catalog.
          </p>
          <div className="pt-2">
            <a
              href={getBulkInquiryLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-10 py-4 bg-white text-maroon-primary hover:bg-gold-light font-sans text-xs tracking-widest font-bold uppercase rounded-full shadow-2xl transition-luxury hover:scale-105"
            >
              <FaWhatsapp className="w-4 h-4 text-emerald-600 fill-current" />
              SEND BULK ENQUIRY
            </a>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-cream-bg">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center flex flex-col items-center gap-3 mb-16">
            <span className="text-gold-accent font-sans text-xs tracking-[0.3em] font-semibold uppercase">
              GET IN TOUCH
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-maroon-primary font-bold tracking-tight">
              Contact Us
            </h2>
            <div className="h-[1px] w-20 bg-gold-accent/30 my-0.5" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Contact Details Panel */}
            <div className="lg:col-span-5 bg-cream-card border border-gold-accent/15 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-md">
              <div className="flex flex-col gap-6">
                <h3 className="font-serif text-xl font-bold text-maroon-primary">POOJA BAG COLLECTION</h3>
                
                <div className="h-[1px] w-full bg-gold-accent/10" />

                <div className="flex flex-col gap-5">
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-gold-accent shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-maroon-primary mb-1">Address</h4>
                      <p className="text-xs text-charcoal/80 font-sans leading-relaxed">
                        Shop No. 7, First Floor, Barar House, 237/243 Abdul Rehman Street, Khokha Bazar, Kalbadevi, Mumbai – 400003
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Phone className="w-5 h-5 text-gold-accent shrink-0" />
                    <div>
                      <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-maroon-primary mb-1">WhatsApp & Call</h4>
                      <a href="tel:+919828752253" className="text-xs text-charcoal/80 hover:text-maroon-primary transition-colors font-sans block">
                        +91 98287 52253
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Clock className="w-5 h-5 text-gold-accent shrink-0" />
                    <div>
                      <h4 className="font-serif text-xs font-semibold uppercase tracking-wider text-maroon-primary mb-1">Business Hours</h4>
                      <p className="text-xs text-charcoal/80 font-sans">Open 24 Hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mt-8">
                <a
                  href="https://wa.me/919828752253?text=Hello%20Pooja%20Bag%20Collection%2C%20I%20would%20like%20to%20visit%20your%20store."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs uppercase tracking-wider font-semibold font-sans transition-colors"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  Chat on WhatsApp
                </a>
                
                <a
                  href="tel:+919828752253"
                  className="flex items-center justify-center gap-2 py-3 border border-maroon-primary/20 hover:border-maroon-primary hover:bg-maroon-primary/5 text-maroon-primary rounded-xl text-xs uppercase tracking-wider font-semibold font-sans transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Owner Now
                </a>
              </div>
            </div>

            {/* Google Map Box */}
            <div className="lg:col-span-7 relative min-h-[350px] lg:min-h-full bg-cream-card rounded-3xl overflow-hidden shadow-md border border-gold-accent/15 flex flex-col">
              <div className="flex-grow relative">
                <iframe
                  title="Pooja Bag Collection Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.8647734898135!2d72.83151817596825!3d18.948491855653066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1dddf89b917%3A0xe543b59373e7d41f!2sAbdul%20Rehman%20St%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
              <div className="bg-cream-accent/40 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-gold-accent/10">
                <span className="text-[11px] text-charcoal/70 font-sans flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-gold-accent" />
                  Click button to navigate with Google Maps
                </span>
                <a
                  href="https://maps.google.com/?q=Barar+House,+237/243+Abdul+Rehman+Street,+Mumbai+-+400003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-maroon-primary hover:bg-maroon-light text-white rounded-lg font-sans text-[10px] tracking-wider uppercase font-semibold transition-colors"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <FloatingCTA />

      {/* Photo Lightbox Dialog */}
      <AnimatePresence>
        {activeLightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button
              onClick={() => setActiveLightboxImage(null)}
              className="absolute top-6 right-6 text-white hover:text-gold-accent transition-colors p-2 z-10"
              aria-label="Close Lightbox"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative max-w-4xl max-h-[85vh] aspect-[3/4] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeLightboxImage}
                alt="Selected premium bag image full screen details"
                fill
                className="object-contain rounded-lg"
                sizes="100vw"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Structured SEO Schema Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "POOJA BAG COLLECTION",
            "image": [
              "https://poojabagcollection.com/assets/WhatsApp%20Image%202026-07-17%20at%204.53.06%20PM.jpeg"
            ],
            "telephone": "+919828752253",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Shop No. 7, First Floor, Barar House, 237/243 Abdul Rehman Street, Khokha Bazar, Kalbadevi",
              "addressLocality": "Mumbai",
              "addressRegion": "Maharashtra",
              "postalCode": "400003",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 18.948491855653066,
              "longitude": 72.83151817596825
            },
            "url": "https://poojabagcollection.com",
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ],
              "opens": "00:00",
              "closes": "23:59"
            },
            "sameAs": [
              "https://instagram.com"
            ],
            "priceRange": "$$"
          })
        }}
      />
    </div>
  );
}
