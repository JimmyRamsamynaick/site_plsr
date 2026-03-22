"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-12 px-6 border-t border-white/5 bg-black/40 backdrop-blur-sm">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <h2 className="text-xl font-serif tracking-tighter text-white uppercase">
              Le Palais <span className="text-gold italic">du Plaisir</span>
            </h2>
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/30">
              © {currentYear} — L'élégance du secret
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 md:gap-8">
            <Link 
              href="/legal" 
              className="text-xs uppercase tracking-widest text-white/50 hover:text-gold transition-colors duration-300"
            >
              Mentions Légales & RGPD
            </Link>
            <Link 
              href="/boutique" 
              className="text-xs uppercase tracking-widest text-white/50 hover:text-gold transition-colors duration-300"
            >
              Boutique
            </Link>
            <Link 
              href="/univers" 
              className="text-xs uppercase tracking-widest text-white/50 hover:text-gold transition-colors duration-300"
            >
              L'Univers
            </Link>
            <a 
              href="https://discord.gg/kPrbFta8Rm" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest text-white/50 hover:text-gold transition-colors duration-300"
            >
              Discord
            </a>
          </div>
        </div>

        <div className="mt-12 text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[9px] uppercase tracking-[0.6em] text-white/10"
          >
            Interdit aux moins de 18 ans
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
