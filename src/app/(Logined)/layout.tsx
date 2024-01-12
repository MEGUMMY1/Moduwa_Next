import React from "react";
import Navigation from "./_components/navigation";
import Header from "./_components/header";
import styles from "./_components/mainStyle.module.css";

// Define the type for props
type LayoutProps = {
  children: React.ReactNode;
};

const LoginedLayout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.navigation}>
        <Navigation />
      </div>
      <div className={styles.ColumnlayoutContainer}>
        <Header />
          <main className={styles.content}>{children}</main>  
      </div>
    </div>
  );
};
export default LoginedLayout;
