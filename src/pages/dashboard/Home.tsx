import { User } from "@supabase/supabase-js";
import { useAuth } from "../../hooks/useAuth";

const Home = () => {
  const { loading, session } = useAuth();

  const user = session?.user as User; // Type assertion to User

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching the session
  }

  return (
    <div>
      <h1>Welcome to dashboard</h1>
      <h1>Welcome, {user.email}</h1>
      <p>Your User ID: {user.id}</p>
      <p>Account Created At: {user.created_at}</p>
    </div>
  );
};

export default Home;
