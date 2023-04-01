import axios from "axios";

import {
  QueryClient,
  useQuery,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode } from "react";

export const queryClient = new QueryClient();

//obtem dado da APi utilizando filtros, pela função "getData"
export const useGetCharacters = (filters: {
  name?: string;
  id?: string;
  page: number;
}) => {
  return useQuery({
    queryKey: ["data", filters],
    queryFn: async () => {
      const res = await getData(filters);
      return res;
    },
  });
};

//Retorna componente para query
export function CharacterQuery({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export async function getData(filter?: {
  name?: string;
  id?: string;
  page: number;
}) {
  const url = "https://rickandmortyapi.com/api/character";
  //Checa se a url é para a pagina inicial, ou pagina de personagem específico (se há id setado no filtro)
  const res = filter?.id
    ? await axios.get(`${url}/${filter.id}`)
    : await axios.get(
        `${url}/?page=${filter?.page}${
          filter?.name ? `&name=${filter.name}` : ""
        }`
      );

  if (res.status === 404) {
    throw new Error("No results found");
  } else if (res.status !== 200) {
    throw new Error("Failed to get server data");
  }
  return res.data;
}
