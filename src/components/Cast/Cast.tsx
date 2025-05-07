import { useEffect, useState } from 'react';
import { getFilmCredits } from '../../service/filmAPI.ts';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader/Loader.tsx';
import { Error } from '../Error/Error.tsx';
import axios from 'axios';
import { CastList, CastTypes } from './Cast.types.ts';

const Cast = () => {
  const { filmId } = useParams();
  const [cast, setCast] = useState<CastTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        if (!filmId) {
          return;
        }
        const data = await getFilmCredits<CastList>(filmId);
        setCast(data.cast);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.response?.data);
          setError(
            error.response?.data?.message || 'An unknown Axios error occurred',
          );
        }
      }
      setLoading(false);
    }
    fetchData();
  }, []);
  console.log(cast);
  return (
    <>
      {loading && <Loader />}
      {error && <Error error={error} />}
      <ul>
        {cast.map(item => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <h4>{item.character}</h4>
            <img
              src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
              alt=""
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Cast;
