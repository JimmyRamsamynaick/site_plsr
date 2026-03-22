"use client";

import { motion } from "framer-motion";
import { FaHeart, FaUsers, FaUserSecret, FaVenusMars, FaHandHoldingHeart, FaShieldAlt } from "react-icons/fa";
import { LuxuryButton } from "@/components/ui/luxury-button";
import Link from "next/link";

export default function UniversPage() {
  const sections = [
    {
      title: "L'Essence du Palais",
      description: "Le Palais du Plaisir n'est pas qu'un simple espace, c'est un sanctuaire dédié à l'exploration des désirs les plus profonds. Ici, l'interdit devient la norme et la curiosité est une vertu.",
      icon: <FaHeart className="text-primary text-3xl" />,
      color: "from-primary/20 to-transparent"
    },
    {
      title: "Un Univers NSFW & Assumé",
      description: "Nous embrassons pleinement la sensualité et l'érotisme. Le Palais est un espace NSFW (Not Safe For Work) où le partage de contenus, de fantasmes et d'expériences se fait sans tabou, mais toujours avec élégance.",
      icon: <FaUserSecret className="text-gold text-3xl" />,
      color: "from-gold/20 to-transparent"
    },
    {
      title: "Inclusivité Totale",
      description: "Peu importe votre genre, votre orientation ou vos kinks, vous avez votre place. Nous célébrons la diversité des corps et des esprits. Ici, chaque âme est respectée dans sa singularité.",
      icon: <FaVenusMars className="text-purple-500 text-3xl" />,
      color: "from-purple-500/20 to-transparent"
    }
  ];

  const values = [
    {
      title: "Consentement",
      desc: "La base de toute interaction. 'Non' veut dire 'Non', et le silence n'est pas un oui.",
      icon: <FaHandHoldingHeart />
    },
    {
      title: "Respect",
      desc: "Traitez chaque membre avec la dignité qu'une âme de ce Palais mérite.",
      icon: <FaUsers />
    },
    {
      title: "Sécurité",
      desc: "Un environnement protégé pour explorer vos limites en toute confiance.",
      icon: <FaShieldAlt />
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-24">
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">
          Découvrez <span className="text-gold-gradient italic">L'Univers</span>
        </h1>
        <p className="text-white/60 italic font-sans max-w-3xl mx-auto text-lg leading-relaxed">
          "Un voyage au-delà des apparences, là où les corps s'expriment et les âmes se libèrent."
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
        {sections.map((section, index) => (
          <div 
            key={index}
            className={`p-8 rounded-3xl bg-[#1a1a1a] border border-white/5 relative overflow-hidden group hover:border-gold/20 transition-all duration-500 bg-gradient-to-br ${section.color}`}
          >
            <div className="mb-6">{section.icon}</div>
            <h2 className="text-2xl font-serif text-white mb-4">{section.title}</h2>
            <p className="text-white/50 font-sans leading-relaxed">
              {section.description}
            </p>
          </div>
        ))}
      </div>

      {/* Rules/Values Section */}
      <div className="bg-[#1a1a1a]/50 rounded-[4rem] p-12 md:p-20 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Les Lois du Sanctuaire</h2>
          <p className="text-gold/50 uppercase tracking-[0.3em] text-xs">Liberté • Égalité • Volupté</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {values.map((v, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 text-gold text-2xl group-hover:scale-110 transition-transform">
                {v.icon}
              </div>
              <h3 className="text-xl font-serif text-white mb-3">{v.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Community CTA */}
      <div className="mt-32 text-center">
        <div className="inline-block p-px rounded-full bg-gradient-to-r from-transparent via-gold/50 to-transparent mb-12 w-full max-w-4xl" />
        <h2 className="text-3xl md:text-5xl font-serif text-white mb-8 leading-tight">
          Prêt à rejoindre la <span className="text-gold-gradient italic">Communauté</span> ?
        </h2>
        <p className="text-white/50 mb-12 max-w-2xl mx-auto">
          Que vous soyez ici pour observer, apprendre ou participer activement, 
          le Palais est ouvert à toutes les âmes majeures et consentantes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href="https://discord.gg/DrJ2rvEt6h" target="_blank" rel="noopener noreferrer">
            <LuxuryButton className="px-12">
              Rejoindre le Discord
            </LuxuryButton>
          </a>
          <Link href="/membres">
            <LuxuryButton variant="outline" className="px-12">
              Rencontrer les membres
            </LuxuryButton>
          </Link>
        </div>
      </div>
    </main>
  );
}
