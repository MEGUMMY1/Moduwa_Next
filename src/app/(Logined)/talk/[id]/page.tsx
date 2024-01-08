// app\(Logined)\talk\[id]\page.tsx

import React from 'react';
import EventBox from './_components/chatEventBox';
import prisma from '@/app/lib/prisma';

const fetchRoom = async (id: number) => {
  const params = Number(id);
  
  const chatRoom = await prisma.chatRoom.findUnique({
    where: {
      id: params
    }
  });

  return chatRoom;
}

export default async function Page({ params }: { params: { id: number } }) {
  const chatRoom = await fetchRoom(params.id);

  return(
    <>
      <EventBox chatRoom={chatRoom}/>
    </>
  )
  
}
