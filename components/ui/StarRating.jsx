import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ 
  rating = 8.5, // Rating de 1-10
  maxRating = 10, // Máximo rating (1-10)
  maxStars = 5, // Número de estrellas a mostrar
  showLabel = true,
  size = "sm", // xs, sm, md, lg
  className = ""
}) => {
  // Asegurar que el rating esté entre 1 y maxRating
  const normalizedRating = Math.max(1, Math.min(rating, maxRating));
  
  // Convertir el rating de escala 1-10 a escala de estrellas (1-5)
  // Rating 1-2 = 1 estrella, 3-4 = 2 estrellas, etc.
  const starsRating = normalizedRating / 2;
  
  // Configurar tamaños
  const sizes = {
    xs: "h-3 w-3",
    sm: "h-4 w-4", 
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };
  
  const textSizes = {
    xs: "text-xs",
    sm: "text-xs",
    md: "text-sm", 
    lg: "text-base"
  };
  
  const gaps = {
    xs: "gap-0.5",
    sm: "gap-1",
    md: "gap-1",
    lg: "gap-2"
  };
  
  return (
    <div className={`flex items-center ${gaps[size]} ${className}`}>
      <div className="flex items-center">
        {[...Array(maxStars)].map((_, index) => {
          const starNumber = index + 1;
          const isFilled = starNumber <= starsRating;
          const isHalfFilled = starNumber - 0.5 <= starsRating && starNumber > starsRating;
          
          return (
            <div key={index} className="relative">
              <Star 
                className={`${sizes[size]} ${
                  isFilled 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-zinc-400'
                }`}
              />
              {isHalfFilled && (
                <div className="absolute inset-0 overflow-hidden w-1/2">
                  <Star className={`${sizes[size]} text-yellow-400 fill-current`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {showLabel && (
        <span className={`${textSizes[size]} text-zinc-300 font-medium ml-1`}>
          {normalizedRating.toFixed(1)}/10
        </span>
      )}
    </div>
  );
};

export default StarRating;