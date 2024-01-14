// app\(Logined)\talk\[id]\_components\chatEventBox.tsx
"use client";
import React from "react";
import styles from "./chat.module.css";
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";
import Image from "next/image";
import { ChatRoom, User, Message } from '../../_components/TYPE_talk';

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

    // 현재 채팅방의 메시지만 필터링
    const filteredMessages = chatRoom.messages?.filter(
      (message) => message.chatRoomId === chatRoom.id
    ) ?? [];

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
            {filteredMessages && filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
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