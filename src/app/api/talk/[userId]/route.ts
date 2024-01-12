// app\api\talk\[userId]\route.ts
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

async function fetchTalk(userId: string) {
  try {
    // kakaoId를 기반으로 해당하는 ChatRoom의 ID들을 가져옵니다.
    const userChatRooms = await prisma.chatRoom.findMany({
      where: {
        participants: {
          some: { kakaoId: userId },
        },
      },
      select: { id: true },
    });
  
    const userChatRoomIds = userChatRooms.map((chatRoom) => chatRoom.id);
    
    return userChatRoomIds;
  } catch (error) {
    console.error("fetchTalk() Error fetching chatRoom data:", error);
    return null;
  }
}

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const userTalklist = await fetchTalk(params.userId);

    // 해당 User가 속한 ChatRoom들을 가져옵니다.
    const chatRooms = await prisma.chatRoom.findMany({
        where: {
          ...(userTalklist && userTalklist.length > 0 && {            
            id: { in: userTalklist },            
          }),
        }
      });

    return NextResponse.json(chatRooms);
  } catch (error) {
    console.error("GET() Error fetching chatRoom data:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}