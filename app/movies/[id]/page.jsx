import MovieDetail from "@/components/movies/MovieDetail";
import { moviesAPI } from "@/services/api";

export async function generateMetadata({ params }) {
  const { id } = await params;

  let movie;
  try {
    movie = await moviesAPI.getById(id);
  } catch (error) {
    console.error("Error fetching movie for metadata:", error);
  }

  if (!movie) {
    return {
      title: "Película no encontrada - CineReview",
      description: "La película que buscas no existe o fue eliminada.",
    };
  }

  return {
    title: `${movie.title} (${movie.year}) - CineReview`,
    description:
      movie.synopsis ||
      "Descubre detalles, reparto y reseñas de esta película en CineReview.",
    openGraph: {
      title: `${movie.title} (${movie.year}) - CineReview`,
      description:
        movie.synopsis ||
        "Descubre detalles, reparto y reseñas de esta película en CineReview.",
      url: `https://cinereview-sigma.vercel.app/movies/${id}`,
      siteName: "CineReview",
      images: [
        {
          url: movie.image || "https://cinereview-sigma.vercel.app/logo.png",
          width: 800,
          height: 1200,
          alt: `Poster de ${movie.title}`,
        },
      ],
      locale: "es_ES",
      type: "video.movie",
    },
    twitter: {
      card: "summary_large_image",
      title: `${movie.title} - CineReview`,
      description:
        movie.synopsis || "Consulta detalles y reseñas en CineReview.",
      images: [movie.image || "https://cinereview-sigma.vercel.app/logo.png"],
    },
  };
}

export default async function MovieDetailPage({ params }) {
  const { id } = await params;
  return <MovieDetail id={id} />;
}