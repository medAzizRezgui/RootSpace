import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";
import { ProfileForm } from "../../components/pages/Account/ProfileForm";

const Account = () => {
  const supabaseClient = useSupabaseClient();
  const router = useNavigate();
  const handleRefresh = () => {
    router("/", { replace: true });
  };
  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    handleRefresh();
  };
  return (
    <div
      className={
        "flex h-[100vh] items-start bg-bgDark p-24 font-display text-white"
      }
    >
      <>
        <button
          onClick={() => handleLogout()}
          className={"rounded-md bg-red-500 p-4 text-white"}
        >
          Logout
        </button>
      </>
      <ProfileForm />
    </div>
  );
};

export default Account;
