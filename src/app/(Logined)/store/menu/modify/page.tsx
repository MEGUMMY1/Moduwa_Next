// app\(Logined)\store\menu\modify\page.tsx

"use client";
import { useSession } from "next-auth/react";
import React from "react";
import styles from "./_components/modify.module.css";
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";

const Page: React.FC = () => {
    const router = useRouter();
    const handleBack = () => {
        router.push("/store/menu");
    };
    
    return (
        <div className={styles.modify_container}>
            <div className={styles.modify_header}>
                <button onClick={() => router.back()} className={styles.back_button}>
                    <IoArrowBackOutline size={"40px"} color={"grey"} />
                </button>
                <p>메뉴 수정</p>
            </div>
            <div className={styles.modify_body}>
                <p className={styles.modify_p}>메뉴 정보를 입력해주세요.</p>
                <div className={styles.modify_input_div}>
                    <input type="text" placeholder="메뉴명" className={styles.modify_input} />
                    <input type="number" placeholder="가격" className={styles.modify_input} />
                </div>
                <div className={styles.modify_btn_div}>
                    <button type="button" className={styles.modify_btn_a}>수정하기</button>
                    <button onClick={handleBack} type="button" className={styles.modify_btn_b}>닫기</button>
                </div>
                
            </div>
        </div>
    );
};

export default Page;