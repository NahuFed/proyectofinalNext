'use client';
import { useEffect, useState } from 'react';

export default function ProfileHeader() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/session', { cache: 'no-store' });
        if (!res.ok) throw new Error('No se pudo obtener la sesión');
        const data = await res.json();
        setUser(data?.user || null);
      } catch (e) {
        setError(e.message || 'Error de sesión');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="text-neutral-400">Cargando perfil…</p>;
  if (error || !user) {
    return (
      <p className="text-red-400">
        No pudimos cargar tu sesión. Iniciá sesión para ver tu perfil.
      </p>
    );
  }

  return (
    <section className="mb-6 rounded-xl border border-neutral-800 bg-neutral-900 p-4">
      <h2 className="text-xl font-semibold">Hola, {user.name || 'usuario'}</h2>
      <p className="text-neutral-400">{user.email}</p>
    </section>
  );
}
