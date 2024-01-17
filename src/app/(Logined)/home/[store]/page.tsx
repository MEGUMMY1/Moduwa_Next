//app\(Logined)\home\[store]\page.tsx
"use client";
import React, { useEffect } from "react";
import KakaoMap from "../_component/kakaoMap";
import styles from "../_component/storeInformation.module.css";
interface PageProps {
  params: {
    store: number;
  };
}

export default function Page({ params }: PageProps) {
  return (
    <div className={styles.content}>
      <KakaoMap />
      {params.store}
    </div>
  );
}
