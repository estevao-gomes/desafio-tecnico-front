import styles from "./page.module.css";
import { getData } from "@/utils/getData";

export default async function Home() {
  const characterData = await getData();

  return (
    <div className={styles.main}>
      <h1>Character List</h1>
    </div>
  );
}
