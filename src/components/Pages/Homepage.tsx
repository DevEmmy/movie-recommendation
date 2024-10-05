
import { RiSearch2Line } from 'react-icons/ri';
import { RootState } from '../../stores/movieStore';
import { useSelector } from 'react-redux';
import useGenres from '../hooks/useGenres';
import MovieCard from '../Micro/MovieCard';
import BigMovieCard from '../Micro/BigMovieCard';

const Homepage = () => {
    const { genres, movies } = useSelector((state: RootState) => state.movies); // Selected genres' ids from the store
    const { allGenres } = useGenres(); // All genres from the hook


    // Filter genres into "selected" and "other" based on the ids in the store
    const selectedGenres = allGenres?.filter((genre) => genres.includes(genre.id)); // Selected genres
    const otherGenres = allGenres?.filter((genre) => !genres.includes(genre.id)); // Other genres

    return (
        <div className='main grid grid-cols-5 px-6 gap-5 items-start'>
            <div className='search-glass my-20 rounded-3xl p-4'>
                <p className='text-lg font-bold mb-3 text-white'>My Genres</p>
                <div className='flex flex-col gap-3'>
                    {selectedGenres.length > 0 ? (
                        selectedGenres.map((genre) => (
                            <div
                                key={genre.id}
                                className='w-fit rounded-full cursor-pointer text-white '
                            >
                                {genre.name}
                            </div>
                        ))
                    ) : (
                        <p className='text-gray-400'>No genres selected</p>
                    )}
                </div>

                <p className='text-lg font-bold mt-5 mb-3 text-white'>Other Genres</p>
                <div className='flex flex-col gap-3'>
                    {otherGenres.length > 0 ? (
                        otherGenres.map((genre) => (
                            <div
                                key={genre.id}
                                className='w-fit rounded-full cursor-pointer text-white '
                            >
                                {genre.name}
                            </div>
                        ))
                    ) : (
                        <p className='text-gray-400'>No other genres available</p>
                    )}
                </div>
            </div>

            <div className='flex flex-col gap-3 py-5 col-span-4'>
                <div className='flex items-center justify-center'>
                    <div className='search-glass p-3 rounded-full w-1/3 flex items-center gap-3 text-white'>
                        <RiSearch2Line className='text-[24px]' />
                        <input
                            type='text'
                            className='w-full bg-transparent focus:outline-none'
                            placeholder='Search movies...'
                        />
                    </div>
                </div>

                {/* Movies Section */}
                {
                    movies[0]
                    &&
                   <BigMovieCard showDetails={false} movie={movies[0]} />
                }

                {/* Recommended Movies */}
                <div className='flex flex-col gap-5 my-10 text-white'>
                    <p className='text-[24px] font-bold'>You might also like</p>

                    <div className='grid grid-cols-3 gap-10'>
                        {movies?.slice(1).map((movie, i) => (
                            <MovieCard movie={movie} key={i}/>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Homepage;
