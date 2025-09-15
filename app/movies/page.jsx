import MovieComponent from '@/components/general/MovieComponent';
import { TrendingUp } from 'lucide-react';
import SearchBar from '@/components/ui/SearchBar';

const page = () => {
  return (
    <div>
      <h1 className="text-start text-4xl font-bold p-2">Explorar peliculas</h1>
      <p className="font-bold p-2">Descubre tu proxima pelicula favorita </p>
      <div className="p-2">
        <SearchBar />
      </div>
      <p className="text-2xl flex p-2 m-2 ">
        <span>
          <TrendingUp className="text-fuchsia-800 " />
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
