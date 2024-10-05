import { useDispatch, useSelector } from 'react-redux';
import Homepage from './components/Pages/Homepage'
import Onboarding from './components/Pages/Onboarding'
import { AppDispatch, RootState } from './stores/movieStore';
import { useEffect } from 'react';
import { fetchMovies } from './features/movieSlice';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MovieDetailsComponent from './components/Pages/MovieDetails';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const {  genres } = useSelector((state: RootState) => state.movies);

  useEffect(() => {
    if (genres.length > 0) {
      dispatch(fetchMovies(genres));
    }
  }, [genres, dispatch]);

  return (
    <>
      {
        genres.length > 0
          ?
          <BrowserRouter>
            <Routes>
              <Route path="/:id" element={<MovieDetailsComponent />} />
              <Route path="/" element={<Homepage />} />
            </Routes>
          </BrowserRouter>
          :
          <Onboarding />
      }

    </>
  )
}

export default App
