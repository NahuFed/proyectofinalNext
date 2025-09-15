'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies, resetMovies } from '@/store/slices/moviesSlice';

const GENRES = [
  { label: 'Todos', value: 'all' },
  { label: 'Acción', value: 'Action' },
  { label: 'Drama', value: 'Drama' },
  { label: 'Crimen', value: 'Crime' },
  { label: 'Ciencia ficción', value: 'Sci-Fi' },
  { label: 'Suspenso', value: 'Thriller' },
];

export default function SearchBar() {
  const dispatch = useDispatch();
  const clearVersion = useSelector((s) => s.movies.clearVersion);
  const [q, setQ] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('all');

  useEffect(() => {
    setQ('');
    setYear('');
    setGenre('all');
  }, [clearVersion]);

  const onSubmit = (e) => {
    e.preventDefault();
    // 👇 ahora mandamos también genre (el reducer lo usaremos en el próximo paso)
    dispatch(searchMovies({ q, year, genre }));
  };

  const onClear = () => {
    setQ('');
    setYear('');
    setGenre('all');
    dispatch(resetMovies());
  };

  return (
    <form
      onSubmit={onSubmit}
      className="p-4 mx-[9px] rounded-lg border border-neutral-800 bg-fuchsia-800"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <input
          className="px-3 py-2 rounded bg-[#0F1525]  border border-neutral-700"
          placeholder="Título, género o año..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <select
          className="px-3 py-2 rounded bg-[#0F1525] text-neutral-100 border border-neutral-700"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          {GENRES.map((g) => (
            <option key={g.value} value={g.value}>
              {g.label}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1900"
          max="2100"
          className="px-3 py-2 rounded bg-[#0F1525] text-neutral-100 border border-neutral-700"
          placeholder="Año (ej. 2008)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 rounded bg-[#0F1525] text-white"
          >
            Buscar
          </button>
          <button
            type="button"
            onClick={onClear}
            className="px-4 py-2 rounded border bg-white text-[#0F1525] border-neutral-700 hover:bg-red-800"
          >
            Limpiar
          </button>
        </div>
      </div>
    </form>
  );
}
