
import CardsHome from "@/components/general/CardsHome";
import Link from "next/link";

export const metadata = {
  title: "CineReview - Tu portal de reseñas de películas",
  description:
    "Descubre películas, deja tus reseñas y calificaciones, explora el ranking de las más populares y consulta sinopsis, reparto y director. CineReview es tu espacio para opinar sobre cine.",
  keywords: [
    "CineReview",
    "reseñas de películas",
    "calificaciones de cine",
    "ranking películas",
    "sinopsis",
    "reparto",
    "directores",
    "reseñas online",
  ],
  authors: [{ name: "CineReview Team" }],
  openGraph: {
    title: "CineReview - Reseñas y Calificaciones de Películas",
    description:
      "Explora, califica y reseña películas. Consulta detalles, sinopsis y el ranking de las más populares en CineReview.",
    url: "https://cinereview-sigma.vercel.app/",
    siteName: "CineReview",
    images: [
      {
        url: "https://cinereview-sigma.vercel.app/logo.png", 
        width: 600,
        height: 300,
        alt: "CineReview - Reseñas y Calificaciones de Películas",
      },
    ],
    locale: "es_ES",
    type: "website",
  }
};




export default function Home() {
  return (
    <div>
      <h1 className="text-center text-5xl font-bold m-5 p-2">
        Descubre el mundo del <span className="text-fuchsia-800">cine</span>{" "}
      </h1>
      <p className="text-center text-2xl m-5 p-2">
        Explora miles de peliculas, lee reseñas auténticas y comparte tu opinion <br/>
        <span className="">con una comunidad apasionada por el cine.</span>
      </p>
      <div className="flex justify-center gap-4 m-5 p-2">
      <Link className="bg-fuchsia-800 p-2 rounded w-[200px] text-center" href={"/"}>Comenzar ahora</ Link>
      <Link className="p-2 border rounded  w-[200px] text-center" href={'/movies'}>Explorar Peliculas</Link>
      </div>
      <div className="m-5 p-2">
        {/* Aquí puedes agregar el componente CardsHome */}
        <CardsHome/>
        </div>
    </div>


  );
}
