//app/search/page

"use client";
import React, { ChangeEventHandler, useState } from "react";
import Link from 'next/link'
import ThumNail from "./_components/thumbnail";
import styles from "./_components/page.module.css";
import chatRoomData from '../../../../public/searchdata.json';

import { FiSearch } from 'react-icons/fi';
import { BiCommentAdd } from "react-icons/bi";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleSearch = () => {
    // 여기에 검색 로직 구현
    console.log(searchTerm); // 예시: 콘솔에 검색어 출력
  };

  const filteredChatRooms = chatRoomData.filter(room => {
    // 검색어가 없을 경우 모든 데이터 반환
    if (!searchTerm) return true;

    // 검색어를 포함하는지 확인
    // 예시: 채팅방 이름에서 검색어 포함 여부 확인
    return room.chatRoomName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className={styles.Container}>
      <div className={styles.TopBar}>
        <div className={styles.SearchBar}>
          <input type="text" value={searchTerm} onChange={handleSearchTermChange} placeholder="검색 입력..." />
          
          <span onClick={handleSearch}>
            <FiSearch className={styles.SearchButton}/>
          </span>
        </div>

        <Link href="/search/createTab">
          <BiCommentAdd className={styles.addChatButton}/>
        </Link>
      </div>

      <div className={styles.ThumbNailArea}>
        {filteredChatRooms.map((room) => (
          <ThumNail key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Page;
