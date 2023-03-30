import axios from "axios";

import { apiResponse } from '@/interfaces/apiResponse'

export async function getData(url:string = "https://rickandmortyapi.com/api/character") {
    const res = await axios.get(url);
  
    if (res.status!==200) {
      throw new Error("Failed to get server data");
    }
  
    return res.data as apiResponse; 
  }

