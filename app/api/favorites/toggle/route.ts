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

    const { targetId } = await req.json();
    if (!targetId) {
      return NextResponse.json({ error: "Target ID required" }, { status: 400 });
    }

    if (session.user.id === targetId) {
      return NextResponse.json({ error: "Cannot favorite yourself" }, { status: 400 });
    }

    // Vérifier si déjà en favori
    const existing = await prisma.favorite.findUnique({
      where: {
        userId_targetId: {
          userId: session.user.id,
          targetId,
        },
      },
    });

    if (existing) {
      // Retirer des favoris
      await prisma.favorite.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({ success: true, action: "removed" });
    } else {
      // Ajouter aux favoris
      await prisma.favorite.create({
        data: {
          userId: session.user.id,
          targetId,
        },
      });
      return NextResponse.json({ success: true, action: "added" });
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
