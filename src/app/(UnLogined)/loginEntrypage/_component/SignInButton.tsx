//app/components/SignInButton.tsx

"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import styles from "./SignInButtonStyle.module.css"; // CSS 모듈 임포트

function SignInButton() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className={styles.LoginBox}>
        <h1 className={styles.profile_name}>{session.user.name}</h1>
        <button
          className={`${styles.signInButton} ${styles.logOutButton}`}
          onClick={() => signOut()}
        >
          로그아웃
        </button>
      </div>
    );
  }

  return (
    <div className={styles.LoginBox}>
      <button
        className={`${styles.signInButton} ${styles.logInButton}`}
        onClick={() => signIn()}
      >
        로그인하기
      </button>
    </div>
  );
}

export default SignInButton;
