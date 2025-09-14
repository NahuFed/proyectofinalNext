
import CardsHome from "@/components/general/CardsHome";
import MoviesGrid from "@/components/general/MoviesGrid";
import Link from "next/link";
//import Prueba from "@/components/Prueba";





export default function Home() {
  return (
    <div>

    {/* <Prueba />  */}
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
        {/* Características principales */}
        <CardsHome/>
      </div>
      
      {/* Grid de películas populares */}
      <MoviesGrid/>
    </div>


  );
}
