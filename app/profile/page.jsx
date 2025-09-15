import ProfileHeader from '@/components/general/ProfileHeader';
import ProfileReviews from '@/components/general/ProfileReviews';
import ProfileStats from '@/components/general/ProfileStats';
import ProfileTabs from '@/components/general/ProfileTabs';

export default function Page() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header visual del compañero */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            CineReview
          </h1>

          {/* Header con datos reales (name/email) */}
          <div className="mt-4">
            <ProfileHeader />
          </div>
        </div>

        {/* Stats dinámicos */}
        <ProfileStats />

        <div className="h-px bg-gray-700 my-8"></div>

        <ProfileTabs />
      </div>
    </div>
  );
}
