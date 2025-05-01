import supabase from "../supabase-client";
import UserProfileType from "../types/UserProfileType";

const getUserProfile = async (userId: string) => {
  try {
    const { error, data: userProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId);

    if (error) {
      console.error("Error fetching profile:", error.message);
      return { success: false, message: error.message };
    }

    if (!userProfile || userProfile.length === 0) {
      return { success: false, message: "User profile not found" };
    }

    return {
      success: true,
      message: "Profile fetched successfully",
      data: userProfile[0] as UserProfileType,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching profile:", error.message);
      return { success: false, message: error.message };
    }
  }
};

export default getUserProfile;
