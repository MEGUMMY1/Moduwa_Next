// export default function Page({ params }: { params: { postId: number } }) {}
// app/(Logined)/home/Post/[postId]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import styles from "../../_component/postid.module.css";
import {
  StoreType,
  MenuType,
  MenuItemType,
} from "@/app/(Logined)/_components/TYPE_post";

interface PageProps {
  params: {
    postId: number;
  };
}
interface Post {
  id: number;
  store: StoreType;
  description: string;
  eventDate: Date;
  deadline: Date;
  // Include other properties that your post may have
}

export default function Page({ params }: PageProps) {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    fetch(`/api/post/${params.postId}`)
      .then((response) => response.json())
      .then((data) => setPost(data)); // data는 postContent 객체입니다.
    console.log("몇번 보이나 보자 이거");
  }, [params.postId]);
  // 'post'가 'null'인지 확인하고, 'null'이면 로딩 중임을 나타내는 UI를 표시합니다.
  if (!post) {
    return <div>Loading...</div>;
  }
  return (
    <article className={styles.pageContainer}>
      <h1>Welcome to post {post.id}</h1>
      <p>Description: {post.description}</p>
    </article>
  );
}
