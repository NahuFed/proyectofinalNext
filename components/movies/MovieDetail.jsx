// app/movies/[id]/MovieDetailClient.js
"use client";

import React, { useState } from "react";
import { reviewsAPI, utils } from "@/services/api";
import InteractiveStarRating from "@/components/ui/InteractiveStarRating";
import StarRating from "@/components/ui/StarRating";
import { Calendar, Clock, Star, User, MessageCircle } from "lucide-react";

const MovieDetailClient = ({ movieData }) => {
  const {
    id,
    title,
    year,
    image,
    genre,
    synopsis,
    cast,
    reviews,
    averageScore,
  } = movieData;

  // Estado local de reseñas
  const [movieReviews, setMovieReviews] = useState(reviews);
  const [calculatedRating, setCalculatedRating] = useState(averageScore);

  // Form
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (userRating === 0) {
      alert("Por favor selecciona una calificación");
      return;
    }

    setIsSubmitting(true);
    try {
      const newReview = await reviewsAPI.create({
        userId: "u001", // luego reemplazar por usuario logueado
        movieId: id,
        rating: userRating,
        comment: userReview,
      });

      // Actualizar estado
      const updatedReviews = [...movieReviews, newReview];
      setMovieReviews(updatedReviews);

      // Recalcular promedio
      const updatedRating = await utils.calculateMovieRating(id);
      setCalculatedRating(updatedRating);

      // Reset form
      setUserRating(0);
      setUserReview("");
      alert("¡Reseña enviada correctamente!");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Error al enviar la reseña. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="relative">
            <img
              src={image}
              alt={title}
              className="w-full rounded-lg shadow-lg"
            />
            <div className="absolute top-4 right-4 bg-black/70 rounded-full px-3 py-2 flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="font-semibold">
                {calculatedRating.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <div className="flex gap-6 text-zinc-400 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> <span>{year}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" /> <span>155 min</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Géneros</h3>
              <div className="flex flex-wrap gap-2">
                {genre.map((g, i) => (
                  <span
                    key={i}
                    className="bg-fuchsia-800 px-3 py-1 rounded-full text-sm"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-zinc-300 mb-6">{synopsis}</p>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Reparto</h3>
              <div className="flex flex-wrap gap-2">
                {cast.map((actor, i) => (
                  <span
                    key={i}
                    className="bg-zinc-700 px-3 py-1 rounded text-sm"
                  >
                    {actor}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <StarRating rating={calculatedRating} size="lg" showLabel />
              <span className="text-zinc-400">
                {movieReviews.length} reseñas
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div className="bg-zinc-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Califica esta película</h2>
            <form onSubmit={handleSubmitReview}>
              <InteractiveStarRating
                rating={userRating}
                onRatingChange={setUserRating}
                size="lg"
              />
              <textarea
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
                className="w-full h-32 mt-4 px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg"
                placeholder="Escribe tu reseña..."
              />
              <button
                type="submit"
                disabled={isSubmitting || userRating === 0}
                className="mt-4 w-full bg-fuchsia-800 hover:bg-fuchsia-700 disabled:bg-zinc-600 text-white py-3 rounded-lg"
              >
                {isSubmitting ? "Enviando..." : "Enviar Reseña"}
              </button>
            </form>
          </div>

          <div className="bg-zinc-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Reseñas de usuarios</h2>
            {movieReviews.length > 0 ? (
              <div className="space-y-4">
                {movieReviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-zinc-700 pb-4"
                  >
                    <div className="flex justify-between mb-2">
                      <div className="flex gap-2 items-center">
                        <User className="h-5 w-5 text-zinc-400" />
                        <span>Usuario {review.userId}</span>
                      </div>
                      <span className="flex gap-1 items-center text-yellow-400">
                        <Star className="h-4 w-4 fill-current" />
                        {review.rating}/10
                      </span>
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-zinc-400 py-8">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Aún no hay reseñas. ¡Sé el primero!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailClient;
