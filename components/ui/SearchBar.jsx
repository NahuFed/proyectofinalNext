'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchMovies, resetMovies } from '@/store/slices/moviesSlice';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [q, setQ] = useState('');
  const [year, setYear] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(searchMovies({ q, year })); // 🔎 ahora manda objeto { q, year }
  };

  const onClear = () => {
    setQ('');
    setYear('');
    dispatch(resetMovies());
  };

  return (
    <form
      onSubmit={onSubmit}
      className="p-4 rounded-lg border border-neutral-800 bg-neutral-900"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <input
          className="px-3 py-2 rounded bg-neutral-800 text-neutral-100 border border-neutral-700"
          placeholder="Título, género o año..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <input
          type="number"
          min="1900"
          max="2100"
          className="px-3 py-2 rounded bg-neutral-800 text-neutral-100 border border-neutral-700"
          placeholder="Año (ej. 2010)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="px-4 py-2 rounded bg-indigo-600 text-white"
          >
            Buscar
          </button>
          <button
            type="button"
            onClick={onClear}
            className="px-4 py-2 rounded border border-neutral-700 text-neutral-200 hover:bg-neutral-800"
          >
            Limpiar
          </button>
        </div>
      </div>
    </form>
  );
}
