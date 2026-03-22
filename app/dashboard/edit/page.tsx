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
            tags: JSON.parse(user.tagsRaw || "[]"),
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
                      <div className="p-8 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between group">
                        <div>
                          <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-1">Profil Public</h3>
                          <p className="text-[10px] text-white/30 italic">Autoriser les autres membres à voir votre secret.</p>
                        </div>
                        <div className="w-12 h-6 rounded-full bg-gold/20 border border-gold/50 relative">
                          <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                        </div>
                      </div>

                      <div className="p-8 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between opacity-50 cursor-not-allowed">
                        <div>
                          <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-1">Mode Anonyme</h3>
                          <p className="text-[10px] text-white/30 italic">Masquer votre présence dans les salons vocaux.</p>
                        </div>
                        <div className="w-12 h-6 rounded-full bg-white/5 border border-white/10 relative">
                          <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white/20" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                      <FaInfoCircle className="text-gold/50 text-xs" />
                      <p className="text-[10px] text-white/40 uppercase tracking-widest">Certaines options nécessitent le rang Élite.</p>
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
