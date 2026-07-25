import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ContentItem } from '../store/slices/favoritesSlice';

// A mock endpoint since we don't have a real TMDB API key
const MOCK_MOVIES = [
  {
    id: 'movie-1',
    title: 'Inception',
    overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
    poster_path: '/8ZTEP129O1l19QhV5p0A0yEa5L6.jpg', // normally would be prefixed with https://image.tmdb.org/t/p/w500
    release_date: '2010-07-15',
  },
  {
    id: 'movie-2',
    title: 'Interstellar',
    overview: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.',
    poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    release_date: '2014-11-05',
  },
  {
    id: 'movie-3',
    title: 'Dune: Part Two',
    overview: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
    poster_path: '/1pdfLvkbY9ohJlCjQH2JGjjc95G.jpg',
    release_date: '2024-02-27',
  },
  {
    id: 'movie-4',
    title: 'Oppenheimer',
    overview: 'The story of J. Robert Oppenheimer\'s role in the development of the atomic bomb during World War II.',
    poster_path: '/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    release_date: '2023-07-19',
  },
  {
    id: 'movie-5',
    title: 'Spider-Man: Across the Spider-Verse',
    overview: 'After reuniting with Gwen Stacy, Brooklyn\'s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse.',
    poster_path: '/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    release_date: '2023-05-31',
  }
];

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }), // We will mock this response
  endpoints: (builder) => ({
    getTrendingMovies: builder.query<ContentItem[], void>({
      // Provide a mock query function that returns data instead of making a real request
      queryFn: async () => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const transformed: ContentItem[] = MOCK_MOVIES.map(movie => ({
          id: movie.id,
          type: 'movie',
          title: movie.title,
          description: movie.overview,
          // Use placehold.co to generate mock posters for the demo
          imageUrl: `https://placehold.co/600x400/1e1b4b/ffffff?text=${encodeURIComponent(movie.title)}`,
          url: `https://www.themoviedb.org/movie/${movie.id.replace('movie-', '')}`,
          date: movie.release_date,
          source: 'TMDB Recommendations',
        }));

        return { data: transformed };
      },
    }),
  }),
});

export const { useGetTrendingMoviesQuery } = tmdbApi;
