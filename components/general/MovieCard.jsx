'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import StarRating from '../ui/StarRating';
import { Calendar, Clock, Star } from 'lucide-react';

const MovieCard = ({ 
  id,
  title = "Avatar: The Way of Water", 
  year = 2022, 
  duration = "192 min", 
  genre = "Acción, Aventura, Sci-Fi",
  poster = "/placeholder-movie.jpg",
  averageRating = 8.4,
  totalReviews = 1245 
}) => {
  const router = useRouter();

  const handleViewMore = () => {
    router.push(`/movies/${id}`);
  };
  return (
    <div className="bg-zinc-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 hover:bg-zinc-700 transition-all duration-300 group">
      {/* Poster Image */}
      <div className="relative h-64 bg-zinc-700 flex items-center justify-center">
        {poster ? (
          <img 
            src={poster} 
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        
        <div 
          className="text-zinc-500 flex items-center justify-center absolute inset-0"
          style={{ display: poster ? 'none' : 'flex' }}
        >
          <Star className="h-16 w-16" />
        </div>
        
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/70 rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="h-3 w-3 text-yellow-400 fill-current" />
          <span className="text-white text-sm font-semibold">{averageRating}</span>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-fuchsia-300 transition-colors">
          {title}
        </h3>
        
        <div className="flex items-center gap-4 text-zinc-400 text-sm mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{duration}</span>
          </div>
        </div>

        <p className="text-zinc-300 text-sm mb-3 line-clamp-2">
          {genre}
        </p>

        {/* Star Rating Component */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <StarRating 
              rating={averageRating} 
              size="sm"
              showLabel={true}
            />
            <span className="text-zinc-400 text-xs mt-1">
              {totalReviews} reseñas
            </span>
          </div>
          
          <button 
            onClick={handleViewMore}
            className="bg-fuchsia-800 hover:bg-fuchsia-700 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            Ver más
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;