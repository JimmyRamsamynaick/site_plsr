"use client";

import { motion } from "framer-motion";
import { User } from "next-auth";
import { FaCrown, FaStar, FaGem, FaUserShield, FaUser, FaVideo, FaCheckCircle, FaMagic, FaShareAlt, FaHeart as FaHeartSolid, FaRegHeart } from "react-icons/fa";
import { DISCORD_ROLE_MAPPING } from "@/lib/discord-roles";
import Link from "next/link";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

interface ProfileHeaderProps {
  user: User & { 
    role?: string;
    discordRoles?: string[];
    id: string;
    favoritedBy?: any[];
  };
  isPublicView?: boolean;
  currentUserId?: string;
}

export const ProfileHeader = ({ user, isPublicView = false, currentUserId }: ProfileHeaderProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUserId && user.favoritedBy) {
      setIsFavorited(user.favoritedBy.some((f: any) => f.userId === currentUserId));
    }
  }, [currentUserId, user.favoritedBy]);

  const toggleFavorite = async () => {
    if (!currentUserId) {
      toast.error("Vous devez être connecté");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/favorites/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetId: user.id }),
      });
      if (res.ok) {
        const data = await res.json();
        setIsFavorited(data.action === "added");
        toast.success(data.action === "added" ? "Coup de cœur ajouté" : "Coup de cœur retiré");
      }
    } catch (error) {
      toast.error("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const copyProfileLink = () => {
    const url = `${window.location.origin}/profil/${user.id}`;
    navigator.clipboard.writeText(url);
    toast.success("Lien du secret copié dans le presse-papier");
  };

  const getBadge = (role: string = "Âme tentée", discordRoles: string[] = []) => {
    // Si l'utilisateur a un rôle spécial Discord (Fonda, Booster, etc.), on le considère comme Élite/VIP
    const hasPrestigeRole = discordRoles.some(id => 
      ["1458949355175284797", "1463335175416184924", "1461734975027286088"].includes(id)
    );

    if (role === "VIP" || (discordRoles.includes("1458949355175284797"))) {
      return { icon: <FaCrown className="text-gold" />, label: "VIP", color: "border-gold text-gold" };
    }
    if (role === "Élite" || hasPrestigeRole) {
      return { icon: <FaGem className="text-primary" />, label: "Élite", color: "border-primary text-primary" };
    }
    return { icon: <FaStar className="text-white/50" />, label: "Âme tentée", color: "border-white/20 text-white/50" };
  };

  const badge = getBadge(user.role, user.discordRoles);

  // Mappe les rôles Discord vers des composants d'icônes
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "FaCrown": return <FaCrown className="w-3 h-3" />;
      case "FaUserShield": return <FaUserShield className="w-3 h-3" />;
      case "FaGem": return <FaGem className="w-3 h-3" />;
      case "FaVideo": return <FaVideo className="w-3 h-3" />;
      case "FaCheckCircle": return <FaCheckCircle className="w-3 h-3" />;
      case "FaMagic": return <FaMagic className="w-3 h-3" />;
      default: return <FaUser className="w-3 h-3" />;
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-[#1a1a1a] border border-white/5">
      {/* Banner */}
      <div className={`h-48 w-full relative overflow-hidden ${badge.label === "Élite" || badge.label === "VIP" ? "bg-gradient-to-r from-black via-gold/20 to-black" : "bg-gradient-to-r from-black via-red-950 to-black"}`}>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/velvet.png')] opacity-20" />
        {badge.label === "Élite" || badge.label === "VIP" ? (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,transparent_70%)]" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
      </div>

      {/* Profile Info */}
      <div className="px-8 pb-8 -mt-16 relative z-10 flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <img
            src={user.image || ""}
            alt={user.name || ""}
            className="w-32 h-32 rounded-full border-4 border-[#1a1a1a] gold-glow object-cover shadow-[0_0_25px_rgba(212,175,55,0.2)]"
          />
          <div className="absolute -bottom-2 -right-2 md:right-0 bg-[#1a1a1a] p-1.5 rounded-full border border-gold/30">
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest ${badge.color}`}>
              {badge.icon}
              {badge.label}
            </div>
          </div>
        </motion.div>

        <div className="flex-1 mb-2 w-full">
          <div className="flex flex-col md:flex-row flex-wrap items-center md:items-end gap-4 mb-2">
            <motion.h1
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-serif text-white"
            >
              {user.name}
            </motion.h1>

            {/* Badges de Rôles Discord */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {user.discordRoles && user.discordRoles.length > 0 ? (
                user.discordRoles.map((roleId) => {
                  const roleInfo = DISCORD_ROLE_MAPPING[roleId];
                  if (!roleInfo) return null;
                  return (
                    <motion.div
                      key={roleId}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-bold uppercase tracking-widest ${roleInfo.color}`}
                    >
                      {getIcon(roleInfo.icon)}
                      {roleInfo.label}
                    </motion.div>
                  );
                })
              ) : (
                <span className="text-[10px] text-white/20 italic">Aucun rôle spécial détecté</span>
              )}
            </div>
          </div>
          <p className="text-gold/50 font-sans text-sm tracking-[0.2em] uppercase italic">
            Membre du cercle depuis le {new Date().toLocaleDateString('fr-FR')}
          </p>
        </div>

        {/* Boutons d'action réintégrés */}
        {!isPublicView ? (
          <div className="flex flex-col sm:flex-row gap-3 mb-2 w-full sm:w-auto">
            <Link href="/dashboard/edit" className="w-full sm:w-auto">
              <button className="w-full px-6 py-2 rounded-full border border-white/10 text-[11px] uppercase tracking-widest text-white/50 hover:border-gold/30 hover:text-gold transition-all duration-300 bg-black/40 backdrop-blur-md">
                Éditer l'âme
              </button>
            </Link>
            <button 
              onClick={copyProfileLink}
              className="w-full sm:px-6 py-2 rounded-full bg-primary/10 border border-primary/30 text-[11px] uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md"
            >
              <FaShareAlt className="text-[10px]" />
              Partager mon secret
            </button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3 mb-2 w-full sm:w-auto">
            <button 
              onClick={toggleFavorite}
              disabled={loading}
              className={`flex-1 sm:px-6 py-2 rounded-full border transition-all duration-300 flex items-center justify-center gap-2 text-[11px] uppercase tracking-widest backdrop-blur-md ${
                isFavorited 
                  ? "bg-primary text-white border-primary shadow-[0_0_15px_rgba(239,68,68,0.3)]" 
                  : "bg-white/5 border-white/10 text-white/50 hover:border-primary/30 hover:text-primary"
              }`}
            >
              {isFavorited ? <FaHeartSolid className="text-[10px]" /> : <FaRegHeart className="text-[10px]" />}
              {isFavorited ? "Coup de cœur" : "Coup de cœur"}
            </button>
            <a href="https://discord.gg/kPrbFta8Rm" target="_blank" rel="noopener noreferrer" className="flex-1 sm:w-auto">
              <button className="w-full px-6 py-2 rounded-full bg-gold/10 border border-gold/30 text-[11px] uppercase tracking-widest text-gold hover:bg-gold hover:text-black transition-all duration-300 backdrop-blur-md">
                Discord
              </button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
