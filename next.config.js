// // next.config.js
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "k.kakaocdn.net",
//       },
//       // Add other domains as needed
//     ],
//   },
//   // Keep other existing configurations as they are...
// };

// module.exports = nextConfig;
// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["k.kakaocdn.net"], // 허용할 외부 이미지 도메인 추가
  },
  // 기존의 다른 설정들이 있다면 그대로 유지...
};

module.exports = nextConfig;
