"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Send, Phone, User, MapPin, Landmark as LandmarkIcon, FileText, Loader2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Product } from "@/data/products";

interface OrderModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function OrderModal({ product, onClose }: OrderModalProps) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [landmark, setLandmark] = useState("");
  const [notes, setNotes] = useState("");
  
  // Validation and loading states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const nameInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Load name and mobile from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedName = localStorage.getItem("pooja_bag_order_name");
      const savedMobile = localStorage.getItem("pooja_bag_order_mobile");
      if (savedName) setName(savedName);
      if (savedMobile) setMobile(savedMobile);
    }
  }, []);

  // Auto-focus on Name input when opened
  useEffect(() => {
    if (product && nameInputRef.current) {
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    }
  }, [product]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = "Customer name is required";
    }
    
    const cleanMobile = mobile.trim();
    if (!cleanMobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\+?[0-9]{10,12}$/.test(cleanMobile)) {
      newErrors.mobile = "Please enter a valid 10-12 digit mobile number";
    }
    
    if (!address.trim()) {
      newErrors.address = "Delivery address is required";
    }
    
    if (quantity <= 0) {
      newErrors.quantity = "Quantity must be 1 or more";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);

    // Save persistent customer info to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("pooja_bag_order_name", name.trim());
      localStorage.setItem("pooja_bag_order_mobile", mobile.trim());
    }

    // Build the dynamic WhatsApp message template
    const origin = typeof window !== "undefined" ? window.location.origin : "https://poojabagcollection.com";
    const imageUrl = `${origin}${product.image}`;
    
    const messageText = `🛍️ NEW BAG ORDER

📦 Product Details

Product:
${product.name}

Price:
₹${product.price}

Quantity:
${quantity}

🖼 Product Image
${imageUrl}

━━━━━━━━━━━━━━━

👤 Customer Details

Name:
${name.trim()}

Mobile:
${mobile.trim()}

Address:
${address.trim()}

Landmark:
${landmark.trim() ? landmark.trim() : "None"}

Additional Notes:
${notes.trim() ? notes.trim() : "None"}

━━━━━━━━━━━━━━━

Please confirm my order and share the delivery details.

Thank you.`;

    const whatsappUrl = `https://wa.me/919828752253?text=${encodeURIComponent(messageText)}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Close the modal after submission complete
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Click outside to close */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="w-full max-w-xl bg-maroon-dark/95 border border-gold-accent/20 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md flex flex-col max-h-[90vh]"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-maroon-primary border-b border-gold-accent/15 flex items-center justify-between shrink-0">
          <h3 className="font-serif text-white text-base sm:text-lg font-bold tracking-wider uppercase">
            Order Form
          </h3>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-gold-accent transition-colors p-1"
            aria-label="Close form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto flex-grow p-6 space-y-6">
          {/* Selected Product Summary Card */}
          <div className="bg-white/5 border border-gold-accent/10 rounded-2xl p-4 flex gap-4 items-center">
            <div className="relative w-16 h-20 bg-maroon-primary/20 rounded-xl overflow-hidden shrink-0 border border-white/5">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div className="flex-grow flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-wider text-gold-accent/80 font-sans font-medium mb-0.5">
                Selected Bag
              </span>
              <h4 className="font-serif text-white text-sm sm:text-base font-semibold leading-tight">
                {product.name}
              </h4>
              <div className="flex items-center justify-between mt-2">
                <span className="font-serif text-gold-accent text-sm font-bold">
                  ₹{product.price}/-
                </span>
                <span className="text-[10px] text-white/50 font-sans">
                  Exclusive Design
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Customer Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-white/80 font-sans text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-gold-accent" />
                Customer Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                ref={nameInputRef}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Bhavesh Suryawanshi"
                className={`w-full bg-white/5 border rounded-xl py-3 px-4 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold-accent transition-colors font-sans ${
                  errors.name ? "border-red-500" : "border-white/10"
                }`}
                disabled={isSubmitting}
              />
              {errors.name && (
                <span className="text-red-500 font-sans text-[10px] tracking-wide mt-0.5">
                  {errors.name}
                </span>
              )}
            </div>

            {/* Mobile Number */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="mobile" className="text-white/80 font-sans text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-gold-accent" />
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                id="mobile"
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/[^0-9+]/g, ""))}
                placeholder="e.g. 9828752253"
                className={`w-full bg-white/5 border rounded-xl py-3 px-4 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold-accent transition-colors font-sans ${
                  errors.mobile ? "border-red-500" : "border-white/10"
                }`}
                disabled={isSubmitting}
              />
              {errors.mobile && (
                <span className="text-red-500 font-sans text-[10px] tracking-wide mt-0.5">
                  {errors.mobile}
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-white/80 font-sans text-xs uppercase tracking-wider font-semibold">
                Quantity <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg flex items-center justify-center transition-colors focus:outline-none"
                  disabled={isSubmitting || quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-serif text-white text-base font-bold w-8 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg flex items-center justify-center transition-colors focus:outline-none"
                  disabled={isSubmitting}
                >
                  <Plus className="w-4 h-4" />
                </button>
                {quantity >= 3 && (
                  <span className="text-[10px] font-sans text-gold-accent bg-gold-accent/10 border border-gold-accent/20 px-2.5 py-1 rounded-md uppercase tracking-wider font-semibold animate-pulse">
                    🎁 Buy 3 Get 1 Free Applied!
                  </span>
                )}
              </div>
            </div>

            {/* Delivery Address */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="address" className="text-white/80 font-sans text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold-accent" />
                Delivery Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="address"
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House No., Street, Area, City, State, PIN Code"
                className={`w-full bg-white/5 border rounded-xl py-2.5 px-4 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold-accent transition-colors font-sans resize-none ${
                  errors.address ? "border-red-500" : "border-white/10"
                }`}
                disabled={isSubmitting}
              />
              {errors.address && (
                <span className="text-red-500 font-sans text-[10px] tracking-wide mt-0.5">
                  {errors.address}
                </span>
              )}
            </div>

            {/* Landmark */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="landmark" className="text-white/80 font-sans text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <LandmarkIcon className="w-3.5 h-3.5 text-gold-accent" />
                Landmark (Optional)
              </label>
              <input
                id="landmark"
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="e.g. Near Kalbadevi Temple"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold-accent transition-colors font-sans"
                disabled={isSubmitting}
              />
            </div>

            {/* Additional Notes */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="notes" className="text-white/80 font-sans text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-gold-accent" />
                Additional Notes (Optional)
              </label>
              <textarea
                id="notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Please deliver between 4 PM and 6 PM."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 px-4 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold-accent transition-colors font-sans resize-none"
                disabled={isSubmitting}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 mt-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-600/50 text-white rounded-xl font-sans text-xs tracking-widest font-bold uppercase transition-luxury hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg disabled:cursor-not-allowed select-none"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  Generating Order...
                </>
              ) : (
                <>
                  <FaWhatsapp className="w-4 h-4 text-white fill-current" />
                  Send Order via WhatsApp
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
