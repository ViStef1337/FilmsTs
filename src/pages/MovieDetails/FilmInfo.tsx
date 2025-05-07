import { useEffect, useState } from 'react';
import { getFilmById } from '../../service/filmAPI.ts';
import { Outlet, useParams } from 'react-router-dom';
import { FilmInfoElement } from '../../components/FilmInfoElement/FilmInfoElement.tsx';
import { Loader } from '../../components/Loader/Loader.tsx';
import { Error } from '../../components/Error/Error.tsx';
import axios from 'axios';
import { FilmInfoTypes } from './FilmInfo.types.ts';

const FilmInfo = () => {
  const { filmId } = useParams();
  const [filmInfo, setFilmInfo] = useState<FilmInfoTypes | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        if (!filmId) {
          return;
        }
        const data = await getFilmById<FilmInfoTypes>(filmId);
        setFilmInfo(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.response?.data);
          setError(
            error.response?.data?.message || 'An unknown Axios error occurred',
          );
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  console.log(filmInfo);
  return (
    <>
      {error && <Error error={error} />}
      {loading && <Loader />}
      {filmInfo && <FilmInfoElement filmInfo={filmInfo} />}
      <Outlet />
    </>
  );
};

export default FilmInfo;
