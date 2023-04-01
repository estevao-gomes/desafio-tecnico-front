import Image from "next/image";
import Link from "next/link";

import styles from "./Card.module.css";
import { characterData } from "@/interfaces/characterData";
import { FavoriteButton } from "../favoriteButton/FavoriteButton";

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
        <FavoriteButton
          favorite={favorite}
          clickHandler={() => handleFavorite(character.id.toString())}
        />
      </span>
    </div>
  );
}
