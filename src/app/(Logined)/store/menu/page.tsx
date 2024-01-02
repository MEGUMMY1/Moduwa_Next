// app\(Logined)\store\menu\page.tsx

"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import styles from "./_components/menu.module.css";
import MenuData from "../../../../../public/menu.json";
import Image from "next/image";
import Link from "next/link";

interface Menus {
    id: number;
    name: string;
    price: number;
    storeId: number;
}

const MenuComponent: React.FC<{ menu: Menus[] }> = ({ menu }) => {
  const { data: session } = useSession();

  return (
    <>
    {menu.map((item) => (
        <div key={item.id} className={styles.menuItem}>
            <p className={styles.item_name}>{item.name}</p>
            <p className={styles.item_price}>{item.price}원</p>
        </div>
    ))}
    </>
  );
};

const Page: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

    const handleDelete = () => {
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        // 여기에서 실제 삭제 로직을 작성
        setShowModal(false);
    };

    const handleCancelDelete = () => {
        setShowModal(false);
    };
    
  return (
    <div className={styles.menu_container}>
        <div className={styles.menu_header}>
            <div>
                <Link href="./menu/modify">
                    <button className={styles.menu_btn_a}>수정</button>
                </Link>
                <button className={styles.menu_btn_a} onClick={handleDelete}>삭제</button>
                    {showModal && (
                        <div className={styles.modal_back}>
                            <div className={styles.modal}>
                              <p>진짜 삭제하시겠습니까?</p>
                              <div className={styles.modal_btn_div}>
                                <button className={styles.modal_btn_a} onClick={handleConfirmDelete}>예</button>
                                <button className={styles.modal_btn_b} onClick={handleCancelDelete}>아니오</button>
                              </div>
                            </div>
                        </div>
                    )}
            </div>
            <Link href="./menu/add">
                <button className={styles.menu_btn_b}>메뉴 추가</button>
            </Link>            
        </div>
        <MenuComponent menu={MenuData} />
    </div>
  );
};

export default Page;