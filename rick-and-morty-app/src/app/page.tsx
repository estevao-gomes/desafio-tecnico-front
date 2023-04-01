"use client";

import { useState, useEffect, useContext } from "react";

import { Card } from "@/components/card/Card";
import { useGetCharacters, CharacterQuery } from "@/utils/getData";
import { filterContext } from "@/contexts/filterContext";

import styles from "./page.module.css";
import { characterData } from "@/interfaces/characterData";

export default function Home() {
  return (
    <CharacterQuery>
      <HomeComponent />
    </CharacterQuery>
  );
}

function HomeComponent() {
  const [favorites, setFavorites] = useState(() => new Set());
  const [page, setPage] = useState(1);

  const { filter } = useContext(filterContext);

  //Altera quando o filtro muda e chama useEffect
  const { data, isLoading, refetch } = useGetCharacters({
    ...filter,
    page: page,
  });

  useEffect(() => {
    //Obtem lista de favoritos do localStorage para sincronizar com pagina de personagens
    setFavorites(() => {
      const newFavorites = new Set();
      const storage = { ...localStorage };
      for (const [key, value] of Object.entries(storage)) {
        newFavorites.add(key);
      }

      return newFavorites;
    });
  }, []);

  //Seta favorito no localStorage e no state.
  function handleFavorite(id: string) {
    if (!favorites.has(id)) {
      setFavorites((prevFavorites) => new Set(prevFavorites).add(id));
      localStorage.setItem(id, "true");
    } else {
      setFavorites((prevFavorite) => {
        const newFavorite = new Set(prevFavorite);

        newFavorite.delete(id);

        return newFavorite;
      });
      localStorage.removeItem(id);
    }
  }

  return (
    <div className={styles.mainContainer}>
      {isLoading ? (
        <h1>Loading</h1>
      ) : data ? (
        <>
          <div className={styles.cardContainer}>
            {data.results.map((character: characterData) => (
              <Card
                key={character.id}
                character={character}
                handleFavorite={handleFavorite}
                favorite={favorites.has(character.id.toString()) ? true : false}
              />
            ))}
          </div>
          <div className={styles.navegationContainer}>
            <button
              onClick={
                data.info.prev && (() => setPage((prevPage) => prevPage - 1))
              }
            >
              Anterior
            </button>
            <button
              onClick={
                data.info.next && (() => setPage((prevPage) => prevPage + 1))
              }
            >
              Proxima
            </button>
          </div>
        </>
      ) : (
        <h1>No results found</h1>
      )}
    </div>
  );
}
