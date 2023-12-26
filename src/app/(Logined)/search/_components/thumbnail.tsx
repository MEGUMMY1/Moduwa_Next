"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./thumbnail.module.css";
import { IoLockClosed } from "react-icons/io5";
import { IoLockOpenOutline } from "react-icons/io5";

interface Room {
    id: number,
    chatRoomImage: string,
    chatRoomName: string,
    chatRoomIntro: string,
    tags: string[],
    isPrivate: boolean,
    capacity: number,
    currentMembers: number
}

interface RoomProps {
    room: Room;
}

const ThumNail: React.FC<RoomProps> = ({ room }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [boxHeight, setBoxHeight] = useState("0px");

    const toggleExpansion = () => {
        setBoxHeight(isExpanded ? "0px" : "50px");
        setIsExpanded(!isExpanded);
    }

    return (
        <div className={styles.Element}>
            <div className={styles.Container} onClick={toggleExpansion}>
                {/* 좌측: 프로필, 해시태그 */}
                <div className={styles.LeftBlock}>
                    <div className={styles.ProfileArea}>
                        <div className={styles.ChatRoomImage}>
                            <Image
                                src="/하사웨이.png"
                                width={30}
                                height={30}
                                alt={room.chatRoomName}
                                className={styles.ChatRoomImage}
                            />
                        </div>

                        <div className={styles.ProfileText}>
                            <div className={styles.ChatRoomName}>
                                {room.chatRoomName}
                            </div>
                            <div className={styles.ChatRoomIntro}>
                                {room.chatRoomIntro}
                            </div>
                        </div>
                    </div>

                    <div className={styles.HashTagArea}>
                        {room.tags}
                    </div>
                </div>

                {/* 우측: 자물쇠, 카트, 인원 수. */}
                <div className={styles.RightBlock}>
                    <div className={styles.Lock}> 
                        {room.isPrivate ? (
                            <IoLockClosed className={styles.Lock}/>
                        ) : (
                            <IoLockOpenOutline className={styles.Lock}/>
                        )}
                    </div>

                    <div className={styles.Member}>
                        {room.currentMembers} / {room.capacity}
                    </div>
                </div>
            </div>

            <div className={styles.animebox} style={{ height: boxHeight }}>
                {(room.capacity <= room.currentMembers) || (room.isPrivate) ? (
                    <div className={styles.joinButton}>
                        참가 불가
                </div>
                ) : (
                    <div className={styles.joinButton}>
                        참가하기
                    </div>
                )}
            </div>
        </div>
    )
}

export default ThumNail;