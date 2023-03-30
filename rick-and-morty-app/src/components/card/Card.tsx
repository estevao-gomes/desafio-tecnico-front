import Image from "next/image";
import Link from "next/link";

import { useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import styles from "./Card.module.css";
import { characterData } from "@/interfaces/characterData";
import { characterContext } from "@/contexts/characterContext";

interface cardProps {
  character: characterData;
  favorite: boolean;
  handleFavorite: (id: string) => void;
}

export function Card({ character, favorite, handleFavorite }: cardProps) {
  const { setCharacter } = useContext(characterContext);
  return (
    <div>
      <Link
        href={`/character/${character.id}`}
        onClick={() => setCharacter(character)}
      >
        {character.name}
      </Link>
      <button
        className={favorite ? styles.favorite : ""}
        onClick={() => handleFavorite(character.id.toString())}
      >
        <FontAwesomeIcon icon={faHeart} />
      </button>
    </div>
  );
}
