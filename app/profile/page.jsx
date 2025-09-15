import React from "react";

const page = () => {
  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            CineReview
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-300">
            Usuario Actual
          </h2>
          <p className="text-gray-400 mt-2">Miembro desde Enero 2024</p>
        </div>

        {/* Stats Grid */}
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

        {/* Tabs */}
        <div className="flex justify-center space-x-6 mb-8">
          <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg">
            Mis Reseñas (0)
          </button>
          <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition duration-300">
            Mis Calificaciones (3)
          </button>
        </div>

        <div className="h-px bg-gray-700 my-8"></div>

        {/* Empty State */}
        <div className="text-center py-12 bg-gray-800 rounded-xl shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-300 mb-4">
            No has escrito reseñas aún
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Explora películas y comparte tu opinión con la comunidad
          </p>
        </div>

        <div className="h-px bg-gray-700 my-8"></div>

        {/* CTA Button */}
        <div className="text-center mt-10">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105">
            Explorar Películas
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
