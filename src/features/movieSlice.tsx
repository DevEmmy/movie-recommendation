// src/redux/slices/movieSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosConfig } from '../utils/requests';

const API_KEY = "2ea7b05c01d6fc7bf96d7db90b11538e";
const BASE_URL = 'https://api.themoviedb.org/3';

// Types
interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  runtime: number;
  vote_average: number;
  poster_path: string;
}

export interface MovieState {
  movies: Movie[];
  genres: number[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial state
const initialState: MovieState = {
  movies: [],
  genres: [],
  status: 'idle',
  error: null,
};

// Asynchronous action to fetch movies based on genres
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (genres: number[], { rejectWithValue }) => {
    try {
      const pageRequests = [];

      // Push requests for pages 1 through 5
      for (let page = 1; page <= 5; page++) {
        pageRequests.push(
          axiosConfig.get(`/discover/movie`, {
            params: {
              api_key: API_KEY,
              page: page,
            },
          })
        );
      }

      // Make all requests in parallel
      const responses = await Promise.all(pageRequests);

      // Combine results from all 5 pages
      const allMovies = responses
        .map((response) => response.data.results)
        .flat();

      // Filter movies to only include those with at least one matching genre
      const filteredMovies = allMovies.filter((movie) =>
        movie.genre_ids.some((id: number) => genres.includes(id))
      );
      
      // Return filtered movies
      return filteredMovies;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch movies');
    }
  }
);


const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setGenres: (state, action: PayloadAction<number[]>) => {
      state.genres = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setGenres } = movieSlice.actions;

export default movieSlice.reducer;
