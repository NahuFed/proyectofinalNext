'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { reviewsAPI, utils } from '@/services/api';
import InteractiveStarRating from '@/components/ui/InteractiveStarRating';
import StarRating from '@/components/ui/StarRating';
import { Calendar, Clock, Star, User, MessageCircle, ArrowBigLeft, ArrowLeft, MoveLeft } from 'lucide-react';
import Link from 'next/link';

const MovieDetailPage = () => {
  const params = useParams();
  const movieId = params.id;
  
  // Usar Redux para obtener la película básica
  const movies = useSelector((state) => state.movies.movies);
  const movie = movies.find(m => m.id === movieId);
  
  // Estados para datos de la API
  const [movieReviews, setMovieReviews] = useState([]);
  const [calculatedRating, setCalculatedRating] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Estados para la nueva calificación y reseña
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Cargar reseñas al montar el componente
  useEffect(() => {
    const loadMovieData = async () => {
      try {
        setLoading(true);
        const reviews = await reviewsAPI.getByMovieId(movieId);
        setMovieReviews(reviews);
        
        // Calcular rating promedio
        const avgRating = await utils.calculateMovieRating(movieId);
        setCalculatedRating(avgRating);
      } catch (error) {
        console.error('Error loading movie data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      loadMovieData();
    }
  }, [movieId]);
  
  // Obtener comentarios de esta película (mantenemos comentarios legacy)
  const movieComments = movieReviews;
  
  if (!movie) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Película no encontrada</h1>
          <p className="text-zinc-400">La película que buscas no existe o ha sido eliminada.</p>
        </div>
      </div>
    );
  }

  const handleRatingChange = (rating) => {
    setUserRating(rating);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (userRating === 0) {
      alert('Por favor selecciona una calificación');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Crear nueva reseña en json-server
      const newReview = await reviewsAPI.create({
        userId: "u001", // TODO: Usar usuario autenticado real
        movieId: movieId,
        rating: userRating,
        comment: userReview
      });
      
      // Actualizar estado local
      setMovieReviews(prevReviews => [...prevReviews, newReview]);
      
      // Recalcular rating
      const updatedRating = await utils.calculateMovieRating(movieId);
      setCalculatedRating(updatedRating);
      
      // Resetear formulario
      setUserRating(0);
      setUserReview('');
      
      alert('¡Reseña enviada correctamente!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error al enviar la reseña. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="mb-4 px-4 mt-5">
            <MoveLeft className="inline h-6 w-6 text-gray-300 mr-2"/>
            <Link href={"/movies"}  ><strong className="text-gray-300 text-2xl">Volver</strong></Link>
        </div>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Poster */}
          <div className="lg:col-span-1">
            <div className="relative">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-auto rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.src = '/placeholder-movie.jpg';
                }}
              />
              <div className="absolute top-4 right-4 bg-black/70 rounded-full px-3 py-2 flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-white font-semibold">
                  {loading ? '...' : calculatedRating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            
            <div className="flex items-center gap-6 text-zinc-400 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{movie.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>155 min</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Géneros</h3>
              <div className="flex flex-wrap gap-2">
                {movie.genre.map((g, index) => (
                  <span 
                    key={index}
                    className="bg-fuchsia-800 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Sinopsis</h3>
              <p className="text-zinc-300 leading-relaxed">{movie.synopsis}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Reparto</h3>
              <div className="flex flex-wrap gap-2">
                {movie.cast.map((actor, index) => (
                  <span 
                    key={index}
                    className="bg-zinc-700 text-white px-3 py-1 rounded text-sm"
                  >
                    {actor}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <StarRating 
                rating={loading ? 0 : calculatedRating} 
                size="lg" 
                showLabel={true}
              />
              <span className="text-zinc-400">
                {loading ? 'Cargando...' : `${movieComments.length} reseñas`}
              </span>
            </div>
          </div>
        </div>

        {/* Rating Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calificar película */}
          <div className="bg-zinc-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Califica esta película</h2>
            
            <form onSubmit={handleSubmitReview}>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">
                  Tu calificación (1-10):
                </label>
                <InteractiveStarRating
                  rating={userRating}
                  onRatingChange={handleRatingChange}
                  readonly={false}
                  size="lg"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="review" className="block text-sm font-medium mb-3">
                  Tu reseña (opcional):
                </label>
                <textarea
                  id="review"
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                  placeholder="Comparte tu opinión sobre esta película..."
                  className="w-full h-32 px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || userRating === 0}
                className="w-full bg-fuchsia-800 hover:bg-fuchsia-700 disabled:bg-zinc-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Reseña'}
              </button>
            </form>
          </div>

          {/* Reseñas existentes */}
          <div className="bg-zinc-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Reseñas de usuarios</h2>
            
            <div className="space-y-4">
              {movieComments.length > 0 ? (
                movieComments.map((review, index) => (
                  <div key={review.id || index} className="border-b border-zinc-700 pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-zinc-400" />
                        <span className="font-medium">Usuario {review.userId}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{review.rating}/10</span>
                      </div>
                    </div>
                    <p className="text-zinc-300">{review.comment}</p>
                    {review.createdAt && (
                      <p className="text-xs text-zinc-500 mt-2">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center text-zinc-400 py-8">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Aún no hay reseñas para esta película.</p>
                  <p className="text-sm">¡Sé el primero en dejar una!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;