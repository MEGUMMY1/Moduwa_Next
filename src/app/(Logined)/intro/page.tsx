// app/(Logined)/intro/page.tsx

import React from "react";
import styles from "./_components/intro.module.css";
import logo from "../../../../public/image/logo.png"
import Image from 'next/image';


export default async function Page() {
  return (
    <>
      <div className={styles.intro_container}>
        <Image src={logo} alt="Logo" className={styles.logo} />
        <p className={styles.intro_p}>당신은 어떤 분이신가요?</p>
        <div className={styles.intro_box_container}>
          <div className={styles.intro_box_a}>
            <p>모두와 구매자</p>
          </div>
          <div className={styles.intro_box_b}>
            <p>모두와 판매자</p>
          </div>
        </div>
      </div>
    </>
  );
};
