import React from 'react'
import useGenres from '../hooks/useGenres'
import Button from './Button'
import { RiThumbUpFill } from 'react-icons/ri'
import {Movie} from "../Interfaces/MovieInterface"

interface Props{
    movie: Movie ;
    showDetails: boolean
}

const BigMovieCard = ({ movie, showDetails = false }: Props) => {
    const { extractName } = useGenres()
    return (
        <>
            {
                showDetails
                    ?
                    <div className=''>
                        <div className='h-[600px] w-full rounded-3xl relative'>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={`${movie.title} Poster`}
                                className='h-full w-full rounded-[36px]'
                            />

                            <div className='overlay' />
                            <div className='absolute bottom-10 left-10 z-[20] text-white w-1/2'>
                                <div className='flex items-center gap-3'>
                                    {
                                        movie.genres?.map((genre, i: number) => {
                                            return (
                                                <p key={i} className='search-glass w-fit rounded-full p-2 px-4'>{genre.name}</p>
                                            )
                                        })
                                    }
                                </div>
                                <h2 className='text-[48px] font-bold'>{movie.title}</h2>
                                <p>Status: {movie.status} </p>
                                <p>Released on {movie.release_date}</p>
                                <p className='flex gap-2 items-center'>{movie.vote_count} <RiThumbUpFill color='orange' /></p>
                                <p className='py-2'>
                                    {movie.overview}
                                </p>

                            </div>
                        </div>
                    </div>
                    :
                    <div className=''>
                        <div className='h-[600px] w-full rounded-3xl relative'>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={`${movie.title} Poster`}
                                className='h-full w-full rounded-[36px]'
                            />

                            <div className='overlay' />
                            <div className='absolute bottom-10 left-10 z-[20] text-white w-1/2'>
                                <div className='flex items-center gap-3'>
                                    {
                                        movie.genre_ids?.map((id: number, i: number) => {
                                            return (
                                                <p key={i} className='search-glass w-fit rounded-full p-2 px-4'>{extractName(id)}</p>
                                            )
                                        })
                                    }
                                </div>
                                <h2 className='text-[48px] font-bold'>{movie.title}</h2>
                                <p className='py-2'>
                                    {movie.overview}
                                </p>
                                <Button>View Details</Button>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default BigMovieCard