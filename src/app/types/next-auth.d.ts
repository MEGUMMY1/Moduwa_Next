//types/next-auth.d.ts

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      image: ReactNode;
      id: number;
      name: string;
      email: string;
      accessToken: string;
    };
  }
}
