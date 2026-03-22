"use client";

import { motion } from "framer-motion";
import { signIn, useSession } from "next-auth/react";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { FaDiscord } from "react-icons/fa";
import Link from "next/link";

export const Hero = () => {
  const { data: session, status } = useSession();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Abstract Background Effects */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-red-900/5 rounded-full blur-[100px]" />
      
      {status === "authenticated" && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gold/5 pointer-events-none"
          style={{ background: "radial-gradient(circle at center, rgba(212, 175, 55, 0.05) 0%, transparent 70%)" }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 text-center max-w-4xl">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-gold/60 uppercase tracking-[0.3em] text-sm font-sans mb-6 block">
            Cercle Exclusif
          </span>
          
          <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-tight">
            {status === "authenticated" && session?.user?.name ? (
              <>
                Ravi de vous revoir, <br />
                <span className="text-gold-gradient italic capitalize">{session.user.name}</span>
              </>
            ) : (
              <>
                Bienvenue au <br />
                <span className="text-gold-gradient italic">Palais du Plaisir</span>
              </>
            )}
          </h1>
          
          <p className="text-lg md:text-xl text-white/50 font-sans mb-12 max-w-2xl mx-auto leading-relaxed italic">
            "Le désir a son royaume, et les secrets y sont la seule monnaie d'échange."
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {status === "authenticated" ? (
              <Link href="/dashboard" className="w-full sm:w-auto">
                <LuxuryButton 
                  className="w-full sm:w-auto px-10"
                >
                  Accéder au Palais
                </LuxuryButton>
              </Link>
            ) : (
              <a href="https://discord.gg/kPrbFta8Rm" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <LuxuryButton 
                  className="w-full sm:w-auto px-10"
                  icon={<FaDiscord className="text-xl" />}
                >
                  Rejoindre le Discord
                </LuxuryButton>
              </a>
            )}
            
            <Link href="/univers" className="w-full sm:w-auto">
              <LuxuryButton 
                variant="outline"
                className="w-full sm:w-auto px-10"
              >
                Découvrir l'Univers
              </LuxuryButton>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 right-10 hidden lg:flex flex-col items-center gap-4">
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="w-[1px] h-20 bg-gradient-to-b from-transparent via-gold/30 to-transparent" 
        />
        <span className="text-[10px] uppercase tracking-[0.5em] text-gold/30 rotate-180" style={{ writingMode: 'vertical-rl' }}>
          Explorez l'interdit
        </span>
      </div>
    </section>
  );
};
