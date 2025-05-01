import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import getUserProfile from "../api/DbCalls";
import UserProfileType from "../types/UserProfileType";

const useUserProfile = () => {
  const { session } = useAuth();
  const userId = session?.user.id as string;

  const [userProfile, setUserProfile] = useState<UserProfileType | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);

      const res = await getUserProfile(userId);

      if (res?.success === false) {
        console.error("Error fetching user profile:", res.message);
        setError(res.message);
        setLoading(false);
        return;
      }

      if (res?.success === true) {
        setUserProfile(res.data);
      }

      setLoading(false);
    };

    fetchUserProfile();
  }, [userId]);

  return { userProfile, userId, loading, error };
};

export default useUserProfile;
