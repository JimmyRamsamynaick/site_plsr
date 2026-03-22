"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { FaDiscord } from "react-icons/fa";
import { Menu, X, LogIn } from "lucide-react";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) { // scrolling down
          setHidden(true);
        } else { // scrolling up
          setHidden(false);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 bg-[#0a0a0a] border-b border-white/5"
    >
      <Link href="/" className="group">
        <h2 className="text-xl md:text-2xl font-serif tracking-tighter text-white group-hover:text-gold-gradient transition-all duration-500 uppercase">
          Le Palais <span className="text-gold italic">du Plaisir</span>
        </h2>
      </Link>

      <div className="hidden md:flex items-center gap-10">
        <NavLink href="/univers">L'Univers</NavLink>
        <NavLink href="/membres">Les Membres</NavLink>
        <NavLink href="/rituels">Rituels</NavLink>
        <NavLink href="/boutique">Boutique</NavLink>
      </div>

      <div className="flex items-center gap-4">
        {status === "loading" ? (
          <div className="w-10 h-10 rounded-full border border-white/5 animate-pulse bg-white/5" />
        ) : session ? (
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/dashboard" 
              className="flex items-center gap-3 group/nav px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-gold/30 transition-all duration-500"
            >
              <div className="flex flex-col items-end">
                <span className="text-white text-[11px] font-serif tracking-widest group-hover/nav:text-gold transition-colors">
                  {session.user?.name}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  <span className="text-gold/50 text-[8px] uppercase tracking-widest font-bold">
                    Connecté
                  </span>
                </div>
              </div>
              <div className="relative">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={session.user?.image || "/globe.svg"}
                  alt={session.user?.name || ""}
                  className="w-10 h-10 rounded-full border border-gold/30 gold-glow cursor-pointer object-cover shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                />
              </div>
            </Link>
            <button 
              onClick={() => signOut()}
              className="text-[10px] uppercase tracking-widest text-white/30 hover:text-primary transition-colors border-l border-white/10 pl-6"
            >
              Quitter
            </button>
          </div>
        ) : (
          <div className="hidden md:block">
            <LuxuryButton 
              variant="gold" 
              className="px-6 py-2 text-sm"
              icon={<FaDiscord />}
              onClick={() => signIn("discord")} 
            >
              S'initier
            </LuxuryButton>
          </div>
        )}

        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#0a0a0a] border-b border-white/5 md:hidden flex flex-col p-10 gap-10 shadow-2xl"
          >
            <NavLink href="/univers" onClick={() => setIsOpen(false)}>L'Univers</NavLink>
            <NavLink href="/membres" onClick={() => setIsOpen(false)}>Les Membres</NavLink>
            <NavLink href="/rituels" onClick={() => setIsOpen(false)}>Rituels</NavLink>
            <NavLink href="/boutique" onClick={() => setIsOpen(false)}>Boutique</NavLink>
            <hr className="border-white/5" />
            {session ? (
              <div className="flex items-center justify-between">
                <Link href="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                  <img
                    src={session.user?.image || ""}
                    alt={session.user?.name || ""}
                    className="w-8 h-8 rounded-full border border-gold/30"
                  />
                  <span className="text-sm font-medium">{session.user?.name}</span>
                </Link>
                <button 
                  onClick={() => signOut()}
                  className="text-[10px] uppercase tracking-widest text-primary"
                >
                  Quitter
                </button>
              </div>
            ) : (
              <LuxuryButton 
                variant="gold" 
                className="w-full"
                icon={<FaDiscord />}
                onClick={() => signIn("discord")} 
              >
                S'initier
              </LuxuryButton>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <Link 
    href={href} 
    onClick={onClick}
    className="text-[11px] uppercase tracking-[0.2em] text-white/50 hover:text-gold transition-colors duration-300"
  >
    {children}
  </Link>
);
