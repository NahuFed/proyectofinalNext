import ProfileHeader from '@/components/general/ProfileHeader';

export default function ProfilePage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Mi perfil</h1>
      <ProfileHeader />
      <p className="text-neutral-300">
        Acá vas a ver tu información y tus reseñas.
      </p>
    </main>
  );
}
