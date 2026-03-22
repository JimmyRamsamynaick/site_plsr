"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaPlus, FaImage, FaLock, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

export const MediaGallery = ({ userId, initialMedia = [], isOwner = false }: { userId: string; initialMedia?: any[]; isOwner?: boolean }) => {
  const [media, setMedia] = useState(initialMedia);
  const [loading, setLoading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("isNSFW", "true");

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const newMedia = await res.json();
        setMedia([newMedia, ...media]);
        toast.success("Média ajouté à votre galerie");
        setShowUpload(false);
      }
    } catch (error) {
      toast.error("Erreur lors de l'envoi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-serif text-white">Galerie <span className="text-gold-gradient italic">Média</span></h2>
        {isOwner && (
          <button 
            onClick={() => setShowUpload(!showUpload)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] uppercase tracking-widest hover:bg-gold hover:text-black transition-all"
          >
            <FaPlus /> Ajouter un secret
          </button>
        )}
      </div>

      <AnimatePresence>
        {showUpload && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-8 rounded-3xl bg-white/5 border border-dashed border-white/10 text-center"
          >
            <input 
              type="file" 
              id="media-upload" 
              className="hidden" 
              accept="image/*,video/*"
              onChange={handleUpload}
            />
            <label 
              htmlFor="media-upload"
              className="cursor-pointer flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-black/40 flex items-center justify-center text-gold/40">
                <FaImage className="text-2xl" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Cliquez pour s'initier au partage</p>
                <p className="text-[10px] text-white/20 uppercase tracking-widest mt-1">Images ou vidéos (Max 10Mo)</p>
              </div>
            </label>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {media.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
          >
            <img 
              src={item.url} 
              alt={item.caption || "Secret"} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Overlay NSFW / Protection */}
            {item.isNSFW && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                <FaLock className="text-gold/40 text-xl mb-2" />
                <span className="text-[8px] uppercase tracking-[0.3em] text-gold/60 font-bold">Secret Protégé</span>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
              <p className="text-[10px] text-white/80 italic line-clamp-2">{item.caption || "Aucun murmure..."}</p>
            </div>
          </motion.div>
        ))}

        {media.length === 0 && (
          <div className="col-span-full py-20 text-center rounded-[3rem] bg-white/[0.02] border border-white/5">
            <p className="text-white/20 italic font-sans">"Cette galerie est encore vierge de tout secret..."</p>
          </div>
        )}
      </div>
    </div>
  );
};
