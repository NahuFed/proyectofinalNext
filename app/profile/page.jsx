import ProfileHeader from '@/components/general/ProfileHeader';
import ProfileReviews from '@/components/general/ProfileReviews';

export default function ProfilePage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Mi perfil</h1>
      <ProfileHeader />
      <h2 className="text-xl font-semibold mt-6 mb-3">Mis reseñas</h2>
      <ProfileReviews />
    </main>
  );
}
