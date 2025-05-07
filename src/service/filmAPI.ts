import axios from 'axios';

const API_KEY = '8aba4e3419a44727b7eb66f35fce4fa2';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
  },
});

export const getFilms = async <T>(): Promise<T> => {
  const { data } = await instance.get<T>('/trending/movie/day');
  return data;
};

export const getSearchFilm = async <T>(query: string): Promise<T> => {
  const { data } = await instance.get<T>('/search/movie', {
    params: {
      query: query,
    },
  });
  return data;
};

export const getFilmById = async <T>(id: string): Promise<T> => {
  const { data } = await instance.get<T>(`/movie/${id}`);
  return data;
};

export const getFilmCredits = async <T>(id: string): Promise<T> => {
  const { data } = await instance.get<T>(`/movie/${id}/credits`);
  return data;
};

export const getFilmReviews = async <T>(id: string): Promise<T> => {
  const { data } = await instance.get<T>(`/movie/${id}/reviews`);
  return data;
};
