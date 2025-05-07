import { Link, useLocation } from 'react-router-dom';
import { FilmsListTypes } from './FilmsList.types.ts';

export const FilmsList = ({ films }: FilmsListTypes) => {
  const location = useLocation();
  return (
    <ul>
      {films.map(item => (
        <li key={item.id}>
          <Link state={location} to={`/filmInfo/${item.id}`}>
            <h3>{item.title}</h3>
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt=""
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};
