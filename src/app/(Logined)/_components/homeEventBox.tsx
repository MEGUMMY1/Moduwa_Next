"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./homeEventBox.module.css";
import Link from "next/link";

interface Menu {
  name: string;
  originPrice: number;
  salePrice: number;
}

interface Event {
  eventid: number;
  image: string;
  name: string;
  location: number;
  eventDate: string;
  eventStartTime: string;
  eventEndTime: string;
  joinDeadlineTime: string;
  menu: Menu[];
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
  // 체크박스 상태 관리
  const [storeChecked, setStoreChecked] = useState(false);
  const [packageChecked, setPackageChecked] = useState(false);

  // 체크박스 상태 변경 핸들러
  const handleStoreCheckboxChange = () => {
    setStoreChecked(true);
    setPackageChecked(false);
  };

  const handlePackageCheckboxChange = () => {
    setStoreChecked(false);
    setPackageChecked(true);
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
        <p>
          {event.menu[0].name}{" "}
          {event.menu.length > 1 && ` 외 ${event.menu.length - 1}종`}-{" "}
          <s>{event.menu[0].originPrice}</s>
          {event.menu[0].salePrice}&#8361;
        </p>
        <p>{event.pickType.join(", ")}</p>
      </div>
      <div
        className={styles.animebox}
        style={{ height: boxHeight }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.foodChoice}>
          <Link href={`/home/${event.eventid}`}>{event.eventid}결제</Link>
          <p>메뉴 담기</p>
          <div className={styles.foodmount}>
            <div>돈까스 김밥 외 3개</div>
            <p>16800&#8361;</p>
          </div>
        </div>
        <div className={styles.optionalbox}>
          <p>매장</p>
          <div>15:00 ~ 18:00</div>
          <div>
            <input
              type="checkbox"
              className={styles.checkboxLarge}
              checked={storeChecked}
              onChange={handleStoreCheckboxChange}
            />
            선택
          </div>
        </div>
        <div className={styles.optionalbox}>
          <p>포장</p>
          <div className={styles.timeoptionbox}>15:00 / 17:00</div>
          <div>
            <input
              type="checkbox"
              className={styles.checkboxLarge}
              checked={packageChecked}
              onChange={handlePackageCheckboxChange}
            />
            선택
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventBox;
