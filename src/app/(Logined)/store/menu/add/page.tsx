// app\(Logined)\store\menu\add\page.tsx

"use client";
import { useSession } from "next-auth/react";
import React from "react";
import styles from "./_components/add.module.css";
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
        <div className={styles.add_container}>
            <div className={styles.add_header}>
                <button onClick={() => router.back()} className={styles.back_button}>
                    <IoArrowBackOutline size={"40px"} color={"grey"} />
                </button>
                <p>메뉴 추가</p>
            </div>
            <div className={styles.add_body}>
                <p className={styles.add_p}>메뉴 정보를 입력해주세요.</p>
                <div className={styles.add_input_div}>
                    <input type="text" placeholder="메뉴명" className={styles.add_input} />
                    <input type="number" placeholder="가격" className={styles.add_input} />
                </div>
                <div className={styles.add_btn_div}>
                    <button type="button" className={styles.add_btn_a}>추가하기</button>
                    <button onClick={handleBack} type="button" className={styles.add_btn_b}>닫기</button>
                </div>
                
            </div>
        </div>
    );
};

export default Page;