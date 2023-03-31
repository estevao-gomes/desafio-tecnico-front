"use client";
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import {
  CharacterQuery,
  getSingleData,
  useGetCharacters,
} from "@/utils/getData";
import { characterData } from "@/interfaces/characterData";

import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

interface paramsProps {
  params: {
    id: number;
  };
}

export default function Page({ params }: paramsProps) {
  return (
    <CharacterQuery>
      <SingleCharacterQuery params={params} />
    </CharacterQuery>
  );
}

function SingleCharacterQuery({ params }: paramsProps) {
  const [characterData, setCharacterData] = useState({} as characterData);

  const [favorite, setFavorite] = useState<boolean>();

  const { data } = useGetCharacters({ id: params.id.toString() });

  //Adicionar error boundary
  useEffect(() => {
    async function getCharacterData() {
      if (data || typeof data !== "undefined") {
        console.log(data);
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
    <div className={styles.container}>
      <Link href={"/"}>Back</Link>
      <Image
        alt={`${characterData.name} image`}
        src={characterData.image}
        width={300}
        height={300}
      />
      <span>
        <h1>{characterData.name}</h1>
        <button
          className={favorite ? styles.favorite : ""}
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </span>
      <h2>
        Status: {characterData.status ? characterData.status : "Undefined"}
      </h2>
      <h2>
        Species: {characterData.species ? characterData.species : "Undefined"}
      </h2>
      <h2>Type: {characterData.type ? characterData.type : "Undefined"}</h2>
      <h2>
        Gender: {characterData.gender ? characterData.gender : "Undefined"}
      </h2>
      <h2>
        Origin:{" "}
        {characterData.origin?.name ? characterData.origin.name : "Undefined"}
      </h2>
      <h2>
        Last known location:{" "}
        {characterData.location?.name
          ? characterData.location.name
          : "Undefined"}
      </h2>
      <h2>
        Episodes in:{" "}
        {characterData.episode?.length ? characterData.episode.length : "0"}
      </h2>
    </div>
  );
}
