"use client";

import { motion } from "framer-motion";
import { User, Fingerprint, Heart, Sliders, Activity } from "lucide-react";
import Link from "next/link";

interface StatsGridProps {
  user: any;
  isPublicView?: boolean;
}

export const StatsGrid = ({ user, isPublicView = false }: StatsGridProps) => {
  const sections = [
    {
      title: "Identité",
      icon: <Fingerprint className="w-5 h-5 text-gold" />,
      content: user.name || "Inconnu",
      sub: "L'essence de votre âme",
      href: "/dashboard/edit?section=identity"
    },
    {
      title: "Désirs",
      icon: <Heart className="w-5 h-5 text-primary" />,
      content: user.tags?.length || 0,
      sub: "Marques portées par le désir",
      href: "/dashboard/edit?section=desires"
    },
    {
      title: "Préférences",
      icon: <Sliders className="w-5 h-5 text-white/50" />,
      content: "Exclusif",
      sub: "Paramètres de votre présence",
      href: "/dashboard/edit?section=preferences"
    },
    {
      title: "Statut",
      icon: <Activity className="w-5 h-5 text-gold/50" />,
      content: user.status || "Âme tentée",
      sub: "Votre position dans le cercle",
      href: "/dashboard/edit?section=status"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {sections.map((section, idx) => {
        const content = (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            whileHover={!isPublicView ? { y: -5 } : {}}
            className={`p-6 h-full rounded-2xl bg-[#1a1a1a] border border-white/5 transition-all duration-300 group ${
              !isPublicView ? "hover:border-gold/20 cursor-pointer" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-black/50 group-hover:scale-110 transition-transform duration-500">
                {section.icon}
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-sans">
                Section
              </span>
            </div>
            
            <h3 className="text-white/40 text-xs uppercase tracking-widest mb-1 font-sans">
              {section.title}
            </h3>
            <p className="text-xl font-serif text-white mb-1 group-hover:text-gold transition-colors">
              {section.content}
            </p>
            <p className="text-[10px] text-white/20 italic">
              {section.sub}
            </p>
          </motion.div>
        );

        return !isPublicView ? (
          <Link href={section.href} key={section.title}>
            {content}
          </Link>
        ) : (
          <div key={section.title}>{content}</div>
        );
      })}
    </div>
  );
};
