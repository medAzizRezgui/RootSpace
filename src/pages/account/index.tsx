import { useUser } from "../../features/user/useUser.tsx";
import { supabase } from "../../libs/supabaseClient.ts";

const Account = () => {
  const { userDetails } = useUser();

  const updateDetails = async () => {
    const { error, data } = await supabase
      .from("profiles")
      .update({ full_name: "Rezgui med Aziz", username: "Rez99" })
      .eq("id", userDetails?.id)
      .select();
  };

  return (
    <div className={"h-[100vh] bg-bgDark p-24 font-display text-white"}>
      <h1>Account</h1>
      <p>{userDetails?.id}</p>
      <p>{userDetails?.full_name}</p>
      <p>{userDetails?.username}</p>

      <button onClick={() => updateDetails()}>Update</button>
    </div>
  );
};

export default Account;
