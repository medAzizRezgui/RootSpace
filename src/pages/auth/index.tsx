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
    <div
      className={
        "flex h-[100vh] w-full items-center justify-center bg-bgDark p-24"
      }
    >
      <div className={"w-full max-w-[20%]"}>
        <h1 className={"text-3xl font-bold text-white"}>Welcome Back!</h1>
        <AuthUI
          supabaseClient={supabaseClient}
          providers={[]}
          magicLink
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                fonts: { bodyFontFamily: "Open Sans" },
                colors: {
                  brand: "#2F89FF",
                  brandAccent: "#FFF",
                  anchorTextColor: "#FFF",
                  inputPlaceholder: "#FFF",
                  inputText: "#FFF",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};
export default Auth;
