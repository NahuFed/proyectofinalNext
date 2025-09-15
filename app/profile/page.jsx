import ProfileHeader from '@/components/general/ProfileHeader';
import ProfileReviews from '@/components/general/ProfileReviews';
import ProfileStats from '@/components/general/ProfileStats';

export default function Page() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header visual del compañero */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            CineReview
          </h1>

          {/* Header con datos reales (name/email) */}
          <div className="mt-4">
            <ProfileHeader />
          </div>
        </div>

        {/* Stats dinámicos */}
        <ProfileStats />

        <div className="h-px bg-gray-700 my-8"></div>

        {/* Tabs (placeholder de UI) */}
        <div className="flex justify-center space-x-6 mb-8">
          <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg">
            Mis Reseñas
          </button>
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition duration-300">
            Mis Calificaciones
          </button>
        </div>

        <div className="h-px bg-gray-700 my-8"></div>

        {/* Reseñas reales (con empty state propio) */}
        <h2 className="text-xl font-semibold text-gray-300 mb-3">
          Mis reseñas
        </h2>
        <ProfileReviews />
      </div>
    </div>
  );
}
