import styles from "./header.module.css";
import Image from "next/image";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <Image
        src={"/image/logo_modu3.svg"} // 기본 이미지 설정}
        alt={"Moduwa"}
        width={92}
        height={40}
        style={{
          objectFit: "contain",
        }}
        //layout="intrinsic" // 또는 'fixed', 'intrinsic' 등에 따라 설정
      />
      {/* <div className={styles.logo} /> */}
    </div>
  );
};
export default Header;
