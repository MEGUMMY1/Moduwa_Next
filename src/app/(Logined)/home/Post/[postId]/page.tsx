// export default function Page({ params }: { params: { postId: number } }) {}
// app/(Logined)/home/Post/[postId]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import styles from "../../_component/postid.module.css";
import { StoreType, MenuItemType } from "@/app/(Logined)/_components/TYPE_post";
import MenuItemCounter from "../../_component/menuContainer";
import Link from "next/link";

interface PageProps {
  params: {
    postId: number;
  };
}
interface Post {
  id: number;
  store: StoreType;
  description: string;
  eventDate: Date;
  deadline: Date;
  minimumAmount: number | null;
  diningAvailable: boolean;
  diningTime: string | null;
  diningMaxPeople: number | null;
  seatArrangeExcuse: boolean;
  takeawayAvailable: boolean;
  takeawayTime: string | null;
  takeawayMaxPeople: number | null;
  menuItems: MenuItemType[];
}

export default function Page({ params }: PageProps) {
  // 페이지 로딩(Using GET())
  const [post, setPost] = useState<Post | null>(null);
  //총 금액가
  const [itemCounts, setItemCounts] = useState<{ [key: string]: number }>({});
  // 추가: 사용자 선택을 위한 상태
  const [isDiningIn, setIsDiningIn] = useState(true); // True(기본값)을 '매장'으로 가정
  // 장바구니 상태
  const [cart, setCart] = useState([]);
  //체크박스 상태 관리
  const [isAgreed, setIsAgreed] = useState(false);

  useEffect(() => {
    fetch(`/api/post/${params.postId}`)
      .then((response) => response.json())
      .then((data) => setPost(data)); // data는 postContent 객체입니다.
    console.log("몇번 보이나 보자 이거");
  }, [params.postId]);
  // 'post'가 'null'인지 확인하고, 'null'이면 로딩 중임을 나타내는 UI를 표시합니다.
  if (!post) {
    return <div>Loading...</div>;
  }
  // Function to increment the count for a menu item
  const incrementCount = (itemName: string | number) => {
    setItemCounts({
      ...itemCounts,
      [itemName]: (itemCounts[itemName] || 0) + 1,
    });
  };
  // Function to decrement the count for a menu item
  const decrementCount = (itemName: string | number) => {
    if (itemCounts[itemName] > 0) {
      setItemCounts({
        ...itemCounts,
        [itemName]: itemCounts[itemName] - 1,
      });
    }
  };
  // Calculate total price
  const calculateTotalPrice = () => {
    const total = post.menuItems.reduce((sum, item) => {
      const count = itemCounts[item.menu.name] || 0;
      const price = item.discountPrice || item.menu.price;
      return sum + count * price;
    }, 0);
    // 숫자를 한국 원 형식으로 서식화
    return new Intl.NumberFormat("ko-KR", { style: "decimal" }).format(total);
  };
  const calculateTotalDiscount = () => {
    const totalDiscount = post.menuItems.reduce((sum, item) => {
      const originalPrice = item.menu.price;
      const discountPrice = item.discountPrice || originalPrice;
      const count = itemCounts[item.menu.name] || 0;
      return sum + (originalPrice - discountPrice) * count;
    }, 0);
    // 숫자를 한국 원 형식으로 서식화
    return new Intl.NumberFormat("ko-KR", { style: "decimal" }).format(
      totalDiscount
    );
  };

  // 선택 UI 변경을 처리하는 함수
  const handleDiningOption = (option: string) => {
    setIsDiningIn(option === "dining");
  };
  return (
    <article className={styles.pageContainer}>
      {/* 상단 바: 좌측에 뒤로가기 버튼, 중앙에 텍스트 '주문결제' */}
      <header className={styles.header}>
        <Link className={styles.backLink} href="../../">
          &lt;
        </Link>
        <p>주문결제</p>
      </header>
      <h1 className={styles.storeName}>{post.store.name}</h1>
      <p className={styles.description}>"{post.description}"</p>
      <div className={styles.howToEat}>
        <button
          className={isDiningIn ? styles.customButton : styles.customButton2}
          onClick={() => handleDiningOption("dining")}
        >
          매장
        </button>
        <button
          className={isDiningIn ? styles.customButton2 : styles.customButton}
          onClick={() => handleDiningOption("takeaway")}
        >
          포장
        </button>
      </div>
      <div className={styles.menuBox}>
        <p>
          {isDiningIn ? "매장 " : "포장 "}
          {isDiningIn ? post?.diningTime : post?.takeawayTime}
        </p>
        {/* 음식 배열 */}
        {post.menuItems.map((item) => (
          <MenuItemCounter
            key={item.menu.name}
            menuItem={item}
            counts={itemCounts[item.menu.name] || 0}
            onIncrement={() => incrementCount(item.menu.name)}
            onDecrement={() => decrementCount(item.menu.name)}
          />
        ))}
        <div className={styles.payAmount}>
          결제 금액: {calculateTotalPrice()}원
        </div>
        <div className={styles.discountAmount}>
          {calculateTotalDiscount()}원만큼 아꼈어요!
        </div>
      </div>
      <div className={styles.comment}>
        {/* 주문하는 가게에 보낼 코멘트 작성하기(input) */}
      </div>
      <div className={styles.paymentAgree}>
        <div>
          <input
            type="checkbox"
            checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
          />
        </div>
        <div className={styles.AgreeMessage}>
          <p>결제 진행을 위해 모든 조건에 동의합니다.</p>
          <div>결제 예정 금액: {calculateTotalPrice()}원</div>
        </div>
      </div>
      {isAgreed && (
        <>
          <div className={styles.howToPay}>
            {/* 결제 방식 선택 버튼 (예: 카카오페이, 토스페이) */}
            <button>카카오페이</button>
            <button
              style={{ backgroundColor: "rgb(15, 122, 248)", color: "#eee" }}
            >
              토스페이
            </button>
          </div>
          <div className={styles.Payment}>
            {/* 결제 창 (howToPay에서 선택한 값으로 렌더링) */}
            {/* 예: 결제 정보 입력 폼 */}
          </div>
        </>
      )}
    </article>
  );
}
