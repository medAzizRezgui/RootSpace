import { useNavigate } from "react-router-dom";

import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { Auth as AuthUI } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";

const Auth = () => {
  const supabaseClient = useSupabaseClient();

  const router = useNavigate();

  const handleRefresh = () => {
    router("/", { replace: true });
  };
  const { session } = useSessionContext();
  useEffect(() => {
    if (session) {
      handleRefresh();
    }
  }, [session, router]);

  return (
    <div className={"h-[100vh] w-full bg-bgDark p-24"}>
      <AuthUI
        supabaseClient={supabaseClient}
        providers={[]}
        redirectTo={"/"}
        magicLink
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404039",
                brandAccent: "#21c55e",
              },
            },
          },
        }}
      />
    </div>
  );
};
export default Auth;
