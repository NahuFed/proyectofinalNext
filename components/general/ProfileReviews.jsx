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
        // 1) Traer usuario de la sesión
        const s = await fetch('/api/session', { cache: 'no-store' });
        if (!s.ok) throw new Error('No se pudo obtener la sesión');
        const sessionData = await s.json();
        const user = sessionData?.user || null;

        // intentar varias fuentes de id
        let userId = user?.id || sessionData?.userId || null;

        // 2) Si no hay id pero sí email, lo resolvemos en JSON Server
        if (!userId && user?.email) {
          const u = await fetch(
            `${API_BASE}/users?email=${encodeURIComponent(user.email)}`
          );
          if (!u.ok)
            throw new Error('No se pudo resolver el usuario por email');
          const arr = await u.json();
          userId = arr?.[0]?.id || null;
        }

        if (!userId) throw new Error('Sesión inválida');

        // 3) Traer reseñas del usuario + expandir película
        const r = await fetch(
          `${API_BASE}/reviews?userId=${encodeURIComponent(
            userId
          )}&_expand=movie&_sort=createdAt&_order=desc`
        );
        if (!r.ok) throw new Error('No se pudieron obtener tus reseñas');
        const data = await r.json();

        /* setItems(data || []); */
        let items = data || [];

        const needMovieFetch = items.some((it) => !it.movie);
        if (needMovieFetch && items.length) {
          const ids = [...new Set(items.map((it) => it.movieId))]; // ids únicos
          const qs = ids.map((id) => `id=${encodeURIComponent(id)}`).join('&');
          const mRes = await fetch(`${API_BASE}/movies?${qs}`);
          if (mRes.ok) {
            const moviesArr = await mRes.json();
            const byId = Object.fromEntries(
              (moviesArr || []).map((m) => [m.id, m])
            );
            items = items.map((it) => ({
              ...it,
              movie: byId[it.movieId] || it.movie || null,
            }));
          }
        }

        setItems(items);
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
