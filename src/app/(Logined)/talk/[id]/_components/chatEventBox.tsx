// app\(Logined)\talk\[id]\_components\chatEventBox.tsx
"use client";
import React from "react";
import styles from "./chat.module.css";
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";
import Image from "next/image";

interface ChatRoom {
  id: number;
  name: string | null;
  hashtags: string[];
  info: string | null;
  password: string | null;
  isPrivate: boolean;
  capacity: number;
  genderRestriction: string | null;
  minAge: number;
  maxAge: number;
  participants: User[];
  messages: Message[]; 
}

interface User {
  id: number;
  kakaoId: string | null;
  createdAt: string;
  updatedAt: string;
  profileImage: string | null;
  name: string | null;
  ageRange: string | null;
  gender: string | null;
  role: string;
  messages: Message[]; 
  chatRooms: ChatRoom[];
}

interface Message {
  id: number;
  createdAt: string;
  content: string | null;
  senderId: number;
  chatRoomId: number;
  chatRoom: ChatRoom;
  sender: User;
}

const ChatComponent: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <>
      <div className={styles.sender_div}>
        <p className={styles.chat_sender}>{message.sender.name}</p>
        <Image
          src={"/image/세츠나2.png"}
          width={40} // width 속성 설정
          height={40} // height 속성 설정
          alt="Sender Image"
          className={styles.sender_img}
          layout="fixed" // 고정된 레이아웃을 사용
        />
      </div>
      <div className={styles.chat_item}>
        <div className={styles.chat_item_a}>
          <div className={styles.chat_info_div}>
            <p>{message.content}</p>
          </div>
        </div>
        <div className={styles.chat_item_b}>
          
        </div>
      </div>
    </>
  );
};

const EventBox: React.FC<{ chatRoom: ChatRoom }> = ({ chatRoom }) => {
    const router = useRouter();
    
    return (
      <>
        <div className={styles.chat_container}>
          <div className={styles.chat_header}>
            <button onClick={() => router.back()} className={styles.back_button}>
              <IoArrowBackOutline size={"40px"} color={"white"} />
            </button>
            <p className={styles.chat_room_name}>{chatRoom.name}</p>
            <p className={styles.chat_room_curr}>({chatRoom.capacity})</p>
          </div>
          <div className={styles.chat_body}>
          {chatRoom.messages && chatRoom.messages.length > 0 ? (
            chatRoom.messages.map((message) => (
              <ChatComponent key={message.id} message={message} />
            ))
          ) : (
            <p>No messages available</p>
          )}
          </div>
          <div className={styles.chat_send_container}></div>
        </div>
      </>
    );
  };
  
  export default EventBox;