// API Service para comunicarse con json-server
const API_BASE_URL = 'http://localhost:3001';

// ==================== MOVIES ====================
export const moviesAPI = {
  // Obtener todas las películas
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/movies`);
    if (!response.ok) throw new Error('Error fetching movies');
    return response.json();
  },

  // Obtener película por ID
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/movies/${id}`);
    if (!response.ok) throw new Error('Error fetching movie');
    return response.json();
  }
};

// ==================== REVIEWS ====================
export const reviewsAPI = {
  // Obtener todas las reseñas
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/reviews`);
    if (!response.ok) throw new Error('Error fetching reviews');
    return response.json();
  },

  // Obtener reseñas por película
  getByMovieId: async (movieId) => {
    const response = await fetch(`${API_BASE_URL}/reviews?movieId=${movieId}`);
    if (!response.ok) throw new Error('Error fetching movie reviews');
    return response.json();
  },

  // Obtener reseñas por usuario
  getByUserId: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/reviews?userId=${userId}`);
    if (!response.ok) throw new Error('Error fetching user reviews');
    return response.json();
  },

  // Verificar si un usuario ya tiene reseña para una película
  getUserReviewForMovie: async (userId, movieId) => {
    const response = await fetch(`${API_BASE_URL}/reviews?userId=${userId}&movieId=${movieId}`);
    if (!response.ok) throw new Error('Error fetching user review');
    const reviews = await response.json();
    return reviews.length > 0 ? reviews[0] : null;
  },

  // Crear nueva reseña
  create: async (reviewData) => {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...reviewData,
        id: `r${Date.now()}`, // ID único basado en timestamp
        createdAt: new Date().toISOString()
      })
    });
    if (!response.ok) throw new Error('Error creating review');
    return response.json();
  },

  // Crear o actualizar reseña (upsert)
  createOrUpdate: async (userId, movieId, reviewData) => {
    // Verificar si ya existe una reseña
    const existingReview = await reviewsAPI.getUserReviewForMovie(userId, movieId);
    
    if (existingReview) {
      // Actualizar reseña existente
      return await reviewsAPI.update(existingReview.id, {
        ...reviewData,
        userId,
        movieId
      });
    } else {
      // Crear nueva reseña
      return await reviewsAPI.create({
        ...reviewData,
        userId,
        movieId
      });
    }
  },

  // Actualizar reseña
  update: async (id, reviewData) => {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...reviewData,
        updatedAt: new Date().toISOString()
      })
    });
    if (!response.ok) throw new Error('Error updating review');
    return response.json();
  },

  // Eliminar reseña
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Error deleting review');
    return response.json();
  }
};

// ==================== USERS ====================
export const usersAPI = {
  // Obtener todos los usuarios
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error('Error fetching users');
    return response.json();
  },

  // Obtener usuario por ID
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    if (!response.ok) throw new Error('Error fetching user');
    return response.json();
  }
};

// ==================== UTILIDADES ====================

// Función auxiliar para calcular rating promedio
const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Number((totalRating / reviews.length).toFixed(1));
};

export const utils = {
  // Calcular promedio de rating para una película
  calculateMovieRating: async (movieId) => {
    const reviews = await reviewsAPI.getByMovieId(movieId);
    return calculateAverageRating(reviews);
  },

  // Obtener datos completos de una película con reseñas
  getMovieWithReviews: async (movieId) => {
    const [movie, reviews] = await Promise.all([
      moviesAPI.getById(movieId),
      reviewsAPI.getByMovieId(movieId)
    ]);

    return {
      ...movie,
      reviews,
      averageScore: calculateAverageRating(reviews),
      reviewsCount: reviews.length
    };
  },

  // Obtener reseñas de una película con nombres de usuarios
  getMovieReviewsWithUserNames: async (movieId) => {
    const [reviews, users] = await Promise.all([
      reviewsAPI.getByMovieId(movieId),
      usersAPI.getAll()
    ]);

    // Enriquecer reseñas con información del usuario
    const reviewsWithUserNames = reviews.map(review => {
      const user = users.find(u => u.id === review.userId);
      
      return {
        ...review,
        userName: user ? user.name : `Usuario ${review.userId}`,
        userEmail: user ? user.email : null
      };
    });

    return reviewsWithUserNames;
  },

  // Obtener todas las películas con sus ratings calculados
  getMoviesWithRatings: async () => {
    const [movies, reviews] = await Promise.all([
      moviesAPI.getAll(),
      reviewsAPI.getAll()
    ]);

    return movies.map(movie => {
      const movieReviews = reviews.filter(review => review.movieId === movie.id);
      return {
        ...movie,
        averageScore: calculateAverageRating(movieReviews),
        reviewsCount: movieReviews.length
      };
    });
  }
};