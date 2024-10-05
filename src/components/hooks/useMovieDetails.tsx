import { useState, useEffect } from 'react';
import { axiosConfig } from '../../utils/requests';


// Custom hook to fetch movie details and similar movies
const useMovieDetails = (movieId: number) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch movie details
        const movieDetailsResponse = await axiosConfig(`/movie/${movieId}`);

        // Fetch similar movies
        const similarMoviesResponse = await axiosConfig(`/movie/${movieId}/similar`);

        // Update state with movie details and similar movies
        setMovieDetails(movieDetailsResponse.data);
        setSimilarMovies(similarMoviesResponse.data.results);
      } catch (error: any) {
        setError(error.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieData();
    }
  }, [movieId]);

  // Return the movie details, similar movies, loading state, and any error
  return { movieDetails, similarMovies, loading, error };
};

export default useMovieDetails;
