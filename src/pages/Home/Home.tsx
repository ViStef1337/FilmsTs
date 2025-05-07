import { useState, useEffect } from 'react';
import { getFilms } from '../../service/filmAPI.ts';
import { FilmsList } from '../../components/FilmsList/FilmsList.tsx';
import { FilmTypes } from '../../App.types.ts';
import { Loader } from '../../components/Loader/Loader.tsx';
import { Error } from '../../components/Error/Error.tsx';
import axios from 'axios';
import { FilmList } from './Home.types.ts';

const Home = () => {
  const [films, setFilms] = useState<FilmTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await getFilms<FilmList>();
        setFilms(data.results);
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
  return (
    <>
      {error && <Error error={error} />}
      {loading && <Loader />}
      <FilmsList films={films} />
    </>
  );
};
export default Home;
