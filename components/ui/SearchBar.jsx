'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchMovies } from '@/store/slices/moviesSlice';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [q, setQ] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(searchMovies(q)); // filtra desde allMovies
  };

  return (
    <form
      onSubmit={onSubmit}
      className="p-4 rounded-lg border border-neutral-800 bg-neutral-900"
    >
      <div className="flex gap-2">
        <input
          className="flex-1 px-3 py-2 rounded bg-neutral-800 text-neutral-100 border border-neutral-700"
          placeholder="Título, género o año..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 rounded bg-indigo-600 text-white"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
