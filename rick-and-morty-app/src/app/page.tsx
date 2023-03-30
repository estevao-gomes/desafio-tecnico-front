"use client";

import { useState, useEffect, useContext } from "react";

import { Card } from "@/components/card/Card";
import { getData, useGetCharacters, CharacterQuery } from "@/utils/getData";

import { apiResponse } from "@/interfaces/apiResponse";
import { filterContext } from "@/contexts/filterContext";

import styles from "./page.module.css";

export default function Home(){
  return (
    <CharacterQuery>
      <HomeComponent />
    </CharacterQuery>
  )
}

function HomeComponent() {
  const [data, setData] = useState<apiResponse>({} as apiResponse);
  const [favorites, setFavorites] = useState(() => new Set());

  const {filter} = useContext(filterContext)

  const queryData = useGetCharacters(filter)

  useEffect(() => {
    async function updateData() {
      //This codes asserts that type of response from api is not unknown or undefined
      if(queryData.data || typeof queryData.data !== 'undefined'){
        setData(queryData.data);
      }  
    }

    try{
      updateData();
    }catch(error){
      throw new Error()
    }
    
    setFavorites(() => {
      const newFavorites = new Set();
      const storage = { ...localStorage };
      for (const [key, value] of Object.entries(storage)) {
        newFavorites.add(key);
      }

      return newFavorites;
    });
  }, [queryData.data]);

  const characterData = data ? data.results : [];

  async function handleNavegation(url: string | null) {
    if (url) {
      const newData = await getData({}, url);
      setData(newData);
    }
  }

  //remover, usar Link com link (hehe)
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
      <div className={styles.main}>
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
        <div>
          <button onClick={() => handleNavegation(data?.info.prev)}> prev</button>
          <button onClick={() => handleNavegation(data?.info.next)}>next</button>
        </div>
      </div>
  );
}
