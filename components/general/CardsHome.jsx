import { Star, Users, TrendingUp, User } from "lucide-react";
import React from "react";
import StarRating from "../ui/StarRating";


const CardsHome = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-5 p-2">
      <div className="bg-zinc-800 rounded p-2 m-2 hover:scale-105 hover:bg-zinc-700 transition-all duration-300 h-[260px] flex flex-col items-center justify-center">
        <Star className="h-12 w-12 text-primary mb-4 text-fuchsia-800"/>
        <p className="text-xl text-center">Sistema de Calificacion</p>
        <p className="text-center">
          Califica peliculas del 1 al 10 y descubre los promedios de la
          comunidad
        </p>
      </div>
      <div className="bg-zinc-800 rounded p-2 m-2 hover:scale-105 hover:bg-zinc-700 transition-all duration-300 h-[260px] flex flex-col items-center justify-center">
        <Users className="h-12 w-12 text-primary mb-4  text-fuchsia-800"/>
        <p className="text-xl text-center">Sistema de Calificacion</p>
        <p className="text-center">
          Califica peliculas del 1 al 10 y descubre los promedios de la
          comunidad
        </p>
      </div>
      <div className="bg-zinc-800 rounded p-2 m-2 hover:scale-105 hover:bg-zinc-700 transition-all duration-300 h-[260px] flex flex-col items-center justify-center">
        <TrendingUp className="h-12 w-12 text-primary mb-4  text-fuchsia-800"/>
        <p className="text-xl text-center">Sistema de Calificacion</p>
        <p className="text-center">
          Califica peliculas del 1 al 10 y descubre los promedios de la
          comunidad
        </p>
        <div className="mt-4">
          <StarRating rating={8.5} size="md" />
        </div>
      </div>
    </div>
  );
};

export default CardsHome;
