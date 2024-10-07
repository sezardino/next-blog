"use client";

import { ProfileAvatarForm } from "@/components/form/profile-avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Toast } from "@/components/ui/toast";
import { UserAvatarFormValues } from "@/schemas/user-avatar";
import { ServerActionResponse, SuccessResponse } from "@/types/base";
import { CurrentUserData } from "@/types/user";
import { createActionHandler } from "@/utils/server-actions";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  profile: CurrentUserData;
  onChangeAvatar: (
    data: FormData
  ) => Promise<ServerActionResponse<SuccessResponse>>;
  onDeleteAvatar: () => Promise<ServerActionResponse<SuccessResponse>>;
};

export const ChangeProfileAvatar = (props: Props) => {
  const { profile, onChangeAvatar, onDeleteAvatar } = props;
  const [isDeleteCurrentAvatarModalOpen, setIsDeleteCurrentAvatarModalOpen] =
    useState(false);

  const deleteUserAvatar = createActionHandler({
    action: onDeleteAvatar,
    onSuccess: () => {
      toast.success("Avatar was successfully deleted");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const updateUserAvatar = createActionHandler({
    action: (values: UserAvatarFormValues) => {
      const formData = new FormData();
      formData.set("avatar", values.avatar);

      return onChangeAvatar(formData);
    },
    onSuccess: () => {
      toast.success("Avatar was successfully changed");
    },
    onError: (error, zodErrors) => {
      toast.error(<Toast message={error} errors={zodErrors} />);
    },
  });

  return (
    <>
      <ProfileAvatarForm
        key={profile.avatarUrl || "avatar"}
        currentUser={profile}
        onTryToDeleteImage={() => setIsDeleteCurrentAvatarModalOpen(true)}
        onFormSubmit={updateUserAvatar}
      />

      <AlertDialog
        open={isDeleteCurrentAvatarModalOpen}
        onOpenChange={() => setIsDeleteCurrentAvatarModalOpen(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              profile avatar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteUserAvatar(undefined)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
