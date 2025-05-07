export interface FilmTypes {
  id: number;
  title: string;
  poster_path: string;
}
export interface FilmList {
  results: FilmTypes[];
}
