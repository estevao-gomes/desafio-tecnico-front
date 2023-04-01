"use client";
import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { CharacterQuery, useGetCharacters } from "@/utils/getData";
import { characterData } from "@/interfaces/characterData";
import { FavoriteButton } from "@/components/favoriteButton/FavoriteButton";

import styles from "./page.module.css";
interface paramsProps {
  params: {
    id: number;
  };
}

// Retorna a página usando o componente do react-query
export default function Page({ params }: paramsProps) {
  return (
    <CharacterQuery>
      <SingleCharacterQuery params={params} />
    </CharacterQuery>
  );
}

//Página principal (personagem único)
function SingleCharacterQuery({ params }: paramsProps) {
  const [characterData, setCharacterData] = useState({} as characterData);

  const [favorite, setFavorite] = useState<boolean>(false);

  const { data } = useGetCharacters({ id: params.id.toString() });

  //Adicionar error boundary
  useEffect(() => {
    //Obtem dados dos personagens na inicialização
    async function getCharacterData() {
      if (data || typeof data !== "undefined") {
        setCharacterData(data);
      }
    }

    getCharacterData();

    // Verifica se o personagem está em localStorage como favorito
    const isFavorited = localStorage.getItem(params.id.toString())
      ? true
      : false;

    setFavorite(isFavorited);
  }, [params.id, data]);

  //Adiciona ou remove personagem dos favoritos no clique
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
      <Link href={"/"} aria-label="Back">
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      <Image
        alt={`${characterData.name} image`}
        src={characterData.image}
        width={300}
        height={300}
      />
      <span className={styles.name}>
        <h1>{characterData.name}</h1>
        <FavoriteButton clickHandler={handleClick} favorite={favorite} />
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
