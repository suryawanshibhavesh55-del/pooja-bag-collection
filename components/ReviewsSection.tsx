"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle, Heart, ArrowRight, MessageSquare, ShoppingBag } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  title: string;
  comment: string;
  screenshot?: string; // Optional screenshot path
}

const reviewsData: Review[] = [
  {
    id: 1,
    name: "Aisha M.",
    location: "Mumbai",
    rating: 5,
    title: "Loved the Quality & Fast Delivery",
    comment: "Thank you for this beautiful bag. Loved the quality and I also received it within 2 days. Thank you for the service. Will recommend it to my friends as well. ❤️ Keep going!",
  },
  {
    id: 2,
    name: "Ananya K.",
    location: "Kerala",
    rating: 5,
    title: "Trustworthy Brand",
    comment: "Everyone thinks that because you don't have many followers you might be a scam, but that's completely wrong. People should not judge a business by its follower count. I trusted you, and now people in Kerala will trust you too. Love and respect from Kerala! ❤️",
  },
  {
    id: 3,
    name: "Meera R.",
    location: "Bangalore",
    rating: 5,
    title: "Excellent Quality",
    comment: "Ma'am, I loved the product. ❤️❤️❤️❤️ Honestly, I did not expect such good quality.",
  },
  {
    id: 4,
    name: "Sneha P.",
    location: "Pune",
    rating: 5,
    title: "Amazing Leather Quality",
    comment: "The quality of the bag is really amazing. Surprisingly, it's very spacious too! Thank you. 😊",
  },
  {
    id: 5,
    name: "Divya S.",
    location: "Delhi",
    rating: 5,
    title: "Beautiful Bag & Excellent Material",
    comment: "Thank you so very much for such an amazing bag. 🥰❤️🥰 The material is very good and the bag size is just fabulous. Loved the colour. ❤️ You made my day. Looking forward to shopping more from you. 😊🥰😊",
  }
];

export default function ReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  // Counters state for scroll-in-view trust statistics
  const [happyCustomers, setHappyCustomers] = useState(0);
  const [satisfaction, setSatisfaction] = useState(0);
  const [deliveryDays, setDeliveryDays] = useState(0);
  const [secTransactions, setSecTransactions] = useState(0);
  const [statsAnimated, setStatsAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Auto-scroll loop
  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviewsData.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [autoplay]);

  // Scroll count-up trigger
  useEffect(() => {
    const handleScroll = () => {
      if (!statsRef.current || statsAnimated) return;
      const rect = statsRef.current.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight - 100;
      
      if (isVisible) {
        setStatsAnimated(true);
        // Animate counter logic
        let cCount = 0;
        let sCount = 0;
        let dCount = 0;
        let tCount = 0;
        
        const duration = 2000;
        const steps = 50;
        const intervalTime = duration / steps;
        
        const timer = setInterval(() => {
          cCount += 980 / steps;
          sCount += 99 / steps;
          dCount += 2 / steps;
          tCount += 100 / steps;
          
          if (cCount >= 980) {
            setHappyCustomers(980);
            setSatisfaction(99);
            setDeliveryDays(2);
            setSecTransactions(100);
            clearInterval(timer);
          } else {
            setHappyCustomers(Math.floor(cCount));
            setSatisfaction(Math.floor(sCount));
            setDeliveryDays(Math.ceil(dCount));
            setSecTransactions(Math.floor(tCount));
          }
        }, intervalTime);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger initial load check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [statsAnimated]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviewsData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);
  };

  const handleScrollToShop = () => {
    const element = document.getElementById("shop");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section id="reviews" className="py-24 bg-maroon-primary px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-gold-accent/15">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(212,175,55,0.06),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(91,6,18,0.3),transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center flex flex-col items-center gap-3 mb-16">
          <span className="text-gold-accent font-sans text-xs tracking-[0.3em] font-semibold uppercase">
            TESTIMONIALS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-bold tracking-tight flex items-center gap-2">
            <Heart className="w-6 h-6 text-gold-accent fill-current animate-pulse shrink-0" />
            What Our Customers Say
          </h2>
          <p className="text-white/70 font-sans text-xs sm:text-sm tracking-wider">
            Trusted by happy customers across India.
          </p>
          <div className="h-[1px] w-24 bg-gold-accent/30 mt-2" />
        </div>

        {/* Carousel Container */}
        <div 
          className="relative max-w-3xl mx-auto min-h-[320px]"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-maroon-dark/45 border border-gold-accent/15 rounded-3xl p-6 sm:p-10 shadow-2xl relative backdrop-blur-md flex flex-col gap-6"
            >
              {/* Quote icon at top */}
              <div className="absolute top-6 right-8 text-gold-accent/10 pointer-events-none">
                <Quote className="w-16 h-16 transform scale-x-[-1]" />
              </div>

              {/* Stars & Verification */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-accent fill-current" />
                  ))}
                </div>
                <div className="inline-flex items-center gap-1 bg-gold-accent/10 border border-gold-accent/20 px-2.5 py-0.5 rounded-full">
                  <CheckCircle className="w-3 h-3 text-gold-accent" />
                  <span className="text-[9px] uppercase tracking-wider text-gold-accent font-semibold font-sans">
                    Verified Customer
                  </span>
                </div>
              </div>

              {/* Review Comment Text */}
              <div className="flex-grow">
                <h4 className="font-serif text-white font-bold text-base sm:text-lg mb-3">
                  &ldquo;{reviewsData[activeIndex].title}&rdquo;
                </h4>
                <p className="text-white/80 font-sans text-xs sm:text-sm leading-relaxed italic">
                  &ldquo;{reviewsData[activeIndex].comment}&rdquo;
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="border-t border-white/5 pt-4 flex justify-between items-center gap-3">
                <div className="flex flex-col">
                  <span className="font-serif text-sm font-semibold text-white/95">
                    {reviewsData[activeIndex].name}
                  </span>
                  <span className="text-[10px] text-white/50 font-sans uppercase tracking-wider">
                    {reviewsData[activeIndex].location}, India
                  </span>
                </div>
                
                {reviewsData[activeIndex].screenshot && (
                  <button
                    className="px-3.5 py-1.5 border border-gold-accent/25 hover:border-gold-accent hover:bg-gold-accent hover:text-maroon-dark text-gold-accent rounded-lg font-sans text-[10px] tracking-wider uppercase font-semibold transition-colors"
                  >
                    View Screenshot
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-[-16px] sm:left-[-54px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gold-accent/20 bg-maroon-dark/60 text-white hover:text-gold-accent hover:border-gold-accent transition-colors flex items-center justify-center cursor-pointer shadow-lg z-10"
            aria-label="Previous Review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-[-16px] sm:right-[-54px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gold-accent/20 bg-maroon-dark/60 text-white hover:text-gold-accent hover:border-gold-accent transition-colors flex items-center justify-center cursor-pointer shadow-lg z-10"
            aria-label="Next Review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {reviewsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === index ? "bg-gold-accent w-6" : "bg-white/20"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Trust Statistics Section */}
        <div 
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mt-24 border-t border-b border-white/5 py-12 relative z-10"
        >
          {/* Stat 1 */}
          <div className="flex flex-col items-center text-center gap-1 p-2">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-gold-accent">
              {statsAnimated ? `${happyCustomers}+` : "0"}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-white/70 font-semibold font-sans mt-1">
              ❤️ Happy Customers
            </span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center text-center gap-1 p-2">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-gold-accent">
              {statsAnimated ? `${satisfaction}%` : "0%"}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-white/70 font-semibold font-sans mt-1">
              ⭐ Customer Satisfaction
            </span>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center text-center gap-1 p-2">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-gold-accent">
              {statsAnimated ? `${deliveryDays}-4 Days` : "0 Days"}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-white/70 font-semibold font-sans mt-1">
              🚚 Delivery Across India
            </span>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col items-center text-center gap-1 p-2">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-gold-accent">
              {statsAnimated ? `${secTransactions}%` : "0%"}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider text-white/70 font-semibold font-sans mt-1">
              🤝 Secure Prepaid Trust
            </span>
          </div>
        </div>

        {/* Customer Trust Banner */}
        <div className="mt-20 bg-cream-card text-charcoal border border-gold-accent/25 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gold-accent/5 rounded-full blur-2xl pointer-events-none" />
          
          <span className="text-gold-accent font-sans text-xs tracking-[0.25em] font-semibold uppercase leading-none">
            OUR MOTIVATION
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-maroon-primary font-bold tracking-tight">
            &ldquo;Every review motivates us to deliver even better quality.&rdquo;
          </h3>
          <p className="text-xs sm:text-sm text-charcoal/70 max-w-2xl font-sans leading-relaxed">
            Thank you to every customer who trusts Pooja Bag Collection. Your love and support inspire us to keep creating beautiful bags with premium quality and excellent service.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <button
              onClick={handleScrollToShop}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-maroon-primary hover:bg-maroon-light text-white font-sans text-xs tracking-widest font-semibold uppercase rounded-full shadow-md transition-luxury hover:scale-105 cursor-pointer animate-bounce"
            >
              <ShoppingBag className="w-4 h-4 text-gold-accent" />
              Shop Now
            </button>
            <a
              href="https://wa.me/919828752253?text=Hello%20Pooja%20Bag%20Collection%2C%20I%20am%20enquiring%20after%20reading%20your%20customer%20reviews.%20Please%20share%20latest%20designs."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 border border-maroon-primary/20 text-maroon-primary hover:border-maroon-primary hover:bg-maroon-primary/5 font-sans text-xs tracking-widest font-semibold uppercase rounded-full transition-luxury hover:scale-105"
            >
              <FaWhatsapp className="w-4 h-4 text-emerald-600 fill-current" />
              WhatsApp Inquiry
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
