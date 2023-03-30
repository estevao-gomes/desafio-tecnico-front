'use client'

import {createContext, useState, ReactNode} from 'react'

interface filterContextType{
    filter: {};
    setFilter: ({})=>void
}
export const filterContext = createContext<filterContextType>({}as filterContextType)

export function FilterContext({children}:{children:ReactNode}){
    const [filter, setFilter] = useState({})

    return(
        <filterContext.Provider value={{filter, setFilter}}>
            {children}
        </filterContext.Provider>
    )
}