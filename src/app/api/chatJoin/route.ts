import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        const { id, userId } = await req.json();
        console.log("id, userId: ", id, userId)
          
        const join = await prisma.chatRoom.update({
            where: {
                id: id
            },
            data: {
                participants: {
                    connect: [{ kakaoId: userId }],
                }
            }
        })

        return NextResponse.json(
            { sucess: true, message: 'Data Updated!', data: join }, { status: 200 }
        );
    }catch {
        return NextResponse.json({ message: "Update Failed"}, { status: 500 });
    }
}