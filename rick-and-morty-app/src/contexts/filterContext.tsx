"use client"

import { createContext, useState, ReactNode } from "react"

//Contexto para passagem de filtros entre pagina principal e menu.
//O filtro é na forma de um objeto {propriedade: "propriedade"}
interface filterContextType {
  filter: {}
  setFilter: ({}) => void
  favOnly: boolean
  handleFavOnlyChange: () => void
}
export const filterContext = createContext<filterContextType>(
  {} as filterContextType
)

export function FilterContext({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState({})
  const [favOnly, setFavOnly] = useState(false)

  function handleFavOnlyChange() {
    setFavOnly((oldFavOnly) => !oldFavOnly)
  }
  return (
    <filterContext.Provider
      value={{ filter, setFilter, favOnly, handleFavOnlyChange }}
    >
      {children}
    </filterContext.Provider>
  )
}
