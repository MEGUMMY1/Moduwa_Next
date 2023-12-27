import React from "react";
import chatRoomsData from "../../../../public/chatRooms.json";  
import styles from "./_components/talk.module.css";
import Link from 'next/link';

export default async function Page() {
  return (
    <>
    <div className={styles.talklist_container}>
      <div className={styles.talkroom_div}>
        {chatRoomsData.map((room) => (
          <Link href={`/talk/${room.id}`}>
            <div key={room.id} className={styles.talkroom}>
              <img src={room.image} className={styles.talkroom_img} width="60px" height="60px"></img>
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
