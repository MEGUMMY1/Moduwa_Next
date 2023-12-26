import React from "react";
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
  return (
    <div className={styles.eventContainer}>
      <div className={styles.upperEvent}>
        <Image
          style={imageStyle}
          src="/image/세츠나2.png"
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
    </div>
  );
};

export default EventBox;
