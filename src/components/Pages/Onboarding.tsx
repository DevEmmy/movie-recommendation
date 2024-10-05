import React, { useState } from 'react';
import useGenres from '../hooks/useGenres';
import { setGenres } from '../../features/movieSlice';
import { useDispatch } from 'react-redux';

const Onboarding: React.FC = () => {
  const { allGenres, loading } = useGenres();
  const [selected, setSelected] = useState<number[]>([]);
  const dispatch = useDispatch();

  // Function to handle selecting/deselecting a genre
  const toggleGenre = (genreId: number) => {
    if (selected.includes(genreId)) {
      // If genre is already selected, remove it
      setSelected(selected.filter(id => id !== genreId));
    } else {
      // If genre is not selected, add it
      setSelected([...selected, genreId]);
    }
  };

  const [error, setError] = useState(false)
  const continueSelection = ()=>{
    console.log(selected)
    if(selected.length > 0) {
        dispatch(setGenres(selected))
    }
    else{
        setError(true)
    }
  }

  return (
    <div className='bg-black w-full min-h-screen flex flex-col items-center justify-center text-white gap-5'>
      <h2 className='text-[36px] font-bold'>
        Welcome to Emmy's Movie Recommendation App
      </h2>
      <p>Kindly Select your genres of choice</p>

      <div className='flex gap-5 w-1/2 flex-wrap items-center justify-center'>
        {allGenres?.map((genre, i) => {
          const isSelected = selected.includes(genre.id);
          return (
            <div
              key={i}
              className={`search-glass w-fit rounded-full p-2 px-5 cursor-pointer ${
                isSelected ? '!bg-black text-white' : 'bg-transparent text-white'
              }`}
              onClick={() => toggleGenre(genre.id)} // Handle select/deselect on click
            >
              {genre.name}
            </div>
          );
        })}
      </div>
      
      {
        error
        &&
        <p className='text-red-600'>Please select a category</p>
      }
      <button onClick={()=>continueSelection() }>Continue</button>
    </div>
  );
};

export default Onboarding;
