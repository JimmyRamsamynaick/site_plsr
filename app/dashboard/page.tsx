import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProfileHeader } from "@/components/dashboard/profile-header";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { TagManager } from "@/components/dashboard/tag-manager";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { 
      posts: true,
      profileViews: {
        include: {
          visitor: true
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 10
      },
      writtenComments: {
        take: 5,
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          profile: true
        }
      }
    },
  });

  if (!user) {
    redirect("/");
  }

  // Adapter les données SQLite pour le frontend
  const userWithTags = {
    ...user,
    tags: JSON.parse(user.tagsRaw || "[]"),
    discordRoles: JSON.parse(user.discordRolesRaw || "[]"),
    profileViews: user.profileViews || []
  };

  const isElite = userWithTags.discordRoles.some((id: string) => 
    ["1458949355175284797", "1463335175416184924", "1461734975027286088"].includes(id)
  );

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto space-y-12">
      <ProfileHeader user={userWithTags} />
      
      <div className="grid grid-cols-1 gap-12">
        <StatsGrid user={userWithTags} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <TagManager initialTags={userWithTags.tags} />
            
            {/* Wall of Temptations Preview */}
            <div className="p-8 rounded-3xl bg-[#1a1a1a] border border-white/5">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif text-white">Mur des Tentations</h2>
                <button className="text-[10px] uppercase tracking-widest text-gold/50 hover:text-gold transition-colors">
                  Voir tout
                </button>
              </div>
              <div className="space-y-6">
                <p className="text-white/20 italic text-sm py-4">
                  "Le silence est parfois la plus grande des tentations... Les secrets arriveront bientôt."
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="p-8 rounded-3xl bg-[#1a1a1a] border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -z-10" />
              <h3 className="text-xl font-serif text-white mb-6">Tes derniers Murmures</h3>
              
              <div className="space-y-4">
                {user.writtenComments.length > 0 ? (
                  user.writtenComments.map((comment) => (
                    <Link 
                      key={comment.id} 
                      href={`/profil/${comment.profileId}`}
                      className="block p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-gold/20 transition-all group/item"
                    >
                      <p className="text-[10px] text-gold/60 uppercase tracking-widest mb-2 flex items-center gap-2">
                        Sur le profil de {comment.profile.name}
                      </p>
                      <p className="text-xs text-white/50 italic line-clamp-2 group-hover/item:text-white/80 transition-colors">
                        "{comment.content}"
                      </p>
                    </Link>
                  ))
                ) : (
                  <p className="text-xs text-white/20 italic text-center py-6">
                    "Tu n'as pas encore laissé de secrets sur d'autres profils..."
                  </p>
                )}
              </div>
            </div>
            
            <div className="p-8 rounded-3xl bg-[#1a1a1a] border border-white/5 relative overflow-hidden group">
              <h3 className="text-xl font-serif text-white mb-4">Regard posé sur toi</h3>
              
              {!isElite ? (
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-gold/5 border border-gold/20 backdrop-blur-sm">
                    <p className="text-xs text-gold/80 leading-relaxed font-sans italic">
                      "Seules les âmes du rang <span className="font-bold">Élite</span> peuvent lever le voile sur ceux qui les observent."
                    </p>
                  </div>
                  <div className="flex -space-x-3 opacity-20 grayscale">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-[#1a1a1a] bg-white/5" />
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm text-white/40 mb-6 italic">
                    {userWithTags.profileViews.length > 0 
                      ? "Voici les dernières âmes ayant succombé à la curiosité :" 
                      : "Personne n'a encore osé poser son regard sur votre secret."}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {userWithTags.profileViews.map((view: any) => (
                      <Link 
                        key={view.id} 
                        href={`/profil/${view.visitorId}`}
                        title={view.visitor.name}
                        className="relative group/visitor"
                      >
                        <img 
                          src={view.visitor.image || "/globe.svg"} 
                          alt={view.visitor.name}
                          className="w-12 h-12 rounded-full border-2 border-gold/30 hover:border-gold transition-all duration-300 object-cover shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                        />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1a1a1a]" />
                      </Link>
                    ))}
                    {userWithTags.profileViews.length === 0 && (
                      <div className="flex -space-x-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-10 h-10 rounded-full border-2 border-[#1a1a1a] bg-white/5" />
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
