//app/search/page

"use client";
import React, { useEffect, useState } from "react";
import styles from "./_components/page.module.css";
import Main from "./_components/main"
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    fetch(`/api/chatLoad/${userId}`)
      .then((response) => response.json())
      .then((data) => setChatRooms(data));

    console.log("몇번 보이나 보자 이거");
  }, [userId]);

  if (!chatRooms) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.Container}>
      <Main chatRooms={chatRooms}/>
    </div>
  );
};
