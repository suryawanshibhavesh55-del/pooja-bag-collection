"use client";

import { Phone, Mail, MapPin, MessageSquare } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  const handleScrollTo = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-maroon-dark border-t border-gold-accent/20 text-white/80 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-8">
        {/* Brand Details */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => handleScrollTo("home")}>
            <div className="w-8 h-8 flex items-center justify-center border border-gold-accent/40 rounded-full group-hover:border-gold-accent transition-colors duration-300">
              <span className="text-gold-accent font-serif text-sm font-semibold">P</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-serif text-lg font-bold tracking-widest leading-none group-hover:text-gold-accent transition-colors duration-300">
                POOJA
              </span>
              <span className="text-gold-accent font-sans text-[10px] tracking-[0.25em] font-medium">
                BAG COLLECTION
              </span>
            </div>
          </div>
          <p className="text-xs text-white/60 leading-relaxed font-sans mt-2">
            Handcrafted with love and precision. Offering the most premium, elegant, and durable handbags, tote bags, and personalized creations in Mumbai.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <a
              href="https://instagram.com/pooja_bag_collection"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white hover:text-gold-accent hover:border-gold-accent transition-colors duration-300"
              aria-label="Instagram"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/919828752253"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white hover:text-gold-accent hover:border-gold-accent transition-colors duration-300"
              aria-label="WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h3 className="font-serif text-sm font-semibold tracking-wider text-gold-accent uppercase">
            Quick Links
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs font-sans">
            <button
              onClick={() => handleScrollTo("home")}
              className="text-left py-1 hover:text-gold-accent transition-colors duration-300"
            >
              Home
            </button>
            <button
              onClick={() => handleScrollTo("shop")}
              className="text-left py-1 hover:text-gold-accent transition-colors duration-300"
            >
              Shop Catalog
            </button>
            <button
              onClick={() => handleScrollTo("collections")}
              className="text-left py-1 hover:text-gold-accent transition-colors duration-300"
            >
              Collections
            </button>
            <button
              onClick={() => handleScrollTo("bulk")}
              className="text-left py-1 hover:text-gold-accent transition-colors duration-300"
            >
              Bulk Inquiry
            </button>
            <button
              onClick={() => handleScrollTo("about")}
              className="text-left py-1 hover:text-gold-accent transition-colors duration-300"
            >
              About Us
            </button>
            <button
              onClick={() => handleScrollTo("contact")}
              className="text-left py-1 hover:text-gold-accent transition-colors duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* Business Info / Contact details */}
        <div className="flex flex-col gap-4">
          <h3 className="font-serif text-sm font-semibold tracking-wider text-gold-accent uppercase">
            Store Information
          </h3>
          <ul className="flex flex-col gap-3 text-xs font-sans">
            <li className="flex gap-2">
              <MapPin className="w-4 h-4 text-gold-accent shrink-0 mt-0.5" />
              <span className="leading-relaxed text-white/70">
                Shop No. 7, First Floor, Barar House, 237/243 Abdul Rehman Street, Khokha Bazar, Kalbadevi, Mumbai – 400003
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gold-accent shrink-0" />
              <a href="tel:+919828752253" className="hover:text-gold-accent transition-colors duration-300 text-white/70">
                +91 98287 52253
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gold-accent shrink-0" />
              <span className="text-white/70">info@poojabagcollection.com</span>
            </li>
          </ul>
          
          <div className="border-t border-white/5 pt-3 mt-1 text-[11px] text-white/50 flex flex-col gap-1 font-sans">
            <div><span className="text-gold-accent font-medium uppercase tracking-wider text-[9px] mr-1">GSTIN:</span> 27ABKFS5927M1Z1</div>
            <div><span className="text-gold-accent font-medium uppercase tracking-wider text-[9px] mr-1">Udyam No:</span> UDYAM-MH-19-0061234</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans text-white/40">
        <div>
          &copy; {new Date().getFullYear()} POOJA BAG COLLECTION. All Rights Reserved.
        </div>
        <div className="flex gap-4">
          <span className="text-gold-accent/50">Orders via WhatsApp ONLY</span>
          <span>&bull;</span>
          <span>Mumbai, India</span>
        </div>
      </div>
    </footer>
  );
}
