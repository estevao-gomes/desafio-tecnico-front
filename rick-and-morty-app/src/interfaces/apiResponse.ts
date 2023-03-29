import { characterData } from "./characterData";

export interface apiResponse{
    info: {
        count: number,
        pages: number,
        next: string|null,
        prev: string|null,
    }
    results: characterData[]
}