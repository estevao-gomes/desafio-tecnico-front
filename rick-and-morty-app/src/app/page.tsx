import styles from "./page.module.css";
import { getData } from "@/utils/getData"

export default async function Home() {
  const characterData = await getData()

  return (
      <div>
        <h1>Character List</h1>
      </div>
  );
}
