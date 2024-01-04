"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./homeEventBox.module.css";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";

interface MenuType {
  name: string;
  imageUrl: string | null;
  price: number;
}

interface MenuItemType {
  menu: MenuType;
  discountPrice: number | null; // Allow discountPrice to be null
}

interface StoreType {
  name: string;
  location: string;
  imageUrl: string | null;
}
interface PostType {
  id: number;
  store: StoreType;
  menuItems: MenuItemType[];
  description: string | null;
  eventDate: Date;
  deadline: Date;
  createdAt: Date;
  minimumAmount: number | null;
  diningAvailable: boolean;
  diningMenus: string[];
  diningTime: string | null;
  diningMaxPeople: number | null;
  seatArrangeExcuse: boolean;
  takeawayAvailable: boolean;
  takeawayMenus: string[];
  takeawayTime: string | null;
  takeawayMaxPeople: number | null;
  paymentCount: number; // Add this field to track the number of payments
}

const imageStyle = {
  margin: "5px 10px 0px 5px",
  borderRadius: "10%",
};

const EventBox: React.FC<{ post: PostType }> = ({ post }) => {
  //하단 박스 펼치기
  const [isExpanded, setIsExpanded] = useState(false);
  const [boxHeight, setBoxHeight] = useState("0px"); // initial height
  const toggleExpansion = () => {
    setBoxHeight(isExpanded ? "0px" : "340px"); // adjust height based on isExpanded
    setIsExpanded(!isExpanded);
  };
  // 타이머 상태를 위한 useState
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    // 타이머를 업데이트하는 함수
    const updateTimer = () => {
      const now = new Date();
      const deadline = new Date(post.deadline);
      const timeDiff = deadline.getTime() - now.getTime();
      if (timeDiff > 0) {
        // 남은 시간 계산
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const totalHours = days * 24 + hours; // 일을 시간으로 변환하여 더함
        const minutes = Math.floor((timeDiff / 1000 / 60) % 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);

        setTimeLeft(`${totalHours}시간 ${minutes}분 ${seconds}초`);
      } else {
        // 시간이 지났을 경우
        setTimeLeft("마감됨");
      }
    };
    // 타이머를 1초마다 업데이트
    const timer = setInterval(updateTimer, 1000);
    // 컴포넌트가 언마운트될 때 타이머 정리
    return () => clearInterval(timer);
  }, [post.deadline]); // 의존성 배열에 post.deadline 추가

  // Extract the first menu item's details
  const firstMenuItem = post.menuItems[0]?.menu;
  const firstMenuPrice = post.menuItems[0]?.discountPrice;
  const isDiningAvailable = post.diningAvailable;
  const isTakeawayAvailable = post.takeawayAvailable;
  //할인율
  const discountRate =
    firstMenuItem?.price && firstMenuPrice
      ? (
          ((firstMenuItem.price - firstMenuPrice) / firstMenuItem.price) *
          100
        ).toFixed(0)
      : 0;

  return (
    <article className={styles.eventContainer} onClick={toggleExpansion}>
      <header className={styles.upperEvent}>
        <figure>
          <Image
            style={imageStyle}
            src={post.store.imageUrl || "/image/세츠나2.png"}
            width={84}
            height={84}
            alt={post.store.name}
          />
        </figure>
        <div className={styles.upperColumn}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              padding: "0 4px",
              borderBottom: "1px solid rgba(150, 150, 150, 0.1)",
            }}
          >
            <h5 className={styles.storeName}>{post.store.name}</h5>
            <address>{post.store.location}m</address>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              // width: "80%",
            }}
          >
            <span className={`${styles.timeBox} ${styles.dateBox}`}>
              {post.eventDate.toLocaleDateString()}{" "}
              {post.eventDate.toLocaleDateString("ko-KR", {
                weekday: "short",
              })}
            </span>
            <div className={styles.timeContainer}>
              <div className={styles.timeBox}>
                <time
                  className={
                    isDiningAvailable
                      ? styles.timeElement
                      : styles.timeElementUnavailable
                  }
                >
                  매장 {post.diningTime}
                </time>
              </div>
              <div className={styles.timeBox}>
                <time
                  className={
                    isTakeawayAvailable
                      ? styles.timeElement
                      : styles.timeElementUnavailable
                  }
                >
                  포장 {post.takeawayTime}
                </time>
              </div>
            </div>

            <time className={`${styles.timeElement} ${styles.deadlineTime}`}>
              {/* 구매 마감 : {post.deadline.toLocaleDateString()}
              {post.deadline.toLocaleTimeString()}*/}
              {timeLeft}
            </time>
          </div>
        </div>
      </header>
      <div className={styles.participateBox}>
        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBar}
            style={{
              width: `${(3 / (post.minimumAmount || 1)) * 100}%`,
            }}
          ></div>
        </div>
        <p className={styles.progressText}>
          {(post.minimumAmount || 1) - post.paymentCount}개의 주문이 추가되면
          확정됩니다.
        </p>
      </div>

      <section className={styles.downBox}>
        <p className={styles.menuItem}>
          <span className={styles.menuName}>{firstMenuItem?.name}</span>
          {post.menuItems.length > 1 && (
            <span className={styles.additionalItems}>
              외 {post.menuItems.length - 1}종
            </span>
          )}{" "}
          -
          <span className={styles.originalPrice}>
            <s>{firstMenuItem?.price}</s>
          </span>
          <span className={styles.discountPrice}>{firstMenuPrice}원</span>
          <span className={styles.discountRate}>✔ {discountRate}%</span>
        </p>
      </section>
      <footer
        className={styles.animebox}
        style={{ height: boxHeight }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.descriptionBox}>
          <p className={styles.description}>"{post.description}"</p>
        </div>
        <div className={styles.menuBox}>
          <ul className={styles.menuList}>
            {post.menuItems.map((menuItem, index) => (
              <li key={index} className={styles.menuItem}>
                <span className={styles.menuName}>{menuItem.menu.name}</span> -
                <div>
                  <span className={styles.originalPrice}>
                    <s>{menuItem.menu.price}</s>
                  </span>
                  <span className={styles.discountPrice}>
                    {menuItem.discountPrice ? menuItem.discountPrice : "N/A"}원
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.details}>
          <div className={styles.orderTypeContainer}>
            <div className={styles.orderTypeBox}>
              <span className={styles.orderTypeIcon}>🍽️</span>{" "}
              {/* 매장 아이콘 */}
              <div className={styles.orderTypeInfo}>
                <p>매장</p>
                <div className={styles.orderTypeProgressContainer}>
                  <div
                    className={styles.orderTypeProgressBar}
                    style={{
                      width: `${(1 / (post.diningMaxPeople || 1)) * 100}%`,
                    }}
                  ></div>
                </div>
                <p>1 / {post.diningMaxPeople}</p>
              </div>
            </div>
            <div className={styles.orderTypeBox}>
              <span className={styles.orderTypeIcon}>🛍️</span>
              {/* 포장 아이콘 */}
              <div className={styles.orderTypeInfo}>
                <p>포장</p>
                <div className={styles.orderTypeProgressContainer}>
                  <div
                    className={styles.orderTypeProgressBar}
                    style={{
                      width: `${(1 / (post.takeawayMaxPeople || 1)) * 100}%`,
                    }}
                  ></div>
                </div>
                <p>1 / {post.takeawayMaxPeople}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actionButtons}>
          <a href={`/home/${post.id}`} className={styles.payButton}>
            결제
          </a>
          <button
            className={styles.mapButton}
            onClick={() => {
              /* Open map logic */
            }}
          >
            <FaLocationDot /> 지도 보기
          </button>
        </div>
      </footer>
    </article>
  );
};
export default EventBox;
