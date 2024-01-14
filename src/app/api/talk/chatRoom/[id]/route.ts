// app\api\talk\chatRoom\[id]\route.ts
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

async function fetchRoom(id: number) {
  try {
    const params = Number(id);

    const chatRoom = await prisma.chatRoom.findUnique({
      where: {
        id: params
      },
      include: {
        messages: {
          include: {
            sender: {
              select: {
                name: true
              }
            }
          },
          orderBy: { createdAt: 'asc' }
        },
        participants: true
      }
    });

    return chatRoom;
  } catch (error) {
    console.error("fetchRoom() Error:", error);
    return null;
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: number } }) {
  try {
    const Roomdata = await fetchRoom(params.id);

    return NextResponse.json(Roomdata);
  } catch (error) {
    console.error("GET() Error fetching chatRoom data:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}