import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

import styles from "./FavoriteButton.module.css";

export function FavoriteButton({
  favorite,
  clickHandler,
}: {
  favorite: boolean;
  clickHandler: () => void;
}) {
  return (
    <button className={styles.favoriteButton} onClick={clickHandler}>
      <FontAwesomeIcon icon={favorite ? solidHeart : faHeart} />
    </button>
  );
}
