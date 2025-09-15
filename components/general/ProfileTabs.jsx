'use client';
import { useState } from 'react';
import ProfileReviews from '@/components/general/ProfileReviews';

export default function ProfileTabs() {
  const [tab, setTab] = useState('reviews');

  const btnBase = 'px-4 py-2 font-medium rounded-lg transition duration-300';
  const btnActive = 'bg-blue-600 text-white';
  const btnIdle = 'bg-gray-700 hover:bg-gray-600 text-white';

  return (
    <>
      {/* Botones */}
      <div className="flex justify-center space-x-6 mb-8">
        <button
          className={`${btnBase} ${tab === 'reviews' ? btnActive : btnIdle}`}
          onClick={() => setTab('reviews')}
        >
          Mis Reseñas
        </button>
        <button
          className={`${btnBase} ${tab === 'ratings' ? btnActive : btnIdle}`}
          onClick={() => setTab('ratings')}
        >
          Mis Calificaciones
        </button>
      </div>

      {/* Contenido */}
      {tab === 'reviews' ? (
        <>
          <h2 className="text-xl font-semibold text-gray-300 mb-3">
            Mis reseñas
          </h2>
          <ProfileReviews />
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-gray-300 mb-3">
            Mis calificaciones
          </h2>
          <p className="text-neutral-400">
            Próximo paso: listar solo calificaciones.
          </p>
        </>
      )}
    </>
  );
}
