import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./_components/Providers";
import Script from "next/script";

declare global {
  interface Window {
    kakao: any;
  }
}

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "MODUWA",
  description: "Moduwa Project",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        {/* <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        /> */}
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
      <Script
        // strategy="beforeInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_CLIENT_ID}
&autoload=false&libraries=services`}
      />
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" async />
    </html>
  );
}
