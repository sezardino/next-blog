import { ProfileForm } from "@/components/form/profile";
import { Typography } from "@/components/ui/typography";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { deleteCurrentUserAvatar } from "./actions/delete-avatar";
import { getCurrentUserProfile } from "./actions/profile-data";
import { setUserAvatar } from "./actions/set-user-avatar";
import { updateProfileData } from "./actions/update-profile";
import { ChangeProfileAvatar } from "./components/change-profile-avatar";

export const metadata: Metadata = { title: "Public profile settings" };

const placeholderAction = async () => {
  "use server";
};

const ProfileSettingsPage = async () => {
  const userProfile = await getCurrentUserProfile();

  if ("message" in userProfile) return notFound();

  return (
    <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
      <div className="p-2 md:p-4">
        <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
          <Typography level="h2" styling="h3" weight="medium">
            Public Profile
          </Typography>

          <div className="grid max-w-2xl mx-auto mt-4">
            <ChangeProfileAvatar
              profile={userProfile}
              onDeleteAvatar={deleteCurrentUserAvatar}
              onChangeAvatar={setUserAvatar}
            />

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
