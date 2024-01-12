// app\(Logined)\talk\_components\talkEventBox.tsx
"use client";
import React from "react";
import Link from 'next/link';
import styles from './talk.module.css'
import { ChatRoom, User, Message } from './TYPE_talk';
import Image from "next/image";

interface EventBoxProps {
  chatRooms: ChatRoom[];
}

const EventBox: React.FC<EventBoxProps> = ({ chatRooms }) => {
  return (
    <>
    <div className={styles.talklist_container}>
      <div className={styles.talkroom_div}>
        {chatRooms.length === 0 ? (
          <div className={styles.talk_message}>
            <p>No chat rooms available.</p>
          </div>
          ) : (
          chatRooms.map((room) => (
            <Link href={`/talk/${room.id}`} key={room.id}>
              <div className={styles.talkroom}>
                <Image
                    src={"/image/세츠나2.png"}
                    width={60} 
                    height={60}
                    alt="room"
                    className={styles.talkroom_img}
                  />
                <div className={styles.talkroom_data_a}>
                  <div className={styles.talkroom_data_b}>
                    <p className={styles.roomname}>{room.name}</p>
                    <p className={styles.roomcapa}>
                      {room.participants?.length || 0} / {room.capacity}
                    </p>
                    </div>
                  <p className={styles.roominfo}>{room.info}</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>      
    </>
  );
};

export default EventBox;