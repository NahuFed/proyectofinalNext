import RankingsClient from '@/components/general/RankingsClient';
import { utils } from '@/services/api';


export const metadata = {
  title: "Ranking de Películas - CineReview",
  description:
    "Consulta el ranking de películas más populares en CineReview. Descubre cuáles son las más calificadas por la comunidad y encuentra tu próxima favorita.",
  keywords: [
    "ranking de películas",
    "películas populares",
    "mejores películas",
    "reseñas de cine",
    "CineReview",
    "calificaciones",
    "top películas",
  ],
  openGraph: {
    title: "Ranking de Películas - CineReview",
    description:
      "Explora el top de películas más vistas y mejor calificadas en CineReview.",
    url: "https://cinereview-sigma.vercel.app/ranking",
    siteName: "CineReview",
    images: [
      {
        url: "https://cinereview-sigma.vercel.app/logo.png",
        width: 512,
        height: 512,
        alt: "Logo de CineReview",
      },
    ],
    locale: "es_ES",
    type: "website",
  }
};


export default async function RankingsPage() {
  const movies = await utils.getMoviesWithRatings();
  return <RankingsClient movies={movies} />;
}
