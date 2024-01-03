// 예시: src/app/(Logined)/page.tsx

import React from "react";
import EventBox from "./_components/homeEventBox";
import eventData from "../../../public/data.json";
import prisma from "../lib/prisma";

async function getPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
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
  const posts = await getPosts();
  //console.log({ posts });
  return (
    <>
      <h1>메인</h1>
      {posts.map((post) => (
        <EventBox key={post.id} post={post} />
      ))}
    </>
  );
}
