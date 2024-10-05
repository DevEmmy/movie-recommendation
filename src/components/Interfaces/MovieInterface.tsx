export interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    genre_ids?: number[]; // For when only genre IDs are provided in listings
    genres?: Genre[]; // For when detailed genre information is provided
    overview: string;
    vote_average?: number;
    vote_count?: number;
    // Details specific fields:
    runtime?: number;
    budget?: number;
    revenue?: number;
    tagline?: string;
    homepage?: string | null;
    status?: string; // e.g., "Released", "In Production"
    backdrop_path?: string | null;
    imdb_id?: string | null;
  }

  
  // Genre interface for movie genres
export interface Genre {
    id: number;
    name: string;
  }
  