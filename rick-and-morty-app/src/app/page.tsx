"use client"

import { useState, useEffect, useContext } from "react"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Card } from "@/components/card/Card"
import { useGetCharacters, CharacterQuery } from "@/utils/getData"
import { filterContext } from "@/contexts/filterContext"

import styles from "./page.module.css"
import { characterData } from "@/interfaces/characterData"

export default function Home() {
  return (
    <CharacterQuery>
      <HomeComponent />
    </CharacterQuery>
  )
}

function HomeComponent() {
  const [favorites, setFavorites] = useState(() => new Set())
  const [page, setPage] = useState(1)

  const { filter, favOnly, handleResetFilter } = useContext(filterContext)

  //Altera quando o filtro muda e chama useEffect
  const { data, isLoading } = useGetCharacters({
    ...filter,
    page: page,
  })

  useEffect(() => {
    //Obtem lista de favoritos do localStorage para sincronizar com pagina de personagens
    setFavorites(() => {
      const newFavorites = new Set()
      const storage = { ...localStorage }
      for (const [key, value] of Object.entries(storage)) {
        newFavorites.add(key)
      }

      return newFavorites
    })
  }, [])

  //Seta favorito no localStorage e no state.
  function handleFavorite(id: string) {
    if (!favorites.has(id)) {
      setFavorites((prevFavorites) => new Set(prevFavorites).add(id))
      localStorage.setItem(id, "true")
    } else {
      setFavorites((prevFavorite) => {
        const newFavorite = new Set(prevFavorite)

        newFavorite.delete(id)

        return newFavorite
      })
      localStorage.removeItem(id)
    }
  }

  return (
    <div className={styles.mainContainer}>
      {isLoading ? (
        <h1>Carregando...</h1>
      ) : data ? (
        <>
          <div className={styles.cardContainer}>
            {favOnly
              ? data.results.map(
                  (character: characterData) =>
                    favorites.has(character.id.toString()) && (
                      <Card
                        key={character.id}
                        character={character}
                        handleFavorite={handleFavorite}
                        favorite={
                          favorites.has(character.id.toString()) ? true : false
                        }
                      />
                    )
                )
              : data.results.map((character: characterData) => (
                  <Card
                    key={character.id}
                    character={character}
                    handleFavorite={handleFavorite}
                    favorite={
                      favorites.has(character.id.toString()) ? true : false
                    }
                  />
                ))}
          </div>
          <div className={styles.navegationContainer}>
            {/* Checa se não está na primeira ou ultima página antes de chamar função para trocar de pagina */}
            <button
              aria-label="Previous Page"
              onClick={
                data.info.prev && (() => setPage((prevPage) => prevPage - 1))
              }
            >
              Anterior
            </button>
            <button
              aria-label="Next Page"
              onClick={
                data.info.next && (() => setPage((prevPage) => prevPage + 1))
              }
            >
              Proxima
            </button>
          </div>
        </>
      ) : (
        <>
          <h1>Nenhum resultado encontrado</h1>
          <button
            className={styles.backButton}
            onClick={handleResetFilter}
            aria-label="Back"
          >
            Voltar <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </>
      )}
    </div>
  )
}
