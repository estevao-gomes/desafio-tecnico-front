"use client";

import { useState } from "react";

import styles from "./Menu.module.css";

export function Menu() {
  const [showMenu, setShowMenu] = useState(true);
  
  function handleClick(){
    setShowMenu(showMenu => !showMenu)
  }
  
  return (
    <div className={showMenu ? styles.menu : styles.menuHidden}>
      Menu
      <button onClick={handleClick}>button</button>
    </div>
  );
}
