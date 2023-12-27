//app/components/SignInButton.tsx

"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import styles from "./SignInButtonStyle.module.css"; // CSS 모듈 임포트

function SignInButton() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <button
        className={`${styles.signInButton} ${styles.logOutButton}`}
        onClick={() => signOut()}
      >
        {session.user.name}님 Log Out
      </button>
    );
  }

  return (
    <button
      className={`${styles.signInButton} ${styles.logInButton}`}
      onClick={() => signIn()}
    >
      LogIn
    </button>
  );
}

export default SignInButton;
