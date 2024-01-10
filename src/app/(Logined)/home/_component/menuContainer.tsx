"use client";
import React, { useState } from "react";
import styles from "./MenuItemCounter.module.css"; // Assume you have separate styles for this component
import { MenuItemType } from "../../_components/TYPE_post";

const MenuItemCounter: React.FC<{
  menuItem: MenuItemType;
  counts: number;
  onIncrement: () => void;
  onDecrement: () => void;
}> = ({ menuItem, counts, onIncrement, onDecrement }) => {
  return (
    <>
      <li className={styles.menuItem}>
        <span className={styles.menuName}>{menuItem.menu.name}</span>
        <div className={styles.priceBox}>
          <span className={styles.originPrice}>
            <s>{menuItem.menu.price}</s>
          </span>
          <span>
            {menuItem.discountPrice ? menuItem.discountPrice : "N/A"}원
          </span>
        </div>
        <div className={styles.counterControls}>
          <button onClick={onDecrement}>-</button>
          <span>{counts}</span>
          <button onClick={onIncrement}>+</button>
        </div>
      </li>
    </>
  );
};

export default MenuItemCounter;
