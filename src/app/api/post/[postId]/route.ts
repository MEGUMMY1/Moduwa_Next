// const postId2 = req.nextUrl.pathname.split("/").pop();
// app/api/post/[postId]/route.ts
import prisma from "@/app/lib/prisma";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

async function getPostdata(postid: number) {
  try {
    const postData = await prisma.post.findUnique({
      where: { id: postid },
    });
    return postData;
  } catch (error) {
    console.error("데이터 페칭하다가 오류났어요", error);
    return null; // Return null or an error indicator
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const postId = parseInt(params.postId, 10); // Convert string to number
  if (isNaN(postId)) {
    return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
  }
  // ************** 'await'를 씀으로써 데이터가 잘 불러와졌다.. ************ //
  try {
    const postContent = await getPostdata(postId);

    if (postContent === null) {
      return NextResponse.json(
        { error: "Error fetching post data" },
        { status: 500 }
      );
    }

    // 객체의 속성들을 응답에 포함합니다.
    return NextResponse.json(postContent);
  } catch (error) {
    console.error("Error fetching post data:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}
