//app/search/joinTab/page

"use client";
import React, { useState } from "react";
import styles from "./_components/page.module.css";

const JoinTab = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className={styles.Container}>
            <div className={styles.nameInputBox}>
                <input
                    type="text"
                    placeholder="이름 입력"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className={styles.nameInputButton}>
                    입력
                </div>
            </div>
        </div>
    );
};

export default JoinTab;