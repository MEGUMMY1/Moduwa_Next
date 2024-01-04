import React from "react";
import Navigation from "./_components/navigation";
import Header from "./_components/header";
import styles from "./_components/mainStyle.module.css";
import { SocketProvider } from './_components/socket-provider'

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
        <SocketProvider>
          <main className={styles.content}>{children}</main>
        </SocketProvider>        
      </div>
    </div>
  );
};
export default LoginedLayout;
