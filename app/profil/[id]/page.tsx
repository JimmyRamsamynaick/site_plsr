import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProfileHeader } from "@/components/dashboard/profile-header";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { CommentSection } from "@/components/profile/comment-section";
import { ProfileViewTracker } from "@/components/profile/profile-view-tracker";
import { MediaGallery } from "@/components/profile/media-gallery";
import { ChatWindow } from "@/components/profile/chat-window";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      favoritedBy: {
        select: { userId: true }
      },
      media: {
        orderBy: { createdAt: 'desc' }
      },
      comments: {
        include: {
          author: true,
          replies: {
            include: {
              author: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  });

  if (!user) {
    notFound();
  }

  const userWithData = {
    ...user,
    status: user.status || "Âme tentée",
    tags: JSON.parse(user.tagsRaw || "[]"),
    discordRoles: JSON.parse(user.discordRolesRaw || "[]")
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto space-y-12">
      <ProfileViewTracker profileId={user.id} currentUserId={session?.user?.id} />
      
      {session?.user?.id && session.user.id !== user.id && (
        <ChatWindow targetId={user.id} targetName={user.name} currentUserId={session.user.id} />
      )}

      <Link 
        href="/membres" 
        className="inline-flex items-center gap-2 text-white/40 hover:text-gold transition-colors mb-4 group"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs uppercase tracking-widest font-sans">Retour au Cercle</span>
      </Link>

      <div className="relative">
        {/* Version modifiée du header pour la vue publique (sans boutons d'édition) */}
        <ProfileHeader 
          user={userWithData} 
          isPublicView={true} 
          currentUserId={session?.user?.id}
        />
      </div>
      
      <StatsGrid user={userWithData} isPublicView={true} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div className="p-12 rounded-[3rem] bg-[#1a1a1a] border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
              
              <h2 className="text-3xl font-serif text-white mb-8">L'Essence de l'Âme</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h3 className="text-xs uppercase tracking-[0.3em] text-gold/60 font-bold">À propos</h3>
                  <p className="text-white/60 font-sans leading-relaxed italic whitespace-pre-line">
                    {user.bio || "Cette âme préfère garder son mystère pour le moment..."}
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xs uppercase tracking-[0.3em] text-primary/60 font-bold">Marques portées</h3>
                  <div className="flex flex-wrap gap-3">
                    {userWithData.tags.map((tag: string) => (
                      <span 
                        key={tag}
                        className="px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-xs font-medium tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                    {userWithData.tags.length === 0 && (
                      <p className="text-white/20 text-sm italic">Aucune marque visible.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Galerie Média (uniquement si publique ou si c'est notre propre profil) */}
            {(userWithData.isGalleryPublic || session?.user?.id === user.id) && (
              <MediaGallery 
                userId={user.id} 
                initialMedia={user.media} 
                isOwner={session?.user?.id === user.id} 
              />
            )}

            {/* Comment Section */}
            <CommentSection 
              comments={user.comments} 
              profileId={user.id}
              currentUserId={session?.user?.id}
              isOwner={session?.user?.id === user.id}
            />
          </div>

          <div className="space-y-8">
            {/* On pourrait mettre autre chose ici plus tard */}
          </div>
        </div>
    </main>
  );
}
