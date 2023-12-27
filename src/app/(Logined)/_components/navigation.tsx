// (Logined)/_components/Navigation.tsx
'use client' 
import React, { useState } from "react";
import styles from "./Navigation.module.css";
import { HiOutlineViewList, HiOutlineChatAlt } from "react-icons/hi";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { useRouter } from 'next/navigation'

const Navigation = () => {
  const router = useRouter();
  // 각 아이콘의 클릭 상태를 저장하는 상태
  const [activeIcon, setActiveIcon] = useState('');

  return (
    <nav className={styles.navigationContainer}>
      <ul>
      <li onClick={() => { router.push('/'); setActiveIcon('home'); }}>
          <div className={styles.linkItem}>
          <HiOutlineViewList size={35} color={activeIcon === 'home' ? 'black' : 'gray'} />
            <p className={styles.linkText}>모두와</p>
          </div>
        </li>
        <li onClick={() => { router.push('/search'); setActiveIcon('search'); }}>
          <div className={styles.linkItem}>
          <RiCompassDiscoverLine size={35} color={activeIcon === 'search' ? 'black' : 'gray'} />
            <p className={styles.linkText}>모두톡</p>
          </div>
        </li>
        <li onClick={() => { router.push('/talk'); setActiveIcon('talk'); }}>
          <div className={styles.linkItem}>
          <HiOutlineChatAlt size={35} color={activeIcon === 'talk' ? 'black' : 'gray'} />
            <p className={styles.linkText}>채팅</p>
          </div>
        </li>
        <li onClick={() => { router.push('/profile'); setActiveIcon('profile'); }}>
          <div className={styles.linkItem}>
          <CgProfile size={35} color={activeIcon === 'profile' ? 'black' : 'gray'} />
            <p className={styles.linkText}>프로필</p>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
