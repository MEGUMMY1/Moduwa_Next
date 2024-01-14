// app\api\talk\[id]\page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import EventBox from './_components/chatEventBox';
import { ChatRoom, User, Message } from '../_components/TYPE_talk';

export default function Page({ params }: { params: { id: number } }) {
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const id = params.id;
  
  useEffect(() => {
    if (id) {
      fetch(`/api/talk/chatRoom/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setChatRoom(data);
        })
        .catch((error) => {
          console.error("Error fetching ChatRoom:", error);
        });
    }
  }, [id]);

  if (!chatRoom) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <EventBox chatRoom={chatRoom} />
    </>
  );
}
