// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import movieReducer, { MovieState } from '../features/movieSlice';
import { loadState, saveState } from './localStorage'; // Import localStorage utilities

// Load persisted state (if any) from localStorage
const persistedState = loadState();

export const movieStore = configureStore({
  reducer: {
    movies: movieReducer,
  },
  preloadedState: persistedState , // Use persisted state if available
});

// Subscribe to store updates to save the state to localStorage
movieStore.subscribe(() => {
  saveState({
    movies: movieStore.getState().movies, 
  });
});

export type RootState = ReturnType<typeof movieStore.getState>;
export type AppDispatch = typeof movieStore.dispatch;
