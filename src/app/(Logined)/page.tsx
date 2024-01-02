// 예시: src/app/(Logined)/page.tsx

import React from "react";
import EventBox from "./_components/homeEventBox";
import eventData from "../../../public/data.json";
import prisma from "../lib/prisma";

async function getPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      //relation
      store: {
        select: { name: true },
      },
    },
  });
  return posts;
}

export default async function Page() {
  const posts = await getPosts();
  console.log({ posts });
  return (
    <>
      {eventData.map((event) => (
        <EventBox key={event.eventid} event={event} />
      ))}
      <h1>메인</h1>
      {posts.map((post) => {
        return (
          <>
            <p>{post.store.name}</p>
            <p>{post.deadline.toLocaleDateString()}에 마감</p>
            <p>{post.minimumAmount}부터 확정</p>
            <p>{post.takeawayMaxPeople}명 포장가능</p>
            <p>{post.takeawayTime} : 포장식사 시간</p>
            <p>{post.diningMaxPeople}명 매장가능</p>
            <p>{post.diningTime}: 매장식사시간</p>
            <p>{post.eventDate.toLocaleDateString()}일</p>
            <p>{post.takeawayTime}</p>
            <p>가게의 한마디 :{post.description}</p>
            <p>******</p>
          </>
        );
      })}
    </>
  );
}
