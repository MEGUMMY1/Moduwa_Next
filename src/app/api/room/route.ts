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
    }catch {
        return NextResponse.json({ message: "하하"}, { status: 500 });
    }
}
