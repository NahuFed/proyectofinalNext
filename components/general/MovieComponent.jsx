'use client';
import { useDispatch, useSelector } from 'react-redux';
import { MovieCard } from './MovieCard';
import { resetMovies } from '@/store/slices/moviesSlice';

const MovieComponent = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const total = movies.length;

  // Si no hay resultados, mostramos un mensaje
  if (total === 0) {
    return (
      <section className="container mx-auto px-3 md:px-6">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 text-center">
          <p className="text-neutral-300">
            No encontramos resultados con esos filtros.
          </p>
          <button
            onClick={() => dispatch(resetMovies())}
            className="mt-3 inline-flex items-center justify-center rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-100 hover:bg-neutral-800"
          >
            Limpiar filtros
          </button>
        </div>
      </section>
    );
  }

  // Renderizamos la lista de películas
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
