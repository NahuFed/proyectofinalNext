import ProfileHeader from '@/components/general/ProfileHeader';
import ProfileReviews from '@/components/general/ProfileReviews';

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

        {/* Stats Grid (dejamos la UI tal cual por ahora) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-gray-800 p-6 rounded-xl text-center shadow-lg">
            <p className="text-3xl font-bold text-blue-400">0</p>
            <p className="text-gray-400 mt-2">Reseñas</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl text-center shadow-lg">
            <p className="text-3xl font-bold text-purple-400">3</p>
            <p className="text-gray-400 mt-2">Calificaciones</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl text-center shadow-lg">
            <p className="text-3xl font-bold text-green-400">9.0</p>
            <p className="text-gray-400 mt-2">Promedio</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl text-center shadow-lg">
            <p className="text-3xl font-bold text-red-400">3</p>
            <p className="text-gray-400 mt-2">Películas vistas</p>
          </div>
        </div>

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
