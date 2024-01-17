// app/Logined/talk/[id]_components/chatEventBox.tsx
import React, { useState } from "react";
import styles from "./chat.module.css";
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";
import Image from "next/image";
import { ChatRoom, Message } from '../../_components/TYPE_talk';
import { useSession } from "next-auth/react";

const ChatComponent: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <>
      <div className={styles.sender_div}>
        <p className={styles.chat_sender}>{message.sender.name}</p>
        <Image
          src={"/image/세츠나2.png"}
          width={40}
          height={40}
          alt="Sender Image"
          className={styles.sender_img}
          layout="fixed"
        />
      </div>
      <div className={styles.chat_item}>
        <div className={styles.chat_item_a}>
          <div className={styles.chat_info_div}>
            <p>{message.content}</p>
          </div>
        </div>
        <div className={styles.chat_item_b}></div>
      </div>
    </>
  );
};

const EventBox: React.FC<{ chatRoom: ChatRoom }> = ({ chatRoom }) => {
  const router = useRouter();
  const [newMessage, setNewMessage] = useState("");
  const { data: session } = useSession();
  const currentUserId = session?.user?.id || 0;

  const [chatRoomData, setChatRoomData] = useState<ChatRoom | null>(chatRoom);

  const fetchChatRoomData = async () => {
    try {
      const response = await fetch(`/api/talk/chatRoom/${chatRoom.id}`);
      if (!response.ok) {
        throw new Error("Error fetching chat room data");
      }
      const updatedChatRoom = await response.json();
      setChatRoomData(updatedChatRoom);
    } catch (error) {
      console.error("Error fetching chat room data:", error);
    }
  };

  const response = async (chatRoom: ChatRoom) => {
    try {
      const response = await fetch(`/api/talk/chatRoom/${chatRoom.id}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newMessage,
          senderId: currentUserId,
          chatRoomId: chatRoom.id,
        }),
      });
  
      if (response.ok) {
        await fetchChatRoomData();
        setNewMessage("");
      } else {
        const errorText = await response.text();
        console.error("Error sending message:", errorText);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  

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
        <div className={styles.chat_send_container}>
          <input
            className={styles.chat_input}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="button" onClick={() => response(chatRoom)} className={styles.chat_btn} >전송</button>
        </div>
      </div>
    </>
  );
};

export default EventBox;

