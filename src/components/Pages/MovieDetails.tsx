import { useParams } from 'react-router-dom'; // Import the useParams hook
import useMovieDetails from '../hooks/useMovieDetails';
import BigMovieCard from '../Micro/BigMovieCard';
import MovieCard from '../Micro/MovieCard';

const MovieDetailsComponent = () => {
    const { id } = useParams<{ id: string }>(); // Extract the id from the route parameters
    const movieId = Number(id); // Convert the id to a number if needed

    // Fetch movie details and similar movies using the custom hook
    const { movieDetails, similarMovies, loading, error } = useMovieDetails(movieId);

    if (loading) {
        return (
            <div className='bg-black h-screen flex items-center justify-center'>
                <div className='loader' />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='bg-black px-10 flex flex-col gap-3 py-5'>
            {/* Movie Details Section */}
            {movieDetails && (
                <BigMovieCard movie={movieDetails} showDetails={true} />
            )}

            {/* Similar Movies Section */}
            <div className='flex flex-col gap-5 my-10 text-white'>
                <p className='text-[24px] font-bold'>Similar Movies</p>

                <div className='grid grid-cols-3 gap-10'>
                    {similarMovies?.slice(1).map((movie, i) => (
                        <MovieCard movie={movie} />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default MovieDetailsComponent;
