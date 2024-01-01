import React from "react";
import styles from "./_components/intro.module.css";
import logo from "../../../../public/image/logo.png"
import Image from 'next/image';


export default async function Page() {
  return (
    <>
      <div className={styles.intro_container}>
        <Image src={logo} alt="Logo" className={styles.logo} />
      </div>
    </>
  );
};
