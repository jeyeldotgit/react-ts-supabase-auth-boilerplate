import { User } from "@supabase/supabase-js";
import { useAuth } from "../../hooks/useAuth";

import Sidebar from "../../components/dashboard/Sidebar";

const Home = () => {
  const { loading, session } = useAuth();

  const user = session?.user as User; // Type assertion to User

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching the session
  }

  return (
    <div className="w-screen h-screen bg-neutral-100 flex">
      <Sidebar />
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
        {user && <p className="mt-4 text-lg">Hello, {user.email}!</p>}
      </div>
    </div>
  );
};

export default Home;
