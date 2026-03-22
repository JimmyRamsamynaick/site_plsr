"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

export const ConnectionBadge = () => {
  const { data: session, status } = useSession();
  
  if (status !== "authenticated") return null;
  
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[100] flex items-center gap-3 px-4 py-2 rounded-full glass border border-gold/20 shadow-2xl"
    >
      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
      <span className="text-[10px] uppercase tracking-[0.2em] text-gold/80 font-serif italic">
        Connecté : {session?.user?.name}
      </span>
    </motion.div>
  );
};
