'use client';

import React from 'react';
import MovieCard from './MovieCard';
import { movies, comments } from '@/data/data';

const MoviesGrid = () => {
  // Función para contar el número de comentarios por película
  const getReviewCount = (movieId) => {
    return comments.filter(comment => comment.movieId === movieId).length;
  };

  // Función para convertir género array a string
  const formatGenre = (genreArray) => {
    return genreArray.join(', ');
  };

  // Función para formatear duración (simulada ya que no está en data.js)
  const getDuration = (year) => {
    // Duración simulada basada en el año para demostración
    const durations = {
      1972: "175 min",
      1994: "142 min", 
      1997: "194 min",
      1999: "136 min",
      2000: "155 min",
      2008: "152 min",
      2010: "148 min",
      2014: "169 min"
    };
    return durations[year] || "120 min";
  };

  // Tomar las primeras 6 películas para mostrar
  const featuredMovies = movies.slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Películas Populares</h2>
        <p className="text-zinc-400">Descubre las películas mejor calificadas por nuestra comunidad</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {featuredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            year={movie.year}
            duration={getDuration(movie.year)}
            genre={formatGenre(movie.genre)}
            averageRating={movie.averageScore}
            totalReviews={getReviewCount(movie.id)}
            poster={movie.image}
          />
        ))}
      </div>
    </div>
  );
};

export default MoviesGrid;