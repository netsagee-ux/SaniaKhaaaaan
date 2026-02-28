import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://opgewszluafieqkshexc.supabase.co";
const supabaseAnonKey =   "sb_publishable_ZOWc9ni0YW8gseNw77lbSQ_b_QLsgMU";

const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
     persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: "pkce",
    },
  }
);

export default supabase;

 
