"use client";
import React, { useState } from "react";
import styles from "./joinModal.module.css";
import { useRouter } from "next/navigation";
import prisma from "@/app/lib/prisma";
import { useSession } from "next-auth/react";

interface JoinModalProps {
    id: number;
}

const JoinModal: React.FC<JoinModalProps> = ({ id }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const userId = session?.user.id;

    const onClickClose = () => {
        router.back();
    };

    const joinChatRoom = async () => {
        // router.replace(`/talk/${id}`);
        // ++추가해야할 것: 채팅방 이동 후, 신규 유저임을 나타내야함.

        // user 데이터를 채팅방 데이터의 참가자 부분에 추가.
        try {
            const body = { id, userId }
            await fetch(`/api/chatRoom`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
      
            router.push(`/talk/${id}`)
        } catch (error) {
            console.error(error)
        }
    }

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

                <div className={styles.joinButton} onClick={joinChatRoom}>
                    {session ? (
                        <span>참가 하기</span>
                    )
                    : (
                        <span>로그인 해주세요.</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JoinModal;