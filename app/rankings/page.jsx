import RankingsClient from '@/components/general/RankingsClient';
import { utils } from '@/services/api';


export const metadata = { title: 'Rankings', description: 'Ranking de películas' };

export default async function RankingsPage() {
  const movies = await utils.getMoviesWithRatings();
  return <RankingsClient movies={movies} />;
}
