'use client' 
import React from "react";
import styles from "./_components/chat.module.css";
import { useRouter } from 'next/navigation';
import { IoArrowBackOutline } from "react-icons/io5";
import chatData from "../../../../../public/chat.json";  
import chatRoomsData from "../../../../../public/chatRooms.json";  

interface Menu {
  name: string;
  originPrice: number;
  salePrice: number;
}

interface Chat {
  id: number;
  sender: string;
  senderImg: string;
  sendDate: string;
  sendTime: string;
  eventid: number;
  image: string;
  name: string;
  location: number;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  joinDeadlineDate: string;
  joinDeadlineTime: string;
  menu: Menu[];
  minimumJoin: number;
  nowJoin: number;
  maximumJoin: number;
  pickType: string[];
}


const ChatComponent: React.FC<{ chat: Chat }> = ({ chat }) => {
  return (
    <>
      <div className={styles.sender_div}>
        <p className={styles.chat_sender}>{chat.sender}</p>
        <img src={chat.senderImg} className={styles.sender_img}/>
      </div>
      <div className={styles.chat_item}>
        <div className={styles.chat_item_a}>
          <img src={chat.image} className={styles.chat_img}/>
          <div className={styles.chat_info_div}>
            <p className={styles.chat_name}>{chat.name}</p>
            <p className={styles.chat_info}>{chat.eventDate} | {chat.eventStartTime} ~ {chat.eventEndTime}</p>
            <p className={styles.chat_info}>{chat.menu[0].name}</p>
            <div className={styles.chat_info_price}>
              <p className={styles.chat_info_line}>{chat.menu[0].originPrice}원</p>
              <p className={styles.chat_info}> → {chat.menu[0].salePrice}원</p>
            </div>          
          </div>
        </div>
        <div className={styles.chat_item_b}>
          <button type="button" className={styles.chat_btn_a}>{chat.pickType}</button>
          <button type="button" className={styles.chat_btn_b}>참가하기</button>
        </div>
      </div>
    </>
  );
};

const Page: React.FC = () => {
  const router = useRouter();
  const firstRoom = chatRoomsData[0];

  return (
    <>
      <div className={styles.chat_container}>
        <div className={styles.chat_header}>
          <button onClick={() => router.back()} className={styles.back_button}><IoArrowBackOutline size={'40px'} color={'white'} /></button>
          <p className={styles.chat_room_name}>{firstRoom.name}</p>
          <p className={styles.chat_room_curr}>({firstRoom.current})</p>
        </div>
        <div className={styles.chat_body}>
          {chatData.map(chat => (
            <ChatComponent key={chat.id} chat={chat} />
          ))}
        </div>
        <div className={styles.chat_send_container}></div>
      </div>
    </>
  );
};

export default Page;
