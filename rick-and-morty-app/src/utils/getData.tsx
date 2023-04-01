import axios from "axios"

import {
  QueryClient,
  useQuery,
  QueryClientProvider,
} from "@tanstack/react-query"
import { ReactNode } from "react"

interface filterType {
  name?: string
  id?: string
  status?: {
    alive: boolean
    dead: boolean
    unknown: boolean
  }
  gender?: {
    male: boolean
    female: boolean
    genderless: boolean
    unknown: boolean
  }
  page: number
}

export const queryClient = new QueryClient()

//obtem dado da APi utilizando filtros, pela função "getData"
export const useGetCharacters = (filters: filterType) => {
  return useQuery({
    queryKey: ["data", filters],
    queryFn: async () => {
      const res = await getData(filters)
      return res
    },
  })
}

//Retorna componente para query
export function CharacterQuery({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export async function getData(filter?: filterType) {
  const url = "https://rickandmortyapi.com/api/character"

  //Checa se foi filtrado algum status ou gênero. Poderia ser criada uma lógica iterativa, porém para fins de simplicidade, como são apenas 3 ou 4 opções, esta maneira fica mais fácil.
  const statusChecked = filter?.status?.alive
    ? "alive"
    : filter?.status?.dead
    ? "dead"
    : filter?.status?.unknown
    ? "unknown"
    : null

  const genderChecked = filter?.gender?.male
    ? "male"
    : filter?.gender?.female
    ? "female"
    : filter?.gender?.genderless
    ? "genderless"
    : filter?.gender?.unknown
    ? "unknown"
    : null

  //Checa se a url é para a pagina inicial, ou pagina de personagem específico (se há id setado no filtro) e aplica os filtros
  const queryUrl = filter?.id
    ? `${url}/${filter.id}`
    : `${url}/?page=${filter?.page}${
        filter?.name
          ? `&name=${filter.name}`
          : statusChecked
          ? `&status=${statusChecked}`
          : genderChecked
          ? `&gender=${genderChecked}`
          : ""
      }`

  const res = await axios.get(queryUrl)

  if (res.status === 404) {
    throw new Error("No results found")
  } else if (res.status !== 200) {
    throw new Error("Failed to get server data")
  }
  return res.data
}
