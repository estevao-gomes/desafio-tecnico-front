import Image from "next/image";
import Link from "next/link";

import { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

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
          alt={`${character.name} image`}
          src={character.image}
          width={300}
          height={300}
        />
      </Link>
      <span>
        <Link href={`/character/${character.id}`}>{character.name}</Link>
        <button
          className={favorite ? styles.favorite : ""}
          onClick={() => handleFavorite(character.id.toString())}
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </span>
    </div>
  );
}
