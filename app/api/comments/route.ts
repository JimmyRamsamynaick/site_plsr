import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const { content, profileId, parentId } = body;

    if (!content || !profileId) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        authorId: session.user.id,
        profileId,
        parentId: parentId || null,
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    console.error("[COMMENT_CREATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
