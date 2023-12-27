import React from "react";
import styles from "./_components/profile.module.css";
import profileData from "../../../../public/profile.json";

interface Profile {
  id: number;
  image: string;
  name: string;
  age: number;
  phone: string;
  level: string;
  count: number;
}

const ProfileComponent: React.FC<{ profile: Profile }> = ({ profile }) => {
  return (
    <>
      <div className={styles.profile_item}>
        <img src={profile.image} alt={profile.name} />
        <p className={styles.profile_name}>{profile.name}</p>
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
