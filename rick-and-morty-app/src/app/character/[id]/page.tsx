"use client";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import { CharacterQuery, getSingleData, useGetCharacters } from "@/utils/getData";
import { characterData } from "@/interfaces/characterData";

import styles from "./page.module.css";
import Link from "next/link";

interface paramsProps {
  params: {
    id: number;
  };
}

export default function Page({ params }: paramsProps){
  return (
    <CharacterQuery>
      <SingleCharacterQuery params={params} />
    </CharacterQuery>
  )
}

function SingleCharacterQuery({ params }: paramsProps) {
  const [characterData, setCharacterData] = useState({} as characterData);

  const [favorite, setFavorite] = useState<boolean>();

  const { data } = useGetCharacters({id: params.id.toString()})

  //Adicionar error boundary
  useEffect(() => {
    async function getCharacterData() {
      if(data || typeof data !== 'undefined'){
        console.log(data)
        setCharacterData(data);
      }
    }

    getCharacterData();

    const isFavorited = localStorage.getItem(params.id.toString())
      ? true
      : false;

    setFavorite(isFavorited);
  }, [params.id, data]);

  function handleClick() {
    if (favorite) {
      localStorage.removeItem(params.id.toString());
      setFavorite(false);
    } else {
      localStorage.setItem(params.id.toString(), "");
      setFavorite(true);
    }
  }

  return (
    <div>
      <Link href={"/"}>Back</Link>
      <h1>Id: {characterData.id}</h1>
      <h1>Name: {characterData.name}</h1>
      <button className={favorite ? styles.favorite : ""} onClick={handleClick}>
        <FontAwesomeIcon icon={faHeart} />
      </button>
    </div>
  );
}
