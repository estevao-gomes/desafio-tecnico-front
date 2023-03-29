import axios from "axios";

export async function getData() {
    const res = await axios.get("http://rickandmortyapi.com/api/character");
  
    console.log(res.data);
  
    if (res.status!==200) {
      throw new Error("Failed to get server data");
    }
  
    return res;
  }