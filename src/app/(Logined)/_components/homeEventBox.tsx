"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./homeEventBox.module.css";
import Link from "next/link";

interface MenuType {
  name: string;
  imageUrl: string | null;
  price: number;
}

interface MenuItemType {
  menu: MenuType;
  discountPrice: number | null; // Allow discountPrice to be null
}

interface StoreType {
  name: string;
  location: string;
  imageUrl: string | null;
}
interface PostType {
  id: number;
  store: StoreType;
  menuItems: MenuItemType[];
  description: string | null;
  eventDate: Date;
  deadline: Date;
  createdAt: Date;
  minimumAmount: number | null;
  diningAvailable: boolean;
  diningMenus: string[];
  diningTime: string | null;
  diningMaxPeople: number | null;
  seatArrangeExcuse: boolean;
  takeawayAvailable: boolean;
  takeawayMenus: string[];
  takeawayTime: string | null;
  takeawayMaxPeople: number | null;
  paymentCount: number; // Add this field to track the number of payments
}

const imageStyle = {
  margin: "0 10px",
};

const EventBox: React.FC<{ post: PostType }> = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [boxHeight, setBoxHeight] = useState("0px"); // initial height
  const toggleExpansion = () => {
    setBoxHeight(isExpanded ? "0px" : "200px"); // adjust height based on isExpanded
    setIsExpanded(!isExpanded);
  };
  // Extract the first menu item's details
  const firstMenuItem = post.menuItems[0]?.menu;
  const firstMenuPrice = post.menuItems[0]?.discountPrice;
  const isDiningAvailable = post.diningAvailable;
  const isTakeawayAvailable = post.takeawayAvailable;

  return (
    <article className={styles.eventContainer} onClick={toggleExpansion}>
      <header className={styles.upperEvent}>
        <figure>
          <Image
            style={imageStyle}
            src={post.store.imageUrl || "/image/세츠나2.png"}
            width={84}
            height={84}
            alt={post.store.name}
          />
          <figcaption>{post.store.name}</figcaption>
        </figure>
        <address>{post.store.location}m</address>
        <time>{post.eventDate.toLocaleDateString()}</time>
        <time>
          매장식사{post.diningTime} || 포장식사{post.takeawayTime}
        </time>
        <time>
          마감 {post.deadline.toLocaleDateString()}{" "}
          {post.deadline.toLocaleTimeString()}
        </time>
      </header>
      <section className={styles.downBox}>
        <p>
          {firstMenuItem?.name}
          {post.menuItems.length > 1 &&
            ` 외 ${post.menuItems.length - 1}종`} -{" "}
          <s>{firstMenuItem?.price}</s> {firstMenuPrice}&#8361;
        </p>
        <span style={{ color: isDiningAvailable ? "black" : "grey" }}>
          매장
        </span>{" "}
        |
        <span style={{ color: isTakeawayAvailable ? "black" : "grey" }}>
          포장
        </span>
      </section>
      <footer
        className={styles.animebox}
        style={{ height: boxHeight }}
        onClick={(e) => e.stopPropagation()}
      >
        <p>{post.description}</p>
        <ul>
          {post.menuItems.map((menuItem, index) => (
            <li key={index}>
              Menu: {menuItem.menu.name} - <s>{menuItem.menu.price}</s>{" "}
              {menuItem.discountPrice ? menuItem.discountPrice : "N/A"}&#8361;
            </li>
          ))}
        </ul>
        <p>
          매장: {post.diningTime}, 최대인원: {post.diningMaxPeople}
        </p>
        <p>
          포장: {post.takeawayTime}, 최대인원: {post.takeawayMaxPeople}
        </p>
        <a href={`/home/${post.id}`}>결제</a>
      </footer>
    </article>
  );
};

export default EventBox;
