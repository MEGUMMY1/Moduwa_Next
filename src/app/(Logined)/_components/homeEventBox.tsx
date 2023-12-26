"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./homeEventBox.module.css";

interface Event {
  image: string;
  name: string;
  location: number;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  joinDeadlineTime: string;
  menu: string[];
  originPrice: number;
  salePrice: number;
  minimumJoin: number;
  nowJoin: number;
  maximumJoin: number;
  pickType: string[];
}

interface EventBoxProps {
  event: Event;
}
const imageStyle = {
  margin: "0 10px",
};

const EventBox: React.FC<EventBoxProps> = ({ event }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [boxHeight, setBoxHeight] = useState("0px"); // initial height
  const toggleExpansion = () => {
    setBoxHeight(isExpanded ? "0px" : "200px"); // adjust height based on isExpanded
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.eventContainer} onClick={toggleExpansion}>
      <div className={styles.upperEvent}>
        <Image
          style={imageStyle}
          src={"/image/세츠나2.png"}
          width={84}
          height={84}
          alt={event.name}
        />
        <div className={styles.upperColumnBox}>
          <div className={styles.storeInfo}>
            <p>{event.name}</p>
            <p>{event.location}m</p>
          </div>
          <div className={styles.eventInfo}>
            <p>{event.eventDate}</p>
            <p>{event.eventStartTime}&ndash;</p>
            <p>{event.eventEndTime}</p>
          </div>
          <div className={styles.condition}>
            <p>마감{event.joinDeadlineTime}</p>
          </div>
          {/* 아니메 바 */}
          <div className={styles.eventProgressBar}>
            <div className={styles.progressBarStart}>0</div>
            <div
              className={styles.currentProgress}
              style={{ width: `${(event.nowJoin / event.maximumJoin) * 100}%` }}
            >
              <span className={styles.nowJoinText}>{event.nowJoin}▼</span>
            </div>
            <div
              className={styles.minimumJoinMarker}
              style={{
                left: `${(event.minimumJoin / event.maximumJoin) * 100}%`,
              }}
            ></div>
            <div className={styles.progressBarEnd}>{event.maximumJoin}</div>
          </div>
          <span className={styles.minimumText}>
            {event.minimumJoin}개부터 진행
          </span>
        </div>
      </div>
      <div className={styles.downBox}>
        <p>{event.menu} 외 2종</p>
        <s>{event.originPrice}</s>
        <p>{event.salePrice}&#8361;</p>
        <p>{event.pickType}</p>
      </div>
      <div className={styles.animebox} style={{ height: boxHeight }}>
        <div className={styles.foodChoice}>메뉴선택</div>
        <div className={styles.optionalbox}>
          <p>매장</p>
          <div>시간/옵션</div>
          <div>수량</div>
        </div>
        <div className={styles.optionalbox}>
          <p>포장</p>
          <div className={styles.timeoptionbox}>시간/옵션</div>
          <div>수량</div>
        </div>
        <div className={styles.paybox}>
          <p>결제하기</p>
        </div>
      </div>
    </div>
  );
};

export default EventBox;
