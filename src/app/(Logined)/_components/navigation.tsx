// (Logined)/_components/Navigation.tsx
import Link from "next/link";
import React from "react";
import styles from "./Navigation.module.css";
import { HiHome, HiChatAlt2 } from "react-icons/hi";
import { PiNewspaperClippingFill } from "react-icons/pi";
import { FaCircle } from "react-icons/fa";

const Navigation = () => {
  return (
    <nav className={styles.navigationContainer}>
      <ul>
        <li>
          <Link href="/" className={styles.linkItem}>
            <HiHome size={28} />
            <p className={styles.linkText}>모두홈</p>
          </Link>
        </li>
        <li>
          <Link href="/search" className={styles.linkItem}>
            <HiChatAlt2 size={28} />
            <p className={styles.linkText}>모두뉴스</p>
          </Link>
        </li>
        <li>
          <Link href="/talk" className={styles.linkItem}>
            <HiChatAlt2 size={28} />
            <p className={styles.linkText}>모두톡</p>
          </Link>
        </li>
        <li>
          <Link href="/profile" className={styles.linkItem}>
            <FaCircle size={28} />
            <p className={styles.linkText}>프로필</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
