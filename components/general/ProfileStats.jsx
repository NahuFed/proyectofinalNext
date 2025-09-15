'use client';
import { useEffect, useState } from 'react';

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export default function ProfileStats() {
  const [stats, setStats] = useState({
    reviews: 0,
    ratings: 0,
    avg: 0,
    seen: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // sesión
        const s = await fetch('/api/session', { cache: 'no-store' });
        const { user } = await s.json();

        // resolver userId (por id directo o por email en JSON Server)
        let userId = user?.id || null;
        if (!userId && user?.email) {
          const u = await fetch(
            `${API_BASE}/users?email=${encodeURIComponent(user.email)}`
          );
          const arr = await u.json();
          userId = arr?.[0]?.id || null;
        }
        if (!userId) throw new Error('Sesión inválida');

        // reviews del usuario
        const r = await fetch(
          `${API_BASE}/reviews?userId=${encodeURIComponent(userId)}`
        );
        const data = await r.json();

        const ratings = data.filter((it) => typeof it.rating === 'number');
        const reviewsWithComment = data.filter(
          (it) => it.comment && it.comment.trim() !== ''
        );
        const avg =
          ratings.length > 0
            ? Math.round(
                (ratings.reduce((acc, it) => acc + Number(it.rating || 0), 0) /
                  ratings.length) *
                  10
              ) / 10
            : 0;
        const seen = new Set(data.map((it) => it.movieId)).size;

        setStats({
          reviews: reviewsWithComment.length,
          ratings: ratings.length,
          avg,
          seen,
        });
      } catch {
        setStats({ reviews: 0, ratings: 0, avg: 0, seen: 0 });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const Card = ({ value, label, color }) => (
    <div className="bg-gray-800 p-6 rounded-xl text-center shadow-lg">
      <p className={`text-3xl font-bold ${color}`}>{loading ? '…' : value}</p>
      <p className="text-gray-400 mt-2">{label}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      <Card value={stats.reviews} label="Reseñas" color="text-blue-400" />
      <Card
        value={stats.ratings}
        label="Calificaciones"
        color="text-purple-400"
      />
      <Card
        value={stats.avg.toFixed(1)}
        label="Promedio"
        color="text-green-400"
      />
      <Card value={stats.seen} label="Películas vistas" color="text-red-400" />
    </div>
  );
}
