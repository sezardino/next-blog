import { getCurrentUserProfile, updateProfileData } from "@/actions";
import { ProfileForm } from "@/components/form/profile";

const ProfileSettingsPage = async () => {
  const userProfile = await getCurrentUserProfile();

  return (
    <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
      <div className="p-2 md:p-4">
        <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
          <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>
          <div className="grid max-w-2xl mx-auto mt-8">
            {/* <ProfileAvatarForm /> */}
            <ProfileForm
              initialValues={{
                bio: userProfile?.bio || undefined,
                firstName: userProfile?.firstName || undefined,
                lastName: userProfile?.lastName || undefined,
              }}
              className="mt-10"
              onFormSubmit={updateProfileData}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileSettingsPage;
