import React from "react";
import chatRoomsData from "../../../../public/chatRooms.json";  
import styles from "./_components/talk.module.css";
import Link from 'next/link';

interface Room {
  id: number;
  image: string;
  name: string;
  info: string;
  current: number;
  capacity: number;
}

export default async function Page() {
  return (
    <>
      <div className={styles.talklist_container}>
        <div className={styles.talkroom_div}>
          {chatRoomsData.map((room: Room) => (
            <Link href={`/talk/${room.id}`} key={room.id}>
              <div className={styles.talkroom}>
                <img src={room.image} className={styles.talkroom_img} width="60px" height="60px" alt={room.name}></img>
                <div className={styles.talkroom_data_a}>
                  <div className={styles.talkroom_data_b}>
                    <p className={styles.roomname}>{room.name}</p>
                    <p className={styles.roomcapa}>{room.current}/{room.capacity}</p>
                  </div>
                  <p className={styles.roominfo}>{room.info}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
