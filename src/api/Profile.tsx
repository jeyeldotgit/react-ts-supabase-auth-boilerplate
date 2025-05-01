import supabase from "../supabase-client";
import UserProfileType from "../types/UserProfileType";

export const uploadAvatarFile = async (
  file: File,
  userId: string
): Promise<string | null> => {
  const fileExt = file.name.split(".").pop();
  const filePath = `public/${userId}-${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(filePath, file);

  if (uploadError) {
    console.error("Avatar upload error:", uploadError.message);
    throw new Error(uploadError.message);
  }

  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
  return data?.publicUrl ?? null;
};

export const updateUserProfile = async (
  formData: UserProfileType,
  userId: string,
  avatarUrl: string | null
) => {
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      first_name: formData.first_name,
      last_name: formData.last_name,
      avatar: avatarUrl,
      role: formData.role,
    })
    .eq("id", userId);

  if (updateError) {
    console.error("Profile update error:", updateError.message);
    throw new Error(updateError.message);
  }

  return { success: true, message: "Profile updated successfully" };
};

// INITIATOR OF THE UPDATE

export const updateProfile = async (
  formData: UserProfileType,
  userId: string | undefined
) => {
  if (!userId) {
    return { success: false, message: "User ID is required" };
  }

  try {
    let avatarUrl: string | null = null;

    if (formData.avatar instanceof File) {
      avatarUrl = await uploadAvatarFile(formData.avatar, userId);
    } else if (typeof formData.avatar === "string") {
      avatarUrl = formData.avatar;
    }

    return await updateUserProfile(formData, userId, avatarUrl);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { success: false, message: err.message };
    }
    return { success: false, message: "Unexpected error. Please try again." };
  }
};
