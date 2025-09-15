'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export default function ProfileReviews() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        // 1) Traer usuario
        const s = await fetch('/api/session', { cache: 'no-store' });
        if (!s.ok) throw new Error('No se pudo obtener la sesión');
        const { user } = await s.json();
        if (!user?.id) throw new Error('Sesión inválida');

        // 2) Traer reseñas del usuario + expandir película
        const r = await fetch(
          `${API_BASE}/reviews?userId=${encodeURIComponent(
            user.id
          )}&_expand=movie&_sort=createdAt&_order=desc`
        );
        if (!r.ok) throw new Error('No se pudieron obtener tus reseñas');
        const data = await r.json();

        setItems(data || []);
      } catch (e) {
        setError(e.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="text-neutral-400">Cargando reseñas…</p>;
  if (error) return <p className="text-red-400">{error}</p>;
  if (!items.length) {
    return (
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
        <p className="text-neutral-300">Todavía no escribiste reseñas.</p>
        <Link
          href="/movies"
          className="mt-3 inline-block rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-100 hover:bg-neutral-800"
        >
          Explorar películas
        </Link>
      </div>
    );
  }

  return (
    <section className="space-y-3">
      {items.map((rev) => (
        <article
          key={rev.id}
          className="flex gap-3 rounded-xl border border-neutral-800 bg-neutral-900 p-3"
        >
          {/* Poster */}
          <div className="w-28 h-16 overflow-hidden rounded">
            <img
              src={rev.movie?.image}
              alt={rev.movie?.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <Link
              href={`/movies/${rev.movieId}`}
              className="font-semibold hover:text-fuchsia-500"
            >
              {rev.movie?.title || 'Película'}
            </Link>
            <div className="text-sm text-neutral-400">
              <span className="font-medium text-neutral-200">
                {rev.rating}/10
              </span>{' '}
              · {new Date(rev.createdAt).toLocaleDateString()}
            </div>
            {rev.comment ? (
              <p className="mt-1 text-sm text-neutral-200 line-clamp-2">
                {rev.comment}
              </p>
            ) : null}
          </div>
        </article>
      ))}
    </section>
  );
}
