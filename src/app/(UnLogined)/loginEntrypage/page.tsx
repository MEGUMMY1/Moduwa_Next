//app/page.tsx


import SignInButton from "../../(Logined)/profile/_components/SignInButton";

import styles from "./_component/SignupStyle.module.css"; // CSS 모듈 임포트

export default function UnloginedHome() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>NextAuth Tutorial</h1>
      <SignInButton />
    </main>
  );
}
