import MovieComponent from '@/components/general/MovieComponent';
import { TrendingUp } from 'lucide-react';
import SearchBar from '@/components/ui/SearchBar';

export const metadata = {
  title: "Películas - CineReview",
  description:
    "Explora el catálogo de películas en CineReview. Busca por nombre, género o año, consulta sinopsis, reparto, director y deja tus reseñas y calificaciones.",
  keywords: [
    "películas",
    "reseñas",
    "calificaciones",
    "cine",
    "CineReview",
    "ranking de películas",
    "sinopsis de películas",
  ],
  openGraph: {
    title: "Películas - CineReview",
    description:
      "Descubre películas, explora detalles, deja reseñas y califica tus favoritas en CineReview.",
    url: "https://cinereview-sigma.vercel.app/movies",
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



const page = () => {
  return (
    <div className='mx-6'>
      <h1 className="text-start text-5xl font-black px-3 py-5">Explorar peliculas</h1>
      <p className="font-black px-4 py-2 text-gray-300">Descubre tu proxima pelicula favorita </p>
      <div className="p-2">
        <SearchBar />
      </div>
      <p className="text-3xl flex p-2 m-2 px-4 font-bold text-gray-300">
        <span>
          <TrendingUp className="text-fuchsia-800" size={40} />
        </span>
        Mejor calificadas
      </p>

      <div>
        <MovieComponent />
      </div>
    </div>
  );
};

export default page;
