import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./(Logined)/_components/navigation";
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
