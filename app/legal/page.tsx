"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState<"cgu" | "cgv" | "rgpd">("cgu");

  const cguContent = [
    {
      title: "1. Acceptation des Conditions",
      content: `En accédant au site "Le Palais du Plaisir" et au serveur Discord associé, vous acceptez sans réserve les présentes Conditions Générales d'Utilisation. L'accès est strictement réservé aux personnes physiques majeures (18 ans et plus).`
    },
    {
      title: "2. Accès et Sécurité",
      content: `L'accès se fait via l'authentification Discord. Vous êtes responsable de la confidentialité de vos identifiants. Toute activité effectuée depuis votre compte est réputée être de votre fait. Le Palais du Plaisir se réserve le droit de suspendre tout compte ne respectant pas les règles de la communauté.`
    },
    {
      title: "3. Comportement et Contenu",
      content: `Les utilisateurs s'engagent à :
      - Respecter le consentement et la vie privée des autres membres.
      - Ne pas harceler, menacer ou discriminer.
      - Ne pas partager de contenu illégal ou non sollicité (spam).
      Tout contenu à caractère explicite (NSFW) doit être partagé uniquement dans les espaces dédiés prévus à cet effet.`
    },
    {
      title: "4. Propriété Intellectuelle",
      content: `L'interface, le design et les contenus originaux du Palais du Plaisir sont protégés. Toute reproduction sans autorisation est interdite.`
    }
  ];

  const cgvContent = [
    {
      title: "1. Objet",
      content: `Les présentes Conditions Générales de Vente régissent les éventuelles transactions, abonnements ou accès premium proposés sur la plateforme "Le Palais du Plaisir".`
    },
    {
      title: "2. Prix et Paiement",
      content: `Les prix sont indiqués en Euros TTC. Les paiements sont sécurisés et traités par des prestataires tiers. Aucun remboursement n'est possible pour les services numériques consommés immédiatement.`
    },
    {
      title: "3. Droit de Rétractation",
      content: `Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les contenus numériques non fournis sur un support matériel dont l'exécution a commencé après accord préalable exprès du consommateur.`
    },
    {
      title: "4. Service Client",
      content: `Pour toute question relative à un achat, veuillez contacter l'administration via le serveur Discord officiel.`
    }
  ];

  const rgpdContent = [
    {
      title: "1. Collecte des Données",
      content: `Nous collectons via l'API Discord : votre identifiant unique, votre pseudo, votre avatar et votre adresse email.`
    },
    {
      title: "2. Utilisation",
      content: `Ces données servent exclusivement à la gestion de votre profil, à l'affichage de vos rôles sur le site et à la sécurisation de l'accès.`
    },
    {
      title: "3. Vos Droits",
      content: `Vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour l'exercer, vous pouvez supprimer votre compte ou nous contacter via Discord.`
    }
  ];

  const currentContent = activeTab === "cgu" ? cguContent : activeTab === "cgv" ? cgvContent : rgpdContent;

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
          Cadre <span className="text-gold-gradient italic">Légal</span>
        </h1>
        <p className="text-white/50 italic font-sans max-w-2xl mx-auto">
          "La liberté et le plaisir s'épanouissent dans le respect mutuel et la clarté des engagements."
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {[
          { id: "cgu", label: "CGU" },
          { id: "cgv", label: "CGV" },
          { id: "rgpd", label: "RGPD / Vie Privée" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-8 py-3 rounded-full text-xs uppercase tracking-widest transition-all duration-500 border ${
              activeTab === tab.id 
                ? "bg-gold text-black border-gold shadow-[0_0_20px_rgba(212,175,55,0.3)]" 
                : "bg-white/5 text-white/50 border-white/10 hover:border-gold/30 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid gap-8">
        {currentContent.map((section, index) => (
          <motion.section
            key={`${activeTab}-${index}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-8 rounded-3xl bg-[#1a1a1a] border border-white/5 hover:border-gold/10 transition-colors"
          >
            <h2 className="text-xl font-serif text-gold mb-4">{section.title}</h2>
            <div className="text-white/60 font-sans leading-relaxed whitespace-pre-line text-sm md:text-base">
              {section.content}
            </div>
          </motion.section>
        ))}
      </div>

      <div className="mt-16 text-center flex flex-col items-center gap-6">
        <p className="text-white/20 text-[10px] uppercase tracking-[0.2em]">
          Dernière mise à jour : 22 Mars 2026
        </p>
        <Link href="/" className="text-gold/60 hover:text-gold transition-colors text-xs uppercase tracking-widest border-b border-gold/20 pb-1">
          ← Retour au Palais
        </Link>
      </div>
    </main>
  );
}
