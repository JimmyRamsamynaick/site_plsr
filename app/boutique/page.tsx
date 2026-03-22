"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Hammer, Clock } from "lucide-react";
import Link from "next/link";
import { LuxuryButton } from "@/components/ui/luxury-button";

export default function ShopPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      
      <div className="relative z-10 max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-8">
            <div className="relative">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4,
                  ease: "easeInOut" 
                }}
                className="w-24 h-24 rounded-full bg-white/5 border border-gold/20 flex items-center justify-center backdrop-blur-sm"
              >
                <ShoppingBag className="w-10 h-10 text-gold/60" />
              </motion.div>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-2 -right-2 bg-red-900/80 text-white text-[10px] px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest font-bold"
              >
                Maintenance
              </motion.div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
            La <span className="text-gold-gradient italic">Boutique</span>
          </h1>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <Clock className="w-4 h-4 text-gold/40" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">Arrivée prochaine</span>
          </div>

          <p className="text-lg text-white/50 italic font-sans mb-12 leading-relaxed">
            "Nos artisans préparent des trésors exclusifs pour votre plaisir. <br className="hidden md:block" />
            Le rideau se lèvera bientôt sur une collection unique."
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: <Hammer className="w-5 h-5" />, label: "Affinage" },
              { icon: <ShoppingBag className="w-5 h-5" />, label: "Sélection" },
              { icon: <Clock className="w-5 h-5" />, label: "Patience" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + (i * 0.1) }}
                className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-3"
              >
                <div className="text-gold/40">{item.icon}</div>
                <span className="text-[10px] uppercase tracking-widest text-white/30">{item.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/" className="w-full sm:w-auto">
              <LuxuryButton variant="outline" className="w-full sm:w-auto px-10">
                Retour au Palais
              </LuxuryButton>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative vertical line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-t from-gold/20 to-transparent" />
    </main>
  );
}
