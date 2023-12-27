// (Logined)/_components/Navigation.tsx
import Link from "next/link";
import React from "react";
import styles from "./Navigation.module.css";
import { HiOutlineViewList, HiOutlineChatAlt } from "react-icons/hi";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

const Navigation = () => {
  return (
    <nav className={styles.navigationContainer}>
      <ul>
        <li>
          <Link href="/" className={styles.linkItem}>
            <HiOutlineViewList size={35} />
            <p className={styles.linkText}>모두와</p>
          </Link>
        </li>
        <li>
          <Link href="/search" className={styles.linkItem}>
            <RiCompassDiscoverLine size={35} />
            <p className={styles.linkText}>모두톡</p>
          </Link>
        </li>
        <li>
          <Link href="/talk" className={styles.linkItem}>
            <HiOutlineChatAlt size={35} />
            <p className={styles.linkText}>채팅</p>
          </Link>
        </li>
        <li>
          <Link href="/profile" className={styles.linkItem}>
            <CgProfile size={35} />
            <p className={styles.linkText}>프로필</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
