import styles from "./page.module.css";
import { Card } from "@/components/card/Card";
import { getData } from "@/utils/getData";
import { characterData } from "@/interfaces/characterData";
import { apiResponse } from "@/interfaces/apiResponse";


export default async function Home() {
  const data:apiResponse = await getData();

  const characterData:characterData[] = data.results

  return (
    <div className={styles.main}>
      {characterData.map(character=> 
          <Card key={character.id} name={character.name} imgUrl={""} />
      )}
    </div>
  );
}
