//app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth/next";
//import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import prisma from "../../../lib/prisma";

const handler = NextAuth({
  providers: [
    // CredentialsProvider({
    //   // The name to display on the sign in form (e.g. "Sign in with...")
    //   name: "Credentials",
    //   // 이메일과 패스워드 방식으로 사용자가 직접 DB 부분을 컨트롤할 수 있는 방식
    //   // `credentials` is used to generate a form on the sign in page.
    //   // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   // You can pass any HTML attribute to the <input> tag through the object.
    //   credentials: {
    //     username: {
    //       label: "이메일",
    //       type: "text",
    //       placeholder: "이메일 주소 입력 요망",
    //     },
    //     password: { label: "비밀번호", type: "password" },
    //   },
    //   //authorize 함수에서 이메일과 패스워드 부분을 체크해서, 맞으면 user 객체를 리턴하고 틀리면 null을 리턴하는 구조
    //   async authorize(credentials, req) {
    //     const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         username: credentials?.username,
    //         password: credentials?.password,
    //       }),
    //     });
    //     const user = await res.json();
    //     console.log(user);

    //     if (user) {
    //       // Any object returned will be saved in `user` property of the JWT
    //       return user;
    //     } else {
    //       // If you return null then an error will be displayed advising the user to check their details.
    //       return null;

    //       // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
    //     }
    //   },
    // }),
    //process.env가 환경변수이다
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      //console.log("Provider에서 받은 정보 : ", session);
      session.user = token as any;
      return session;
    },
    //DB에 삽입
    //account는 공급자의 이름/ 사용자의 액세스토큰/ 리프레시토큰을 포함
    async signIn({ user, account, profile }) {
      if (account && account.provider === "kakao") {
        // 카카오톡 프로필에서 정보 추출
        const { id, name, image } = user as any;
        // Prisma를 사용하여 User 테이블에 사용자 정보 저장
        await prisma.user.upsert({
          //레코드 찾기
          where: { kakaoId: id.toString() },
          //이미 존재한다면 업데이트
          update: {
            name: name,
            profileImage: image,
            // ageRange와 gender는 저장하지 않습니다.
          },
          //아니라면 생성
          create: {
            kakaoId: id.toString(),
            name: name,
            profileImage: image,
            role: "consumer", // 기본 역할 설정
            // ageRange와 gender는 저장하지 않습니다.
          },
        });
      }
      return true; // 로그인 성공
    },
  },

  pages: {
    signIn: "/loginEntrypage/loginPage",
    //signOut: "",
    //error: "", //error code passed in query string as ?error=
    //verifyRequest:"" //used for check email message
    //newUser: "" //new user will be directed here on first sign in
  },
});

export { handler as GET, handler as POST };
