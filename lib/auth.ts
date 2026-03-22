import { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: "identify email guilds guilds.members.read" } },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "discord" && account.access_token) {
        try {
          const guildId = process.env.DISCORD_GUILD_ID;
          console.log("Checking roles for guild:", guildId);
          if (!guildId) return true;

          const res = await fetch(
            `https://discord.com/api/users/@me/guilds/${guildId}/member`,
            {
              headers: {
                Authorization: `Bearer ${account.access_token}`,
              },
            }
          );

          if (res.ok) {
            const member = await res.json();
            const roles = member.roles || [];
            console.log("Discord roles found:", roles);
            
            await prisma.user.update({
              where: { id: user.id },
              data: {
                discordRolesRaw: JSON.stringify(roles),
              },
            });
          } else {
            const errorData = await res.text();
            console.error("Discord API error response:", errorData);
          }
        } catch (error) {
          console.error("Error fetching Discord roles:", error);
        }
      }
      return true;
    },
    async session({ session, user }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = user.id;
        // @ts-ignore
        session.user.role = user.role;
        // @ts-ignore
        session.user.tags = JSON.parse(user.tagsRaw || "[]");
        // @ts-ignore
        session.user.status = user.status;
        // @ts-ignore
        session.user.discordRoles = JSON.parse(user.discordRolesRaw || "[]");
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
