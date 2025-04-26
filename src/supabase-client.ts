import { createClient } from "@supabase/supabase-js";

const supabaseURL: string = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey: string = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseURL, supabaseAnonKey);

export default supabase;
