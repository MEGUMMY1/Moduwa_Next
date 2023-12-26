"use client";
import React, { useState } from "react";
import ThumNail from "./_components/thumbnail";
import styles from "./page.module.css";
import chatRoomData from '../../../../public/searchdata.json';
import { FiSearch } from 'react-icons/fi';

const Page = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // 여기에 검색 로직 구현
    console.log(searchTerm); // 예시: 콘솔에 검색어 출력
  };

  return (
    <div className={styles.Container}>
      <div className={styles.SearchBar}>
        <input
          type="text"
          placeholder="검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.Input}
        />

        <button className={styles.SearchButton} onClick={handleSearch}>
          <FiSearch />
        </button>
      </div>

      <div className={styles.ThumbNailArea}>
        {chatRoomData.map((room) => (
          <ThumNail key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Page;
