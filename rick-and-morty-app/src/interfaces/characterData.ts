interface placeData {
  name: string;
  url: string;
}
export interface characterData {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: placeData;
  location: placeData;
  image: string;
  episode: string[];
  url: string;
  created: Date;
}
