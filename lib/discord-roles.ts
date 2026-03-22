// Ce fichier permet de mapper les IDs de rôles Discord vers des labels lisibles.
// Tu peux récupérer les IDs de tes rôles dans les paramètres de ton serveur Discord.

export const DISCORD_ROLE_MAPPING: Record<string, { label: string, color: string, icon: string }> = {
  "1458949355175284797": { 
    label: "Fonda", 
    color: "border-red-500 text-red-500 bg-red-500/10", 
    icon: "FaCrown" 
  },
  "1459177196869652684": { 
    label: "Staff", 
    color: "border-blue-500 text-blue-500 bg-blue-500/10", 
    icon: "FaUserShield" 
  },
  "1463335175416184924": { 
    label: "Server Booster", 
    color: "border-pink-500 text-pink-500 bg-pink-500/10", 
    icon: "FaGem" 
  },
  "1461734975027286088": { 
    label: "Nudeuse Premium", 
    color: "border-purple-500 text-purple-500 bg-purple-500/10", 
    icon: "FaStar" 
  },
  "1461734758135496754": { 
    label: "Nudeuse Spécial", 
    color: "border-indigo-500 text-indigo-500 bg-indigo-500/10", 
    icon: "FaMagic" 
  },
  "1461734696013791243": { 
    label: "Créatrice de contenu", 
    color: "border-orange-500 text-orange-500 bg-orange-500/10", 
    icon: "FaVideo" 
  },
  "1459656965599924339": { 
    label: "Certifié.e", 
    color: "border-green-500 text-green-500 bg-green-500/10", 
    icon: "FaCheckCircle" 
  },
  "1458949363895373895": { 
    label: "Membre", 
    color: "border-white/20 text-white/50 bg-white/5", 
    icon: "FaUser" 
  },
};

// Si tu veux que le site affiche des rôles par défaut pour tout le monde
export const getRoleInfo = (roleId: string) => {
  return DISCORD_ROLE_MAPPING[roleId] || {
    label: "Membre",
    color: "border-white/20 text-white/50 bg-white/5",
    icon: "FaUser"
  };
};
