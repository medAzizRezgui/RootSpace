import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "../../libs/supabaseClient.ts";

interface SupabaseProviderProps {
  children: React.ReactNode;
}

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      {children}
    </SessionContextProvider>
  );
};
export default SupabaseProvider;
