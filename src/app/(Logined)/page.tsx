// 예시: src/app/(Logined)/page.tsx

import React from "react";
import EventBox from "./_components/homeEventBox";
import prisma from "../lib/prisma";

//페이지네이션을 통한 자원 최적화
async function getPosts(page = 1, pageSize = 6) {
  const posts = await prisma.post.findMany({
    where: { published: true },
    skip: (page - 1) * pageSize, // 건너뛸 포스트 수
    take: pageSize, // 가져올 포스트 수
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
  // 매핑하여 paymentCount 추가
  return posts.map((post) => ({
    ...post,
    paymentCount: post._count.payments,
  }));
}

export default async function Page() {
  const posts = await getPosts(1, 6);
  //console.log({ posts });
  return (
    <>
      {posts.map((post) => (
        <EventBox key={post.id} post={post} />
      ))}
    </>
  );
}
