import { Link, useLocation } from 'react-router-dom';
import { useRef } from 'react';
import { FilmInfoElementTypes } from './FilmInfoElement.types.ts';

export const FilmInfoElement = ({ filmInfo }: FilmInfoElementTypes) => {
  const location = useLocation();
  const goBackLink = useRef(location.state || '/');
  return (
    <>
      <Link to={goBackLink.current}>go back</Link>
      <h2>Film Info</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${filmInfo.poster_path}`}
        alt=""
      />
      <div>
        <p>Overview: {filmInfo.overview}</p>
      </div>
      <ul>
        <li>
          <Link to={'cast'}>Cast</Link>
        </li>
        <li>
          <Link to={'reviews'}>Reviews</Link>
        </li>
      </ul>
    </>
  );
};
