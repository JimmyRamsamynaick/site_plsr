"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { LuxuryButton } from "@/components/ui/luxury-button";
import { FaArrowLeft, FaSave, FaUser, FaQuoteRight, FaTags, FaInfoCircle, FaSlidersH, FaHeart, FaFingerprint, FaRunning } from "react-icons/fa";
import Link from "next/link";
import toast from "react-hot-toast";
import { TagManager } from "@/components/dashboard/tag-manager";

function EditProfileContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeSection = searchParams.get("section") || "identity";
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    status: "",
    tags: [] as string[],
    isPublic: true,
    isAnonymous: false,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
    if (session?.user) {
      const fetchUser = async () => {
        const res = await fetch("/api/user/me");
        if (res.ok) {
          const user = await res.json();
          setFormData({
            name: user.name || "",
            bio: user.bio || "",
            status: user.status || "",
            tags: user.tags || [],
            isPublic: user.isPublic ?? true,
            isAnonymous: user.isAnonymous ?? false,
          });
        }
      };
      fetchUser();
    }
  }, [session, status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Votre âme a été mise à jour");
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.error("Une erreur est survenue");
      }
    } catch (error) {
      toast.error("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") return null;

  const sections = [
    { id: "identity", label: "Identité", icon: <FaFingerprint /> },
    { id: "desires", label: "Désirs", icon: <FaHeart /> },
    { id: "preferences", label: "Préférences", icon: <FaSlidersH /> },
    { id: "status", label: "Statut", icon: <FaRunning /> },
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-6xl mx-auto">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-white/40 hover:text-gold transition-colors mb-8 group">
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs uppercase tracking-widest font-sans">Retour au Tableau de Bord</span>
      </Link>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-64 space-y-2">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => router.push(`/dashboard/edit?section=${s.id}`)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 text-sm uppercase tracking-widest font-sans ${
                activeSection === s.id 
                  ? "bg-gold/10 border border-gold/30 text-gold shadow-[0_0_20px_rgba(212,175,55,0.1)]" 
                  : "bg-white/5 border border-white/5 text-white/40 hover:bg-white/10"
              }`}
            >
              <span className={activeSection === s.id ? "text-gold" : "text-white/20"}>
                {s.icon}
              </span>
              {s.label}
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <div className="flex-1">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 md:p-12 rounded-[3rem] bg-[#1a1a1a] border border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
            
            <form onSubmit={handleSubmit} className="space-y-10">
              <AnimatePresence mode="wait">
                {activeSection === "identity" && (
                  <motion.div
                    key="identity"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-3xl font-serif text-white mb-2">Votre <span className="text-gold-gradient italic">Identité</span></h2>
                      <p className="text-white/40 text-sm italic">Modifiez les traits publics de votre âme.</p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gold/60 ml-4 font-bold">Nom affiché</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold/30 transition-all"
                          placeholder="Votre nom..."
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-primary/60 ml-4 font-bold">L'Essence (Bio)</label>
                        <textarea
                          value={formData.bio}
                          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-3xl px-6 py-4 text-white focus:outline-none focus:border-gold/30 transition-all min-h-[200px] resize-none"
                          placeholder="Racontez votre histoire au Palais..."
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSection === "desires" && (
                  <motion.div
                    key="desires"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-3xl font-serif text-white mb-2">Marques du <span className="text-gold-gradient italic">Désir</span></h2>
                      <p className="text-white/40 text-sm italic">Gérez les tags qui vous définissent.</p>
                    </div>
                    
                    <div className="pt-4">
                      <TagManager initialTags={formData.tags} />
                    </div>
                    
                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                      <p className="text-xs text-primary/60 leading-relaxed italic">
                        "Les marques sont sauvegardées instantanément. Elles apparaissent sur votre profil public pour attirer les âmes qui vous ressemblent."
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeSection === "status" && (
                  <motion.div
                    key="status"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-3xl font-serif text-white mb-2">Votre <span className="text-gold-gradient italic">Statut</span></h2>
                      <p className="text-white/40 text-sm italic">Indiquez votre état d'esprit actuel.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-gold/60 ml-4 font-bold">Position dans le cercle</label>
                      <input
                        type="text"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-gold/30 transition-all"
                        placeholder="Ex: En attente de tentation, Explorateur nocturne..."
                      />
                    </div>
                  </motion.div>
                )}

                {activeSection === "preferences" && (
                  <motion.div
                    key="preferences"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-3xl font-serif text-white mb-2"><span className="text-gold-gradient italic">Préférences</span></h2>
                      <p className="text-white/40 text-sm italic">Paramétrez votre expérience au Palais.</p>
                    </div>

                    <div className="space-y-6">
                      <div 
                        onClick={() => setFormData({ ...formData, isPublic: !formData.isPublic })}
                        className="p-8 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between group cursor-pointer hover:border-gold/30 transition-all"
                      >
                        <div>
                          <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-1">Profil Public</h3>
                          <p className="text-[10px] text-white/30 italic">Autoriser les autres membres à voir votre secret.</p>
                        </div>
                        <div className={`w-12 h-6 rounded-full transition-all duration-500 border ${formData.isPublic ? "bg-gold/20 border-gold/50" : "bg-white/5 border-white/10"}`}>
                          <div className={`w-4 h-4 rounded-full transition-all duration-500 mt-1 ${formData.isPublic ? "bg-gold shadow-[0_0_10px_rgba(212,175,55,0.5)] ml-7" : "bg-white/20 ml-1"}`} />
                        </div>
                      </div>

                      <div 
                        onClick={() => {
                          const isElite = session?.user?.discordRoles?.some((id: string) => 
                            ["1458949355175284797", "1463335175416184924", "1461734975027286088"].includes(id)
                          );
                          if (isElite) {
                            setFormData({ ...formData, isAnonymous: !formData.isAnonymous });
                          } else {
                            toast.error("Le Mode Anonyme est réservé au rang Élite.");
                          }
                        }}
                        className={`p-8 rounded-2xl bg-black/40 border flex items-center justify-between transition-all ${
                          session?.user?.discordRoles?.some((id: string) => ["1458949355175284797", "1463335175416184924", "1461734975027286088"].includes(id))
                            ? "border-white/5 cursor-pointer hover:border-gold/30"
                            : "border-white/5 opacity-50 cursor-not-allowed"
                        }`}
                      >
                        <div>
                          <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-1">Mode Anonyme</h3>
                          <p className="text-[10px] text-white/30 italic">Masquer votre présence dans les regards posés.</p>
                        </div>
                        <div className={`w-12 h-6 rounded-full transition-all duration-500 border ${formData.isAnonymous ? "bg-gold/20 border-gold/50" : "bg-white/5 border-white/10"}`}>
                          <div className={`w-4 h-4 rounded-full transition-all duration-500 mt-1 ${formData.isAnonymous ? "bg-gold shadow-[0_0_10px_rgba(212,175,55,0.5)] ml-7" : "bg-white/20 ml-1"}`} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {activeSection !== "desires" && (
                <div className="pt-6 flex flex-col sm:flex-row gap-4 border-t border-white/5">
                  <LuxuryButton
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-4"
                    icon={<FaSave />}
                  >
                    {loading ? "Inspiration en cours..." : "Sauvegarder les traits"}
                  </LuxuryButton>
                  <Link href="/dashboard" className="flex-1">
                    <LuxuryButton
                      variant="outline"
                      type="button"
                      className="w-full py-4"
                    >
                      Annuler
                    </LuxuryButton>
                  </Link>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

export default function EditProfilePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gold font-serif italic animate-pulse">Chargement du sanctuaire...</div>}>
      <EditProfileContent />
    </Suspense>
  );
}
