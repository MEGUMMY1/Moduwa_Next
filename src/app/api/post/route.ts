// app/api/post/route.ts
import prisma from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

async function getPostdata(
  sortOption: string,
  cursor: number,
  take: number = 6
) {
  // getPostdata 함수 내 orderBy 수정
  let orderBy;
  switch (sortOption) {
    case "최신순":
      orderBy = { createdAt: "desc" } as Prisma.PostOrderByWithRelationInput;
      break;
    case "날짜순":
      orderBy = { eventDate: "asc" } as Prisma.PostOrderByWithRelationInput;
      break;
    case "마감순":
      orderBy = { deadline: "asc" } as Prisma.PostOrderByWithRelationInput;
      break;
    default:
      orderBy = { createdAt: "asc" } as Prisma.PostOrderByWithRelationInput;
  }

  // 나머지 코드는 그대로 유지

  let cursorOptions = {};
  //이전에는 cursor에 타입지정을 했었는데,, 사실 아직 잘 모르겠다..
  if (!isNaN(cursor)) {
    cursorOptions = {
      cursor: { id: cursor },
      skip: 1, // Skip the cursor item itself
    };
  }
  console.log(orderBy);
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      take: take,
      orderBy: orderBy,
      ...cursorOptions,
      include: {
        store: {
          select: {
            name: true,
            location: true,
            imageUrl: true,
          },
        },
        menuItems: {
          include: {
            menu: {
              select: {
                name: true,
                imageUrl: true,
                price: true,
              },
            },
          },
        },
        _count: {
          select: {
            payments: true, // Count the number of payments related to each post
          },
        },
      },
    });
    return posts;
  } catch (error) {
    console.error("데이터 페칭하다가 오류났어요", error);
    return null; // Return null or an error indicator
  }
}

export async function GET(req: NextRequest) {
  // ************** 'await'를 씀으로써 데이터가 잘 불러와졌다.. ************ //
  const searchParams = req.nextUrl.searchParams;
  const cursorParam = searchParams.get("cursor");
  const takeParam = searchParams.get("take");
  const sortOption = searchParams.get("sort") || "최신순"; // 정렬 옵션을 URL 쿼리에서 가져옴
  // Providing a default value if the parameter is null
  const cursor = cursorParam ? parseInt(cursorParam) : 0;
  const take = takeParam ? parseInt(takeParam) : 6;
  //   const query = searchParams.get("query");
  try {
    const postContent = await getPostdata(sortOption, cursor, take);

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
