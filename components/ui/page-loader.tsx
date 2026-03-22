"use client";

import { motion } from "framer-motion";

export const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a]">
      <div className="relative flex flex-col items-center gap-8">
        {/* Animated Logo Container */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Background Glow */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-gold/20 rounded-full blur-[40px]"
          />

          {/* Central Logo SVG */}
          <motion.svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gold relative z-10"
            animate={{ 
              rotate: 360,
              scale: [0.8, 1, 0.8]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <path d="M12 22C12 22 20 18 20 12C20 6 12 2 12 2C12 2 4 6 4 12C4 18 12 22 12 22Z" style={{ opacity: 0.3 }} />
            <path d="M12 18C12 18 17 15 17 11C17 7 12 5 12 5C12 5 7 7 7 11C7 15 12 18 12 18Z" style={{ opacity: 0.6 }} />
            <circle cx="12" cy="11" r="2" fill="currentColor" />
          </motion.svg>

          {/* Orbiting Rings */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-gold/10 rounded-full"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 border border-primary/10 rounded-full"
          />
        </div>

        {/* Text Loader */}
        <div className="flex flex-col items-center gap-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex items-center gap-2 text-xl font-serif tracking-[0.3em] text-white uppercase"
          >
            <span>Le Palais</span>
            <span className="text-gold italic">du Plaisir</span>
          </motion.div>
          
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  y: [0, -2, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_8px_rgba(212,175,55,0.4)]"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
