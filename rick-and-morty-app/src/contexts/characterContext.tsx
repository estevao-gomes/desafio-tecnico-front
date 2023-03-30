"use client";

import { characterData } from "@/interfaces/characterData";
import { createContext, useState, ReactNode } from "react";

interface ContextType {
  character: characterData | null;
  setCharacter: (arg: characterData) => void;
}
export const characterContext = createContext<ContextType>({} as ContextType);

export function CharacterContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [character, setCharacter] = useState<characterData | null>(null);

  return (
    <characterContext.Provider value={{ character, setCharacter }}>
      {children}
    </characterContext.Provider>
  );
}
