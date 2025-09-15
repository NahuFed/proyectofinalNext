import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { movies, users, scores, comments } from '@/data/data';
import { utils, reviewsAPI } from '@/services/api';

//  ASYNC THUNKS para API calls
export const fetchMoviesWithRatings = createAsyncThunk(
  'movies/fetchMoviesWithRatings',
  async () => {
    try {
      const moviesWithRatings = await utils.getMoviesWithRatings();
      return moviesWithRatings;
    } catch (error) {
      // Fallback a datos locales si falla la API
      console.warn('API fallback: using local data', error);
      return movies.map((m) => ({
        ...m,
        averageScore: calculateAverage(m.id, scores),
        reviewsCount: 0,
      }));
    }
  }
);

export const addReview = createAsyncThunk(
  'movies/addReview',
  async ({ movieId, userId, rating, comment }) => {
    const newReview = await reviewsAPI.create({
      userId,
      movieId,
      rating,
      comment,
    });

    // Recalcular rating de la película
    const updatedRating = await utils.calculateMovieRating(movieId);

    return {
      review: newReview,
      movieId,
      updatedRating,
    };
  }
);

//  HELPERS
const calculateAverage = (movieId, scores) => {
  const movieScores = scores.filter((s) => s.movieId === movieId);
  return movieScores.length
    ? +(
        movieScores.reduce((acc, curr) => acc + curr.score, 0) /
        movieScores.length
      ).toFixed(1)
    : 0;
};

const initialState = {
  allMovies: movies.map((m) => ({
    ...m,
    averageScore: calculateAverage(m.id, scores),
    reviewsCount: 0,
  })),
  movies: movies.map((m) => ({
    ...m,
    averageScore: calculateAverage(m.id, scores),
    reviewsCount: 0,
  })),
  users,
  scores,
  comments,
  loading: false,
  error: null,
  usingAPI: false, // Flag para saber si estamos usando API o datos locales
};

//  SLICE
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    // 1. Buscar películas
    searchMovies: (state, action) => {
      const query = (action.payload ?? '').toLowerCase().trim();

      const base =
        Array.isArray(state.allMovies) && state.allMovies.length
          ? state.allMovies
          : state.movies;

      state.movies = base
        .map((m) => ({
          ...m,
          averageScore: calculateAverage(m.id, state.scores),
        }))
        .filter(
          (m) =>
            m.title?.toLowerCase().includes(query) ||
            (Array.isArray(m.genre) &&
              m.genre.some((g) => g.toLowerCase().includes(query))) ||
            String(m.year).includes(query)
        );
    },

    // 2. Reset filtros
    resetMovies: (state) => {
      state.movies = movies.map((m) => ({
        ...m,
        averageScore: calculateAverage(m.id, state.scores),
      }));
    },

    // 3. Agregar / actualizar puntuación
    addRating: (state, action) => {
      const { userId, movieId, score } = action.payload;
      const parsedScore = Number(score);

      if (!Number.isInteger(parsedScore) || parsedScore < 1 || parsedScore > 5)
        return;

      const existing = state.scores.find(
        (s) => s.userId === userId && s.movieId === movieId
      );

      if (existing) {
        existing.score = parsedScore;
      } else {
        state.scores.push({ userId, movieId, score: parsedScore });
      }

      // Recalcular promedio de la película
      const movie = state.movies.find((m) => m.id === movieId);
      if (movie) {
        movie.averageScore = calculateAverage(movieId, state.scores);
      }
    },

    // 4. Agregar comentario
    addComment: (state, action) => {
      const { userId, movieId, text } = action.payload;

      if (!userId || !movieId) return;
      if (!text || text.trim() === '') return;

      state.comments.push({ userId, movieId, text: text.trim() });
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchMoviesWithRatings
      .addCase(fetchMoviesWithRatings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesWithRatings.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
        state.allMovies = action.payload;
        state.movies = action.payload;
        state.usingAPI = true;
      })
      .addCase(fetchMoviesWithRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.usingAPI = false;
      })
      // addReview
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        const { movieId, updatedRating } = action.payload;

        // Actualizar rating de la película
        const movie = state.movies.find((m) => m.id === movieId);
        if (movie) {
          movie.averageScore = updatedRating;
          movie.reviewsCount = (movie.reviewsCount || 0) + 1;
        }
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

//  SELECTORS

// Seleccionar una película por ID
export const selectMovieById = (id) =>
  createSelector([(state) => state.movies.movies], (movies) =>
    movies.find((m) => m.id === id)
  );

// Seleccionar comentarios de una película
export const selectCommentsByMovie = (movieId) =>
  createSelector([(state) => state.movies.comments], (comments) =>
    comments.filter((c) => c.movieId === movieId)
  );

// Seleccionar comentarios de un usuario
export const selectCommentsByUser = (userId) =>
  createSelector([(state) => state.movies.comments], (comments) =>
    comments.filter((c) => c.userId === userId)
  );

// Verificar si un usuario ya calificó una película
export const hasUserRatedMovie = (userId, movieId) =>
  createSelector([(state) => state.movies.scores], (scores) =>
    scores.some((s) => s.userId === userId && s.movieId === movieId)
  );

export const { searchMovies, resetMovies, addRating, addComment } =
  moviesSlice.actions;

export { fetchMoviesWithRatings, addReview };

export default moviesSlice.reducer;
