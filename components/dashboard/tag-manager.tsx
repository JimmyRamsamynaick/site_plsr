"use client";

import { motion } from "framer-motion";
import { Plus, X, Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface TagManagerProps {
  initialTags?: string[];
}

export const TagManager = ({ initialTags = [] }: TagManagerProps) => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const updateTags = async (newTags: string[]) => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tags: newTags }),
      });

      if (res.ok) {
        setTags(newTags);
        router.refresh();
      } else {
        toast.error("Échec de la mise à jour des marques");
      }
    } catch (error) {
      toast.error("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag)) {
      updateTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    updateTags(tags.filter((t) => t !== tag));
  };

  return (
    <div className="p-8 rounded-3xl bg-[#1a1a1a] border border-white/5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 group-hover:bg-primary/10 transition-colors duration-500" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-2xl font-serif text-white mb-2 flex items-center gap-3">
            Marques du désir
            {loading && <Loader2 className="w-4 h-4 animate-spin text-gold/50" />}
          </h2>
          <p className="text-sm text-white/40 italic">Exprimez votre essence à travers ces marques sacrées.</p>
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            disabled={loading}
            placeholder="Ajouter une marque..."
            className="bg-black/50 border border-white/10 rounded-full px-6 py-2 text-sm text-white focus:outline-none focus:border-gold/30 transition-all duration-300 w-full md:w-64 placeholder:text-white/20 disabled:opacity-50"
            onKeyDown={(e) => e.key === "Enter" && addTag()}
          />
          <button
            onClick={addTag}
            disabled={loading}
            className="p-2.5 rounded-full bg-gold/10 border border-gold/30 text-gold hover:bg-gold hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {tags.map((tag, idx) => (
          <motion.div
            key={tag}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.05 * idx }}
            whileHover={{ y: -2 }}
            className="group/tag relative flex items-center gap-3 px-6 py-2.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-sm font-medium tracking-wide hover:border-gold/50 hover:bg-gold/10 transition-all duration-300 cursor-default"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-gold group-hover/tag:scale-150 transition-transform duration-500" />
            {tag}
            <button
              onClick={() => removeTag(tag)}
              disabled={loading}
              className="opacity-0 group-hover/tag:opacity-100 p-0.5 rounded-full hover:bg-red-500/20 text-red-500/50 hover:text-red-500 transition-all duration-300 disabled:opacity-50"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="absolute inset-0 rounded-full bg-gold/10 blur-md opacity-0 group-hover/tag:opacity-100 transition-opacity duration-500 -z-10" />
          </motion.div>
        ))}
        
        {tags.length === 0 && (
          <p className="text-white/20 text-sm italic py-4">Aucune marque portée pour le moment...</p>
        )}
      </div>
    </div>
  );
};
