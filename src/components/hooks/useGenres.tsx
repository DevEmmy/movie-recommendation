import  { useEffect, useState } from 'react'
import { axiosConfig } from '../../utils/requests';
import { Genre } from '../Interfaces/MovieInterface';

const useGenres = () => {

    const [loading, setLoading] = useState(false);
    const [allGenres, setGenres] = useState<Genre[]>([])
    const fetchGenre = async ()=>{
        setLoading(true)
        let result = await axiosConfig.get("/genre/movie/list?language=en");
        let data = result.data.genres;
        console.log(data)
        setGenres(data)
        setLoading(false)
    }

    const extractName = (id: number) => {
        let genre = allGenres?.find((genre) => genre.id == id);

        if (genre) {
            return genre.name
        }

        return null
    }


    useEffect(()=>{
        fetchGenre();
    },[])
  return {allGenres, loading, extractName}
}

export default useGenres