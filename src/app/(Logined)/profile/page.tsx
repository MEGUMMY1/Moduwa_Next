"use client";
import { useSession } from "next-auth/react";

import React from "react";
import styles from "./_components/profile.module.css";
import profileData from "../../../../public/profile.json";
import SignInButton from "@/app/(Logined)/profile/_components/SignInButton";
import Image from "next/image";

interface Profile {
  id: number;
  image: string;
  name: string;
  age: number;
  phone: string;
  level: string;
  count: number;
}
const imageStyle = {
  borderRadius: "50%",
  border: "1px solid #fff",
};

const ProfileComponent: React.FC<{ profile: Profile }> = ({ profile }) => {
  const { data: session } = useSession();
  if (!session) {
    return <div>Loading...</div>; // 세션 정보가 없을 때 로딩 표시
  }

  return (
    <>
      <div className={styles.profile_item}>
        <Image
          src={session.user.image || "/image/세츠나2.png"} // 기본 이미지 설정}
          alt={profile.name}
          width={140}
          height={140}
          style={{
            objectFit: "contain",
            borderRadius: "50%",
            border: "1.5px solid #aaa",
          }}
          //layout="intrinsic" // 또는 'fixed', 'intrinsic' 등에 따라 설정
        />

        {/* <p className={styles.profile_name}>{profile.name}</p> */}
        <SignInButton />
      </div>
      <div className={styles.profile_box}>
        <div className={styles.profile_box_div}>
          <p className={styles.profile_box_txt}>회원등급</p>
          <p className={styles.profile_box_value}>{profile.level}</p>
        </div>
        <div className={styles.profile_box_div}>
          <p className={styles.profile_box_txt}>이용내역</p>
          <p className={styles.profile_box_value}>{profile.count}건</p>
        </div>
      </div>
    </>
  );
};

const Page: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profile_container}>
        <ProfileComponent profile={profileData.profile} />
      </div>
    </div>
  );
};

export default Page;
