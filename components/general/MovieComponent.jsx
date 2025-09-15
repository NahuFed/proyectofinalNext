'use client';
import { useSelector } from 'react-redux';
import { MovieCard } from './MovieCard';

const MovieComponent = () => {
  const movies = useSelector((state) => state.movies.movies);
  const total = movies.length;

  return (
    <section className="container mx-auto px-3 md:px-6">
      {/*--------- contador simple ---------*/}
      <div className="flex items-center justify-between py-2">
        <p className="text-sm text-neutral-300">
          Mostrando {total} resultado{total === 1 ? '' : 's'}
        </p>
      </div>
      {/*-------------- Películas -------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </section>
  );
};

export default MovieComponent;
