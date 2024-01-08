"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./thumbnail.module.css";
import { IoLockClosed } from "react-icons/io5";
import { IoLockOpenOutline } from "react-icons/io5";
import Link from 'next/link'

interface Room {
    id: number,
    // image: string,
    name: string | null,
    info: string | null,
    hashtags: string[],
    isPrivate: boolean,
    capacity: number,
    // current: number,
    // rules: string[],
    genderRestriction: string | null,
    // keyfood: string[],
    minAge: number,
    maxAge: number,
    // question: string,
}

interface RoomProps {
    room: Room;
}

const ThumNail: React.FC<RoomProps> = ({ room }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [boxHeight, setBoxHeight] = useState("0px");
    const [isAge, setIsAge] = useState(true);

    let userAge = 21;

    const toggleExpansion = () => {
        setBoxHeight(isExpanded ? "0px" : "250px");
        setIsExpanded(!isExpanded);
    }

    const renderGenderText = () => {
        switch (room.genderRestriction) {
            case "all":
                return <span>없음</span>;
            case "male":
                return <span className={styles.genderInfo}>남성만</span>;
            case "female":
                return <span className={styles.genderInfo}>여성만</span>;
            default:
                return;
        }
    };

    useEffect(() => {
        if ((room.minAge !== 0 && userAge < room.minAge) ||
            (room.maxAge !== 0 && userAge > room.maxAge)) {
            setIsAge(false);
        } else {
            setIsAge(true);
        }
    }, [room.minAge, room.maxAge, userAge]);

    const renderAgeRangeText = () => {
        if (room.minAge === 0 && room.maxAge === 0) {
            return <span>없음</span>;
        }else if (room.minAge !== 0 && room.maxAge === 0) {
            return <span>{room.minAge} ~</span>;
        }else if (room.minAge === 0 && room.maxAge !== 0) {
            return <span>~ {room.maxAge}</span>;
        }else {
            return <span>{room.minAge} ~ {room.maxAge}</span>;
        }
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
                                alt={"하사웨이"}
                                className={styles.ChatRoomImage}
                            />
                        </div>

                        <div className={styles.ProfileText}>
                            <div className={styles.ChatRoomName}>
                                {room.name}
                            </div>
                            <div className={styles.ChatRoomIntro}>
                                {room.name}
                            </div>
                        </div>
                    </div>

                    <div className={styles.HashTagArea}>
                        {room.hashtags}
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
                        3 / {room.capacity}
                    </div>
                </div>
            </div>

            <div className={styles.animebox} style={{ height: boxHeight }}>
                <div className={styles.rules}>
                    {/* 추후 map이 필요 없음. 한 코멘트 안에 다 적게 할 것.
                    {room.rules.map((rule) => (
                        <p key={rule}>- {rule}</p>
                    ))} */}
                </div>

                <div className={styles.requirement}>
                    <div>
                        <span>성별 제한: </span> {renderGenderText()}
                    </div>

                    <div>
                        <span>나이 제한: </span> {renderAgeRangeText()}
                    </div>

                    <div>
                        {/* {room.keyfood.map((food) => (
                            <span key={food}>{food} </span>
                        ))} */}
                    </div>
                </div>

                {(room.capacity > 3) && (!room.isPrivate) && (isAge) ? (
                    <div className={styles.joinButton}>
                        <Link href={`/search/joinQuestion/${room.id}`}>
                            참가 하기
                        </Link>
                    </div>
                ) : (
                    <div className={styles.joinButton}>
                        참가 불가
                    </div>
                )}
            </div>
        </div>
    )
}

export default ThumNail;