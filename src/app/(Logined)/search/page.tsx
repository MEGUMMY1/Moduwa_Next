//app/search/page

import React from "react";
import styles from "./_components/page.module.css";
import prisma from "@/app/lib/prisma";
import Main from "./_components/main"
// import { useSession } from "next-auth/react";

async function getChatRoom() {
  // const { data: session } = useSession();
  // const userId = session?.user.id;

  // console.log(userId)

  const userChatRooms = await prisma.chatRoom.findMany({
    where: {
      participants: {
        // some: { kakaoId: userId },
      },
    },
    select: { id: true },
  });

  const userChatRoomIds = userChatRooms.map((chatRoom) => chatRoom.id);

  const chatRooms = await prisma.chatRoom.findMany({
    where: { isPrivate: false },
    include: { }
  })

  return chatRooms;
}

export default async function Page() {
  const chatRooms = await getChatRoom();

  return (
    <div className={styles.Container}>
      <Main chatRoom={chatRooms}/>
    </div>
  );
};
