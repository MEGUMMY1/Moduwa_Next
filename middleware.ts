export { default } from "next-auth/middleware";

//여기에 넣는 경로는 로그인했을 때만 보이는 것이에여 (현재는 존재하지 않는 임의의 페이지 넣은거임)
export const config = {
  //matcher: ["/loginNeeded/:path*"],
  matcher: ["/:path*"],
};
