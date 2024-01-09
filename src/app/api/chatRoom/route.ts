import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, password, info, hashtags, isPrivate, minAge, maxAge, capacity } = await req.json();
          
        const room = await prisma.chatRoom.create({
            data: {
                name: name,
                password: password,
                info: info,
                hashtags: hashtags,
                isPrivate: isPrivate,
                minAge: minAge,
                maxAge: maxAge,
                capacity: capacity,
            }
        })

        return NextResponse.json(
            { sucess: true, message: 'Data Updated!', data: room }, { status: 200 }
        );
    }catch {
        return NextResponse.json({ message: "하하"}, { status: 500 });
    }
}

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