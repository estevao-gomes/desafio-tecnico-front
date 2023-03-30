import axios from "axios";

import { apiResponse } from '@/interfaces/apiResponse'
import { characterData } from "@/interfaces/characterData";

export async function getData(url:string = "https://rickandmortyapi.com/api/character") {
    const res = await axios.get(url);
  
    if (res.status!==200) {
      throw new Error("Failed to get server data");
    }
  
    return res.data as apiResponse; 
  }

  //To get data for single character. Can not use getData due to typing (could be fixed, but, due to time constraints, defining new function is easier)
  export async function getSingleData(id:string) {
    const res = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
  
    if (res.status!==200) {
      throw new Error("Failed to get server data");
    }
  
    return res.data as characterData; 
  }

