// app\(Logined)\talk\page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ChatRoom, User, Message } from './_components/TYPE_talk';
import styles from './_components/talk.module.css';
import EventBox from "./_components/talkEventBox";

export default function Page() {
  const { data: session } = useSession();
  const userId = String(session?.user.id);

  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      setLoading(true); 
      fetch(`/api/talk/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setChatRooms(data); 
          setLoading(false); 
        })
        .catch((error) => {
          console.error("Error fetching chat rooms:", error);
          setLoading(false); 
        });
    }
  }, [userId]);

  if (loading) {
    return <div className={styles.talk_message}>
              <p>Loading...</p>
           </div>;
  }

  return (
    <div>
      <EventBox chatRooms={chatRooms}/>
    </div>
  );
};
