"use client";

import { motion } from "framer-motion";
import { FaMoon, FaSun, FaBolt, FaMagic, FaFire, FaGlassWhiskey } from "react-icons/fa";
import { LuxuryButton } from "@/components/ui/luxury-button";
import Link from "next/link";

export default function RituelsPage() {
  const rituels = [
    {
      title: "Les Confessions Vocales",
      type: "Événement Discord",
      desc: "Rendez-vous dans les salons vocaux 'Le Boudoir' pour des échanges sans filtre. Une immersion sonore où la voix est l'unique guide.",
      icon: <FaMoon className="text-blue-400" />,
      time: "Salons Vocaux • 22h",
      status: "Fréquent"
    },
    {
      title: "L'Ascension des Rôles",
      type: "Système de Prestige",
      desc: "Chaque interaction vous rapproche d'un nouveau rang. Débloquez des accès exclusifs et des salons secrets en montant dans la hiérarchie du Palais.",
      icon: <FaMagic className="text-gold" />,
      time: "Progression Automatique",
      status: "Actif"
    },
    {
      title: "Les Nuits Thématiques",
      type: "Événement Serveur",
      desc: "Des soirées dédiées à un 'kink' ou un thème précis. Les salons textuels et vocaux se transforment pour l'occasion.",
      icon: <FaFire className="text-primary" />,
      time: "Annonces sur #annonces",
      status: "Hebdomadaire"
    },
    {
      title: "Le Mur des Tentations",
      type: "Partage Communautaire",
      desc: "Un rituel de partage visuel et textuel dans nos salons dédiés. Exposez vos envies et découvrez celles des autres membres.",
      icon: <FaGlassWhiskey className="text-amber-600" />,
      time: "24h/24 • Salons #media",
      status: "Permanent"
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24"
      >
        <span className="text-primary uppercase tracking-[0.4em] text-xs mb-4 block">Expériences Immersives</span>
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
          Les <span className="text-gold-gradient italic">Rituels</span>
        </h1>
        <p className="text-white/60 italic font-sans max-w-2xl mx-auto text-lg">
          "Le plaisir est un art qui se cultive à travers la répétition et la dévotion."
        </p>
      </motion.div>

      {/* Rituels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
        {rituels.map((rituel, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group p-8 rounded-[2rem] bg-[#1a1a1a] border border-white/5 hover:border-gold/30 transition-all duration-700 relative overflow-hidden"
          >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity duration-700 group-hover:scale-150 transform text-6xl">
              {rituel.icon}
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] uppercase tracking-widest text-gold/60 px-3 py-1 rounded-full border border-gold/20">
                  {rituel.type}
                </span>
                <span className={`text-[9px] uppercase tracking-widest ${
                  rituel.status === "Actif" ? "text-green-500" : "text-white/30"
                }`}>
                  {rituel.status}
                </span>
              </div>

              <h2 className="text-3xl font-serif text-white mb-4 group-hover:text-gold-gradient transition-colors">
                {rituel.title}
              </h2>
              
              <p className="text-white/50 mb-8 leading-relaxed font-sans">
                {rituel.desc}
              </p>

              <div className="flex items-center gap-4 text-[11px] text-white/30 font-serif italic">
                <FaSun className="text-[10px]" />
                {rituel.time}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Ritual CTA */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative p-12 md:p-20 rounded-[3rem] bg-gradient-to-b from-primary/10 to-transparent border border-white/5 text-center"
      >
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-primary/20 rounded-full blur-3xl" />
        
        <h2 className="text-3xl md:text-5xl font-serif text-white mb-8">
          Prêt pour l'initiation ?
        </h2>
        <p className="text-white/50 mb-12 max-w-xl mx-auto leading-relaxed">
          Certains rituels sont publics, d'autres nécessitent une invitation spéciale. 
          Rejoignez-nous sur Discord pour être informé des prochaines sessions.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href="https://discord.gg/DrJ2rvEt6h" target="_blank" rel="noopener noreferrer">
            <LuxuryButton className="px-12">
              Réserver sa place
            </LuxuryButton>
          </a>
          <Link href="/univers">
            <LuxuryButton variant="outline" className="px-12">
              Comprendre les rituels
            </LuxuryButton>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
