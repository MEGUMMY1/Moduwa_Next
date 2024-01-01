// (Logined)/_components/Navigation.tsx
"use client";
import React from "react";
import Link from "next/link"; // Link import
import { usePathname } from "next/navigation";
import styles from "./Navigation.module.css";
//Icon Imports
import { GoHome, GoHomeFill } from "react-icons/go";
import { IoSearchCircle, IoSearchCircleOutline } from "react-icons/io5";
import { RiChat3Fill, RiChat3Line } from "react-icons/ri";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
const Navigation = () => {
  const segment = usePathname();
  console.log("Current segment:", segment);
  // 현재 경로와 아이콘 경로를 비교하여 색상 결정
  return (
    <nav className={styles.navigationContainer}>
      <ul>
        <li>
          <Link href="/">
            <div className={styles.linkItem}>
              {segment === "/" ? (
                <>
                  <GoHomeFill size={32} />
                  <p className={styles.linkText}>모두와</p>
                </>
              ) : (
                <>
                  <GoHome size={32} />
                  <p className={styles.linkText}>모두와</p>
                </>
              )}
            </div>
          </Link>
        </li>
        <li>
          <Link href="./search">
            <div className={styles.linkItem}>
              {segment === "/search" ? (
                <>
                  <IoSearchCircle size={34} />
                  <p className={styles.linkText}>모두톡</p>
                </>
              ) : (
                <>
                  <IoSearchCircleOutline size={34} />
                  <p className={styles.linkText}>모두톡</p>
                </>
              )}
            </div>
          </Link>
        </li>

        <li>
          <Link href="/talk">
            <div className={styles.linkItem}>
              {segment === "/talk" ? (
                <>
                  <RiChat3Fill size={32} />
                  <p className={styles.linkText}>채팅</p>
                </>
              ) : (
                <>
                  <RiChat3Line size={32} />
                  <p className={styles.linkText}>채팅</p>
                </>
              )}
            </div>
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <div className={styles.linkItem}>
              {segment === "/profile" ? (
                <>
                  <FaUserCircle size={32} />
                  <p className={styles.linkText}>프로필</p>
                </>
              ) : (
                <>
                  <FaRegUserCircle size={32} />
                  <p className={styles.linkText}>프로필</p>
                </>
              )}
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
