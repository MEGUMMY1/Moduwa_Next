//app/search/createTab/page

"use client";
import React, { useState } from "react";
import styles from "./_components/page.module.css";

const CreateTab = () => {
    const handleSubmit = () => {
        
    }

    return (
        <div className={styles.Container}>
            <div className={styles.TopBar}>
                <p>채팅방 만들기</p>

                <div className={styles.registerButton}>
                    완료
                </div>
            </div>
            
            <div className={styles.contentContainer}>
                <div className={styles.image}>
                    이미지
                </div>

                <div className={styles.nameInputBox}>
                    이름 입력
                </div>

                <div className={styles.introInputBox}>
                    채팅방 소개 입력
                </div>

                <div className={styles.hashtagInputBox}>
                    채팅방 해시태그
                </div>

                <div className={styles.privateBlock}>
                    공개, 비공개 여부
                </div>

                <div className={styles.capacityBlock}>
                    최대 수용 인원 설정
                </div>

                <div className={styles.requirementBlock}>
                    조건 설정(성별, 나이)
                </div>
            </div>
        </div>
    );
};

export default CreateTab;