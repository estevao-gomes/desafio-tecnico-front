"use client"

import { FormEvent, useContext, useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons"

import { filterContext } from "@/contexts/filterContext"
import { formValues } from "@/interfaces/formValues"

import styles from "./Menu.module.css"

export function Menu() {
  const [showMenu, setShowMenu] = useState(false)
  const [formValues, setFormValues] = useState<formValues>({
    name: "",
    status: { alive: false, dead: false, unknown: false },
    gender: { male: false, female: false, genderless: false, unknown: false },
  })

  //Obtem função para alterar filtro
  const { setFilter } = useContext(filterContext)

  //Mostra menu ao clique
  function handleClick() {
    setShowMenu((showMenu) => !showMenu)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const isNameValid = !!formValues.name.trim() // Checa se há algo no input de nome
    // Checa se foi selecionado ao menos um tipo ou gênero
    const isStatusValid = Object.values(formValues.status).some(Boolean)
    const isGenderValid = Object.values(formValues.gender).some(Boolean)

    if (!isNameValid && !isStatusValid && !isGenderValid) {
      //não realiza o filtro caso não haja nada selecionado
      return
    }

    setFilter(formValues)
    return
  }

  function handleCheckboxChange(event: FormEvent) {
    const { name, checked } = event.target as HTMLInputElement

    //Garante que apenas uma das caixas será selecionada por vez, enquanto ajusta o valor da caixa cujo status foi alterado.
    // "key" precisa estar entre colchetes para não ser identificada como string
    setFormValues((prevState) => ({
      ...prevState,
      status: {
        ...Object.fromEntries(
          Object.entries(prevState.status).map(([key, val]) => [[key], false])
        ),
        [name]: checked,
      },
    }))
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
          <fieldset>
            <legend>Status</legend>
            <label htmlFor="status-option1">
              Alive
              <input
                type="checkbox"
                id="status-option1"
                name="alive"
                checked={formValues.status.alive}
                onChange={handleCheckboxChange}
              />
            </label>
            <label htmlFor="status-option2">
              Dead
              <input
                type="checkbox"
                id="status-option2"
                name="dead"
                checked={formValues.status.dead}
                onChange={handleCheckboxChange}
              />
            </label>
            <label htmlFor="status-option3">
              Unknown
              <input
                type="checkbox"
                id="status-option3"
                name="unknown"
                checked={formValues.status.unknown}
                onChange={handleCheckboxChange}
              />
            </label>
          </fieldset>
          <fieldset>
            <legend>Gender</legend>
            <label htmlFor="gender-option1">
              Male
              <input
                type="checkbox"
                id="gender-option1"
                name="male"
                checked={formValues.gender.male}
                onChange={handleCheckboxChange}
              />
            </label>
            <label htmlFor="gender-option2">
              Female
              <input
                type="checkbox"
                id="gender-option2"
                name="female"
                checked={formValues.gender.female}
                onChange={handleCheckboxChange}
              />
            </label>
            <label htmlFor="gender-option3">
              Genderless
              <input
                type="checkbox"
                id="gender-option3"
                name="genderless"
                checked={formValues.gender.genderless}
                onChange={handleCheckboxChange}
              />
            </label>
            <label htmlFor="gender-option4">
              Genderless
              <input
                type="checkbox"
                id="gender-option4"
                name="unknown"
                checked={formValues.gender.unknown}
                onChange={handleCheckboxChange}
              />
            </label>
          </fieldset>
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
  )
}
