import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { FaCrown, FaGem, FaStar, FaUserShield, FaUser, FaVideo, FaCheckCircle, FaMagic } from "react-icons/fa";

import { DISCORD_ROLE_MAPPING } from "@/lib/discord-roles";

export default async function MembresPage() {
  const session = await getServerSession(authOptions);
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  const usersWithData = users.map(user => ({
    ...user,
    tags: JSON.parse(user.tagsRaw || "[]"),
    discordRoles: JSON.parse(user.discordRolesRaw || "[]")
  }));

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "FaCrown": return <FaCrown className="w-2 h-2" />;
      case "FaUserShield": return <FaUserShield className="w-2 h-2" />;
      case "FaGem": return <FaGem className="w-2 h-2" />;
      case "FaVideo": return <FaVideo className="w-2 h-2" />;
      case "FaCheckCircle": return <FaCheckCircle className="w-2 h-2" />;
      case "FaMagic": return <FaMagic className="w-2 h-2" />;
      default: return <FaUser className="w-2 h-2" />;
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
          Le Cercle des <span className="text-gold-gradient italic">Membres</span>
        </h1>
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-[10px] uppercase tracking-widest bg-gold/10 text-gold px-4 py-1.5 rounded-full border border-gold/20">
            {users.length} âmes initiées
          </span>
        </div>
        <p className="text-white/50 italic font-sans max-w-2xl mx-auto">
          "Ici, chaque âme a sa place. Découvrez ceux qui ont osé franchir les portes du Palais."
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {usersWithData.map((user) => (
          <Link
            key={user.id}
            href={`/profil/${user.id}`}
            className={`group relative p-6 rounded-3xl bg-[#1a1a1a] border transition-all duration-500 overflow-hidden cursor-pointer ${
              session?.user?.email === user.email 
                ? "border-gold/50 shadow-[0_0_20px_rgba(212,175,55,0.1)]" 
                : "border-white/5 hover:border-gold/30"
            }`}
          >
            {session?.user?.email === user.email && (
              <div className="absolute top-4 right-4 z-20">
                <span className="text-[8px] uppercase tracking-widest bg-gold/20 text-gold px-2 py-1 rounded-full border border-gold/30">
                  C'est vous
                </span>
              </div>
            )}
            {/* Background Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <img
                  src={user.image || "/globe.svg"}
                  alt={user.name || "Membre"}
                  className="w-24 h-24 rounded-full border-2 border-white/10 group-hover:border-gold/50 transition-colors duration-500 object-cover"
                />
                {user.role === "VIP" && (
                  <div className="absolute -bottom-1 -right-1 bg-[#1a1a1a] p-1.5 rounded-full border border-gold/30">
                    <FaCrown className="text-gold text-xs" />
                  </div>
                )}
                {user.role === "Élite" && (
                  <div className="absolute -bottom-1 -right-1 bg-[#1a1a1a] p-1.5 rounded-full border border-primary/30">
                    <FaGem className="text-primary text-xs" />
                  </div>
                )}
              </div>

              <h3 className="text-xl font-serif text-white mb-1 group-hover:text-gold-gradient transition-all duration-500">
                {user.name}
              </h3>
              
              <div className="flex flex-col items-center gap-2 mb-4">
                <span className={`text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border ${
                  user.role === "VIP" ? "border-gold/30 text-gold" : 
                  user.role === "Élite" ? "border-primary/30 text-primary" : 
                  "border-white/10 text-white/40"
                }`}>
                  {user.role || "Âme tentée"}
                </span>

                {/* Discord Roles */}
                <div className="flex flex-wrap justify-center gap-1.5 mt-1">
                  {user.discordRoles?.map((roleId: string) => {
                    const roleInfo = DISCORD_ROLE_MAPPING[roleId];
                    if (!roleInfo) return null;
                    return (
                      <span
                        key={roleId}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[7px] font-bold uppercase tracking-tighter ${roleInfo.color}`}
                      >
                        {getIcon(roleInfo.icon)}
                        {roleInfo.label}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {user.tags?.slice(0, 3).map((tag: string) => (
                  <span key={tag} className="text-[9px] uppercase tracking-tighter text-white/30 px-2 py-0.5 rounded-md bg-white/5">
                    {tag}
                  </span>
                ))}
              </div>

              <span className="mt-6 text-[10px] uppercase tracking-[0.2em] text-gold/50 group-hover:text-gold transition-colors duration-300">
                Voir le secret
              </span>
            </div>
          </Link>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-20">
          <p className="text-white/20 italic font-serif text-xl">
            "Le Palais est encore calme... En attente des premières âmes."
          </p>
        </div>
      )}
    </main>
  );
}
