import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { profileId } = await req.json();
    if (!profileId) {
      return NextResponse.json({ error: "Profile ID required" }, { status: 400 });
    }

    // Ne pas compter sa propre visite
    if (session.user.id === profileId) {
      return NextResponse.json({ success: true });
    }

    // Upsert la vue (met à jour le timestamp si déjà existant entre ces deux utilisateurs)
    await prisma.profileView.upsert({
      where: {
        profileId_visitorId: {
          profileId,
          visitorId: session.user.id,
        },
      },
      update: {
        createdAt: new Date(),
      },
      create: {
        profileId,
        visitorId: session.user.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking profile view:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
