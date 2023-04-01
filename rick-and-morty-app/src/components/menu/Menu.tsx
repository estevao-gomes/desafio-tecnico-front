"use client";

import { FormEvent, useContext, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";

import { filterContext } from "@/contexts/filterContext";

import styles from "./Menu.module.css";

export function Menu() {
  const [showMenu, setShowMenu] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
  });

  //Obtem função para alterar filtro
  const { setFilter } = useContext(filterContext);

  //Mostra menu ao clique
  function handleClick() {
    setShowMenu((showMenu) => !showMenu);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFilter(formValues);
  }

  return (
    <div className={styles.menu}>
      <div className={`${showMenu && styles.menuHidden}`}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Filtros</h2>
          <label className={styles.label} htmlFor="Name">
            Nome
          </label>
          <input
            name="Name"
            className={styles.input}
            value={formValues.name}
            onChange={(event) =>
              setFormValues({ ...formValues, name: event.target.value })
            }
            aria-label="Nome"
            placeholder="Nome"
          />
          <button
            aria-label="Filtrar"
            className={styles.submitButton}
            type="submit"
          >
            Filtrar
          </button>
        </form>
      </div>
      {/* Altera direção da seta para menu aberto/fechado */}
      <button className={styles.openButton} onClick={handleClick}>
        {showMenu ? (
          <FontAwesomeIcon icon={faCaretRight} />
        ) : (
          <FontAwesomeIcon icon={faCaretLeft} />
        )}
      </button>
    </div>
  );
}
