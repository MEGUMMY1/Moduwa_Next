"use client";
import React, { useState } from "react";
import styles from "./joinModal.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Page = () => {
    const router = useRouter();

    const onClickClose = () => {
        router.back();
    };

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContainer}>
                <>
                    <button className={styles.closeButton} onClick={onClickClose}>
                        X
                    </button>
                </>

                <div className={styles.commentBox}>
                    <p>여기에 room.comment가 들어올 겁니다.</p>
                </div>

                <div className={styles.joinButton}>
                    참가 하기
                </div>
            </div>
        </div>
    );
};

export default Page;