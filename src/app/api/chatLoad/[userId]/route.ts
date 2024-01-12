// app/api/chatLoad/[userId]/route.ts

import prisma from "@/app/lib/prisma";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

async function getUserChatRoomData(userId: string) {
  try {
    console.log(userId);

    const userChatRooms = await prisma.chatRoom.findMany({
        where: {
          participants: {
            some: { kakaoId: userId },
          },
        },
        select: { id: true },
      });
    
    const userChatRoomIds = userChatRooms.map((chatRoom) => chatRoom.id);
    console.log(userChatRoomIds)

    return userChatRoomIds;
  } catch (error) {
    console.error("getUserChatRoomData() Error fetching chatRoom data:", error);
    return null; // Return null or an error indicator
  }
}

export async function GET( req: NextRequest, { params }: { params: { userId: string } } ) {
  try {
    const userChatRoomId = await getUserChatRoomData(params.userId);
    console.log(userChatRoomId);

    const chatRooms = await prisma.chatRoom.findMany({
        where: {
          isPrivate: false,
          ...(userChatRoomId && userChatRoomId.length > 0 && {
            NOT: {
              id: { in: userChatRoomId },
            },
          }),
        },
        include: {

        },
      });

    return NextResponse.json(chatRooms);
  } catch (error) {
    console.error("getUserChatRoomData() Error fetching chatRoom data:", error);
    
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}