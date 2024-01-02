// app\(Logined)\store\_components\SignInBtn.tsx

"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import styles from "./SignInBtn.module.css"; 
import Link from "next/link";

function SignInBtn() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <>
      <div className={styles.LoginBox}>
        <button
          className={`${styles.signInButton} ${styles.logOutButton}`}
          onClick={() => signOut()}
        >
          로그아웃
        </button>
      </div>
      <div className={styles.profile_box}>
        <div className={styles.profile_box_div}>
          <Link href="./store/certification">
            <p className={styles.profile_box_value}>정보 변경</p>
          </Link>
        </div>
        <div className={styles.profile_box_div}>
          <Link href="./store/menu">
            <p className={styles.profile_box_value}>메뉴 관리</p>
          </Link>
        </div>
    </div>
    </>
    );
  }

  return (
    <div className={styles.LoginBox}>
      <button
        className={`${styles.signInButton} ${styles.logInButton}`}
        onClick={() => signIn()}
      >
        로그인
      </button>
    </div>
  );
}

export default SignInBtn;
