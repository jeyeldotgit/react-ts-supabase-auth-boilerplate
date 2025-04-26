import { useAuth } from "../../hooks/useAuth";

const Home = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>; // Or a spinner
  }

  if (!user) {
    return <p>No user found. Please login again.</p>; // fallback
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
