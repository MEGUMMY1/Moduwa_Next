"use client";
import React, { useState } from "react";
import styles from "./joinModal.module.css";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();

    const onClickClose = () => {
        router.back();
    };

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContainer}>
                <button className={styles.closeButton} onClick={onClickClose}>
                    X
                </button>
            </div>
        </div>
    );
};

export default Page;