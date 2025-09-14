'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

const ValoracionConEstrellas = ({ 
  rating = 0,
  maxStars = 5,
  size = 16,
  readonly = true,
  interactive = false,
  onRatingChange = () => {},
  showRating = true,
  className = ""
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(rating);

  const handleClick = (star) => {
    if (readonly || !interactive) return;
    setCurrentRating(star);
    onRatingChange(star);
  };

  const handleMouseEnter = (star) => {
    if (readonly || !interactive) return;
    setHoverRating(star);
  };

  const handleMouseLeave = () => {
    if (readonly || !interactive) return;
    setHoverRating(0);
  };

  const displayRating = hoverRating || currentRating || rating;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {/* Estrellas */}
      <div className="flex items-center">
        {[...Array(maxStars)].map((_, index) => {
          const starNumber = index + 1;
          const isFilled = starNumber <= displayRating;
          
          return (
            <Star
              key={index}
              size={size}
              className={`
                transition-all duration-150
                ${readonly || !interactive 
                  ? 'cursor-default' 
                  : 'cursor-pointer hover:scale-110'
                }
                ${isFilled 
                  ? 'fill-yellow-400 text-yellow-400' 
                  : 'fill-gray-200 text-gray-200'
                }
                ${!readonly && interactive && isFilled ? 'hover:fill-yellow-500 hover:text-yellow-500' : ''}
              `}
              onClick={() => handleClick(starNumber)}
              onMouseEnter={() => handleMouseEnter(starNumber)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
      </div>
      
      {/* Rating numérico */}
      {showRating && (
        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          {displayRating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default ValoracionConEstrellas;
