"use client";

import { useContext } from "react";
import { characterContext } from "@/contexts/characterContext";

interface paramsProps {
  params: {
    id: number;
  };
}
export default function Page({ params }: paramsProps) {
  const { character } = useContext(characterContext);

  return <h1>{params.id}</h1>;
}
