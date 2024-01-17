// api/talk/chatRoom/[id]/messages/route.ts
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { content, senderId, chatRoomId } = await req.json();

  await prisma.message.create({
    data: {
      content,
      sender: { connect: { kakaoId: senderId } },
      chatRoom: { connect: { id: chatRoomId } },
    },
  });
  return NextResponse.json({ message: "Created" }, { status: 200 });
}