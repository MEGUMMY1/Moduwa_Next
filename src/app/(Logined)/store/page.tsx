// app/(Logined)/store/page.tsx

"use client";
import { useSession } from "next-auth/react";

import React from "react";
import styles from "./_components/store.module.css";
import StoreData from "../../../../public/store.json";
import SignInBtn from "../store/_components/SignInBtn";
import Image from "next/image";
import Link from "next/link";

interface Menus {
    id: number;
    name: string;
    price: number;
    storeId: number;
}

interface Owner {
    id: number;
    kakaoId: number;
    createdAt: string;
    updatedAt: string;
    profileImage: string;
    name: string;
}

interface Store {
  id: number;
  storeId: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  location: number;
  description: string;
  phone: string;
  diningHours: string;
  menus: Menus[];
  ownerId: number;
  owner: Owner[];
  posts: string;
}
const imageStyle = {
  borderRadius: "50%",
  border: "1px solid #fff",
};

const StoreComponent: React.FC<{ store: Store }> = ({ store }) => {
  const { data: session } = useSession();

  return (
    <>      
      {session ? (
        <div className={styles.profile_item}>
          <div className={styles.account_change_div}>
            <Link href="./profile">
                <button className={styles.account_change_btn}>계정 전환</button>
            </Link>
          </div>
          <Image
            src={session.user.image || "/image/세츠나2.png"} // 기본 이미지 설정}
            alt={store.name}
            width={100}
            height={100}
            style={{
              objectFit: "contain",
              borderRadius: "50%",
              border: "1.5px solid #aaa",
            }}
            //layout="intrinsic" // 또는 'fixed', 'intrinsic' 등에 따라 설정
          />     
          <h1 className={styles.profile_name}>{store.name}</h1>             
        </div>
      ) : (
        <div></div>
      )}
      {/* <p className={styles.profile_name}>{profile.name}</p>  */}
      <SignInBtn />      
    </>
  );
};

const Page: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profile_container}>
        <StoreComponent store={StoreData.store} />
      </div>
    </div>
  );
};

export default Page;
