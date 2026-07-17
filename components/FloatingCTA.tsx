"use client";

import { motion } from "framer-motion";
import { Phone, MessageSquare } from "lucide-react";

export default function FloatingCTA() {
  const whatsappUrl = "https://wa.me/919828752253?text=Hello%20Pooja%20Bag%20Collection%2C%20I%20am%20interested%20in%20your%20premium%20collection.%20Please%20share%20your%20latest%20catalogue.";

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
      {/* Call Button */}
      <motion.a
        href="tel:+919828752253"
        className="w-12 h-12 bg-cream-card border border-gold-accent/30 text-maroon-primary rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:bg-white hover:text-maroon-light transition-colors"
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.95 }}
        title="Call Owner"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <Phone className="w-5 h-5" />
      </motion.a>

      {/* WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:bg-emerald-500 transition-colors relative"
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.95 }}
        title="WhatsApp Us"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, type: "spring" }}
      >
        {/* Pulsing Outer Ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-600/30 animate-ping -z-10 scale-125" />
        <MessageSquare className="w-5 h-5 fill-current" />
      </motion.a>
    </div>
  );
}
