import supabase from "../supabase-client";
import { UserType } from "../types/UserType";

const signUpNewUser = async (formData: UserType) => {
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

  if (data.user) {
    console.log("User Successfully Created");
    console.log(data.user);
  }
};

const signInUser = async (formData: UserType) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      console.error("Sign in error:", error.message);
      return { success: false, message: error.message };
    }

    if (!data.session) {
      console.error("No session returned after sign in.");
      return {
        success: false,
        message: "Authentication failed. Please check your credentials.",
      };
    }

    return {
      success: true,
      user: data.user,
      session: data.session,
      message: "Successfully signed in!",
    };
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
