// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "k.kakaocdn.net",
      },
      // Add other domains as needed
    ],
  },
  // Keep other existing configurations as they are...
};

module.exports = nextConfig;
