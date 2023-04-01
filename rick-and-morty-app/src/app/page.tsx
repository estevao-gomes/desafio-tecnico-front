"use client";

import { useState, useEffect, useContext } from "react";

import { Card } from "@/components/card/Card";
import { getData, useGetCharacters, CharacterQuery } from "@/utils/getData";
import { apiResponse } from "@/interfaces/apiResponse";
import { filterContext } from "@/contexts/filterContext";

import styles from "./page.module.css";

export default function Home() {
  return (
    <CharacterQuery>
      <HomeComponent />
    </CharacterQuery>
  );
}

function HomeComponent() {
  const [data, setData] = useState<apiResponse>({} as apiResponse);
  const [favorites, setFavorites] = useState(() => new Set());

  const { filter } = useContext(filterContext);

  //Altera quando o filtro muda e chama useEffect
  const queryData = useGetCharacters(filter);

  useEffect(() => {
    async function updateData() {
      //Garante que os dados da API não estão vazios ou indefinidos
      if (queryData.data || typeof queryData.data !== "undefined") {
        setData(queryData.data);
      }
    }

    try {
      updateData();
    } catch (error) {
      throw new Error();
    }

    //Obtem lista de favoritos do localStorage para sincronizar com pagina de personagens
    setFavorites(() => {
      const newFavorites = new Set();
      const storage = { ...localStorage };
      for (const [key, value] of Object.entries(storage)) {
        newFavorites.add(key);
      }

      return newFavorites;
    });
  }, [queryData.data]);

  //inicializa lista de personagens como vazia caso seja primeira renderização
  const characterData = data ? data.results : [];

  //Navega para url da próx. ou ant. pagina
  async function handleNavegation(url: string | null) {
    if (url) {
      const newData = await getData({}, url);
      setData(newData);
    }
  }

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
      <div className={styles.cardContainer}>
        {characterData
          ? characterData.map((character) => (
              <Card
                key={character.id}
                character={character}
                handleFavorite={handleFavorite}
                favorite={favorites.has(character.id.toString()) ? true : false}
              />
            ))
          : ""}
      </div>
      <div className={styles.navegationContainer}>
        <button onClick={() => handleNavegation(data?.info.prev)}>
          Anterior
        </button>
        <button onClick={() => handleNavegation(data?.info.next)}>
          Proxima
        </button>
      </div>
    </div>
  );
}
