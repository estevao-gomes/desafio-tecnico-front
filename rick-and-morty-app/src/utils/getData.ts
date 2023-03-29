import axios from "axios";

import { apiResponse } from '@/interfaces/apiResponse'

export async function getData() {
    const res = await axios.get("http://rickandmortyapi.com/api/character");
  
    if (res.status!==200) {
      throw new Error("Failed to get server data");
    }
  
    return res.data as apiResponse; 
  }