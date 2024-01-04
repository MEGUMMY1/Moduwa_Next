// app\(Logined)\talk\[id]\page.tsx
"use client";
import React, { useEffect, useState } from "react";
import EventBox from "./_components/chatEventBox";
import prisma from "../../../lib/prisma";

interface Props {
  params: {
    id: string;  // id는 문자열
  };
}

export default function Page({ params }: Props) {
  const [chatRoom, setChatRoom] = useState<null | ChatRoom>(null);
  const id = Number(params.id);  // 문자열을 숫자로 변환

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await prisma.chatRoom.findUnique({
          where: {
            id,
          },
          select: {
            id: true,
            name: true,
            capacity: true,
            hashtags: true,
            info: true,
            password: true,
            isPrivate: true,
            genderRestriction: true,
            minAge: true,
            maxAge: true,
            participants: {
              select: {
                id: true,
                name: true,
              },
            },
            messages: {
              select: {
                id: true,
                content: true,
                sender: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        });
        setChatRoom(data);
      } catch (error) {
        console.error("Error fetching chatRoom:", error);
      }
    }

    if (id) {
      fetchData();
    }
  }, [id]);  // 의존성 배열에 id를 추가

  if (!chatRoom) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <EventBox chatRoom={chatRoom} />
    </>
  );
}
