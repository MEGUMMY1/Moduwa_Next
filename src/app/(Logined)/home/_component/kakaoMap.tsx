// app\(Logined)\home\_component\kakaoMap.tsx

import { useEffect, useRef } from "react";

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const loadMap = () => {
      if (window.kakao) {
        window.kakao.maps.load(() => {
          const options = {
            center: new window.kakao.maps.LatLng(37.650701, 127.070667),
            level: 3,
          };

          const map = new window.kakao.maps.Map(mapRef.current, options);
        });
      }
    };

    // 최초 로드
    loadMap();

    // n초 후에 다시 실행
    const timeoutId = setTimeout(() => {
      loadMap();
    }, 20);

    // 컴포넌트가 언마운트되면 타이머 클리어
    return () => clearTimeout(timeoutId);
  }, []); // 의존성 배열은 빈 배열로 설정하여 최초 로드 시에만 실행

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "400px", backgroundColor: "tan" }}
    ></div>
  );
}
