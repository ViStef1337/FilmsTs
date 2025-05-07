import { Form } from '../../components/Form/Form.tsx';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSearchFilm } from '../../service/filmAPI.ts';
import { FilmsList } from '../../components/FilmsList/FilmsList.tsx';
import { Loader } from '../../components/Loader/Loader.tsx';
import { Error } from '../../components/Error/Error.tsx';
import axios from 'axios';
import { FilmList, FilmTypes } from '../Home/Home.types.ts';

const SearchFilm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [films, setFilms] = useState<FilmTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const search = (filmSearch: string) => {
    setSearchParams({ filmSearch });
  };
  useEffect(() => {
    const query: string = searchParams.get('filmSearch') || '';
    if (!query) {
      return;
    }
    async function fetchData() {
      setLoading(true);
      try {
        const data = await getSearchFilm<FilmList>(query);
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
  }, [searchParams]);
  return (
    <>
      {error && <Error error={error} />}
      {loading && <Loader />}
      <Form searchFilm={search} />
      <FilmsList films={films} />
    </>
  );
};
export default SearchFilm;
