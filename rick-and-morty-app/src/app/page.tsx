"use client";

import styles from "./page.module.css";
import { Card } from "@/components/card/Card";
import { getData } from "@/utils/getData";
import { useState, useEffect } from "react";
import { apiResponse } from "@/interfaces/apiResponse";

export default function Home() {
  const [data, setData] = useState<apiResponse>({} as apiResponse);
  const [favorites, setFavorites] = useState(()=>new Set())
  
  useEffect(() => {
    async function updateData() {
      const newData = await getData();
      setData(newData);
    }

    updateData();
  }, []);

  const characterData = data ? data.results : [];

  async function handleNavegation(url: string|null) {
    if(url){
      const newData = await getData(url);
      setData(newData);
    }
  }

  function handleFavorite(id: number){
    if(!favorites.has(id)){
      setFavorites((prevFavorites)=>new Set(prevFavorites).add(id))
    }else{
      setFavorites((prevFavorite)=>{
        const newFavorite = new Set(prevFavorite)

        newFavorite.delete(id)

        return newFavorite
      })      
    }
  }
  return (
    <div className={styles.main}>
      {characterData
        ? characterData.map((character) => (
            <Card
              key={character.id}
              name={character.name}
              imgUrl={""}
              id={character.id}
              handleFavorite={handleFavorite}
              favorite={favorites.has(character.id) ? true : false}
            />
          ))
        : ""}
      <div>
        <button onClick={()=>handleNavegation(data?.info.prev)}> prev</button>
        <button onClick={()=>handleNavegation(data?.info.next)}>next</button>
      </div>
    </div>
  );
}
