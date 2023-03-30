"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import { useEffect, useState } from "react";

import { getSingleData } from "@/utils/getData";

import styles from "./page.module.css";
import { characterData } from "@/interfaces/characterData";
interface paramsProps {
  params: {
    id: number;
  };
}
export default function Page({ params }: paramsProps) {
  const [characterData, setCharacterData] = useState({} as characterData);

  const [favorite, setFavorite] = useState<boolean>();

  //Adicionar error boundary
  useEffect(() => {
    async function getCharacterData() {
      const data = await getSingleData(params.id.toString());
      setCharacterData(data);
    }

    getCharacterData();

    const isFavorited = localStorage.getItem(params.id.toString())
      ? true
      : false;

    setFavorite(isFavorited);
  }, [params.id]);

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
      <h1>Id: {characterData.id}</h1>
      <h1>Name: {characterData.name}</h1>
      <button className={favorite ? styles.favorite : ""} onClick={handleClick}>
        <FontAwesomeIcon icon={faHeart} />
      </button>
    </div>
  );
}
