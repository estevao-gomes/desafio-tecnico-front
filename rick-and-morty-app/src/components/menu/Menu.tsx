"use client";

import { useState } from "react";
import styles from "./Menu.module.css";

export function Menu() {
  const [showMenu, setShowMenu] = useState(false);

  function handleClick() {
    setShowMenu((showMenu) => !showMenu);
  }
  return (
    <div className={styles.menu}>
      <div className={`${showMenu && styles.menuHidden}`}>Menu</div>
      <button onClick={handleClick}>show</button>
    </div>
  );
}
