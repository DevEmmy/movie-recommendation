import useGenres from '../hooks/useGenres'
import Button from './Button';
import { Movie } from '../Interfaces/MovieInterface';

interface Props{
  movie: Movie
}
const MovieCard = ({movie }: Props) => {
  const {extractName} = useGenres();
  return (
    <div
      className='h-[400px] rounded-[36px] relative overflow-hidden' // Added overflow-hidden
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title} Poster`}
        className='h-full w-full rounded-[26px]'
      />

      <div className='overlay !rounded-[26px]' />

      <div className='absolute bottom-0  p-5 z-[20] text-white w-full'>
        <div className='flex items-center gap-3'>
          {
            movie.genre_ids?.map((id: number, i: number) => {
              return (
                <p key={i} className='search-glass w-fit rounded-full p-2 px-2 text-xs' >{extractName(id)}</p>
              )
            })
          }
        </div>
        <h2 className='text-[20px] font-bold'>{movie.title}</h2>

        {/* Limit overview to 2 lines using line-clamp and prevent overflow */}
        <p className='line-clamp-2 overflow-hidden text-ellipsis'>
          {movie.overview}
        </p>
        <Button id={movie.id}>View Details</Button>
      </div>
    </div>
  )
}

export default MovieCard