import React from "react";
import styles from "./_components/chat.module.css";


export default async function Page() {
  return (
    <>
      <div className={styles.chat_container}>
        <div className={styles.chat_header}>
        </div>
        <div className={styles.chat_body}>
        </div>
        <div className={styles.chat_send_container}>

        </div>
      </div>
    </>
  );
};

export const runtime = "edge"