"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaPaperPlane, FaTimes, FaCommentDots } from "react-icons/fa";
import toast from "react-hot-toast";

export const ChatWindow = ({ targetId, targetName, currentUserId }: { targetId: string; targetName: string; currentUserId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const initChat = async () => {
    try {
      const res = await fetch("/api/chat/conversations", {
        method: "POST",
        body: JSON.stringify({ targetId }),
      });
      if (res.ok) {
        const conv = await res.json();
        setConversationId(conv.id);
        fetchMessages(conv.id);
      }
    } catch (error) {
      console.error("Chat init error");
    }
  };

  const fetchMessages = async (id: string) => {
    const res = await fetch(`/api/chat/messages?conversationId=${id}`);
    if (res.ok) {
      const data = await res.json();
      setMessages(data);
    }
  };

  useEffect(() => {
    if (isOpen && !conversationId) {
      initChat();
    }
    if (isOpen && conversationId) {
      const interval = setInterval(() => fetchMessages(conversationId), 3000);
      return () => clearInterval(interval);
    }
  }, [isOpen, conversationId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !conversationId) return;

    const newContent = content;
    setContent("");

    try {
      const res = await fetch("/api/chat/messages", {
        method: "POST",
        body: JSON.stringify({
          content: newContent,
          conversationId,
          receiverId: targetId,
        }),
      });

      if (res.ok) {
        const msg = await res.json();
        setMessages([...messages, msg]);
      }
    } catch (error) {
      toast.error("Échec de l'envoi");
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-8 z-[90] w-14 h-14 rounded-full bg-gold text-black flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-110 transition-all group"
      >
        <FaCommentDots className="text-xl group-hover:rotate-12 transition-transform" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-[100] w-[350px] h-[500px] bg-[#1a1a1a] border border-gold/20 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden glass"
          >
            {/* Header */}
            <div className="p-6 bg-black/40 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs uppercase tracking-widest text-white font-serif">{targetName}</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/20 hover:text-white transition-colors">
                <FaTimes />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.senderId === currentUserId ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-sans ${
                    msg.senderId === currentUserId 
                      ? "bg-gold text-black rounded-tr-none" 
                      : "bg-white/5 text-white/80 border border-white/10 rounded-tl-none"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="p-4 bg-black/40 border-t border-white/5 flex gap-2">
              <input 
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Murmurer quelque chose..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs text-white focus:outline-none focus:border-gold/30 transition-all"
              />
              <button 
                type="submit"
                className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 text-gold flex items-center justify-center hover:bg-gold hover:text-black transition-all"
              >
                <FaPaperPlane className="text-xs" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
