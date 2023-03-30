import axios from "axios";

import { apiResponse } from "@/interfaces/apiResponse";
import { characterData } from "@/interfaces/characterData";
import { QueryClient, useQuery, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export const queryClient = new QueryClient();

export const useGetCharacters = (filters: { name?: string, id?: string }) =>  {
  return useQuery({
    queryKey: ["data", filters],
    queryFn: async () => {
      const res = await getData(filters);
      return res;
    },
  });
};

export function CharacterQuery({children}:{children:ReactNode}){
  return(
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export async function getData(
  filter?: { name?: string, id?: string },
  url: string = "https://rickandmortyapi.com/api/character"
) {
  const res = filter?.id ? 
  await axios.get(
    `${url}/${filter.id}`
  ) :
  await axios.get(
    `${url}/?${filter?.name ? `name=${filter.name}` : ""}`
  );

  if (res.status === 404) {
    throw new Error("No results found")
  }else if(res.status !== 200){
    throw new Error("Failed to get server data")
  }
  console.log(res.data)
  return res.data;
}

//To get data for single character. Can not use getData due to typing (could be fixed, but, due to time constraints, defining new function is easier)
export async function getSingleData(id: string) {
  const res = await axios.get(
    `https://rickandmortyapi.com/api/character/${id}`
  );

  if (res.status !== 200) {
    throw new Error("Failed to get server data");
  }

  return res.data as characterData;
}
