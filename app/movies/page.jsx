import MovieComponent from '@/components/general/MovieComponent';
import { TrendingUp } from 'lucide-react';
import SearchBar from '@/components/ui/SearchBar';

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
