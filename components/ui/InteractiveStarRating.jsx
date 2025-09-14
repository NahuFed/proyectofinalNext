'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

const InteractiveStarRating = ({ 
  rating = 0, // Rating de 1-10
  maxRating = 10, // Máximo rating (1-10)
  maxStars = 5, // Número de estrellas a mostrar
  readonly = false,
  onRatingChange = () => {},
  showLabel = true,
  size = "md",
  className = ""
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(rating);

  // Convertir rating de 1-10 a escala de estrellas (1-5)
  const ratingToStars = (ratingValue) => ratingValue / 2;
  const starsToRating = (starValue) => starValue * 2;

  const handleClick = (starIndex, event) => {
    if (readonly) return;
    
    // Determinar si es click en media estrella o estrella completa
    const rect = event.target.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const isHalfStar = clickX < rect.width / 2;
    
    const starValue = starIndex + (isHalfStar ? 0.5 : 1);
    const newRating = starsToRating(starValue);
    
    setCurrentRating(newRating);
    onRatingChange(newRating);
  };

  const handleMouseEnter = (starIndex, event) => {
    if (readonly) return;
    
    const rect = event.target.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const isHalfStar = mouseX < rect.width / 2;
    
    const starValue = starIndex + (isHalfStar ? 0.5 : 1);
    const hoverValue = starsToRating(starValue);
    
    setHoverRating(hoverValue);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverRating(0);
  };

  const displayRating = hoverRating || currentRating || rating;
  const displayStars = ratingToStars(displayRating);

  // Configurar tamaños
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  };
  
  const textSizes = {
    sm: "text-sm",
    md: "text-base", 
    lg: "text-lg"
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-1">
        {[...Array(maxStars)].map((_, index) => {
          const starNumber = index + 1;
          const isFilled = starNumber <= displayStars;
          const isHalfFilled = starNumber - 0.5 <= displayStars && starNumber > displayStars;
          
          return (
            <div key={index} className="relative">
              <Star 
                className={`${sizes[size]} transition-all duration-150 ${
                  readonly 
                    ? 'cursor-default' 
                    : 'cursor-pointer hover:scale-110'
                } ${
                  isFilled 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'fill-gray-300 text-gray-300'
                } ${
                  !readonly && isFilled ? 'hover:fill-yellow-500 hover:text-yellow-500' : ''
                }`}
                onClick={(e) => handleClick(index, e)}
                onMouseEnter={(e) => handleMouseEnter(index, e)}
                onMouseLeave={handleMouseLeave}
              />
              {isHalfFilled && (
                <div className="absolute inset-0 overflow-hidden w-1/2">
                  <Star className={`${sizes[size]} fill-yellow-400 text-yellow-400`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {showLabel && (
        <span className={`${textSizes[size]} text-gray-700 dark:text-gray-300 font-medium`}>
          {displayRating.toFixed(1)}/10
        </span>
      )}
    </div>
  );
};

export default InteractiveStarRating;