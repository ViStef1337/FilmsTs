import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFilmReviews } from '../../service/filmAPI.ts';
import { Loader } from '../Loader/Loader.tsx';
import { Error } from '../Error/Error.tsx';
import axios from 'axios';
import { ReviewsList, ReviewsTypes } from './Reviews.types.ts';

const Reviews = () => {
  const { filmId } = useParams();
  const [reviews, setReviews] = useState<ReviewsTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        if (!filmId) {
          return;
        }
        const data = await getFilmReviews<ReviewsList>(filmId);
        setReviews(data.result);
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
      {loading && <Loader />}
      {error && <Error error={error} />}
      <ul>
        {reviews.map(item => (
          <li key={item.id}>
            <p>{item.content}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Reviews;
