import './App.css';
import { Navigation } from './components/Navigation/Navigation.tsx';
import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
const Home = lazy(() => import('./pages/Home/Home.tsx'));
const SearchFilm = lazy(() => import('./pages/Movies/SearchFilm.tsx'));
const Cast = lazy(() => import('./components/Cast/Cast.tsx'));
const Reviews = lazy(() => import('./components/Reviews/Reviews.tsx'));
const FilmInfo = lazy(() => import('./pages/MovieDetails/FilmInfo.tsx'));
function App() {
  return (
    <>
      <Navigation />
      <Suspense>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'filmInfo/:filmId'} element={<FilmInfo />}>
            <Route path={'cast'} element={<Cast />} />
            <Route path={'reviews'} element={<Reviews />} />
          </Route>
          <Route path={'film'} element={<SearchFilm />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
