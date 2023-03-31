import Image from "next/image";
import Link from "next/link";

import { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

import styles from "./Card.module.css";
import { characterData } from "@/interfaces/characterData";

interface cardProps {
  character: characterData;
  favorite: boolean;
  handleFavorite: (id: string) => void;
}

export function Card({ character, favorite, handleFavorite }: cardProps) {
  return (
    <div className={styles.card}>
      <Link href={`/character/${character.id}`}>
        <Image
          className={styles.avatar}
          alt={`${character.name} image`}
          src={character.image}
          width={200}
          height={200}
        />
      </Link>
      <span className={styles.cardData}>
        <Link href={`/character/${character.id}`}>{character.name}</Link>
        <button
          className={styles.favoriteButton}
          onClick={() => handleFavorite(character.id.toString())}
        >
          <FontAwesomeIcon icon={favorite ? solidHeart : faHeart} />
        </button>
      </span>
    </div>
  );
}
