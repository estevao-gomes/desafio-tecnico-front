"use client";

import { FormEvent, useContext, useState } from "react";

import { filterContext } from "@/contexts/filterContext";
import styles from "./Menu.module.css";


export function Menu() {
  const [showMenu, setShowMenu] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
  });

  const { setFilter } = useContext(filterContext)

  function handleClick() {
    setShowMenu((showMenu) => !showMenu);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFilter(formValues)
  }

  return (
    <div className={styles.menu}>
      <div className={`${showMenu && styles.menuHidden}`}>
        <form onSubmit={handleSubmit}>
          <input
            value={formValues.name}
            onChange={(event) =>
              setFormValues({ ...formValues, name: event.target.value })
            }
            placeholder="Nome"
          />
          <button type="submit">Filtrar</button>
        </form>
      </div>
      <button onClick={handleClick}>show</button>
    </div>
  );
}
