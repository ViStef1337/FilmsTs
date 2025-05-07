import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <ul>
      <Link to={'/'}>
        <li>Home</li>
      </Link>
      <Link to={'film'}>
        <li>Film</li>
      </Link>
    </ul>
  );
};
