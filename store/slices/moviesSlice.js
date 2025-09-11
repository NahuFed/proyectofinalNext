import { createSlice, createSelector } from "@reduxjs/toolkit";
import { movies, users, scores, comments } from "@/data/data";

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
  movies: movies.map((m) => ({
    ...m,
    averageScore: calculateAverage(m.id, scores),
  })),
  users,
  scores,
  comments,
};

//  SLICE 
const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // 1. Buscar películas
    searchMovies: (state, action) => {
      const query = action.payload.toLowerCase().trim();

      state.movies = state.movies
        .map((m) => ({
          ...m,
          averageScore: calculateAverage(m.id, state.scores),
        }))
        .filter(
          (m) =>
            m.title.toLowerCase().includes(query) ||
            m.genre.some((g) => g.toLowerCase().includes(query)) ||
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
      if (!text || text.trim() === "") return;

      state.comments.push({ userId, movieId, text: text.trim() });
    },
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

export default moviesSlice.reducer;
