"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section based on scroll position
      const sections = ["home", "shop", "collections", "about", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Home", target: "home" },
    { label: "Shop", target: "shop" },
    { label: "Collections", target: "collections" },
    { label: "Bulk Inquiry", target: "bulk" },
    { label: "About Us", target: "about" },
    { label: "Contact Us", target: "contact" },
  ];

  const handleScrollTo = (targetId: string) => {
    setIsOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of navbar
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass-nav-scrolled py-3" : "bg-maroon-primary/95 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand Name */}
          <div 
            onClick={() => handleScrollTo("home")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative w-8 h-8 flex items-center justify-center border border-gold-accent/40 rounded-full group-hover:border-gold-accent transition-colors duration-300">
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleScrollTo(item.target)}
                className={`relative font-sans text-xs tracking-widest uppercase transition-colors duration-300 py-2 hover:text-gold-accent ${
                  activeSection === item.target ? "text-gold-accent font-medium" : "text-white/80"
                }`}
              >
                {item.label}
                {activeSection === item.target && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Contact CTAs Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+919828752253"
              className="flex items-center gap-1.5 text-white/90 hover:text-gold-accent transition-colors duration-300 text-xs tracking-wider"
            >
              <Phone className="w-3.5 h-3.5 text-gold-accent" />
              <span>+91 98287 52253</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gold-accent transition-colors p-2"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-maroon-dark/95 border-b border-gold-accent/15 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.target}
                  onClick={() => handleScrollTo(item.target)}
                  className={`block w-full text-left font-sans text-xs tracking-wider uppercase py-3 border-b border-white/5 transition-colors ${
                    activeSection === item.target ? "text-gold-accent font-semibold" : "text-white/80"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <a
                  href="tel:+919828752253"
                  className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors text-xs uppercase tracking-wider"
                >
                  <Phone className="w-4 h-4 text-gold-accent" />
                  <span>Call Us</span>
                </a>
                <a
                  href="https://wa.me/919828752253?text=Hello%20Pooja%20Bag%20Collection%2C%20I%20would%20like%20to%20enquire%20about%20your%20bags."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 bg-maroon-primary hover:bg-maroon-light border border-gold-accent/20 rounded-lg text-white transition-colors text-xs uppercase tracking-wider"
                >
                  <MessageSquare className="w-4 h-4 text-gold-accent" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
