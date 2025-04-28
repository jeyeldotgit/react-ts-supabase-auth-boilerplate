import { useState, useEffect } from "react";
import supabase from "../supabase-client";
import { AuthContext } from "./AuthContext";
import { Session } from "@supabase/supabase-js";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Initialize isAuthenticated

  useEffect(() => {
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();

      setSession(data?.session ?? null);
      setLoading(false);
    };

    fetchSession(); //  call the async function

    if (session) {
      setIsAuthenticated(true);
    }

    // Listen to supabase changes (Authentication: Signin or Logout)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false); // Set loading to false when the session changes
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [session]);

  return (
    <AuthContext.Provider value={{ loading, session, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
