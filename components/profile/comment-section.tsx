"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaReply, FaPaperPlane, FaUser, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface CommentProps {
  comments: any[];
  profileId: string;
  currentUserId?: string;
  isOwner: boolean;
}

export const CommentSection = ({ comments, profileId, currentUserId, isOwner }: CommentProps) => {
  const [content, setContent] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent, parentId?: string) => {
    e.preventDefault();
    if (!content.trim()) return;
    if (!currentUserId) {
      toast.error("Vous devez être connecté pour laisser un secret.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          profileId,
          parentId: parentId || null,
        }),
      });

      if (res.ok) {
        toast.success(parentId ? "Réponse envoyée" : "Secret déposé");
        setContent("");
        setReplyTo(null);
        router.refresh();
      } else {
        toast.error("Échec de l'envoi");
      }
    } catch (error) {
      toast.error("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  const CommentItem = ({ comment, isReply = false }: { comment: any, isReply?: boolean }) => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative group ${isReply ? "ml-4 md:ml-12 mt-4" : "mt-8"}`}
    >
      <div className={`p-6 rounded-3xl bg-[#1a1a1a] border ${comment.authorId === profileId ? "border-gold/30 bg-gold/5" : "border-white/5"}`}>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <img 
              src={comment.author.image || "/globe.svg"} 
              alt={comment.author.name} 
              className="w-10 h-10 rounded-full border border-white/10"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-serif text-white">{comment.author.name}</span>
                {comment.authorId === profileId && (
                  <span className="text-[8px] uppercase tracking-widest bg-gold/20 text-gold px-2 py-0.5 rounded-full border border-gold/30">
                    Propriétaire
                  </span>
                )}
              </div>
              <span className="text-[10px] text-white/20">
                {new Date(comment.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
          
          {currentUserId && !isReply && (isOwner || currentUserId === comment.authorId) && (
            <button 
              onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
              className="text-white/20 hover:text-gold transition-colors p-2"
            >
              <FaReply className="text-xs" />
            </button>
          )}
        </div>

        <p className="text-sm text-white/60 leading-relaxed font-sans">
          {comment.content}
        </p>
      </div>

      {/* Reply Form */}
      <AnimatePresence>
        {replyTo === comment.id && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="ml-4 md:ml-12 mt-4 overflow-hidden"
          >
            <form onSubmit={(e) => handleSubmit(e, comment.id)} className="flex gap-3">
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Écrivez votre réponse..."
                className="flex-1 bg-black/40 border border-white/10 rounded-full px-6 py-2 text-xs text-white focus:outline-none focus:border-gold/30 transition-all"
              />
              <button 
                type="submit"
                disabled={loading}
                className="p-3 rounded-full bg-gold/10 text-gold border border-gold/30 hover:bg-gold hover:text-black transition-all"
              >
                <FaPaperPlane className="text-xs" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Display Replies */}
      {comment.replies?.map((reply: any) => (
        <CommentItem key={reply.id} comment={reply} isReply />
      ))}
    </motion.div>
  );

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-serif text-white">Mur des <span className="text-gold-gradient italic">Secrets</span></h2>
        <span className="text-[10px] uppercase tracking-widest text-white/20">{comments.length} Murmures</span>
      </div>

      {/* Main Comment Form */}
      {currentUserId && (
        <form onSubmit={handleSubmit} className="relative group">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Laissez un secret sur ce profil..."
            className="w-full bg-[#1a1a1a] border border-white/5 rounded-[2rem] p-8 text-white focus:outline-none focus:border-gold/20 transition-all min-h-[120px] resize-none pr-20"
          />
          <button 
            type="submit"
            disabled={loading || !content.trim()}
            className="absolute bottom-6 right-6 px-6 py-3 rounded-full bg-gold text-black text-[10px] uppercase tracking-widest font-bold hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100"
          >
            {loading ? "Envoi..." : "Déposer"}
          </button>
        </form>
      )}

      <div className="space-y-8">
        {comments.filter(c => !c.parentId).map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
        
        {comments.length === 0 && (
          <div className="text-center py-20 border border-dashed border-white/5 rounded-[3rem]">
            <p className="text-white/20 italic font-serif">Le silence règne encore sur ce mur...</p>
          </div>
        )}
      </div>
    </div>
  );
};
