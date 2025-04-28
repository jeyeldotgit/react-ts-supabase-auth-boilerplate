// src/contexts/AuthContext.tsx
import { createContext } from "react";
import { Session } from "@supabase/supabase-js";

interface AuthContextType {
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  loading: true,
  session: null,
  isAuthenticated: false,
});
