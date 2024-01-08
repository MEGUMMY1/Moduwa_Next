// app/(Logined)/profile/page.tsx

"use client";
import { useSession } from "next-auth/react";

import React from "react";
import styles from "./_components/profile.module.css";
import profileData from "../../../../public/profile.json";
import SignInBtn from "@/app/(Logined)/profile/_components/SignInBtn";
import Image from "next/image";
import Link from "next/link";

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
  return (
    <>
      {session ? (
        <div className={styles.profile_item}>
          <div className={styles.account_change_div}>
            <Link href="./store">
              <button className={styles.account_change_btn}>계정 전환</button>
            </Link>
          </div>
          <Image
            src={session.user.image || "/image/세츠나2.png"} // 기본 이미지 설정}
            alt={profile.name}
            width={100}
            height={100}
            style={{
              objectFit: "contain",
              borderRadius: "50%",
              border: "1.5px solid #aaa",
            }}
            //layout="intrinsic" // 또는 'fixed', 'intrinsic' 등에 따라 설정
          />
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
        <ProfileComponent profile={profileData.profile} />
      </div>
    </div>
  );
};

export default Page;