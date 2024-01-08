//app/components/SignInBtn.tsx

"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import styles from "./SignInBtn.module.css"; // CSS 모듈 임포트

function SignInBtn() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <>
        <div className={styles.LoginBox}>
          <h1 className={styles.profile_name}>{session.user.name}</h1>
          <button
            className={`${styles.signInButton} ${styles.logOutButton}`}
            onClick={() => signOut()}
          >
            로그아웃
          </button>
        </div>
        <div className={styles.profile_box}>
          <div className={styles.profile_box_div}>
            <p className={styles.profile_box_txt}>회원등급</p>
            <p className={styles.profile_box_value}>레벨</p>
          </div>
          <div className={styles.profile_box_div}>
            <p className={styles.profile_box_txt}>이용내역</p>
            <p className={styles.profile_box_value}>1 건</p>
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
