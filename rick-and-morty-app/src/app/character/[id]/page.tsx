"use client";
import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { CharacterQuery, useGetCharacters } from "@/utils/getData";
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
  const [favorite, setFavorite] = useState<boolean>(false);

  const { data, isLoading } = useGetCharacters({
    id: params.id.toString(),
    page: 0,
  });

  //Adicionar error boundary
  useEffect(() => {
    // Verifica se o personagem está em localStorage como favorito
    const isFavorited = localStorage.getItem(params.id.toString())
      ? true
      : false;

    setFavorite(isFavorited);
  }, [params.id]);

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

  return isLoading ? (
    <h1>Loading</h1>
  ) : (
    <div className={styles.container}>
      <Link href={"/"} aria-label="Back">
        <FontAwesomeIcon icon={faArrowLeft} />
      </Link>
      <Image
        alt={`${data.name} image`}
        src={data.image}
        width={300}
        height={300}
      />
      <span className={styles.name}>
        <h1>{data.name}</h1>
        <FavoriteButton clickHandler={handleClick} favorite={favorite} />
      </span>
      <h2>Status: {data.status ? data.status : "Undefined"}</h2>
      <h2>Species: {data.species ? data.species : "Undefined"}</h2>
      <h2>Type: {data.type ? data.type : "Undefined"}</h2>
      <h2>Gender: {data.gender ? data.gender : "Undefined"}</h2>
      <h2>Origin: {data.origin?.name ? data.origin.name : "Undefined"}</h2>
      <h2>
        Last known location:{" "}
        {data.location?.name ? data.location.name : "Undefined"}
      </h2>
      <h2>Episodes in: {data.episode?.length ? data.episode.length : "0"}</h2>
    </div>
  );
}
