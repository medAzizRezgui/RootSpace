import { useNavigate } from "react-router-dom";

import Modal from "../../components/shared/Modal.tsx";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { closeModal } from "./authModalSlice.ts";

const AuthModal = () => {
  const dispatch = useAppDispatch();
  const supabaseClient = useSupabaseClient();

  const isOpen = useAppSelector((state) => state.authModalState.isOpen);
  const router = useNavigate();

  const handleRefresh = () => {
    router("", { replace: true });
  };
  const { session } = useSessionContext();
  useEffect(() => {
    if (session) {
      handleRefresh();
      dispatch(closeModal());
    }
  }, [session, router, closeModal]);

  const onChange = (open: boolean) => {
    if (!open) {
      dispatch(closeModal());
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      title={"Welcome Back"}
      description={"Login to your account"}
    >
      <Auth
        supabaseClient={supabaseClient}
        providers={[]}
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
    </Modal>
  );
};
export default AuthModal;
