import supabase from "../supabase-client";
import { UserType } from "../types/UserType";

const signUpNewUser = async (formData: UserType) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`, // or wherever your login page is
      },
    });

    if (error) {
      console.error("Error Sign Up: ", error.message);
      return;
    }

    if (data) {
      return {
        success: true,
        message:
          "Sign up successful. Please check your email for confirmation.",
      };
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return { success: false, message: err.message };
    }
    console.error(err);
    return { success: false, message: "Unexpected error. Please try again." };
  }
};

const signInUser = async (formData: UserType) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      console.error("Sign in error:", error.message);
      return { success: false, message: error.message };
    }

    return { success: true, message: "Sign in successful" };
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
      return { success: false, message: err.message };
    }
    console.error(err);
    return { success: false, message: "Unexpected error. Please try again." };
  }
};

export { signInUser, signUpNewUser };
