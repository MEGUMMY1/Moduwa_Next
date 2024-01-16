// 예시: src/app/(Logined)/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import EventSorter from "./_components/homeEvent_Sorter";
import EventBox from "./_components/homeEventBox";
import { PostType } from "./_components/TYPE_post";

export default function Page() {
  const [post, setPost] = useState<PostType[]>([]);
  const [cursor, setCursor] = useState(0); // Track the cursor
  const [hasMore, setHasMore] = useState(true); // Track if there is more data to load
  const [loading, setLoading] = useState(false); // 로딩중일 때는 새로운 요청 방지
  //데이터 페칭 정렬
  const [sortOption, setSortOption] = useState("최신순"); // 정렬 옵션 상태
  const handleSortChange = (newSortOption: string) => {
    setSortOption(newSortOption);
    setPost([]); // Reset posts
    setCursor(0); // Reset cursor
    setHasMore(true); // Reset hasMore
    // Optionally, call loadPosts here to immediately load new data
  };
  // Function to load posts
  const loadPosts = () => {
    if (!hasMore || loading) return; // No more data to load or a request is already in progress

    setLoading(true); // 로딩중일 때에는 새로운 요청을 만들지 않음

    fetch(`/api/post?cursor=${cursor}&sort=${sortOption}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.length < 6) setHasMore(false);
        const newPosts = Array.from(new Set([...post, ...data])); // Convert Set to Array
        setPost(newPosts);
        setCursor(data[data.length - 1]?.id || cursor);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error loading posts:", error);
      });
  };

  useEffect(() => {
    loadPosts();
  }, [sortOption]);

  //단순 스크롤 로딩
  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      if (!hasMore) {
        return; // No more data to load
      }
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const bodyHeight = document.body.offsetHeight;

      // Check if the user has scrolled to the bottom
      if (windowHeight + scrollY >= bodyHeight - 100) {
        loadPosts(); // Load more content
      }
    };
    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [cursor, hasMore, loading]);

  return (
    <>
      <EventSorter onSortChange={handleSortChange} />
      {post.map((post) => (
        <EventBox key={post.id} post={post} />
      ))}
      {/* <button onClick={loadPosts}>Load More</button> Load More button */}
    </>
  );
}
