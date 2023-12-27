//app/(UnLogined)/loginEntrypage/loginPage/page.tsx

"use client";
import React, { useRef, useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import styles from "../_component/loginPageStyle.module.css";

function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async () => {
    // console.log(emailRef.current);
    // console.log(passwordRef.current);
    const result = await signIn("credentials", {
      username: emailRef.current,
      password: passwordRef.current,
      redirect: true,
      callbackUrl: "/",
    });
  };

  // 추가된 부분
  const handleKakao = async () => {
    const result = await signIn("kakao", {
      redirect: true,
      callbackUrl: "/",
    });
  };
  // 추가된 부분

  return (
    <main className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Login</h1>
      <div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>

          <div className={styles.inputField}>
            <input
              ref={emailRef}
              onChange={(e: any) => {
                emailRef.current = e.target.value;
              }}
              id="email"
              name="email"
              type="email"
              required
              autoFocus={true}
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <div className={styles.inputField}>
            <input
              type="password"
              id="password"
              name="password"
              ref={passwordRef}
              onChange={(e: any) => (passwordRef.current = e.target.value)}
            />
          </div>
        </div>

        <div className={styles.loginButton}>
          <button onClick={handleSubmit}>Log In</button>
        </div>
      </div>
      <div className={styles.kakaoButton}>
        <button
          onClick={() => signIn("kakao", { redirect: true, callbackUrl: "/" })}
        >
          kakao login
        </button>
      </div>
    </main>
  );
}

export default Login;
