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

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const isNSFW = formData.get("isNSFW") === "true";
    const caption = formData.get("caption") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Ici on simulerait un upload vers Cloudinary ou AWS S3
    // Pour cet exemple, on va utiliser une URL placeholder mais enregistrer la logique
    // En production, il faudrait traiter le 'file' (Buffer) et l'envoyer au storage
    
    const mediaUrl = `https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=500&auto=format&fit=crop`;

    const media = await prisma.media.create({
      data: {
        url: mediaUrl,
        type: file.type.startsWith("video") ? "video" : "image",
        caption,
        isNSFW,
        userId: session.user.id,
      },
    });

    return NextResponse.json(media);
  } catch (error) {
    console.error("Error uploading media:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    const media = await prisma.media.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(media);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
